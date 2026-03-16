"""Chatbot engine — the core conversation handler."""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from app.portfolio import (
    PORTFOLIOS,
    Portfolio,
    get_portfolio_by_index,
    get_portfolio_by_name,
    portfolio_menu,
)
from app.simulation import SimulationState, create_simulation, step_simulation
from app.storage import save_user, load_user
from app.utils import format_currency, format_pct


# --- Session (in-memory, authoritative during a process lifetime) ----------

@dataclass
class Session:
    user_id: str
    state: str = "new"  # new | choosing | active | withdrawn
    pending_amount: float = 0.0
    portfolio: Portfolio | None = None
    simulation: SimulationState | None = None


_sessions: dict[str, Session] = {}


def get_session(user_id: str) -> Session:
    if user_id not in _sessions:
        _sessions[user_id] = Session(user_id=user_id)
    return _sessions[user_id]


def clear_sessions():
    """Reset all sessions (useful for tests)."""
    _sessions.clear()


# --- Helpers ---------------------------------------------------------------

_INVEST_RE = re.compile(r"invest\s+(\d+(?:\.\d+)?)", re.IGNORECASE)
_SWITCH_RE = re.compile(r"switch\s+(.+)", re.IGNORECASE)


def _persist(session: Session):
    save_user(
        user_id=session.user_id,
        state=session.state,
        portfolio_name=session.portfolio.name if session.portfolio else None,
        sim=session.simulation,
    )


# --- Main entry point ------------------------------------------------------

def handle_message(user_id: str, text: str) -> str:
    """Process a user message and return the bot reply."""
    text = text.strip()
    session = get_session(user_id)

    # --- State: choosing (waiting for portfolio selection) ------------------
    if session.state == "choosing":
        return _handle_choosing(session, text)

    # --- Command parsing ---------------------------------------------------
    low = text.lower()

    # invest <amount>
    m = _INVEST_RE.match(text)
    if m:
        return _handle_invest(session, float(m.group(1)))

    # numeric shortcut (portfolio selection when not in choosing state treated as unknown)
    if low in ("1", "2", "3", "4", "5") and session.state == "new":
        return _unknown(session)

    # commands that require an active portfolio
    if low in ("status", "report", "why", "details"):
        if session.state != "active":
            return "You don't have an active portfolio yet. Send *invest <amount>* to get started."
        # advance simulation one step for freshness
        step_simulation(session.simulation, session.portfolio)
        _persist(session)
        if low == "status":
            return _status_text(session)
        if low == "report":
            return _report_text(session)
        if low == "why":
            return _why_text(session)
        if low == "details":
            return _details_text(session)

    # switch
    sm = _SWITCH_RE.match(text)
    if sm:
        return _handle_switch(session, sm.group(1).strip())

    if low == "switch":
        if session.state != "active":
            return "You don't have an active portfolio yet. Send *invest <amount>* to get started."
        return "Which portfolio would you like to switch to?\n\n" + portfolio_menu()

    # withdraw
    if low == "withdraw":
        return _handle_withdraw(session)

    # help
    if low == "help":
        return _help_text()

    # hello / hi / start
    if low in ("hello", "hi", "hey", "start"):
        return (
            "Welcome to your AI Hedge Fund Manager.\n\n"
            "Send *invest <amount>* to begin.\n"
            "Example: *invest 1000*"
        )

    return _unknown(session)


# --- Handlers --------------------------------------------------------------

def _handle_invest(session: Session, amount: float) -> str:
    if amount <= 0:
        return "Please invest a positive amount. Example: *invest 1000*"
    session.pending_amount = amount
    session.state = "choosing"
    return (
        "Welcome to your AI Hedge Fund Manager.\n\n"
        + portfolio_menu()
    )


def _handle_choosing(session: Session, text: str) -> str:
    # Try numeric selection
    portfolio: Portfolio | None = None
    if text.isdigit():
        portfolio = get_portfolio_by_index(int(text))
    else:
        portfolio = get_portfolio_by_name(text)

    if portfolio is None:
        return "Invalid selection. " + portfolio_menu()

    session.portfolio = portfolio
    session.simulation = create_simulation(portfolio, session.pending_amount)
    session.state = "active"
    _persist(session)

    return (
        f"Investment confirmed: {format_currency(session.pending_amount)}\n"
        f"Portfolio: {portfolio.name}\n\n"
        "Your portfolio is now active.\n"
        "You can ask for:\n"
        "- status\n"
        "- report\n"
        "- why\n"
        "- details\n"
        "- switch\n"
        "- withdraw"
    )


