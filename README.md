# Handoff: Thiago Parisotto — Personal Portfolio (single-page)

## Overview
A single-page personal portfolio for **Thiago Parisotto, iOS Engineer** — 2× Apple Swift Student Challenge winner. It presents a hero, bio, a prestige "Swift Student Challenge" section, shipped App Store projects, an experience timeline, an events/WWDC photo carousel, a YouTube content block, and a contact footer. Smooth-scroll anchored navigation, fixed header, light/dark mode, and scroll-reveal animations.

## About the Design Files
The files in this bundle (`Portfolio.html`, `styles.css`, `app.js`, `assets/`) are **design references created in HTML** — a working prototype showing the intended look, layout, and behavior. They are **not meant to be shipped verbatim**. The task is to **recreate this design in the target codebase's environment** using its established patterns and component library. If there is no existing codebase yet, this is a static marketing site and the cleanest fit is a lightweight framework — **Astro** or **Next.js (static export)**, or even plain HTML/CSS/JS — whichever the team prefers. The vanilla HTML/CSS/JS here is intentionally framework-agnostic and can also be deployed almost as-is.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, shadows, and interactions are all specified below and present in `styles.css`. Recreate the UI pixel-perfectly. The system font stack (SF Pro on Apple devices) is intentional — keep it.

---

## Screens / Views
This is one continuous page. Sections in DOM order:

### 1. Header (fixed)
- **Purpose:** Persistent nav + theme toggle.
- **Layout:** `position: fixed`, full width, height **56px**, `backdrop-filter: saturate(180%) blur(20px)`, background `--header-bg` (translucent). Inner row is `flex; justify-content: space-between`, max-width **1120px**, 24px side padding. Gains a 1px bottom border (`.scrolled`) once `window.scrollY > 8`.
- **Components:**
  - **Brand (left):** 26×26px rounded square (`border-radius: 8px`) filled with the accent gradient, white "TP" 13px/700, followed by "Thiago Parisotto" 17px/600.
  - **Nav (center/right):** text links (About, Swift Challenge, Projects, Experience, Events, YouTube), 15px, color `--text-2`, pill hover background. Hidden ≤900px.
  - **Theme toggle:** 38px circular icon button, sun/moon SVG swap.
  - **Hamburger:** 38px circular icon button, shown only ≤900px.

### 2. Hero (`#hero`)
- **Purpose:** Name, role, headline, primary CTAs, socials, portrait.
- **Layout:** 2-col grid `1.15fr 0.85fr`, gap `clamp(32px,5vw,72px)`, vertically centered. Collapses to 1 col ≤900px with the photo moved **above** the text.
- **Components:**
  - **Social row:** 3 circular buttons (42px) — LinkedIn, GitHub, YouTube — surface bg, 1px border, lift + accent on hover.
  - **H1:** "Thiago / Parisotto" (line break between), `clamp(44px, 8vw, 92px)`, weight 700, `letter-spacing: -0.04em`, `line-height: 0.98`.
  - **Role:** "iOS Engineer", gradient text, `clamp(22px,3.4vw,34px)`, 600.
  - **Subhead:** "2× winner of the Apple Swift Student Challenge — **2024 & 2025**. I craft delightful, polished apps for iPhone, watchOS and macOS." `clamp(16px,2vw,19px)`, `--text-2`.
  - **CTAs:** Primary pill button "View projects" (accent bg, white, arrow icon, blue glow shadow) → `#projects`; secondary pill "Get in touch" (`--chip-bg`) → `#contact`.
  - **Portrait:** max-width 420px, `aspect-ratio: 4/5`, `border-radius: 32px`, large shadow, blurred gradient glow behind (`filter: blur(60px); opacity: .28`). A floating "iOS Engineer @ Telus Digital" pill badge with a pulsing green dot overlaps the bottom edge.

### 3. About (`#about`)
- **Purpose:** Short bio + languages + quick facts.
- **Layout:** 2-col grid `0.9fr 1.1fr`, gap `clamp(32px,5vw,72px)`, items start-aligned. 1 col ≤900px.
- **Components:**
  - **Eyebrow:** "About" (mono, uppercase, accent, with a short rule before it — see Design Tokens).
  - **Title:** "Engineer, learner, / app maker." `section-title` scale.
  - **Body:** two paragraphs, `clamp(17px,2vw,20px)`, `--text-2`, with **bold** spans in `--text` for key terms (Telus Digital Brazil, UFRGS, Apple Developer Academy, IDE/UFRGS, Stuttgart).
  - **Language chips:** "German B2", "English C1", "Portuguese Native" — pill chips (`--chip-bg`), the level is mono 11px in accent.
  - **Facts list (right):** definition list with hairline top borders; `dt` is mono 13px `--text-3` (min-width 92px), `dd` 16px/500. Rows: Now / Based / Studying / Academy / Research / Platforms.

