# Página web personal — Pablo García Márquez

Web personal / portfolio con metáfora de **guión** (scroll lateral por escenas), mapa interactivo de Europa y backend full stack.

**Repositorio:** [github.com/Sarajesko/pagina-web-personal](https://github.com/Sarajesko/pagina-web-personal)  
**LinkedIn:** [linkedin.com/in/pablogarciamarquez](https://www.linkedin.com/in/pablogarciamarquez)  
**Demo online:** pendiente (Fase 8 — GitHub Pages / Render)

---

## Índice

1. [¿Para qué sirve?](#para-qué-sirve)
2. [Qué incluye](#qué-incluye)
3. [Estructura del repo](#estructura-del-repo)
4. [Requisitos](#requisitos)
5. [Arranque rápido](#arranque-rápido)
6. [Frontend](#frontend)
7. [Backend (API)](#backend-api)
8. [API REST](#api-rest)
9. [Ejemplos curl](#ejemplos-curl)
10. [Panel admin](#panel-admin)
11. [Tests](#tests)
12. [Postman](#postman)
13. [Stack y arquitectura](#stack-y-arquitectura)
14. [Solución de problemas](#solución-de-problemas)
15. [Roadmap](#roadmap)
16. [Documentación interna](#documentación-interna)

---

## ¿Para qué sirve?

Portfolio con personalidad para **prácticas del módulo superior DAW**, sin esconder el contenido a visitantes:

- contar la trayectoria en **escenas** (como páginas de un guión), no en un scroll vertical genérico;
- mostrar formación, prácticas y Erasmus+ con atmósfera propia;
- mapa de Europa (Sevilla, Galway, Cork);
- demostrar **frontend + backend + SQL**: proyectos públicos vía API, formulario de contacto en BD y panel admin.

**Invitados** ven todo (proyectos incluidos) y los enlaces a GitHub / LinkedIn.  
**No hay registro de usuarios** en v1: solo login de administrador (Pablo).

---

## Qué incluye

| Área | Estado |
|------|--------|
| Front HTML/CSS/JS — scroll lateral tipo guión | Listo |
| Escenas (portada, trayectoria, sobre mí, proyectos, stack, contacto) | Listo |
| Mapa Europa interactivo (SVG + puntos) | Listo |
| Responsive (móvil) | Listo |
| API FastAPI + SQLite | Listo |
| `POST /api/contact` — mensajes en BD | Listo |
| `GET /api/projects` — proyectos públicos | Listo |
| Auth admin (sesión cookie) + CRUD proyectos | Listo |
| Panel admin (mensajes + proyectos) | Listo |
| Tests de integración API (`13/13`) | Listo |
| Colección Postman | Listo |
| Accesibilidad / favicon / Open Graph | En curso (Fase 7) |
| Deploy público (front + API) | Pendiente (Fase 8) |

---

## Estructura del repo

```
pagina-web-personal/
├── frontend/                 Web pública + panel admin (HTML/CSS/JS)
│   ├── css/
│   ├── js/
│   ├── admin/                Login admin · mensajes · proyectos
│   └── index.html
├── backend/                  FastAPI + SQLite
│   ├── app/                  Routers, models, auth, validators
│   ├── instance/             portfolio.db (gitignored)
│   ├── schema.sql · seed.sql
│   ├── init_db.py · run.py · test_api.py
│   ├── requirements.txt
│   └── .env.example
├── assets/
│   ├── logos/                Ilerna, CORE, Multiplicalia, Fluid…
│   ├── projects/             Capturas / slots de proyectos
│   └── maps/                 SVG Europa relieve
├── content/                  Textos (mapa, copy)
├── docs/                     Wireframe, design tokens
├── postman/                  Colección API
├── contexto.md               Brief creativo y técnico
├── CHECKLIST.md              Plan por fases
└── README.md
```

| Carpeta / archivo | Rol |
|-------------------|-----|
| `frontend/` | View pública + admin |
| `backend/` | API FastAPI + SQLite |
| `assets/` | Logos, mapa, capturas |
| `contexto.md` | Identidad, narrativa, criterios |
| `CHECKLIST.md` | Pasos y estado del desarrollo |

---

## Requisitos

| Herramienta | Para qué |
|-------------|----------|
| **Python 3.11+** | API FastAPI |
| Navegador moderno | Chrome / Edge / Firefox / Safari |
| Servidor estático local (opcional) | Live Server, `npx serve`, etc. para el front |
| **Postman** (opcional) | Probar la API |

---

## Arranque rápido

Dos procesos en local: **API** + **front**.

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env          # Windows
# cp .env.example .env          # macOS / Linux

# Edita .env: SECRET_KEY, ADMIN_PASSWORD (no uses los defaults en serio)
python init_db.py
python run.py
```

| Recurso | URL |
|---------|-----|
| API | [http://127.0.0.1:5000](http://127.0.0.1:5000) |
| Health | [http://127.0.0.1:5000/api/health](http://127.0.0.1:5000/api/health) |
| Swagger | [http://127.0.0.1:5000/docs](http://127.0.0.1:5000/docs) |

Detalle de variables: [`backend/.env.example`](backend/.env.example) y [`backend/README.md`](backend/README.md).

### 2. Frontend

Abre el front con un servidor local (para que `fetch` y rutas relativas funcionen bien):

```bash
# desde la raíz del repo, por ejemplo:
npx --yes serve frontend -p 5500
```

O usa la extensión **Live Server** sobre `frontend/index.html`.

| Recurso | Valor |
|---------|--------|
| Web | p. ej. [http://127.0.0.1:5500](http://127.0.0.1:5500) |
| API por defecto | `http://127.0.0.1:5000` |

En producción, antes de los scripts del front:

```html
<script>window.PORTFOLIO_API = "https://tu-api.onrender.com";</script>
```

---

## Frontend

Metáfora: **páginas de un guión** (scroll horizontal / escenas).

Incluye, entre otras:

- portada (nombre, rol, CTA prácticas DAW);
- trayectoria (Ilerna, CORE, Multiplicalia, Erasmus+);
- mapa Europa con puntos Sevilla / Galway / Cork;
- sobre mí, proyectos (API), stack, contacto (API);
- panel en `frontend/admin/`.

---

## Backend (API)

- **FastAPI** + **SQLite** (`contact_messages`, `projects`, `admin_users`).
- Sesión admin por **cookie** (`credentials: "include"`).
- Errores JSON coherentes: `400` / `401` / `404` / `500` (`app/errors.py`).

Documentación ampliada: [`backend/README.md`](backend/README.md).

---

## API REST

Prefijo: `/api`. Auth admin = cookie de sesión tras login.

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/health` | No | Estado API + BD |
| POST | `/api/contact` | No | Guardar mensaje |
| GET | `/api/projects` | No | Proyectos publicados |
| POST | `/api/admin/login` | No | Login admin |
| GET | `/api/admin/me` | Sí | Sesión actual |
| POST | `/api/admin/logout` | Sí | Cerrar sesión |
| GET / POST | `/api/admin/projects` | Sí | Listar / crear |
| PUT / DELETE | `/api/admin/projects/{id}` | Sí | Editar / borrar |
| GET | `/api/admin/messages` | Sí | Mensajes de contacto |
| PATCH | `/api/admin/messages/{id}` | Sí | Marcar leído |

---

## Ejemplos curl

```bash
# Health
curl -s http://127.0.0.1:5000/api/health

# Proyectos públicos
curl -s http://127.0.0.1:5000/api/projects

# Contacto
curl -s -X POST http://127.0.0.1:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ana\",\"email\":\"ana@empresa.com\",\"subject\":\"practicas-daw\",\"message\":\"Hola Pablo\",\"privacy\":true}"

# Login admin (guarda cookie)
curl -s -c cookies.txt -X POST http://127.0.0.1:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"changeme\"}"

# Mensajes (con sesión)
curl -s -b cookies.txt http://127.0.0.1:5000/api/admin/messages
```

---

## Panel admin

1. API en marcha (`python run.py`).
2. Abre `frontend/admin/index.html` con el mismo origen/servidor local que uses para el front.
3. Login con `ADMIN_USERNAME` / `ADMIN_PASSWORD` del `.env`.
4. Pestañas: **Mensajes** y **Proyectos** (CRUD).

---

## Tests

```bash
cd backend
python test_api.py
```

Suite de integración: health, contacto, proyectos, auth admin, CORS y formatos de error. Esperado: **`13/13 tests passed`**.

---

## Postman

Importa [`postman/portfolio-api.postman_collection.json`](postman/portfolio-api.postman_collection.json). Tras `POST /api/admin/login`, la cookie se reutiliza en rutas admin.

---

## Stack y arquitectura

| Capa | Tecnología |
|------|------------|
| View | HTML · CSS · JavaScript vanilla (scroll lateral, mapa) |
| Controller | FastAPI · validación · sesión cookie |
| Model | SQLite (SQL) |

Arquitectura clara **MVC-ish**: modelos SQL · routers FastAPI · front estático.

---

## Solución de problemas

| Problema | Qué revisar |
|----------|-------------|
| Front no carga proyectos / contacto falla | API en `:5000`; CORS; consola del navegador |
| Admin 401 | Login hecho; cookies habilitadas; mismo host que la API en local |
| `init_db.py` / login no funciona | `.env` creado; `ADMIN_PASSWORD` coherente; vuelve a ejecutar `init_db.py` |
| Tests fallan | Ejecutar desde `backend/` con venv y deps instaladas |
| CORS en producción | No uses `*`; pon el dominio real del front en `CORS_ORIGINS` |

---

## Roadmap

- Fase 7: accesibilidad, favicon, meta Open Graph / SEO, copy.
- Fase 8: deploy front (Pages/Netlify) + API (Render/Railway) + enlace en LinkedIn.
- Incluir **Cinebook** y otros repos como proyectos destacados con demo en vivo.

Plan detallado: [`CHECKLIST.md`](CHECKLIST.md).

---

## Documentación interna

| Archivo | Contenido |
|---------|-----------|
| [`contexto.md`](contexto.md) | Identidad, narrativa, stack, criterios de éxito |
| [`CHECKLIST.md`](CHECKLIST.md) | Fases 0–8 y validaciones |
| [`backend/README.md`](backend/README.md) | Detalle de la API |
| [`docs/wireframe.md`](docs/wireframe.md) | Escenas |
| [`docs/design-tokens.md`](docs/design-tokens.md) | Paleta y tipografías |

---

## Estado

**Fase 6 completa** (API + admin + tests).  
**Siguiente:** Fase 7 (pulido) → Fase 8 (publicación).
