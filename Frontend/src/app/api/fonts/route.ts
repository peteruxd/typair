const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts";
const CACHE_TTL_SECONDS = 86_400;

let cachedData: FontItem[] | null = null;
let cacheTimestamp = 0;

interface GoogleFontResponse {
  kind: string;
  items: {
    family: string;
    variants: string[];
    subsets: string[];
    category: string;
    variable: boolean;
    axes?: { tag: string; min: number; max: number }[];
  }[];
}

export interface FontItem {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  variable: boolean;
  axes: { tag: string; min: number; max: number }[];
}

export async function GET() {
  if (cachedData && Date.now() - cacheTimestamp < CACHE_TTL_SECONDS * 1000) {
    return Response.json({ items: cachedData });
  }

  const apiKey = process.env.GOOGLE_FONTS_API_KEY;

  if (!apiKey || apiKey.startsWith("__")) {
    return Response.json(
      {
        error: "Google Fonts API key is not configured.",
        hint: "Set GOOGLE_FONTS_API_KEY in .env.local to a valid Google Fonts Developer API key.",
      },
      { status: 503 }
    );
  }

  try {
    const url = new URL(GOOGLE_FONTS_API);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("sort", "popularity");

    const res = await fetch(url.toString(), {
      next: { revalidate: CACHE_TTL_SECONDS },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Fonts API error:", res.status, errorText);
      return Response.json(
        { error: "Failed to fetch fonts from Google Fonts API" },
        { status: res.status }
      );
    }

    const data: GoogleFontResponse = await res.json();

    const items: FontItem[] = data.items.map((f) => ({
      family: f.family,
      variants: f.variants,
      subsets: f.subsets,
      category: f.category ?? "sans-serif",
      variable: f.variable ?? false,
      axes: f.axes ?? [],
    }));

    cachedData = items;
    cacheTimestamp = Date.now();

    return Response.json({ items }, {
      headers: {
        "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}, s-maxage=${CACHE_TTL_SECONDS}`,
      },
    });
  } catch (err) {
    console.error("Font fetch error:", err);
    return Response.json(
      { error: "Internal server error fetching fonts" },
      { status: 500 }
    );
  }
}
