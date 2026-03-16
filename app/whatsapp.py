"""WhatsApp provider adapters for webhook parsing and response formatting."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Optional


@dataclass
class InboundMessage:
    sender: str
    text: str


@dataclass
class OutboundMessage:
    recipient: str
    text: str


# ---------------------------------------------------------------------------
# Generic JSON adapter (for local dev / testing)
# ---------------------------------------------------------------------------

def parse_generic_webhook(payload: dict[str, Any]) -> InboundMessage:
    return InboundMessage(sender=payload["sender"], text=payload["message"])


def format_generic_reply(msg: OutboundMessage) -> dict[str, Any]:
    return {"recipient": msg.recipient, "reply": msg.text}


# ---------------------------------------------------------------------------
# Twilio WhatsApp Sandbox adapter
# ---------------------------------------------------------------------------

def parse_twilio_webhook(form_data: dict[str, str]) -> InboundMessage:
    """Parse a Twilio-style form-encoded webhook payload.

    Expected keys: From, Body
    Example From value: 'whatsapp:+1234567890'
    """
    sender = form_data.get("From", "")
    if sender.startswith("whatsapp:"):
        sender = sender[len("whatsapp:"):]
    text = form_data.get("Body", "")
    return InboundMessage(sender=sender, text=text)


def format_twilio_reply(msg: OutboundMessage) -> str:
    """Return TwiML response XML string."""
    escaped = msg.text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        f"<Response><Message>{escaped}</Message></Response>"
    )


# ---------------------------------------------------------------------------
# Meta WhatsApp Cloud API adapter
# ---------------------------------------------------------------------------

def parse_meta_webhook(payload: dict[str, Any]) -> Optional[InboundMessage]:
    """Parse a Meta Cloud API webhook payload.

    Returns None if the payload doesn't contain a user message.
    """
    try:
        entry = payload["entry"][0]
        changes = entry["changes"][0]
        value = changes["value"]
        message = value["messages"][0]
        sender = message["from"]
        text = message.get("text", {}).get("body", "")
        return InboundMessage(sender=sender, text=text)
    except (KeyError, IndexError):
        return None


def format_meta_reply(msg: OutboundMessage, phone_number_id: str = "PHONE_ID") -> dict[str, Any]:
    """Format a reply for the Meta Cloud API send-message endpoint."""
    return {
        "messaging_product": "whatsapp",
        "to": msg.recipient,
        "type": "text",
        "text": {"body": msg.text},
    }
