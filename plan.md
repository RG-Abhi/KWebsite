# 🎨 KMIT Website — Premium Design Overhaul Plan

> **Goal**: Elevate the KMIT website from "good college site" to "the site other colleges benchmark against." This is a **design-only** plan — no structural, routing, or backend changes.

---

## Current State Audit

After scraping through trending college website designs (Stanford, MIT, University of Hull, RISD, BITS Pilani, CMR, Awwwards winners) and auditing your 8,600-line CSS codebase, here's what I found:

### ✅ What You Already Have (Strong Foundation)
- Design token system (CSS variables for colors, shadows, transitions)
- Mega-menu with glassmorphism blur
- Hero slider with progress bar and stat pills
- Bento grid "Why Choose" section with hover overlays
- Recruiter marquee with grayscale-to-color effect
- Footer with branded social buttons and geometric decos
- `prefers-reduced-motion` support
- RGB-glow animated Pay Fees button

### ❌ What's Missing (The Gap vs. Top-Tier Sites)

| Area | Current State | What Top Sites Do |
|---|---|---|
| **Button Hovers** | Simple `background` color swap + `translateY(-2px)` | Animated gradient sweeps, ripple effects, magnetic cursor pull, expanding pseudo-element fills |
| **Card Interactions** | Basic `translateY` lift + shadow bump | 3D perspective tilt, parallax layers, direction-aware reveals, staggered child animations |
| **Scroll Animations** | `ScrollReveal` exists but uses basic `fadeInUp` | Staggered cascade reveals, blur-to-focus, scale-in with rotation, text character animations |
| **Navigation Feel** | Works well but feels "static" | Active indicator slides smoothly between items, link underlines animate from center/left, hover reveals micro-icon |
| **Page Transitions** | Instant mount with simple `spaFadeIn` | Smooth cross-fade with sliding content panels, skeleton loading states |
| **Typography Motion** | Static text rendering | Counter animations on stats, typewriter effects on hero headlines, split-text reveals |
| **Cursor & Feedback** | Default browser cursor | Custom cursor dot on key sections, magnetic button pull, focus ring animations |
| **Section Dividers** | Hard background color cuts | Organic wave/curve SVG dividers, gradient mesh transitions between sections |
| **Image Treatments** | Basic `object-fit: cover` | Ken Burns on hero, reveal-mask animations, parallax depth layers |
| **Footer** | Good structure but static links | Staggered link reveals on scroll-into-view, animated social icons, gradient accent line animations |

---

## Proposed Design Changes

> Each change is designed to be **CSS-first** (no new dependencies) with **minimal JS** where interaction tracking is needed (mouse position for tilt, intersection observer for scroll).

---

### 🔴 Priority 1 — Button System Overhaul (High Impact, Low Effort)

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**1.1 — `.btn-vibrant` Sliding Fill Effect**
Replace the plain background swap with an animated pseudo-element that sweeps across the button on hover:

```css
/* Current: just changes background color */
/* New: pseudo-element slides from left, icon arrow nudges right */
.btn-vibrant {
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.btn-vibrant::before {
  content: '';
  position: absolute;
  top: 0; left: -100%; 
  width: 100%; height: 100%;
  background: linear-gradient(120deg, #c04502, #ff8533);
  transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}
.btn-vibrant:hover::before { left: 0; }
.btn-vibrant:hover i { transform: translateX(4px); }
.btn-vibrant:active { transform: scale(0.97); }
```

**1.2 — `.btn-hero-outline` Glow Border Pulse**
Add a soft glow animation on hover instead of just background fill:

```css
.btn-hero-outline:hover {
  box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1);
  border-color: #fff;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
}
```

**1.3 — `.btn-outline-navy` / `.btn-outline-navy-sec` Border Draw Effect**
Instead of instant background fill, animate the border "drawing" around the button:

```css
.btn-outline-navy {
  position: relative;
  overflow: hidden;
}
.btn-outline-navy::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 0;
  background: var(--navy);
  transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}
.btn-outline-navy:hover::after { height: 100%; }
```

