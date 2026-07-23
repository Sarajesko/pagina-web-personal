/**
 * Proyectos — carga desde GET /api/projects (fallback: HTML estático)
 * Muestra hasta 6 repos en rejilla compacta (viewport-fit).
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var MAX_VISIBLE = 6;
  var grid = document.getElementById("proyectos-grid");
  if (!grid) return;

  var LIVE_URLS = {
    Cinebook: "https://cinebook-o4t3.onrender.com",
  };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function cleanDescription(description) {
    return description.replace(/\s*Demo:\s*https?:\/\/\S+/i, "").trim();
  }

  function renderProject(project) {
    var featuredClass = project.is_featured ? " proyecto-card--featured" : "";
    var tags = (project.stack || [])
      .slice(0, 3)
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
        '" target="_blank" rel="noopener noreferrer">Demo</a>'
      : "";

    return (
      '<article class="proyecto-card' +
      featuredClass +
      '">' +
      badge +
      '<h3 class="proyecto-card__title">' +
      escapeHtml(project.title) +
      "</h3>" +
      '<p class="proyecto-card__desc">' +
      escapeHtml(cleanDescription(project.description || "")) +
      "</p>" +
      '<div class="proyecto-card__tags">' +
      tags +
      "</div>" +
      '<div class="proyecto-card__links">' +
      '<a class="proyecto-card__link" href="' +
      escapeHtml(project.github_url) +
      '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      liveLink +
      "</div>" +
      "</article>"
    );
  }

  function renderProjects(projects) {
    var sorted = projects.slice().sort(function (a, b) {
      var af = a.is_featured ? 1 : 0;
      var bf = b.is_featured ? 1 : 0;
      if (bf !== af) return bf - af;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
    var visible = sorted.slice(0, MAX_VISIBLE);
    grid.innerHTML = visible.map(renderProject).join("");
  }

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
