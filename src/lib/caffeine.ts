// Faithful re-implementation of Caffy's caffeine model (matches the app's
// MetabolismEngine exactly):
//   - first-order elimination from intake: C(t) = C0 * 0.5^(t / halfLife)
//   - multiple drinks superimpose (sum of curves)
// The app's decay curve has NO absorption ramp — caffeine peaks at intake.

// 24h window, starting at 06:00 so an afternoon coffee visibly decays into night.
export const DOMAIN_START = 6;
export const DOMAIN_END = 30; // 06:00 next day

export interface Drink {
  id: string;
  /** preset key, also the icon file name in /public/icons */
  kind: string;
  mg: number;
  /** time of intake, in hours on the domain (6..30) */
  at: number;
}

export interface Profile {
  key: "average" | "sensitive" | "fast" | "smoker" | "pregnant";
  halfLife: number; // hours
}

// Half-lives match the app's computedHalfLife (UserProfile.swift):
//   normal sensitivity 5.0h · high 7.0h · low 3.5h · smoker 3.0h · pregnancy 12h
export const PROFILES: Profile[] = [
  { key: "average", halfLife: 5.0 },
  { key: "sensitive", halfLife: 7.0 },
  { key: "fast", halfLife: 3.5 },
  { key: "smoker", halfLife: 3.0 },
  { key: "pregnant", halfLife: 12 },
];

export interface Preset {
  kind: string;
  mg: number;
  icon: string;
}

export const PRESETS: Preset[] = [
  { kind: "espresso", mg: 63, icon: "espresso.png" },
  { kind: "coffee", mg: 95, icon: "drip_coffee.png" },
  { kind: "energy", mg: 80, icon: "energy_drink.png" },
  { kind: "tea", mg: 47, icon: "black_tea.png" },
  { kind: "matcha", mg: 70, icon: "matcha.png" },
  { kind: "cola", mg: 34, icon: "cola.png" },
];

/** Contribution of a single drink at time t (hours on domain). */
export function drinkAt(drink: Drink, t: number, halfLife: number): number {
  const dt = t - drink.at;
  if (dt <= 0) return 0;
  return drink.mg * Math.pow(0.5, dt / halfLife);
}

/** Total active caffeine at time t. */
export function totalAt(drinks: Drink[], t: number, halfLife: number): number {
  let sum = 0;
  for (const d of drinks) sum += drinkAt(d, t, halfLife);
  return sum;
}

export interface CurvePoint {
  t: number;
  mg: number;
}

/** Sampled curve across the domain. */
export function buildCurve(
  drinks: Drink[],
  halfLife: number,
  step = 10 / 60 // 10-minute samples
): CurvePoint[] {
  const pts: CurvePoint[] = [];
  for (let t = DOMAIN_START; t <= DOMAIN_END + 1e-9; t += step) {
    pts.push({ t, mg: totalAt(drinks, t, halfLife) });
  }
  return pts;
}

export function peakOf(curve: CurvePoint[]): number {
  return curve.reduce((m, p) => Math.max(m, p.mg), 0);
}

/** Sleep verdict thresholds (mg of caffeine still active at bedtime). */
export type Verdict = "safe" | "caution" | "poor";
export function verdictFor(mgAtBedtime: number): Verdict {
  if (mgAtBedtime < 50) return "safe";
  if (mgAtBedtime < 100) return "caution";
  return "poor";
}

/** Format a domain hour (6..30) into a 24h clock label. */
export function clockLabel(t: number): string {
  const h = ((Math.round(t) % 24) + 24) % 24;
  return `${String(h).padStart(2, "0")}:00`;
}
