/**
 * Escena 03 — hover cruzado lista ↔ arquitectura
 */

(function () {
  "use strict";

  var root = document.querySelector(".scene--este-proyecto");
  if (!root) return;

  var nodes = root.querySelectorAll("[data-layer]");
  if (!nodes.length) return;

  function setActive(layer, on) {
    nodes.forEach(function (el) {
      var match = el.getAttribute("data-layer") === layer;
      el.classList.toggle("is-paired", on && match);
      el.classList.toggle("is-dimmed", on && !match);
    });
  }

  function clearActive() {
    nodes.forEach(function (el) {
      el.classList.remove("is-paired", "is-dimmed");
    });
  }

  nodes.forEach(function (el) {
    var layer = el.getAttribute("data-layer");
    el.addEventListener("mouseenter", function () {
      setActive(layer, true);
    });
    el.addEventListener("mouseleave", clearActive);
    el.addEventListener("focus", function () {
      setActive(layer, true);
    });
    el.addEventListener("blur", clearActive);
  });
})();
