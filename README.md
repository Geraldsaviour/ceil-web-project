# CIEL & CO ADS — Website Documentation

A single-page advertising agency website built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required — open `index.html` in a browser and it works.

---

## File Structure

```
index.html              — Page structure and content
styles.css              — All visual styling and layout
script.js               — All interactivity and animations
logo_img-removebg-preview.png  — Brand logo (used in nav, preloader, footer)
hero img.png            — Hero section background image
reference.png           — Design reference image
```

---

## HTML — Section by Section

### `<head>`
Sets up the page metadata, favicon, and loads two external fonts:
- **Satoshi** (via Fontshare) — primary display font used for headings and the logo
- **Inter** (via Google Fonts) — fallback body font

Both fonts are preconnected for faster loading.

### Preloader `#preloader`
A full-screen overlay that shows the logo on page load. It fades out after 2 seconds, then triggers the navbar and hero entrance animations. Prevents a flash of unstyled content on first load.

### Navigation `.navbar`
Fixed top navigation bar containing:
- **Logo** — image + brand name + tagline stacked vertically
- **Nav menu** — four anchor links (Home, About, Reviews, Contact) styled as a glass pill capsule
- **Hamburger button** — hidden on desktop, shown on mobile to toggle the slide-in menu

The navbar starts transparent and gains a frosted glass background once the user scrolls past 100px.

### Mobile Backdrop `.menu-backdrop`
A dark blurred overlay that appears behind the mobile nav menu when it's open. Clicking it closes the menu.

### Hero Section `#home`
The first visible section. Contains:
- **Background layers** — animated gradient, radial overlay, and a subtle grain texture for depth
- **Floating orbs** — six blurred circles that drift slowly using CSS keyframe animations, creating a liquid ambient effect
- **Hero image** — the main visual on the left column
- **Glass card** — overlaid on the right with the headline, subtitle, and two CTA buttons

On desktop: two-column grid (image left, card right).
On mobile: the image becomes a full-screen background and the card text sits on top with white text for contrast.

### About Section `#about`
Two-column layout:
- **Left column** — badge label, section title, and description paragraph
- **Right column** — three feature cards (Data-Driven Strategy, Creative Excellence, Performance Focus)

Each feature card uses the `.glass-module` utility class for the frosted glass appearance. The left column uses `reveal-left` and the right uses `reveal-right` so they animate in from opposite sides on scroll.

### Reviews Section `#reviews`
An auto-advancing testimonial carousel with three slides. Contains:
- **Carousel slides** — each has a large quote mark, review text, author photo, name, and role
- **Navigation** — previous/next arrow buttons and clickable dot indicators
- **Progress bar** — a thin gold bar at the bottom that fills over 5 seconds before auto-advancing
- **"Read Full Case" button** — opens a modal with expanded review details and campaign metrics

The carousel pauses when the user hovers over the section.

### Review Modal `#reviewModal`
A full-screen overlay modal injected with content by JavaScript when a "Read Full Case" button is clicked. Closes via the X button, clicking the backdrop, or pressing Escape.

### Contact Section `#contact`
Two-column layout:
- **Left — Contact form** — name, email, subject, and message fields with floating labels. On submit it shows a success state
- **Right — Sidebar** — email and phone contact details, plus four social media icon links (Instagram, LinkedIn, Twitter, WhatsApp)

### Footer `.footer`
Dark background footer with:
- **Brand column** — logo, tagline
- **Three link columns** — Quick Links, Services, Contact
- **Bottom bar** — copyright notice

---

## CSS — Section by Section

### CSS Reset & `:root` Variables
Zeroes out all default browser margins and padding. The `:root` block defines all design tokens as CSS custom properties so they can be reused consistently:
- **Color palette** — white, ivory, cream, and four gold shades
- **Glass tokens** — background opacities, border colors, blur values for the frosted glass effect
- **Shadows** — pre-built shadow values for glass cards and gold glow effects
- **Radii** — `--bubble-radius: 50px` for pill shapes, `--card-radius: 32px` for cards

### `.glass-module` and `.glass-pill`
Reusable utility classes applied to multiple elements. They apply the backdrop blur, semi-transparent background, and border that creates the frosted glass look. Using utility classes avoids repeating these declarations across every component.

### Body & HTML
Sets the font stack, background color (`#f0f2f5` — a slightly grey white that makes glass elements pop), and enables smooth scrolling. Font smoothing is enabled for crisp text rendering.

### Floating Orbs
Six fixed-position blurred circles with radial gradient fills. They use four different `@keyframes` animations (`orbFloat1–4`) at different speeds and sizes to create an organic, drifting ambient background. They are `pointer-events: none` so they never interfere with clicks.

### Preloader
Full-screen fixed overlay. The logo animates in with `logoFadeIn` (fade + scale up). The `.fade-out` class triggers an opacity transition to hide it. `body.preloader-active` locks scroll while it's visible.

### Navbar
Fixed at the top with `z-index: 1000`. Starts invisible (`opacity: 0`) and animates in via `fadeInDown`. The `.scrolled` class adds the glass background and reduces padding. Nav links use a `::after` pseudo-element for the hover/active highlight background so the highlight sits behind the text.

### Hero Section
Uses `min-height: 100vh` to always fill the screen. The background gradient animates with `gradientShift` for a slow colour-breathing effect. The grain overlay uses an inline SVG data URI to add subtle texture without an extra HTTP request.

