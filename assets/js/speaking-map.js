(() => {
  "use strict";

  const calendar = document.querySelector(".speaking-calendar");
  const panel = calendar?.querySelector("[data-speaking-map]");
  if (!panel) return;

  const outlineURL = new URL("../img/speaking-map-land.svg", document.currentScript.src);
  const status = calendar.querySelector("[data-speaking-map-status]");
  const svg = panel.querySelector("[data-speaking-map-svg]");
  const pins = panel.querySelector("[data-speaking-map-pins]");
  const cities = panel.querySelector("[data-speaking-map-cities]");
  const details = panel.querySelector("[data-speaking-map-details]");
  const count = panel.querySelector("[data-speaking-map-count]");
  const region = panel.querySelector("[data-speaking-map-region]");
  const namespace = "http://www.w3.org/2000/svg";
  const views = {
    all: "100 45 540 240",
    "north-america": "125 80 230 175",
    europe: "455 65 110 100"
  };
  const labels = { past: "Past", current: "Now", upcoming: "Upcoming" };
  const locations = new Map();
  const buttons = new Map();
  let visibleLocations = [];
  let selected = null;
  let detailsSignature = "";

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function shape(tag, attributes) {
    const node = document.createElementNS(namespace, tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    return node;
  }

  function locationStatus(location) {
    if (location.events.some((card) => card.dataset.status === "current")) return "current";
    return location.events.some((card) => card.dataset.status === "upcoming") ? "upcoming" : "past";
  }

  function project(location) {
    return new DOMPoint((location.lon + 180) * 1000 / 360, (90 - location.lat) * 500 / 180);
  }

  function selectLocation(key, focusButton = false) {
    selected = key;
    if (focusButton) buttons.get(key).focus({ preventScroll: true });
    updateSelection();
  }

  function updateSelection() {
    buttons.forEach((button, key) => {
      button.setAttribute("aria-pressed", String(key === selected));
      button.classList.toggle("is-active", key === selected);
    });
    Array.from(pins.children).forEach((pin) => {
      pin.classList.toggle("is-active", pin.dataset.cityKey === selected);
      if (pin.dataset.cityKey === selected) pins.append(pin);
    });

    const location = visibleLocations.find((item) => item.key === selected);
    const signature = JSON.stringify([selected, location?.events.map((card) => [card.id, card.dataset.status])]);
    if (signature === detailsSignature) return;
    detailsSignature = signature;
    const focusedLink = details.contains(document.activeElement)
      ? document.activeElement.getAttribute("href") : null;
    details.replaceChildren();

    if (!location) {
      details.append(
        element("h4", "No stops in this view"),
        element("p", "Try another map view or date filter. Online appearances stay in the list below.")
      );
      if (focusedLink) region.focus({ preventScroll: true });
      return;
    }

    details.append(element("h4", location.city), element("p", location.country));
    const list = element("ul");
    location.events.forEach((card) => {
      const item = element("li");
      const link = element("a", card.querySelector("h3").textContent);
      link.href = `#${card.id}`;
      const date = card.querySelector(".speaking-event__date").textContent.trim();
      const eventStatus = card.querySelector("[data-speaking-status]").textContent;
      item.append(link, element("p", `${date} \u00b7 ${eventStatus}`));
      list.append(item);
    });
    details.append(list);
    if (focusedLink) {
      const replacement = Array.from(details.querySelectorAll("a"))
        .find((link) => link.getAttribute("href") === focusedLink);
      (replacement || buttons.get(selected)).focus({ preventScroll: true });
    }
  }

  function drawPins() {
    const bounds = svg.getBoundingClientRect();
    const box = svg.viewBox.baseVal;
    const scale = Math.min(bounds.width / box.width, bounds.height / box.height);
    if (!scale) return;
    pins.replaceChildren();
    [...visibleLocations].sort((a, b) => Number(a.key === selected) - Number(b.key === selected)).forEach((location) => {
      const { x, y } = project(location);
      const pin = shape("g", { transform: `translate(${x} ${y})` });
      pin.classList.add("speaking-map__pin");
      pin.dataset.cityKey = location.key;
      pin.dataset.status = locationStatus(location);
      pin.classList.toggle("is-active", location.key === selected);
      const title = shape("title", {});
      title.textContent = `${location.city}: ${location.events.length} ${location.events.length === 1 ? "event" : "events"}`;
      const label = shape("text", {
        y: -20 / scale, "text-anchor": "middle", "font-size": 12 / scale,
        "stroke-width": 3 / scale, class: "speaking-map__label"
      });
      label.textContent = location.city;
      pin.append(
        title,
        shape("circle", { r: 13 / scale, class: "speaking-map__ring" }),
        shape("circle", { r: 6 / scale, class: "speaking-map__dot" }),
        label
      );
      pins.append(pin);
    });
  }

  function selectPin(event) {
    const matrix = svg.getScreenCTM();
    let closest = null;
    let distance = 22;
    visibleLocations.forEach((location) => {
      const point = project(location).matrixTransform(matrix);
      const delta = Math.hypot(point.x - event.clientX, point.y - event.clientY);
      if (delta < distance) {
        closest = location;
        distance = delta;
      }
    });
    // Choose the nearest point, not overlapping hit areas, on small overview maps.
    if (closest) selectLocation(closest.key, true);
  }

  function render() {
    locations.forEach((location) => { location.events = []; });
    calendar.querySelectorAll("[data-speaking-event][data-city]").forEach((card) => {
      if (!card.hidden) locations.get(`${card.dataset.city}|${card.dataset.country}`).events.push(card);
    });
    visibleLocations = Array.from(locations.values()).filter((location) =>
      location.events.length && (region.value === "all" || location.region === region.value)
    );
    if (!visibleLocations.some((location) => location.key === selected)) {
      selected = visibleLocations.find((location) => locationStatus(location) === "current")?.key
        || visibleLocations[0]?.key || null;
    }
    const focusedCity = document.activeElement.dataset.cityKey;
    locations.forEach((location, key) => {
      const button = buttons.get(key);
      button.hidden = !visibleLocations.includes(location);
      const total = location.events.length;
      const label = `${total} ${total === 1 ? "event" : "events"}`;
      button.querySelector("small").textContent = `${label} \u00b7 ${labels[locationStatus(location)]}`;
      button.dataset.status = locationStatus(location);
      button.setAttribute("aria-label", `${location.city}, ${location.country}: ${label}`);
    });
    const events = visibleLocations.reduce((total, location) => total + location.events.length, 0);
    count.textContent = `${events} in-person ${events === 1 ? "event" : "events"} in ${visibleLocations.length} ${visibleLocations.length === 1 ? "city" : "cities"}`;
    svg.setAttribute("viewBox", views[region.value]);
    drawPins();
    updateSelection();
    if (focusedCity && buttons.get(focusedCity)?.hidden) {
      (buttons.get(selected) || region).focus({ preventScroll: true });
    }
  }

  async function initialize() {
    status.textContent = "Loading event map...";
    status.hidden = false;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    let markup;
    try {
      const response = await fetch(outlineURL, { signal: controller.signal });
      if (!response.ok) throw new Error(`Map outline request failed (${response.status}).`);
      markup = await response.text();
    } finally {
      window.clearTimeout(timeout);
    }
    const outline = new DOMParser().parseFromString(markup, "image/svg+xml");
    const land = outline.querySelector("svg > path");
    if (outline.querySelector("parsererror") || !land?.getAttribute("d")) {
      throw new Error("The map outline is not a valid SVG land path.");
    }
    panel.querySelector("[data-speaking-map-land]")
      .append(shape("path", { d: land.getAttribute("d"), "fill-rule": "evenodd" }));

    calendar.querySelectorAll("[data-speaking-event][data-city]").forEach((card) => {
      const { city, country, region: area, lat, lon } = card.dataset;
      if (!card.id || !city || !country || !["north-america", "europe"].includes(area) || !lat?.trim() || !lon?.trim() ||
          !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon)) ||
          Math.abs(Number(lat)) > 90 || Math.abs(Number(lon)) > 180) {
        throw new Error(`Invalid speaking location for ${card.id || "an event"}.`);
      }
      const key = `${city}|${country}`;
      const existing = locations.get(key);
      if (existing && (existing.lat !== Number(lat) || existing.lon !== Number(lon) || existing.region !== area)) {
        throw new Error(`Conflicting speaking coordinates for ${city}.`);
      }
      if (!existing) locations.set(key, { key, city, country, region: area, lat: Number(lat), lon: Number(lon), events: [] });
    });
    Array.from(locations.values()).sort((a, b) => a.city.localeCompare(b.city)).forEach((location) => {
      const button = element("button", null, "speaking-map__city");
      button.type = "button";
      button.dataset.cityKey = location.key;
      button.setAttribute("aria-controls", "speaking-map-details");
      button.append(element("span", location.city), element("small"));
      button.addEventListener("click", () => selectLocation(location.key));
      cities.append(button);
      buttons.set(location.key, button);
    });
    panel.hidden = false;
    render();
    status.hidden = true;
    calendar.addEventListener("speaking-calendar:render", render);
    region.addEventListener("change", render);
    svg.addEventListener("click", selectPin);
    new ResizeObserver(drawPins).observe(svg);
  }

  initialize().catch((error) => {
    console.error("Speaking map could not load.", error);
    panel.hidden = true;
    status.textContent = "The map couldn't load. Speaking dates and event links are still available below.";
    status.hidden = false;
  });
})();
