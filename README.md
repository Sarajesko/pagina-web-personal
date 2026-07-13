# Portfolio — Pablo García Márquez

Web personal con metáfora de guión (scroll lateral), mapa interactivo y backend full stack.

## Objetivo

- Portfolio para **conseguir prácticas del módulo superior DAW**.
- Demostrar **frontend + backend + SQL** sin ocultar contenido a visitantes.

## Arquitectura v1 (Opción C)

| Capa | Tecnología |
|------|------------|
| Frontend público | HTML, CSS, JavaScript vanilla |
| Backend | Python 3 + FastAPI |
| Base de datos | SQLite (SQL) |
| Admin | Login solo Pablo — CRUD proyectos + ver mensajes |

**Invitados** ven todo (proyectos incluidos) + enlace GitHub. **No hay registro de usuarios** en v1.

## Estructura del repo

```
pagina-web-pablo/
├── contexto.md          # Brief creativo y técnico
├── CHECKLIST.md         # Plan paso a paso
├── frontend/            # Web pública + panel admin (HTML/CSS/JS)
│   ├── css/
│   ├── js/
│   └── admin/
├── backend/             # API FastAPI + SQLite
│   └── app/
├── assets/
│   ├── logos/           # Ilerna, CORE, Multiplicalia, Fluid Financial
│   ├── projects/        # Capturas de repos
│   └── maps/            # SVG Europa relieve
├── content/             # Textos (mapa, copy)
└── postman/             # Colección API
```

## Documentación

- [`contexto.md`](contexto.md) — identidad, secciones, stack, criterios de éxito
- [`CHECKLIST.md`](CHECKLIST.md) — pasos de desarrollo con validación

## Enlaces

- LinkedIn: [linkedin.com/in/pablogarciamarquez](https://www.linkedin.com/in/pablogarciamarquez)
- GitHub: [github.com/Sarajesko](https://github.com/Sarajesko)

## Estado

En desarrollo — **Fase 6 completa** (API FastAPI + admin + tests). Siguiente: Fase 7 (pulido). Ver [`CHECKLIST.md`](CHECKLIST.md).

Configuración API: copiar [`backend/.env.example`](backend/.env.example) → `backend/.env`.
