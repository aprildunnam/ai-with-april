(function () {
  "use strict";

  var key = "ai-with-april-theme";
  var preference = "system";
  var system = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    var saved = window.localStorage.getItem(key);
    if (saved === "light" || saved === "dark") preference = saved;
  } catch (error) {
    console.warn("Theme preference could not be read. Using your system theme.", error);
  }

  function apply() {
    document.documentElement.dataset.theme = preference === "system"
      ? (system.matches ? "dark" : "light")
      : preference;
  }

  apply();
  system.addEventListener("change", apply);
  window.addEventListener("storage", function (event) {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system";
    apply();
    var control = document.querySelector("[data-theme-control]");
    if (control) control.value = preference;
  });

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header__inner");
    if (!header) return;
    var label = document.createElement("label");
    label.className = "theme-control";
    var text = document.createElement("span");
    text.className = "visually-hidden";
    text.textContent = "Color theme";
    label.appendChild(text);
    var control = document.createElement("select");
    control.setAttribute("data-theme-control", "");
    [["system", "Auto"], ["light", "Light"], ["dark", "Dark"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      control.appendChild(option);
    });
    control.value = preference;
    label.appendChild(control);
    header.appendChild(label);

    var status = document.createElement("span");
    status.className = "visually-hidden";
    status.setAttribute("role", "status");
    header.appendChild(status);
    control.addEventListener("change", function () {
      preference = control.value;
      apply();
      try {
        window.localStorage.setItem(key, preference);
        status.textContent = "Theme set to " + (preference === "system" ? "follow your device" : preference) + ".";
      } catch (error) {
        console.warn("Theme changed, but your preference could not be saved.", error);
        status.textContent = "Theme changed for this page. Your browser could not save the preference.";
      }
    });
  });
})();
