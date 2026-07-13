"""Inicializa SQLite: schema, seed y usuario admin."""

from pathlib import Path

from dotenv import load_dotenv

from app.config import INSTANCE_DIR
from app.db import init_db

BACKEND_DIR = Path(__file__).resolve().parent

load_dotenv(BACKEND_DIR / ".env")


def main() -> None:
    INSTANCE_DIR.mkdir(parents=True, exist_ok=True)
    init_db()
    print("Base de datos inicializada.")


if __name__ == "__main__":
    main()
