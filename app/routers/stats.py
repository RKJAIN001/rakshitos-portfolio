"""Live visit counter + backend uptime — powers the menu bar and Monitor app."""

import time
from datetime import datetime, timezone

from fastapi import APIRouter

from app.config import APP_START_TIME
from app.database import get_db
from app.schemas import Stats

router = APIRouter(prefix="/api", tags=["stats"])


@router.get("/stats", response_model=Stats)
def get_stats():
    with get_db() as conn:
        conn.execute(
            "INSERT INTO visits (visited_at) VALUES (?)",
            (datetime.now(timezone.utc).isoformat(),),
        )
        total_visits = conn.execute("SELECT COUNT(*) AS c FROM visits").fetchone()["c"]
        total_messages = conn.execute("SELECT COUNT(*) AS c FROM messages").fetchone()["c"]

    return Stats(
        visits=total_visits,
        messages=total_messages,
        uptime_seconds=int(time.time() - APP_START_TIME),
        server_time=datetime.now(timezone.utc).isoformat(),
    )