### 4. Swift Student Challenge (`#challenge`)
- **Purpose:** Prestige highlight of the two wins.
- **Layout:** Full-width band with its own elevated background (`--bg-elev`, near-black in dark). Centered head, then 2-col card grid (1 col ≤900px).
- **Components:**
  - **Seal:** 96px circle filled with accent gradient, white trophy SVG, slow rotate animation (24s; the inner SVG counter-rotates so it stays upright). Disabled under reduced-motion.
  - **Eyebrow** "Apple Swift Student Challenge" (centered), **Title** "Two years. Two wins.", centered lead paragraph.
  - **Two cards** (`.ssc-card`): big gradient year ("2024" / "2025") `clamp(48px,7vw,76px)/700`, mono award label, `h3` project name (Paralelo / Code the Beat), description, link row. Each has a faint gradient wash overlay (`::after`, opacity .05) and a "Winner" pill tag top-right (2025 reads "Winner · App Store"). Hover: lift + larger shadow. Links: "Scholar profile" / "App Store" with an up-right arrow that nudges on hover.

### 5. Projects (`#projects`)
- **Purpose:** Shipped App Store apps.
- **Layout:** 3-col grid, gap 24px. 1 col (max-width 460px, centered) ≤900px.
- **Components — 3 cards** (`.project-card`, flex column, hover lift):
  - **App icon:** 76px, `border-radius: 18px`, 1px border, small shadow. Code the Beat & Chroma Knight use real App Store icons; Pom uses a gradient placeholder square (see Assets).
  - Optional **highlight pill** (gradient bg, white) e.g. "SSC 2025 Winner".
  - `h3` name (22px/600), description (`--text-2`, 15px, `flex-grow:1` so footers align).
  - **Platform badges:** mono pill chips (iPhone / iPad / Mac / Apple Watch) per app.
  - **Footer row:** hairline top border; "App Store" link (accent, up-right arrow, `white-space: nowrap`) on the left, a mono meta note on the right (★ 5.0 / "3 platforms" / "1,000+ downloads").

### 6. Experience (`#experience`)
- **Purpose:** Career/education timeline.
- **Layout:** Vertical timeline; a gradient rail runs down the left (`::before`, fades to transparent). Each item has a node dot; the current role's dot is green with a soft halo.
- **Components — 5 items** (most-recent first): mono date label (accent), `h3` title (21px/600), org line (`--text-2`/500), description (15px, `--text-2`, max 60ch). Roles: iOS Engineer @ Telus (current) → Research Exchange (Stuttgart) → Apple Developer Academy → Web Dev & Commercial @ IDE/UFRGS → B.Sc. Computer Engineering @ UFRGS.

### 7. Events & WWDC (`#events`)
- **Purpose:** Horizontal photo gallery; emphasizes in-person WWDC 2025 & 2026.
- **Layout:** Same elevated band background as Section 4. A horizontal scroll-snap track (`scroll-snap-type: x mandatory`, scrollbar hidden). Slides are `flex: 0 0 clamp(280px,56vw,560px)`, `aspect-ratio: 3/2`, 28px radius.
- **Components:** Each `.slide` is a real `<img>` **or** a striped placeholder (`.slide-ph`: 45° repeating-linear-gradient between `--surface-2`/`--surface`, mono caption like `WWDC 2025 · keynote`). Bottom gradient `.slide-caption` overlays a location line (pin SVG + text) and a title. First slide uses Thiago's Apple Park photo. **Controls row:** mono hint text on the left; prev/next circular 44px arrow buttons on the right (disabled state at the ends).

