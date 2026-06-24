# System Architecture: TyPair

## 1. Technology Stack

| Category | Technology | Rationale |
|----------|-----------|-----------|
| Framework | Next.js 16 (App Router) | React Server Components for shell, Client Components for interactive workspace; built-in font optimization via `next/font` |
| Language | TypeScript 5 | Type safety across all components, props, and API routes |
| Styling | Tailwind CSS v4 + `@theme` | CSS variable-driven theming for light/dark mode; shadcn/ui compatible |
| UI Components | shadcn/ui (Radix primitives) | Accessible, unstyled primitives: Select, Slider, Popover, Command, Tabs, Button, Switch, Card, Input |
| Icons | lucide-react | Consistent icon library matching design system spec |
| State Management | React hooks (`useReducer`) + nuqs | URL-synced state for shareability; no external state library needed for single-page utility |
| Animations | framer-motion | Layout transitions on font/scale changes; micro-interactions |
| Font Loading | Google Fonts CSS API v2 | `font-display: swap` for non-blocking; localStorage cache with 24h TTL |
| HTTP/Caching | @tanstack/react-query | Google Fonts API caching and pre-fetching |
| Notifications | react-hot-toast | Copy-to-clipboard confirmations |
| Package Manager | npm | Standard for Next.js ecosystem |

## 2. Project Structure

```
Frontend/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout: Geist font, metadata, theme provider
│   │   ├── page.tsx                 # Main workspace page (single-page app)
│   │   └── globals.css              # Tailwind v4 + shadcn theme variables
│   ├── components/
│   │   ├── ui/                      # shadcn/ui primitives (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── command.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── input-group.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── textarea.tsx
│   │   ├── layout/                  # Workspace layout components
│   │   │   ├── workspace.tsx        # Main split-screen container
│   │   │   ├── left-panel.tsx       # Left control panel (dark)
│   │   │   └── right-panel.tsx      # Right preview canvas (light)
│   │   ├── controls/               # Control panel components
│   │   │   ├── scale-calculator.tsx # Interval selector + base size + slider
│   │   │   ├── font-controller.tsx  # Dual font selector + lock/roll
│   │   │   ├── viewport-config.tsx  # Desktop/mobile dual config
│   │   │   └── sync-toggle.tsx      # Desktop/mobile sync toggle
│   │   ├── preview/                # Preview canvas components
│   │   │   ├── preview-canvas.tsx   # Canvas container with viewport toggle
│   │   │   ├── hierarchy-waterfall.tsx # Tabular scale step display
│   │   │   └── ui-preview/         # Full shadcn UI page blocks
│   │   │       ├── navbar.tsx
│   │   │       ├── hero-section.tsx
│   │   │       ├── feature-cards.tsx
│   │   │       ├── blog-excerpt.tsx
│   │   │       └── footer.tsx
│   │   ├── export/                 # Code export components
│   │   │   ├── code-export.tsx      # Tabbed export panel
│   │   │   └── export-format.tsx    # Single format display + copy
│   │   └── shared/                 # Shared UI components
│   │       ├── theme-toggle.tsx     # Dark/light mode toggle
│   │       └── url-share.tsx        # Copy share link button
│   ├── lib/
│   │   ├── utils.ts                # shadcn cn() helper
│   │   ├── scale.ts                # Type scale computation engine
│   │   ├── fonts.ts                # Google Fonts API client + cache
│   │   ├── pairings.ts             # Curated font pairings dataset
│   │   ├── export.ts               # Code generation (CSS, Tailwind, JSON)
│   │   └── url.ts                  # URL state serialization
│   └── hooks/
│       ├── use-scale.ts            # Scale state + computation
│       ├── use-fonts.ts            # Font loading + search
│       ├── use-pairings.ts         # Lock & Roll pairing logic
│       ├── use-viewport.ts         # Desktop/mobile config state
│       └── use-url-state.ts        # nuqs-based URL sync
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## 3. Component Architecture

### Layout Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Workspace` | none | Root split-screen: left panel (300px) + right panel (fluid). Manages workspace-level state via React Context. |
| `LeftPanel` | none | Dark control panel container. Houses ScaleCalculator, FontController, ViewportConfig sections with dividers. |
| `RightPanel` | `viewportWidth: 'desktop' \| 'mobile' \| 'fluid'` | Preview canvas container. Toggles between UI preview and hierarchy waterfall. |

