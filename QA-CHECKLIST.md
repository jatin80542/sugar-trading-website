# QA checklist

Everything that could be verified without a browser has been (see README §7).
This is the pass that needs your eyes. Budget about ten minutes.

```bash
npm run build && npm start
```

Then open <http://localhost:3000>.

---

## 1. Responsive — the important one

In Chrome: `F12` → click the device-toolbar icon (`Ctrl+Shift+M`) → set width manually.

Test each of these widths on **every** page:

`1440` · `1280` · `1024` · `768` · `430` · `390` · `375` · `360`

At each width, check:

- [ ] No horizontal scrollbar (the single most common failure)
- [ ] Navigation does not overflow — the burger menu takes over below 1080px
- [ ] Specification tables stack into label/value pairs below 700px rather than squashing
- [ ] Hero text is readable and not cropped
- [ ] No overlapping buttons, no text touching the screen edge
- [ ] No absurdly large headings on small screens
- [ ] Images keep sensible proportions

**Quick overflow test** — paste into the browser console on any page:

```js
[...document.querySelectorAll('*')].filter(el => el.scrollWidth > document.documentElement.clientWidth).map(el => el.className || el.tagName)
```

An empty array `[]` means nothing overflows. Anything listed is your culprit.

---

## 2. Navigation

- [ ] All five nav items load the right page
- [ ] The current page is underlined in the desktop nav
- [ ] Header starts transparent over the dark hero, turns white with a hairline border after scrolling ~25px
- [ ] Burger opens a full-screen menu; `Escape` closes it; background does not scroll while open
- [ ] Tapping a link in the mobile menu navigates *and* closes the menu
- [ ] Logo returns to home from every page

## 3. Products

- [ ] All five product pages load: ICUMSA 45, ICUMSA 150, VHP, VVHP, Beet
- [ ] Each looks visually distinct (crystal tone changes per grade) but shares one layout
- [ ] The enquiry rail sticks while scrolling on desktop, sits inline on mobile
- [ ] "Enquire about X" pre-selects that grade in the contact form dropdown
- [ ] "Other grades" cross-links at the bottom all work

## 4. Forms

- [ ] Submitting empty shows inline errors and focuses the first bad field
- [ ] A personal email (gmail/yahoo/hotmail) is rejected with a clear message
- [ ] A requirement under 20 characters is rejected
- [ ] Button shows "Sending…" and cannot be double-clicked
- [ ] Before `.env.local` is configured: an honest error, not a fake success
- [ ] After configuring: success panel with a reference number, form clears

## 5. Keyboard and accessibility

- [ ] `Tab` from the very top reveals a "Skip to content" link
- [ ] Every focused element shows a visible gold outline
- [ ] The whole form is completable by keyboard alone
- [ ] The mobile menu is reachable and closable by keyboard

## 6. Motion

- [ ] Sections fade up gently on scroll — subtle, not bouncy
- [ ] Enable *Reduce motion* in your OS settings, reload: everything appears instantly with no animation

## 7. Console

- [ ] `F12` → Console tab → zero red errors on every page
- [ ] Network tab → no 404s on images or fonts

## 8. Content

- [ ] No lorem ipsum anywhere
- [ ] Search each page for `XXXX` and `.example` — these are the placeholders from README §2 that still need your real details
- [ ] No claim on the site that you cannot support with a document

## 9. Visual

- [ ] The site reads white/ivory/charcoal overall — gold appears only in thin rules, small labels and CTAs
- [ ] Nothing looks like an ecommerce product grid
- [ ] The five pages feel like one brand

---

## If something is wrong

Most layout issues trace back to `styles/`. Colours and spacing are in
`tokens.css`; anything structural is in `components.css` or `pages.css`.
The three rules under "RESPONSIVE SAFETY" at the bottom of `base.css` are what
prevent horizontal overflow — do not delete them.
