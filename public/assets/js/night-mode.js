// Night Mode JS
(function (window, document, undefined) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
>>>>>>> dev
  if (!("localStorage" in window)) return;
  var nightMode = localStorage.getItem("gmtNightMode");
  if (nightMode) {
    document.documentElement.className += " night-mode";
  }
<<<<<<< HEAD
=======
<<<<<<< HEAD
})(window, document);

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
=======
	'use strict';
	if (!('localStorage' in window)) return;
	var nightMode = localStorage.getItem('gmtNightMode');
	if (nightMode) {
		document.documentElement.className += ' night-mode';
	}
=======
>>>>>>> main
>>>>>>> dev
})(window, document);

(function (window, document, undefined) {
  // Feature test
  if (!("localStorage" in window)) return;

  // Get our newly insert toggle
  var nightMode = document.querySelector("#night-mode");
  if (!nightMode) return;

<<<<<<< HEAD
=======
<<<<<<< HEAD
	// Feature test
	if (!('localStorage' in window)) return;

	// Get our newly insert toggle
	var nightMode = document.querySelector('#night-mode');
	if (!nightMode) return;

	// When clicked, toggle night mode on or off
	nightMode.addEventListener('click', function (event) {
		event.preventDefault();
		document.documentElement.classList.toggle('night-mode');
		if (document.documentElement.classList.contains('night-mode')) {
			localStorage.setItem('gmtNightMode', true);
			return;
		}
		localStorage.removeItem('gmtNightMode');
	}, false);

})(window, document);
>>>>>>> main
=======
>>>>>>> dev
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
<<<<<<< HEAD
=======
>>>>>>> main
>>>>>>> dev
