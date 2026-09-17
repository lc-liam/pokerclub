/* Hides sessions and events once their date has passed, so the schedule
   doesn't need pruning by hand every couple of weeks.

   Each entry carries data-date="YYYY-MM-DD". An entry stays up for the whole
   of its own day and disappears the day after, so a game still shows on the
   morning of the game.

   An entry with a missing or unreadable date is left visible on purpose. A
   typo should leave a stale card on the page, where someone will notice it —
   never silently hide a session that is actually happening.

   With JavaScript off, every entry shows. That is the safe failure too: a
   past date is a smaller problem than an empty schedule. */
(function () {
	var entries = document.querySelectorAll('[data-date]');
	if (!entries.length) return;

	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	function parseDate(value) {
		var parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
		if (!parts) return null;

		var year = Number(parts[1]);
		var month = Number(parts[2]) - 1;
		var day = Number(parts[3]);
		var date = new Date(year, month, day);

		// Rejects dates that don't exist — "2026-02-31" would otherwise roll
		// over into March and hide the card a few days early.
		if (date.getMonth() !== month || date.getDate() !== day) return null;

		return date;
	}

	entries.forEach(function (entry) {
		var date = parseDate(entry.getAttribute('data-date'));
		if (date && date < today) entry.hidden = true;
	});

	// When a list empties out, show its message instead of leaving a blank gap.
	document.querySelectorAll('[data-schedule-empty]').forEach(function (message) {
		var section = message.closest('section');
		if (!section) return;
		if (section.querySelectorAll('[data-date]:not([hidden])').length) return;

		message.hidden = false;
		section.querySelectorAll('[data-schedule-hide-when-empty]').forEach(function (el) {
			el.hidden = true;
		});
	});

	// "Scroll for more" is only true while the row actually scrolls.
	var row = document.querySelector('.events');
	var hint = document.querySelector('.events__hint');
	if (row && hint && !hint.hidden && row.scrollWidth <= row.clientWidth) {
		hint.hidden = true;
	}
})();
