/**
 * Proyectos — carga desde GET /api/projects (fallback: HTML estático)
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var grid = document.getElementById("proyectos-grid");
  if (!grid) return;

  var LIVE_URLS = {
    Cinebook: "https://cinebook-o4t3.onrender.com",
  };

  var THUMB_LABELS = {
    Cinebook: "Demo en Render",
    "rag-agent-azure": "Azure · Docker · CI/CD",
  };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function stackHasAzure(stack) {
    return stack.some(function (tag) {
      var t = tag.toLowerCase();
      return t === "azure" || t === "docker" || t === "fastapi";
    });
  }

  function cleanDescription(description) {
    return description.replace(/\s*Demo:\s*https?:\/\/\S+/i, "").trim();
  }

  function renderProject(project) {
    var featuredClass = project.is_featured ? " proyecto-card--featured" : "";
    var thumbClass = stackHasAzure(project.stack)
      ? "proyecto-card__thumb proyecto-card__thumb--php"
      : "proyecto-card__thumb";
    var imageUrl = project.image_url || "";
    var alt = "Captura de " + project.title;
    var thumbLabel = THUMB_LABELS[project.title] || "Captura próximamente";
    var tags = project.stack
      .map(function (tag) {
        return '<span class="stack__tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");
    var badge = project.is_featured
      ? '<p class="proyecto-card__badge">Destacado</p>'
      : "";
    var liveUrl = LIVE_URLS[project.title] || "";
    var liveLink = liveUrl
      ? '<a class="proyecto-card__link" href="' +
        escapeHtml(liveUrl) +
        '" target="_blank" rel="noopener noreferrer">Demo en vivo</a>'
      : "";

    return (
      '<article class="proyecto-card' +
      featuredClass +
      '">' +
      '<div class="proyecto-card__media">' +
      (imageUrl
        ? '<img class="proyecto-card__img" src="' +
          escapeHtml(imageUrl) +
          '" alt="' +
          escapeHtml(alt) +
          '" loading="lazy" width="800" height="450">'
        : "") +
      '<div class="' +
      thumbClass +
      '">' +
      escapeHtml(thumbLabel) +
      "</div>" +
      "</div>" +
      badge +
      '<h3 class="proyecto-card__title">' +
      escapeHtml(project.title) +
      "</h3>" +
      '<p class="proyecto-card__desc">' +
      escapeHtml(cleanDescription(project.description)) +
      "</p>" +
      '<div class="proyecto-card__tags">' +
      tags +
      "</div>" +
      '<a class="proyecto-card__link" href="' +
      escapeHtml(project.github_url) +
      '" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>' +
      liveLink +
      "</article>"
    );
  }

  function renderProjects(projects) {
    var featured = projects.filter(function (p) {
      return p.is_featured;
    });
    var visible = featured.length > 0 ? featured.slice(0, 2) : projects.slice(0, 2);
    grid.innerHTML = visible.map(renderProject).join("");
    if (typeof window.setupProjectImages === "function") {
      window.setupProjectImages(grid);
    }
  }

  fetch(API_BASE + "/api/projects")
    .then(function (response) {
      if (!response.ok) throw new Error("API error");
      return response.json();
    })
    .then(function (data) {
      if (!data.ok || !Array.isArray(data.projects) || data.projects.length === 0) {
        return;
      }
      renderProjects(data.projects);
    })
    .catch(function () {
      /* Mantiene las tarjetas estáticas del HTML */
    });
})();
