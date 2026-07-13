"""Tests de integración — API portfolio (Fase 6)."""

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def login_admin() -> None:
    response = client.post(
        "/api/admin/login",
        json={"username": "admin", "password": "changeme"},
    )
    assert response.status_code == 200, response.text
    assert response.json()["ok"] is True


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    assert data["projects"] >= 3


def test_public_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert len(data["projects"]) >= 3
    project = data["projects"][0]
    assert "title" in project
    assert isinstance(project["stack"], list)


def test_contact_valid():
    response = client.post(
        "/api/contact",
        json={
            "name": "Test Suite",
            "email": "test@example.com",
            "subject": "otro",
            "message": "Mensaje de prueba automatizada.",
            "privacy": True,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["ok"] is True
    assert data["id"] > 0


def test_contact_invalid_email():
    response = client.post(
        "/api/contact",
        json={
            "name": "Test",
            "email": "mal",
            "subject": "otro",
            "message": "Mensaje de prueba automatizada.",
            "privacy": True,
        },
    )
    assert response.status_code == 400
    assert "email" in response.json()["errors"]


def test_contact_missing_privacy():
    response = client.post(
        "/api/contact",
        json={
            "name": "Test",
            "email": "test@example.com",
            "subject": "otro",
            "message": "Mensaje de prueba automatizada.",
            "privacy": False,
        },
    )
    assert response.status_code == 400
    assert "privacy" in response.json()["errors"]


def test_admin_auth_flow():
    client.cookies.clear()
    response = client.get("/api/admin/me")
    assert response.status_code == 401

    login_admin()
    response = client.get("/api/admin/me")
    assert response.status_code == 200
    assert response.json()["username"] == "admin"

    response = client.post("/api/admin/logout")
    assert response.status_code == 200

    response = client.get("/api/admin/me")
    assert response.status_code == 401


def test_admin_projects_crud():
    client.cookies.clear()
    login_admin()

    response = client.post(
        "/api/admin/projects",
        json={
            "title": "Proyecto test suite",
            "description": "Creado en test automatizado.",
            "stack": ["Python", "FastAPI"],
            "github_url": "https://github.com/Sarajesko/test-suite",
            "is_published": False,
        },
    )
    assert response.status_code == 201
    project_id = response.json()["project"]["id"]

    response = client.get("/api/admin/projects")
    assert response.status_code == 200
    ids = [p["id"] for p in response.json()["projects"]]
    assert project_id in ids

    response = client.put(
        f"/api/admin/projects/{project_id}",
        json={"is_published": True, "title": "Proyecto test suite v2"},
    )
    assert response.status_code == 200
    assert response.json()["project"]["is_published"] is True

    response = client.get("/api/projects")
    public_ids = [p["id"] for p in response.json()["projects"]]
    assert project_id in public_ids

    response = client.delete(f"/api/admin/projects/{project_id}")
    assert response.status_code == 200


def test_admin_messages():
    client.cookies.clear()
    login_admin()

    response = client.get("/api/admin/messages")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert isinstance(data["messages"], list)
    if data["messages"]:
        msg = data["messages"][0]
        assert {"id", "name", "email", "subject", "message", "is_read", "created_at"} <= set(
            msg.keys()
        )
        message_id = msg["id"]
        response = client.patch(
            f"/api/admin/messages/{message_id}",
            json={"is_read": True},
        )
        assert response.status_code == 200
        assert response.json()["message"]["is_read"] is True


def test_admin_endpoints_require_auth():
    client.cookies.clear()
    for method, path in [
        ("GET", "/api/admin/projects"),
        ("GET", "/api/admin/messages"),
        ("POST", "/api/admin/projects"),
    ]:
        if method == "GET":
            response = client.get(path)
        else:
            response = client.post(path, json={})
        assert response.status_code == 401, f"{method} {path}"


def test_cors_headers():
    origin = "http://127.0.0.1:5500"
    response = client.options(
        "/api/contact",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == origin
    assert response.headers.get("access-control-allow-credentials") == "true"


def test_error_format_401():
    client.cookies.clear()
    response = client.get("/api/admin/me")
    assert response.status_code == 401
    data = response.json()
    assert data["ok"] is False
    assert data["error"] == "No autorizado."


def test_error_format_400_validation():
    response = client.post("/api/contact", json={})
    assert response.status_code == 400
    data = response.json()
    assert data["ok"] is False
    assert "errors" in data


def test_error_format_404():
    client.cookies.clear()
    login_admin()
    response = client.put("/api/admin/projects/999999", json={"title": "x"})
    assert response.status_code == 404
    data = response.json()
    assert data["ok"] is False
    assert "error" in data


if __name__ == "__main__":
    tests = [
        test_health,
        test_public_projects,
        test_contact_valid,
        test_contact_invalid_email,
        test_contact_missing_privacy,
        test_admin_auth_flow,
        test_admin_projects_crud,
        test_admin_messages,
        test_admin_endpoints_require_auth,
        test_cors_headers,
        test_error_format_401,
        test_error_format_400_validation,
        test_error_format_404,
    ]
    passed = 0
    for test in tests:
        test()
        print(f"OK  {test.__name__}")
        passed += 1
    print(f"\n{passed}/{len(tests)} tests passed")
