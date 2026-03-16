"""Demo script — simulates a complete investor journey via the API."""

import httpx
import subprocess
import sys
import time
import os

BASE = os.environ.get("BASE_URL", "http://127.0.0.1:8000")


def chat(user_id: str, message: str) -> str:
    r = httpx.post(f"{BASE}/chat", json={"user_id": user_id, "message": message})
    r.raise_for_status()
    reply = r.json()["reply"]
    print(f"\n>> {message}")
    print(reply)
    return reply


def webhook(sender: str, message: str) -> dict:
    r = httpx.post(
        f"{BASE}/webhook/whatsapp",
        json={"sender": sender, "message": message},
    )
    r.raise_for_status()
    data = r.json()
    print(f"\n[WhatsApp] >> {message}")
    print(f"[WhatsApp] << {data['reply']}")
    return data


def main():
    print("=" * 60)
    print("AI Hedge Fund Manager — Demo Session")
    print("=" * 60)

    uid = "demo_investor"

    # Full investor journey
    chat(uid, "invest 1000")
    chat(uid, "1")  # AI Momentum Portfolio
    chat(uid, "status")
    chat(uid, "report")
    chat(uid, "why")
    chat(uid, "details")
    chat(uid, "switch Conservative Portfolio")
    chat(uid, "report")
    chat(uid, "withdraw")

    print("\n" + "=" * 60)
    print("WhatsApp Webhook Simulation")
    print("=" * 60)

    webhook("+1555123456", "invest 5000")
    webhook("+1555123456", "3")  # Tech Growth Portfolio
    webhook("+1555123456", "status")

    # Health check
    r = httpx.get(f"{BASE}/health")
    print(f"\n/health: {r.json()}")

    # Status endpoint
    r = httpx.get(f"{BASE}/status/{uid}")
    print(f"/status: {r.json()}")

    print("\n" + "=" * 60)
    print("Demo complete.")
    print("=" * 60)


if __name__ == "__main__":
    main()
