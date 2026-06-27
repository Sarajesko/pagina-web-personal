# Design tokens — Paleta y tipografía

Referencia visual: atmósfera oscura y texturada tipo [Sala X](https://lasalax.com/), acentos rojos (CORE / Multiplicalia), metáfora guión.

Implementación CSS: [`frontend/css/main.css`](../frontend/css/main.css) (importa tokens, base, scenes, portada).

---

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#0c0c0e` | Fondo principal — negro escénico |
| `--color-bg-elevated` | `#16161a` | Paneles, overlays |
| `--color-bg-panel` | `#1e1e24` | Tarjetas, formularios |
| `--color-surface` | `#25252d` | Bordes suaves, inputs |
| `--color-text` | `#e8e4dc` | Texto principal — tono papel envejecido |
| `--color-text-muted` | `#9c968a` | Subtítulos, metadata |
| `--color-text-dim` | `#6b665c` | Placeholders, hints |
| `--color-accent` | `#c8102e` | CTAs, links, acento CORE/Multiplicalia |
| `--color-accent-hover` | `#e01838` | Hover botones |
| `--color-accent-soft` | `rgba(200, 16, 46, 0.15)` | Fondos hover, selección |
| `--color-map-marker` | `#e63946` | Puntos rojos del mapa |
| `--color-border` | `#2e2e36` | Separadores |
| `--color-border-light` | `#3d3d48` | Focus rings |
| `--color-success` | `#4ade80` | Formulario OK |
| `--color-error` | `#f87171` | Errores validación |

### Texturas (aplicar en CSS, no son colores planos)

- Grano SVG/CSS overlay sobre `--color-bg`
- Gradientes radiales sutiles en portada (`--color-bg` → `--color-bg-elevated`)
- Blend mode `overlay` o `soft-light` en capas de textura

---

## Tipografías (Google Fonts)

| Token | Familia | Pesos | Uso |
|-------|---------|-------|-----|
| `--font-display` | **[Syne](https://fonts.google.com/specimen/Syne)** | 600, 700, 800 | Nombre, títulos de escena, CTAs grandes |
| `--font-body` | **[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)** | 400, 500, 600 | Párrafos, UI, formulario |
| `--font-script` | **[Courier Prime](https://fonts.google.com/specimen/Courier+Prime)** | 400, 700 | Solo etiquetas guión: `FADE IN`, `ESCENA 03`, `INT.` |

**Regla:** Courier solo en chrome narrativo (paginación, rótulos de escena). El cuerpo nunca en Courier — evita cliché de «web de guionista».

### Escala tipográfica

| Token | Tamaño | Uso |
|-------|--------|-----|
| `--text-xs` | 0.75rem | Footer, paginación |
| `--text-sm` | 0.875rem | Metadata, chips |
| `--text-base` | 1rem | Cuerpo |
| `--text-lg` | 1.125rem | Lead paragraphs |
| `--text-xl` | 1.5rem | Subtítulos escena |
| `--text-2xl` | 2rem | Títulos panel |
| `--text-hero` | clamp(2.5rem, 6vw, 4.5rem) | Portada — nombre |

---

## Espaciado y layout

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | 0.25rem | Gaps mínimos |
| `--space-sm` | 0.5rem | Inline |
| `--space-md` | 1rem | Padding base |
| `--space-lg` | 2rem | Secciones internas |
| `--space-xl` | 4rem | Márgenes escena |
| `--scene-width` | 100vw | Ancho panel horizontal |
| `--scene-max-content` | 720px | Ancho lectura cómodo |
| `--header-height` | 3.5rem | Barra superior |
| `--footer-height` | 3rem | Barra inferior |

---

## Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Transiciones escena |
| `--duration-fast` | 200ms | Hover, focus |
| `--duration-scene` | 600ms | Cambio de panel scroll |
| `--duration-fade` | 400ms | Overlays mapa |

Respetar `prefers-reduced-motion: reduce` — duraciones → 0.

---

## Enlace Google Fonts (HTML)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
```

---

*Paso 1.2 — jun. 2026*
