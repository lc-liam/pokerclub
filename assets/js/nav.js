/* Mobile nav toggle. The nav works without this file — the links are just
   always visible on narrow screens if JavaScript is off. */
(function () {
	var nav = document.querySelector('.nav');
	if (!nav) return;

	var toggle = nav.querySelector('.nav__toggle');
	var links = nav.querySelector('.nav__links');
	if (!toggle || !links) return;

	function setOpen(open) {
		nav.dataset.open = open ? 'true' : 'false';
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	}

	setOpen(false);

	toggle.addEventListener('click', function () {
		setOpen(nav.dataset.open !== 'true');
	});

	links.addEventListener('click', function (event) {
		if (event.target.closest('a')) setOpen(false);
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') setOpen(false);
	});
})();
