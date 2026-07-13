/**
 * Panel admin — login, mensajes, CRUD proyectos
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var SUBJECT_LABELS = {
    "practicas-daw": "Prácticas DAW",
    colaboracion: "Colaboración",
    otro: "Otro",
  };

  var state = {
    user: null,
    messages: [],
    projects: [],
    activeMessageId: null,
    editingProjectId: null,
  };

  var loginView = document.getElementById("login-view");
  var dashboardView = document.getElementById("dashboard-view");
  var headerActions = document.getElementById("admin-header-actions");
  var adminUserEl = document.getElementById("admin-user");
  var bannerEl = document.getElementById("admin-banner");
  var loginForm = document.getElementById("login-form");
  var loginError = document.getElementById("login-error");
  var messageDialog = document.getElementById("message-dialog");

  document.getElementById("admin-logout").addEventListener("click", logout);
  document.getElementById("refresh-messages").addEventListener("click", loadMessages);
  document.getElementById("new-project").addEventListener("click", showNewProjectForm);
  document.getElementById("project-cancel").addEventListener("click", hideProjectForm);
  document.getElementById("project-form").addEventListener("submit", saveProject);
  document.getElementById("message-mark-read").addEventListener("click", markActiveMessageRead);

  document.querySelectorAll(".admin-tabs__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    loginError.hidden = true;
    var username = document.getElementById("login-username").value.trim();
    var password = document.getElementById("login-password").value;
    if (!username || !password) {
      showLoginError("Usuario y contraseña obligatorios.");
      return;
    }
    setLoginLoading(true);
    api("/api/admin/login", {
      method: "POST",
      body: { username: username, password: password },
    })
      .then(function (result) {
        if (!result.ok) {
          showLoginError(result.data.error || "No se pudo iniciar sesión.");
          return;
        }
        state.user = { username: result.data.username };
        showDashboard();
      })
      .catch(function () {
        showLoginError("No se pudo conectar con la API.");
      })
      .finally(function () {
        setLoginLoading(false);
      });
  });

  checkSession();

  function checkSession() {
    api("/api/admin/me")
      .then(function (result) {
        if (result.ok && result.data.ok) {
          state.user = { username: result.data.username, id: result.data.id };
          showDashboard();
        } else {
          showLogin();
        }
      })
      .catch(function () {
        showLogin();
      });
  }

  function showLogin() {
    loginView.hidden = false;
    dashboardView.hidden = true;
    headerActions.hidden = true;
    clearBanner();
  }

  function showDashboard() {
    loginView.hidden = true;
    dashboardView.hidden = false;
    headerActions.hidden = false;
    adminUserEl.textContent = state.user.username;
    clearBanner();
    loadMessages();
    loadProjects();
  }

  function logout() {
    api("/api/admin/logout", { method: "POST" })
      .finally(function () {
        state.user = null;
        showLogin();
        loginForm.reset();
      });
  }

  function switchTab(tab) {
    document.querySelectorAll(".admin-tabs__btn").forEach(function (btn) {
      btn.classList.toggle("admin-tabs__btn--active", btn.getAttribute("data-tab") === tab);
    });
    document.getElementById("tab-messages").hidden = tab !== "messages";
    document.getElementById("tab-projects").hidden = tab !== "projects";
  }

  function loadMessages() {
    api("/api/admin/messages")
      .then(function (result) {
        if (!result.ok) {
          showBanner("No se pudieron cargar los mensajes.");
          return;
        }
        state.messages = result.data.messages || [];
        renderMessages();
      })
      .catch(function () {
        showBanner("Error de conexión al cargar mensajes.");
      });
  }

  function renderMessages() {
    var tbody = document.getElementById("messages-body");
    var table = document.getElementById("messages-table");
    var empty = document.getElementById("messages-empty");
    tbody.innerHTML = "";

    if (state.messages.length === 0) {
      table.hidden = true;
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    table.hidden = false;

    state.messages.forEach(function (msg) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + escapeHtml(formatDate(msg.created_at)) + "</td>" +
        "<td>" + escapeHtml(msg.name) + "</td>" +
        "<td><a href=\"mailto:" + escapeAttr(msg.email) + "\">" + escapeHtml(msg.email) + "</a></td>" +
        "<td>" + escapeHtml(SUBJECT_LABELS[msg.subject] || msg.subject) + "</td>" +
        "<td>" + (msg.is_read
          ? '<span class="admin-badge admin-badge--read">Leído</span>'
          : '<span class="admin-badge admin-badge--unread">Nuevo</span>') + "</td>" +
        '<td><div class="admin-row-actions">' +
        '<button type="button" class="admin-btn admin-btn--ghost admin-btn--small" data-action="view" data-id="' + msg.id + '">Ver</button>' +
        (!msg.is_read
          ? '<button type="button" class="admin-btn admin-btn--ghost admin-btn--small" data-action="read" data-id="' + msg.id + '">Marcar leído</button>'
          : "") +
        "</div></td>";
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = Number(btn.getAttribute("data-id"));
        var action = btn.getAttribute("data-action");
        if (action === "view") openMessage(id);
        if (action === "read") patchMessageRead(id);
      });
    });
  }

  function openMessage(id) {
    var msg = state.messages.find(function (m) { return m.id === id; });
    if (!msg) return;
    state.activeMessageId = id;
    document.getElementById("message-dialog-title").textContent = msg.name;
    document.getElementById("message-dialog-meta").innerHTML =
      "<dt>Email</dt><dd>" + escapeHtml(msg.email) + "</dd>" +
      "<dt>Asunto</dt><dd>" + escapeHtml(SUBJECT_LABELS[msg.subject] || msg.subject) + "</dd>" +
      "<dt>Fecha</dt><dd>" + escapeHtml(formatDate(msg.created_at)) + "</dd>";
    document.getElementById("message-dialog-body").textContent = msg.message;
    document.getElementById("message-mark-read").hidden = msg.is_read;
    messageDialog.showModal();
  }

  function markActiveMessageRead() {
    if (state.activeMessageId) patchMessageRead(state.activeMessageId);
  }

  function patchMessageRead(id) {
    api("/api/admin/messages/" + id, {
      method: "PATCH",
      body: { is_read: true },
    })
      .then(function (result) {
        if (!result.ok) {
          showBanner("No se pudo marcar el mensaje.");
          return;
        }
        state.messages = state.messages.map(function (m) {
          return m.id === id ? result.data.message : m;
        });
        renderMessages();
        if (messageDialog.open) {
          document.getElementById("message-mark-read").hidden = true;
        }
      })
      .catch(function () {
        showBanner("Error de conexión.");
      });
  }

  function loadProjects() {
    api("/api/admin/projects")
      .then(function (result) {
        if (!result.ok) {
          showBanner("No se pudieron cargar los proyectos.");
          return;
        }
        state.projects = result.data.projects || [];
        renderProjects();
      })
      .catch(function () {
        showBanner("Error de conexión al cargar proyectos.");
      });
  }

  function renderProjects() {
    var tbody = document.getElementById("projects-body");
    var table = document.getElementById("projects-table");
    var empty = document.getElementById("projects-empty");
    tbody.innerHTML = "";

    if (state.projects.length === 0) {
      table.hidden = true;
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    table.hidden = false;

    state.projects.forEach(function (project) {
      var tr = document.createElement("tr");
      var badges =
        (project.is_published
          ? '<span class="admin-badge admin-badge--published">Publicado</span> '
          : '<span class="admin-badge admin-badge--draft">Borrador</span> ') +
        (project.is_featured ? '<span class="admin-badge admin-badge--featured">Destacado</span>' : "");
      tr.innerHTML =
        "<td>" + escapeHtml(String(project.sort_order)) + "</td>" +
        "<td>" + escapeHtml(project.title) + "</td>" +
        "<td>" + escapeHtml((project.stack || []).join(", ")) + "</td>" +
        "<td>" + badges + "</td>" +
        '<td><div class="admin-row-actions">' +
        '<button type="button" class="admin-btn admin-btn--ghost admin-btn--small" data-action="edit" data-id="' + project.id + '">Editar</button>' +
        '<button type="button" class="admin-btn admin-btn--ghost admin-btn--small admin-btn--danger" data-action="delete" data-id="' + project.id + '">Eliminar</button>' +
        "</div></td>";
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = Number(btn.getAttribute("data-id"));
        if (btn.getAttribute("data-action") === "edit") editProject(id);
        if (btn.getAttribute("data-action") === "delete") deleteProject(id);
      });
    });
  }

  function showNewProjectForm() {
    state.editingProjectId = null;
    document.getElementById("project-form-title").textContent = "Nuevo proyecto";
    document.getElementById("project-form").reset();
    document.getElementById("project-published").checked = true;
    document.getElementById("project-form-error").hidden = true;
    document.getElementById("project-form-card").hidden = false;
  }

  function editProject(id) {
    var project = state.projects.find(function (p) { return p.id === id; });
    if (!project) return;
    state.editingProjectId = id;
    document.getElementById("project-form-title").textContent = "Editar proyecto";
    document.getElementById("project-id").value = id;
    document.getElementById("project-title").value = project.title;
    document.getElementById("project-github").value = project.github_url;
    document.getElementById("project-description").value = project.description;
    document.getElementById("project-stack").value = (project.stack || []).join(", ");
    document.getElementById("project-image").value = project.image_url || "";
    document.getElementById("project-sort").value = project.sort_order || 0;
    document.getElementById("project-featured").checked = project.is_featured;
    document.getElementById("project-published").checked = project.is_published;
    document.getElementById("project-form-error").hidden = true;
    document.getElementById("project-form-card").hidden = false;
  }

  function hideProjectForm() {
    document.getElementById("project-form-card").hidden = true;
    state.editingProjectId = null;
  }

  function saveProject(event) {
    event.preventDefault();
    var errorEl = document.getElementById("project-form-error");
    errorEl.hidden = true;

    var payload = {
      title: document.getElementById("project-title").value.trim(),
      description: document.getElementById("project-description").value.trim(),
      stack: document.getElementById("project-stack").value.trim(),
      github_url: document.getElementById("project-github").value.trim(),
      image_url: document.getElementById("project-image").value.trim() || null,
      sort_order: Number(document.getElementById("project-sort").value) || 0,
      is_featured: document.getElementById("project-featured").checked,
      is_published: document.getElementById("project-published").checked,
    };

    var path = "/api/admin/projects";
    var method = "POST";
    if (state.editingProjectId) {
      path += "/" + state.editingProjectId;
      method = "PUT";
    }

    document.getElementById("project-submit").disabled = true;
    api(path, { method: method, body: payload })
      .then(function (result) {
        if (!result.ok) {
          if (result.data.errors) {
            errorEl.textContent = Object.values(result.data.errors).join(" ");
          } else {
            errorEl.textContent = result.data.error || "No se pudo guardar.";
          }
          errorEl.hidden = false;
          return;
        }
        hideProjectForm();
        loadProjects();
      })
      .catch(function () {
        errorEl.textContent = "Error de conexión.";
        errorEl.hidden = false;
      })
      .finally(function () {
        document.getElementById("project-submit").disabled = false;
      });
  }

  function deleteProject(id) {
    var project = state.projects.find(function (p) { return p.id === id; });
    if (!project) return;
    if (!window.confirm('¿Eliminar "' + project.title + '"?')) return;

    api("/api/admin/projects/" + id, { method: "DELETE" })
      .then(function (result) {
        if (!result.ok) {
          showBanner("No se pudo eliminar el proyecto.");
          return;
        }
        loadProjects();
      })
      .catch(function () {
        showBanner("Error de conexión.");
      });
  }

  function api(path, options) {
    options = options || {};
    var init = {
      method: options.method || "GET",
      credentials: "include",
      headers: {},
    };
    if (options.body !== undefined) {
      init.headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }
    return fetch(API_BASE + path, init).then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      }).catch(function () {
        return { ok: response.ok, status: response.status, data: {} };
      });
    });
  }

  function showBanner(message) {
    bannerEl.textContent = message;
    bannerEl.hidden = !message;
  }

  function clearBanner() {
    bannerEl.hidden = true;
    bannerEl.textContent = "";
  }

  function showLoginError(message) {
    loginError.textContent = message;
    loginError.hidden = false;
  }

  function setLoginLoading(isLoading) {
    document.getElementById("login-submit").disabled = isLoading;
  }

  function formatDate(value) {
    if (!value) return "—";
    return String(value).replace("T", " ").slice(0, 16);
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, "&quot;");
  }
})();
