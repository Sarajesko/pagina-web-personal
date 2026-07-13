import sqlite3

from app.db import row_to_dict


def contact_message_to_dict(row: sqlite3.Row) -> dict:
    data = row_to_dict(row)
    return {
        "id": data["id"],
        "name": data["name"],
        "email": data["email"],
        "subject": data["subject"],
        "message": data["message"],
        "is_read": bool(data.get("is_read")),
        "created_at": data.get("created_at"),
    }
