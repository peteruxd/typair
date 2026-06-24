# Product Requirements Document: TyPair

## 1. Executive Summary

TyPair is a single-page interactive typography workspace that lets designers and developers compute mathematical type scales, pair Google Fonts for headers and body text, preview the hierarchy on real shadcn UI blocks, and export production-ready CSS/Tailwind/JSON tokens — all without leaving the browser. Inspired by Type-Scale.com, Coolors, and shadcn/ui, it fills the market gap of no existing tool combining scale calculation, font pairing, live shadcn component preview, responsive dual viewport configuration, and multi-format code export in one workspace.

### Key Goals
- Deliver a frictionless type scaling experience (landing page to CSS tokens in <30 seconds)
- Support both Designer and Developer workflows with a split-screen Hybrid Canvas (Option C)
- Achieve viral adoption via shareable URL state (Coolors pattern)
- Enable one-click copy export for CSS Custom Properties, Tailwind v3/v4, Style Dictionary JSON
- Render the configured type scale on real shadcn UI blocks as the default preview (full page layout with navbar, hero, cards, footer)

### Success Metrics
| Metric | Target |
|--------|--------|
| Time from page load to first CSS export | < 30s for new users |
| Lock & Roll interactions per session | > 5 (engagement signal) |
| Shareable URL generation rate | > 15% of sessions |
| Export copy-to-clipboard conversions | > 40% of sessions |
| Lighthouse Performance score | > 90 |
| WCAG compliance | AA minimum, AAA for scale preview text |
| shadcn UI preview engagement | > 50% of sessions toggle between Full Layout and Waterfall |

---

## 2. User Personas

### Persona 1: Taylor — The Product Designer

| Attribute | Detail |
|-----------|--------|
| **Role** | Product Designer at a B2B SaaS startup |
| **Demographics** | 28–40, design degree or self-taught, uses Figma daily |
| **Goals** | Establish a consistent typography system for a new product; experiment with font pairings visually before committing to a design decision |
| **Pain Points** | Juggling Type-Scale.com for scale math, Google Fonts for browsing, and Figma for previewing — too many tabs; no way to see how a scale looks on real UI components before coding |
| **User Journey** | 1. Opens TyPair → 2. Selects "Perfect Fourth" ratio → 3. Searches and locks "Playfair Display" for headers → 4. Rolls through body font options → 5. Adjusts mobile base size in Dual Viewport panel → 6. Copies CSS variables → 7. Shares the URL with engineering for handoff |

### Persona 2: Alex — The Frontend Engineer

| Attribute | Detail |
|-----------|--------|
| **Role** | Senior Frontend Engineer at an agency |
| **Demographics** | 25–45, CS background, works in Next.js + Tailwind daily |
| **Goals** | Generate precise, production-ready typography tokens without writing math by hand; integrate fonts with `next/font` and generate Tailwind config extensions |
| **Pain Points** | Manually computing `clamp()` values; converting between px/rem; copying from separate tools into the codebase |
| **User Journey** | 1. Opens TyPair → 2. Sets base size to 18px → 3. Selects "Major Third" → 4. Picks "Inter" for body, "Geist" for headers → 5. Switches to Code Export tab → 6. Copies Tailwind v4 `@theme` block → 7. Pastes into `app.css` — done |

### Persona 3: Jordan — The Design System Lead

| Attribute | Detail |
|-----------|--------|
| **Role** | Design Systems Lead at a mid-market tech company |
| **Demographics** | 30–50, hybrid design/engineering background, manages component library |
| **Goals** | Standardize typography tokens across multiple products; validate scales on desktop and mobile before publishing design tokens |
| **Pain Points** | Coordinating type scales across teams; no easy way to A/B test scales on real component mockups; manual token sync between Figma and code |
| **User Journey** | 1. Opens TyPair → 2. Shares URL with team for collaborative review → 3. Configures desktop (16px, Perfect Fourth) and mobile (14px, Major Third) scales → 4. Views the hierarchy waterfall → 5. Exports Style Dictionary JSON → 6. Commits tokens to the design system repo |

---

## 3. Feature Specifications

### F1: Interval-Based Scale Calculator

