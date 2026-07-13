# Wireframe — Escenas horizontales

Esquema de layout para v1. Referencia: [`contexto.md`](../contexto.md).

**Metáfora:** cada panel = una página de guión. Scroll horizontal (rueda del ratón / trackpad / swipe). Indicador tipo `INT. — ESCENA 03`.

---

## Vista global (scroll →)

```
[01 PORTADA] → [02 EL GUIÓN] → [03 DAW] → [04 CORE] → [05 MULTIPLICALIA] → [06 ERASMUS+] → [07 MAPA] → [08 SOBRE MÍ] → [09 PROYECTOS] → [10 STACK] → [11 CONTACTO]
     ↑                                                                                              ↑
  FADE IN                    scroll lateral continuo                                    clicks en mapa (sin avanzar scroll)
```

**Panel admin:** ruta aparte `/admin` — no forma parte del scroll narrativo.

---

## Chrome global (fijo en todas las escenas)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PG · Dev full stack          [01][02][03][04][05][06][07][08][09][10][11]  │  ← dots / paginación guión
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ← CONTENIDO DE ESCENA →                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ← → teclado    ·    GitHub · LinkedIn    ·    BUSCO PRÁCTICAS DAW          │  ← footer fijo
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 01 — PORTADA / FADE IN

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         ░░░ TEXTURA / GRANO ░░░                             │
│                                                                             │
│                              FADE IN:                                       │
│                                                                             │
│                      Pablo García Márquez                                   │
│              Desarrollador full stack · Ex-guionista                        │
│                                                                             │
│                   [ Busco prácticas DAW — escríbeme ]                       │
│                                                                             │
│                         scroll → para empezar                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 02 — EL GUIÓN (concepto de la web)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  INT. WEB — DÍA                                                             │
│                                                                             │
│     "Esta no es una web que se lee de arriba abajo.                         │
│      Es un guión: avanzas escena a escena."                                 │
│                                                                             │
│     · Scroll lateral = pasar página                                         │
│     · Mapa = viaje Sevilla → Irlanda                                        │
│     · Todo público — mis proyectos incluidos                                │
│                                                                             │
│                              [ → Siguiente escena ]                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 03 — DAW ILERNA (Sevilla)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 03 · SEVILLA                                                        │
│                                                                             │
│   [logo Ilerna]     Desarrollo de Aplicaciones Web                          │
│                     Ilerna · Sevilla · en curso                             │
│                                                                             │
│                     Buscando prácticas del módulo superior.                 │
│                                                                             │
│   ─────────────────────────────────────────────────────                     │
│   CTA sutil: "¿Tienes empresa? → Contacto"                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 04 — CORE NETWORKS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 04 · FORMACIÓN                                                      │
│                                                                             │
│   [logo CORE]       Certificado IFCD0110                                     │
│                     CORE Networks · Junta de Andalucía                      │
│                     oct 2025 – abr 2026 · Nota: 9,04                      │
│                                                                             │
│                     HTML · CSS · JS · formularios · publicación             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 05 — MULTIPLICALIA (click profundiza → panel)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 05 · PRÁCTICAS                                                      │
│                                                                             │
│   [logo Multiplicalia]   Desarrollador web                                  │
│                          feb – mar 2026 · Sevilla · Híbrido                 │
│                                                                             │
│   WordPress · SEO · UX                                    [ + Ver detalle ] │
│                                                                             │
│   ┌─ PANEL (al click, overlay lateral) ─────────────────┐                   │
│   │  • Elementor / WPBakery                            │                   │
│   │  • SEO técnico y contenidos                        │                   │
│   │  • Analytics, Search Console, Screaming Frog       │                   │
│   └────────────────────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 06 — ERASMUS+ / FLUID FINANCIAL

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 06 · IRLANDA                                                        │
│                                                                             │
│   [logo Fluid]      Desarrollador full stack · Beca Erasmus+ UE             │
│                     jun 2026 – actualidad                                   │
│                                                                             │
│        📍 Galway — donde resido          📍 Cork — sede (remoto)           │
│                                                                             │
│                                              [ + Ver detalle ]              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 07 — MAPA DEL VIAJE (modo interactivo)

