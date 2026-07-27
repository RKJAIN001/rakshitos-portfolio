"""
rakshitOS backend entry point.

Run with:
    uvicorn app.main:app --reload

Then open http://127.0.0.1:8000 — this one app serves both the API and
the frontend, so there's nothing else to start.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import STATIC_DIR
from app.database import init_db
from app.routers import contact, profile, stats, terminal

app = FastAPI(title="Rakshit Jain — Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


# API routers — each owns one concern (see app/routers/)
app.include_router(profile.router)
app.include_router(contact.router)
app.include_router(stats.router)
app.include_router(terminal.router)

# Static frontend — mounted last so it never shadows /api/* routes
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