| Attribute | Detail |
|-----------|--------|
| **Description** | Dropdown selector with musical/geometric type scale intervals and a manual custom ratio input. Computes all scale steps from a user-defined base size. |
| **User Story** | "As a designer, I want to select a typographic interval (e.g., Perfect Fourth) and see the full computed scale instantly, so I don't have to do the math myself." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Dropdown includes: Minor Second (1.067), Major Second (1.125), Minor Third (1.2), Major Third (1.25), Perfect Fourth (1.333), Augmented Fourth (1.414), Perfect Fifth (1.5), Golden Ratio (1.618), Custom
- [ ] Custom ratio input accepts numeric values with 3 decimal precision
- [ ] Base size input (default 16px) accepts px values, updates scale in real-time
- [ ] Number of scale steps up (above base, toward h1) adjustable: 1–6
- [ ] Number of scale steps down (below base, toward caption) adjustable: 0–3
- [ ] All computed values display in px and rem simultaneously
- [ ] Computed values also show line-height (auto-calculated: 1.5x for body, 1.2x for display) and letter-spacing (tighter for larger sizes)
- [ ] Scale recalculates on every input change without page reload

---

### F2: Dual Font Controller (Header + Body)

| Attribute | Detail |
|-----------|--------|
| **Description** | Independent searchable font selectors for Header and Body fonts using shadcn Popover + Command combobox, loading the full Google Fonts catalog dynamically. |
| **User Story** | "As a designer, I want to search and preview fonts in real-time from the Google Fonts catalog, so I can find the perfect pairing without leaving the tool." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Header Font selector with search/filter (shadcn Command combobox)
- [ ] Body Font selector with search/filter (shadcn Command combobox)
- [ ] Fonts load from Google Fonts CSS API with `&display=swap`
- [ ] Font list cached in localStorage with daily TTL refresh
- [ ] Each selector shows a preview of the font name in its own typeface
- [ ] Selected fonts apply immediately to the preview canvas
- [ ] Both selectors support variable font axis selection (weight, width, optical size)
- [ ] Empty state: "Search 1500+ Google Fonts..." placeholder text

---

### F3: Lock & Roll System

| Attribute | Detail |
|-----------|--------|
| **Description** | Lock icons next to each font selector. Lock one font, press Space/button to cycle through complementary pairings for the unlocked font. First typography tool to apply Coolors-style exploration UX. |
| **User Story** | "As a designer, I want to lock my header font and rapidly cycle through body font options, so I can discover unexpected pairings quickly." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Lock icon (Lucide `Lock`/`Unlock`) toggles per font selector
- [ ] "Roll" button (or Spacebar shortcut) cycles the unlocked font to the next complementary option
- [ ] Roll uses a curated compatibility algorithm (serif ↔ sans-serif contrast, x-height matching)
- [ ] Visual feedback: lock icon fills when locked, smooth font transition on roll
- [ ] Keyboard shortcut: `L` to toggle lock on active font, `Space` to roll
- [ ] Both fonts can be locked simultaneously (freezes the pairing)
- [ ] Tooltip on hover explains the interaction

---

### F4: Responsive Modifier Configurator (Dual Viewport)

| Attribute | Detail |
|-----------|--------|
| **Description** | A panel that lets users configure and visualize distinct base font sizes and scale multipliers for desktop vs. mobile simultaneously. Two viewport frames update in real-time from one control panel. |
| **User Story** | "As a design system lead, I want to configure separate type scales for desktop and mobile, so my typography works perfectly at both breakpoints." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Desktop base size input (default 16px)
- [ ] Mobile base size input (default 14px)
- [ ] Desktop scale ratio selector (independent of mobile)
- [ ] Mobile scale ratio selector (independent of desktop)
- [ ] Two preview frames side-by-side showing Desktop (1200px) and Mobile (375px) viewports
- [ ] Desktop and Mobile scales update independently based on their respective controls
- [ ] Toggle to "Sync" desktop/mobile controls (changes apply to both)
- [ ] Responsive toggle in preview canvas header showing current viewport width

---

### F5: Interactive Visual Hierarchy Waterfall (Toggleable View)

| Attribute | Detail |
|-----------|--------|
| **Description** | A vertical stack displaying the full type scale from caption/text up through h1–h6. Each step labeled with name, px, rem, line-height, letter-spacing, and weight. Toggled from the default shadcn UI preview via a "Hierarchy Waterfall" switch. Uses shadcn Table or clean semantic divs. |
| **User Story** | "As a frontend engineer, I want to see every typography step with its computed values, so I can verify the hierarchy before exporting tokens." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Displays each scale step as a row: label, sample text, px, rem, line-height, letter-spacing, weight
- [ ] Steps ordered from smallest (caption) to largest (h1/display)
- [ ] Each step renders sample text in the selected header or body font accordingly
- [ ] Computed values update in real-time when scale/ratio changes
- [ ] Responsive: waterfall adapts to the active viewport frame (desktop/mobile)
- [ ] Selected font weight and line-height sliders affect all steps
- [ ] WCAG AA/AAA contrast badge per step (using simulated text color on current background)

