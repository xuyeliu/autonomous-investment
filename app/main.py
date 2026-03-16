"""FastAPI application — the API layer."""

from pathlib import Path
from typing import Optional

from fastapi import FastAPI, Request, Query
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

from app.chatbot import handle_message, get_session
from app.models import init_db
from app.schemas import (
    ChatRequest,
    ChatResponse,
    StatusResponse,
    ReportResponse,
    WebhookPayload,
    WebhookResponse,
)
from app.utils import format_currency, format_pct
from app.whatsapp import (
    InboundMessage,
    OutboundMessage,
    parse_generic_webhook,
    parse_twilio_webhook,
    format_generic_reply,
    format_twilio_reply,
    parse_meta_webhook,
    format_meta_reply,
)

app = FastAPI(title="AI Hedge Fund Manager", version="0.1.0")

_STATIC_DIR = Path(__file__).parent / "static"


@app.on_event("startup")
def startup():
    init_db()


# --- Demo UI ---------------------------------------------------------------

@app.get("/demo", response_class=HTMLResponse)
def demo():
    """Serve the WhatsApp-style demo chat interface."""
    return (_STATIC_DIR / "demo.html").read_text()


# --- Health ----------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok"}


# --- Chat (internal dev endpoint) ------------------------------------------

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    reply = handle_message(req.user_id, req.message)
    return ChatResponse(reply=reply)


# --- Status ----------------------------------------------------------------

@app.get("/status/{user_id}", response_model=StatusResponse)
def status(user_id: str):
    session = get_session(user_id)
    sim = session.simulation
    return StatusResponse(
        user_id=user_id,
        state=session.state,
        portfolio=session.portfolio.name if session.portfolio else None,
        initial_investment=sim.initial_investment if sim else 0.0,
        current_value=sim.current_value if sim else 0.0,
        profit=sim.profit if sim else 0.0,
        return_pct=round(sim.return_pct, 2) if sim else 0.0,
    )


# --- Report ----------------------------------------------------------------

@app.get("/report/{user_id}", response_model=ReportResponse)
def report(user_id: str):
    reply = handle_message(user_id, "report")
    return ReportResponse(user_id=user_id, report=reply)


# --- WhatsApp Webhook GET (verification) -----------------------------------

@app.get("/webhook/whatsapp")
def webhook_verify(
    mode: str = Query(None, alias="hub.mode"),
    token: str = Query(None, alias="hub.verify_token"),
    challenge: str = Query(None, alias="hub.challenge"),
):
    """Meta-style webhook verification, or simple health ping."""
    if mode == "subscribe" and challenge:
        return PlainTextResponse(content=challenge)
    return {"status": "webhook active"}


# --- WhatsApp Webhook POST -------------------------------------------------

@app.post("/webhook/whatsapp")
async def webhook_whatsapp(request: Request):
    """Accept inbound WhatsApp messages from any provider.

    Supports:
    - Generic JSON: {"sender": "...", "message": "..."}
    - Twilio form-encoded: From=whatsapp:+..., Body=...
    - Meta Cloud API JSON payload
    """
    content_type = request.headers.get("content-type", "")

    inbound: Optional[InboundMessage] = None

    # Twilio sends application/x-www-form-urlencoded
    if "form" in content_type or "urlencoded" in content_type:
        form = await request.form()
        inbound = parse_twilio_webhook(dict(form))
        reply_text = handle_message(inbound.sender, inbound.text)
        xml = format_twilio_reply(OutboundMessage(recipient=inbound.sender, text=reply_text))
        return PlainTextResponse(content=xml, media_type="application/xml")

    # JSON payloads
    body = await request.json()

    # Try Meta format first (has "entry" key)
    if "entry" in body:
        inbound = parse_meta_webhook(body)
        if inbound is None:
            return {"status": "no message"}
        reply_text = handle_message(inbound.sender, inbound.text)
        return format_meta_reply(OutboundMessage(recipient=inbound.sender, text=reply_text))

    # Generic JSON
    inbound = parse_generic_webhook(body)
    reply_text = handle_message(inbound.sender, inbound.text)
    return format_generic_reply(OutboundMessage(recipient=inbound.sender, text=reply_text))
