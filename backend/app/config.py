import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
INSTANCE_DIR = BASE_DIR / "instance"
DEFAULT_DB = INSTANCE_DIR / "portfolio.db"
REPO_ROOT = BASE_DIR.parent


class Settings:
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "dev-change-me-in-production")
    DATABASE: str = os.environ.get("DATABASE_PATH", str(DEFAULT_DB))
    ADMIN_USERNAME: str = os.environ.get("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.environ.get("ADMIN_PASSWORD", "changeme")
    SESSION_MAX_AGE: int = int(
        os.environ.get("SESSION_MAX_AGE", str(int(timedelta(hours=8).total_seconds())))
    )
    CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.environ.get("CORS_ORIGINS", "*").split(",")
        if origin.strip()
    ]
    # production | development
    ENV: str = os.environ.get("ENV", "development").lower()
    # lax (mismo origen) | none (Pages → API en otro dominio; requiere HTTPS)
    SESSION_SAME_SITE: str = os.environ.get(
        "SESSION_SAME_SITE",
        "none" if os.environ.get("ENV", "").lower() == "production" else "lax",
    ).lower()
    SESSION_HTTPS_ONLY: bool = os.environ.get(
        "SESSION_HTTPS_ONLY",
        "true" if os.environ.get("ENV", "").lower() == "production" else "false",
    ).lower() in ("1", "true", "yes")
    SERVE_FRONTEND: bool = os.environ.get("SERVE_FRONTEND", "true").lower() in (
        "1",
        "true",
        "yes",
    )

    @property
    def cors_allow_all(self) -> bool:
        return len(self.CORS_ORIGINS) == 1 and self.CORS_ORIGINS[0] == "*"


settings = Settings()
