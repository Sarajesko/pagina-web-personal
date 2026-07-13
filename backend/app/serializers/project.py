import sqlite3

from app.db import row_to_dict


def parse_stack(stack: str | None) -> list[str]:
    if not stack:
        return []
    return [part.strip() for part in stack.split(",") if part.strip()]


def project_to_public_dict(row: sqlite3.Row) -> dict:
    data = row_to_dict(row)
    return {
        "id": data["id"],
        "title": data["title"],
        "description": data["description"],
        "stack": parse_stack(data.get("stack")),
        "github_url": data["github_url"],
        "image_url": data.get("image_url"),
        "is_featured": bool(data.get("is_featured")),
        "sort_order": data.get("sort_order", 0),
    }


def project_to_admin_dict(row: sqlite3.Row) -> dict:
    data = project_to_public_dict(row)
    raw = row_to_dict(row)
    data["is_published"] = bool(raw.get("is_published"))
    data["created_at"] = raw.get("created_at")
    data["updated_at"] = raw.get("updated_at")
    return data
