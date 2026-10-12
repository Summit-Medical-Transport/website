# Placeholders to replace

Every made-up value on the site uses a distinctive token so you can find and
replace it without hunting through markup. Nothing here is styled specially —
swapping the text is all that's needed.

## Already filled in

- **Dispatch number** — `(970) 919-0110` / `tel:+19709190110`
- **Service area** — `Denver, CO`

## Still to find and replace

| Token | Appears in | Replace with |
|---|---|---|
| `BUSINESS ADDRESS TBD` | privacy (contact), terms (preamble and contact) | Registered business address. The terms used to show 131 Continental Drive, Suite 305, Newark, DE 19713 (a Delaware registered-agent address), which conflicts with the Colorado governing-law and Denver venue clauses. Use the real Colorado business address, or confirm with counsel which address belongs here |

Already resolved in the legal pages: "Last updated" / "Last modified" dates are set to
2026-10-12. The terms no longer contain `LIABILITY CAP TBD`, `CLAIM WINDOW TBD`,
`STATE TBD` or `COUNTY / STATE TBD`. Governing law is Colorado and the venue is the
City and County of Denver. Counsel should confirm both.

Change the dates whenever the text of a legal page changes.

If the dispatch number changes, note that it appears in four formats:

```sh
grep -rn "919-0110\|9709190110" --include="*.html" .
```

`(970) 919-0110` for display, `+19709190110` in `tel:` links, and
`+1-970-919-0110` in the JSON-LD block at the top of `index.html`.

## Email addresses

These are assumed, not confirmed. Create them or change them:

- `dispatch@summitmedicaltransport.org` — JSON-LD only
- `info@summitmedicaltransport.org` — contact section, footer, terms
- `careers@summitmedicaltransport.org` — every Apply button
- `billing@summitmedicaltransport.org` — contact section
- `privacy@summitmedicaltransport.org` — privacy policy
- `support@summitmedicaltransport.org` — terms (SMS help, disputes, arbitration opt-out)
- `contact@summitmedicaltransport.org` — terms contact block

Consider using fewer addresses (for example, `info@` instead of both `contact@` and
`support@`).

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

`privacy.html` describes what the website and the Summit web and mobile apps
actually do as of its "Last updated" date. That covers the data collected, the
vendors (AWS, Vercel, Expo, Google Maps Platform, Google Fonts, GitHub, the app
stores), and the retention and security in place today. Keep it in step with the
product. In particular, update it when:

- automated text or email trip alerts ship. They are described as not yet sent, and
  the SMS section of the terms only applies once they do;
- a retention schedule is adopted;
- business associate agreements, encryption at rest, MFA or idle sign-out are in
  place. The policy deliberately does not claim these yet;
- persisted GPS tracks ship (CRM-111). The policy says live location is not stored;
- analytics, a contact form, or any other third-party script is added to the site.

`privacy.html` carries a "not yet reviewed by counsel" note (`<p class="legal__note">`
at the top of the body). Delete it once an attorney has signed off. `terms.html` has
no such banner but also needs that review. Its SMS section describes a service that
doesn't exist yet. The old `privacy.txt` draft was removed: GitHub Pages served it as
plain text and it promised safeguards that weren't in place.

## Media

- `assets/img/fleet-hero.jpg` — hero background, cropped from your Suburban photo
- `assets/img/fleet-01.jpg` — fleet section
- `assets/img/og-card.jpg` — link preview card for texts, Slack, social
- Originals derive from `4ECE8437-954E-40AF-8B39-5D85E12D1860.jpg`

The vehicle's license plate is legible in all three crops. That's normal for
company vehicle photos, but if you'd rather not publish it, reshoot or blur it.

To swap the hero for video later, `index.html` has a commented `<video>` block
right above the `<img class="hero__media">` tag.
