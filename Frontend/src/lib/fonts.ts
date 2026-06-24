export interface FontItem {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  variable: boolean;
  axes: { tag: string; min: number; max: number }[];
}

const STORAGE_KEY = "typair-fonts-cache";
const CACHE_TTL_MS = 86_400_000;

interface CacheEntry {
  timestamp: number;
  items: FontItem[];
}

function getLocalCache(): FontItem[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return entry.items;
  } catch {
    return null;
  }
}

function setLocalCache(items: FontItem[]) {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), items };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    /* storage full or unavailable */
  }
}

export async function getFonts(): Promise<FontItem[]> {
  const cached = getLocalCache();
  if (cached) return cached;

  const res = await fetch("/api/fonts");
  if (!res.ok) {
    throw new Error(`Failed to fetch fonts: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  setLocalCache(data.items);
  return data.items as FontItem[];
}

export function buildFontCssUrl(family: string, weights: number[] = [400]): string {
  const query = `family=${family.replace(/\s+/g, "+")}:wght@${weights.join(";")}`;
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}

export function loadFontStylesheet(family: string, weights: number[] = [400]) {
  const id = `gf-${family.replace(/\s+/g, "-").toLowerCase()}`;
  const existing = document.getElementById(id);

  if (existing) {
    const expected = buildFontCssUrl(family, weights);
    if (existing.getAttribute("href") === expected) return;
    existing.remove();
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = buildFontCssUrl(family, weights);
  document.head.appendChild(link);
}
