/**
 * Capturas de proyectos — fallback si no existe el PNG
 */

(function () {
  "use strict";

  function setupProjectImages(root) {
    var scope = root || document;
    scope.querySelectorAll(".proyecto-card__img").forEach(function (img) {
      var thumb = img.nextElementSibling;
      if (!thumb || !thumb.classList.contains("proyecto-card__thumb")) return;

      function showFallback() {
        img.style.display = "none";
        thumb.hidden = false;
      }

      function showImage() {
        img.style.display = "";
        thumb.hidden = true;
      }

      img.addEventListener("error", showFallback);
      img.addEventListener("load", function () {
        if (img.naturalWidth > 0) showImage();
        else showFallback();
      });

      if (img.complete) {
        if (img.naturalWidth > 0) showImage();
        else showFallback();
      } else {
        thumb.hidden = false;
        img.style.display = "none";
      }
    });
  }

  window.setupProjectImages = setupProjectImages;
  setupProjectImages(document);
})();
