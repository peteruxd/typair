# API Implementation — TyPair

## Overview

TyPair has a single backend endpoint that proxies the Google Fonts Developer API. All other functionality is client-side (scale computation, font loading, code export).

## Endpoints

### GET /api/fonts

Returns the full list of available Google Fonts, sorted by popularity.

**Response (Success)**:
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

**Response (Error — no API key)**:
```json
{
  "error": "Google Fonts API key is not configured.",
  "hint": "Set GOOGLE_FONTS_API_KEY in .env.local"
}
```

**Response (Error — upstream failure)**:
```json
{
  "error": "Failed to fetch fonts from Google Fonts API"
}
```

**Cache**: Server-side in-memory cache with 24h TTL. Response includes `Cache-Control: public, max-age=86400`.

## Implementation

### Route Handler

`src/app/api/fonts/route.ts`

- Standard Next.js Route Handler (App Router)
- Exported `GET` function returns `Response.json()`
- In-memory cache with 24h TTL to avoid hitting Google API on every request
- Uses `process.env.GOOGLE_FONTS_API_KEY` for API authentication
- Falls back to 503 if no API key is configured
- Falls back to 500 on network errors

### Client Library

`src/lib/fonts.ts`

- `getFonts()` — fetches font list from `/api/fonts` with `localStorage` cache (24h TTL)
- `buildFontCssUrl(family, weights)` — builds a Google Fonts CSS URL for dynamic loading
- `loadFontStylesheet(family, weights)` — injects a `<link>` element for the font's stylesheet; deduplicates by `id`

## Setup

### 1. Get a Google Fonts API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or select existing)
3. Enable the **Web Fonts Developer API**
4. Create an API key (restrict to HTTP referrers for production)

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
GOOGLE_FONTS_API_KEY=your_api_key_here
```

### 3. Run

```bash
npm run dev
```

Verify: `curl http://localhost:3000/api/fonts | head -c 500`

## Error Handling

| Scenario | HTTP Status | Response |
|----------|-------------|----------|
| Missing API key | 503 | `{ error, hint }` |
| Google API unreachable | 502 | `{ error }` with upstream status |
| Network/proxy error | 500 | `{ error }` |
| Invalid API key | 403 | Upstream error propagated |

## Security

- API key is server-side only (`process.env`), never exposed to the client
- No user input is accepted by the endpoint (no injection vectors)
- CORS not applicable — same-origin requests only
- Rate limiting: Google Fonts API enforces its own quotas (~100k requests/day for free tier)
- The client-side library injects font stylesheets via `<link>` (not `@import` or inline CSS) for optimal caching
