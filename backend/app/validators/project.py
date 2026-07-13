import re

URL_RE = re.compile(r"^https?://[^\s/$.?#].[^\s]*$", re.IGNORECASE)

MAX_TITLE_LENGTH = 120
MAX_DESCRIPTION_LENGTH = 2000
MAX_STACK_LENGTH = 500
MAX_URL_LENGTH = 500


def validate_project_payload(
    data: dict | None,
    *,
    partial: bool = False,
) -> tuple[dict | None, dict[str, str]]:
    if not data or not isinstance(data, dict):
        return None, {"_form": "Cuerpo JSON inválido."}

    errors: dict[str, str] = {}
    result: dict = {}

    if not partial or "title" in data:
        title = _clean_text(data.get("title"))
        if not title:
            errors["title"] = "El título es obligatorio."
        elif len(title) > MAX_TITLE_LENGTH:
            errors["title"] = f"Máximo {MAX_TITLE_LENGTH} caracteres."
        else:
            result["title"] = title

    if not partial or "description" in data:
        description = _clean_text(data.get("description"))
        if not description:
            errors["description"] = "La descripción es obligatoria."
        elif len(description) > MAX_DESCRIPTION_LENGTH:
            errors["description"] = f"Máximo {MAX_DESCRIPTION_LENGTH} caracteres."
        else:
            result["description"] = description

    if not partial or "stack" in data:
        stack = _normalize_stack(data.get("stack"))
        if not stack:
            errors["stack"] = "El stack es obligatorio."
        elif len(stack) > MAX_STACK_LENGTH:
            errors["stack"] = f"Máximo {MAX_STACK_LENGTH} caracteres."
        else:
            result["stack"] = stack

    if not partial or "github_url" in data:
        github_url = _clean_text(data.get("github_url"))
        if not github_url:
            errors["github_url"] = "La URL de GitHub es obligatoria."
        elif len(github_url) > MAX_URL_LENGTH:
            errors["github_url"] = f"Máximo {MAX_URL_LENGTH} caracteres."
        elif not URL_RE.match(github_url):
            errors["github_url"] = "URL no válida (debe empezar por http:// o https://)."
        else:
            result["github_url"] = github_url

    if "image_url" in data:
        image_url = _clean_text(data.get("image_url"))
        if image_url:
            if len(image_url) > MAX_URL_LENGTH:
                errors["image_url"] = f"Máximo {MAX_URL_LENGTH} caracteres."
            elif not URL_RE.match(image_url) and not image_url.startswith("../"):
                errors["image_url"] = "URL de imagen no válida."
            else:
                result["image_url"] = image_url
        else:
            result["image_url"] = None

    if not partial or "is_featured" in data:
        result["is_featured"] = _to_bool(data.get("is_featured"), default=False)

    if not partial or "sort_order" in data:
        sort_order, sort_error = _to_int(data.get("sort_order"), default=0)
        if sort_error:
            errors["sort_order"] = sort_error
        else:
            result["sort_order"] = sort_order

    if not partial or "is_published" in data:
        result["is_published"] = _to_bool(data.get("is_published"), default=True)

    if errors:
        return None, errors

    if partial and not result:
        return None, {"_form": "No hay campos para actualizar."}

    return result, {}


def _clean_text(value) -> str:
    if value is None:
        return ""
    return str(value).strip()


def _normalize_stack(value) -> str:
    if isinstance(value, list):
        parts = [_clean_text(item) for item in value]
        return ",".join(part for part in parts if part)
    return _clean_text(value)


def _to_bool(value, *, default: bool) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.lower() in {"1", "true", "yes", "on"}
    return bool(value)


def _to_int(value, *, default: int) -> tuple[int, str | None]:
    if value is None:
        return default, None
    try:
        return int(value), None
    except (TypeError, ValueError):
        return default, "Debe ser un número entero."
