/**
 * API base URL — contact, projects, admin.
 * - localhost → API local
 * - GitHub Pages → PRODUCTION_API (backend externo)
 * - Mismo origen (Hetzner / Render / tunnel) → ""
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

  /* Front estático en Pages → API remota */
  if (host.indexOf("github.io") !== -1) {
    window.PORTFOLIO_API = PRODUCTION_API;
    return;
  }

  /* Hetzner, Render, tunnels, etc.: API en el mismo origen */
  window.PORTFOLIO_API = "";
})();
