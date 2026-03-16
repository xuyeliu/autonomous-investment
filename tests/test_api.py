"""Tests for FastAPI endpoints."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.chatbot import clear_sessions


@pytest.fixture(autouse=True)
def reset():
    clear_sessions()
    yield
    clear_sessions()


client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_chat_invest():
    r = client.post("/chat", json={"user_id": "t1", "message": "invest 1000"})
    assert r.status_code == 200
    assert "portfolio" in r.json()["reply"].lower()


def test_chat_flow():
    client.post("/chat", json={"user_id": "t1", "message": "invest 1000"})
    r = client.post("/chat", json={"user_id": "t1", "message": "1"})
    assert r.status_code == 200
    assert "confirmed" in r.json()["reply"].lower()


def test_status_endpoint():
    client.post("/chat", json={"user_id": "t1", "message": "invest 500"})
    client.post("/chat", json={"user_id": "t1", "message": "2"})
    r = client.get("/status/t1")
    assert r.status_code == 200
    data = r.json()
    assert data["state"] == "active"
    assert data["portfolio"] == "Conservative Portfolio"


def test_report_endpoint():
    client.post("/chat", json={"user_id": "t1", "message": "invest 500"})
    client.post("/chat", json={"user_id": "t1", "message": "1"})
    r = client.get("/report/t1")
    assert r.status_code == 200
    assert "report" in r.json() or "Weekly" in r.json().get("report", "")


def test_report_no_portfolio():
    r = client.get("/report/nobody")
    assert r.status_code == 200
    # Should get a message about not having a portfolio
    assert "invest" in r.json()["report"].lower()
