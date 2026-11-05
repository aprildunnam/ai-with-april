/**
 * Session discovery: q, topic, and event are shareable URL parameters.
 */
(function () {
  "use strict";

  var toolbar = document.querySelector("[data-session-toolbar]");
  var search = document.querySelector("[data-session-search]");
  var eventFilter = document.querySelector("[data-session-event-filter]");
  var results = document.querySelector("[data-session-results]");
  var empty = document.querySelector("[data-session-empty]");
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-session-card]"));
  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-session-filter]"));
  var resets = Array.prototype.slice.call(document.querySelectorAll("[data-session-reset]"));
  var activeTopic = "all";

  if (!toolbar || !search || !eventFilter || !results || !empty || !cards.length) {
    return;
  }

  function normalize(value) {
    return value.toLowerCase().replace(/[\u2018\u2019]/g, "'");
  }

  function topicButton(topic) {
    return filters.find(function (button) {
      return button.getAttribute("data-session-filter") === topic;
    });
  }

  function readUrl() {
    var parameters = new URL(window.location.href).searchParams;
    search.value = parameters.get("q") || "";
    var topic = parameters.get("topic") || "all";
    activeTopic = topicButton(topic) ? topic : "all";
    var event = parameters.get("event") || "all";
    var validEvent = Array.prototype.some.call(eventFilter.options, function (option) {
      return option.value === event;
    });
    eventFilter.value = validEvent ? event : "all";
  }

  function writeUrl() {
    var url = new URL(window.location.href);
    var values = { q: search.value.trim(), topic: activeTopic, event: eventFilter.value };
    Object.keys(values).forEach(function (key) {
      if (!values[key] || (key !== "q" && values[key] === "all")) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, values[key]);
      }
    });
    if (url.href !== window.location.href) {
      try {
        window.history.replaceState(window.history.state, "", url.href);
      } catch (error) {
        console.warn("Sessions filtered, but the shareable URL could not be updated.", error);
        results.textContent += " Your browser could not update the shareable URL.";
      }
    }
  }

  function render(syncUrl, cleared) {
    var query = normalize(search.value.trim());
    var tokens = query ? query.split(/\s+/) : [];
    var visible = 0;

    filters.forEach(function (button) {
      var selected = button.getAttribute("data-session-filter") === activeTopic;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    cards.forEach(function (card) {
      var topics = (card.getAttribute("data-session-topics") || "").split(/\s+/);
      var text = normalize([
        card.getAttribute("data-session-search-text") || "",
        topics.join(" ").replace(/-/g, " "),
        card.textContent
      ].join(" "));
      var matches = (activeTopic === "all" || topics.indexOf(activeTopic) !== -1) &&
        (eventFilter.value === "all" || card.getAttribute("data-session-event") === eventFilter.value) &&
        tokens.every(function (token) { return text.indexOf(token) !== -1; });
      card.hidden = !matches;
      if (matches) {
        visible += 1;
      }
    });

    var summary = "Showing " + visible + " of " + cards.length + " sessions.";
    if (query) {
      summary += ' Search: "' + search.value.trim() + '".';
    }
    if (activeTopic !== "all") {
      summary += " Topic: " + topicButton(activeTopic).textContent.trim() + ".";
    }
    if (eventFilter.value !== "all") {
      summary += " Event: " + eventFilter.options[eventFilter.selectedIndex].textContent + ".";
    }
    results.textContent = (cleared ? "Filters cleared. " : "") + summary;
    empty.hidden = visible !== 0;
    if (syncUrl) {
      writeUrl();
    }
  }

  toolbar.addEventListener("submit", function (event) {
    event.preventDefault();
    render(true);
  });
  search.addEventListener("input", function () { render(true); });
  eventFilter.addEventListener("change", function () { render(true); });
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeTopic = button.getAttribute("data-session-filter");
      render(true);
    });
  });
  resets.forEach(function (button) {
    button.addEventListener("click", function () {
      search.value = "";
      activeTopic = "all";
      eventFilter.value = "all";
      render(true, true);
      search.focus();
    });
  });
  window.addEventListener("popstate", function () {
    readUrl();
    render(false);
  });

  readUrl();
  render(true);
  toolbar.hidden = false;
})();
