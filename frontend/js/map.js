/**
 * Mapa interactivo — Sevilla, Logroño, Galway, Limerick
 * El mapa ES el currículum (opción A · 5 escenas).
 * Posiciones % sobre europe-relief.svg (LAEA).
 * Textos: content/map-locations.md
 */

(function () {
  "use strict";

  var LOGO_BASE = "../assets/logos/";
  var SKILL_BASE = "../assets/skills/";
  var figure = document.querySelector(".mapa__figure");
  var img = figure && figure.querySelector("img");
  var panel = document.getElementById("mapa-panel");
  var layout = document.getElementById("mapa-layout");
  var routes = figure && figure.querySelector(".mapa__routes");
  var markers = document.querySelectorAll(".mapa__marker");
  if (!figure || !img || !panel || markers.length === 0) return;

  var ROUTE_ORDER = ["sevilla", "logrono", "galway"];
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var activeLocationId = null;
  var activeStageIndex = 0;

  /*
   * Posiciones % sobre europe-relief.svg (proyección LAEA, EPSG:3035).
   * Extensión oficial Wikimedia (Europe_laea_location_map.svg):
   * X 2555000–7405000 m, Y 1350000–5500000 m (Y invertido en pantalla).
   */
  var locations = {
    sevilla: {
      title: "Sevilla",
      role: "Formación · prácticas · 2024–2026",
      x: 7.2,
      y: 90.6,
      stages: [
        {
          label: "Ilerna",
          logos: ["ilerna.jpg"],
          text:
            "Aquí estudié DAW en Ilerna (2024–2026). En el ciclo trabajé con lenguajes como PHP, Java, C++ y MySQL.",
          skills: [
            { file: "php.svg", label: "PHP" },
            { file: "java.svg", label: "Java" },
            { file: "cpp.svg", label: "C++" },
            { file: "mysql.svg", label: "MySQL" },
          ],
          skillsHideLabels: true,
        },
        {
          label: "CORE Networks",
          logos: ["core-networks.png"],
          text:
            "Mientras estudiaba el grado superior, decidí profundizar en el front y realicé el certificado profesional IFCD0110 de 560 h en CORE Networks (nota 9,04), donde me enfoqué en HTML, CSS y JavaScript.",
          skills: [
            { file: "html.svg", label: "HTML" },
            { file: "css.svg", label: "CSS" },
            { file: "javascript.svg", label: "JavaScript" },
          ],
          skillsHideLabels: true,
        },
        {
          label: "Multiplicalia",
          logos: ["multiplicalia.jpg"],
          text:
            "El certificado profesional me permitió realizar mis primeras prácticas de empresa, en Multiplicalia (feb–mar 2026). Trabajé sobre todo en WordPress (Elementor, WPBakery): creación y optimización de páginas, SEO técnico y de contenidos, y mantenimiento (plugins e incidencias). Herramientas: Analytics, Search Console, Screaming Frog y SEMrush.",
          skills: [{ file: "wordpress.svg", label: "WordPress" }],
          skillsHideLabels: true,
        },
      ],
    },
    logrono: {
      title: "Logroño",
      role: "Formación · online · mar–jul 2026",
      text:
        "Compaginaba trabajo los fines de semana y quería seguir en programación, así que me apunté al Programa avanzado de IA para programadores de la UNIR (online, sede Logroño). Aprendí Python a contrarreloj: Copilot/Cursor, LLMs con LangChain y Azure OpenAI, FastAPI/Flask, Docker, MySQL, CI/CD en cloud y modelos open source (PyTorch, Hugging Face).",
      facts: [],
      skills: [
        { file: "python.svg", label: "Python" },
        { file: "fastapi.svg", label: "FastAPI" },
        { file: "docker.svg", label: "Docker" },
        { file: "azure.svg", label: "Azure" },
        { file: "langchain.svg", label: "LangChain" },
        { file: "pytorch.svg", label: "PyTorch" },
        { file: "huggingface.svg", label: "Hugging Face" },
        { file: "mysql.svg", label: "MySQL" },
      ],
      skillsHideLabels: true,
      logos: ["unir.svg"],
      x: 13.8,
      y: 81.8,
    },
    galway: {
      title: "Galway",
      role: "Residencia · Erasmus+ · full stack",
      text:
        "Con el certificado y las prácticas en Multiplicalia opté a una beca Erasmus+ de la UE para Galway. La sede de Fluid estaba en Cork, así que trabajé en remoto: full stack desde Angular hasta una app con Flutter, pagos (CardPointe + GoHighLevel), Android + Clover Go, Node.js, OAuth y POS. El día a día fue en inglés.",
      facts: [],
      skills: [
        { file: "angular.svg", label: "Angular" },
        { file: "typescript.svg", label: "TypeScript" },
        { file: "nodedotjs.svg", label: "Node.js" },
        { file: "flutter.svg", label: "Flutter" },
        { file: "android.svg", label: "Android" },
      ],
      skillsHideLabels: true,
      logos: ["fluid-financial.jpg"],
      x: 10.5,
      y: 47.8,
    },
    limerick: {
      title: "Limerick",
      role: "Inglés · 2019 · Upper Intermediate & Advanced",
      text:
        "Comprendí que si quería seguir avanzando necesitaba mejorar mi inglés, por lo que me mudé un año a Limerick (Irlanda), donde estuve en un intensivo anual en el Limerick Language Centre mientras trabajaba por las noches en un castillo. Fue una experiencia difícil pero enriquecedora.",
      facts: [],
      skills: [],
      logos: ["limerick-language-centre.png"],
      x: 11.8,
      y: 50.6,
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

  function pointFor(id, box) {
    var loc = locations[id];
    if (!loc || !box) return null;
    return {
      x: box.offsetX + (loc.x / 100) * box.width,
      y: box.offsetY + (loc.y / 100) * box.height,
    };
  }

  function placeMarkers() {
    var box = getImageContentBox();
    if (!box) return;

    markers.forEach(function (marker) {
      var id = marker.getAttribute("data-location");
      var loc = locations[id];
      if (!loc) return;

      var pt = pointFor(id, box);
      marker.style.left = pt.x + "px";
      marker.style.top = pt.y + "px";
      marker.setAttribute("data-label", loc.title);

      /* Estilos inline: no dependen de CSS cacheado */
      if (id === "limerick" || marker.classList.contains("mapa__marker--interest")) {
        marker.style.background = "#e8e4dc";
        marker.style.backgroundColor = "#e8e4dc";
        marker.style.borderColor = "#e63946";
        marker.style.boxShadow = "0 0 0 2px rgba(12,12,14,0.85), 0 0 10px rgba(232,228,220,0.4)";
      }
    });

    drawRoute(box);
  }

  function drawRoute(box) {
    if (!routes) return;
    box = box || getImageContentBox();
    if (!box) return;

    var points = ROUTE_ORDER.map(function (id) {
      return pointFor(id, box);
    }).filter(Boolean);

    if (points.length < 2) {
      routes.innerHTML = "";
      return;
    }

    var d = points
      .map(function (pt, i) {
        return (i === 0 ? "M " : "L ") + pt.x.toFixed(1) + " " + pt.y.toFixed(1);
      })
      .join(" ");

    routes.setAttribute("viewBox", "0 0 " + figure.clientWidth + " " + figure.clientHeight);
    routes.innerHTML = '<path class="mapa__route" d="' + d + '"></path>';
  }

  function renderSkills(skills, hideLabels) {
    if (!skills || !skills.length) return "";
    var items = skills
      .map(function (skill) {
        var label = hideLabels
          ? ""
          : "<span>" + skill.label + "</span>";
        return (
          '<li class="mapa__panel-skill' +
          (hideLabels ? " mapa__panel-skill--icon-only" : "") +
          '">' +
          '<img class="mapa__panel-skill-icon" src="' +
          SKILL_BASE +
          skill.file +
          '" alt="' +
          skill.label +
          '" title="' +
          skill.label +
          '" width="28" height="28">' +
          label +
          "</li>"
        );
      })
      .join("");
    return '<ul class="mapa__panel-skills" aria-label="Tecnologías">' + items + "</ul>";
  }

  function renderLogos(logos) {
    if (!logos || !logos.length) return "";
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

  function renderStageNav(loc, stageIndex) {
    var stages = loc.stages;
    if (!stages || stages.length < 2) return "";

    var dots = stages
      .map(function (stage, i) {
        return (
          '<button type="button" class="mapa__stage-dot' +
          (i === stageIndex ? " mapa__stage-dot--active" : "") +
          '" data-stage="' +
          i +
          '" aria-label="' +
          stage.label +
          '"' +
          (i === stageIndex ? ' aria-current="step"' : "") +
          "></button>"
        );
      })
      .join("");

    var prevDisabled = stageIndex === 0 ? " disabled" : "";
    var nextDisabled = stageIndex === stages.length - 1 ? " disabled" : "";

    return (
      '<div class="mapa__stage-nav">' +
      '<button type="button" class="mapa__stage-btn" data-stage-dir="-1"' +
      prevDisabled +
      ">Anterior</button>" +
      '<div class="mapa__stage-dots">' +
      dots +
      "</div>" +
      '<button type="button" class="mapa__stage-btn" data-stage-dir="1"' +
      nextDisabled +
      ">Siguiente</button>" +
      "</div>"
    );
  }

  function openPanel() {
    panel.hidden = false;
    if (layout) layout.classList.add("mapa__layout--open");
    window.requestAnimationFrame(placeMarkers);
  }

  function bindStageNav(loc) {
    panel.querySelectorAll("[data-stage-dir]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var dir = parseInt(btn.getAttribute("data-stage-dir"), 10);
        showStage(loc, activeStageIndex + dir);
      });
    });
    panel.querySelectorAll("[data-stage]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        showStage(loc, parseInt(btn.getAttribute("data-stage"), 10));
      });
    });
  }

  function showStage(loc, stageIndex) {
    var stages = loc.stages;
    if (!stages || !stages.length) return;

    activeStageIndex = Math.max(0, Math.min(stages.length - 1, stageIndex));
    var stage = stages[activeStageIndex];
    var roleHtml = loc.role
      ? '<p class="mapa__panel-role">' + loc.role + "</p>"
      : "";
    var stepLabel =
      '<p class="mapa__panel-step">' +
      (activeStageIndex + 1) +
      " / " +
      stages.length +
      " · " +
      stage.label +
      "</p>";

    panel.innerHTML =
      '<h3 class="mapa__panel-title">' +
      loc.title +
      "</h3>" +
      roleHtml +
      stepLabel +
      renderLogos(stage.logos || []) +
      '<p class="mapa__panel-text">' +
      stage.text +
      "</p>" +
      renderSkills(stage.skills || [], !!stage.skillsHideLabels) +
      renderStageNav(loc, activeStageIndex);

    bindStageNav(loc);
  }

  function renderSimpleLocation(loc) {
    var roleHtml = loc.role
      ? '<p class="mapa__panel-role">' + loc.role + "</p>"
      : "";

    panel.innerHTML =
      '<h3 class="mapa__panel-title">' +
      loc.title +
      "</h3>" +
      roleHtml +
      renderLogos(loc.logos || []) +
      '<p class="mapa__panel-text">' +
      loc.text +
      "</p>" +
      renderSkills(loc.skills || [], !!loc.skillsHideLabels) +
      renderFacts(loc.facts || []);
  }

  function selectLocation(id) {
    var loc = locations[id];
    if (!loc) return;

    openPanel();
    activeLocationId = id;
    activeStageIndex = 0;

    markers.forEach(function (m) {
      var active = m.getAttribute("data-location") === id;
      m.classList.toggle("mapa__marker--active", active);
      m.classList.remove("mapa__marker--pulse");
      m.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (loc.stages && loc.stages.length) {
      showStage(loc, 0);
    } else {
      renderSimpleLocation(loc);
    }

    if (!reducedMotion) {
      panel.style.animation = "none";
      void panel.offsetWidth;
      panel.style.animation = "";
    }
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
