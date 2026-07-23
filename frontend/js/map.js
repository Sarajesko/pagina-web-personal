/**
 * Mapa interactivo — Sevilla, Galway, Cork
 * El mapa ES el currículum (opción A · 5 escenas).
 * Posiciones % sobre europe-relief.svg (LAEA).
 * Textos: content/map-locations.md
 */

(function () {
  "use strict";

  var LOGO_BASE = "../assets/logos/";
  var figure = document.querySelector(".mapa__figure");
  var img = figure && figure.querySelector("img");
  var panel = document.getElementById("mapa-panel");
  var markers = document.querySelectorAll(".mapa__marker");
  if (!figure || !img || !panel || markers.length === 0) return;

  /*
   * Posiciones % sobre europe-relief.svg (proyección LAEA, EPSG:3035).
   * Extensión oficial Wikimedia (Europe_laea_location_map.svg):
   * X 2555000–7405000 m, Y 1350000–5500000 m (Y invertido en pantalla).
   */
  var locations = {
    sevilla: {
      title: "Sevilla",
      role: "Formación · prácticas",
      text: "Base de la trayectoria. Formación DAW, IA aplicada y primera experiencia en empresa.",
      facts: [
        "DAW — Ilerna · buscando prácticas del módulo superior",
        "IFCD0110 — CORE Networks · nota 9,04 · 560 h",
        "UNIR — Programa avanzado IA para programar (2026)",
        "Multiplicalia — PHP, WordPress, SEO (feb–mar 2026)",
      ],
      logos: ["ilerna.jpg", "core-networks.png", "multiplicalia.jpg"],
      x: 7.2,
      y: 90.6,
    },
    galway: {
      title: "Galway",
      role: "Residencia · Erasmus+",
      text: "Donde vivo durante la beca. Inglés en contexto real.",
      facts: [
        "Beca Erasmus+ de la Unión Europea",
        "Residencia en Galway mientras trabajo en remoto",
        "Inglés aplicado en día a día y empresa",
      ],
      logos: [],
      x: 10.5,
      y: 47.8,
    },
    cork: {
      title: "Cork",
      role: "Empresa · full stack",
      text: "Sede de Fluid Financial. Prácticas full stack en remoto desde Galway (beca UE).",
      facts: [
        "Fluid Financial LLC — fintech · jun–ago 2026",
        "Pagos CardPointe + GoHighLevel · Node.js · OAuth",
        "Android + datáfono Clover Go · pruebas en dispositivo",
      ],
      logos: ["fluid-financial.jpg"],
      x: 10.7,
      y: 51.6,
    },
  };

  function getImageContentBox() {
    var rect = img.getBoundingClientRect();
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    if (!nw || !nh) return null;

    var scale = Math.min(rect.width / nw, rect.height / nh);
    var w = nw * scale;
    var h = nh * scale;
    return {
      offsetX: (rect.width - w) / 2,
      offsetY: (rect.height - h) / 2,
      width: w,
      height: h,
    };
  }

  function placeMarkers() {
    var box = getImageContentBox();
    if (!box) return;

    markers.forEach(function (marker) {
      var id = marker.getAttribute("data-location");
      var loc = locations[id];
      if (!loc) return;

      var x = box.offsetX + (loc.x / 100) * box.width;
      var y = box.offsetY + (loc.y / 100) * box.height;
      marker.style.left = x + "px";
      marker.style.top = y + "px";
    });
  }

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

  function renderFacts(facts) {
    if (!facts || !facts.length) return "";
    var items = facts
      .map(function (fact) {
        return "<li>" + fact + "</li>";
      })
      .join("");
    return '<ul class="mapa__panel-facts">' + items + "</ul>";
  }

  function selectLocation(id) {
    var loc = locations[id];
    if (!loc) return;

    markers.forEach(function (m) {
      var active = m.getAttribute("data-location") === id;
      m.classList.toggle("mapa__marker--active", active);
      m.setAttribute("aria-pressed", active ? "true" : "false");
    });

    var roleHtml = loc.role
      ? '<p class="mapa__panel-role">' + loc.role + "</p>"
      : "";

    panel.innerHTML =
      '<h3 class="mapa__panel-title">' +
      loc.title +
      "</h3>" +
      roleHtml +
      renderLogos(loc.logos) +
      '<p class="mapa__panel-text">' +
      loc.text +
      "</p>" +
      renderFacts(loc.facts);
  }

  markers.forEach(function (marker) {
    marker.setAttribute("aria-pressed", "false");
    marker.addEventListener("click", function (e) {
      e.stopPropagation();
      selectLocation(marker.getAttribute("data-location"));
    });
  });

  function initMap() {
    placeMarkers();
  }

  if (img.complete) {
    initMap();
  } else {
    img.addEventListener("load", initMap);
  }

  window.addEventListener("resize", placeMarkers);
})();
