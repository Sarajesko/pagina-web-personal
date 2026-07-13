import sqlite3

from fastapi import APIRouter, Depends

from app.db import get_db
from app.models import project

router = APIRouter(tags=["health"])


@router.get("/api/health")
def health_check(db: sqlite3.Connection = Depends(get_db)):
    db.execute("SELECT 1").fetchone()
    return {
        "status": "ok",
        "database": "connected",
        "projects": project.count(db),
    }
