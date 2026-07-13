def validate_login_payload(data: dict | None) -> tuple[dict | None, dict[str, str]]:
    if not data or not isinstance(data, dict):
        return None, {"_form": "Cuerpo JSON inválido."}

    errors: dict[str, str] = {}
    username = _clean_text(data.get("username"))
    password = data.get("password")

    if not username:
        errors["username"] = "El usuario es obligatorio."

    if password is None or str(password).strip() == "":
        errors["password"] = "La contraseña es obligatoria."

    if errors:
        return None, errors

    return {"username": username, "password": str(password)}, {}


def _clean_text(value) -> str:
    if value is None:
        return ""
    return str(value).strip()