### Control Components

| Component | Props | Description |
|-----------|-------|-------------|
| `ScaleCalculator` | none | Interval Select dropdown, base size Input, steps up/down controls, ratio Slider. All controlled via shared state. |
| `FontController` | none | Header + Body font Comboboxes (Popover + Command), lock toggles, Roll button with Spacebar handler. |
| `ViewportConfig` | none | Desktop base size + ratio, Mobile base size + ratio, independent sliders. Sync toggle. |
| `SyncToggle` | `sync: boolean, onSyncChange: fn` | Toggle to link desktop/mobile controls. When active, mobile mirrors desktop values. |

### Preview Components

| Component | Props | Description |
|-----------|-------|-------------|
| `PreviewCanvas` | `mode: 'layout' \| 'waterfall'` | Container that conditionally renders HierarchyWaterfall or shadcn UI preview blocks. |
| `HierarchyWaterfall` | `scale: ScaleStep[]` | Renders each scale step as a row: label, sample text, px, rem, line-height, letter-spacing, weight, contrast badge. |
| `Navbar` | `fonts, scale` | Full-width nav with Logo, nav links, CTA button — rendered with configured header font. |
| `HeroSection` | `fonts, scale` | Headline + subheadline + CTA buttons. Headline uses header font at h1 scale. |
| `FeatureCards` | `fonts, scale` | 3-column grid of feature cards (icon, title, description) using content from copy.md. |
| `BlogExcerpt` | `fonts, scale` | Blog post cards with category tag, title, excerpt. |
| `Footer` | `fonts, scale` | Tagline, link columns, legal text. |

### Export Components

| Component | Props | Description |
|-----------|-------|-------------|
| `CodeExport` | `scale: ScaleStep[], fonts: FontPairing` | Tab bar (CSS, Tailwind v3, Tailwind v4, JSON) + active code block. Updates on scale change. |
| `ExportFormat` | `code: string, format: string` | Syntax-highlighted code block with Copy button. Shows toast on copy. |

### Shared Components

| Component | Props | Description |
|-----------|-------|-------------|
| `ThemeToggle` | none | Sun/Moon icon button. Toggles `.dark` class on `<html>`. Persists via URL state. |
| `UrlShare` | none | "Copy Share Link" button. Copies current URL (with all state params) to clipboard. |

## 4. State Architecture

### State Shape

```typescript
interface WorkspaceState {
  scale: {
    baseSize: number;          // px, default 16
    ratio: number;             // 1.067–1.618
    stepsUp: number;           // 1–6, default 4
    stepsDown: number;         // 0–3, default 1
  };
  desktopScale: {
    baseSize: number;          // px, default 16
    ratio: number;             // default 1.333
  };
  mobileScale: {
    baseSize: number;          // px, default 14
    ratio: number;             // default 1.2
  };
  fonts: {
    header: string | null;     // Google Fonts family name
    body: string | null;       // Google Fonts family name
    headerLocked: boolean;
    bodyLocked: boolean;
    headerWeight: number;      // 100–900
    bodyWeight: number;        // 100–900
  };
  viewport: {
    mode: 'desktop' | 'mobile' | 'fluid';
    sync: boolean;             // sync desktop/mobile controls
  };
  preview: {
    mode: 'layout' | 'waterfall';
    customText: string;        // custom preview text input
  };
  theme: 'light' | 'dark' | 'system';
}
```

### State Management Flow

```
URL Query Params (nuqs)
        ↕
   useReducer (workspace state)
        ↕
   React Context Provider
        ↕
   Individual hook consumers
        ↕
   Component renders
```

- **Source of truth**: React `useReducer` holds the workspace state
- **URL sync**: `nuqs` watches state changes and syncs to URL query params via `history.replaceState` (debounced 500ms)
- **On page load**: URL params are read and restored; invalid/missing params fall back to defaults
- **Share**: Full state encoded in URL — recipient sees identical workspace

### Data Flow for Key Actions

