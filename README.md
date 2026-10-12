# Summit Medical Transport — marketing site

Single-page marketing site for Summit Medical Transport Inc. Static HTML, CSS
and JavaScript with no build step and no dependencies.

```
index.html          One-page site: hero, services, operations, fleet,
                    client portal, about, careers, contact
privacy.html        Privacy policy
terms.html          Website terms of use
assets/css/         Single stylesheet
assets/js/          Nav, clock, scroll reveals, form feedback
assets/img/         Logo, favicons, fleet photography
PLACEHOLDERS.md     Every fake value and what to replace it with
```

## Running it locally

No tooling required — open `index.html`, or serve the folder so paths behave
exactly like production:

```sh
python3 -m http.server 4173
# http://localhost:4173
```

## Editing

**Colors and type** live in one `:root` block at the top of
`assets/css/styles.css`. The brand pair is `--summit: #2752FE` and
`--signal: #FF6300`.

**Copy** is plain HTML in `index.html`, in the order it appears on the page.
Section anchors (`#services`, `#fleet`, …) are what the nav links to, so keep
the `id` attributes if you move things.

**Fonts** are Archivo (display), IBM Plex Sans (body) and IBM Plex Mono (data),
loaded from Google Fonts.

## What is real and what isn't

The business address and job postings are placeholders, and both legal pages
still need attorney review. `PLACEHOLDERS.md` lists all of them. The contact form
and portal signup are not connected to a backend and say so when submitted.

The viability window figures in the hero are published reference ranges for cold
ischemia time, labeled as such — they are not live operational data.

## Deploying

Hosted on GitHub Pages from the `main` branch. Pushing to `main` publishes.