---

### F6: Live shadcn UI Preview (Default Canvas)

| Attribute | Detail |
|-----------|--------|
| **Description** | The right pane defaults to a full shadcn component page layout rendered with the configured type scale and fonts. Includes real shadcn UI blocks (navbar, hero, feature cards, blog excerpt, footer) so users see how their type system behaves across actual UI surfaces. A toggle switches between "Full Layout" (default) and "Hierarchy Waterfall" (tabular step view). |
| **User Story** | "As a product designer, I want to see my selected fonts and scale applied to real shadcn UI blocks, so I can visualize how the typography will look in production before writing any code." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Right pane shows a full page layout by default: top nav bar, hero section, feature cards grid, blog excerpt card, and footer
- [ ] Every shadcn UI block uses the configured header/body fonts and scale steps
- [ ] Blocks use actual shadcn components: `NavigationMenu`, `Card`, `Button`, `Badge`, `Avatar`, `Table`, `Input`, `Tabs`
- [ ] Toggle button to switch between "Full Layout" and "Hierarchy Waterfall" views
- [ ] Waterfall view displays the detailed step table (see F5)
- [ ] Preview canvas width toggle (Desktop 1200px / Mobile 375px / Fluid)
- [ ] All content text is editable in the control panel (custom preview text input)
- [ ] Smooth layout transitions via framer-motion when fonts/scale change
- [ ] Layout re-flows correctly at both Desktop and Mobile viewport widths

---

### F7: Code Export Panel

| Attribute | Detail |
|-----------|--------|
| **Description** | A shadcn Tabs interface generating copy-pasteable CSS custom properties, Tailwind v3 config, Tailwind v4 @theme, and Style Dictionary JSON. One-click "Copy to Clipboard" per format. |
| **User Story** | "As a frontend engineer, I want to copy production-ready typography tokens for my framework, so I can skip manual conversion and avoid typos." |
| **Priority** | High |

**Acceptance Criteria:**
- [ ] Four export tabs: CSS Custom Properties, Tailwind v3, Tailwind v4 @theme, Style Dictionary JSON
- [ ] Each tab shows a formatted code block with syntax highlighting
- [ ] "Copy to Clipboard" button per format with toast confirmation ("Copied!")
- [ ] CSS export includes: `--font-family-heading`, `--font-family-body`, `--font-size-{step}`, `--line-height-{step}`, `--letter-spacing-{step}`
- [ ] Tailwind v3 export: `theme.extend.fontSize` config object
- [ ] Tailwind v4 export: `@theme` block with font-size scale
- [ ] JSON export: flat design tokens object
- [ ] Exports update automatically when scale configuration changes
- [ ] "Download all" button exports a `.zip` or concatenated file

---

### F8: URL State Sharing

| Attribute | Detail |
|-----------|--------|
| **Description** | All workspace state encoded in URL query parameters. Share a URL, recipient sees exact same configuration. No backend required. |
| **User Story** | "As a design system lead, I want to share my type configuration with a teammate via URL, so we're looking at the exact same setup without screenshots." |
| **Priority** | Medium |

**Acceptance Criteria:**
- [ ] All config params serialized to URL query string on every change
- [ ] Params include: baseSize, ratio, steps, headerFont, bodyFont, headerWeight, bodyWeight, viewportWidth, darkMode
- [ ] URL updates via `history.replaceState` without page reload (debounced 500ms)
- [ ] Page load reads URL params and restores full state
- [ ] Invalid/partial params fall back to sensible defaults
- [ ] "Copy Share Link" button copies the current URL to clipboard

---

### F9: Dark/Light Mode

| Attribute | Detail |
|-----------|--------|
| **Description** | Strict light/dark mode system using Radix/shadcn neutral palettes (zinc/slate). Synced to system preference by default, toggleable via header button. |
| **User Story** | "As a developer, I want the tool to respect my system dark mode preference, so I can work comfortably at night." |
| **Priority** | Medium |

**Acceptance Criteria:**
- [ ] Default: follows `prefers-color-scheme` media query
- [ ] Manual toggle button in header (Sun/Moon icons via Lucide)
- [ ] All UI components use CSS variables (`bg-background`, `text-foreground`, etc.)
- [ ] Smooth transition between modes (CSS `transition` on background/color)
- [ ] Selection persists in URL state for link sharing

