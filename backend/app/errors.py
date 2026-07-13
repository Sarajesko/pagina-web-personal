from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
    if isinstance(exc.detail, dict):
        content = {"ok": False, **exc.detail}
        return JSONResponse(status_code=exc.status_code, content=content)
    return JSONResponse(
        status_code=exc.status_code,
        content={"ok": False, "error": str(exc.detail)},
    )


async def validation_exception_handler(
    _request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    errors: dict[str, str] = {}
    for err in exc.errors():
        loc = err.get("loc", ())
        parts = [str(part) for part in loc if part not in ("body", "query", "path")]
        key = parts[-1] if parts else "_form"
        if key in errors:
            key = "_form"
        errors[key] = _humanize_validation_message(err.get("msg", "Valor no válido."))

    if not errors:
        errors["_form"] = "Datos de entrada no válidos."

    return JSONResponse(status_code=400, content={"ok": False, "errors": errors})


async def unhandled_exception_handler(_request: Request, _exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"ok": False, "error": "Error interno del servidor."},
    )


def _humanize_validation_message(message: str) -> str:
    if message == "Field required":
        return "Campo obligatorio."
    if message.startswith("Value error"):
        return "Valor no válido."
    return message
