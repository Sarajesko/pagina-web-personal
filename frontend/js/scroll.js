/**
 * Scroll lateral entre escenas — guión horizontal
 * Rueda vertical → avance lateral · teclado ← → · nav sync
 */

(function () {
  "use strict";

  var container = document.getElementById("scenes");
  if (!container) return;

  var scenes = Array.prototype.slice.call(container.querySelectorAll(".scene"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".scene-nav__link"));
  var sceneCurrent = document.getElementById("scene-current");
  var sceneTotal = document.getElementById("scene-total");
  var sceneTitle = document.getElementById("scene-title");
  if (scenes.length === 0) return;

  var sceneLabels = [
    "PORTADA",
    "MAPA",
    "PROYECTO",
    "PROYECTOS",
    "CONTACTO",
  ];

  if (sceneTotal) {
    sceneTotal.textContent = String(scenes.length).padStart(2, "0");
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrollLock = false;
  var lockMs = reducedMotion ? 0 : 650;
  var wheelThreshold = 40;

  var touchStartX = 0;
  var touchStartY = 0;
  var touchStartTime = 0;
  var minSwipeDistance = 48;
  var maxSwipeTime = 600;

  function isMapInteractiveTarget(el) {
    if (!el || !el.closest) return false;
    return !!el.closest(".mapa__figure, .mapa__markers, .mapa__marker, .mapa__panel, #mapa-panel");
  }

  function sceneWidth() {
    return container.clientWidth;
  }

  function currentIndex() {
    var w = sceneWidth();
    if (w === 0) return 0;
    return Math.round(container.scrollLeft / w);
  }

  function updateNav(index) {
    navLinks.forEach(function (link, i) {
      var active = i === index;
      link.classList.toggle("scene-nav__link--active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (sceneCurrent) {
      sceneCurrent.textContent = String(index + 1).padStart(2, "0");
    }
    if (sceneTitle && sceneLabels[index]) {
      sceneTitle.textContent = sceneLabels[index];
    }
    var id = scenes[index] && scenes[index].id;
    if (id && history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }
  }

  function goToScene(index) {
    var target = Math.max(0, Math.min(scenes.length - 1, index));
    if (target === currentIndex() && container.scrollLeft === target * sceneWidth()) {
      return;
    }

    scrollLock = true;
    container.scrollTo({
      left: target * sceneWidth(),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    updateNav(target);

    if (lockMs > 0) {
      window.setTimeout(function () {
        scrollLock = false;
      }, lockMs);
    } else {
      scrollLock = false;
    }
  }

  function isFormField(el) {
    if (!el || !el.closest) return false;
    return !!el.closest("input, textarea, select, button[type='submit']");
  }

  container.addEventListener(
    "wheel",
    function (e) {
      if (scrollLock) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      var idx = currentIndex();
      e.preventDefault();
      if (e.deltaY > wheelThreshold) {
        goToScene(idx + 1);
      } else if (e.deltaY < -wheelThreshold) {
        goToScene(idx - 1);
      }
    },
    { passive: false }
  );

  container.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length !== 1) return;
      if (isFormField(e.target) || isMapInteractiveTarget(e.target)) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    function (e) {
      if (scrollLock) return;
      if (isFormField(e.target) || isMapInteractiveTarget(e.target)) return;

      var touch = e.changedTouches[0];
      if (!touch) return;

      var dx = touch.clientX - touchStartX;
      var dy = touch.clientY - touchStartY;
      var elapsed = Date.now() - touchStartTime;

      if (elapsed > maxSwipeTime) return;
      if (Math.abs(dx) < minSwipeDistance) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

      var idx = currentIndex();

      if (dx < 0) {
        goToScene(idx + 1);
      } else {
        goToScene(idx - 1);
      }
    },
    { passive: true }
  );

  document.addEventListener("keydown", function (e) {
    if (isFormField(document.activeElement)) return;

    var idx = currentIndex();
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      goToScene(idx + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goToScene(idx - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToScene(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToScene(scenes.length - 1);
    }
  });

  navLinks.forEach(function (link, i) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      goToScene(i);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      var el = document.getElementById(hash.slice(1));
      if (!el) return;
      var index = scenes.indexOf(el);
      if (index === -1) return;
      e.preventDefault();
      goToScene(index);
    });
  });

  var scrollTick = false;
  container.addEventListener("scroll", function () {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(function () {
      updateNav(currentIndex());
      scrollTick = false;
    });
  });

  window.addEventListener("resize", function () {
    goToScene(currentIndex());
  });

  function initFromHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) {
      updateNav(0);
      return;
    }
    var el = document.getElementById(hash);
    if (!el) return;
    var index = scenes.indexOf(el);
    if (index >= 0) {
      reducedMotion = true;
      goToScene(index);
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }

  initFromHash();
})();
