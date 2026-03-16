# AI Hedge Fund Manager — WhatsApp Bot Backend

A WhatsApp-based "AI hedge fund manager in your pocket" — a chat-first, zero-setup backend API for an AI-managed portfolio product.

## What it does

Users interact with an AI hedge fund manager entirely through WhatsApp messages. They can invest, choose a portfolio, check performance, get explanations, switch strategies, and withdraw — all through simple chat commands.

## Product philosophy

This is a **financial version of Claude Code**, delivered via WhatsApp:

- **Zero setup** — send a message and start investing
- **Chat-first** — no dashboards, no complex UI
- **AI-managed** — you pick a portfolio, the AI does the rest
- **Progressive disclosure** — short replies by default, details only when asked
- **Minimal cognitive load** — every message is concise and focused

This is NOT a brokerage app. Users cannot trade individual stocks. The AI manages the portfolio.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run tests
pytest -v

# Start the server
uvicorn app.main:app --reload

# Run the demo
python demo.py
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/chat` | Internal chat endpoint |
| GET | `/status/{user_id}` | Portfolio status |
| GET | `/report/{user_id}` | Portfolio report |
| POST | `/webhook/whatsapp` | WhatsApp webhook receiver |
| GET | `/webhook/whatsapp` | Webhook verification |

## Chat commands

- `invest <amount>` — start investing
- `status` — current portfolio value
- `report` — weekly update
- `why` — explain performance
- `details` — holding-level breakdown
- `switch <portfolio>` — change portfolio
- `withdraw` — cash out
- `help` — list commands

## WhatsApp Integration

The `/webhook/whatsapp` endpoint accepts payloads from multiple providers:

### Twilio WhatsApp Sandbox

1. Set up a [Twilio WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox)
2. Point the webhook URL to `https://your-server/webhook/whatsapp`
3. Twilio sends `application/x-www-form-urlencoded` with `From` and `Body` fields
4. The server returns TwiML XML responses

### Meta WhatsApp Cloud API

1. Set up a [Meta WhatsApp Business app](https://developers.facebook.com/docs/whatsapp/cloud-api)
2. Configure the webhook URL to `https://your-server/webhook/whatsapp`
3. The GET endpoint handles Meta's verification challenge
4. POST payloads with the standard `entry.changes.value.messages` structure are parsed automatically
5. Replies are formatted for the Meta send-message API

### Generic JSON (local development)

```bash
curl -X POST http://localhost:8000/webhook/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"sender": "+1234567890", "message": "invest 1000"}'
```

## Architecture

```
WhatsApp message → webhook → parse → chatbot engine → session state → reply → WhatsApp
```

All modules: `portfolio.py` (products), `simulation.py` (fake P&L), `chatbot.py` (conversation engine), `whatsapp.py` (provider adapters), `storage.py` (SQLite persistence), `main.py` (FastAPI app).
