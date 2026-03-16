"""Tests for WhatsApp webhook endpoint and adapters."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.chatbot import clear_sessions
from app.whatsapp import (
    parse_twilio_webhook,
    parse_meta_webhook,
    format_twilio_reply,
    format_meta_reply,
    OutboundMessage,
)


@pytest.fixture(autouse=True)
def reset():
    clear_sessions()
    yield
    clear_sessions()


client = TestClient(app)


# --- Adapter unit tests ----------------------------------------------------

def test_parse_twilio():
    msg = parse_twilio_webhook({"From": "whatsapp:+1234567890", "Body": "invest 500"})
    assert msg.sender == "+1234567890"
    assert msg.text == "invest 500"


def test_parse_meta():
    payload = {
        "entry": [{
            "changes": [{
                "value": {
                    "messages": [{
                        "from": "1234567890",
                        "text": {"body": "status"},
                    }]
                }
            }]
        }]
    }
    msg = parse_meta_webhook(payload)
    assert msg is not None
    assert msg.sender == "1234567890"
    assert msg.text == "status"


def test_parse_meta_no_message():
    assert parse_meta_webhook({"entry": [{"changes": [{"value": {}}]}]}) is None


def test_format_twilio_reply():
    xml = format_twilio_reply(OutboundMessage(recipient="+1", text="Hello"))
    assert "<Message>Hello</Message>" in xml
    assert "<?xml" in xml


def test_format_meta_reply():
    result = format_meta_reply(OutboundMessage(recipient="123", text="Hi"))
    assert result["to"] == "123"
    assert result["text"]["body"] == "Hi"


# --- Webhook endpoint tests ------------------------------------------------

def test_webhook_generic_json():
    r = client.post(
        "/webhook/whatsapp",
        json={"sender": "+1555000111", "message": "invest 1000"},
    )
    assert r.status_code == 200
    data = r.json()
    assert data["recipient"] == "+1555000111"
    assert "portfolio" in data["reply"].lower()


def test_webhook_session_persistence():
    """Repeated messages from the same sender preserve state."""
    client.post(
        "/webhook/whatsapp",
        json={"sender": "+1555000222", "message": "invest 2000"},
    )
    r = client.post(
        "/webhook/whatsapp",
        json={"sender": "+1555000222", "message": "1"},
    )
    data = r.json()
    assert "confirmed" in data["reply"].lower()

    r = client.post(
        "/webhook/whatsapp",
        json={"sender": "+1555000222", "message": "status"},
    )
    data = r.json()
    assert "AI Momentum" in data["reply"]


def test_webhook_meta_payload():
    payload = {
        "entry": [{
            "changes": [{
                "value": {
                    "messages": [{
                        "from": "4400001111",
                        "text": {"body": "help"},
                    }]
                }
            }]
        }]
    }
    r = client.post("/webhook/whatsapp", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["text"]["body"]  # Meta format reply


def test_webhook_twilio_form():
    r = client.post(
        "/webhook/whatsapp",
        data={"From": "whatsapp:+1999888777", "Body": "hello"},
        headers={"content-type": "application/x-www-form-urlencoded"},
    )
    assert r.status_code == 200
    assert "<Message>" in r.text


def test_webhook_verify_get():
    r = client.get("/webhook/whatsapp")
    assert r.status_code == 200

    # Meta-style verification
    r = client.get(
        "/webhook/whatsapp",
        params={"hub.mode": "subscribe", "hub.verify_token": "test", "hub.challenge": "abc123"},
    )
    assert r.status_code == 200
    assert r.text == "abc123"
