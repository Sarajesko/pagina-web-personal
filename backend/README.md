# Backend — FastAPI + SQLite

API REST para formulario de contacto, proyectos públicos y panel administrador.

**Probar con Postman** (colección en `postman/`) o con la documentación interactiva en `/docs`.

## Arranque en local

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
copy .env.example .env         # Windows — ajusta ADMIN_PASSWORD y SECRET_KEY
# cp .env.example .env         # macOS / Linux
python init_db.py
python run.py
```

- API: [http://127.0.0.1:5000](http://127.0.0.1:5000)
- Swagger UI: [http://127.0.0.1:5000/docs](http://127.0.0.1:5000/docs)
- Health: [http://127.0.0.1:5000/api/health](http://127.0.0.1:5000/api/health)
- Panel admin: `../frontend/admin/index.html` (con Live Server + API en marcha)

## Configuración (`.env`)

1. Copia `.env.example` → `.env` en esta carpeta (`backend/`).
2. **Nunca** subas `.env` al repositorio (ya está en `.gitignore`).
3. Ejecuta `python init_db.py` **después** de definir `ADMIN_USERNAME` / `ADMIN_PASSWORD` (crea el usuario admin la primera vez).

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `SECRET_KEY` | Recomendada | Firma de cookies de sesión. En producción usa un valor aleatorio largo. |
| `DATABASE_PATH` | No | Ruta SQLite. Por defecto: `instance/portfolio.db`. |
| `ADMIN_USERNAME` | No | Usuario panel admin. Por defecto: `admin`. |
| `ADMIN_PASSWORD` | No | Contraseña admin. Por defecto: `changeme` — **cámbiala**. |
| `SESSION_MAX_AGE` | No | Segundos de sesión (default `28800` = 8 h). |
| `CORS_ORIGINS` | No | Orígenes frontend. `*` = localhost dev con cookies. En producción: URLs explícitas separadas por coma. |

### CORS y errores HTTP

- **CORS:** con `CORS_ORIGINS=*` se permiten orígenes `localhost` / `127.0.0.1` (cookies de sesión admin). En producción define el dominio del frontend.
- **400** — validación: `{ "ok": false, "errors": { "campo": "..." } }`
- **401** — sin sesión admin: `{ "ok": false, "error": "No autorizado." }`
- **404** — recurso no encontrado: `{ "ok": false, "error": "..." }`
- **500** — error servidor (sin filtrar detalles internos): `{ "ok": false, "error": "Error interno del servidor." }`

Los handlers están en `app/errors.py`.

### Frontend → API

En local, el frontend usa `http://127.0.0.1:5000` por defecto. Para producción, define antes de cargar los scripts:

```html
<script>window.PORTFOLIO_API = "https://tu-api.onrender.com";</script>
```

Si despliegas frontend y API en dominios distintos, restringe `CORS_ORIGINS` al dominio del portfolio (no uses `*` en producción).

## Tests

```bash
cd backend
python test_api.py
```

Suite de integración (health, contacto, proyectos, auth admin, CORS, formatos de error). Debe mostrar `13/13 tests passed`.

## Estructura

```
backend/
├── main.py              # app FastAPI
├── run.py               # uvicorn
├── init_db.py           # schema + seed + admin
├── app/
│   ├── config.py
│   ├── db.py
│   ├── auth.py          # sesión admin
│   ├── routers/         # endpoints
│   ├── models/          # SQL por tabla
│   ├── validators/
│   └── serializers/
├── instance/            # portfolio.db (gitignored)
├── schema.sql
├── seed.sql
├── test_api.py
└── .env.example         # plantilla — copiar a .env (gitignored)
```

## Endpoints (v1)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/health` | No | Estado API + BD |
| POST | `/api/contact` | No | Guardar mensaje en BD |
| GET | `/api/projects` | No | Listar proyectos publicados |
| POST | `/api/admin/login` | No | Login administrador |
| GET | `/api/admin/projects` | Sí | Listar todos los proyectos |
| POST | `/api/admin/projects` | Sí | Crear proyecto |
| PUT | `/api/admin/projects/{id}` | Sí | Editar proyecto |
| DELETE | `/api/admin/projects/{id}` | Sí | Eliminar proyecto |
| POST | `/api/admin/logout` | Sí | Cerrar sesión |
| GET | `/api/admin/messages` | Sí | Listar mensajes de contacto |
| PATCH | `/api/admin/messages/{id}` | Sí | Marcar leído / no leído |

## Postman

Importa `postman/portfolio-api.postman_collection.json`. Tras `POST /api/admin/login`, la cookie de sesión se guarda automáticamente para rutas admin.

## Base de datos

SQLite — tablas: `contact_messages`, `projects`, `admin_users`.

```bash
python init_db.py
```

## Ejemplos

### POST `/api/contact`

```json
{
  "name": "Ana Recruiter",
  "email": "ana@empresa.com",
  "subject": "practicas-daw",
  "message": "Hola Pablo, nos gustaría hablar contigo.",
  "privacy": true
}
```

### GET `/api/projects`

Devuelve proyectos con `is_published = 1`, ordenados por `sort_order`.

### POST `/api/admin/login`

```json
{"username": "admin", "password": "changeme"}
```

Sesión vía cookie (`credentials: "include"` en fetch del frontend).

### Admin — proyectos (requiere sesión)

`GET /api/admin/projects` — incluye borradores (`is_published: false`).

Crear (`POST /api/admin/projects`):

```json
{
  "title": "Mi proyecto",
  "description": "Descripción breve.",
  "stack": ["HTML", "CSS", "JavaScript"],
  "github_url": "https://github.com/Sarajesko/repo",
  "image_url": "../assets/projects/ejemplo.png",
  "is_featured": false,
  "sort_order": 4,
  "is_published": true
}
```

Editar (`PUT /api/admin/projects/{id}`) — envía solo los campos que cambian.

Eliminar: `DELETE /api/admin/projects/{id}`.

### Admin — mensajes (requiere sesión)

`GET /api/admin/messages` — listado ordenado por fecha (más recientes primero).

```json
{
  "ok": true,
  "messages": [
    {
      "id": 1,
      "name": "Ana Test",
      "email": "ana@test.com",
      "subject": "practicas-daw",
      "message": "...",
      "is_read": false,
      "created_at": "2026-06-27 12:00:00"
    }
  ]
}
```

`PATCH /api/admin/messages/{id}` — `{ "is_read": true }`.

### Panel admin (frontend)

Abre `frontend/admin/index.html` con la API en marcha y un servidor local (Live Server, etc.).

Login → pestañas **Mensajes** (ver / marcar leído) y **Proyectos** (crear, editar, eliminar).
