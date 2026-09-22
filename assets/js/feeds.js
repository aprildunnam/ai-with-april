/**
 * AI with April — "Fresh from April" feed rendering.
 *
 * Renders the static JSON written by scripts/fetch-feeds.mjs (synced daily
 * by .github/workflows/fetch-feeds.yml) into any [data-feed] container on
 * the page. No backend, no client-side API keys — this just fetches
 * same-origin JSON files that already exist on the deployed site.
 *
 * Usage: <div data-feed="videos" data-feed-limit="3"></div>
 *        <div data-feed="posts"></div>
 *        <p data-feed-updated="videos"></p>  (optional "last synced" note)
 */
(function () {
  "use strict";

  var CONFIG = {
    videos: {
      url: "assets/data/youtube-videos.json",
      empty: "New videos will appear here once the daily sync runs.",
      error: 'The video feed could not be loaded. <a href="https://www.youtube.com/@AprilDunnam">Visit April on YouTube</a>.',
      render: renderVideoCard
    },
    posts: {
      url: "assets/data/blog-posts.json",
      empty: "New posts will appear here once the daily sync runs.",
      error: 'The blog feed could not be loaded. <a href="https://aprildunnam.com/blog/">Read the blog on aprildunnam.com</a>.',
      render: renderPostCard
    }
  };

  var dateFormatter =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" })
      : null;

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return dateFormatter ? dateFormatter.format(d) : d.toDateString();
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function renderVideoCard(video) {
    var card = document.createElement("a");
    card.className = "update-card";
    card.href = video.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML =
      '<span class="update-card__media">' +
      '<img src="' + escapeHtml(video.thumbnail) + '" alt="" width="480" height="360" loading="lazy">' +
      "</span>" +
      '<span class="update-card__body">' +
      "<h3>" + escapeHtml(video.title) + "</h3>" +
      '<span class="update-card__meta">' +
      (formatDate(video.date) ? escapeHtml(formatDate(video.date)) + " &middot; " : "") +
      "Watch on YouTube" +
      '<span class="visually-hidden"> (opens in a new tab)</span>' +
      "</span>" +
      "</span>";

    return card;
  }

  function renderPostCard(post) {
    var card = document.createElement("a");
    card.className = "update-card update-card--post";
    card.href = post.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    var tags = (post.categories || [])
      .slice(0, 3)
      .map(function (c) {
        return '<span class="tag">' + escapeHtml(c) + "</span>";
      })
      .join("");

    card.innerHTML =
      '<span class="update-card__body">' +
      "<h3>" + escapeHtml(post.title) + "</h3>" +
      "<p>" + escapeHtml(post.excerpt) + "</p>" +
      (tags ? '<span class="update-card__tags">' + tags + "</span>" : "") +
      '<span class="update-card__meta">' +
      (formatDate(post.date) ? escapeHtml(formatDate(post.date)) + " &middot; " : "") +
      "Read on the blog" +
      '<span class="visually-hidden"> (opens in a new tab)</span>' +
      "</span>" +
      "</span>";

    return card;
  }

  function setUpdatedNote(kind, generatedAt) {
    var notes = document.querySelectorAll('[data-feed-updated="' + kind + '"]');
    if (!notes.length || !generatedAt) return;
    var formatted = formatDate(generatedAt);
    var generatedDate = new Date(generatedAt);
    var age = Date.now() - generatedDate.getTime();
    var isStale = !isNaN(age) && age > 3 * 24 * 60 * 60 * 1000;
    notes.forEach(function (el) {
      el.textContent = formatted
        ? "Last synced " + formatted + "." + (isStale ? " This feed may be out of date." : "")
        : "";
      el.classList.toggle("is-stale", isStale);
    });
  }

  function loadFeed(kind) {
    var containers = document.querySelectorAll('[data-feed="' + kind + '"]');
    if (!containers.length) return;
    var settings = CONFIG[kind];
    containers.forEach(function (container) {
      container.setAttribute("aria-busy", "true");
    });

    fetch(settings.url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var items = (data && data.items) || [];
        setUpdatedNote(kind, data && data.generatedAt);

        containers.forEach(function (container) {
          var limit = parseInt(container.getAttribute("data-feed-limit"), 10);
          var toRender = limit > 0 ? items.slice(0, limit) : items;

          container.innerHTML = "";
          if (!toRender.length) {
            var empty = document.createElement("p");
            empty.className = "update-empty";
            empty.textContent = settings.empty;
            container.appendChild(empty);
            return;
          }
          toRender.forEach(function (item) {
            container.appendChild(settings.render(item));
          });
          container.setAttribute("aria-busy", "false");
        });
      })
      .catch(function () {
        containers.forEach(function (container) {
          container.innerHTML = '<p class="update-empty">' + settings.error + "</p>";
          container.setAttribute("aria-busy", "false");
        });
      });
  }

  loadFeed("videos");
  loadFeed("posts");
})();
