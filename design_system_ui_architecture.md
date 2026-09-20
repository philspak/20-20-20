# Design System & UI Architecture

This document outlines the core design tokens, layout principles, and component architectures derived from the application's CSS. It serves as a reference guide for maintaining UI consistency, implementing new features, and understanding the overarching design language.

## 1. Global Theming & Design Tokens

The application utilizes a CSS Custom Properties (Variables) architecture to handle theming. The system defaults to **Dark Mode** on the `:root` pseudo-class and supports a fully mapped **Light Mode** via the `[data-theme="light"]` attribute.

### Color Palette

| Token Name | Dark Theme (Default) | Light Theme | Usage |
| :--- | :--- | :--- | :--- |
| `--page-bg` | `#091b2b` | `#f4f6f8` | Main application background |
| `--surface` | `#10283c` | `#ffffff` | Primary container/card backgrounds |
| `--surface-raised` | `#15324b` | `#ffffff` | Elevated elements, hover states |
| `--surface-input` | `#0c2133` | `#f8fafc` | Input fields, tags, secondary blocks |
| `--border` | `#29445d` | `#dbe2e8` | Default borders and dividers |
| `--border-hover` | `#42617d` | `#b0c4de` | Interactive element hover states |
| `--text` | `#f3f6f9` | `#0f172a` | Primary headings and body text |
| `--text-muted` | `#9fb0bf` | `#64748b` | Secondary text, placeholders, icons |
| `--accent` | `#78b7e5` | `#0284c7` | Primary brand color, links, active states |
| `--accent-hover` | `#91c5eb` | `#0369a1` | Hover states for primary actions |
| `--success` | `#42b883` | `#16a34a` | Positive feedback, active status |
| `--warning-border` | `#d88c67` | `#f97316` | Alert borders, closure notices |

### Typography
* **Font Family:** primary sans-serif stack led by `Inter`, falling back to `ui-sans-serif, system-ui, -apple-system`.
* **Base Line Height:** `1.5` for optimal readability.
* **Headings:** Font weight `700`. The hero title utilizes a fluid typography clamp: `clamp(2.25rem, 5vw, 4rem)` with tight letter spacing (`-0.045em`).

### Animation & Accessibility
* **Transitions:** A universal standard of `150ms ease` is applied to colors, background colors, borders, and transforms to ensure snappy but smooth interactions.
* **Focus States:** Custom outline logic overrides default browser rings. Active/focused inputs and buttons utilize a soft accent ring: `box-shadow: 0 0 0 3px rgb(120 183 229 / 15%)`.
* **Reduced Motion:** Fully supports `prefers-reduced-motion: reduce` by setting all animation and transition durations to `0.01ms`.

---

## 2. Layout & Grid System

### Container Constraints
* The master container (`.container`) enforces a `max-width: 1140px` with `margin: 0 auto` and flexible padding (`2rem 1.5rem`).
* The `.hero-inner` acts as a slightly narrower reading wrapper (`max-width: 1080px`).

### Component Grid
The application relies heavily on CSS Grid for data presentation (e.g., restaurant lists).
* **Desktop/Tablet:** Auto-filling grid with a minimum card width of `320px` (`grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`) and a `1.5rem` gap.
* **Mobile (≤768px):** Collapses to a single column (`1fr`) with a reduced `1rem` gap.

---

## 3. Core Component Library

### Buttons
All buttons share a baseline padding of `0.65rem 1.25rem`, an `8px` border radius, and a font-weight of `500` or `600`.
* **Primary (`.button-primary`):** Solid `--accent` background with inverted text.
* **Secondary (`.button-secondary`):** Transparent background with `--border-hover` boundaries.
* **Filter Buttons (`.category-filter button`):** Pill-like structures that invert their background/text colors upon receiving an `.active` or `[aria-pressed="true"]` state.

### Input Controls
* **Search / Text Inputs:** Standardized to a height of `52px` (desktop) / `48px` (mobile). Inputs sit on a `--surface-input` background and feature an `8px` border radius.
* **Toggle Switch (`.toggle-container`):** A custom-built sliding CSS toggle. Uses a `32x18px` track with a `12px` translating indicator.

### Cards (`.card`, `.restaurant-card`)
Cards are the primary data container, designed as flexible column layouts (`flex-direction: column`).
* **Visuals:** They rest on `--surface-raised` with a `1px` border and `12px` border radius. 
* **Interaction:** Hovering lifts the card subtly (`transform: translateY(-1px)`) and highlights the border (`--border-hover`).
* **Metadata Tags (`.meta-tag`):** Compact, inline-flex badges (`0.75rem` font size) used for categorization. Includes logic for `.colored` variants (e.g., `.loc-indoor`, `.loc-outdoor`) utilizing low-opacity background fills with solid text colors for distinct visual hierarchy.

### Notices & Alerts
* **Holiday/Closed Notices:** Utilize the warning color palette (orange/brown hues in dark mode) combined with a thick `3px` solid left border to quickly draw the user's eye.

### Modals
* **Overlay:** Full-screen fixed container with `rgba(0,0,0,0.6)` background and a `4px` backdrop blur.
* **Content Box:** Centered, constrained to `550px` width, with a maximum height of `90vh` to allow internal scrolling.

### Map View
* A specialized container (`#map-view`) strictly sized to `500px` (desktop) and `350px` (mobile) height.
* Features custom leaflet overrides, including a CSS filter applied to tiles in Dark Mode (`filter: brightness(0.7) invert(1) contrast(2.5) hue-rotate(200deg) saturate(0.3)`) to prevent glaring white maps in dark themes.

---

## 4. Mobile Responsiveness

At the `max-width: 768px` breakpoint, the system adapts for touch and smaller viewports:
* **Padding:** Container padding reduces to `1rem`. Hero sections shrink to `2rem 1.25rem`.
* **Typography:** Hero titles clamp down to roughly `2.25rem`.
* **Touch Targets:** Hero actions and buttons stretch to `width: 100%` and enforce a minimum height of `44px` to meet mobile accessibility standards. Input fields reduce slightly to `48px` height to save vertical space.