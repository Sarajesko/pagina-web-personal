import re

ALLOWED_SUBJECTS = frozenset({"practicas-daw", "colaboracion", "otro"})

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

MIN_MESSAGE_LENGTH = 10
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 5000


def validate_contact_payload(data: dict | None) -> tuple[dict | None, dict[str, str]]:
    if not data or not isinstance(data, dict):
        return None, {"_form": "Cuerpo JSON inválido."}

    errors: dict[str, str] = {}

    name = _clean_text(data.get("name"))
    if not name:
        errors["name"] = "El nombre es obligatorio."
    elif len(name) > MAX_NAME_LENGTH:
        errors["name"] = f"Máximo {MAX_NAME_LENGTH} caracteres."

    email = _clean_text(data.get("email"))
    if not email:
        errors["email"] = "El email es obligatorio."
    elif len(email) > MAX_EMAIL_LENGTH:
        errors["email"] = f"Máximo {MAX_EMAIL_LENGTH} caracteres."
    elif not EMAIL_RE.match(email):
        errors["email"] = "Formato de email no válido."

    subject = _clean_text(data.get("subject"))
    if not subject:
        errors["subject"] = "Selecciona un asunto."
    elif subject not in ALLOWED_SUBJECTS:
        errors["subject"] = "Asunto no válido."

    message = _clean_text(data.get("message"))
    if not message:
        errors["message"] = "El mensaje es obligatorio."
    elif len(message) < MIN_MESSAGE_LENGTH:
        errors["message"] = f"Mínimo {MIN_MESSAGE_LENGTH} caracteres."
    elif len(message) > MAX_MESSAGE_LENGTH:
        errors["message"] = f"Máximo {MAX_MESSAGE_LENGTH} caracteres."

    privacy = data.get("privacy")
    if privacy not in (True, "true", 1, "1", "on"):
        errors["privacy"] = "Debes aceptar la política de privacidad."

    if errors:
        return None, errors

    return {
        "name": name,
        "email": email.lower(),
        "subject": subject,
        "message": message,
    }, {}


def _clean_text(value) -> str:
    if value is None:
        return ""
    return str(value).strip()
