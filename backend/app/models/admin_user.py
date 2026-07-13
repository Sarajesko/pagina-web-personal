import sqlite3


def count(db: sqlite3.Connection) -> int:
    row = db.execute("SELECT COUNT(*) AS n FROM admin_users").fetchone()
    return int(row["n"])


def get_by_username(db: sqlite3.Connection, username: str) -> sqlite3.Row | None:
    return db.execute(
        "SELECT id, username, password_hash, created_at FROM admin_users WHERE username = ?",
        (username,),
    ).fetchone()


def create(db: sqlite3.Connection, *, username: str, password_hash: str) -> int:
    cursor = db.execute(
        "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
        (username, password_hash),
    )
    db.commit()
    return int(cursor.lastrowid)