### 8. YouTube (`#youtube`)
- **Purpose:** Promote the channel + show 3 latest videos.
- **Layout:** Eyebrow/title/lead, then a header row (avatar + name/handle + Subscribe button pushed right via `margin-left:auto`), then a 3-col video grid (1 col ≤900px).
- **Components:** **Avatar** 84px circle (placeholder with YouTube glyph; swap for real image). **Name** "Thiago Parisotto" 24px/600, handle "@thiagoparisotto · Swift & iOS tips". **Subscribe** primary pill (YouTube glyph) → channel. **Videos:** 3 `.yt-video` cards, `aspect-ratio: 16/9`, 20px radius, each an `<iframe>` from `youtube-nocookie.com/embed/<id>`, `loading="lazy"`.

### 9. Contact / Footer (`#contact`)
- **Purpose:** Closing CTA + contact links.
- **Layout:** Centered. `<footer>` element.
- **Components:** Centered eyebrow "Contact"; large H2 "Let's build something / **great together.**" (second line gradient, `clamp(34px,6vw,64px)/700`); lead paragraph; big mailto link (`clamp(20px,3vw,30px)/600`, turns accent on hover); a row of 4 circular social buttons (Email, LinkedIn, GitHub, YouTube); a hairline-topped fine-print row: "© <year> Thiago Parisotto" (year set by JS) and "Made with Swift ♥" (heart in `#ff453a`).

---

## Interactions & Behavior
- **Smooth scroll:** `html { scroll-behavior: smooth; scroll-padding-top: calc(56px + 24px); }` so anchored sections clear the fixed header.
- **Theme toggle:** Toggles `data-theme="light|dark"` on `<html>`. On load: read `localStorage["tp-theme"]`; if absent, follow `prefers-color-scheme`. Also updates the `<meta name="theme-color">`. Live-follows the OS only while the user hasn't made an explicit choice.
- **Mobile menu:** Hamburger toggles `.open` on the full-screen `.mobile-menu` (translucent blur panel); locks body scroll; closes on link click, Escape, or resize > 900px. Manage `aria-expanded`.
- **Scroll reveal:** Elements with `.reveal` start hidden **only** when `<html>` has class `js` (added by JS) — so the page is never blank if JS fails. Revealed by `IntersectionObserver` (adds `.in`), with **fallbacks**: a `revealInView()` bounding-box check on scroll/resize/load plus a 1400ms safety timer. `.reveal-d1/-d2/-d3` add 0.08/0.16/0.24s `transition-delay` for stagger. Transition: opacity + `translateY(28px)→0` over 0.8s. Respect `prefers-reduced-motion` (show instantly, no transforms).
- **Carousel:** Prev/next call `scrollBy({ left: ±(slideWidth+20), behavior: smooth })`; arrows disable at start/end based on `scrollLeft` vs `scrollWidth - clientWidth`. Native touch/trackpad swipe works via overflow scroll-snap.
- **Active nav:** An `IntersectionObserver` (rootMargin `-45% 0 -50% 0`) highlights the current section's nav link (`color: var(--text)`).
- **Hover states:** Buttons/cards lift (`translateY(-2…-6px)`) with deeper shadows; arrow icons nudge; social buttons gain accent color + border.

## State Management
Minimal — no framework state required. Conceptually:
- `theme: 'light' | 'dark'` — persisted to `localStorage`, mirrored on `<html data-theme>`.
- `mobileMenuOpen: boolean` — toggles panel + body scroll lock.
- `carousel.scrollLeft` — drives arrow disabled states.
- Reveal "seen" set — managed by IntersectionObserver `unobserve` after first reveal.
No data fetching. YouTube videos load via iframe embeds.

## Design Tokens
All defined as CSS custom properties in `styles.css` (`:root` for light, `[data-theme="dark"]` overrides).

**Accent**
- `--accent: #0A84FF` (iOS blue)
- `--accent-2: #6E5CFF`
- `--accent-grad: linear-gradient(120deg, #0A84FF 0%, #6E5CFF 60%, #BF5AF2 100%)`

**Light theme**
- bg `#fbfbfd` · bg-elev `#ffffff` · surface `#ffffff` · surface-2 `#f5f5f7`
- text `#1d1d1f` · text-2 `#6e6e73` · text-3 `#86868b`
- border `rgba(0,0,0,0.08)` · border-strong `rgba(0,0,0,0.14)` · chip-bg `rgba(0,0,0,0.045)`
- header-bg `rgba(251,251,253,0.72)`

