"""Contact form submission + a simple unauthenticated admin listing."""

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.database import get_db
from app.schemas import ContactMessage, ContactResponse

router = APIRouter(prefix="/api", tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactMessage):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message can't be empty")

    with get_db() as conn:
        conn.execute(
            "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
            (
                payload.name.strip(),
                payload.email,
                payload.message.strip(),
                datetime.now(timezone.utc).isoformat(),
            ),
        )
    return ContactResponse(status="ok", detail="Message received — thanks for reaching out.")


@router.get("/messages")
def list_messages():
    """Unauthenticated — intended for local/dev use. Add auth before deploying publicly."""
    with get_db() as conn:
        rows = conn.execute(
            "SELECT id, name, email, message, created_at FROM messages ORDER BY id DESC"
        ).fetchall()
    return [dict(r) for r in rows]
