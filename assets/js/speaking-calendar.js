(() => {
  "use strict";

  const calendar = document.querySelector(".speaking-calendar");
  if (!calendar) return;

  const list = calendar.querySelector("#speaking-events");
  const cards = Array.from(list.querySelectorAll("[data-speaking-event]"));
  const filters = Array.from(calendar.querySelectorAll("[data-speaking-filter]"));
  const count = calendar.querySelector("[data-speaking-count]");
  const empty = calendar.querySelector("[data-speaking-empty]");
  let filter = "upcoming";

  function localDay() {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
  }

  function render() {
    const today = localDay();
    const isPast = (card) => card.dataset.end < today;
    cards.sort((a, b) => {
      if (isPast(a) !== isPast(b)) return isPast(a) ? 1 : -1;
      return isPast(a)
        ? b.dataset.end.localeCompare(a.dataset.end)
        : a.dataset.start.localeCompare(b.dataset.start);
    });

    let visible = 0;
    cards.forEach((card, index) => {
      const past = isPast(card);
      const current = !past && card.dataset.start <= today;
      const status = card.querySelector("[data-speaking-status]");
      status.textContent = past ? "Past" : current ? "Happening now" : "Upcoming";
      card.dataset.status = past ? "past" : current ? "current" : "upcoming";
      status.hidden = false;
      card.hidden = filter !== "all" && (filter === "past" ? !past : past);
      if (!card.hidden) visible += 1;
      if (list.children[index] !== card) {
        list.insertBefore(card, list.children[index] || null);
      }
    });

    filters.forEach((button) => {
      const selected = button.dataset.speakingFilter === filter;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    count.textContent = `Showing ${visible} ${visible === 1 ? "event" : "events"}`;
    empty.hidden = visible !== 0;
    empty.textContent = filter === "past"
      ? "No past events are listed yet. Choose Upcoming & now to see planned appearances."
      : "No upcoming dates are listed. Choose Past events to see earlier appearances.";
    calendar.dispatchEvent(new CustomEvent("speaking-calendar:render"));
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.speakingFilter;
      render();
    });
  });

  // Use local calendar dates so single-day and multi-day appearances include their last day.
  function refreshAtMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    window.setTimeout(() => {
      render();
      refreshAtMidnight();
    }, tomorrow.getTime() - now.getTime() + 100);
  }

  window.addEventListener("pageshow", render);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) render();
  });
  render();
  calendar.querySelector("[data-speaking-filters]").hidden = false;
  refreshAtMidnight();
})();