def _handle_switch(session: Session, target: str) -> str:
    if session.state != "active":
        return "You don't have an active portfolio yet. Send *invest <amount>* to get started."

    portfolio = get_portfolio_by_name(target)
    if not portfolio:
        if target.isdigit():
            portfolio = get_portfolio_by_index(int(target))
    if not portfolio:
        return "Portfolio not found.\n\n" + portfolio_menu()

    # Carry over current value
    old_value = session.simulation.current_value
    session.portfolio = portfolio
    session.simulation = create_simulation(portfolio, old_value)
    session.simulation.initial_investment = old_value
    _persist(session)

    return (
        f"Switched to {portfolio.name}.\n"
        f"Current value carried over: {format_currency(old_value)}"
    )


def _handle_withdraw(session: Session) -> str:
    if session.state != "active":
        return "You don't have an active portfolio to withdraw from."
    value = session.simulation.current_value
    session.state = "withdrawn"
    session.simulation = None
    session.portfolio = None
    _persist(session)
    return (
        f"Withdrawal complete.\n"
        f"Final value: {format_currency(value)}\n\n"
        "Thank you for investing with us. Send *invest <amount>* to start again."
    )


# --- Reply formatters (HCI: short by default) -----------------------------

def _status_text(session: Session) -> str:
    sim = session.simulation
    return (
        f"Portfolio: {session.portfolio.name}\n"
        f"Value: {format_currency(sim.current_value)}\n"
        f"Profit: {format_pct(sim.return_pct)}"
    )


def _report_text(session: Session) -> str:
    sim = session.simulation
    top = session.portfolio.holdings[:3]
    return (
        "Weekly Update\n\n"
        f"Portfolio value: {format_currency(sim.current_value)}\n"
        f"Profit: {format_pct(sim.return_pct)}\n\n"
        "Top holdings:\n" + "\n".join(top)
    )


def _why_text(session: Session) -> str:
    p = session.portfolio
    reasons = {
        "AI Momentum Portfolio": "This portfolio benefited from strong momentum in large-cap AI and tech stocks this week.",
        "Conservative Portfolio": "Stable mega-cap holdings provided steady, low-volatility returns this week.",
        "Tech Growth Portfolio": "High-conviction tech growth picks drove returns through sector-wide tailwinds.",
        "AI Ensemble Portfolio": "Diversified AI exposure smoothed returns across the full tech stack this week.",
        "High-Risk Portfolio": "Concentrated positions in high-beta names amplified market movements this week.",
    }
    return reasons.get(p.name, "Your portfolio performance was driven by broad market conditions.")


def _details_text(session: Session) -> str:
    p = session.portfolio
    holding_reasons = {
        "NVDA": "strong momentum",
        "META": "positive sentiment",
        "AAPL": "stable large-cap support",
        "TSLA": "high-beta EV momentum",
        "MSFT": "cloud and AI tailwinds",
        "GOOG": "search and AI integration",
        "AMZN": "e-commerce and AWS growth",
    }
    lines = ["Detailed view:"]
    for h in p.holdings:
        reason = holding_reasons.get(h, "market exposure")
        lines.append(f"- {h}: {reason}")
    return "\n".join(lines)


def _help_text() -> str:
    return (
        "Commands:\n"
        "- *invest <amount>* — start investing\n"
        "- *status* — current portfolio value\n"
        "- *report* — weekly update\n"
        "- *why* — explain performance\n"
        "- *details* — holding-level detail\n"
        "- *switch <portfolio>* — change portfolio\n"
        "- *withdraw* — cash out\n"
        "- *help* — show this message"
    )


def _unknown(session: Session) -> str:
    if session.state == "active":
        return "I didn't understand that. Try *status*, *report*, *why*, *details*, *switch*, *withdraw*, or *help*."
    return "I didn't understand that. Send *invest <amount>* to get started, or *help* for options."
