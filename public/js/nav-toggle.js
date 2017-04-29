document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('main-nav-toggle').addEventListener('click', function () {
		var openMenu = document.getElementById('main-nav-toggle');
		var menu = document.getElementById('main-nav-menu');

		if (openMenu.classList.contains('is-active')) {
			openMenu.classList.remove('is-active');
			menu.classList.remove('is-active');
		} else {
			openMenu.classList.add('is-active');
			menu.classList.add('is-active');
		}
	});
}, false);
