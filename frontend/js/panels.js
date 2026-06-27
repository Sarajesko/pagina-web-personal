/**
 * Paneles de detalle en escenas (Multiplicalia, Erasmus+…)
 */

(function () {
  "use strict";

  document.querySelectorAll("[data-panel]").forEach(function (btn) {
    var panelId = btn.getAttribute("data-panel");
    var panel = panelId && document.getElementById(panelId);
    if (!panel) return;

    btn.addEventListener("click", function () {
      var isHidden = panel.hidden;
      panel.hidden = !isHidden;
      btn.setAttribute("aria-expanded", isHidden ? "true" : "false");
      btn.textContent = isHidden ? "− Ocultar detalle" : "+ Ver detalle";
    });
  });
})();
