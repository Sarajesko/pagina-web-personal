from dataclasses import dataclass

from fastapi import HTTPException, Request

ADMIN_USER_ID_KEY = "admin_user_id"
ADMIN_USERNAME_KEY = "admin_username"


@dataclass
class AdminSession:
    id: int
    username: str


def login_admin(request: Request, user_id: int, username: str) -> None:
    request.session.clear()
    request.session[ADMIN_USER_ID_KEY] = user_id
    request.session[ADMIN_USERNAME_KEY] = username


def logout_admin(request: Request) -> None:
    request.session.clear()


def get_current_admin_id(request: Request) -> int | None:
    value = request.session.get(ADMIN_USER_ID_KEY)
    return int(value) if value is not None else None


def get_current_admin_username(request: Request) -> str | None:
    return request.session.get(ADMIN_USERNAME_KEY)


def require_admin(request: Request) -> AdminSession:
    admin_id = get_current_admin_id(request)
    username = get_current_admin_username(request)
    if admin_id is None or username is None:
        raise HTTPException(
            status_code=401,
            detail={"ok": False, "error": "No autorizado."},
        )
    return AdminSession(id=admin_id, username=username)
