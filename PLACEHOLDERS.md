# Placeholders to replace

Every made-up value on the site uses a distinctive token so you can find and
replace it without hunting through markup. Nothing here is styled specially —
swapping the text is all that's needed.

## Find and replace

| Token | Appears in | Replace with |
|---|---|---|
| `(000) 000-0000` | index, privacy, terms | Dispatch number, display format |
| `+10000000000` | `tel:` links, JSON-LD | Dispatch number, E.164 format |
| `SERVICE AREA TBD` | index, privacy, terms | e.g. `Colorado's Front Range` |
| `BUSINESS ADDRESS TBD` | privacy, terms | Registered business address |
| `LIABILITY CAP TBD` | terms | Per-shipment cargo liability limit |
| `CLAIM WINDOW TBD` | terms | Days to report a claim |
| `STATE TBD` | terms | Governing state |
| `COUNTY / STATE TBD` | terms | Venue for disputes |
| `Last updated: TBD` | privacy, terms | Date you publish them |

Run all the simple ones at once from the project root:

```sh
PHONE_DISPLAY="(303) 555-0100"
PHONE_E164="+13035550100"
AREA="Colorado's Front Range"

sed -i '' \
  -e "s/(000) 000-0000/$PHONE_DISPLAY/g" \
  -e "s/+10000000000/$PHONE_E164/g" \
  -e "s/SERVICE AREA TBD/$AREA/g" \
  index.html privacy.html terms.html
```

## Email addresses

These are assumed, not confirmed. Create them or change them:

- `dispatch@summitmedicaltransport.org` — JSON-LD only
- `info@summitmedicaltransport.org` — contact section, footer, terms
- `careers@summitmedicaltransport.org` — every Apply button
- `billing@summitmedicaltransport.org` — contact section
- `privacy@summitmedicaltransport.org` — privacy policy

## Things that need wiring, not just editing

**Contact form** (`index.html`, `<form id="contact-form">`) does not send anywhere.
Set `action` to your handler and delete the `data-demo` attribute:

```html
<form class="cform" id="contact-form" method="post" action="https://formspree.io/f/XXXX" novalidate>
```

Until then it shows "Form not connected yet" instead of submitting.

**Portal notify form** (`<form id="portal-form">`) has no endpoint either. It
currently just confirms locally. Point it at whatever collects the list.

**Job postings** in the Careers section are written from your description of the
business, not from real openings. Confirm titles, shift patterns and
requirements before publishing, or cut the section to just the general
application.

## Legal pages

`privacy.html` and `terms.html` are drafts written to match the site, and both
carry a visible "not yet reviewed by counsel" banner. Delete that banner
(`<p class="legal__note">…</p>`) once an attorney has signed off. The liability
limits in the terms are placeholders — those numbers carry real exposure and
should not go live as-is.

## Media

- `assets/img/fleet-hero.jpg` — hero background, cropped from your Suburban photo
- `assets/img/fleet-01.jpg` — fleet section
- `assets/img/og-card.jpg` — link preview card for texts, Slack, social
- Originals derive from `4ECE8437-954E-40AF-8B39-5D85E12D1860.jpg`

The vehicle's license plate is legible in all three crops. That's normal for
company vehicle photos, but if you'd rather not publish it, reshoot or blur it.

To swap the hero for video later, `index.html` has a commented `<video>` block
right above the `<img class="hero__media">` tag.