**1.4 — All Buttons: Active Press Feedback**
Add satisfying "click-down" physics to every button class:

```css
.btn-vibrant:active,
.btn-hero-outline:active,
.btn-outline-navy:active,
.btn-outline-navy-sec:active,
.trending-pill-btn:active,
.spa-back-btn:active {
  transform: translateY(1px) scale(0.97);
  transition-duration: 0.08s;
}
```

---

### 🔴 Priority 2 — Card Interaction Upgrade (High Impact, Medium Effort)

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**2.1 — Explore Cards: 3D Perspective Tilt (CSS + tiny JS)**
Add perspective container and subtle rotation on hover. The JS tracks mouse position for smooth tilt.

```css
.explore-grid {
  perspective: 1200px;
}
.explore-card {
  transform-style: preserve-3d;
  will-change: transform;
}
.explore-card:hover {
  /* JS will set --rx and --ry via mousemove */
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-6px);
}
/* Inner elements get a parallax "float" */
.explore-card:hover .ec-icon {
  transform: translateZ(30px) translateY(-4px);
}
.explore-card:hover .ec-title {
  transform: translateZ(20px);
}
```

#### [NEW] Utility JS — `cardTilt.js` (~20 lines)
A tiny utility that adds `--rx` and `--ry` CSS variables on mousemove for any `.tilt-card` element. No library needed.

**2.2 — Department Cards: Image Zoom + Overlay Reveal**
Currently just lifts up. Add a color overlay that slides up from bottom with a "View Department →" CTA:

```css
.dept-card::after {
  content: 'Explore →';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 1rem;
  background: linear-gradient(to top, var(--navy) 0%, transparent 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.dept-card:hover::after {
  opacity: 1;
  transform: translateY(0);
}
```

**2.3 — Stats Bar Cards: Counter "Odometer" Wobble**
Add a subtle scale bounce when the number finishes counting up:

```css
.home-stat-block.counted .stat-num {
  animation: statPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes statPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
```

**2.4 — SPA Page Cards: Staggered Entrance**
Cards currently all appear at once. Add staggered delays:

```css
.spa-card {
  opacity: 0;
  transform: translateY(24px);
  animation: cardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.spa-card:nth-child(1) { animation-delay: 0.05s; }
.spa-card:nth-child(2) { animation-delay: 0.12s; }
.spa-card:nth-child(3) { animation-delay: 0.19s; }
.spa-card:nth-child(4) { animation-delay: 0.26s; }
.spa-card:nth-child(5) { animation-delay: 0.33s; }
.spa-card:nth-child(6) { animation-delay: 0.40s; }
@keyframes cardReveal {
  to { opacity: 1; transform: translateY(0); }
}
```

**2.5 — "Why Choose" Bento Tiles: Shimmer Highlight**
Add a diagonal light streak that sweeps across tiles on hover:

```css
.choose-tile::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255,255,255,0.08) 45%,
    rgba(255,255,255,0.15) 50%,
    rgba(255,255,255,0.08) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.7s ease;
  z-index: 1;
  pointer-events: none;
}
.choose-tile:hover::after {
  transform: translateX(100%);
}
```

---

### 🟠 Priority 3 — Navigation & Header Polish

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**3.1 — Nav Link: Animated Underline Sweep**
Replace the missing `::after` underline with a smooth expanding line from center:

```css
.nav-link::after {
  content: '';
  display: block !important;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--vibrant-accent);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}
.nav-item:hover .nav-link::after,
.nav-item.spa-active .nav-link::after {
  width: 70%;
  left: 15%;
}
```

**3.2 — Header Scroll: Subtle Shadow + Border Line**
Currently scrolled header has `box-shadow: none`. Add a refined bottom accent:

```css
.site-header.scrolled {
  box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
```

**3.3 — Mega-Menu Items: Staggered Fade-In**
Items inside the mega-panel should cascade in instead of all appearing at once:

