/**
 * Proyectos — rejilla + diálogo con esquema de la app al hacer clic.
 * Carga desde GET /api/projects (fallback: HTML estático).
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var MAX_VISIBLE = 6;
  var grid = document.getElementById("proyectos-grid");
  var dialog = document.getElementById("proyecto-dialog");
  if (!grid) return;

  var LIVE_URLS = {
    Cinebook: "https://cinebook-o4t3.onrender.com",
    "Manga-festival-Web": "https://sarajesko.github.io/Manga-festival-Web/examen.html",
  };

  var ASSET_BASE = "../assets/projects/";

  var SCHEMAS = {
    Cinebook: {
      blurb: "Inventario de libros de cine, ISBN, wishlist y estadísticas.",
      proves: [
        "Full stack Angular + NestJS (CRUD y API)",
        "Wishlist, ISBN y panel de estadísticas",
        "Demo pública desplegada en Render",
      ],
      shot: "cinebook-catalogo.jpg",
      schema: schemaCinebook,
    },
    "rag-agent-azure": {
      blurb: "Agente RAG sobre documentos con Azure SQL y Container Apps.",
      proves: [
        "RAG con FastAPI + documentos indexados",
        "Azure SQL y despliegue en Container Apps",
        "CI/CD y evidencias Swagger / health en cloud",
      ],
      shot: "rag-swagger.png",
      schema: schemaRag,
    },
    "Manga-festival-Web": {
      blurb: "Landing del festival con reserva de bono y validación en cliente.",
      proves: [
        "Front HTML/CSS/JS sin frameworks",
        "Formulario de reserva con validación",
        "Demo pública en GitHub Pages",
      ],
      shot: "manga-reserva.png",
      schema: schemaManga,
    },
    "cinemateca-yugoslav-black-wave": {
      blurb: "Catálogo editorial de la Ola Negra Yugoslava (Next.js + Fastify).",
      proves: [
        "Catálogo editorial Next.js + Fastify",
        "Arquitectura front/back separada",
        "Contenido cultural estructurado",
      ],
      shot: "cinemateca-catalogo.png",
      schema: schemaCinemateca,
    },
    "social-content-generator-api": {
      blurb: "API que genera posts con Azure OpenAI y los guarda en MySQL.",
      proves: [
        "API FastAPI + persistencia MySQL",
        "Generación con Azure OpenAI",
        "CRUD de posts para redes sociales",
      ],
      shot: "social-swagger.png",
      schema: schemaSocial,
    },
    "task-manager-api": {
      blurb: "API REST de tareas con CRUD, endpoints de IA y tests pytest.",
      proves: [
        "CRUD REST con FastAPI",
        "Endpoints de IA (Azure OpenAI)",
        "Tests automatizados con pytest",
      ],
      shot: "task-swagger.png",
      schema: schemaTasks,
    },
  };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  function cleanDescription(description) {
    return String(description || "")
      .replace(/\s*Demo:\s*https?:\/\/\S+/i, "")
      .trim();
  }

  function label(text) {
    return '<span class="ps-label">' + escapeHtml(text) + "</span>";
  }

  function schemaCinebook() {
    return (
      '<div class="proyecto-schema proyecto-schema--cinebook" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("Nav · catálogo") +
      "<span></span><span></span>" +
      "</div>" +
      '<div class="ps-body">' +
      '<aside class="ps-side">' +
      label("Sidebar · filtros") +
      "<i></i><i></i><i></i><i></i>" +
      "</aside>" +
      '<div class="ps-main">' +
      '<div class="ps-toolbar">' +
      label("Stats") +
      "<b></b><b></b>" +
      "</div>" +
      '<div class="ps-grid">' +
      label("Grid · libros") +
      "<em></em><em></em><em></em><em></em><em></em><em></em>" +
      "</div>" +
      "</div></div></div>"
    );
  }

  function schemaRag() {
    return (
      '<div class="proyecto-schema proyecto-schema--rag" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("Nav · agente") +
      "<span></span>" +
      "</div>" +
      '<div class="ps-body ps-body--split">' +
      '<div class="ps-docs">' +
      label("Docs · índice") +
      "<i></i><i></i><i></i>" +
      "</div>" +
      '<div class="ps-chat">' +
      label("Chat · RAG") +
      '<p class="ps-bubble ps-bubble--bot"></p>' +
      '<p class="ps-bubble ps-bubble--user"></p>' +
      '<p class="ps-bubble ps-bubble--bot"></p>' +
      '<div class="ps-input"><b></b></div>' +
      "</div></div></div>"
    );
  }

  function schemaManga() {
    return (
      '<div class="proyecto-schema proyecto-schema--manga" aria-hidden="true">' +
      '<div class="ps-hero">' +
      label("Hero · festival") +
      "<span></span><span class=\"ps-cta\"></span>" +
      "</div>" +
      '<div class="ps-form">' +
      label("Form · reserva bono") +
      "<i></i><i></i><i class=\"ps-btn\"></i>" +
      "</div></div>"
    );
  }

  function schemaCinemateca() {
    return (
      '<div class="proyecto-schema proyecto-schema--cine" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("Nav · cinemateca") +
      "<span></span><span></span>" +
      "</div>" +
      '<div class="ps-strip">' +
      label("Carrusel · films") +
      "<em></em><em></em><em></em><em></em>" +
      "</div>" +
      '<div class="ps-detail">' +
      label("Ficha · detalle") +
      "<b></b><i></i><i></i>" +
      "</div></div>"
    );
  }

  function schemaSocial() {
    return (
      '<div class="proyecto-schema proyecto-schema--social" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("Nav · generator") +
      "<span></span>" +
      "</div>" +
      '<div class="ps-body ps-body--split">' +
      '<div class="ps-editor">' +
      label("Editor · prompt") +
      "<i></i><i></i><i class=\"ps-btn\"></i>" +
      "</div>" +
      '<div class="ps-preview">' +
      label("Preview · post") +
      "<em></em><em></em>" +
      "</div></div></div>"
    );
  }

  function schemaTasks() {
    return (
      '<div class="proyecto-schema proyecto-schema--tasks" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("Nav · tasks API") +
      "<span></span>" +
      "</div>" +
      '<div class="ps-cols">' +
      '<div class="ps-col">' +
      label("Backlog") +
      "<b></b><i></i><i></i>" +
      "</div>" +
      '<div class="ps-col">' +
      label("En curso") +
      "<b></b><i></i><i></i><i></i>" +
      "</div>" +
      '<div class="ps-col">' +
      label("Hecho") +
      "<b></b><i></i>" +
      "</div></div></div>"
    );
  }

  function schemaGeneric() {
    return (
      '<div class="proyecto-schema proyecto-schema--generic" aria-hidden="true">' +
      '<div class="ps-nav">' +
      label("App") +
      "<span></span>" +
      "</div>" +
      '<div class="ps-body"><i></i><i></i><i></i></div>' +
      "</div>"
    );
  }

  function schemaHtmlFor(title) {
    var meta = SCHEMAS[title];
    if (meta && meta.shot) {
      return (
        '<figure class="proyecto-shot">' +
        '<img src="' +
        escapeHtml(ASSET_BASE + meta.shot) +
        '" alt="Captura de ' +
        escapeHtml(title) +
        '" loading="lazy">' +
        "</figure>"
      );
    }
    if (meta && meta.schema) return meta.schema();
    return schemaGeneric();
  }

  function renderProject(project) {
    var title = project.title || "";
    var tags = (project.stack || [])
      .slice(0, 3)
      .map(function (tag) {
        return '<span class="stack__tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");
    var liveUrl = LIVE_URLS[title] || "";
    var liveLink = liveUrl
      ? '<a class="proyecto-card__link" href="' +
        escapeHtml(liveUrl) +
        '" target="_blank" rel="noopener noreferrer">Demo</a>'
      : "";
    var github = project.github_url || "#";

    return (
      '<article class="proyecto-card" tabindex="0" role="button" ' +
      'data-project-title="' +
      escapeHtml(title) +
      '" data-project-desc="' +
      escapeHtml(cleanDescription(project.description || "")) +
      '" data-project-github="' +
      escapeHtml(github) +
      '" data-project-demo="' +
      escapeHtml(liveUrl) +
      '" aria-label="Ver esquema de ' +
      escapeHtml(title) +
      '">' +
      '<h3 class="proyecto-card__title">' +
      escapeHtml(title) +
      "</h3>" +
      '<p class="proyecto-card__desc">' +
      escapeHtml(cleanDescription(project.description || "")) +
      "</p>" +
      '<div class="proyecto-card__tags">' +
      tags +
      "</div>" +
      '<div class="proyecto-card__links">' +
      '<a class="proyecto-card__link" href="' +
      escapeHtml(github) +
      '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      liveLink +
      '<span class="proyecto-card__hint">Ver →</span>' +
      "</div>" +
      "</article>"
    );
  }

  function renderProjects(projects) {
    var sorted = projects.slice().sort(function (a, b) {
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
    grid.innerHTML = sorted.slice(0, MAX_VISIBLE).map(renderProject).join("");
    bindCards(grid);
  }

  function openDialog(data) {
    if (!dialog) return;
    var titleEl = dialog.querySelector("[data-proyecto-title]");
    var descEl = dialog.querySelector("[data-proyecto-desc]");
    var provesEl = dialog.querySelector("[data-proyecto-proves]");
    var schemaEl = dialog.querySelector("[data-proyecto-schema]");
    var linksEl = dialog.querySelector("[data-proyecto-links]");
    if (!titleEl || !descEl || !schemaEl || !linksEl) return;

    var meta = SCHEMAS[data.title];
    titleEl.textContent = data.title;
    descEl.textContent = (meta && meta.blurb) || data.desc || "";

    if (provesEl) {
      var proves = (meta && meta.proves) || [];
      var provesLabel = dialog.querySelector(".proyecto-dialog__proves-label");
      provesEl.innerHTML = proves
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("");
      provesEl.hidden = proves.length === 0;
      if (provesLabel) provesLabel.hidden = proves.length === 0;
    }

    schemaEl.innerHTML = schemaHtmlFor(data.title);

    var links = [];
    if (data.github) {
      links.push(
        '<a class="proyecto-dialog__link" href="' +
          escapeHtml(data.github) +
          '" target="_blank" rel="noopener noreferrer">GitHub</a>'
      );
    }
    if (data.demo) {
      links.push(
        '<a class="proyecto-dialog__link" href="' +
          escapeHtml(data.demo) +
          '" target="_blank" rel="noopener noreferrer">Demo</a>'
      );
    }
    linksEl.innerHTML = links.join("");

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function cardData(card) {
    return {
      title: card.getAttribute("data-project-title") || "",
      desc: card.getAttribute("data-project-desc") || "",
      github: card.getAttribute("data-project-github") || "",
      demo: card.getAttribute("data-project-demo") || "",
    };
  }

  function bindCards(root) {
    root.querySelectorAll(".proyecto-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        openDialog(cardData(card));
      });
      card.addEventListener("keydown", function (e) {
        if (e.target.closest("a")) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDialog(cardData(card));
        }
      });
    });
  }

  function enhanceStaticCards() {
    grid.querySelectorAll(".proyecto-card").forEach(function (card) {
      var titleEl = card.querySelector(".proyecto-card__title");
      var descEl = card.querySelector(".proyecto-card__desc");
      var github = card.querySelector('a[href*="github"]');
      var demo = card.querySelector('a.proyecto-card__link[href*="onrender"], a.proyecto-card__link[href*="http"]:not([href*="github"])');
      var title = titleEl ? titleEl.textContent.trim() : "";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("data-project-title", title);
      card.setAttribute(
        "data-project-desc",
        descEl ? cleanDescription(descEl.textContent) : ""
      );
      card.setAttribute("data-project-github", github ? github.href : "");
      card.setAttribute("data-project-demo", LIVE_URLS[title] || (demo ? demo.href : ""));
      card.setAttribute("aria-label", "Ver esquema de " + title);

      var badge = card.querySelector(".proyecto-card__badge");
      if (badge) badge.remove();
      card.classList.remove("proyecto-card--featured");

      var links = card.querySelector(".proyecto-card__links");
      if (links && !links.querySelector(".proyecto-card__hint")) {
        var hint = document.createElement("span");
        hint.className = "proyecto-card__hint";
        hint.textContent = "Ver →";
        links.appendChild(hint);
      }
    });
    bindCards(grid);
  }

  if (dialog) {
    var closeBtn = dialog.querySelector("[data-proyecto-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog();
    });
  }

  enhanceStaticCards();

  fetch(API_BASE + "/api/projects")
    .then(function (response) {
      if (!response.ok) throw new Error("API error");
      return response.json();
    })
    .then(function (data) {
      if (!data.ok || !Array.isArray(data.projects) || data.projects.length < 4) {
        return;
      }
      renderProjects(data.projects);
    })
    .catch(function () {
      /* Mantiene las tarjetas estáticas del HTML */
    });
})();
