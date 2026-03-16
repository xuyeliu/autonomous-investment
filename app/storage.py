"""Persistence layer bridging chatbot state and SQLite."""

from __future__ import annotations

import json
from typing import Optional

from app.models import SessionLocal, UserRecord, init_db
from app.simulation import SimulationState


def _ensure_db():
    init_db()


def save_user(user_id: str, state: str, portfolio_name: Optional[str], sim: Optional[SimulationState]):
    _ensure_db()
    db = SessionLocal()
    try:
        record = db.query(UserRecord).filter_by(user_id=user_id).first()
        if record is None:
            record = UserRecord(user_id=user_id)
            db.add(record)
        record.state = state
        record.portfolio_name = portfolio_name
        if sim:
            record.initial_investment = sim.initial_investment
            record.current_value = sim.current_value
            record.history_json = json.dumps(sim.history)
        else:
            record.initial_investment = 0.0
            record.current_value = 0.0
            record.history_json = "[]"
        db.commit()
    finally:
        db.close()


def load_user(user_id: str) -> Optional[dict]:
    _ensure_db()
    db = SessionLocal()
    try:
        record = db.query(UserRecord).filter_by(user_id=user_id).first()
        if record is None:
            return None
        return {
            "user_id": record.user_id,
            "state": record.state,
            "portfolio_name": record.portfolio_name,
            "initial_investment": record.initial_investment,
            "current_value": record.current_value,
            "history": json.loads(record.history_json) if record.history_json else [],
        }
    finally:
        db.close()
