"""Pydantic schemas for API request/response models."""

from typing import Any, Optional

from pydantic import BaseModel


class ChatRequest(BaseModel):
    user_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str


class StatusResponse(BaseModel):
    user_id: str
    state: str
    portfolio: Optional[str] = None
    initial_investment: float = 0.0
    current_value: float = 0.0
    profit: float = 0.0
    return_pct: float = 0.0


class ReportResponse(BaseModel):
    user_id: str
    report: str


class WebhookPayload(BaseModel):
    """Generic JSON webhook payload for simplified testing."""
    sender: str
    message: str
    provider: str = "generic"


class WebhookResponse(BaseModel):
    recipient: str
    reply: str
