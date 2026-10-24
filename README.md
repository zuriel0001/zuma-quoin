# Zumo Quoin Limited website

The marketing website for **Zumo Quoin Limited**, a poultry feed mill producing feeds for chicks, pullets, layers, broilers and breeders.

It is a fast, dependency-free static site: plain HTML, one stylesheet and one small script. There is no build step, so any page can be edited directly and the folder can be hosted anywhere.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, feed range, why choose us, production overview, feed planner, who we serve |
| `about.html` | About us: story, key figures, mission and vision, values, facility, leadership |
| `products.html` | Our feeds: filterable product range with life stage, form, bag size and typical analysis |
| `quality.html` | Process & quality: seven-step production process, quality controls, certifications, FAQ |
| `tips.html` | Farmer tips: index of practical guides |
| `tips-*.html` | Six farmer-tips articles (feed storage, brooding chicks, eggshells, changing feeds, hot weather, feed waste) |
| `stockists.html` | Where to buy: searchable list of stockists by town and region, plus order-direct and become-a-stockist links |
| `contact.html` | Contact: enquiry form (prefilled from product and planner links), contact details, hours, map slot |
| `spec-sheets/*.pdf` | Downloadable one-page A4 specification sheet for each feed (source: `spec-sheets/*.html`) |
| `404.html` | Not-found page |

## Before launch: fill in the placeholders

Anything the company still needs to confirm (address, phone, capacity, product specifications and so on) is wrapped in `<span class="ph">…</span>` and shows on the page with a striped gold highlight, so nothing unconfirmed passes as fact. See **[PLACEHOLDERS.md](PLACEHOLDERS.md)** for the full checklist.

## Preview locally

Open `index.html` in a browser, or serve the folder (recommended, so links behave exactly as they will online):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. The site appears at `https://<username>.github.io/zuma-quoin/` within a minute or two. To use your own domain, add it in the same settings page.

Any static host (Netlify, Cloudflare Pages, a cPanel host) also works: upload the whole folder as is.

## Switch on the enquiry form

The form posts to [Formspree](https://formspree.io) (free tier available), so no server is needed.

1. Create a Formspree form that delivers to the sales inbox.
2. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action` with your form ID.
3. Optionally set `data-fallback-email` on the form to the sales email address.

Until step 2 is done, submitting the form does not pretend to send anything. It tells the visitor that online enquiries aren't switched on yet and offers a pre-written email instead.

## Switch on the WhatsApp button

Every page has a floating "Chat on WhatsApp" button (an icon on phones). Open `assets/js/main.js` and set `WHATSAPP_NUMBER` near the top to the business WhatsApp number in international format, digits only, for example `"233201234567"`. Until it is set, the button opens the contact page instead.

## Update a spec sheet

Each PDF in `spec-sheets/` is printed from the HTML page of the same name.

1. Edit the figures in `spec-sheets/<feed>.html` (and the matching card on `products.html`).
2. Open the page in Chrome, choose **Print**, set destination to **Save as PDF**, paper **A4**, margins **None**, and tick **Background graphics**.
3. Save over `spec-sheets/<feed>.pdf`.

## Add stockists and farmer tips

- **Stockists:** in `stockists.html`, copy one `<article class="card stockist">` block per shop, fill in its details, and set `data-region` to match an option in the Region list. Delete the "Example" badges and the team note when done.
- **Farmer tips:** copy an existing `tips-*.html` article, change the title, text and the "In this guide" links, then add a card for it to `tips.html` (and optionally the home page).

## Editing notes

- **Colours, fonts and spacing** are design tokens at the top of `assets/css/styles.css`.
- **Header and footer** are repeated in each page. When you change one (for example the phone number in the footer), make the same change in every HTML file; a project-wide find-and-replace does it in one go.
- **Feed planner figures** (average grams per bird per day, and the 50 kg bag size) are in `assets/js/main.js` under `PROFILES` and `BAG_KG`. They are broad industry averages for planning; replace them with your own figures if you have them.
- **Photos**: dashed "Photo placeholder" boxes mark where real photography should go. Replace each `.photo-slot` block with an `<img>` (with `width`, `height` and descriptive `alt` text) inside a `<div class="media">`.
- **Logo**: `assets/img/logo-mark.svg` is a placeholder mark (an ear of grain). Swap in the official logo if there is one, and regenerate `favicon.svg`, `apple-touch-icon.png` and `og-image.png`.

## Quality checks

- Responsive from 320 px phones to wide desktops, with no horizontal scrolling.
- Accessibility: semantic landmarks, skip link, keyboard-friendly navigation and form, visible focus styles, form errors announced and linked to fields, respects reduced-motion preferences. Every page passes an automated axe-core WCAG 2.1 AA scan with zero violations.
- Works without JavaScript: navigation, content and the form remain usable; JS only adds enhancements.
- Lightweight: illustrations are small SVGs and there are no third-party scripts apart from Google Fonts.
