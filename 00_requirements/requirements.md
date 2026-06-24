## Project Overview
- **Project Name**: TypeScale Pro & Font Matcher
- **Type**: Design Tool / SaaS Utility
- **Core Purpose**: An interactive typography visualization web app inspired by Type-Scale.com. It allows designers to select mathematical typographic scales, pair dynamic headers and body fonts side-by-side, and preview the resulting hierarchy instantly on real UI layouts.

## Design Direction
- **Style**: Minimalist, clean, highly functional, and developer-friendly. It leverages a strict split-screen workspace where the interface controls recede into the background so the typography takes center stage.
- **Color Preference**: Strict light/dark mode system using Radix/shadcn neutral palettes (e.g., zinc or slate). Highly localized accent color (e.g., vibrant emerald green or electric blue) using CSS variables for active states, focus rings, and sliders.
- **Typography**: Clean, neutral system sans-serif (`font-sans` mapped to Inter or Geist via `next/font`) for the interface shell to eliminate visual competition with the generated font pairings.
- **Inspiration**: Type-Scale.com (core math), Coolors (for rapid configuration/locking UX), and the shadcn/ui documentation site itself (accessible, clean layout blocks).

## Target Audience
- **Primary Users**: Product Designers, UI/UX Engineers, and Frontend Developers.
- **User Goals**: 
  * Compute precise mathematical typographic scales using classic musical/geometric intervals.
  * Rapidly toggle, lock, and match header and body fonts.
  * Preview typography hierarchy across simulated responsive viewports.
  * Copy production-ready CSS variables or copy-pasteable Tailwind code instantly.

## Required Features
- [ ] **Interval-Based Scale Calculator**: Dropdown selector featuring classic musical type scale intervals (e.g., Minor Second, Major Third, Perfect Fourth, Augmented Fourth, Golden Ratio) using a shadcn `Select` component, with an input for manual custom scale overrides.
- [ ] **Dual Font Controller**: Independent control cards to choose and search both a "Header Font" and a "Body Font." Integrates a searchable shadcn `Popover` + `Command` (combobox) structure loading font choices dynamically.
- [ ] **Lock & Roll System**: Inline lock icons next to the font selectors allowing users to "lock" one choice while hitting a key/button to randomize or step through complementary pairings for the other.
- [ ] **Responsive Modifier Configurator**: Separate panel to configure and visualize distinct base font sizes and scale multipliers for desktop vs. mobile viewports simultaneously.
- [ ] **Interactive Visual Hierarchy Waterfall**: A main vertical stack utilizing shadcn `Table` or clean semantic `div` blocks displaying sizing steps sequentially (e.g., from small body text steps up to `h1`), clearly labeled with their computed pixel/rem sizing values, line heights, and weights.
- [ ] **Live UI Component Preview**: A switchable shadcn `Tabs` layout changing the workspace canvas between the waterfall list view and actual responsive web components (e.g., a mockup blog post article, a modern SaaS dashboard widget, or a marketing hero section).
- [ ] **Code Export Panel**: A code playground utilizing a shadcn `Tabs` interface that generates copy-pasteable CSS custom properties (`--font-size-h1`, etc.) or a raw JSON design tokens payload with a "Copy to Clipboard" button utility.

## Technical Requirements
- **Framework**: Next.js (App Router) using React Server Components where applicable for the base shell, and optimized Client Components (`"use client"`) for the interactive workspace state.
- **UI Components**: Built using **shadcn/ui** primitives (radix-ui under the hood) including `Select`, `Slider`, `Popover`, `Command`, `Tabs`, `Button`, and `Switch`.
- **Styling**: Tailwind CSS for atomic styling, using standard theme variables (`bg-background`, `text-foreground`, `border-input`) to ensure perfect light/dark mode syncing.
- **Responsive**: Yes (The workspace itself is responsive; additionally, the preview canvas should feature an explicit width toggle to simulate mobile vs. desktop rendering).
- **Animations**: Yes (Subtle transitions via `framer-motion` or standard Tailwind primitives for opening dropdowns or switching views; layout shifts on font changes should be handled smoothly).
- **Forms**: Yes (Extensive slider components for font-weight/line-height, inputs for custom preview text, and switch toggles).
- **E-commerce / Authentication**: No (Frictionless utility app).

## Content
- **Pages/Sections**: Single-page application application workspace layout (`app/page.tsx`). Left-hand sidebar panel for scale and font control adjustments; right-hand main viewport pane for the responsive waterfall scale list and component preview canvas.
- **Content Type**: Interactive text strings, responsive copy blocks, code snippets, and standard Lucide-react icons for UI controls.

## Budget/Timeline
- **MVP Timeline**: 2–3 weeks given the velocity allowed by Next.js scaffolding and shadcn primitives.

## Additional Notes
- Must communicate efficiently with the Google Fonts API or dynamically load weights using optimized runtime standard font-face injections so switching fonts doesn't lock up or lag the UI.
- All state management (current fonts, selected scale ratio, base sizes, preview text) should be tracked via React state or optionally synced to the URL query parameters using `useSearchParams` for instant link sharing.
"""