export interface FontPairing {
  header: string;
  body: string;
  headerWeights: number[];
  bodyWeights: number[];
  rationale: string;
}

const pairings: FontPairing[] = [
  { header: "Playfair Display", body: "Inter", headerWeights: [400, 700], bodyWeights: [400, 500, 600], rationale: "Classic editorial — serif headings, sans body" },
  { header: "Fraunces", body: "Work Sans", headerWeights: [400, 700, 900], bodyWeights: [400, 500], rationale: "Modern soft-serif with clean sans contrast" },
  { header: "Space Grotesk", body: "Space Mono", headerWeights: [400, 500, 700], bodyWeights: [400, 700], rationale: "Tech-forward — both geometric, mono for code" },
  { header: "DM Serif Display", body: "DM Sans", headerWeights: [400], bodyWeights: [400, 500, 700], rationale: "Designed as a pair — seamless harmony" },
  { header: "Oswald", body: "Source Sans 3", headerWeights: [400, 600, 700], bodyWeights: [400, 600], rationale: "Bold condensed headings with neutral body" },
  { header: "Crimson Pro", body: "Lato", headerWeights: [400, 600, 700], bodyWeights: [400, 700], rationale: "Warm serif headlines paired with approachable sans" },
  { header: "Syne", body: "Inter", headerWeights: [400, 600, 700, 800], bodyWeights: [400, 500], rationale: "Expressive display + versatile workhorse" },
  { header: "Outfit", body: "IBM Plex Sans", headerWeights: [400, 600, 700], bodyWeights: [400, 500], rationale: "Rounded geometric headings with clear body" },
  { header: "Bricolage Grotesque", body: "DM Sans", headerWeights: [400, 600, 700], bodyWeights: [400, 500], rationale: "Playful variable grotesk + neutral sans" },
  { header: "Zodiak", body: "Satoshi", headerWeights: [400, 700], bodyWeights: [400, 500, 700], rationale: "Sharp serif + modern sans — design-forward" },
  { header: "Archivo", body: "Archivo", headerWeights: [400, 600, 700, 800], bodyWeights: [300, 400], rationale: "Single-family system — consistent voice across weights" },
  { header: "Sora", body: "Nunito", headerWeights: [400, 600, 700], bodyWeights: [400, 600], rationale: "Friendly rounded contrast" },
  { header: "Abril Fatface", body: "Poppins", headerWeights: [400], bodyWeights: [400, 500, 600], rationale: "Dramatic fatface headlines with geometric body" },
  { header: "Clash Display", body: "Inter", headerWeights: [400, 600, 700], bodyWeights: [400, 500], rationale: "Modern variable display + Swiss-style body" },
  { header: "Unbounded", body: "JetBrains Mono", headerWeights: [400, 600, 700], bodyWeights: [300, 400, 700], rationale: "Bold tech aesthetic with mono body" },
];

let pointer = 0;

export function getPairings(): FontPairing[] {
  return pairings;
}

export function getNextPairing(
  currentHeader: string | null,
  currentBody: string | null,
  headerLocked: boolean,
  bodyLocked: boolean,
): { header: string | null; body: string | null } {
  if (headerLocked && bodyLocked) return { header: currentHeader, body: currentBody };

  let pool: FontPairing[];

  if (!headerLocked && !bodyLocked) {
    pool = pairings;
  } else if (headerLocked && currentHeader) {
    pool = pairings.filter((p) => p.header === currentHeader);
  } else if (bodyLocked && currentBody) {
    pool = pairings.filter((p) => p.body === currentBody);
  } else {
    pool = pairings;
  }

  if (pool.length <= 1) {
    pool = pairings;
  }

  pointer = (pointer + 1) % pool.length;
  const next = pool[pointer];

  return {
    header: headerLocked ? currentHeader : next.header,
    body: bodyLocked ? currentBody : next.body,
  };
}

export function findPairingByFonts(
  header: string,
  body: string,
): FontPairing | undefined {
  return pairings.find((p) => p.header === header && p.body === body);
}