---

## 4. Technical Requirements

### Performance Benchmarks
| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.0s |
| Time to Interactive | < 3.0s |
| Font switch latency | < 300ms perceived (font-display: swap) |
| Bundle size (JS initial) | < 150KB gzipped |
| Lighthouse Performance | > 90 |

### Responsive Breakpoints
| Breakpoint | Target Devices |
|------------|---------------|
| 375px | Mobile (preview canvas) |
| 768px | Tablet (tool itself usable) |
| 1024px | Desktop min |
| 1200px | Desktop default preview |
| 1440px+ | Large desktop |

### Accessibility Standards
- WCAG 2.2 AA minimum across all UI
- WCAG AAA for scale preview text (contrast ratio ≥ 7:1)
- All interactive elements keyboard-navigable with visible focus rings
- Semantic HTML structure (landmarks, headings hierarchy)
- ARIA labels on all icon-only buttons
- Screen reader announcements for dynamic content changes (live regions)

### Browser Support
| Browser | Support |
|---------|---------|
| Chrome (latest 2) | Full |
| Firefox (latest 2) | Full |
| Safari (latest 2) | Full |
| Edge (latest 2) | Full |
| Chrome Android | Full |
| Safari iOS | Full |

### Google Fonts API Integration
- Endpoint: `https://fonts.googleapis.com/css2?family=...`
- Preconnect to `fonts.googleapis.com` + `fonts.gstatic.com`
- Use `&display=swap` for non-blocking font loading
- Cache font list response in localStorage (24h TTL)
- Support variable fonts via axis syntax (`:wght@100..900`)
- Fallback: system font stack if Google Fonts is unreachable

---

## 5. Out of Scope (MVP)

| Item | Reason |
|------|--------|
| User authentication / accounts | Frictionless utility — no signup required |
| Team collaboration / multi-user | Single-player tool for MVP; URL sharing is the collaboration layer |
| Backend API / database | All state lives in URL and React state; no persistence layer needed |
| Figma plugin | Future scope after MVP validates the core tool |
| VS Code extension | Future scope |
| AI-generated font pairings | "Smart Roll" is a nice-to-have; MVP uses curated static pairings |
| Custom font upload (non-Google) | Google Fonts catalog covers >1500 families; custom upload is edge case |
| Animations beyond layout transitions | Heavy motion work is de-prioritized for MVP |
| E-commerce / payment processing | Not applicable — utility app is free |
| Blog / marketing pages | Single-page app only; content pages are post-MVP |
| Self-hosted font export | All exports use Google Fonts CDN URLs; self-hosting instructions can be documented post-MVP |

---

## 6. Open Questions & Assumptions

| # | Question | Status |
|---|----------|--------|
| 1 | Should the tool support custom font upload (non-Google Fonts) in MVP? | Assumption: No — 1500+ Google Fonts is sufficient for MVP |
| 2 | Should we pre-define "curated pairings" or let the Lock & Roll generate them algorithmically? | Assumption: Start with 50–80 curated pairings; algorithmic Roll is post-MVP |
| 3 | What is the default accent color — emerald or electric blue? | Assumption: Emerald (vibrant but professional, works with both light/dark) — needs stakeholder confirmation |
| 4 | Should the waterfall scale show actual font family rendering or just styled system fonts? | Assumption: Actual Google Fonts rendering (this is the core value prop) |
| 5 | Should component previews include interactive form elements styled with the scale? | Assumption: Yes for the Dashboard widget; inputs and buttons should reflect the type scale |
| 6 | What Tailwind CSS version should the export target? | Assumption: Both v3 + v4 — user picks via tab. Needs confirmation if v4 `@theme` syntax is stable enough. |
| 7 | Should the tool surface computed `clamp()` values for fluid typography? | Assumption: Yes — fluid mode generates `clamp(min, preferred, max)` for each step. Toggle between fixed and fluid in the export panel. |
| 8 | What is the initial font pairing set for Lock & Roll? | Assumption: 50 hand-selected pairs covering Serif+Sans, Display+Sans, Sans+Sans, Mono+ Sans combinations. |
| 9 | Which shadcn UI blocks should the default full-page preview include? | Assumption: NavBar (with nav links), Hero (headline + subtitle + CTA button), Feature Cards (3-column grid with icon/title/description), Blog Excerpt (card with image placeholder, title, preview text), Footer (links + copyright). Deferred to Designer and Architect for final block selection. |