**Dark theme**
- bg `#000000` · bg-elev `#0c0c0e` (section bands use `#060608`) · surface `#16161a` · surface-2 `#1c1c1f`
- text `#f5f5f7` · text-2 `#a1a1a6` · text-3 `#86868b`
- border `rgba(255,255,255,0.10)` · border-strong `rgba(255,255,255,0.18)` · chip-bg `rgba(255,255,255,0.07)`
- header-bg `rgba(8,8,10,0.66)`

**Status colors:** green (current/online) `#34c759`; heart `#ff453a`.

**Typography**
- Sans: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif`
- Mono (eyebrows, dates, meta): `ui-monospace, "SF Mono", "SFMono-Regular", Menlo, Monaco, monospace`
- Base line-height 1.5; body `letter-spacing: -0.01em`; headings tighten to `-0.02 … -0.04em`. Use `text-wrap: balance` on titles, `pretty` on body.
- Fluid scales: section title `clamp(30px,4.4vw,52px)/700`; lead `clamp(17px,2vw,21px)`; eyebrow 13px mono uppercase `letter-spacing:.04em` (with a 18px×1.5px accent rule before the text via `::before`).

**Radius:** sm 12px · default 20px · lg 28px · pills `980px` · brand mark 8px · app icon 18px · hero photo 32px.

**Shadows (light):**
- sm `0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)`
- md `0 4px 16px rgba(0,0,0,.06), 0 16px 40px rgba(0,0,0,.08)`
- lg `0 12px 32px rgba(0,0,0,.10), 0 32px 80px rgba(0,0,0,.12)`
- Primary button glow: `0 6px 20px rgba(10,132,255,.35)` (→ `.45` on hover)
- (Dark theme uses heavier black-alpha equivalents — see `:root`/dark block.)

**Layout / spacing:** content max-width **1120px**, 24px gutters (18px ≤560px). Section vertical padding `clamp(72px,11vw,140px)`. Standard easing `cubic-bezier(0.22,0.61,0.36,1)`. Primary breakpoint **900px** (nav→hamburger, grids→1col); minor at **560px**.

**Focus:** visible ring `outline: 2.5px solid var(--accent); outline-offset: 3px`. Keep it.

## Assets
- `assets/thiago.jpeg` — hero portrait (Apple Park rainbow arch); also used as the first events-carousel slide. Provided in this bundle.
- **App icons:** Code the Beat and Chroma Knight are **hot-linked from Apple's CDN** (`is1-ssl.mzstatic.com/.../256x256bb.png`) in `Portfolio.html`. For production, download local copies and reference them from `assets/`.
- **Pom: Kitty Timer icon** — not available at build time; rendered as a peach→pink gradient square with a "P". Replace with the real icon (`assets/pom.png`) and swap the placeholder `<span class="project-icon">` for an `<img>`.
- **YouTube channel avatar** — placeholder (YouTube glyph). Replace with a real `assets/yt-avatar.jpg`.
- **Event photos** — placeholders (striped tiles). Replace each `.slide`'s `.slide-ph` with an `<img>`.
- **Icons:** all UI icons are inline SVG (LinkedIn, GitHub, YouTube, sun/moon, hamburger, arrows, location pin, mail, trophy/seal). No icon library dependency; the brief suggested Lucide — substitute Lucide equivalents if the codebase already uses it.
- **Fonts:** none bundled — relies on the system SF Pro stack.

**Content/links** (verify before launch): LinkedIn `https://www.linkedin.com/in/thiago-parisotto/` · GitHub `https://github.com/tpdias` · YouTube `https://www.youtube.com/@thiagoparisotto` · Email `thiagoparisotto@icloud.com`. App Store + Scholar URLs are in the markup. Embedded video IDs: `Lef7016477Q`, `ctRsAtfsDzs`, `FrYNSGudS1A`.

## Files
- `Portfolio.html` — full page markup (sections, inline SVG icons, embeds). `<!-- TODO -->` comments mark every placeholder to replace.
- `styles.css` — design system + all section styles, light/dark, responsive, reduced-motion.
- `app.js` — theme toggle, mobile menu, scroll reveal (with fallbacks), carousel, active-nav spy, footer year. Vanilla, no dependencies.
- `assets/thiago.jpeg` — hero/portrait image.

> Tip for the implementer: componentize per section (Header, Hero, About, Challenge, Projects, Timeline, EventsCarousel, YouTube, Footer), lift the tokens above into your theme system, and keep the scroll-reveal as a small reusable hook/util with the same fail-safe behavior (visible by default).
