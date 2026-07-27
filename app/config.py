"""App-wide configuration and constants."""

import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
DB_PATH = BASE_DIR / "portfolio.db"

APP_START_TIME = time.time()
