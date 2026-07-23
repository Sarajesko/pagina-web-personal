# Textos del mapa — puntos clickables (currículum)

El mapa es la escena «Por qué yo». Cada punto resume formación / experiencia.  
Editables — sincronizar con `frontend/js/map.js`.

---

## Sevilla

**Título:** Sevilla  
**Rol:** Formación · prácticas  
**Logos:** `ilerna.jpg`, `core-networks.png`, `multiplicalia.jpg`

**Texto:**
> Base de la trayectoria. Formación DAW, IA aplicada y primera experiencia en empresa.

**Hechos:**
- DAW — Ilerna · buscando prácticas del módulo superior
- IFCD0110 — CORE Networks · nota 9,04 · 560 h
- UNIR — Programa avanzado IA para programar (2026)
- Multiplicalia — PHP, WordPress, SEO (feb–mar 2026)

---

## Galway

**Título:** Galway  
**Rol:** Residencia · Erasmus+  
**Logos:** —

**Texto:**
> Donde vivo durante la beca. Inglés en contexto real.

**Hechos:**
- Beca Erasmus+ de la Unión Europea
- Residencia en Galway mientras trabajo en remoto
- Inglés aplicado en día a día y empresa

---

## Cork

**Título:** Cork  
**Rol:** Empresa · full stack  
**Logos:** `fluid-financial.jpg`

**Texto:**
> Sede de Fluid Financial. Prácticas full stack en remoto desde Galway (beca UE).

**Hechos:**
- Fluid Financial LLC — fintech · jun–ago 2026
- Pagos CardPointe + GoHighLevel · Node.js · OAuth
- Android + datáfono Clover Go · pruebas en dispositivo

---

## Notas de uso

- El panel debe caber sin scroll excesivo; hechos en 1 línea cada uno.
- Galway y Cork son puntos distintos: residencia vs sede de la empresa.
- En JS: `title`, `role`, `text`, `facts[]`, `logos[]` por id (`sevilla`, `galway`, `cork`).
- Posiciones de marcadores: `frontend/js/map.js`.
- CV PDF: `assets/cv/CV_Pablo_Garcia_Marquez_FullStack.pdf`
