(function () {
  "use strict";

  var form = document.getElementById("training-form");
  if (!form) return;

  var fields = document.getElementById("training-fields");
  var button = document.getElementById("training-submit");
  var status = document.getElementById("training-status");
  var errorBox = document.getElementById("training-error");
  var errorMessage = document.getElementById("training-error-message");
  var success = document.getElementById("training-success");
  var pending = false;

  function showError(message) {
    errorMessage.textContent = message;
    errorBox.hidden = false;
    errorBox.focus();
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;

    var data = new FormData(form);
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 20000);
    pending = true;
    errorBox.hidden = true;
    fields.disabled = true;
    button.disabled = true;
    button.textContent = "Sending...";
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your training inquiry.";

    try {
      var response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" },
        signal: controller.signal
      });

      if (!response.ok) {
        var message = response.status === 429
          ? "Too many submission attempts. Please wait a few minutes before trying again."
          : "The form service couldn't accept your inquiry. Please try again.";
        if ((response.headers.get("content-type") || "").includes("application/json")) {
          var result = await response.json();
          if (Array.isArray(result.errors)) {
            var messages = result.errors.filter(function (error) {
              return error && typeof error.message === "string";
            }).map(function (error) { return error.message; });
            if (messages.length && response.status !== 429) message = messages.join(" ");
          }
        }
        console.warn("Training inquiry was not accepted. HTTP status:", response.status);
        showError(message);
        return;
      }

      form.reset();
      form.hidden = true;
      success.hidden = false;
      document.getElementById("training-success-title").focus();
    } catch (error) {
      console.warn("Training inquiry submission could not be confirmed.", error);
      showError(error.name === "AbortError"
        ? "Sending took too long, and we couldn't confirm your submission. Please try again."
        : "We couldn't confirm your submission. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeout);
      pending = false;
      fields.disabled = false;
      button.disabled = false;
      button.textContent = "Send training inquiry";
      form.setAttribute("aria-busy", "false");
      status.textContent = "";
    }
  });

  document.getElementById("training-again").addEventListener("click", function () {
    success.hidden = true;
    errorBox.hidden = true;
    form.hidden = false;
    document.getElementById("training-name").focus();
  });
})();
