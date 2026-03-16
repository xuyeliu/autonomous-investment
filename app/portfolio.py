"""Portfolio products for the AI Hedge Fund Manager."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass
class Portfolio:
    name: str
    description: str
    holdings: list[str]
    weights: list[float]
    risk_level: str
    expected_return: float  # annual drift
    volatility: float  # annual volatility


PORTFOLIOS: list[Portfolio] = [
    Portfolio(
        name="AI Momentum Portfolio",
        description="Rides momentum in large-cap AI and tech leaders.",
        holdings=["NVDA", "META", "AAPL", "MSFT", "GOOG"],
        weights=[0.30, 0.25, 0.20, 0.15, 0.10],
        risk_level="medium-high",
        expected_return=0.18,
        volatility=0.22,
    ),
    Portfolio(
        name="Conservative Portfolio",
        description="Stability-focused blend of mega-cap tech with lower volatility.",
        holdings=["AAPL", "MSFT", "GOOG", "AMZN"],
        weights=[0.30, 0.30, 0.25, 0.15],
        risk_level="low",
        expected_return=0.08,
        volatility=0.10,
    ),
    Portfolio(
        name="Tech Growth Portfolio",
        description="High-conviction growth picks across the tech sector.",
        holdings=["NVDA", "TSLA", "META", "AMZN", "GOOG"],
        weights=[0.25, 0.20, 0.20, 0.20, 0.15],
        risk_level="medium",
        expected_return=0.14,
        volatility=0.18,
    ),
    Portfolio(
        name="AI Ensemble Portfolio",
        description="Diversified AI exposure across the full stack.",
        holdings=["NVDA", "MSFT", "GOOG", "META", "AMZN", "AAPL"],
        weights=[0.25, 0.20, 0.15, 0.15, 0.15, 0.10],
        risk_level="medium",
        expected_return=0.13,
        volatility=0.16,
    ),
    Portfolio(
        name="High-Risk Portfolio",
        description="Concentrated bets on high-beta AI and EV names.",
        holdings=["NVDA", "TSLA", "META"],
        weights=[0.45, 0.30, 0.25],
        risk_level="high",
        expected_return=0.25,
        volatility=0.35,
    ),
]

PORTFOLIO_MAP: dict[str, Portfolio] = {p.name: p for p in PORTFOLIOS}


def get_portfolio_by_index(index: int) -> Optional[Portfolio]:
    """Return a portfolio by 1-based index."""
    if 1 <= index <= len(PORTFOLIOS):
        return PORTFOLIOS[index - 1]
    return None


def get_portfolio_by_name(name: str) -> Optional[Portfolio]:
    """Return a portfolio by exact or case-insensitive partial name match."""
    low = name.lower()
    for p in PORTFOLIOS:
        if p.name.lower() == low or low in p.name.lower():
            return p
    return None


def portfolio_menu() -> str:
    """Return the portfolio selection menu text."""
    lines = ["Please choose a portfolio:"]
    for i, p in enumerate(PORTFOLIOS, 1):
        lines.append(f"{i}. {p.name}")
    return "\n".join(lines)
