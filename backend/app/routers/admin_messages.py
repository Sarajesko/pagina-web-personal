import sqlite3
from typing import Any

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse

from app.auth import AdminSession, require_admin
from app.db import get_db
from app.models import contact_message
from app.serializers.contact_message import contact_message_to_dict

router = APIRouter(tags=["admin-messages"])


@router.get("/api/admin/messages")
def list_admin_messages(
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
):
    rows = contact_message.list_all(db)
    return {
        "ok": True,
        "messages": [contact_message_to_dict(row) for row in rows],
    }


@router.patch("/api/admin/messages/{message_id}")
def patch_admin_message(
    message_id: int,
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
    body: dict[str, Any] | None = Body(default=None),
):
    if body is None or "is_read" not in body:
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "Campo is_read obligatorio."},
        )

    if contact_message.get_by_id(db, message_id) is None:
        return JSONResponse(
            status_code=404,
            content={"ok": False, "error": "Mensaje no encontrado."},
        )

    is_read = body["is_read"] in (True, "true", 1, "1")
    contact_message.mark_read(db, message_id, is_read)
    row = contact_message.get_by_id(db, message_id)
    return {"ok": True, "message": contact_message_to_dict(row)}