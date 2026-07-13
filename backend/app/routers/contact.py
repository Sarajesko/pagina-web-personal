import sqlite3
from typing import Any

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse

from app.db import get_db
from app.models import contact_message
from app.validators.contact import validate_contact_payload

router = APIRouter(tags=["contact"])


@router.post("/api/contact")
def submit_contact(
    db: sqlite3.Connection = Depends(get_db),
    body: dict[str, Any] | None = Body(default=None),
):
    payload, errors = validate_contact_payload(body)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})

    try:
        message_id = contact_message.create(
            db,
            name=payload["name"],
            email=payload["email"],
            subject=payload["subject"],
            message=payload["message"],
        )
    except Exception:
        return JSONResponse(
            status_code=500,
            content={"ok": False, "error": "No se pudo guardar el mensaje."},
        )

    return JSONResponse(
        status_code=201,
        content={
            "ok": True,
            "id": message_id,
            "message": "Mensaje recibido. Te responderé pronto.",
        },
    )
