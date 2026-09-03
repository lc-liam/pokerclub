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

**Add an exec.** Put a square headshot in `assets/img/execs/` (600×600 or larger,
`firstname.jpg`). In `execs.html`, copy an `<article class="exec">` block and update the
image, name, role and bio. Delete the `<a class="exec__link">` if they have no LinkedIn.

**Add a sponsor.** Drop the logo in `assets/img/sponsors/`. In `sponsors.html`, copy an
`<article class="sponsor">` block into the right tier. No logo yet? Use the
`<span class="sponsor__wordmark">` form — see the GTS card.

**Change the colors.** Everything comes from the variables in `:root` at the top of
`assets/css/site.css`. Change `--crimson` and the whole site follows.

## Deploying

The repo is a static site, so GitHub Pages serves it as-is:

Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder: `/ (root)`.

The `.nojekyll` file is there to stop GitHub from running the files through Jekyll.

## Still to do

- [ ] Swap the placeholder mark in `assets/img/logo.svg` for the real club logo
- [ ] Fill in the exec board with real names, roles, bios and headshots
- [ ] Add a GTS logo to `assets/img/sponsors/`
- [ ] Confirm the Tartan Connect, Discord, Instagram and email links are current
