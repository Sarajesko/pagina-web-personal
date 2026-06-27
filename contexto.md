# Contexto — Página web personal de Pablo García Márquez

Documento de referencia para el desarrollo del proyecto. Define la identidad, la narrativa, la dirección visual y las decisiones técnicas.

---

## 1. Quién soy y qué quiero contar

**Pablo García Márquez** — desarrollador full stack en formación con un trasfondo poco habitual: antes de intentar ser desarrollador web, **era guionista**.

Eso no es un dato anecdótico: es el **concepto rector** de la página. Las webs convencionales se leen de arriba abajo; esta se lee **de izquierda a derecha**, como las páginas de un guión. El visitante no hace scroll vertical: **avanza por escenas**, como si pasara hojas de un script.

**Objetivo principal de la web:** portfolio con personalidad que **ayude a encontrar una empresa interesante** para las **prácticas del módulo superior de DAW** (aún **no realizadas**). Las prácticas que ya tiene son del **curso del paro** (IFCD0110) y de la **beca Erasmus+** de la Unión Europea — no confundir con las del ciclo formativo superior.

**Objetivo secundario:** demostrar perfil **full stack** — no solo frontend bonito, sino también **backend funcional** (formulario de contacto con validación, API y pruebas).

**Enlaces:**
- **LinkedIn:** [linkedin.com/in/pablogarciamarquez](https://www.linkedin.com/in/pablogarciamarquez)
- **GitHub:** [github.com/Sarajesko](https://github.com/Sarajesko)

---

## 2. Narrativa interactiva — el viaje

La experiencia tiene dos fases:

### Fase 1: Scroll lateral (las «páginas del guión»)

Scroll horizontal que cuenta la trayectoria en orden cronológico/narrativo. Cada «página» o panel es una escena:

| Escena | Contenido | Interacción |
|--------|-----------|-------------|
| 1 | **DAW en Sevilla** — Ilerna, terminando el ciclo formativo | Aparece al hacer scroll lateral |
| 2 | **Formación IFCD0110** — CORE Networks (curso del paro) | Scroll lateral |
| 3 | **Prácticas Multiplicalia** — Sevilla, feb.–mar. 2026 | Click para profundizar |
| 4 | **Beca Erasmus+ UE** — Galway (becado) · Fluid Financial, Cork (empresa, remoto) | Click para profundizar |

### Fase 2: Clicks que revelan (sin scroll lateral)

A partir de cierto punto, los **clicks ya no avanzan el scroll horizontal**. En su lugar:

- Se **despliega información** en la misma vista (overlay, panel o zona expandida).
- Aparece un **mapa en relieve de Europa** — se ven los perfiles/topografía de los países, estilizado, no un Google Maps genérico.
- Con cada click: **punto rojo** en la ubicación + **logo** de la institución/empresa + **texto breve**.
- Sensación de **road movie / montaje de guión**: cada click es un corte a la siguiente escena del viaje.

### Puntos del mapa (marcadores rojos)

| Ubicación | Qué representa | Logo |
|-----------|----------------|------|
| **Sevilla** | DAW Ilerna + prácticas Multiplicalia | Ilerna, Multiplicalia |
| **Galway, Irlanda** | Beca Erasmus+ — donde reside Pablo | — |
| **Cork, Irlanda** | Fluid Financial LLC — sede de la empresa (prácticas en remoto) | Fluid Financial |

> **Importante:** La empresa está en **Cork**, pero Pablo está **becado en Galway**. Son dos puntos distintos en el mapa; al hacer click en cada uno, texto breve que lo deje claro.
>
> **Nota:** Lisboa aparece en la biografía (trabajo previo, inicio del enamoramiento con la programación). Valorar si añadir un punto en el mapa en fase posterior; no es prioritario en v1.

---

## 3. Formación y experiencia (contenido real)

### DAW — Ilerna Sevilla
- Ciclo formativo **Desarrollo de Aplicaciones Web**, en curso / terminando.
- **Prácticas del módulo superior:** pendientes — la web debe facilitar contacto con empresas.
- Logo: `assets/logos/ilerna.jpg`

### Certificado Profesional IFCD0110 — Confección y Publicación de Páginas Web
- **Centro:** CORE Networks (Junta de Andalucía)
- **Periodo:** octubre 2025 – abril 2026
- **Nota:** 9,04
- **Duración:** 560 h (nivel 2)
- **Contenidos:** HTML, CSS, JavaScript, formularios, integración de componentes, pruebas y publicación de páginas web.
- Logo: `assets/logos/core-networks.png`

### Prácticas — Multiplicalia (curso IFCD0110, no DAW superior)
- **Puesto:** Desarrollador web
- **Empresa:** [Multiplicalia](https://multiplicalia.com) — SEO & Web Design
- **Contrato:** Prácticas de empresa dentro del Certificado Profesional IFCD0110
- **Periodo:** febrero 2026 – marzo 2026 (2 meses)
- **Ubicación:** Sevilla, Andalucía · Híbrido
- Logo: `assets/logos/multiplicalia.jpg`

**Tareas realizadas:**
- Desarrollo y mantenimiento de sitios web con WordPress (Elementor, WPBakery)
- Creación, edición y optimización de páginas: diseño, estructura y UX
- SEO técnico y de contenidos: auditorías, metadatos, enlazado interno y palabras clave
- Herramientas: Google Analytics, Search Console, Screaming Frog, SEMrush
- Mantenimiento: actualización de plugins e incidencias técnicas

### Beca Erasmus+ — Fluid Financial LLC
- **Puesto:** Desarrollador full stack
- **Empresa:** Fluid Financial LLC — sede en **Cork**, Condado de Cork
- **Contrato:** Beca Erasmus+ · Contrato de prácticas
- **Periodo:** junio 2026 – actualidad
- **Empresa:** Cork · **En remoto**
- **Becado (Pablo):** **Galway**, Irlanda — donde reside durante la beca
- Logo: `assets/logos/fluid-financial.jpg`

---

## 4. Sección «Sobre mí»

Apartado propio, separado del scroll narrativo. Texto base (adaptado de LinkedIn):

> Pasé del guión al código. Antes escribía historias; ahora las construyo. Por el camino trabajé en Lisboa, donde empecé a enamorarme de la programación; aprendí inglés en Irlanda y, de regreso a Sevilla, lideré un equipo en atención al cliente del sector aéreo.
>
> Soy desarrollador full stack con formación DAW. Actualmente otra vez en Irlanda con una beca Erasmus+ de la Unión Europea.
>
> No estoy empezando de cero: estoy cambiando de escenario. Y visto lo visto, en este sector voy a seguir aprendiendo el resto de la vida.

**Tono:** personal, narrativo, coherente con la metáfora del guionista. No un CV frío.

---

## 5. Sección «Proyectos»

Mostrar proyectos directamente en la web y/o enlazar a GitHub.

**Perfil:** [github.com/Sarajesko](https://github.com/Sarajesko)

| Repositorio | Descripción | Stack |
|-------------|-------------|-------|
| [Manga-festival-Web](https://github.com/Sarajesko/Manga-festival-Web) | Web para festival de manga: validación de datos y navegación multipágina | HTML, CSS, JavaScript |
| [Validaci-n-PHP](https://github.com/Sarajesko/Validaci-n-PHP) | Ejercicio de validación en PHP | PHP |
| [EV_Pablo_GarciaMarquez](https://github.com/Sarajesko/EV_Pablo_GarciaMarquez) | Ejercicio de validación en PHP | PHP |

Presentación sugerida: tarjetas con captura, descripción breve y enlace al repo. Priorizar **Manga-festival-Web** como proyecto estrella (HTML/CSS/JS, alineado con el portfolio).

Presentación sugerida: tarjetas con captura, descripción breve y enlace al repo. Priorizar **Manga-festival-Web** como proyecto estrella (HTML/CSS/JS, alineado con el portfolio).

**Acceso v1:** la sección Proyectos es **100 % pública** — sin login. Enlace a GitHub siempre visible. Los proyectos pueden cargarse desde la API/BD; el visitante no necesita registrarse.

---

## 6. Roles, acceso y backend (v1 — Opción C)

Decisión confirmada: **todo el portfolio público** + **login solo para administrador**. No se oculta contenido a invitados (evita que reclutadores no vean trabajos).

### Roles

| Rol | Acceso |
|-----|--------|
| **Invitado** (sin login) | Toda la web: trayectoria, mapa, Sobre mí, **proyectos completos**, GitHub, LinkedIn, formulario de contacto |
| **Administrador** (Pablo) | Panel admin: ver mensajes del formulario, CRUD de proyectos en BD, gestión básica |

### Fase 2 (futuro, no v1)

Registro de usuarios opcional con extras (CV ampliado, notas técnicas). **Los proyectos seguirán siendo públicos** — nunca condicionados al alta.

### Base de datos (SQL)

Motor recomendado v1: **SQLite** (local y despliegue simple). Migrable a MySQL/PostgreSQL en producción si hace falta.

**Tablas previstas (mínimo):**

| Tabla | Uso |
|-------|-----|
| `contact_messages` | Mensajes del formulario (INSERT desde API pública) |
| `projects` | Proyectos del portfolio (lectura pública; escritura solo admin) |
| `admin_users` | Credenciales admin (hash de contraseña, sin texto plano) |

### Panel administrador

- Ruta protegida (ej. `/admin`) — login con sesión o JWT simple.
- Listar / marcar leídos mensajes de contacto.
- Crear, editar, ordenar y despublicar proyectos.
- Demuestra: SQL, auth, CRUD, API REST — sin penalizar al visitante anónimo.

---

## 7. Formulario de contacto

Sección **Contacto** con formulario real — no un simple `mailto:`. Debe dejar claro que Pablo sabe **frontend + backend**.

### Qué debe hacer

| Capa | Funcionalidad |
|------|---------------|
| **Frontend** | Formulario (nombre, email, asunto, mensaje). Validación en cliente. Envío con `fetch` sin recargar la página. Feedback visual (éxito / error). |
| **Backend** | API REST que recibe `POST`, **valida en servidor**, sanitiza y **guarda en BD** (`contact_messages`). |
| **Destino del mensaje** | Persistencia en **SQLite**; opcional notificación por email (SMTP) en fase posterior. |
| **Pruebas** | Colección **Postman** (o equivalente) con casos válidos, campos vacíos y email mal formado. |

### Campos sugeridos

- Nombre (obligatorio)
- Email (obligatorio, formato válido)
- Asunto — opciones: «Prácticas DAW», «Colaboración», «Otro»
- Mensaje (obligatorio, mínimo de caracteres)
- Checkbox privacidad (obligatorio)

### Qué demuestra a un reclutador

- Validación **cliente y servidor** (como en los ejercicios PHP de validación del DAW).
- Separación frontend / backend (API JSON).
- Manejo de errores HTTP (400, 500).
- Documentación mínima del endpoint (README + pruebas Postman).

- Validación **cliente y servidor** + persistencia **SQL**.
- Separación frontend / backend (API JSON).
- Panel **admin** para consultar mensajes (demuestra auth + SELECT).
- Manejo de errores HTTP (400, 500).
- Documentación mínima del endpoint (README + pruebas Postman).

### Stack backend (confirmado v1)

| Componente | Elección |
|------------|----------|
| **Python + Flask** | API REST, sesiones admin |
| **SQLite + SQL** | BD relacional sencilla (DAW-ready) |
| **PHP** | Descartado para v1 |

**Frontend:** HTML + CSS + JS vanilla (sin Angular).

**Despliegue:** frontend estático (GitHub Pages / Netlify) + API Flask (Render, Railway, etc.). Variables sensibles en `.env`, **nunca** en el repo.

---

## 8. Dirección visual

### Referencia principal: [Sala X](https://lasalax.com/)

Lo que hay que tomar de esa web (no copiarla literalmente):

- **Texturas** — superficies con grano, capas, sensación táctil/analógica.
- **Atmósfera** — oscura o con contraste fuerte, tipografía con carácter, sensación de espacio escénico.
- **Calidad visual** — cuidada pero alcanzable con HTML/CSS (gradientes, `background-image`, blend modes, ruido SVG/CSS, etc.).

### Metáfora visual: guión + escena

- Layout horizontal = páginas de script.
- Transiciones entre escenas = cortes de montaje (fade, slide, o «corte seco»).
- Mapa en **relieve** de Europa: perfiles de países visibles, estética cartográfica/topo, no plano plano.

### Logos disponibles

```
assets/logos/
├── multiplicalia.jpg
├── fluid-financial.jpg
├── ilerna.jpg
└── core-networks.png
```

### Paleta y tipografía
- Orientación: oscuro + acentos (rojo de Multiplicalia/CORE como posible acento).
- Tipografía con carácter — evocar guión/cine sin caer en cliché de Courier en todo.

---

## 9. Stack tecnológico

Prioridad: **simple y acorde a DAW**, con **backend + SQL + panel admin** visibles para reclutadores técnicos.

| Tecnología | Uso previsto |
|------------|--------------|
| **HTML** | Estructura semántica, formulario accesible, panel admin |
| **CSS** | Layout horizontal, texturas, animaciones, mapa en relieve, responsive |
| **JavaScript** | Scroll lateral, clicks, mapa, `fetch` a API pública y admin |
| **Python + Flask** | API REST, auth admin, CRUD proyectos, contacto |
| **SQLite / SQL** | Mensajes, proyectos, usuario admin |
| **Postman** | Probar endpoints públicos y admin |
| **TypeScript / Angular** | **No** en v1 |

**Arquitectura v1:** frontend estático público + **API Flask + SQLite**. Proyectos servidos por API pero visibles sin login. Mapa en relieve: SVG topográfico de Europa.

---

## 10. Alcance y restricciones

- **Portfolio personal** con objetivo de **conseguir prácticas DAW** en empresa interesante.
- Debe demostrar **full stack**: portfolio público + **formulario a BD** + **panel admin SQL**.
- Complejidad acorde a **estudiante terminando DAW** — bien hecho, con personalidad, sin frameworks frontend pesados.
- Debe **notarse** el pasado de guionista en la UX (scroll lateral, escenas, viaje narrativo).
- **CTA claro** hacia contacto / LinkedIn para reclutadores y empresas.
- **Responsive:** scroll lateral en móvil → swipe horizontal o secciones apiladas con la misma narrativa.
- **Accesibilidad:** alternativa a scroll solo horizontal (teclado, `prefers-reduced-motion`, lectores de pantalla).

---

## 11. Estructura de secciones

1. **Portada / FADE IN** — nombre, rol («Desarrollador full stack · Ex-guionista»), gancho visual.
2. **El guión** — intro breve al concepto de la web.
3. **Escena: DAW Ilerna** — formación actual + buscando prácticas módulo superior.
4. **Escena: CORE Networks** — certificado IFCD0110.
5. **Escena: Multiplicalia** — prácticas curso del paro, Sevilla.
6. **Escena: Erasmus+ / Fluid Financial** — becado en Galway, empresa en Cork (remoto).
7. **Mapa del viaje** — relieve Europa, clicks, puntos rojos, logos, textos breves.
8. **Sobre mí** — biografía narrativa (texto LinkedIn adaptado).
9. **Proyectos** — tarjetas públicas (API/BD) + enlace GitHub siempre visible.
10. **Stack / habilidades** — HTML, CSS, JS, WordPress, SEO, PHP, etc.
11. **Contacto** — formulario → BD + LinkedIn + GitHub + CTA prácticas DAW.

*(Panel admin en ruta aparte, no cuenta como «escena» del guión.)*

---

## 12. Assets

### Disponibles
- [x] Logos: Multiplicalia, Fluid Financial, Ilerna, CORE Networks (`assets/logos/`)
- [x] Texto «Sobre mí» (LinkedIn)
- [x] Datos de experiencia laboral
- [x] Repositorios GitHub

### Pendientes
- [ ] Capturas de pantalla de proyectos (Manga-festival-Web, etc.)
- [ ] Textos breves definitivos por punto del mapa
- [ ] **Favicon** — pendiente de diseñar (ver nota abajo)
- [ ] Meta tags Open Graph (imagen preview para LinkedIn/WhatsApp; puede reutilizar favicon o crear una aparte)
- [ ] CV descargable (opcional)
- [ ] SVG o asset del mapa de Europa en relieve
- [ ] Cuenta/servicio SMTP *(opcional, fase posterior)*
- [ ] Colección Postman del API de contacto
- [ ] `.env.example` con variables documentadas (sin secretos reales)

### Favicon — pendiente, sin idea cerrada aún

Hace falta un favicon (icono de pestaña del navegador). **Todavía no hay concepto definido** — diseñarlo más adelante, cuando encaje con la identidad visual de la web.

**Requisitos técnicos (cuando exista):**
- Formatos: `favicon.ico` + `favicon.svg` (opcional, escala mejor)
- Tamaños: 32×32 mínimo; 180×180 para Apple touch icon
- Debe leerse bien a tamaño minúsculo (pestaña del navegador)
- Coherente con paleta oscura / texturas tipo Sala X

**Ideas en el tintero** *(solo semillas, nada decidido)*:
- Metáfora **guión → código**: una «X» de montaje (`FADE IN`) mezclada con `< />` o `{ }`
- Iniciales **PG** o **P** estilizadas como marca de guión (Courier / máquina de escribir)
- Una **página de script** vista de perfil (rectángulo con líneas de texto)
- Punto rojo del **mapa** (coherente con los marcadores del viaje)
- Símbolo mínimo de **escena / acto** (INT. / EXT. reducido a icono)

> Decidir el favicon **después** de tener la portada y la paleta de la maqueta — así no se hace dos veces.

---

## 13. Criterios de éxito

1. Un visitante (reclutador/empresa) entiende en **menos de 10 segundos** quién es Pablo y qué busca (prácticas DAW).
2. La trayectoria **Sevilla → Multiplicalia → Galway (beca) / Cork (empresa)** se cuenta de forma clara y memorable.
3. Las **texturas y atmósfera** evocan calidad tipo Sala X sin plagiar.
4. El **mapa en relieve** funciona con clicks, puntos rojos y logos.
5. **Proyectos** visibles **sin login** y enlazados a GitHub.
6. **Formulario** guarda en BD; **panel admin** permite ver mensajes y gestionar proyectos.
7. El código es **presentable en portfolio DAW** (frontend + backend + SQL documentados).
8. Funciona razonablemente en **desktop y móvil**.

---

## 14. Próximos pasos sugeridos

> **Checklist detallado:** ver [`CHECKLIST.md`](CHECKLIST.md) — pasos numerados con validación tuya entre cada uno.

1. ~~Validar datos y logos~~ ✓
2. ~~Checklist de ejecución~~ ✓
3. ~~Decisión acceso v1: Opción C (público + admin + BD)~~ ✓
4. ~~Paso 0.1 — estructura de carpetas~~ ✓
5. ~~Paso 0.2 — Git + `.gitignore`~~ ✓
6. Paso 0.4 — SVG mapa Europa *(siguiente)*

---

*Última actualización: junio 2026 — documento vivo; ampliar según avance el proyecto.*
