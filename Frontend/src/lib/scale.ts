export const INTERVALS: Record<string, number> = {
  "Minor Second": 1.067,
  "Major Second": 1.125,
  "Minor Third": 1.2,
  "Major Third": 1.25,
  "Perfect Fourth": 1.333,
  "Augmented Fourth": 1.414,
  "Perfect Fifth": 1.5,
  "Golden Ratio": 1.618,
};

export interface ScaleStep {
  name: string;
  step: number;
  px: number;
  rem: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: number;
  sample: string;
}

export function computeScale(
  baseSize: number,
  ratio: number,
  stepsUp: number,
  stepsDown: number,
): ScaleStep[] {
  const steps: ScaleStep[] = [];
  const stepNames: Record<number, string> = {
    4: "h1",
    3: "h2",
    2: "h3",
    1: "h4",
    0: "base",
    [-1]: "sm",
    [-2]: "xs",
    [-3]: "caption",
  };

  for (let i = stepsUp; i >= -stepsDown; i--) {
    const px = baseSize * Math.pow(ratio, i);
    const name = stepNames[i] ?? `${i > 0 ? "h" + (stepsUp - i + 1) : "step-" + Math.abs(i)}`;
    steps.push({
      name,
      step: i,
      px: Math.round(px * 100) / 100,
      rem: Math.round((px / 16) * 100) / 100,
      lineHeight: i >= 2 ? 1.2 : i >= 0 ? 1.4 : 1.5,
      letterSpacing: i >= 2 ? -0.02 : i >= 1 ? -0.01 : 0,
      fontWeight: i >= 2 ? 700 : i >= 0 ? 600 : 400,
      sample: "",
    });
  }
  return steps;
}

export function findIntervalName(ratio: number): string {
  for (const [name, value] of Object.entries(INTERVALS)) {
    if (Math.abs(value - ratio) < 0.001) return name;
  }
  return "Custom";
}

export function generateClamp(
  minSize: number,
  maxSize: number,
  minWidth = 375,
  maxWidth = 1200,
): string {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const slopeVw = Math.round(slope * 100 * 100) / 100;
  const intercept = Math.round((minSize - slope * minWidth) * 100) / 100;
  return `clamp(${minSize}px, ${slopeVw}vw + ${intercept}px, ${maxSize}px)`;
}
