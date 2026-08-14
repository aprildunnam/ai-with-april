/**
 * AI with April — shared site behavior.
 * Vanilla JS, no build step, no dependencies.
 */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link inside it is activated (small screens)
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Footer year
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
