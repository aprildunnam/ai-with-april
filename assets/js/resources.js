/**
 * AI with April — resource library filter/search.
 * Runs entirely client-side against window.AI_WITH_APRIL_RESOURCES.
 * No backend, no build step.
 */
(function () {
  "use strict";

  var grid = document.getElementById("resource-grid");
  var emptyState = document.getElementById("empty-state");
  var resultsMeta = document.getElementById("results-meta");
  var searchInput = document.getElementById("resource-search");
  var clearBtn = document.getElementById("clear-filters");

  if (!grid || !window.AI_WITH_APRIL_RESOURCES) {
    return;
  }

  var resources = window.AI_WITH_APRIL_RESOURCES;
  var taxonomy = window.AI_WITH_APRIL_TAXONOMY;

  var state = {
    query: "",
    role: "all",
    topic: "all"
  };

  function readInitialStateFromURL() {
    var params = new URLSearchParams(window.location.search);
    var role = params.get("role");
    var topic = params.get("topic");
    var q = params.get("q");
    if (role && taxonomy.roles[role]) state.role = role;
    if (topic && taxonomy.topics[topic]) state.topic = topic;
    if (q) state.query = q;
  }

  function matches(resource) {
    var roleOk = state.role === "all" || resource.roles.indexOf(state.role) !== -1;
    var topicOk = state.topic === "all" || resource.topics.indexOf(state.topic) !== -1;
    var queryOk = true;

    if (state.query.trim() !== "") {
      var haystack = (
        resource.title +
        " " +
        resource.description +
        " " +
        resource.roles.join(" ") +
        " " +
        resource.topics.join(" ")
      ).toLowerCase();
      queryOk = haystack.indexOf(state.query.trim().toLowerCase()) !== -1;
    }

    return roleOk && topicOk && queryOk;
  }

  function tagLabel(map, key) {
    return map[key] || key;
  }

  function renderCard(resource) {
    var isSoon = resource.status === "coming-soon";
    var card = document.createElement(isSoon ? "div" : "a");

    card.className = "resource-card" + (isSoon ? " resource-card--soon" : "");

    if (!isSoon) {
      card.href = resource.url;
    } else {
      card.setAttribute("role", "group");
      card.setAttribute("aria-label", resource.title + ", coming soon");
    }

    var badge = isSoon
      ? '<span class="badge badge--soon">Coming soon</span>'
      : '<span class="badge">' + tagLabel(taxonomy.formats, resource.formats[0]) + "</span>";

    var tags = resource.topics
      .map(function (t) {
        return '<span class="tag">' + tagLabel(taxonomy.topics, t) + "</span>";
      })
      .join("");

    card.innerHTML =
      badge +
      "<h3>" + resource.title + "</h3>" +
      "<p>" + resource.description + "</p>" +
      '<div class="resource-card__tags">' + tags + "</div>" +
      '<div class="resource-card__footer">' +
      (isSoon
        ? '<span class="btn-ghost" aria-hidden="true">Not yet available</span>'
        : '<span class="btn-ghost">Open resource &rarr;</span>') +
      "</div>";

    return card;
  }

  function render() {
    var filtered = resources.filter(matches);

    grid.innerHTML = "";
    filtered.forEach(function (resource) {
      grid.appendChild(renderCard(resource));
    });

    var count = filtered.length;
    resultsMeta.textContent =
      count === 0
        ? "No resources match those filters."
        : count + " resource" + (count === 1 ? "" : "s") + " found.";

    emptyState.classList.toggle("is-visible", count === 0);

    // Keep chip pressed-states and search box in sync with current state
    document.querySelectorAll("[data-role-filter]").forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.roleFilter === state.role));
    });
    document.querySelectorAll("[data-topic-filter]").forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.topicFilter === state.topic));
    });
    if (searchInput && searchInput.value !== state.query) {
      searchInput.value = state.query;
    }
  }

  function wireChips(selector, key) {
    document.querySelectorAll(selector).forEach(function (chip) {
      chip.addEventListener("click", function () {
        state[key] = chip.dataset[key === "role" ? "roleFilter" : "topicFilter"];
        render();
      });
    });
  }

  readInitialStateFromURL();
  wireChips("[data-role-filter]", "role");
  wireChips("[data-topic-filter]", "topic");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      render();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      state = { query: "", role: "all", topic: "all" };
      render();
      searchInput && searchInput.focus();
    });
  }

  render();
})();
