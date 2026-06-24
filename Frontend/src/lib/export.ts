import type { ScaleStep } from "./scale";

interface FontConfig {
  header: string | null;
  body: string | null;
  headerWeight: number;
  bodyWeight: number;
}

function cssVars(steps: ScaleStep[], fonts: FontConfig): string {
  const lines = [":root {"];
  if (fonts.header) lines.push(`  --font-header: '${fonts.header}', serif;`);
  if (fonts.body) lines.push(`  --font-body: '${fonts.body}', sans-serif;`);
  for (const s of steps) {
    lines.push(`  --fs-${s.name}: ${s.rem}rem;`);
    lines.push(`  --lh-${s.name}: ${s.lineHeight};`);
    lines.push(`  --ls-${s.name}: ${s.letterSpacing}em;`);
  }
  lines.push("}");
  return lines.join("\n");
}

function tailwindV3(steps: ScaleStep[], fonts: FontConfig): string {
  const lines = ["// tailwind.config.js", "theme: {", "  extend: {"];
  if (fonts.header || fonts.body) {
    lines.push("    fontFamily: {");
    if (fonts.header) lines.push(`      header: ['${fonts.header}', 'serif'],`);
    if (fonts.body) lines.push(`      body: ['${fonts.body}', 'sans-serif'],`);
    lines.push("    },");
  }
  lines.push("    fontSize: {");
  for (const s of steps) {
    lines.push(`      '${s.name}': ['${s.rem}rem', { lineHeight: '${s.lineHeight}', letterSpacing: '${s.letterSpacing}em' }],`);
  }
  lines.push("    },");
  lines.push("  },");
  lines.push("};");
  return lines.join("\n");
}

function tailwindV4(steps: ScaleStep[], fonts: FontConfig): string {
  const lines = ["@theme {"];
  if (fonts.header) lines.push(`  --font-header: '${fonts.header}', serif;`);
  if (fonts.body) lines.push(`  --font-body: '${fonts.body}', sans-serif;`);
  lines.push("  --font-size: {");
  for (const s of steps) {
    lines.push(`    ${s.name}: ${s.rem}rem;`);
  }
  lines.push("  };");
  lines.push("}");
  return lines.join("\n");
}

function jsonTokens(steps: ScaleStep[], fonts: FontConfig): string {
  const tokens: Record<string, unknown> = {};
  if (fonts.header) tokens["font-header"] = { value: `'${fonts.header}', serif`, type: "fontFamily" };
  if (fonts.body) tokens["font-body"] = { value: `'${fonts.body}', sans-serif`, type: "fontFamily" };
  for (const s of steps) {
    tokens[`font-size-${s.name}`] = { value: `${s.rem}rem`, type: "dimension" };
    tokens[`line-height-${s.name}`] = { value: s.lineHeight, type: "number" };
    tokens[`letter-spacing-${s.name}`] = { value: `${s.letterSpacing}em`, type: "dimension" };
  }
  return JSON.stringify(tokens, null, 2);
}

export function generateCode(
  format: "css" | "tailwind-v3" | "tailwind-v4" | "json",
  steps: ScaleStep[],
  fonts: FontConfig,
): string {
  switch (format) {
    case "css": return cssVars(steps, fonts);
    case "tailwind-v3": return tailwindV3(steps, fonts);
    case "tailwind-v4": return tailwindV4(steps, fonts);
    case "json": return jsonTokens(steps, fonts);
  }
}
