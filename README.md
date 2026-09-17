# CMU Poker Club

The club website. Plain HTML and CSS — no build step, no dependencies, nothing to install.

## Working on it

Open `index.html` in a browser. That's it.

If you want links to behave exactly as they will in production, serve the folder instead:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Layout

```
index.html          Home
about.html          About the club
execs.html          Exec board
sponsors.html       Sponsors, by tier
assets/css/site.css All styling. Colors are CSS variables at the top.
assets/js/nav.js    Mobile menu toggle. Nothing else uses JavaScript.
assets/img/         Logo, headshots, sponsor logos
```

The nav and footer are copied into all four pages. If you change one, change all four —
search for `<header class="nav">` and `<footer class="footer">`.

## Common edits

**Update the schedule.** The `<div class="events">` row near the top of `index.html`
holds one `<article class="event">` per session, in date order. Weekends with no game
are simply left out.

Each card carries `data-date="YYYY-MM-DD"`, and `assets/js/schedule.js` hides it the
day after — a session stays up for the whole of its own day, then drops off on its
own. The same applies to `<article class="tournament">` on `events.html`. When
everything has expired the row is replaced by a "nothing on the schedule" line, so
the page never just goes blank.

Two things to know about it. The date is stored twice — in the attribute and in the
text people read — so keep them matching; the attribute is what decides when the card
disappears. And a date the script can't read (`09/01/2026`, `Sept 1`, a typo'd year)
leaves the card **visible**, on purpose: a stale card gets noticed and fixed, whereas
a silently hidden session does not. Add sessions for the whole semester up front and
the row looks after itself.

**Post a tournament.** `events.html` holds the big one-off events, as opposed to the
weekly sessions on the home page. It ships showing "No upcoming events" — delete that
`<p class="empty">` and uncomment the `<article class="tournament">` template below it,
one per event. Put the empty paragraph back when the list runs out.

The sign-up button is an ordinary link: point it at a Google Form, a Tartan Connect
event, or wherever you're taking registrations. The site is static and cannot collect
sign-ups itself. Delete the whole `btn-row` while sign-ups aren't open yet — a button
that goes nowhere is worse than no button.

**Add an exec.** Put a square headshot in `assets/img/execs/` (600×600 or larger,
`firstname-lastname.jpg`). In `execs.html`, copy an `<article class="exec">` block and
update the image and name. `exec__role` and `exec__bio` are both optional.

**Add a sponsor.** Drop the logo in `assets/img/sponsors/`. In `sponsors.html`, copy an
`<article class="sponsor">` block into the right tier. No logo yet? Use the
`<span class="sponsor__wordmark">` form. Pick a dark-on-light logo variant — the cards
and the home-page tiles are both white.

**Change the contact address.** It appears in the `data-to` attribute on the
`<dialog class="contact">` in `about.html` and `sponsors.html`, and in the plain
`mailto:` links in each page's footer.

**Change the colors.** Everything comes from the variables in `:root` at the top of
`assets/css/site.css`. Change `--crimson` and the whole site follows.

## Deploying

The repo is a static site, so GitHub Pages serves it as-is:

Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder: `/ (root)`.

The `.nojekyll` file is there to stop GitHub from running the files through Jekyll.

## About the logo

`assets/img/logo.svg` is the club's card-stack mark sitting on a white roundel.
The plate is not decoration: the mark's card faces are transparent and its
outlines are black, so on its own it disappears against the dark nav, hero and
footer. If you ever get a reversed (white) version of the mark, it can go in
directly and the roundel can come out.

## Still to do

- [ ] Full names for five execs — the cards currently read `Grubor`, `Guha`,
      `Sam`, `Steve` and `Zane`, taken from the photo filenames
- [ ] Roles and bios for everyone below Jeffery and Liam
- [ ] Better-framed photos for the six execs whose headshots are wide shots
- [ ] A stacked, dark-on-light HRT lockup and a compact Susquehanna mark — both
      currently render short next to the squarer sponsor logos
- [ ] Turn on GitHub Pages (Settings → Pages → `main` → `/ (root)`)
