/**
 * API base URL — contact, projects, admin.
 * Producción: misma origen en Render (""), o la URL pública de la API.
 * Actualiza PRODUCTION_API si cambias el servicio en Render.
 */
(function () {
  "use strict";

  var PRODUCTION_API = "https://pagina-web-pablo-api.onrender.com";

  if (typeof window.PORTFOLIO_API === "string") return;

  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    window.PORTFOLIO_API = "http://127.0.0.1:5000";
    return;
  }

  /* Front servido por la propia API (Render): mismo origen */
  if (host.indexOf("onrender.com") !== -1) {
    window.PORTFOLIO_API = "";
    return;
  }

  /* GitHub Pages u otro estático → API en Render */
  window.PORTFOLIO_API = PRODUCTION_API;
})();
