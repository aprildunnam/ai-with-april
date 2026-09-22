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
    button.addEventListener("click", function () {
      var block = button.closest(".prompt-block, .code-block");
      var code = block && block.querySelector("code");

      if (!code || !navigator.clipboard) {
        button.textContent = "Copy unavailable";
        return;
      }

      navigator.clipboard.writeText(code.textContent).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1800);
      }).catch(function () {
        button.textContent = "Copy failed";
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
  });

  // Search and topic filters for the growing session catalog
  var sessionSearch = document.querySelector("[data-session-search]");
  var sessionCards = Array.prototype.slice.call(document.querySelectorAll("[data-session-card]"));
  var sessionFilters = Array.prototype.slice.call(document.querySelectorAll("[data-session-filter]"));
  var sessionToolbar = document.querySelector(".session-toolbar");
  var sessionResults = document.querySelector("[data-session-results]");
  var sessionEmpty = document.querySelector("[data-session-empty]");
  var activeSessionFilter = "all";

  if (sessionToolbar && sessionCards.length >= 4) {
    sessionToolbar.hidden = false;
  }

  function updateSessionCatalog() {
    if (!sessionCards.length) {
      return;
    }

    var query = sessionSearch ? sessionSearch.value.trim().toLowerCase() : "";
    var visible = 0;

    sessionCards.forEach(function (card) {
      var topics = (card.getAttribute("data-session-topics") || "").split(/\s+/);
      var searchText = (card.getAttribute("data-session-search-text") || card.textContent).toLowerCase();
      var matchesTopic = activeSessionFilter === "all" || topics.indexOf(activeSessionFilter) !== -1;
      var matchesSearch = !query || searchText.indexOf(query) !== -1;
      var show = matchesTopic && matchesSearch;

      card.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    if (sessionResults) {
      sessionResults.textContent = "Showing " + visible + " session" + (visible === 1 ? "" : "s");
    }
    if (sessionEmpty) {
      sessionEmpty.hidden = visible !== 0;
    }
  }

  if (sessionSearch) {
    sessionSearch.addEventListener("input", updateSessionCatalog);
  }

  sessionFilters.forEach(function (filter) {
    filter.setAttribute(
      "aria-pressed",
      String(filter.getAttribute("data-session-filter") === activeSessionFilter)
    );
    filter.addEventListener("click", function () {
      activeSessionFilter = filter.getAttribute("data-session-filter") || "all";
      sessionFilters.forEach(function (item) {
        var isActive = item === filter;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      updateSessionCatalog();
    });
  });

  updateSessionCatalog();
})();
