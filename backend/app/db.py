import sqlite3
from pathlib import Path

from werkzeug.security import generate_password_hash

from app.config import settings
from app.models import admin_user, project

BACKEND_DIR = Path(__file__).resolve().parent.parent


def connect_db(database: str | None = None) -> sqlite3.Connection:
    db = sqlite3.connect(
        database or settings.DATABASE,
        detect_types=sqlite3.PARSE_DECLTYPES,
    )
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys = ON")
    return db


def get_db():
    db = connect_db()
    try:
        yield db
    finally:
        db.close()


def row_to_dict(row: sqlite3.Row | None) -> dict | None:
    if row is None:
        return None
    return dict(row)


def _run_sql_file(db: sqlite3.Connection, filename: str) -> None:
    path = BACKEND_DIR / filename
    db.executescript(path.read_text(encoding="utf-8"))


def init_db(database: str | None = None) -> None:
    db = connect_db(database)
    try:
        _run_sql_file(db, "schema.sql")

        if project.count(db) == 0:
            _run_sql_file(db, "seed.sql")

        if admin_user.count(db) == 0:
            admin_user.create(
                db,
                username=settings.ADMIN_USERNAME,
                password_hash=generate_password_hash(settings.ADMIN_PASSWORD),
            )

        db.commit()
    finally:
        db.close()