Scroll llega aquí. **Clicks en mapa NO mueven el scroll.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 07 · MAPA                                                           │
│                                                                             │
│   ┌──────────────────────────────────────┐  ┌─────────────────────────┐    │
│   │                                      │  │  SEVILLA                │    │
│   │     [ SVG Europa relieve ]           │  │  DAW en Ilerna.         │    │
│   │                                      │  │  Prácticas Multipli…    │    │
│   │        ● Sevilla                     │  │  [ilerna] [multipli]    │    │
│   │              ● Galway    ● Cork      │  └─────────────────────────┘    │
│   │                                      │         ↑ panel info (click)    │
│   └──────────────────────────────────────┘                                  │
│                                                                             │
│   Textos: content/map-locations.md                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 08 — SOBRE MÍ

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 08 · SOBRE MÍ                                                       │
│                                                                             │
│   "Pasé del guión al código. Antes escribía historias;                      │
│    ahora las construyo."                                                    │
│                                                                             │
│   Lisboa · Irlanda · Sevilla · sector aéreo · DAW · Erasmus+                │
│                                                                             │
│   "No estoy empezando de cero: estoy cambiando de escenario."               │
│                                                                             │
│   (Texto completo: contexto.md §4)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 09 — PROYECTOS (público, API/BD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 09 · PROYECTOS                        [ Ver todo en GitHub → ]      │
│                                                                             │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │
│   │ [captura]       │  │ [captura]       │  │ [captura]       │          │
│   │ Manga Festival  │  │ Validación PHP  │  │ EV Pablo G.     │          │
│   │ ★ destacado     │  │                 │  │                 │          │
│   │ [ GitHub ]      │  │ [ GitHub ]      │  │ [ GitHub ]      │          │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘          │
│                                                                             │
│   Datos: GET /api/projects (sin login)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10 — STACK / HABILIDADES

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 10 · STACK                                                          │
│                                                                             │
│   Frontend          Backend           Otros                                 │
│   HTML CSS JS       Python FastAPI    WordPress · SEO                       │
│                     SQLite SQL        Git · Postman                         │
│                                                                             │
│   (Tags / chips visuales, no lista infinita)                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11 — CONTACTO (formulario → BD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCENA 11 · CONTACTO                                                       │
│                                                                             │
│   ¿Prácticas DAW? ¿Colaboración? Escríbeme.                                │
│                                                                             │
│   Nombre [________]   Email [________]                                      │
│   Asunto [ Prácticas DAW ▼ ]                                                │
│   Mensaje [________________________]                                        │
│   [ ] He leído la política de privacidad                                    │
│   [ Enviar ]  →  POST /api/contact                                          │
│                                                                             │
│   LinkedIn · GitHub                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Admin (ruta separada)

```
frontend/admin/
┌─────────────────────────────────────────────────────────────────────────────┐
│  LOGIN ADMIN                                                                │
│  usuario [________]  contraseña [________]  [ Entrar ]                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  MENSAJES                    │  PROYECTOS                                   │
│  · lista contact_messages    │  · CRUD projects                             │
│  · marcar leído              │  · orden / publicar                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Comportamiento scroll vs click

| Zona | Scroll lateral | Click |
|------|----------------|-------|
| Escenas 01–06 | Avanza panel | 05–06: abre panel detalle |
| Escena 07 mapa | Llega al mapa; no avanza con clicks en puntos | Punto rojo → panel info |
| Escenas 08–11 | Sigue avanzando horizontal | Formulario, enlaces |

---

## Móvil (nota diseño)

```
Viewport estrecho:
· Mismo orden de escenas
· Swipe horizontal entre paneles
· Mapa: SVG arriba, panel info abajo (stack vertical dentro del panel)
· Footer CTA siempre visible
```

---

## Resumen de paneles

| # | ID | Título | Interacción especial |
|---|-----|--------|----------------------|
| 01 | `portada` | FADE IN | CTA prácticas |
| 02 | `guion` | El guión | — |
| 03 | `daw` | DAW Ilerna | CTA contacto |
| 04 | `core` | CORE Networks | — |
| 05 | `multiplicalia` | Prácticas | Panel detalle |
| 06 | `erasmus` | Erasmus+ | Panel detalle |
| 07 | `mapa` | Mapa viaje | Clicks Sevilla / Galway / Cork |
| 08 | `sobre-mi` | Sobre mí | — |
| 09 | `proyectos` | Proyectos | Enlaces GitHub |
| 10 | `stack` | Habilidades | — |
| 11 | `contacto` | Contacto | Formulario API |

---

*Paso 1.1 — jun. 2026 · Validar antes de paleta (1.2) y portada (1.3)*
