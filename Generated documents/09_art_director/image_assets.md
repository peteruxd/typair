# Image Assets — TyPair

## Overview
All visual assets for the TyPair marketing/landing page and in-app empty states. Generated as inline SVGs that render at any resolution. Assets live in `Frontend/public/images/`.

## Asset Inventory

### Hero / Landing Page

| File | Use | Dimensions |
|------|-----|------------|
| `hero-workspace.svg` | Primary hero illustration (split-screen concept) | 1200×800 |
| `logo-mark.svg` | Favicon-sized brand mark (dark bg, TP monogram) | 32×32 |
| `icon.svg` | Larger brand icon for app icon / PWA | 64×64 |
| `og-image.svg` | Open Graph social share card (1200×630) | 1200×630 |
| `bg-dots.svg` | Subtle dot-grid pattern for section backgrounds (repeating 20×20 tile) | 20×20 |

### Feature Icons (`/images/icons/`)

| File | Description |
|------|-------------|
| `scale-calculator.svg` | Calculator with Emerald badge showing ratio "1.3" |
| `font-controller.svg` | Side-by-side serif/sans panels with Emerald connector |
| `lock-roll.svg` | Lock + clock/history icon — locked pair exploration |
| `ui-preview.svg` | Window with shadcn-style card layout preview |
| `dual-viewport.svg` | Desktop + mobile outlines with connector line |
| `code-export.svg` | Code block with rows / terminals + checkmark |

### Empty States (In-App)

| File | Context |
|------|---------|
| `empty-state-search.svg` | Font search panel when no results match query |
| `empty-state-scale.svg` | Scale panel before base size / ratio is configured |

## Design Rules
- **Stroke width** for feature icons: 2px (consistent with lucide-react icons used in shadcn)
- **Color:** `#0f172a` (slate-900), `#64748b` (slate-500), `#10b981` (emerald-500), `#f8fafc` (slate-50), `#f1f5f9` (slate-100), `#e2e8f0` (slate-200), `#334155` (slate-700), `#94a3b8` (slate-400)
- **Rounding:** rx=6 for UI elements, rx=8 for cards, rx=12 for large panels
- **Style:** Minimal, flat, no gradients — matches shadcn/ui aesthetic
- **Typography embedded in SVGs:** system-ui font family

## Integration Guide

### In Next.js `<Image>` component
```tsx
import Image from "next/image";
import heroImg from "@/public/images/hero-workspace.svg";

<Image src={heroImg} alt="TyPair workspace — split-screen scale editor" priority />
```

### As inline SVG (icons, logos)
Import as React component:
```tsx
import ScaleIcon from "@/public/images/icons/scale-calculator.svg";

<ScaleIcon className="h-6 w-6 text-foreground" />
```

This requires `@svgr/webpack` or configure `next.config.js`:
```js
// next.config.js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
```

### Background dot pattern
```css
.bg-dots {
  background-image: url("/images/bg-dots.svg");
  background-repeat: repeat;
  background-size: 20px 20px;
}
```

### OG Image
```tsx
import Head from "next/head";

<Head>
  <meta property="og:image" content="/images/og-image.svg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</Head>
```

## Accessibility
- Empty state SVGs include a `role="img"` and descriptive `aria-label` when used in-app
- Feature icons are purely decorative — mark as `aria-hidden="true"`
- Hero illustration uses `alt` text per the content copy
