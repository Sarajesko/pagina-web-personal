import sqlite3


def count(db: sqlite3.Connection) -> int:
    row = db.execute("SELECT COUNT(*) AS n FROM contact_messages").fetchone()
    return int(row["n"])


def create(
    db: sqlite3.Connection,
    *,
    name: str,
    email: str,
    subject: str,
    message: str,
) -> int:
    cursor = db.execute(
        """
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
        """,
        (name, email, subject, message),
    )
    db.commit()
    return int(cursor.lastrowid)


def list_all(db: sqlite3.Connection) -> list[sqlite3.Row]:
    return db.execute(
        """
        SELECT id, name, email, subject, message, is_read, created_at
        FROM contact_messages
        ORDER BY created_at DESC
        """
    ).fetchall()


def get_by_id(db: sqlite3.Connection, message_id: int) -> sqlite3.Row | None:
    return db.execute(
        "SELECT * FROM contact_messages WHERE id = ?",
        (message_id,),
    ).fetchone()


def mark_read(db: sqlite3.Connection, message_id: int, is_read: bool = True) -> bool:
    cursor = db.execute(
        "UPDATE contact_messages SET is_read = ? WHERE id = ?",
        (1 if is_read else 0, message_id),
    )
    db.commit()
    return cursor.rowcount > 0