```css
.mega-col a,
.mega-card {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
}
.nav-item:hover .mega-col a,
.nav-item:hover .mega-card {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger each child */
.mega-col a:nth-child(1), .mega-card:nth-child(1) { transition-delay: 0.02s; }
.mega-col a:nth-child(2), .mega-card:nth-child(2) { transition-delay: 0.05s; }
.mega-col a:nth-child(3), .mega-card:nth-child(3) { transition-delay: 0.08s; }
.mega-col a:nth-child(4), .mega-card:nth-child(4) { transition-delay: 0.11s; }
.mega-col a:nth-child(5), .mega-card:nth-child(5) { transition-delay: 0.14s; }
.mega-col a:nth-child(6), .mega-card:nth-child(6) { transition-delay: 0.17s; }
.mega-col a:nth-child(7), .mega-card:nth-child(7) { transition-delay: 0.20s; }
```

**3.4 — Search Dropdown: Scale-In Origin Effect**
Replace simple translateY with a scale-from-top-right origin:

```css
.search-dropdown {
  transform-origin: top right;
  transform: scale(0.92) translateY(8px);
  opacity: 0;
}
.search-dropdown.active {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

---

### 🟠 Priority 4 — Scroll Reveal System Upgrade

#### [MODIFY] [ScrollReveal.jsx](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/components/ScrollReveal.jsx)

**4.1 — Multiple Reveal Variants**
Currently all sections just fade-in-up. Add variant classes:

```css
/* Blur-to-Focus */
.reveal-blur {
  filter: blur(8px);
  opacity: 0;
  transition: filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease;
}
.reveal-blur.visible {
  filter: blur(0);
  opacity: 1;
}

