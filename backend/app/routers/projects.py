import sqlite3

from fastapi import APIRouter, Depends

from app.db import get_db
from app.models import project
from app.serializers.project import project_to_public_dict

router = APIRouter(tags=["projects"])


@router.get("/api/projects")
def list_projects(db: sqlite3.Connection = Depends(get_db)):
    rows = project.list_published(db)
    return {
        "ok": True,
        "projects": [project_to_public_dict(row) for row in rows],
    }
