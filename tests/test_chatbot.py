"""Tests for chatbot engine."""

import pytest
from app.chatbot import handle_message, clear_sessions


@pytest.fixture(autouse=True)
def reset():
    clear_sessions()
    yield
    clear_sessions()


def test_invest_and_choose():
    reply = handle_message("u1", "invest 1000")
    assert "choose a portfolio" in reply.lower() or "Choose" in reply
    # numeric selection
    reply = handle_message("u1", "1")
    assert "Investment confirmed" in reply
    assert "AI Momentum" in reply


def test_status_requires_active():
    reply = handle_message("u1", "status")
    assert "don't have" in reply.lower() or "invest" in reply.lower()


def test_full_flow():
    handle_message("u1", "invest 500")
    handle_message("u1", "2")  # Conservative
    reply = handle_message("u1", "status")
    assert "Conservative" in reply
    reply = handle_message("u1", "report")
    assert "Weekly Update" in reply
    reply = handle_message("u1", "why")
    assert len(reply) > 10
    reply = handle_message("u1", "details")
    assert "Detailed view" in reply


def test_switch():
    handle_message("u1", "invest 1000")
    handle_message("u1", "1")
    reply = handle_message("u1", "switch Conservative Portfolio")
    assert "Switched" in reply
    assert "Conservative" in reply


def test_withdraw():
    handle_message("u1", "invest 1000")
    handle_message("u1", "3")
    reply = handle_message("u1", "withdraw")
    assert "Withdrawal complete" in reply
    assert "Final value" in reply


def test_invalid_command():
    reply = handle_message("u1", "foobar")
    assert "didn't understand" in reply.lower() or "help" in reply.lower()


def test_numeric_portfolio_selection():
    handle_message("u1", "invest 2000")
    reply = handle_message("u1", "5")
    assert "High-Risk" in reply


def test_help():
    reply = handle_message("u1", "help")
    assert "invest" in reply.lower()
    assert "status" in reply.lower()


def test_invest_zero():
    reply = handle_message("u1", "invest 0")
    assert "positive" in reply.lower()
