/* Contact dialog.

   The site is static — there is no server here to send mail from — so this
   form does not deliver anything by itself. It collects the message and hands
   it to the visitor's own email app with the fields already filled in; they
   still press send there.

   Anything marked data-contact opens it. If <dialog> isn't supported or
   JavaScript is off, those elements stay ordinary mailto: links and still
   work, just without the form. */
(function () {
	var dialog = document.querySelector('.contact');
	if (!dialog || typeof dialog.showModal !== 'function') return;

	var form = dialog.querySelector('form');
	var to = dialog.dataset.to;
	if (!form || !to) return;

	document.querySelectorAll('[data-contact]').forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			dialog.showModal();
			var first = form.querySelector('input, textarea');
			if (first) first.focus();
		});
	});

	dialog.querySelectorAll('[data-contact-close]').forEach(function (button) {
		button.addEventListener('click', function () {
			dialog.close();
		});
	});

	// Clicking the backdrop — that is, the dialog element itself rather than
	// anything inside it — closes the form. Escape is handled by <dialog>.
	dialog.addEventListener('click', function (event) {
		if (event.target === dialog) dialog.close();
	});

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		var data = new FormData(form);
		var body =
			data.get('message') +
			'\n\n— ' +
			data.get('name') +
			'\n' +
			data.get('email');

		window.location.href =
			'mailto:' +
			to +
			'?subject=' +
			encodeURIComponent(data.get('subject')) +
			'&body=' +
			encodeURIComponent(body);

		dialog.close();
		form.reset();
	});
})();
