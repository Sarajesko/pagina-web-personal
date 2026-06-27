# Checklist — Página web Pablo García Márquez

Plan de ejecución paso a paso. Referencia: [`contexto.md`](contexto.md).

**Arquitectura v1:** Opción C — todo público + admin con login + SQLite (formulario y proyectos en BD).

---

## Cómo trabajamos

1. **Un paso a la vez** — yo ejecuto solo el paso marcado como «En curso».
2. **Tú validas** — cuando termine, lo revisas y me dices: *«ok, siguiente»*, *«cambia X»* o *«para aquí»*.
3. **No saltar pasos** — aunque parezcan independientes, el orden evita rehacer trabajo.
4. **Estados:** `[ ]` pendiente · `[~]` en curso · `[x]` hecho · `[-]` omitido

**Paso actual:** **1.1** — wireframe escenas *(esperando tu validación del 0.5)*

---

## Fase 0 — Preparación

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 0.1 | Crear estructura de carpetas del proyecto | `frontend/`, `backend/`, `assets/`, README | `[x]` |
| 0.2 | Inicializar Git + `.gitignore` (`.env`, `__pycache__`, `*.db`, etc.) | Repo local listo | `[x]` |
| 0.3 | Confirmar stack: **Python + Flask + SQLite** | Documentado en README | `[x]` |
| 0.4 | Recopilar / buscar **SVG mapa Europa** en relieve (licencia libre) | `assets/maps/europe-relief.svg` | `[x]` |
| 0.5 | Redactar **textos breves** mapa (Sevilla, Galway, Cork) | `content/map-locations.md` | `[x]` |
| 0.6 | Restaurar **logos** en `assets/logos/` | 4 archivos | `[x]` |

**Validación fase 0:** estructura clara, decisiones tomadas, contenido mínimo del mapa listo.

---

## Fase 1 — Diseño y wireframe

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 1.1 | Wireframe ASCII / esquema de **todas las escenas** horizontales | Documento en repo | `[ ]` |
| 1.2 | Definir **paleta de colores** y **tipografías** (Google Fonts) | Variables CSS documentadas | `[ ]` |
| 1.3 | Maqueta estática **Portada / FADE IN** con texturas tipo Sala X | HTML + CSS (sin JS) | `[ ]` |

**Validación fase 1:** te gusta la atmósfera visual antes de construir el resto.

---

## Fase 2 — Frontend base

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 2.1 | `index.html` semántico con todas las secciones | Esqueleto completo | `[ ]` |
| 2.2 | CSS base: reset, variables, texturas, tipografía | `frontend/css/main.css` | `[ ]` |
| 2.3 | Sistema **scroll lateral** entre escenas (JS) | Navegación horizontal | `[ ]` |
| 2.4 | Indicador de escena / progreso (tipo «pág. script») | UI navegación | `[ ]` |

**Validación fase 2:** scroll lateral fluido entre escenas.

---

## Fase 3 — Contenido por escenas

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 3.1 | **Portada** — nombre, rol, CTA prácticas DAW | Contenido real | `[ ]` |
| 3.2 | **El guión** — intro al concepto | Texto + estilo | `[ ]` |
| 3.3 | **Escena DAW Ilerna** | Logo Ilerna | `[ ]` |
| 3.4 | **Escena CORE Networks** | Logo CORE | `[ ]` |
| 3.5 | **Escena Multiplicalia** | Logo Multiplicalia | `[ ]` |
| 3.6 | **Escena Erasmus+** — Galway + Cork | Logo Fluid Financial | `[ ]` |

**Validación fase 3:** trayectoria narrativa completa.

---

## Fase 4 — Mapa interactivo

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 4.1 | Integrar **mapa Europa en relieve** (SVG) | Escena mapa | `[ ]` |
| 4.2 | **Puntos rojos**: Sevilla, Galway, Cork | Marcadores | `[ ]` |
| 4.3 | Panel al click: logo + texto breve | Interacción Fase 2 | `[ ]` |
| 4.4 | Transición scroll → modo mapa (clicks sin avanzar scroll) | Comportamiento definido | `[ ]` |

**Validación fase 4:** Galway y Cork claramente diferenciados.

---

