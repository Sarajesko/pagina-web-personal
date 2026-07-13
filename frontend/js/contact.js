/**
 * Formulario de contacto — validación cliente + POST /api/contact
 */

(function () {
  "use strict";

  var API_BASE = window.PORTFOLIO_API || "http://127.0.0.1:5000";
  var MIN_MESSAGE_LENGTH = 10;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var ALLOWED_SUBJECTS = {
    "practicas-daw": true,
    colaboracion: true,
    otro: true,
  };

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("contact-status");
  var submitBtn = form.querySelector(".contacto__submit");
  var defaultSubmitText = submitBtn ? submitBtn.textContent : "Enviar";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    setStatus("", "");

    var payload = collectPayload();
    var errors = validateClient(payload);
    if (errors) {
      showErrors(errors);
      setStatus("Revisa los campos marcados.", "error");
      return;
    }

    setLoading(true);
    fetch(API_BASE + "/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, status: response.status, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data.ok) {
          form.reset();
          setStatus(
            result.data.message || "Mensaje enviado. Te responderé pronto.",
            "success"
          );
          return;
        }

        if (result.data.errors) {
          showErrors(result.data.errors);
          setStatus("Revisa los campos marcados.", "error");
          return;
        }

        setStatus(
          result.data.error || "No se pudo enviar el mensaje. Inténtalo más tarde.",
          "error"
        );
      })
      .catch(function () {
        setStatus(
          "No se pudo conectar con el servidor. ¿Está la API en marcha?",
          "error"
        );
      })
      .finally(function () {
        setLoading(false);
      });
  });

  function collectPayload() {
    return {
      name: getValue("contact-name"),
      email: getValue("contact-email"),
      subject: getValue("contact-subject"),
      message: getValue("contact-message"),
      privacy: document.getElementById("contact-privacy").checked,
    };
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function validateClient(payload) {
    var errors = {};

    if (!payload.name) {
      errors.name = "El nombre es obligatorio.";
    }

    if (!payload.email) {
      errors.email = "El email es obligatorio.";
    } else if (!EMAIL_RE.test(payload.email)) {
      errors.email = "Formato de email no válido.";
    }

    if (!payload.subject) {
      errors.subject = "Selecciona un asunto.";
    } else if (!ALLOWED_SUBJECTS[payload.subject]) {
      errors.subject = "Asunto no válido.";
    }

    if (!payload.message) {
      errors.message = "El mensaje es obligatorio.";
    } else if (payload.message.length < MIN_MESSAGE_LENGTH) {
      errors.message = "Mínimo " + MIN_MESSAGE_LENGTH + " caracteres.";
    }

    if (!payload.privacy) {
      errors.privacy = "Debes aceptar la política de privacidad.";
    }

    return Object.keys(errors).length ? errors : null;
  }

  function showErrors(errors) {
    Object.keys(errors).forEach(function (field) {
      if (field === "_form") return;
      var inputId = field === "privacy" ? "contact-privacy" : "contact-" + field;
      var input = document.getElementById(inputId);
      if (!input) return;

      var wrapper = input.closest(".contacto__field");
      if (!wrapper) return;

      wrapper.classList.add("contacto__field--error");
      input.setAttribute("aria-invalid", "true");

      var errorEl = wrapper.querySelector(".contacto__field-error");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.className = "contacto__field-error";
        errorEl.setAttribute("role", "alert");
        wrapper.appendChild(errorEl);
      }
      errorEl.textContent = errors[field];
      errorEl.hidden = false;
    });
  }

  function clearErrors() {
    form.querySelectorAll(".contacto__field--error").forEach(function (field) {
      field.classList.remove("contacto__field--error");
      var input = field.querySelector("input, select, textarea");
      if (input) input.removeAttribute("aria-invalid");
      var errorEl = field.querySelector(".contacto__field-error");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
    });
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.hidden = !message;
    statusEl.className = "contacto__status";
    if (type) statusEl.classList.add("contacto__status--" + type);
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Enviando…" : defaultSubmitText;
  }
})();
