# Placeholders to fill in before launch

Every unconfirmed fact on the site is wrapped in `<span class="ph">[…]</span>` and highlighted on the page. Search the HTML files for `class="ph"` to find them all. When a value is confirmed, replace the whole span with the plain text.

When every placeholder is gone, also remove the "Note for the Zumo Quoin team" banners (`<div class="notice">`) on `products/index.html`, `quality/index.html` and `where-to-buy/index.html`.

## Company details (footer on every page, and `contact/index.html`)

- [ ] Town and country of the mill (home page hero)
- [ ] Region / country served (footer, about page)
- [ ] Full street address and digital address / GPS code
- [ ] Phone / WhatsApp number
- [ ] Sales email address (also set `data-fallback-email` on the contact form)
- [ ] Opening hours (weekdays, Saturday, Sunday)
- [ ] Company registration number
- [ ] Live domain name: replace `https://www.example.com` in every page's `<head>`, in `robots.txt`, `sitemap.xml` and the JSON-LD on `index.html`

## Key figures (home and about pages)

- [ ] Year established
- [ ] Daily milling capacity (tonnes per day)
- [ ] Number of feed lines
- [ ] Number of farms and distributors supplied
- [ ] Number of staff

## About page

- [ ] Founding town and founder name(s)
- [ ] Two or three sentences of company history and milestones
- [ ] Managing director's quote and name
- [ ] Leadership names (and confirm the three roles shown)
- [ ] Confirm the facility equipment list
- [ ] Review the mission, vision and values copy (written as a draft)

## Products page

The product line-up is a typical range for a poultry feed mill and needs confirming.

- [ ] Confirm product names; add or remove products as needed
- [ ] Life stage ages (weeks) for each feed
- [ ] Feed form (mash, crumble, pellet)
- [ ] Bag sizes
- [ ] Product codes
- [ ] Typical analysis for each feed: crude protein, metabolisable energy, crude fibre, calcium, available phosphorus, moisture
- [ ] Ages in the layer and broiler feeding programmes

Remember to update the product list in the contact form's "Feed of interest" dropdown if products change.

## Process & quality page

- [ ] Check each of the seven process steps against how the mill actually works (for example which lab tests are done in house)
- [ ] Certification or standard name, issuing body and certificate number
- [ ] Regulatory registration
- [ ] Feed shelf life (weeks)
- [ ] Whether custom formulation or toll milling is offered

## WhatsApp

- [ ] Set `WHATSAPP_NUMBER` in `assets/js/main.js` (see README)

## Spec sheets (`downloads/spec-sheets/*.html`, then re-save each PDF)

- [ ] Product code, issue number and issue month
- [ ] Full typical analysis (10 nutrients) for each feed
- [ ] Bag size and shelf life
- [ ] Ingredients list
- [ ] Ages in the directions for use
- [ ] Mixing ratio for Layer Concentrate
- [ ] Company address, phone and email in the footer of each sheet

## Where to buy (`where-to-buy/index.html`)

- [ ] Replace the three example stockists with real ones (name, town, region, landmark, phone, hours, feeds stocked)
- [ ] Replace the example regions in the Region list

## Farmer tips

- [ ] Read through the six articles and adjust any advice to match your own recommendations

## Marketing claims to confirm

These read as facts, so make sure they are true for the business:

- [ ] Raw materials are lab-checked before production (home hero card, process sections)
- [ ] Farm-gate delivery of bulk and bagged orders (home hero card)
- [ ] Batch codes printed on every bag (process and FAQ)
- [ ] Mill visits are offered to customers (quality page)

## Images

- [ ] Replace each "Photo placeholder" box with real photography (home, about, quality pages)
- [ ] Embed a map of the mill on the contact page
- [x] Official logo and favicon added (`assets/images/logo-mark.svg`, `assets/images/favicon.svg`)
