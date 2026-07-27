"""POST /api/terminal — powers the Terminal app's fake shell commands."""

from fastapi import APIRouter

from app.data import PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION
from app.schemas import TerminalCommand, TerminalOutput
from app.utils import format_table

router = APIRouter(prefix="/api", tags=["terminal"])

HELP_TEXT = (
    "available commands:\n"
    "  whoami                    - who is this\n"
    "  select * from skills      - list skills\n"
    "  select * from projects    - list projects\n"
    "  select * from experience  - list work history\n"
    "  cat education.txt         - show education\n"
    "  contact                   - how to reach me\n"
    "  sudo hire rakshit         - ;)\n"
    "  clear                     - clear the screen"
)


@router.post("/terminal", response_model=TerminalOutput)
def run_terminal_command(payload: TerminalCommand):
    cmd = payload.command.strip()
    lower = cmd.lower().rstrip(";")

    if lower in ("help", "?"):
        output = HELP_TEXT
    elif lower == "whoami":
        output = f"{PROFILE['name']} — data & business analyst, {PROFILE['location']}"
    elif lower == "select * from skills":
        rows = [{"category": g["category"], "skills": ", ".join(g["items"])} for g in SKILLS]
        output = format_table(rows, ["category", "skills"])
    elif lower == "select * from projects":
        rows = [{"name": p["name"], "stack": ", ".join(p["tags"])} for p in PROJECTS]
        output = format_table(rows, ["name", "stack"])
    elif lower == "select * from experience":
        rows = [{"role": e["role"], "org": e["org"], "date": e["date"]} for e in EXPERIENCE]
        output = format_table(rows, ["role", "org", "date"])
    elif lower in ("cat education.txt", "cat education"):
        output = "\n".join(f"{e['degree']} — {e['school']} ({e['date']})" for e in EDUCATION)
    elif lower == "contact":
        output = f"email: {PROFILE['email']}\nphone: {PROFILE['phone']}\nlinkedin: {PROFILE['linkedin']}"
    elif lower == "sudo hire rakshit":
        output = "permission granted. redirecting to contact@ ... (use the Contact app)"
    elif lower == "clear":
        output = "__CLEAR__"
    elif lower == "":
        output = ""
    else:
        output = f"command not found: {cmd}\ntype 'help' for a list of commands"

    return TerminalOutput(output=output)