/* Scale-In */
.reveal-scale {
  opacity: 0;
  transform: scale(0.92);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Slide-from-Left */
.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Slide-from-Right */
.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-right.visible {
  opacity: 1;
  transform: translateX(0);
}
```

**4.2 — Section Eyebrow: Typewriter Dash Reveal**
The `SECTION-EYEBROW` labels should have a left-side dash that expands when visible:

```css
.section-eyebrow {
  position: relative;
  padding-left: 2.5rem;
}
.section-eyebrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 2px;
  background: var(--brand-orange-text);
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}
.section-eyebrow.visible::before,
.visible .section-eyebrow::before {
  width: 2rem;
}
```

---

### 🟡 Priority 5 — Hero Section Premium Touches

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**5.1 — Hero Text: Split-Line Stagger**
Instead of the whole h1 fading in as one block, each line staggers slightly:
*(Already partially done with `fadeInUp`, enhance with clip-path reveal)*

```css
.hero-left h1 {
  background: linear-gradient(
    to right,
    #ffffff 0%,
    rgba(212, 245, 60, 0.9) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Keep fallback for older browsers */
}
```

> [!NOTE]
> This is optional — only if you want the gradient text effect seen on Stanford and MIT sites. Can keep solid white if preferred.

**5.2 — Hero Slide Transition: Crossfade + Ken Burns**
Enhance the current opacity crossfade with a subtle zoom difference:

```css
.hero-slide img {
  transform: scale(1.05);
  transition: transform 8s ease-out, opacity 1s ease;
}
.hero-slide.active img {
  transform: scale(1);
}
.hero-slide.exiting img {
  transform: scale(1.1);
  opacity: 0;
}
```

**5.3 — Hero Stat Pills: Staggered Bounce-In**

```css
.hero-stat-pill:nth-child(1) { animation-delay: 1.6s; }
.hero-stat-pill:nth-child(2) { animation-delay: 1.75s; }
.hero-stat-pill:nth-child(3) { animation-delay: 1.9s; }
.hero-stat-pill:nth-child(4) { animation-delay: 2.05s; }

.hero-stat-pill {
  animation: pillBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
@keyframes pillBounce {
  from { opacity: 0; transform: translateY(15px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

---

### 🟡 Priority 6 — Section Dividers & Visual Flow

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**6.1 — Organic Wave Dividers Between Key Sections**
Replace hard color cuts with SVG wave pseudo-elements:

```css
.welcome-section::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0;
  width: 100%; height: 60px;
  background: url("data:image/svg+xml,...wave-path...") no-repeat bottom center;
  background-size: cover;
  z-index: 2;
}
```

> [!IMPORTANT]
> The wave SVGs will be inline data URIs (tiny, ~300 bytes each). No external file requests.

**6.2 — Gradient Mesh Backgrounds for Alternating Sections**
Instead of flat `#ffffff` vs `#f8fafc`, use subtle radial gradient meshes:

```css
.placement-section {
  background: 
    radial-gradient(ellipse at 10% 20%, rgba(36,137,128,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(223,83,5,0.03) 0%, transparent 50%),
    #ffffff;
}
```

---

### 🟡 Priority 7 — Footer Interaction Polish

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**7.1 — Footer Links: Sliding Chevron + Color Transition**
Enhance the already-good chevron slide with a glow effect:

```css
.ft-link:hover {
  color: var(--lime);
  padding-left: 6px;
}
.ft-link:hover .ft-chevron {
  transform: translateX(5px);
  color: var(--lime);
  filter: drop-shadow(0 0 4px rgba(212,245,60,0.5));
}
```

**7.2 — Social Buttons: Magnetic Hover + Ring Pulse**
Add a ring animation behind social buttons on hover:

```css
.ft-social-btn::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 12px;
  border: 2px solid currentColor;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}
.ft-social-btn:hover::before {
  opacity: 0.3;
  transform: scale(1);
}
.ft-social-btn {
  position: relative;
}
```

**7.3 — Scroll-to-Top: Rotation + Bounce**

```css
.ft-scroll-top:hover {
  animation: scrollTopBounce 0.4s ease;
}
@keyframes scrollTopBounce {
  0%   { transform: translateY(0); }
  40%  { transform: translateY(-8px); }
  60%  { transform: translateY(-3px); }
  100% { transform: translateY(-3px); }
}
```

---

### 🟢 Priority 8 — Micro-Interactions & Cursor Polish

**8.1 — Recruiter Logo Cards: Brand Color Border Glow**
Currently just border turns orange. Add a subtle glow matching brand:

```css
.recruiter-logo-card:hover {
  box-shadow: 0 10px 25px rgba(10, 22, 40, 0.08),
              0 0 0 2px var(--vibrant-accent),
              0 0 20px rgba(255, 107, 0, 0.12);
}
```

**8.2 — News Items: Left Border Slide-In**

```css
.news-item {
  border-left: 3px solid transparent;
  transition: all 0.25s ease;
}
.news-item:hover {
  border-left-color: var(--brand-orange-text);
  background: rgba(255,107,0,0.02);
  padding-left: 12px;
}
```

**8.3 — Trending Cards: Image Parallax Layer**
Add a subtle counter-movement on the background image when hovering:

```css
.tr-card-img img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.tr-card:hover .tr-card-img img {
  transform: scale(1.08) translateY(-4px);
}
```

**8.4 — Interaction Bar: Icon Bounce on Hover**

```css
.ib-item:hover i {
  animation: ibBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes ibBounce {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.25); }
  100% { transform: scale(1.1); }
}
```

---

### 🟢 Priority 9 — Page Transition System

#### [MODIFY] [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css)

**9.1 — Enhanced SPA Page Transitions**
Replace the basic `spaFadeIn` with a more cinematic slide-and-fade:

```css
@keyframes spaFadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px);
    filter: blur(4px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
    filter: blur(0);
  }
}
```

**9.2 — Sub-Page Hero Banner: Parallax Scroll Header**
Add a subtle parallax depth to the SPA hero banners:

```css
.spa-hero-banner {
  position: relative;
  overflow: hidden;
}
.spa-hero-banner::before {
  content: '';
  position: absolute;
  top: -20px; right: -20px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(223,83,5,0.06) 0%, transparent 70%);
  border-radius: 50%;
  animation: floatOrb 8s ease-in-out infinite;
}
@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 10px); }
}
```

---

### 🟢 Priority 10 — Loading & Skeleton States

**10.1 — Page Loader: Branded Shimmer**
Replace the basic loader with a branded skeleton pulse:

```css
.page-loader-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Open Questions

> [!IMPORTANT]
> **Gradient Hero Text**: Should the hero `h1` use a white-to-lime gradient text fill (like Stanford/MIT style), or keep the current solid white with text-shadow? This is a significant visual identity choice.

> [!IMPORTANT]
> **3D Card Tilt**: The explore card tilt effect requires ~20 lines of JS for mouse tracking. Are you okay with adding a small utility script, or should we keep everything pure CSS (which limits tilt to a fixed angle)?

> [!IMPORTANT]
> **Wave Dividers**: Do you want organic curved SVG dividers between sections (modern Awwwards style), or prefer the current clean-cut flat transitions? Waves add visual flow but change the page rhythm.

---

## Files That Will Be Modified

| File | Changes |
|---|---|
| [index.css](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/index.css) | All CSS enhancements — buttons, cards, nav, hero, footer, scroll reveals, dividers, transitions |
| [ScrollReveal.jsx](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/components/ScrollReveal.jsx) | Add variant class support (`reveal-blur`, `reveal-scale`, `reveal-left`, `reveal-right`) |
| [HeroSlider.jsx](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/components/HeroSlider.jsx) | Add `exiting` class for enhanced slide transition |
| [StatsBar.jsx](file:///c:/Users/Sudeep/Downloads/KWebsite-main%20(2)/KWebsite-main/src/components/StatsBar.jsx) | Add `.counted` class trigger for stat pop animation |
| **[NEW]** `src/utils/cardTilt.js` | ~20 line utility for 3D perspective card tilt (if approved) |

> No new npm dependencies. No routing changes. No structural changes.

---

## Verification Plan

### Manual Verification
1. Run `npm run dev` and visually test every hover effect across all button types
2. Scroll through the homepage and verify staggered reveal animations on each section
3. Test mega-menu cascading item reveal
4. Verify hero stat pill stagger and hero text effects
5. Test card tilt on explore section (desktop only)
6. Verify all animations respect `prefers-reduced-motion`
7. Test on mobile viewport — all hover effects should degrade gracefully (no stuck states)
8. Lighthouse performance audit — animations should use only `transform` and `opacity` (compositor-friendly)

### Cross-Browser Check
- Chrome, Firefox, Safari (especially backdrop-filter support)
- iOS Safari touch behavior (no hover stuck states)

---

> [!TIP]
> **Implementation Order**: Start with Priority 1 (Buttons) — it's the highest-impact, lowest-effort change. A single CSS update that immediately makes the site feel more alive. Then move through Priority 2-10 sequentially.

---

## ?? Priority 11 � Comprehensive Mobile Adaptability Audit & Fixes (High Priority)

The recent mobile UI issues highlighted a broader problem: the codebase relies too heavily on fixed units (px, em, w) and forced column grids that break on ultra-small or dynamically sized screens (e.g., < 380px).

### Identified Mobile-Adaptability Issues
1. **Hardcoded ont-size without clamp()**:
   - index.css contains hardcoded massive fonts (e.g., ont-size: 5rem, ont-size: 3.8rem, ont-size: 3.2rem). On a 360px wide screen, a 5rem font forces horizontal layout expansion and clipping.
   - **Fix**: Convert all static large fonts in index.css to fluid typography using clamp(MIN, VAL, MAX).

2. **Dangerous 100vw Widths**:
   - Usage of max-width: 100vw; or width: 100vw; (e.g., lines 7567, 8078). If a vertical scrollbar is present, 100vw spans *under* the scrollbar on Windows/Android, causing a horizontal scrollbar to appear.
   - **Fix**: Change to width: 100% and max-width: 100%.

3. **Inflexible Grid Columns on Mobile**:
   - Several media queries for phones (max-width: 640px) force grid-template-columns: repeat(2, 1fr) !important;. For certain cards, 2 columns on a 320px screen results in cards smaller than their minimum content width, causing text overlapping and squished layouts.
   - **Fix**: Review forced 2-column mobile grids. Use uto-fill with a safe minmax(min(100%, 250px), 1fr) or fallback to 1 column below 480px.

4. **Excessive Section Paddings**:
   - Hardcoded padding: 4rem or padding: 5rem 0 on desktop that are not overridden in mobile media queries. This wastes 50-70% of a mobile screen's vertical space.
   - **Fix**: Replace static em paddings with fluid paddings: padding: clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem);.

5. **Fixed Width Elements (Tables & Cards)**:
   - min-width: 520px and fixed width: 280px declarations without scrollable wrappers.
   - **Fix**: Ensure all wide tables are wrapped in a .table-responsive div with overflow-x: auto; -webkit-overflow-scrolling: touch;. Ensure cards use width: 100%; max-width: 320px; instead of a fixed width.

### Implementation Steps
1. Audit and replace all instances of ont-size: [3-9]*rem with clamp().
2. Find and replace 100vw with 100% in context of widths.
3. Add a @media (max-width: 480px) breakpoint to stack remaining forced 2-column grids (.dept-grid, .spa-cards-grid) into 1 column.
4. Normalize padding: [4-9]*rem to use clamp() or add explicit mobile overrides.
5. Apply .table-responsive rules globally to ensure overflow-x: auto protects the viewport.

---

## ?? Priority 12 � Secondary Mobile UI Fixes (Deep Dive Follow-up)

Following the initial responsive grid fixes, deep verification has identified additional edge-case layout breaks and overlapping elements specifically on ultra-small screens (e.g., 320px wide) and tablets.

### Identified Secondary Issues
1. **Sub-Page Content Overlap (Z-Index/Padding Issue)**
   - **Problem**: On sub-pages (e.g., /about), the content .sub-page has a padding-top: 60px on mobile, which correctly clears the .site-header. However, the fixed .ticker-bar (Announcements) sits at 	op: 60px with a height of 32px. This causes the ticker to perfectly overlap and hide the first 32px of every sub-page's content.
   - **Fix**: Update the .sub-page padding to account for BOTH the header and the ticker on all viewports (e.g., Desktop: 132px, Tablet: 120px, Mobile: 92px).

2. **Hero Background Image Extreme Cropping**
   - **Problem**: The slider images (e.g., the Smart India Hackathon banner) use ackground-size: cover; background-position: center;. On a tall, narrow phone screen, it zooms tightly into the center, completely cutting off text like "Smart India Hackathon" on the edges.
   - **Fix**: Adjust ackground-position: top center; on mobile so the crucial top information (faces/text) stays visible before the sides get cropped.

3. **Search Dropdown Screen Bleeding**
   - **Problem**: The .search-dropdown has a fixed width: 320px and is absolutely positioned ight: 0 inside the header. On phones with a screen width of 320px or less (like iPhone SE), the 15px header padding pushes the search box -15px off the left side of the screen.
   - **Fix**: Modify .search-dropdown on mobile to use position: fixed, left: 0, ight: 0, width: 100%, and 	op: 92px so it securely anchors to the screen boundaries rather than its parent container.

4. **Hidden Navigation Drawer on Tablets (iPad)**
   - **Problem**: At the <1024px breakpoint, the .header-bottom-row is given height: 0; overflow: hidden; to hide the desktop menu. On certain mobile browsers (like iOS Safari), overflow: hidden can mistakenly clip position: fixed children. This causes the mobile dropdown to simply not appear when the hamburger is clicked on an iPad.
   - **Fix**: Explicitly set .header-bottom-row { overflow: visible !important; } for the <1024px breakpoint to guarantee the fixed mobile drawer can escape the collapsed parent container.

## User Review Required
Please review these four critical UI fixes. Once approved, I will implement the exact CSS values to resolve them.