**Scale ratio change:**
1. User selects "Perfect Fourth" from Select dropdown
2. `useScale` hook dispatches `SET_RATIO` action
3. Reducer updates `scale.ratio` to 1.333
4. `nuqs` syncs new ratio to URL
5. Scale computation engine recalculates all steps
6. HierarchyWaterfall re-renders with new computed values
7. shadcn UI preview blocks re-render with new font sizes

**Font roll:**
1. User locks header font (toggle lock icon → `fonts.headerLocked = true`)
2. User clicks "Roll" button (or presses Space)
3. `usePairings` hook checks which font is unlocked
4. If body is unlocked: pick next body font from curated pairings dataset
5. Dispatch `SET_BODY_FONT` action
6. Google Fonts CSS loads the new body font via `font-display: swap`
7. framer-motion animates the font transition in preview blocks

**Code export copy:**
1. User clicks "Copy" button on CSS tab
2. `navigator.clipboard.writeText()` copies the generated CSS
3. `react-hot-toast` shows "Copied!" confirmation
4. The export code is pre-computed by `lib/export.ts` from current scale state

## 5. API Design

This application is primarily client-side. Only one API endpoint is needed:

### GET /api/fonts

Proxies the Google Fonts CSS API to support server-side font list aggregation.

**Response:**
```json
{
  "items": [
    {
      "family": "Inter",
      "variants": ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
      "subsets": ["latin", "latin-ext"],
      "category": "sans-serif",
      "variable": true,
      "axes": [
        { "tag": "wght", "min": 100, "max": 900 }
      ]
    }
  ]
}
```

**Implementation:** A server-side function in `src/lib/fonts.ts` that:
1. Fetches the Google Fonts API on the server (avoids CORS issues)
2. Caches the response in `localStorage` with 24h TTL
3. Returns the parsed and deduplicated font list

**No other API endpoints needed** — the app is a fully client-side utility. All state lives in URL params.

## 6. Scale Computation Engine

Located in `src/lib/scale.ts`:

```typescript
// Musical intervals
const INTERVALS = {
  'Minor Second': 1.067,
  'Major Second': 1.125,
  'Minor Third': 1.2,
  'Major Third': 1.25,
  'Perfect Fourth': 1.333,
  'Augmented Fourth': 1.414,
  'Perfect Fifth': 1.5,
  'Golden Ratio': 1.618,
};

interface ScaleStep {
  name: string;            // "h1", "h2", "base", "sm", "xs", "caption"
  step: number;            // step index (positive = above base, negative = below)
  px: number;              // computed px value
  rem: number;             // computed rem value (relative to 16px base)
  lineHeight: number;      // auto: 1.2 for display, 1.5 for body
  letterSpacing: number;   // tighter for larger sizes
  fontWeight: number;      // configurable
  sample: string;          // sample text rendered in the selected font
}

function computeScale(
  baseSize: number,
  ratio: number,
  stepsUp: number,
  stepsDown: number
): ScaleStep[] { ... }
```

**Step naming convention:**
| Step | Name | Example (16px, 1.333) |
|------|------|----------------------|
| +4 | h1 | 50.52px |
| +3 | h2 | 37.90px |
| +2 | h3 | 28.43px |
| +1 | h4 | 21.33px |
| 0 | base | 16px |
| -1 | sm | 12px |
| -2 | xs | 9px |

## 7. Dependencies

```json
{
  "dependencies": {
    "next": "^16.2.9",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^1.21.0",
    "framer-motion": "^12.41.0",
    "nuqs": "^2.8.9",
    "react-hot-toast": "^2.6.0",
    "@tanstack/react-query": "^5.101.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^16.2.9"
  }
}
```

## 8. Performance Considerations

| Concern | Strategy |
|---------|----------|
| Font loading | `font-display: swap` + preconnect to Google Fonts CDN; load fonts on demand, not on mount |
| URL sync | Debounce URL updates 500ms to avoid excessive history entries |
| Scale computation | Memoized via `useMemo` — only recalculates when baseSize, ratio, or steps change |
| Component rendering | Client Components isolated to interactive parts; static shell uses RSC |
| Bundle size | shadcn components are tree-shakable; lucide-react supports icon-level imports |
| Layout shifts | framer-motion `AnimatePresence` for font/scale changes; fixed dimensions for preview canvas |
