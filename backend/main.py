from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from app.config import INSTANCE_DIR, REPO_ROOT, settings
from app.db import init_db
from app.errors import (
    http_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)
from app.routers import admin_auth, admin_messages, admin_projects, contact, health, projects

BACKEND_DIR = Path(__file__).resolve().parent

load_dotenv(BACKEND_DIR / ".env")


def _add_cors(app: FastAPI) -> None:
    cors_kwargs = {
        "allow_credentials": True,
        "allow_methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        "allow_headers": ["*"],
    }
    if settings.cors_allow_all:
        cors_kwargs["allow_origin_regex"] = r"https?://(localhost|127\.0\.0\.1)(:\d+)?$"
    else:
        cors_kwargs["allow_origins"] = settings.CORS_ORIGINS

    app.add_middleware(CORSMiddleware, **cors_kwargs)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    INSTANCE_DIR.mkdir(parents=True, exist_ok=True)
    init_db()
    yield


def create_app() -> FastAPI:
    INSTANCE_DIR.mkdir(parents=True, exist_ok=True)

    app = FastAPI(
        title="Portfolio Pablo García Márquez API",
        version="1.0.0",
        lifespan=lifespan,
    )

    same_site = settings.SESSION_SAME_SITE if settings.SESSION_SAME_SITE in ("lax", "strict", "none") else "lax"

    app.add_middleware(
        SessionMiddleware,
        secret_key=settings.SECRET_KEY,
        max_age=settings.SESSION_MAX_AGE,
        same_site=same_site,
        https_only=settings.SESSION_HTTPS_ONLY,
    )

    _add_cors(app)

    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)

    app.include_router(health.router)
    app.include_router(contact.router)
    app.include_router(projects.router)
    app.include_router(admin_auth.router)
    app.include_router(admin_projects.router)
    app.include_router(admin_messages.router)

    if settings.SERVE_FRONTEND:
        frontend_dir = REPO_ROOT / "frontend"
        assets_dir = REPO_ROOT / "assets"
        if assets_dir.is_dir():
            app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")
        if frontend_dir.is_dir():
            app.mount(
                "/frontend",
                StaticFiles(directory=str(frontend_dir), html=True),
                name="frontend",
            )

            @app.get("/")
            def root_redirect():
                return RedirectResponse(url="/frontend/")

    return app


app = create_app()
