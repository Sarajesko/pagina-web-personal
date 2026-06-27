/**
 * Mapa interactivo — Sevilla, Galway, Cork
 * Textos: content/map-locations.md
 */

(function () {
  "use strict";

  var LOGO_BASE = "../assets/logos/";
  var panel = document.getElementById("mapa-panel");
  var markers = document.querySelectorAll(".mapa__marker");
  if (!panel || markers.length === 0) return;

  var locations = {
    sevilla: {
      title: "Sevilla",
      text: "DAW en Ilerna. Prácticas de WordPress y SEO en Multiplicalia.",
      logos: ["ilerna.jpg", "multiplicalia.jpg"],
    },
    galway: {
      title: "Galway",
      text: "Beca Erasmus+ de la UE. Aquí resido durante la beca.",
      logos: [],
    },
    cork: {
      title: "Cork",
      text: "Sede de Fluid Financial. Prácticas full stack en remoto.",
      logos: ["fluid-financial.jpg"],
    },
  };

  function renderLogos(logos) {
    if (!logos.length) return "";
    var html = logos
      .map(function (file) {
        var name = file.replace(/\.[^.]+$/, "").replace(/-/g, " ");
        return (
          '<img class="mapa__panel-logo" src="' +
          LOGO_BASE +
          file +
          '" alt="' +
          name +
          '" width="48" height="48">'
        );
      })
      .join("");
    return '<div class="mapa__panel-logos">' + html + "</div>";
  }

  function selectLocation(id) {
    var loc = locations[id];
    if (!loc) return;

    markers.forEach(function (m) {
      var active = m.getAttribute("data-location") === id;
      m.classList.toggle("mapa__marker--active", active);
      m.setAttribute("aria-pressed", active ? "true" : "false");
    });

    panel.innerHTML =
      '<h3 class="mapa__panel-title">' +
      loc.title +
      "</h3>" +
      renderLogos(loc.logos) +
      '<p class="mapa__panel-text">' +
      loc.text +
      "</p>";
  }

  markers.forEach(function (marker) {
    marker.setAttribute("aria-pressed", "false");
    marker.addEventListener("click", function (e) {
      e.stopPropagation();
      selectLocation(marker.getAttribute("data-location"));
    });
  });
})();
