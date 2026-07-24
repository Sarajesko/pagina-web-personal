"""Tests de integración — API portfolio.

Usa BD temporal + lifespan (init_db) para no depender de instance/ local.
Ejecutar desde backend/:
  python test_api.py
"""

from __future__ import annotations

import os
import tempfile
import unittest
from pathlib import Path

# BD aislada ANTES de importar la app (Settings lee env al importar)
_TEST_DB = Path(tempfile.gettempdir()) / f"portfolio-test-{os.getpid()}.db"
if _TEST_DB.exists():
    _TEST_DB.unlink()

os.environ["DATABASE_PATH"] = str(_TEST_DB)
os.environ.setdefault("ADMIN_USERNAME", "admin")
os.environ.setdefault("ADMIN_PASSWORD", "changeme")
os.environ.setdefault("ENV", "development")
os.environ.setdefault("CORS_ORIGINS", "*")
os.environ.setdefault("SERVE_FRONTEND", "true")
os.environ.setdefault("SESSION_HTTPS_ONLY", "false")
os.environ.setdefault("SESSION_SAME_SITE", "lax")
os.environ.setdefault("SECRET_KEY", "test-secret-key")

from fastapi.testclient import TestClient

from main import app  # noqa: E402


class PortfolioAPITests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        # Context manager dispara lifespan → init_db + seed
        cls._cm = TestClient(app)
        cls.client = cls._cm.__enter__()

    @classmethod
    def tearDownClass(cls) -> None:
        cls._cm.__exit__(None, None, None)
        if _TEST_DB.exists():
            _TEST_DB.unlink(missing_ok=True)

    def setUp(self) -> None:
        self.client.cookies.clear()

    def login_admin(self) -> None:
        response = self.client.post(
            "/api/admin/login",
            json={"username": "admin", "password": "changeme"},
        )
        self.assertEqual(response.status_code, 200, response.text)
        self.assertTrue(response.json()["ok"])

    def test_01_health(self) -> None:
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["database"], "connected")
        self.assertGreaterEqual(data["projects"], 3)

    def test_02_root_redirects_to_frontend(self) -> None:
        response = self.client.get("/", follow_redirects=False)
        self.assertIn(response.status_code, (307, 302))
        self.assertEqual(response.headers.get("location"), "/frontend/")

    def test_03_frontend_static(self) -> None:
        response = self.client.get("/frontend/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("text/html", response.headers.get("content-type", ""))
        body = response.text
        self.assertIn("Pablo García Márquez", body)
        self.assertIn("mapa__arc", body)

    def test_04_admin_static(self) -> None:
        response = self.client.get("/frontend/admin/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("text/html", response.headers.get("content-type", ""))

    def test_05_assets_mount(self) -> None:
        response = self.client.get("/assets/favicon/favicon.svg")
        self.assertEqual(response.status_code, 200)

    def test_06_public_projects(self) -> None:
        response = self.client.get("/api/projects")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertGreaterEqual(len(data["projects"]), 3)
        project = data["projects"][0]
        self.assertIn("title", project)
        self.assertIsInstance(project["stack"], list)

    def test_07_contact_valid(self) -> None:
        response = self.client.post(
            "/api/contact",
            json={
                "name": "Test Suite",
                "email": "test@example.com",
                "subject": "otro",
                "message": "Mensaje de prueba automatizada.",
                "privacy": True,
            },
        )
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertGreater(data["id"], 0)

    def test_08_contact_practicas_daw(self) -> None:
        response = self.client.post(
            "/api/contact",
            json={
                "name": "RRHH Demo",
                "email": "rrhh@empresa.test",
                "subject": "practicas-daw",
                "message": "Nos interesa tu perfil para prácticas.",
                "privacy": True,
            },
        )
        self.assertEqual(response.status_code, 201, response.text)

    def test_09_contact_invalid_email(self) -> None:
        response = self.client.post(
            "/api/contact",
            json={
                "name": "Test",
                "email": "mal",
                "subject": "otro",
                "message": "Mensaje de prueba automatizada.",
                "privacy": True,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json()["errors"])

    def test_10_contact_missing_privacy(self) -> None:
        response = self.client.post(
            "/api/contact",
            json={
                "name": "Test",
                "email": "test@example.com",
                "subject": "otro",
                "message": "Mensaje de prueba automatizada.",
                "privacy": False,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("privacy", response.json()["errors"])

    def test_11_contact_roundtrip_admin(self) -> None:
        marker = f"roundtrip-{os.getpid()}"
        created = self.client.post(
            "/api/contact",
            json={
                "name": "Roundtrip User",
                "email": "roundtrip@example.com",
                "subject": "colaboracion",
                "message": marker,
                "privacy": True,
            },
        )
        self.assertEqual(created.status_code, 201)
        msg_id = created.json()["id"]

        self.login_admin()
        listed = self.client.get("/api/admin/messages")
        self.assertEqual(listed.status_code, 200)
        messages = listed.json()["messages"]
        match = next((m for m in messages if m["id"] == msg_id), None)
        self.assertIsNotNone(match)
        self.assertEqual(match["message"], marker)
        self.assertFalse(match["is_read"])

        patched = self.client.patch(
            f"/api/admin/messages/{msg_id}",
            json={"is_read": True},
        )
        self.assertEqual(patched.status_code, 200)
        self.assertTrue(patched.json()["message"]["is_read"])

    def test_12_admin_auth_flow(self) -> None:
        response = self.client.get("/api/admin/me")
        self.assertEqual(response.status_code, 401)

        self.login_admin()
        response = self.client.get("/api/admin/me")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["username"], "admin")

        response = self.client.post("/api/admin/logout")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/admin/me")
        self.assertEqual(response.status_code, 401)

    def test_13_admin_login_wrong_password(self) -> None:
        response = self.client.post(
            "/api/admin/login",
            json={"username": "admin", "password": "wrong"},
        )
        self.assertEqual(response.status_code, 401)

    def test_14_admin_projects_crud(self) -> None:
        self.login_admin()

        response = self.client.post(
            "/api/admin/projects",
            json={
                "title": "Proyecto test suite",
                "description": "Creado en test automatizado.",
                "stack": ["Python", "FastAPI"],
                "github_url": "https://github.com/Sarajesko/test-suite",
                "is_published": False,
            },
        )
        self.assertEqual(response.status_code, 201)
        project_id = response.json()["project"]["id"]

        response = self.client.get("/api/admin/projects")
        self.assertEqual(response.status_code, 200)
        ids = [p["id"] for p in response.json()["projects"]]
        self.assertIn(project_id, ids)

        # No publicado → no en listado público
        public_before = self.client.get("/api/projects")
        public_ids = [p["id"] for p in public_before.json()["projects"]]
        self.assertNotIn(project_id, public_ids)

        response = self.client.put(
            f"/api/admin/projects/{project_id}",
            json={"is_published": True, "title": "Proyecto test suite v2"},
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["project"]["is_published"])

        response = self.client.get("/api/projects")
        public_ids = [p["id"] for p in response.json()["projects"]]
        self.assertIn(project_id, public_ids)

        response = self.client.delete(f"/api/admin/projects/{project_id}")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/projects")
        public_ids = [p["id"] for p in response.json()["projects"]]
        self.assertNotIn(project_id, public_ids)

    def test_15_admin_messages_list_shape(self) -> None:
        self.login_admin()
        response = self.client.get("/api/admin/messages")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertIsInstance(data["messages"], list)
        if data["messages"]:
            msg = data["messages"][0]
            self.assertTrue(
                {"id", "name", "email", "subject", "message", "is_read", "created_at"}
                <= set(msg.keys())
            )

    def test_16_admin_endpoints_require_auth(self) -> None:
        for method, path in [
            ("GET", "/api/admin/projects"),
            ("GET", "/api/admin/messages"),
            ("POST", "/api/admin/projects"),
        ]:
            if method == "GET":
                response = self.client.get(path)
            else:
                response = self.client.post(path, json={})
            self.assertEqual(response.status_code, 401, f"{method} {path}")

    def test_17_cors_headers(self) -> None:
        origin = "http://127.0.0.1:5500"
        response = self.client.options(
            "/api/contact",
            headers={
                "Origin": origin,
                "Access-Control-Request-Method": "POST",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get("access-control-allow-origin"), origin)
        self.assertEqual(
            response.headers.get("access-control-allow-credentials"), "true"
        )

    def test_18_error_format_401(self) -> None:
        response = self.client.get("/api/admin/me")
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["ok"])
        self.assertEqual(data["error"], "No autorizado.")

    def test_19_error_format_400_validation(self) -> None:
        response = self.client.post("/api/contact", json={})
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data["ok"])
        self.assertIn("errors", data)

    def test_20_error_format_404(self) -> None:
        self.login_admin()
        response = self.client.put("/api/admin/projects/999999", json={"title": "x"})
        self.assertEqual(response.status_code, 404)
        data = response.json()
        self.assertFalse(data["ok"])
        self.assertIn("error", data)

    def test_21_db_file_created(self) -> None:
        self.assertTrue(_TEST_DB.exists(), "SQLite de test no creado")
        self.assertGreater(_TEST_DB.stat().st_size, 0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
