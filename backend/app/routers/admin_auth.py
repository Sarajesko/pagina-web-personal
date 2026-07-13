import sqlite3
from typing import Any

from fastapi import APIRouter, Body, Depends, Request
from fastapi.responses import JSONResponse
from werkzeug.security import check_password_hash

from app.auth import AdminSession, login_admin, logout_admin, require_admin
from app.db import get_db
from app.models import admin_user
from app.validators.admin import validate_login_payload

router = APIRouter(tags=["admin"])


@router.post("/api/admin/login")
def admin_login(
    request: Request,
    db: sqlite3.Connection = Depends(get_db),
    body: dict[str, Any] | None = Body(default=None),
):
    payload, errors = validate_login_payload(body)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})

    user = admin_user.get_by_username(db, payload["username"])
    if user is None or not check_password_hash(user["password_hash"], payload["password"]):
        return JSONResponse(
            status_code=401,
            content={"ok": False, "error": "Usuario o contraseña incorrectos."},
        )

    login_admin(request, user["id"], user["username"])
    return {"ok": True, "username": user["username"]}


@router.post("/api/admin/logout")
def admin_logout(request: Request, _admin: AdminSession = Depends(require_admin)):
    logout_admin(request)
    return {"ok": True, "message": "Sesión cerrada."}


@router.get("/api/admin/me")
def admin_me(admin: AdminSession = Depends(require_admin)):
    return {"ok": True, "id": admin.id, "username": admin.username}
