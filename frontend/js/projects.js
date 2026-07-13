/**
 * Proyectos — carga desde GET /api/projects (fallback: HTML estático)
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var grid = document.getElementById("proyectos-grid");
  if (!grid) return;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function stackHasPhp(stack) {
    return stack.some(function (tag) {
      return tag.toLowerCase() === "php";
    });
  }

  function renderProject(project) {
    var featuredClass = project.is_featured ? " proyecto-card--featured" : "";
    var thumbClass = stackHasPhp(project.stack)
      ? "proyecto-card__thumb proyecto-card__thumb--php"
      : "proyecto-card__thumb";
    var imageUrl = project.image_url || "";
    var alt = "Captura de " + project.title;
    var tags = project.stack
      .map(function (tag) {
        return '<span class="stack__tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");
    var badge = project.is_featured
      ? '<p class="proyecto-card__badge">Destacado</p>'
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
      '">Captura próximamente</div>' +
      "</div>" +
      badge +
      '<h3 class="proyecto-card__title">' +
      escapeHtml(project.title) +
      "</h3>" +
      '<p class="proyecto-card__desc">' +
      escapeHtml(project.description) +
      "</p>" +
      '<div class="proyecto-card__tags">' +
      tags +
      "</div>" +
      '<a class="proyecto-card__link" href="' +
      escapeHtml(project.github_url) +
      '" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>' +
      "</article>"
    );
  }

  function renderProjects(projects) {
    grid.innerHTML = projects.map(renderProject).join("");
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
