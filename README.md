# rakshitOS — Rakshit Jain Portfolio (Full Stack)

A macOS-style desktop portfolio — menu bar, dock with magnification,
draggable/resizable/zoomable windows, and a working terminal — backed by
a properly structured FastAPI application. Nothing is hardcoded in HTML;
every window fetches its content from the API.

## Project structure

```
portfolio-fullstack/
├── requirements.txt
├── app/                      backend (FastAPI)
│   ├── main.py                app factory — wires routers + static files
│   ├── config.py               paths & constants
│   ├── database.py             SQLite connection + schema
│   ├── schemas.py               Pydantic request/response models
│   ├── data.py                   all portfolio content — edit this to update the site
│   ├── utils.py                   shared helpers (ASCII table formatter)
│   └── routers/
│       ├── profile.py              GET  /api/profile
│       ├── contact.py               POST /api/contact, GET /api/messages
│       ├── stats.py                  GET  /api/stats
│       └── terminal.py                POST /api/terminal
└── static/                    frontend (vanilla HTML/CSS/JS, no build step)
    ├── index.html               desktop shell + window templates
    ├── css/
    │   ├── base.css               tokens, reset, wallpaper, boot screen
    │   ├── menubar.css             top menu bar
    │   ├── dock.css                 dock + magnification
    │   ├── windows.css               window chrome, traffic lights
    │   └── apps.css                  per-app content styling
    └── js/
        ├── api.js                   fetch wrappers for the backend
        ├── windowManager.js          open/close/minimize/zoom/drag/resize
        ├── dock.js                    dock rendering + hover magnify
        ├── menubar.js                  active app name, menus, clock, stats
        ├── apps.js                      renders API data into each window
        └── main.js                       boots the OS
```

Each backend file has one job — routers only handle HTTP, `data.py` only
holds content, `database.py` only talks to SQLite. Same idea on the
frontend: the window manager doesn't know about your resume content, and
`apps.js` doesn't know how dragging works. Change one thing, touch one file.

## Run it locally

```bash
cd portfolio-fullstack
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Open **http://127.0.0.1:8000**.

> On Windows, if the bare `uvicorn` command isn't recognized, always use
> `python -m uvicorn app.main:app --reload` — same effect, no PATH issues.

## What the backend does

- `GET /api/profile` — returns all content (about, experience, projects,
  skills, education, achievements) as one JSON payload.
- `POST /api/contact` — the Contact window posts here; messages are saved
  to `portfolio.db` (SQLite, created automatically).
- `GET /api/messages` — lists stored messages. No auth — fine for local
  use, add an API key before exposing this publicly.
- `GET /api/stats` — visit counter + backend uptime, shown live in the
  menu bar and the Monitor window.
- `POST /api/terminal` — powers the Terminal app. Try `help`,
  `select * from skills`, `select * from projects`, `whoami`, `contact`.

## Editing content

Everything you'd normally hand-edit in HTML lives in `app/data.py` instead
— plain Python lists/dicts for name, summary, stats, experience, projects,
skills, and education. Change it, restart the server (or just refresh if
using `--reload`).

## Desktop interactions

- **Traffic lights** — red closes, yellow minimizes to the dock, green
  zooms (maximize/restore). Double-click a title bar to zoom too.
- **Dock** — click an icon to open its app; a dot under the icon means
  it's running; hover to see the magnification effect.
- **Menu bar** — shows the active app's name; File → Close Window and
  Window → Minimize/Zoom act on whichever window is focused.
- Windows are draggable by their title bar and resizable from the
  bottom-right corner.

## Deploying it for real

`app/main.py` serves both the API and the static frontend, so a single
Python host works:

- **Render / Railway / Fly.io** — start command
  `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **A VPS** — run behind nginx + `gunicorn -k uvicorn.workers.UvicornWorker app.main:app`.

To host the frontend separately, set `RJOS.api.base` in `static/js/api.js`
to your backend's URL, and lock down `allow_origins` in `app/main.py`
(currently `["*"]`) to your real domain.

## Known placeholders

- Project GitHub/live-demo links in `app/data.py` are `"#"` — swap in your
  real URLs.
- `/api/messages` has no authentication — add a check before deploying
  publicly if you don't want anyone reading submitted messages.
