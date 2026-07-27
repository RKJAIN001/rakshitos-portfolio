"""GET /api/profile — all portfolio content in one payload."""

from fastapi import APIRouter

from app.data import PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, ACHIEVEMENTS, LEADERSHIP

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile")
def get_profile():
    return {
        "profile": PROFILE,
        "experience": EXPERIENCE,
        "projects": PROJECTS,
        "skills": SKILLS,
        "education": EDUCATION,
        "achievements": ACHIEVEMENTS,
        "leadership": LEADERSHIP,
    }
