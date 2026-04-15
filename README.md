# Pasture + Market — Website Customization Guide

## Folder Structure

```
pasture-market/
├── index.html          ← Main website (single-page with all sections)
├── css/
│   └── styles.css      ← All styles — colors, fonts, layout, animations
├── js/
│   └── main.js         ← Navigation, scroll effects, gallery, forms
├── images/             ← CREATE THIS FOLDER and add your images
│   ├── hero-bg.jpg
│   ├── intro-photo.jpg
│   ├── about-interior.jpg
│   ├── about-food.jpg
│   ├── catering.jpg
│   ├── team.jpg
│   ├── gallery-1.jpg
│   ├── ...
│   └── favicon.png
└── menus/              ← CREATE THIS FOLDER if using PDF menus
    ├── breakfast-lunch.pdf
    ├── dinner.pdf
    └── cocktails.pdf
```

---

## Critical Links to Replace (search for these in index.html)

| Placeholder | Where | What to Put |
|---|---|---|
| `YOUR_ORDER_ONLINE_LINK_HERE` | Navbar + Hero + Mobile Nav (3 places) | Your order online URL |
| `YOUR_TABLEAGENT_LINK_HERE` | Hero + About + Reservations (3 places) | Your TableAgent booking URL |
| `YOUR_PHONE_HERE` | Reservations + Contact | Your phone number |
| `YOUR_INSTAGRAM_LINK` | Footer | Instagram profile URL |
| `YOUR_FACEBOOK_LINK` | Footer | Facebook page URL |
| `YOUR_TIKTOK_LINK` | Footer | TikTok profile URL |
| `info@pasturemarket.ca` | Contact | Your actual email |
| `Lac La Biche, AB, Canada` | Contact | Your full address |

---

## Images to Replace

All image placeholders are marked with comments like `<!-- REPLACE: ... -->` in the HTML.

### How to add your hero image:
In `css/styles.css`, find `.hero-bg` and update:
```css
.hero-bg {
  background-image: url('../images/hero-bg.jpg');
}
```

### Gallery images:
Each `.gallery-item-bg` div holds a placeholder gradient. Replace with:
```html
<div class="gallery-item-bg">
  <img src="images/gallery-1.jpg" alt="Description" style="width:100%;height:100%;object-fit:cover;" />
</div>
```
Also add `data-src="images/gallery-1.jpg"` to the `.gallery-item` for lightbox support.

### Logo:
The logo is currently text-based. To use your actual logo image, replace the `.logo-mark` block with:
```html
<img src="images/logo.png" alt="Pasture + Market" style="height:50px;" />
```

---

## Updating Menu Items

Find the menu sections in `index.html` inside `#menu`. Each menu item looks like:
```html
<div class="menu-item">
  <div class="menu-item-info">
    <h5>Item Name</h5>
    <p>Description</p>
  </div>
  <span class="menu-item-price">$00</span>
</div>
```
Simply edit the text inside `<h5>`, `<p>`, and `<span class="menu-item-price">`.

---

## Hours, Address, and Contact Details

Search for `<!-- REPLACE: Your actual...` comments throughout `index.html` and `footer` to find all location-specific placeholders.

---

## Adding PDF Menus

Uncomment and update these lines in `index.html`:
```html
<a href="menus/breakfast-lunch.pdf" class="btn-outline" target="_blank">Download Full Menu (PDF)</a>
```

---

## Form Submissions

The forms currently show a success state but don't actually send data. To connect them, you can:

1. **Formspree (recommended, free):** Add `action="https://formspree.io/f/YOUR_ID"` to each `<form>` and remove `novalidate` + the JS preventDefault.
2. **Your own backend:** Wire the form submit handlers in `js/main.js` to your API.

---

## Colors (easy to change)

In `css/styles.css` at the top, update these CSS variables:
```css
:root {
  --gold: #c9a84c;        /* Main gold accent */
  --charcoal: #1a1a18;    /* Main dark background */
  --ivory: #f5f0e8;       /* Main light text/background */
  --green-dark: #2d3b2a;  /* Earthy green for gradients */
}
```

---

## Fonts

Currently using **Cormorant Garamond** (serif headings) + **Jost** (sans-serif body).
To change fonts, update the Google Fonts import in `<head>` and the CSS variables:
```css
--serif: 'Cormorant Garamond', Georgia, serif;
--sans: 'Jost', 'Helvetica Neue', sans-serif;
```

---

## Adding a Google Map

In the Contact section, replace the `.map-placeholder` div with a Google Maps embed:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_ID"
  width="100%" height="220"
  style="border:0; filter:grayscale(1) brightness(0.8);"
  allowfullscreen="" loading="lazy">
</iframe>
```
Get your embed link from Google Maps → Share → Embed a map.

---

## What Each File Does

- **index.html** — Complete website HTML, all sections on one page with anchor navigation
- **css/styles.css** — All visual styles, responsive breakpoints, animations
- **js/main.js** — Navbar scroll effect, dropdown menus, gallery filters, lightbox, form handling, scroll reveal animations

The site is fully self-contained. No build tools required — just open in a browser or upload to any web host.
