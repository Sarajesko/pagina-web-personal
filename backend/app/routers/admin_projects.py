import sqlite3
from typing import Any

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse

from app.auth import AdminSession, require_admin
from app.db import get_db, row_to_dict
from app.models import project as project_model
from app.serializers.project import project_to_admin_dict
from app.validators.project import validate_project_payload

router = APIRouter(tags=["admin-projects"])


@router.get("/api/admin/projects")
def list_admin_projects(
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
):
    rows = project_model.list_all(db)
    return {
        "ok": True,
        "projects": [project_to_admin_dict(row) for row in rows],
    }


@router.post("/api/admin/projects")
def create_project(
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
    body: dict[str, Any] | None = Body(default=None),
):
    payload, errors = validate_project_payload(body)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})

    project_id = project_model.create(
        db,
        title=payload["title"],
        description=payload["description"],
        stack=payload["stack"],
        github_url=payload["github_url"],
        image_url=payload.get("image_url"),
        is_featured=payload.get("is_featured", False),
        sort_order=payload.get("sort_order", 0),
        is_published=payload.get("is_published", True),
    )
    row = project_model.get_by_id(db, project_id)
    return JSONResponse(
        status_code=201,
        content={"ok": True, "project": project_to_admin_dict(row)},
    )


@router.put("/api/admin/projects/{project_id}")
def update_project(
    project_id: int,
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
    body: dict[str, Any] | None = Body(default=None),
):
    existing = project_model.get_by_id(db, project_id)
    if existing is None:
        return JSONResponse(
            status_code=404,
            content={"ok": False, "error": "Proyecto no encontrado."},
        )

    payload, errors = validate_project_payload(body, partial=True)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})

    current = row_to_dict(existing)
    merged = {
        "title": current["title"],
        "description": current["description"],
        "stack": current["stack"],
        "github_url": current["github_url"],
        "image_url": current.get("image_url"),
        "is_featured": bool(current.get("is_featured")),
        "sort_order": current.get("sort_order", 0),
        "is_published": bool(current.get("is_published")),
    }
    merged.update(payload)

    updated = project_model.update(
        db,
        project_id,
        title=merged["title"],
        description=merged["description"],
        stack=merged["stack"],
        github_url=merged["github_url"],
        image_url=merged["image_url"],
        is_featured=merged["is_featured"],
        sort_order=merged["sort_order"],
        is_published=merged["is_published"],
    )
    if not updated:
        return JSONResponse(
            status_code=404,
            content={"ok": False, "error": "Proyecto no encontrado."},
        )

    row = project_model.get_by_id(db, project_id)
    return {"ok": True, "project": project_to_admin_dict(row)}


@router.delete("/api/admin/projects/{project_id}")
def delete_project(
    project_id: int,
    _admin: AdminSession = Depends(require_admin),
    db: sqlite3.Connection = Depends(get_db),
):
    if not project_model.delete(db, project_id):
        return JSONResponse(
            status_code=404,
            content={"ok": False, "error": "Proyecto no encontrado."},
        )
    return {"ok": True, "message": "Proyecto eliminado."}
