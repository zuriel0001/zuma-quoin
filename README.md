# Zumo Quoin Limited website

The marketing website for **Zumo Quoin Limited**, a poultry feed mill producing feeds for chicks, pullets, layers, broilers and breeders.

It is a fast, dependency-free static site: plain HTML, one stylesheet and one small script. There is no build step, so any page can be edited directly and the folder can be hosted anywhere.

## Folder layout

Each page lives in its own folder as `index.html`, which gives clean web addresses such as `/products/` and `/tips/brooding-chicks/`. The home page, `index.html`, stays at the top level.

```
index.html                 Home: hero, feed range, why choose us, process, feed planner, who we serve, tips
404.html                   Not-found page
favicon.svg
robots.txt
sitemap.xml
about/index.html           About us: story, key figures, mission and vision, values, facility, leadership
products/index.html        Our feeds: filterable range, typical analysis, spec sheet downloads, feeding programmes
quality/index.html         Process & quality: seven-step process, quality controls, certifications, FAQ
tips/index.html            Farmer tips: index of guides
tips/<article>/index.html  Six articles: storing-feed, brooding-chicks, strong-eggshells,
                           changing-feeds, hot-weather, reducing-feed-waste
where-to-buy/index.html    Where to buy: stockist finder by town and region
contact/index.html         Contact: enquiry form, contact details, opening hours, map slot
assets/css/                styles.css (site) and spec-sheet.css (PDF sheets)
assets/js/                 main.js
assets/images/             Logo, illustrations, social sharing image, app icon
assets/site.webmanifest
downloads/spec-sheets/     One A4 PDF per feed, plus the HTML page each is printed from
docs/PLACEHOLDERS.md       Checklist of details to fill in before launch
```

Fonts load from Google Fonts, so there is no fonts folder. `README.md` and `.nojekyll` stay at the top level because GitHub needs them there.

All links between pages are relative, so the site works both at `zuriel0001.github.io/zumo-quoin/` and on your own domain.

## Before launch: fill in the placeholders

Anything the company still needs to confirm (address, phone, capacity, product specifications and so on) is wrapped in `<span class="ph">…</span>` and shows on the page with a striped gold highlight, so nothing unconfirmed passes as fact. See **[docs/PLACEHOLDERS.md](docs/PLACEHOLDERS.md)** for the full checklist.

## Preview locally

Serve the folder with any local web server, so the folder links (`about/`, `products/` and so on) open their `index.html` just as they will online:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. The site appears at `https://zuriel0001.github.io/zumo-quoin/` within a minute or two. To use your own domain, add it in the same settings page.

Any static host (Netlify, Cloudflare Pages, a cPanel host) also works: upload the whole folder as is.

## Switch on the enquiry form

The form posts to [Formspree](https://formspree.io) (free tier available), so no server is needed.

1. Create a Formspree form that delivers to the sales inbox.
2. In `contact/index.html`, replace `YOUR_FORM_ID` in the form's `action` with your form ID.
3. Optionally set `data-fallback-email` on the form to the sales email address.

Until step 2 is done, submitting the form does not pretend to send anything. It tells the visitor that online enquiries aren't switched on yet and offers a pre-written email instead.

## Switch on the WhatsApp button

Every page has a floating "Chat on WhatsApp" button (an icon on phones). Open `assets/js/main.js` and set `WHATSAPP_NUMBER` near the top to the business WhatsApp number in international format, digits only, for example `"233201234567"`. Until it is set, the button opens the contact page instead.

## Update a spec sheet

Each PDF in `downloads/spec-sheets/` is printed from the HTML page of the same name.

1. Edit the figures in `downloads/spec-sheets/<feed>.html` (and the matching card on `products/index.html`).
2. Open the page in Chrome, choose **Print**, set destination to **Save as PDF**, paper **A4**, margins **None**, and tick **Background graphics**.
3. Save over `downloads/spec-sheets/<feed>.pdf`.

## Add stockists and farmer tips

- **Stockists:** in `where-to-buy/index.html`, copy one `<article class="card stockist">` block per shop, fill in its details, and set `data-region` to match an option in the Region list. Delete the "Example" badges and the team note when done.
- **Farmer tips:** copy an existing article folder inside `tips/` and give it a new name, change the title, text and the "In this guide" links, then add a card for it to `tips/index.html` (and optionally the home page). Add the new address to `sitemap.xml`.

## Editing notes

- **Colours, fonts and spacing** are design tokens at the top of `assets/css/styles.css`.
- **Header and footer** are repeated in each page. When you change one (for example the phone number in the footer), make the same change in every HTML file; a project-wide find-and-replace does it in one go.
- **Feed planner figures** (average grams per bird per day, and the 50 kg bag size) are in `assets/js/main.js` under `PROFILES` and `BAG_KG`. They are broad industry averages for planning; replace them with your own figures if you have them.
- **Photos**: dashed "Photo placeholder" boxes mark where real photography should go. Replace each `.photo-slot` block with an `<img>` (with `width`, `height` and descriptive `alt` text) inside a `<div class="media">`.
- **Logo**: `assets/images/logo-mark.svg` is a placeholder mark (an ear of grain). Swap in the official logo if there is one, and regenerate `favicon.svg`, `apple-touch-icon.png` and `og-image.png`.

## Quality checks

- Responsive from 320 px phones to wide desktops, with no horizontal scrolling.
- Accessibility: semantic landmarks, skip link, keyboard-friendly navigation and form, visible focus styles, form errors announced and linked to fields, respects reduced-motion preferences. Every page passes an automated axe-core WCAG 2.1 AA scan with zero violations.
- Works without JavaScript: navigation, content and the form remain usable; JS only adds enhancements.
- Lightweight: illustrations are small SVGs and there are no third-party scripts apart from Google Fonts.
