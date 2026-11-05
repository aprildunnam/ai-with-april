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
    function closeNavigation() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link inside it is activated (small screens)
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && nav.classList.contains("is-open")) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNavigation();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("is-open")) {
        closeNavigation();
      }
    });
  }

  // Footer year
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Add copy controls to code examples that do not already provide one.
  document.querySelectorAll(".prose pre").forEach(function (pre) {
    if (pre.closest(".prompt-block, .code-block")) {
      return;
    }

    var wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var button = document.createElement("button");
    button.className = "prompt-copy";
    button.type = "button";
    button.setAttribute("data-copy-prompt", "");
    button.textContent = "Copy";
    wrapper.insertBefore(button, pre);
  });

  // Copy buttons for reusable prompt and code blocks
  document.querySelectorAll("[data-copy-prompt]").forEach(function (button) {
    button.hidden = false;
    var original = button.textContent;
    var resetTimer;
    button.addEventListener("click", function () {
      window.clearTimeout(resetTimer);
      var block = button.closest(".prompt-block, .code-block");
      var code = block && block.querySelector("code");

      if (!code || !navigator.clipboard) {
        button.textContent = "Copy unavailable";
        return;
      }

      navigator.clipboard.writeText(code.textContent).then(function () {
        button.textContent = "Copied";
        resetTimer = window.setTimeout(function () {
          button.textContent = original;
        }, 1800);
      }).catch(function () {
        button.textContent = "Copy failed";
      });
    });

  });

  function updateScrollableRegions() {
    document.querySelectorAll(".prose table, .prose pre").forEach(function (region) {
      var isScrollable = region.scrollWidth > region.clientWidth + 1;
      region.classList.toggle("is-scrollable", isScrollable);
      if (isScrollable) {
        region.setAttribute("tabindex", "0");
      } else {
        region.removeAttribute("tabindex");
      }
    });
  }

  updateScrollableRegions();
  window.addEventListener("resize", updateScrollableRegions);
  document.addEventListener("toggle", updateScrollableRegions, true);
  if (document.fonts) document.fonts.ready.then(updateScrollableRegions);

  var header = document.querySelector(".site-header");
  function updateHeaderHeight() {
    if (header) {
      document.documentElement.style.setProperty("--header-height", header.getBoundingClientRect().height + "px");
    }
  }
  updateHeaderHeight();
  if (header && window.ResizeObserver) new ResizeObserver(updateHeaderHeight).observe(header);

  var main = document.querySelector("main");
  var isResource = /\/resources\/[^/]+\.html$/.test(window.location.pathname);
  if (main && isResource) {
    var headings = Array.prototype.filter.call(main.querySelectorAll("h2"), function (heading) {
      return !heading.closest("details, .page-toc") && heading.textContent.trim() !== "On this page";
    });
    if (headings.length >= 3) {
      var chapters = document.createElement("nav");
      chapters.className = "chapter-nav";
      chapters.setAttribute("aria-label", "Page chapters");
      var inner = document.createElement("div");
      inner.className = "wrap chapter-nav__inner";
      var links = headings.map(function (heading, index) {
        if (!heading.id) {
          var candidate = "chapter-" + (index + 1);
          while (document.getElementById(candidate)) candidate += "-section";
          heading.id = candidate;
        }
        var link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent.trim();
        inner.appendChild(link);
        return link;
      });
      chapters.appendChild(inner);
      main.insertBefore(chapters, main.firstChild);
      document.body.classList.add("has-chapter-nav");
      if (window.IntersectionObserver) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (link) {
              if (link.hash === "#" + entry.target.id) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        }, { rootMargin: "-15% 0px -65% 0px" });
        headings.forEach(function (heading) { observer.observe(heading); });
      }
    }
  }
})();
