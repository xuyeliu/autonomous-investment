"""Tests for portfolio module."""

import math
from app.portfolio import PORTFOLIOS, get_portfolio_by_index, get_portfolio_by_name, portfolio_menu


def test_all_portfolios_exist():
    assert len(PORTFOLIOS) == 5


def test_holdings_non_empty():
    for p in PORTFOLIOS:
        assert len(p.holdings) > 0, f"{p.name} has no holdings"


def test_weights_sum_to_one():
    for p in PORTFOLIOS:
        assert math.isclose(sum(p.weights), 1.0, rel_tol=1e-6), (
            f"{p.name} weights sum to {sum(p.weights)}"
        )


def test_risk_parameters_exist():
    for p in PORTFOLIOS:
        assert p.risk_level
        assert p.expected_return > 0
        assert p.volatility > 0


def test_get_portfolio_by_index():
    assert get_portfolio_by_index(1).name == "AI Momentum Portfolio"
    assert get_portfolio_by_index(5).name == "High-Risk Portfolio"
    assert get_portfolio_by_index(0) is None
    assert get_portfolio_by_index(6) is None


def test_get_portfolio_by_name():
    p = get_portfolio_by_name("Conservative Portfolio")
    assert p is not None
    assert p.name == "Conservative Portfolio"
    # partial match
    assert get_portfolio_by_name("conservative") is not None
    assert get_portfolio_by_name("nonexistent") is None


def test_portfolio_menu():
    menu = portfolio_menu()
    assert "1." in menu
    assert "5." in menu
    assert "AI Momentum" in menu