## Fase 5 — Secciones finales (frontend)

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 5.1 | Sección **Sobre mí** | Texto LinkedIn adaptado | `[ ]` |
| 5.2 | Sección **Proyectos** — tarjetas públicas + GitHub | Enlace GitHub visible | `[ ]` |
| 5.3 | Capturas de proyectos | `assets/projects/` | `[ ]` |
| 5.4 | Sección **Stack / habilidades** | Lista visual | `[ ]` |
| 5.5 | Enlaces **LinkedIn** y **GitHub** | Footer / contacto | `[ ]` |

**Validación fase 5:** portfolio frontend completo (formulario conectado en Fase 6).

---

## Fase 6 — Backend, BD y admin

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 6.1 | Esquema **SQLite**: `contact_messages`, `projects`, `admin_users` | `backend/schema.sql` | `[ ]` |
| 6.2 | Flask app base + modelos / acceso SQL | `backend/` ejecutable en local | `[ ]` |
| 6.3 | `POST /api/contact` — validación + INSERT | Mensajes en BD | `[ ]` |
| 6.4 | `GET /api/projects` — listado **público** (sin auth) | Frontend consume proyectos | `[ ]` |
| 6.5 | Auth admin: `POST /api/admin/login` + sesión | Solo Pablo | `[ ]` |
| 6.6 | CRUD admin proyectos: `POST/PUT/DELETE /api/admin/projects` | Gestión desde panel | `[ ]` |
| 6.7 | `GET /api/admin/messages` — listar mensajes contacto | Panel admin | `[ ]` |
| 6.8 | Frontend: formulario contacto + validación JS + `fetch` | Sección Contacto | `[ ]` |
| 6.9 | Frontend: **panel admin** (`frontend/admin/`) | Login + mensajes + proyectos | `[ ]` |
| 6.10 | `.env.example` + README backend | Sin secretos en repo | `[ ]` |
| 6.11 | Colección **Postman** — endpoints públicos y admin | `postman/` | `[ ]` |
| 6.12 | CORS + errores 400 / 401 / 500 | Listo para producción | `[ ]` |

**Validación fase 6:** formulario guarda en BD; proyectos públicos vía API; admin funcional.

---

## Fase 7 — Pulido

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 7.1 | **Responsive** — móvil (swipe o fallback) | Viewport estrecho OK | `[ ]` |
| 7.2 | **Accesibilidad** — teclado, focus, `prefers-reduced-motion` | Navegable | `[ ]` |
| 7.3 | **Favicon** (identidad visual clara) | `assets/favicon/` | `[ ]` |
| 7.4 | **Meta tags** Open Graph + SEO | Preview LinkedIn | `[ ]` |
| 7.5 | Revisión textos y CTAs | Copy pulido | `[ ]` |
| 7.6 | CV descargable *(opcional)* | PDF | `[-]` |

**Validación fase 7:** web presentable desktop + móvil.

---

## Fase 8 — Publicación

| # | Paso | Entregable | Estado |
|---|------|------------|--------|
| 8.1 | Desplegar **frontend** (GitHub Pages / Netlify) | URL pública | `[ ]` |
| 8.2 | Desplegar **API Flask + SQLite** (Render / Railway) | URL API + env vars | `[ ]` |
| 8.3 | Conectar frontend con API producción | Formulario + proyectos en prod | `[ ]` |
| 8.4 | Enlazar web desde **LinkedIn** | Perfil actualizado | `[ ]` |
| 8.5 | README final — local, BD, admin, despliegue | Documentación DAW-ready | `[ ]` |

**Validación fase 8:** web live; formulario y proyectos en producción.

---

## Resumen rápido

```
Fase 0  Preparación      → 6 pasos
Fase 1  Diseño           → 3 pasos
Fase 2  Frontend base    → 4 pasos
Fase 3  Escenas          → 6 pasos
Fase 4  Mapa             → 4 pasos
Fase 5  Secciones        → 5 pasos
Fase 6  Backend + BD     → 12 pasos
Fase 7  Pulido           → 5–6 pasos
Fase 8  Publicación      → 5 pasos
─────────────────────────────────
Total: ~50 pasos
```

---

## Registro de validaciones

| Fecha | Paso | Feedback |
|-------|------|----------|
| jun. 2026 | 0.1 | Estructura carpetas — OK Pablo |
| jun. 2026 | 0.2 | Git init + `.gitignore` — OK Pablo |
| jun. 2026 | 0.6 | Logos copiados desde Downloads |
| jun. 2026 | 0.4 | Mapa europe-relief.svg — OK |
| jun. 2026 | 0.5 | Textos mapa en map-locations.md — pendiente OK |

---

*Actualizado: junio 2026 · Sincronizado con `contexto.md`*
