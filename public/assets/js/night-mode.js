// Night Mode JS

(function (window, document, undefined) {
  // Feature test
  if (!("localStorage" in window)) return;

  // Get our newly insert toggle
  var nightMode = document.querySelector("#night-mode");
  if (!nightMode) return;

  // When clicked, toggle night mode on or off
  nightMode.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      document.documentElement.classList.toggle("night-mode");
      if (document.documentElement.classList.contains("night-mode")) {
        localStorage.setItem("gmtNightMode", true);
        return;
      }
      localStorage.removeItem("gmtNightMode");
    },
    false
  );
})(window, document);