On desktop the `.showcase-layout` uses CSS Grid (two equal columns). On mobile (`max-width: 992px`) the image switches to `position: absolute` to fill the container as a background, and the glass card becomes transparent with white text and a text-shadow for legibility.

### Buttons
Two variants:
- `.btn-primary` — gold gradient fill, lifts on hover with `translateY(-4px)` and a subtle `brightness(1.02)` — kept low intentionally to avoid an unnatural flash
- `.btn-secondary` — frosted glass with a gold border, same lift on hover

Both have an `::before` pseudo-element that expands on `:active` for a press ripple effect. JavaScript adds additional bubble particles on click.

### Scroll Indicator
A thin vertical gold line at the bottom of the hero that pulses up and down with `scrollPulse` to hint at scrollable content.

### Reveal Animations
`.reveal-up`, `.reveal-left`, `.reveal-right` start with `opacity: 0` and a translate offset. When the IntersectionObserver in JS adds `.active`, the transition plays them into their natural position. `will-change: transform, opacity` hints to the browser to GPU-accelerate these.

### About Section
Uses CSS Grid with `grid-template-columns: 1fr 1fr` for the two-column layout. Feature cards use `.glass-module` and have a `::before` shimmer sweep on hover. On mobile the grid collapses to a single column.

### Reviews Section
The carousel is a flex row where each slide is `min-width: 100%`. Sliding is done by translating the container with `translateX`. The active slide has full opacity and scale; inactive slides are dimmed and scaled down slightly for depth. The progress bar is a simple `width` transition driven by `requestAnimationFrame` in JS.

### Modal
Fixed overlay with `opacity: 0; visibility: hidden` by default. The `.active` class transitions both to visible. The inner container scales in from `scale(0.9)` for a natural pop-in feel.

### Contact Section
Two-column grid. Form inputs use floating labels — the label is absolutely positioned inside the input and moves up when the input has content (`:not(:placeholder-shown)` selector). The success state is hidden by default and shown via JS after submit.

### Footer
Dark semi-transparent background with a gold top border. Three-column link grid on desktop, stacks on mobile.

### Mobile Responsive Breakpoints
- `992px` — hero switches to full-background image mode, containers reduce padding
- `768px` — navbar collapses to hamburger, about section stacks, carousel nav simplifies
- `480px` — font sizes reduce, hero padding tightens, single-column layouts throughout

---

## JavaScript — Section by Section

### Preloader Animation
Runs on `window.load` (after all assets including images are ready). Adds `preloader-active` to body to lock scroll, then after 2 seconds fades out the preloader and triggers `.animate-in` on the navbar, logo, nav links, hero title, subtitle, buttons, and scroll indicator in sequence. The staggered delays create a choreographed entrance.

### Navbar Scroll & Active Link
Uses a `requestAnimationFrame` throttle pattern — the scroll event only sets a flag and stores `scrollY`, and the actual DOM updates happen inside `rAF` to avoid layout thrashing. On scroll it:
1. Toggles `.scrolled` on the navbar at 100px
2. Applies a parallax offset to the hero background
3. Moves each orb at a slightly different speed for a parallax depth effect
4. Updates the active nav link by comparing scroll position against each section's `offsetTop`

### Mobile Menu Toggle
Toggles `.active` on both the hamburger and nav menu. Clicking any nav link closes the menu automatically. The hamburger spans animate into an X shape via CSS transforms when `.active` is applied.

### Smooth Scroll
Intercepts all `<a href="#...">` clicks, prevents default browser jump, and uses `window.scrollTo` with `behavior: smooth` and an 80px offset to account for the fixed navbar height.

### Button Ripple Effect
On every `.btn` click, five small bubble `<span>` elements are created at the click coordinates with randomised sizes and offsets. They animate outward with `bubbleBurst` keyframes (injected into the document head as a `<style>` tag) and are removed after 900ms to avoid DOM bloat.

### Hero Glass Card Tilt
Tracks mouse position over the hero section and calculates a tilt angle based on cursor distance from centre. Uses linear interpolation (`lerp`) inside a `requestAnimationFrame` loop for smooth, lag-free motion. The tilt resets to zero on `mouseleave`. Only runs if the card element exists (desktop only effectively, since the card is transparent on mobile).

### Floating Orbs Randomise
On load, each orb gets a random `marginLeft`, `marginTop`, and negative `animationDelay` so they all start at different points in their animation cycle, preventing them from moving in sync.

### Scroll Reveal (IntersectionObserver)
An `IntersectionObserver` watches all `.reveal-up`, `.reveal-left`, `.reveal-right` elements. When 15% of an element enters the viewport, `.active` is added which triggers the CSS transition. The observer then `unobserve`s the element so it only animates once.

### Reviews Carousel
Manages three testimonial slides. `updateCarousel(index)` translates the carousel container, toggles `.active` on slides and dots, and resets the progress timer. Auto-advance runs via `requestAnimationFrame` — `carouselLoop` calculates elapsed time and advances when it hits 100%. The section's `mouseenter`/`mouseleave` events pause and resume the timer.

### Review Modal
`openReview(index)` looks up the matching entry in the `reviewData` array, builds an HTML string with the full quote, metrics list, and author info, injects it into the modal body, then shows the modal. Closes on X button click, backdrop click, or Escape key.

### Contact Form
Listens for `submit` on the form, prevents default, disables the button and changes its text to "Sending...", then after a 1.5 second simulated delay hides the form and shows the success state. `resetContactForm()` reverses this — called by the "Send Another Message" button.
