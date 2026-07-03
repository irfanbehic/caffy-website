import type { ReactNode } from "react";

// ── On-brand SVG artwork (no external images; adapts to light/dark) ──────────
type ArtKind = "halflife" | "clock" | "cups" | "gauge" | "taper";

export function BlogArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-paper-line bg-gradient-to-br from-paper-surface to-paper-card dark:border-night-line dark:from-night-surface dark:to-night-card ${className}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <svg viewBox="0 0 400 200" className="relative block h-full w-full">
        {kind === "halflife" && <HalfLifeArt />}
        {kind === "clock" && <ClockArt />}
        {kind === "cups" && <CupsArt />}
        {kind === "gauge" && <GaugeArt />}
        {kind === "taper" && <TaperArt />}
      </svg>
    </div>
  );
}

const AX = "stroke-ink-faint/30";
const A = "#FF6600";

function HalfLifeArt() {
  // Exponential decay curve with halving markers.
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const x = 30 + t * 340;
    const y = 30 + (1 - Math.pow(0.5, t * 4)) * 0; // placeholder
    return { x, y: 170 - 140 * Math.pow(0.5, t * 4) };
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${d} L370 170 L30 170 Z`;
  return (
    <g>
      <defs>
        <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={A} stopOpacity="0.28" />
          <stop offset="100%" stopColor={A} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="30" y1="170" x2="370" y2="170" className={AX} strokeWidth="1" />
      {[0, 1, 2, 3].map((n) => (
        <line key={n} x1={30 + (n * 340) / 4} y1="30" x2={30 + (n * 340) / 4} y2="170" className={AX} strokeWidth="0.6" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#hl)" />
      <path d={d} fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3].map((n) => (
        <circle key={n} cx={30 + (n * 340) / 4} cy={170 - 140 * Math.pow(0.5, n)} r="4.5" fill={A} />
      ))}
    </g>
  );
}

function ClockArt() {
  return (
    <g>
      <circle cx="200" cy="100" r="62" className="fill-none stroke-ink-faint/25" strokeWidth="2" />
      <path d="M200 100 L200 55" stroke={A} strokeWidth="4" strokeLinecap="round" />
      <path d="M200 100 L238 118" stroke={A} strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="100" r="5" fill={A} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={200 + Math.sin(a) * 74} cy={100 - Math.cos(a) * 74} r="2" className="fill-ink-faint/40" />;
      })}
      <path d="M300 60 q10 -14 20 0 q10 14 20 0" fill="none" className="stroke-ink-faint/40" strokeWidth="3" strokeLinecap="round" />
      <circle cx="330" cy="44" r="3" className="fill-ink-faint/40" />
    </g>
  );
}

function CupsArt() {
  const bars = [
    { x: 60, h: 40, c: "fill-caffeine-green" },
    { x: 130, h: 70, c: "fill-accent" },
    { x: 200, h: 120, c: "fill-accent" },
    { x: 270, h: 95, c: "fill-caffeine-yellow" },
    { x: 340, h: 55, c: "fill-caffeine-blue" },
  ];
  return (
    <g>
      <line x1="30" y1="170" x2="370" y2="170" className={AX} strokeWidth="1" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x - 18} y={170 - b.h} width="36" height={b.h} rx="7" className={b.c} opacity="0.9" />
      ))}
    </g>
  );
}

function GaugeArt() {
  const R = 70, cx = 200, cy = 150;
  const ang = (t: number) => Math.PI * (1 - t);
  const pt = (t: number, r = R) => `${cx + Math.cos(ang(t)) * r} ${cy - Math.sin(ang(t)) * r}`;
  const arc = (a: number, b: number) => `M${pt(a)} A${R} ${R} 0 0 1 ${pt(b)}`;
  return (
    <g fill="none" strokeWidth="14" strokeLinecap="round">
      <path d={arc(0, 1)} className="stroke-ink-faint/15" />
      <path d={arc(0, 0.75)} stroke={A} />
      <circle cx={cx + Math.cos(ang(0.75)) * R} cy={cy - Math.sin(ang(0.75)) * R} r="9" fill={A} stroke="none" />
      <text x={cx} y={cy - 12} textAnchor="middle" className="fill-ink text-[26px] font-bold" stroke="none">400</text>
      <text x={cx} y={cy + 8} textAnchor="middle" className="fill-ink-faint text-[11px]" stroke="none">mg / day</text>
    </g>
  );
}

function TaperArt() {
  const steps = [150, 120, 95, 70, 45, 25];
  return (
    <g>
      <line x1="30" y1="170" x2="370" y2="170" className={AX} strokeWidth="1" />
      {steps.map((h, i) => (
        <rect key={i} x={40 + i * 55} y={170 - h} width="42" height={h} rx="7" fill={A} opacity={0.9 - i * 0.11} />
      ))}
      <path d={`M61 ${170 - 150} ${steps.map((h, i) => `L${61 + i * 55} ${170 - h}`).join(" ")}`} fill="none" className="stroke-ink/50" strokeWidth="2" strokeDasharray="4 4" />
    </g>
  );
}

// ── Article model ───────────────────────────────────────────────────────────
export type Block =
  | { t: "h2"; s: string }
  | { t: "p"; s: ReactNode }
  | { t: "ul"; items: ReactNode[] }
  | { t: "art"; kind: ArtKind; caption?: string }
  | { t: "callout"; s: ReactNode };

export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  readMins: number;
  excerpt: string;
  cover: ArtKind;
  body: Block[];
  sources: { label: string; url: string }[];
}

const b = (str: string) => <strong className="font-semibold text-ink">{str}</strong>;

export const posts: Post[] = [
  {
    slug: "how-long-does-caffeine-stay-in-your-body",
    title: "How long does caffeine stay in your body?",
    date: "2026-07-02",
    readMins: 5,
    excerpt:
      "Caffeine's half-life is about 5–6 hours — here's what that really means for the coffee you drank this afternoon, and when it finally leaves your system.",
    cover: "halflife",
    body: [
      { t: "p", s: <>That 2 p.m. coffee isn't gone by dinner. Caffeine leaves your body on a predictable schedule set by its {b("half-life")} — and understanding it is the single most useful thing you can know about your daily habit.</> },
      { t: "h2", s: "What “half-life” means" },
      { t: "p", s: <>Caffeine's half-life is the time your body needs to clear {b("half")} of a dose. In a healthy adult it averages {b("about 5–6 hours")}, though it ranges widely — roughly 1.5 to 9.5 hours — depending on your genes, age, liver, and medications.</> },
      { t: "art", kind: "halflife", caption: "Each marker is one half-life — the amount halves, then halves again." },
      { t: "p", s: <>Say you drink {b("200 mg")} (a large coffee) at 9 a.m. By early-to-mid afternoon you still have about {b("100 mg")} circulating. Six hours later, ~50 mg. It takes roughly {b("5–6 half-lives — about a full day")} for caffeine to be effectively gone.</> },
      { t: "h2", s: "Why your number is personal" },
      { t: "ul", items: [
        <><span className="text-ink font-medium">Pregnancy & oral contraceptives</span> slow it down — in late pregnancy the half-life can stretch toward 15 hours.</>,
        <><span className="text-ink font-medium">Smoking</span> speeds it up, roughly halving the half-life.</>,
        <><span className="text-ink font-medium">Genetics (CYP1A2)</span> make some people fast metabolizers and others slow.</>,
      ] },
      { t: "callout", s: <>This is exactly what Caffy models. Instead of a rule of thumb, it uses {b("your")} half-life to show how much caffeine is active in your body right now.</> },
      { t: "h2", s: "The takeaway" },
      { t: "p", s: <>Because caffeine lingers far longer than its “buzz,” an afternoon cup can still be working at bedtime. Knowing your half-life turns caffeine from a guess into something you can actually plan around.</> },
    ],
    sources: [
      { label: "Sleep Foundation — How long caffeine lasts", url: "https://www.sleepfoundation.org/nutrition/how-long-does-it-take-caffeine-to-wear-off" },
      { label: "NCBI — Pharmacology of Caffeine", url: "https://www.ncbi.nlm.nih.gov/books/NBK223808/" },
    ],
  },
  {
    slug: "what-time-to-stop-drinking-coffee-for-sleep",
    title: "What time should you stop drinking coffee for better sleep?",
    date: "2026-06-30",
    readMins: 5,
    excerpt:
      "A 2023 meta-analysis put a number on the old “no coffee after 2 p.m.” advice: stop about 8.8 hours before bed to protect your sleep.",
    cover: "clock",
    body: [
      { t: "p", s: <>You can fall asleep after an evening coffee and still sleep worse — caffeine quietly trades your {b("deep sleep")} for lighter sleep. The question is when to have your last cup.</> },
      { t: "h2", s: "What the research now says" },
      { t: "p", s: <>A {b("2023 systematic review and meta-analysis")} in Sleep Medicine Reviews pooled 24 studies. On average, caffeine cut total sleep time by {b("45 minutes")}, reduced sleep efficiency by 7%, and shifted sleep toward lighter stages.</> },
      { t: "art", kind: "clock", caption: "Count back from your bedtime, not forward from your morning." },
      { t: "p", s: <>Their practical guidance: to avoid losing sleep, a normal coffee (~107 mg) should be your last {b("at least 8.8 hours before bed")}. A strong pre-workout (~217 mg) needs about {b("13 hours")}.</> },
      { t: "h2", s: "Turn that into a cutoff time" },
      { t: "ul", items: [
        <>Bed at 11 p.m.? Last coffee by roughly {b("2 p.m.")}</>,
        <>Bed at 10 p.m.? Aim for around {b("1 p.m.")}</>,
        <>Bigger dose or slow metabolism? Push it earlier.</>,
      ] },
      { t: "callout", s: <>Caffy calculates a personal {b("safe cutoff time")} from your bedtime and metabolism — and warns you before an afternoon drink eats into tonight's sleep.</> },
      { t: "p", s: <>The rule isn't “no coffee after 2 p.m.” for everyone — it's “stop early enough that your body clears it before your head hits the pillow.”</> },
    ],
    sources: [
      { label: "Gardiner et al. 2023, Sleep Medicine Reviews (ScienceDirect)", url: "https://www.sciencedirect.com/science/article/pii/S1087079223000205" },
      { label: "AJMC — Caffeine and sleep review", url: "https://www.ajmc.com/view/caffeine-and-sleep-review-suggests-consumption-guidelines" },
    ],
  },
  {
    slug: "how-much-caffeine-in-coffee-tea-energy-drinks",
    title: "How much caffeine is in coffee, tea, espresso and energy drinks?",
    date: "2026-06-27",
    readMins: 4,
    excerpt:
      "Espresso, drip, cold brew, green tea, Red Bull — a clear, source-backed comparison so you actually know what you're drinking.",
    cover: "cups",
    body: [
      { t: "p", s: <>“One coffee” can mean 60 mg or 300 mg of caffeine. Here are typical amounts from Mayo Clinic and CSPI data — useful for staying under your daily limit.</> },
      { t: "art", kind: "cups", caption: "Caffeine per typical serving — the drink matters more than you'd think." },
      { t: "h2", s: "Typical caffeine per serving" },
      { t: "ul", items: [
        <>{b("Drip coffee (8 oz):")} ~70–100 mg</>,
        <>{b("Espresso (1 shot):")} ~63–80 mg — but per ounce it's the strongest</>,
        <>{b("Cold brew (8 oz):")} ~100–200 mg</>,
        <>{b("Black tea:")} ~47–55 mg · {b("Green tea:")} ~28–35 mg</>,
        <>{b("Energy drink (8 oz, e.g. Red Bull):")} ~80 mg</>,
        <>{b("Energy shot (5-Hour Energy):")} ~200 mg</>,
        <>{b("Cola (12 oz):")} ~35–40 mg</>,
      ] },
      { t: "h2", s: "Two things that trip people up" },
      { t: "p", s: <>First, {b("size")}: a 16 oz café coffee can hold 2–3 “cups” of caffeine. Second, {b("espresso feels stronger")} but a single shot often has less total caffeine than a mug of drip — it's just concentrated.</> },
      { t: "callout", s: <>Caffy has these drinks (and hundreds more) built in, so logging is a tap — and it adds each one to your live caffeine level.</> },
    ],
    sources: [
      { label: "Mayo Clinic — Caffeine content of drinks", url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20049372" },
      { label: "CSPI — Caffeine chart", url: "https://www.cspi.org/caffeine-chart" },
    ],
  },
  {
    slug: "safe-daily-caffeine-limit-how-much-is-too-much",
    title: "Safe daily caffeine limits: how much is too much?",
    date: "2026-06-23",
    readMins: 4,
    excerpt:
      "The FDA and EFSA agree on 400 mg a day for most adults — and 200 mg in pregnancy. Here's what those numbers mean in cups.",
    cover: "gauge",
    body: [
      { t: "p", s: <>There is a widely agreed number for healthy adults, and both US and European regulators land on it.</> },
      { t: "h2", s: "The 400 mg rule" },
      { t: "p", s: <>Both the {b("FDA")} and the {b("European Food Safety Authority (EFSA)")} consider up to {b("400 mg of caffeine per day")} safe for most healthy, non-pregnant adults — roughly {b("four cups of coffee")}.</> },
      { t: "art", kind: "gauge", caption: "400 mg/day for most adults — but single doses over ~200 mg at once can cause jitters." },
      { t: "h2", s: "Pregnancy is different" },
      { t: "p", s: <>ACOG, EFSA and the NHS all recommend {b("no more than 200 mg per day")} during pregnancy. One reason: caffeine is cleared much more slowly — its half-life can rise to {b("~15 hours")} in the third trimester, so it accumulates.</> },
      { t: "h2", s: "Signs you're over your line" },
      { t: "ul", items: [
        <>Jitteriness, a racing heart, or anxiety</>,
        <>Trouble falling or staying asleep</>,
        <>Headaches, or an afternoon crash you “need” more caffeine to fix</>,
      ] },
      { t: "callout", s: <>Caffy sets a personal daily limit and shows a live gauge, so you can see when you're approaching 400 mg — before, not after.</> },
    ],
    sources: [
      { label: "EFSA — Caffeine", url: "https://www.efsa.europa.eu/en/topics/topic/caffeine" },
      { label: "Coffee & Health — Guidelines on caffeine intake", url: "https://www.coffeeandhealth.org/health/coffee-and-caffeine/guidelines-on-caffeine-intake" },
    ],
  },
  {
    slug: "how-to-cut-back-on-caffeine-without-headaches",
    title: "How to cut back on caffeine without the headaches",
    date: "2026-06-18",
    readMins: 5,
    excerpt:
      "Quitting cold turkey is why people fail. A gradual 1–2 week taper — plus an earlier daily cutoff — keeps withdrawal at bay.",
    cover: "taper",
    body: [
      { t: "p", s: <>If cutting back has ever left you with a two-day headache, the problem wasn't willpower — it was going too fast.</> },
      { t: "h2", s: "Why withdrawal happens" },
      { t: "p", s: <>Cut caffeine abruptly and symptoms — {b("headache, fatigue, irritability, low mood")} — typically begin {b("12–24 hours")} later and can last {b("2–9 days")}. It's a real physiological rebound, not weakness.</> },
      { t: "art", kind: "taper", caption: "Step down gradually — each drop small enough that your body barely notices." },
      { t: "h2", s: "A taper that works" },
      { t: "ul", items: [
        <>Reduce by roughly {b("10–25% every few days")} over 1–2 weeks, not all at once.</>,
        <>Swap {b("one regular cup for decaf")} at a time — same ritual, less caffeine.</>,
        <>Move your {b("cutoff earlier")} first; late caffeine hurts sleep, which fuels the craving.</>,
        <>Hydrate and expect a few flat days — it passes.</>,
      ] },
      { t: "callout", s: <>Caffy's detox plans build this taper for you (5–14 days) and track each day, so cutting back feels like progress instead of a fight.</> },
      { t: "p", s: <>Slower is faster here: a gentle taper is the difference between quitting once and quitting for good.</> },
    ],
    sources: [
      { label: "BodySpec — Caffeine withdrawal timeline & coping", url: "https://www.bodyspec.com/blog/post/caffeine_withdrawal_symptoms_timeline_and_coping_strategies" },
      { label: "EFSA — Caffeine", url: "https://www.efsa.europa.eu/en/topics/topic/caffeine" },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
