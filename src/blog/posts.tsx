import type { LocaleCode } from "../i18n";

// ── On-brand SVG artwork (no external images; adapts to light/dark) ──────────
export type ArtKind =
  | "halflife" | "clock" | "cups" | "gauge" | "taper"
  | "beans" | "moon" | "mug" | "heart" | "leaf";

const A = "#FF6600";
const AX = "stroke-ink-faint/30";

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
        {kind === "beans" && <BeansArt />}
        {kind === "moon" && <MoonArt />}
        {kind === "mug" && <MugArt />}
        {kind === "heart" && <HeartArt />}
        {kind === "leaf" && <LeafArt />}
      </svg>
    </div>
  );
}

function HalfLifeArt() {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return { x: 30 + t * 340, y: 170 - 140 * Math.pow(0.5, t * 4) };
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
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
      <path d={`${d} L370 170 L30 170 Z`} fill="url(#hl)" />
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
      {bars.map((bar, i) => (
        <rect key={i} x={bar.x - 18} y={170 - bar.h} width="36" height={bar.h} rx="7" className={bar.c} opacity="0.9" />
      ))}
    </g>
  );
}
function GaugeArt() {
  const R = 70, cx = 200, cy = 150;
  const ang = (t: number) => Math.PI * (1 - t);
  const pt = (t: number) => `${cx + Math.cos(ang(t)) * R} ${cy - Math.sin(ang(t)) * R}`;
  const arc = (a: number, bb: number) => `M${pt(a)} A${R} ${R} 0 0 1 ${pt(bb)}`;
  return (
    <g fill="none" strokeWidth="14" strokeLinecap="round">
      <path d={arc(0, 1)} className="stroke-ink-faint/15" />
      <path d={arc(0, 0.75)} stroke={A} />
      <circle cx={cx + Math.cos(ang(0.75)) * R} cy={cy - Math.sin(ang(0.75)) * R} r="9" fill={A} stroke="none" />
      <text x={cx} y={cy - 12} textAnchor="middle" className="fill-ink text-[26px] font-bold dark:fill-white" stroke="none">400</text>
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
    </g>
  );
}
function BeansArt() {
  const bean = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y}) rotate(-25)`}>
      <ellipse cx="0" cy="0" rx={r} ry={r * 0.66} fill={A} opacity="0.9" />
      <path d={`M${-r} 0 q${r} ${r * 0.5} ${2 * r} 0`} fill="none" className="stroke-paper-surface dark:stroke-night-surface" strokeWidth="3" />
    </g>
  );
  return <g>{bean(155, 95, 34)}{bean(255, 112, 30)}<circle cx="305" cy="60" r="3" className="fill-ink-faint/40" /></g>;
}
function MoonArt() {
  return (
    <g>
      <path d="M215 60 a44 44 0 1 0 0 82 a34 34 0 1 1 0 -82 z" fill={A} opacity="0.92" />
      {[[300, 70], [325, 112], [120, 92]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 6} L${x} ${y + 6} M${x - 6} ${y} L${x + 6} ${y}`} className="stroke-ink-faint/50" strokeWidth="2" strokeLinecap="round" />
      ))}
    </g>
  );
}
function MugArt() {
  return (
    <g>
      <path d="M150 120 h100 v22 a24 24 0 0 1 -24 24 h-52 a24 24 0 0 1 -24 -24 z" fill={A} opacity="0.9" />
      <path d="M250 128 h14 a16 16 0 0 1 0 32 h-10" fill="none" stroke={A} strokeWidth="7" opacity="0.9" />
      <line x1="150" y1="120" x2="250" y2="120" className="stroke-paper-surface dark:stroke-night-surface" strokeWidth="4" />
      {[175, 200, 225].map((x, i) => (
        <path key={i} d={`M${x} 96 q6 -10 0 -20`} fill="none" className="stroke-ink-faint/45" strokeWidth="3" strokeLinecap="round" />
      ))}
    </g>
  );
}
function HeartArt() {
  return (
    <g>
      <path d="M200 150 l-44 -42 a26 26 0 0 1 44 -30 a26 26 0 0 1 44 30 z" fill={A} opacity="0.9" />
      <path d="M60 118 h40 l14 -26 l20 52 l16 -34 l10 20 h140" fill="none" className="stroke-ink/70 dark:stroke-white/80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
function LeafArt() {
  return (
    <g>
      <path d="M150 150 C150 90 210 60 260 62 C262 112 232 152 172 152 C168 152 158 152 150 150 z" fill={A} opacity="0.9" />
      <path d="M150 150 C185 130 220 100 255 68" fill="none" className="stroke-paper-surface dark:stroke-night-surface" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

// ── Article model ───────────────────────────────────────────────────────────
// Text supports **bold** markup (parsed in Blog.tsx). Body blocks per locale.
export type Block =
  | { t: "h2"; s: string }
  | { t: "p"; s: string }
  | { t: "ul"; items: string[] }
  | { t: "art"; kind: ArtKind; caption?: string }
  | { t: "callout"; s: string };

export interface Post {
  slug: string;
  date: string;
  readMins: number;
  cover: ArtKind;
  title: string;
  excerpt: string;
  body: Block[];
  sources: { label: string; url: string }[];
}

interface Localized {
  title: string;
  excerpt: string;
  body: Block[];
  sourceLabels: string[];
}

// Language-neutral metadata (shared across all locales).
const SHARED = [
  { slug: "how-long-does-caffeine-stay-in-your-body", date: "2026-07-02", readMins: 5, cover: "halflife" as ArtKind,
    urls: ["https://www.sleepfoundation.org/nutrition/how-long-does-it-take-caffeine-to-wear-off", "https://www.ncbi.nlm.nih.gov/books/NBK223808/"] },
  { slug: "what-time-to-stop-drinking-coffee-for-sleep", date: "2026-06-30", readMins: 5, cover: "clock" as ArtKind,
    urls: ["https://www.sciencedirect.com/science/article/pii/S1087079223000205", "https://www.ajmc.com/view/caffeine-and-sleep-review-suggests-consumption-guidelines"] },
  { slug: "how-much-caffeine-in-coffee-tea-energy-drinks", date: "2026-06-27", readMins: 4, cover: "cups" as ArtKind,
    urls: ["https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20049372", "https://www.cspi.org/caffeine-chart"] },
  { slug: "safe-daily-caffeine-limit-how-much-is-too-much", date: "2026-06-23", readMins: 4, cover: "gauge" as ArtKind,
    urls: ["https://www.efsa.europa.eu/en/topics/topic/caffeine", "https://www.coffeeandhealth.org/health/coffee-and-caffeine/guidelines-on-caffeine-intake"] },
  { slug: "how-to-cut-back-on-caffeine-without-headaches", date: "2026-06-18", readMins: 5, cover: "taper" as ArtKind,
    urls: ["https://www.bodyspec.com/blog/post/caffeine_withdrawal_symptoms_timeline_and_coping_strategies", "https://www.efsa.europa.eu/en/topics/topic/caffeine"] },
  { slug: "how-much-caffeine-is-safe-during-pregnancy", date: "2026-07-04", readMins: 4, cover: "heart" as ArtKind,
    urls: ["https://www.nhs.uk/pregnancy/keeping-well/foods-to-avoid/", "https://www.efsa.europa.eu/en/topics/topic/caffeine"] },
  { slug: "does-caffeine-cause-anxiety", date: "2026-07-05", readMins: 4, cover: "gauge" as ArtKind,
    urls: ["https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20045678", "https://www.ncbi.nlm.nih.gov/books/NBK223808/"] },
  { slug: "matcha-vs-coffee-caffeine-and-focus", date: "2026-07-07", readMins: 4, cover: "leaf" as ArtKind,
    urls: ["https://nutritionsource.hsph.harvard.edu/food-features/tea/", "https://www.cspi.org/caffeine-chart"] },
  { slug: "how-much-caffeine-in-energy-drinks", date: "2026-07-08", readMins: 4, cover: "cups" as ArtKind,
    urls: ["https://www.cspi.org/caffeine-chart", "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20049372"] },
  { slug: "too-much-caffeine-symptoms", date: "2026-07-09", readMins: 4, cover: "heart" as ArtKind,
    urls: ["https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20045678", "https://www.efsa.europa.eu/en/topics/topic/caffeine"] },
  { slug: "caffeine-detox-timeline-what-to-expect", date: "2026-07-10", readMins: 5, cover: "taper" as ArtKind,
    urls: ["https://www.bodyspec.com/blog/post/caffeine_withdrawal_symptoms_timeline_and_coping_strategies", "https://www.efsa.europa.eu/en/topics/topic/caffeine"] },
  { slug: "caffeine-and-adhd", date: "2026-07-11", readMins: 4, cover: "beans" as ArtKind,
    urls: ["https://www.ncbi.nlm.nih.gov/books/NBK223808/", "https://www.sleepfoundation.org/nutrition/caffeine-and-sleep"] },
  { slug: "caffeine-before-workout-timing-and-dose", date: "2026-07-12", readMins: 4, cover: "mug" as ArtKind,
    urls: ["https://www.sleepfoundation.org/nutrition/caffeine-and-sleep", "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20049372"] },
  { slug: "what-is-matcha", date: "2026-07-13", readMins: 4, cover: "leaf" as ArtKind,
    urls: ["https://nutritionsource.hsph.harvard.edu/food-features/tea/", "https://www.cspi.org/caffeine-chart"] },
  { slug: "l-theanine-calm-focus", date: "2026-07-13", readMins: 4, cover: "moon" as ArtKind,
    urls: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC6836118/", "https://nutritionsource.hsph.harvard.edu/food-features/tea/"] },
  { slug: "matcha-health-benefits", date: "2026-07-13", readMins: 4, cover: "heart" as ArtKind,
    urls: ["https://www.nccih.nih.gov/health/green-tea", "https://nutritionsource.hsph.harvard.edu/food-features/tea/"] },
  { slug: "how-to-make-matcha-at-home", date: "2026-07-13", readMins: 4, cover: "mug" as ArtKind,
    urls: ["https://nutritionsource.hsph.harvard.edu/food-features/tea/", "https://www.cspi.org/caffeine-chart"] },
];

const CONTENT: Record<LocaleCode, Localized[]> = {
  en: [
    { title: "How long does caffeine stay in your body?",
      excerpt: "Caffeine's half-life is about 5–6 hours — here's what that means for the coffee you drank this afternoon, and when it finally leaves your system.",
      sourceLabels: ["Sleep Foundation — How long caffeine lasts", "NCBI — Pharmacology of Caffeine"],
      body: [
        { t: "p", s: "That 2 p.m. coffee isn't gone by dinner. Caffeine leaves your body on a predictable schedule set by its **half-life** — the most useful thing you can know about your daily habit." },
        { t: "h2", s: "What “half-life” means" },
        { t: "p", s: "Half-life is the time your body needs to clear **half** of a dose. In a healthy adult it averages **about 5–6 hours**, but ranges from roughly 1.5 to 9.5 hours depending on genes, age, liver and medications." },
        { t: "art", kind: "beans", caption: "That afternoon cup is still working hours later." },
        { t: "p", s: "Drink **200 mg** (a large coffee) at 9 a.m. and you still have about **100 mg** circulating by mid-afternoon. It takes roughly **5–6 half-lives — about a full day** for caffeine to be effectively gone." },
        { t: "h2", s: "Why your number is personal" },
        { t: "ul", items: [
          "**Pregnancy & oral contraceptives** slow it down — in late pregnancy the half-life can reach 15 hours.",
          "**Smoking** speeds it up, roughly halving the half-life.",
          "**Genetics (CYP1A2)** make some people fast metabolizers and others slow." ] },
        { t: "callout", s: "This is what Caffy models. Instead of a rule of thumb, it uses **your** half-life to show how much caffeine is active in your body right now." },
      ] },
    { title: "What time should you stop drinking coffee for better sleep?",
      excerpt: "A 2023 meta-analysis put a number on the old “no coffee after 2 p.m.” advice: stop about 8.8 hours before bed to protect your sleep.",
      sourceLabels: ["Gardiner et al. 2023, Sleep Medicine Reviews", "AJMC — Caffeine and sleep review"],
      body: [
        { t: "p", s: "You can fall asleep after an evening coffee and still sleep worse — caffeine quietly trades your **deep sleep** for lighter sleep." },
        { t: "h2", s: "What the research now says" },
        { t: "p", s: "A **2023 systematic review** in Sleep Medicine Reviews pooled 24 studies. On average, caffeine cut total sleep by **45 minutes**, lowered sleep efficiency, and shifted sleep toward lighter stages." },
        { t: "art", kind: "moon", caption: "Protect the sleep you can’t get back." },
        { t: "p", s: "Its practical guidance: a normal coffee (~107 mg) should be your last **at least 8.8 hours before bed**. A strong pre-workout (~217 mg) needs about **13 hours**." },
        { t: "h2", s: "Turn that into a cutoff time" },
        { t: "ul", items: [
          "Bed at 11 p.m.? Last coffee by roughly **2 p.m.**",
          "Bed at 10 p.m.? Aim for around **1 p.m.**",
          "Bigger dose or slow metabolism? Push it earlier." ] },
        { t: "callout", s: "Caffy calculates a personal **safe cutoff time** from your bedtime and metabolism — and warns you before an afternoon drink eats into tonight's sleep." },
      ] },
    { title: "How much caffeine is in coffee, tea, espresso and energy drinks?",
      excerpt: "Espresso, drip, cold brew, green tea, Red Bull — a clear, source-backed comparison so you know what you're really drinking.",
      sourceLabels: ["Mayo Clinic — Caffeine content of drinks", "CSPI — Caffeine chart"],
      body: [
        { t: "p", s: "“One coffee” can mean 60 mg or 300 mg. Here are typical amounts from Mayo Clinic and CSPI data — useful for staying under your daily limit." },
        { t: "art", kind: "mug", caption: "One “coffee” can be 60 mg — or 300." },
        { t: "h2", s: "Typical caffeine per serving" },
        { t: "ul", items: [
          "**Drip coffee (8 oz):** ~70–100 mg",
          "**Espresso (1 shot):** ~63–80 mg — strongest per ounce",
          "**Cold brew (8 oz):** ~100–200 mg",
          "**Black tea:** ~47–55 mg · **Green tea:** ~28–35 mg",
          "**Energy drink (8 oz, e.g. Red Bull):** ~80 mg",
          "**Energy shot (5-Hour Energy):** ~200 mg",
          "**Cola (12 oz):** ~35–40 mg" ] },
        { t: "h2", s: "Two things that trip people up" },
        { t: "p", s: "First, **size**: a 16 oz café coffee can hold 2–3 “cups” of caffeine. Second, **espresso feels stronger** but a single shot often has less total caffeine than a mug of drip — it's just concentrated." },
        { t: "callout", s: "Caffy has these drinks (and hundreds more) built in, so logging is a tap — and it adds each one to your live caffeine level." },
      ] },
    { title: "Safe daily caffeine limits: how much is too much?",
      excerpt: "The FDA and EFSA agree on 400 mg a day for most adults — and 200 mg in pregnancy. Here's what those numbers mean in cups.",
      sourceLabels: ["EFSA — Caffeine", "Coffee & Health — Guidelines on caffeine intake"],
      body: [
        { t: "p", s: "There's a widely agreed number for healthy adults, and both US and European regulators land on it." },
        { t: "h2", s: "The 400 mg rule" },
        { t: "p", s: "Both the **FDA** and the **European Food Safety Authority (EFSA)** consider up to **400 mg of caffeine per day** safe for most healthy, non-pregnant adults — roughly **four cups of coffee**." },
        { t: "art", kind: "heart", caption: "Too much shows up as jitters and a racing heart." },
        { t: "h2", s: "Pregnancy is different" },
        { t: "p", s: "ACOG, EFSA and the NHS all recommend **no more than 200 mg per day** in pregnancy. Caffeine is cleared much more slowly then — its half-life can rise to **~15 hours** in the third trimester, so it accumulates." },
        { t: "ul", items: [
          "Jitteriness, a racing heart, or anxiety",
          "Trouble falling or staying asleep",
          "Headaches, or an afternoon crash you “need” more caffeine to fix" ] },
        { t: "callout", s: "Caffy sets a personal daily limit and shows a live gauge, so you can see when you're approaching 400 mg — before, not after." },
      ] },
    { title: "How to cut back on caffeine without the headaches",
      excerpt: "Quitting cold turkey is why people fail. A gradual 1–2 week taper — plus an earlier daily cutoff — keeps withdrawal at bay.",
      sourceLabels: ["BodySpec — Caffeine withdrawal timeline", "EFSA — Caffeine"],
      body: [
        { t: "p", s: "If cutting back has ever left you with a two-day headache, the problem wasn't willpower — it was going too fast." },
        { t: "h2", s: "Why withdrawal happens" },
        { t: "p", s: "Cut caffeine abruptly and symptoms — **headache, fatigue, irritability** — typically begin **12–24 hours** later and can last **2–9 days**. It's a real rebound, not weakness." },
        { t: "art", kind: "leaf", caption: "Ease off gently — your body barely notices." },
        { t: "h2", s: "A taper that works" },
        { t: "ul", items: [
          "Reduce by roughly **10–25% every few days** over 1–2 weeks, not all at once.",
          "Swap **one regular cup for decaf** at a time — same ritual, less caffeine.",
          "Move your **cutoff earlier** first; late caffeine hurts sleep, which fuels the craving.",
          "Hydrate and expect a few flat days — it passes." ] },
        { t: "callout", s: "Caffy's detox plans build this taper for you (5–14 days) and track each day, so cutting back feels like progress instead of a fight." },
      ] },
    { title: "How much caffeine is safe during pregnancy?",
      excerpt: "Major health bodies agree: keep caffeine under 200 mg a day in pregnancy. Here's what that looks like in cups, and why your body clears it far more slowly now.",
      sourceLabels: ["NHS — Foods to avoid in pregnancy", "EFSA — Caffeine"],
      body: [
        { t: "p", s: "If you're pregnant and love your morning coffee, you don't have to give it up. But the safe amount is lower than usual, and your body now handles caffeine very differently." },
        { t: "h2", s: "The 200 mg rule" },
        { t: "p", s: "The **NHS**, **ACOG** and **EFSA** all recommend no more than **200 mg of caffeine a day** during pregnancy. That's roughly **two mugs of instant coffee**, or one medium filter coffee. The limit counts every source, including tea, cola, chocolate and energy drinks." },
        { t: "art", kind: "heart", caption: "About two mugs a day, counting every source together." },
        { t: "h2", s: "Why the limit is lower" },
        { t: "p", s: "Caffeine crosses the placenta, and a developing baby can't break it down. At the same time, your metabolism slows dramatically. Caffeine's half-life can climb from about 5 hours to **15 hours or more** by the third trimester, so it lingers and builds up far longer than usual." },
        { t: "ul", items: [
          "**Filter coffee:** about 140 mg per mug. One is fine, two is over.",
          "**Instant coffee:** about 100 mg. Two mugs is roughly your daily limit.",
          "**Tea:** about 75 mg per mug. **Cola:** about 40 mg per can.",
          "**Plain chocolate (50 g):** about 25 mg." ] },
        { t: "callout", s: "Because caffeine clears so slowly in pregnancy, Caffy lets you set a pregnancy profile. It uses the longer half-life to track your daily total against the 200 mg limit in real time." },
      ] },
    { title: "Does caffeine cause anxiety?",
      excerpt: "Caffeine doesn't invent anxiety, but it can amplify it, triggering the same racing heart and restlessness your body reads as fear. Here's the line between a buzz and the jitters.",
      sourceLabels: ["Mayo Clinic — Caffeine: how much is too much", "NCBI — Pharmacology of Caffeine"],
      body: [
        { t: "p", s: "That wired, on-edge feeling after one coffee too many isn't imaginary. There's a real chemical reason behind it." },
        { t: "h2", s: "Why caffeine feels like anxiety" },
        { t: "p", s: "Caffeine blocks **adenosine**, the calming chemical that signals rest, and triggers a release of **adrenaline**. The result is a faster heart rate, a tighter chest and restlessness, which is almost identical to the body's anxiety response. So your brain can read it as exactly that." },
        { t: "art", kind: "gauge", caption: "Past your personal limit, alertness tips into jitters." },
        { t: "h2", s: "Dose and sensitivity both matter" },
        { t: "p", s: "Most people tolerate up to **400 mg a day** without trouble, but anxiety-prone people are often far more sensitive. For them, even **200 mg** can set off symptoms. Your genes, especially the **CYP1A2** gene, decide how fast you clear caffeine and how long the edge lasts." },
        { t: "ul", items: [
          "A racing or pounding heart, restlessness, jitters",
          "Trouble sleeping, which itself worsens anxiety the next day",
          "A mid-afternoon crash that tempts another cup and feeds the cycle" ] },
        { t: "callout", s: "If coffee makes you anxious, the fix is usually timing and dose, not quitting. Caffy shows how much caffeine is active in your body right now, so you can find the amount that energizes without tipping you over." },
      ] },
    { title: "Matcha vs coffee: caffeine, L-theanine and calmer focus",
      excerpt: "Matcha has less caffeine than coffee but pairs it with L-theanine. That's the reason it gives steady focus instead of a spike and crash.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tea", "CSPI — Caffeine chart"],
      body: [
        { t: "p", s: "Matcha has become the go-to coffee alternative. Not because it's stronger, but because of how its caffeine feels." },
        { t: "h2", s: "How much caffeine each has" },
        { t: "p", s: "A cup of matcha has about **60–70 mg** of caffeine, while a mug of drip coffee has about **95–120 mg**. So coffee wins on raw caffeine. Matcha's appeal is the kind of energy it gives, not the amount." },
        { t: "art", kind: "leaf", caption: "Less caffeine, but paired with a calming amino acid." },
        { t: "h2", s: "The L-theanine difference" },
        { t: "p", s: "Matcha is rich in **L-theanine**, an amino acid that promotes calm, focused alertness. It smooths caffeine's sharp edge, and many people find matcha gives steadier focus without the jitters or the crash a big coffee can bring." },
        { t: "ul", items: [
          "**Coffee:** more caffeine, faster hit. Great for a hard morning start.",
          "**Matcha:** gentler, longer, calmer energy. Good for sustained focus.",
          "**It still counts:** matcha isn't caffeine-free, so it adds to your daily total." ] },
        { t: "callout", s: "Whether you switch to matcha or drink both, the caffeine adds up the same way. Caffy has matcha, coffee and hundreds of drinks built in, so you can log either with a tap and see your real daily total." },
      ] },
    { title: "How much caffeine is in energy drinks?",
      excerpt: "From an 80 mg Red Bull to a 300 mg Bang, energy-drink caffeine varies wildly. Here's a clear, brand-by-brand breakdown so you know what you're really drinking.",
      sourceLabels: ["CSPI — Caffeine chart", "Mayo Clinic — Caffeine content of drinks"],
      body: [
        { t: "p", s: "Energy drinks are where people most often blow past a safe caffeine limit without noticing, because the number on the can ranges from modest to enormous." },
        { t: "h2", s: "Caffeine by the can" },
        { t: "ul", items: [
          "**Red Bull (8.4 oz):** about 80 mg",
          "**Monster (16 oz):** about 160 mg. **White Monster:** about 160 mg",
          "**Celsius (12 oz):** about 200 mg",
          "**Alani Nu (12 oz):** about 200 mg",
          "**Bang (16 oz):** about 300 mg. **Reign (16 oz):** about 300 mg",
          "**5-Hour Energy (1.9 oz shot):** about 200 mg" ] },
        { t: "art", kind: "cups", caption: "One can can be anywhere from 80 to 300 mg." },
        { t: "h2", s: "Why it's easy to overdo" },
        { t: "p", s: "A single **Celsius or Alani is already half** the 400 mg daily limit for adults. Drink two of them, plus a morning coffee, and you're over, often without feeling like you drank that much. The large serving size hides the dose." },
        { t: "callout", s: "Caffy has these energy drinks built in with up-to-date caffeine amounts, so one tap logs the real number and warns you before two cans push you past your daily limit." },
      ] },
    { title: "Too much caffeine: symptoms and what to do",
      excerpt: "Jitters, a racing heart, nausea and anxiety are your body flagging a caffeine overload. Here's how to spot it, and how to come down safely.",
      sourceLabels: ["Mayo Clinic — Caffeine: how much is too much", "EFSA — Caffeine"],
      body: [
        { t: "p", s: "Caffeine has a comfortable zone and a clear line past it. Cross that line and your body sends unmistakable signals." },
        { t: "h2", s: "Signs you've had too much" },
        { t: "ul", items: [
          "**Jitters and shakiness**, restlessness, irritability",
          "**A racing or irregular heartbeat**, and higher blood pressure",
          "**Anxiety**, trouble sleeping, headache",
          "**Nausea or an upset stomach**" ] },
        { t: "art", kind: "heart", caption: "A racing heart is the classic overload signal." },
        { t: "h2", s: "How much is too much?" },
        { t: "p", s: "Symptoms usually show up above the **400 mg/day** mark for adults, or 200 mg in pregnancy, but sensitive people feel them far sooner. A genuine **caffeine overdose**, with vomiting, confusion and a very fast heartbeat, is rare but a medical emergency, and it's almost always tied to pills or powders, not coffee." },
        { t: "h2", s: "How to come down" },
        { t: "ul", items: [
          "**Stop all caffeine** for the rest of the day. No more to 'power through.'",
          "**Hydrate and walk it off.** Light movement helps.",
          "**Wait it out.** With a roughly 5–6 hour half-life, the worst passes in a few hours." ] },
        { t: "callout", s: "Most overloads are just a mistimed second or third cup. Caffy's live gauge shows when you're nearing your limit, so you can stop before the jitters start." },
      ] },
    { title: "Caffeine detox: the withdrawal timeline, day by day",
      excerpt: "Cutting caffeine? Withdrawal peaks around day one to two and fades within a week. Here's the hour-by-hour timeline, and how to make it easier.",
      sourceLabels: ["BodySpec — Caffeine withdrawal timeline", "EFSA — Caffeine"],
      body: [
        { t: "p", s: "When you quit or cut back on caffeine, the withdrawal follows a surprisingly predictable schedule. Knowing it makes the rough days much easier to ride out." },
        { t: "h2", s: "The withdrawal timeline" },
        { t: "ul", items: [
          "**12–24 hours:** the first headache and fatigue set in as adenosine floods back.",
          "**24–51 hours:** symptoms peak, with headache, irritability, low mood and brain fog.",
          "**2–9 days:** symptoms taper off, and most people feel normal within a week." ] },
        { t: "art", kind: "taper", caption: "Symptoms peak early, then fade over the week." },
        { t: "h2", s: "Why it happens" },
        { t: "p", s: "Regular caffeine makes your brain grow extra **adenosine receptors**. Take the caffeine away and they're suddenly unopposed, and that flood of adenosine is what causes the headache and heaviness. Your brain re-balances over several days." },
        { t: "h2", s: "Make it easier" },
        { t: "ul", items: [
          "**Taper, don't quit cold.** Cut 10–25% every few days instead of all at once.",
          "**Hydrate** and keep your sleep steady.",
          "Expect the worst on **day one to two**, then relief." ] },
        { t: "callout", s: "Caffy's detox plans build a gradual 5–14 day taper for you and track each day, so a caffeine detox feels like steady progress instead of a two-day headache." },
      ] },
    { title: "Caffeine and ADHD: does it actually help?",
      excerpt: "Caffeine is a mild stimulant, so it can sharpen focus for a while. But it's no substitute for ADHD treatment, and it can wreck the sleep that keeps symptoms in check.",
      sourceLabels: ["NCBI — Pharmacology of Caffeine", "Sleep Foundation — Caffeine and sleep"],
      body: [
        { t: "p", s: "Many people with ADHD find coffee helps them focus, and there's a real mechanism behind it. But the picture is more complicated than 'caffeine works.'" },
        { t: "h2", s: "Why it can help focus" },
        { t: "p", s: "Caffeine is a **stimulant** that blocks adenosine and nudges up **dopamine**, the same neurotransmitter ADHD medications target, just far more weakly. That can bring a modest, temporary lift in alertness and concentration." },
        { t: "art", kind: "beans", caption: "A mild lift in focus, not a treatment." },
        { t: "h2", s: "The catch" },
        { t: "p", s: "Caffeine is not a replacement for ADHD treatment, and its effect is small and short-lived. Worse, it can disrupt sleep, and poor sleep makes ADHD symptoms (inattention, impulsivity, restlessness) noticeably worse the next day, cancelling out any gain." },
        { t: "ul", items: [
          "Keep doses moderate. Large amounts trade focus for jitters.",
          "Watch the timing. Late caffeine hurts sleep, which backfires.",
          "On stimulant medication, adding caffeine can stack side effects, so ask your doctor." ] },
        { t: "callout", s: "If you use caffeine to focus, timing is everything. Caffy shows your active caffeine level and a personal cutoff time, so a focus boost today doesn't cost you tonight's sleep." },
      ] },
    { title: "Caffeine before a workout: how much and when",
      excerpt: "Caffeine is one of the best-studied performance boosters, if you time it right. Here's the dose and timing that helps, without wrecking your sleep.",
      sourceLabels: ["Sleep Foundation — Caffeine and sleep", "Mayo Clinic — Caffeine content of drinks"],
      body: [
        { t: "p", s: "Caffeine genuinely improves endurance, strength and focus in training, which is why it's in almost every pre-workout. The trick is dose and timing." },
        { t: "h2", s: "How much helps" },
        { t: "p", s: "Sports-nutrition research points to roughly **3–6 mg per kg of body weight** for a performance benefit, about **200–400 mg** for a 70 kg person. More than that rarely helps and just adds jitters. A strong coffee, around 150–200 mg, is enough for most people." },
        { t: "art", kind: "mug", caption: "A strong coffee is enough for most workouts." },
        { t: "h2", s: "When to take it" },
        { t: "p", s: "Caffeine peaks in your blood **30–60 minutes** after you drink it, so take it about **45 minutes before** you train. That's also why a pre-workout is often one of your biggest caffeine hits of the day." },
        { t: "ul", items: [
          "**Mind the timing.** An evening workout means an evening dose, which can wreck your sleep.",
          "**Caffeine-free pre-workout** is a valid option for late training.",
          "It still counts toward your **daily 400 mg** limit." ] },
        { t: "callout", s: "A pre-workout is often someone's single biggest dose of the day. Caffy logs it in a tap and folds it into your daily total and your sleep cutoff, so training hard doesn't have to mean sleeping badly." },
      ] },
    { title: "What is matcha? A simple guide to the green tea everyone's drinking",
      excerpt: "Matcha is powdered green tea you whisk into water, not steep. Here's what it is, how much caffeine it has and why it feels different from coffee.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tea", "CSPI — Caffeine chart"],
      body: [
        { t: "p", s: "Matcha is everywhere right now, from cafés to supermarket shelves. But it's a little different from any other tea, and that difference is the whole point." },
        { t: "h2", s: "It's whole green tea, powdered" },
        { t: "p", s: "Matcha is made from green tea leaves that are shade-grown, dried and ground into a fine powder. Instead of steeping leaves and throwing them away, you whisk the powder into hot water and drink the whole leaf. That's why matcha is more concentrated, in both flavour and compounds." },
        { t: "art", kind: "leaf", caption: "You drink the whole leaf, not just an infusion." },
        { t: "h2", s: "How much caffeine is in it?" },
        { t: "p", s: "A cup of matcha has roughly **60–70 mg** of caffeine, a little less than a mug of coffee but more than regular steeped green tea. It also contains **L-theanine**, an amino acid that gives matcha its calmer, steadier kind of energy." },
        { t: "ul", items: [
          "**Ceremonial grade:** brighter and smoother, meant to drink with just water.",
          "**Culinary grade:** stronger and more bitter, made for lattes and baking.",
          "**Flavour:** grassy and slightly sweet, with a savoury note called umami." ] },
        { t: "callout", s: "However you drink it, matcha still adds caffeine to your day. Caffy has matcha built in, so you can log a cup in a tap and keep your daily total accurate." },
      ] },
    { title: "L-theanine: the amino acid behind matcha's calm focus",
      excerpt: "L-theanine is the compound that makes tea feel calmer than coffee. Paired with caffeine, it can sharpen focus while taking the edge off the jitters.",
      sourceLabels: ["NIH / PMC — L-theanine and mental state", "Harvard T.H. Chan — The Nutrition Source: Tea"],
      body: [
        { t: "p", s: "If matcha or green tea leaves you alert but not wired, you're feeling L-theanine at work." },
        { t: "h2", s: "What L-theanine does" },
        { t: "p", s: "L-theanine is an amino acid found almost only in tea. On its own it promotes a state of **calm, relaxed alertness** without making you drowsy. Research has linked it to lower stress and better attention." },
        { t: "art", kind: "moon", caption: "Alert, but calm rather than wired." },
        { t: "h2", s: "Why it pairs so well with caffeine" },
        { t: "p", s: "Caffeine and L-theanine work as a team. Caffeine lifts alertness, and L-theanine smooths its rough edges, so together they tend to give **steady focus with fewer jitters** than caffeine alone. That combination is why a cup of matcha can feel cleaner than a strong coffee." },
        { t: "ul", items: [
          "**In tea:** matcha has the most, followed by other green and black teas.",
          "**With caffeine:** the pairing is the classic 'calm focus' effect.",
          "**Not a sedative:** it relaxes the mind without making you sleepy." ] },
        { t: "callout", s: "L-theanine changes how caffeine feels, but not how much you've had. Caffy tracks the caffeine in your matcha and coffee so your daily total stays honest." },
      ] },
    { title: "Matcha health benefits: what the evidence actually says",
      excerpt: "Matcha is rich in antioxidants and L-theanine, and the research is promising. But it's worth separating the solid findings from the hype.",
      sourceLabels: ["NCCIH (NIH) — Green tea", "Harvard T.H. Chan — The Nutrition Source: Tea"],
      body: [
        { t: "p", s: "Matcha gets called a superfood, and it does have real strengths. But the honest picture is 'promising, not proven,' and that's worth knowing before you buy in." },
        { t: "h2", s: "What's well supported" },
        { t: "p", s: "Because you drink the whole leaf, matcha is especially rich in **catechins**, a group of antioxidants that includes EGCG. Green tea catechins are linked to modest improvements in **cholesterol**, and its **L-theanine** has decent evidence for calm and focus." },
        { t: "art", kind: "heart", caption: "Real strengths, with honest limits." },
        { t: "h2", s: "Where the claims outrun the science" },
        { t: "p", s: "Bigger claims, like major weight loss or disease prevention, are not settled. Health bodies such as the NIH note that the evidence is still mixed. Matcha is a genuinely healthy drink, but it isn't a cure." },
        { t: "ul", items: [
          "**Antioxidants:** high in catechins, because you drink the whole leaf.",
          "**Calm focus:** L-theanine plus caffeine has the best evidence.",
          "**Caution:** it still contains caffeine, so your daily limit still applies." ] },
        { t: "callout", s: "The healthy way to enjoy matcha is to keep an eye on the caffeine. Caffy logs each cup and keeps your daily total under your personal limit." },
      ] },
    { title: "How to make matcha at home (and pick a good one)",
      excerpt: "Good matcha is easy to make once you know the ratio and the whisk. Here's a simple method, plus how to choose a powder that isn't bitter.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tea", "CSPI — Caffeine chart"],
      body: [
        { t: "p", s: "Bad matcha is bitter and clumpy. Good matcha is smooth and naturally a little sweet, and the difference is mostly technique and quality, not luck." },
        { t: "h2", s: "A simple method" },
        { t: "ul", items: [
          "**Sift** 1–2 teaspoons of matcha into a cup to remove clumps.",
          "**Add** about 60 ml of water at 70–80°C. Boiling water turns it bitter.",
          "**Whisk** briskly in a zigzag with a bamboo whisk until frothy.",
          "**For a latte:** pour steamed milk on top afterwards." ] },
        { t: "art", kind: "mug", caption: "Not boiling water, and whisk until frothy." },
        { t: "h2", s: "Choosing a good matcha" },
        { t: "p", s: "Look for a **vivid green** colour, which signals freshness, and a Japanese origin such as Uji. **Ceremonial grade** is best for drinking with water, while **culinary grade** is cheaper and fine for lattes, where the milk hides any bitterness." },
        { t: "callout", s: "One cup of matcha is roughly 60–70 mg of caffeine. Caffy has it built in, so your morning bowl counts toward your daily total automatically." },
      ] },
  ],
  tr: [
    { title: "Kafein vücudunda ne kadar kalır?",
      excerpt: "Kafeinin yarı ömrü yaklaşık 5–6 saat — öğleden sonra içtiğin kahvenin ne anlama geldiğini ve sistemden ne zaman çıktığını açıklıyoruz.",
      sourceLabels: ["Sleep Foundation — Kafein ne kadar sürer", "NCBI — Kafein Farmakolojisi"],
      body: [
        { t: "p", s: "Öğleden sonra 2'deki kahve akşam yemeğinde bitmiş olmaz. Kafein vücuttan **yarı ömrünün** belirlediği öngörülebilir bir programla atılır — günlük alışkanlığın hakkında bilebileceğin en yararlı şey budur." },
        { t: "h2", s: "“Yarı ömür” ne demek?" },
        { t: "p", s: "Yarı ömür, vücudunun bir dozun **yarısını** atması için gereken süredir. Sağlıklı bir yetişkinde ortalama **5–6 saat**, ama genler, yaş, karaciğer ve ilaçlara göre kabaca 1,5 ile 9,5 saat arasında değişir." },
        { t: "art", kind: "beans", caption: "O öğleden sonraki kahve saatler sonra hâlâ etkili." },
        { t: "p", s: "Sabah 9'da **200 mg** (büyük bir kahve) içersen, öğleden sonra hâlâ yaklaşık **100 mg** dolaşımda olur. Kafeinin etkisiz hâle gelmesi için kabaca **5–6 yarı ömür — neredeyse tam bir gün** gerekir." },
        { t: "h2", s: "Neden senin rakamın kişisel?" },
        { t: "ul", items: [
          "**Hamilelik ve doğum kontrol hapları** yavaşlatır — geç hamilelikte yarı ömür 15 saate çıkabilir.",
          "**Sigara** hızlandırır, yarı ömrü kabaca yarıya indirir.",
          "**Genetik (CYP1A2)** kimini hızlı kimini yavaş metabolize edici yapar." ] },
        { t: "callout", s: "Caffy tam da bunu modelliyor. Genel bir kurala değil, **senin** yarı ömrüne göre şu an vücudunda ne kadar kafein aktif olduğunu gösterir." },
      ] },
    { title: "Daha iyi uyku için kahveyi ne zaman bırakmalısın?",
      excerpt: "2023 meta-analizi eski “öğleden sonra 2'den sonra kahve yok” tavsiyesine bir rakam koydu: uykunu korumak için yatmadan yaklaşık 8,8 saat önce bırak.",
      sourceLabels: ["Gardiner ve ark. 2023, Sleep Medicine Reviews", "AJMC — Kafein ve uyku incelemesi"],
      body: [
        { t: "p", s: "Akşam kahvesinden sonra uykuya dalabilirsin ama yine de daha kötü uyursun — kafein sessizce **derin uykunu** hafif uykuyla takas eder." },
        { t: "h2", s: "Araştırma ne diyor?" },
        { t: "p", s: "Sleep Medicine Reviews'daki **2023 sistematik incelemesi** 24 çalışmayı birleştirdi. Ortalama olarak kafein toplam uykuyu **45 dakika** azalttı, uyku verimini düşürdü ve uykuyu daha hafif evrelere kaydırdı." },
        { t: "art", kind: "moon", caption: "Geri alamayacağın uykuyu koru." },
        { t: "p", s: "Pratik önerisi: normal bir kahve (~107 mg) son olarak **yatmadan en az 8,8 saat önce** içilmeli. Güçlü bir pre-workout (~217 mg) ise yaklaşık **13 saat** ister." },
        { t: "h2", s: "Bunu bir kesim saatine çevir" },
        { t: "ul", items: [
          "Yatış 23:00 mü? Son kahve kabaca **14:00**.",
          "Yatış 22:00 mü? Yaklaşık **13:00**'ı hedefle.",
          "Doz büyük ya da metabolizman yavaşsa daha erkene çek." ] },
        { t: "callout", s: "Caffy, yatış saatin ve metabolizmandan kişisel bir **güvenli kesim saati** hesaplar — ve öğleden sonraki bir içecek bu geceki uykunu yemeden önce seni uyarır." },
      ] },
    { title: "Kahve, çay, espresso ve enerji içeceğinde ne kadar kafein var?",
      excerpt: "Espresso, filtre, cold brew, yeşil çay, Red Bull — gerçekte ne içtiğini bilmen için net, kaynaklı bir karşılaştırma.",
      sourceLabels: ["Mayo Clinic — İçeceklerin kafein içeriği", "CSPI — Kafein tablosu"],
      body: [
        { t: "p", s: "“Bir kahve” 60 mg da olabilir 300 mg da. İşte Mayo Clinic ve CSPI verilerine göre tipik miktarlar — günlük limitinin altında kalmak için." },
        { t: "art", kind: "mug", caption: "“Bir kahve” 60 mg da olabilir, 300 de." },
        { t: "h2", s: "Porsiyon başına tipik kafein" },
        { t: "ul", items: [
          "**Filtre kahve (240 ml):** ~70–100 mg",
          "**Espresso (1 shot):** ~63–80 mg — ml başına en güçlüsü",
          "**Cold brew (240 ml):** ~100–200 mg",
          "**Siyah çay:** ~47–55 mg · **Yeşil çay:** ~28–35 mg",
          "**Enerji içeceği (240 ml, ör. Red Bull):** ~80 mg",
          "**Enerji shot (5-Hour Energy):** ~200 mg",
          "**Kola (355 ml):** ~35–40 mg" ] },
        { t: "h2", s: "İnsanları yanıltan iki şey" },
        { t: "p", s: "Birincisi **boyut**: 470 ml'lik bir zincir kahvesi 2–3 “fincan” kafein taşıyabilir. İkincisi, **espresso daha güçlü hissettirir** ama tek shot çoğu zaman bir fincan filtreden daha az toplam kafein içerir — sadece yoğundur." },
        { t: "callout", s: "Caffy'de bu içecekler (ve yüzlercesi) hazır; kaydetmek tek dokunuş — ve her biri canlı kafein seviyene eklenir." },
      ] },
    { title: "Güvenli günlük kafein limiti: ne kadarı fazla?",
      excerpt: "FDA ve EFSA çoğu yetişkin için günde 400 mg'da hemfikir — hamilelikte 200 mg. Bu rakamların fincan cinsinden karşılığı.",
      sourceLabels: ["EFSA — Kafein", "Coffee & Health — Kafein alım kılavuzu"],
      body: [
        { t: "p", s: "Sağlıklı yetişkinler için geniş kabul gören bir rakam var ve hem ABD hem Avrupa düzenleyicileri aynı sayıda buluşuyor." },
        { t: "h2", s: "400 mg kuralı" },
        { t: "p", s: "Hem **FDA** hem **Avrupa Gıda Güvenliği Otoritesi (EFSA)**, çoğu sağlıklı, hamile olmayan yetişkin için günde **400 mg'a kadar kafeini** güvenli sayıyor — kabaca **dört fincan kahve**." },
        { t: "art", kind: "heart", caption: "Fazlası titreme ve hızlı çarpan bir kalp olarak çıkar." },
        { t: "h2", s: "Hamilelik farklı" },
        { t: "p", s: "ACOG, EFSA ve NHS, hamilelikte **günde 200 mg'dan fazla olmamasını** öneriyor. Kafein o dönemde çok daha yavaş atılır — üçüncü trimesterde yarı ömrü **~15 saate** çıkar, yani birikir." },
        { t: "ul", items: [
          "Titreme, hızlı çarpan kalp ya da kaygı",
          "Uykuya dalma veya uykuda kalma sorunu",
          "Baş ağrısı ya da daha fazla kafeinle “çözmen gereken” bir öğleden sonra çöküşü" ] },
        { t: "callout", s: "Caffy kişisel bir günlük limit belirler ve canlı bir gösterge sunar; böylece 400 mg'a yaklaştığını sonradan değil önceden görürsün." },
      ] },
    { title: "Baş ağrısı olmadan kafeini nasıl azaltırsın?",
      excerpt: "Aniden bırakmak insanların başarısız olma sebebidir. 1–2 haftalık kademeli azaltma — ve daha erken bir kesim saati — yoksunluğu uzak tutar.",
      sourceLabels: ["BodySpec — Kafein yoksunluğu zaman çizelgesi", "EFSA — Kafein"],
      body: [
        { t: "p", s: "Azaltmak seni hiç iki günlük bir baş ağrısıyla bıraktıysa, sorun irade değildi — çok hızlı gitmekti." },
        { t: "h2", s: "Yoksunluk neden olur?" },
        { t: "p", s: "Kafeini aniden kesince belirtiler — **baş ağrısı, yorgunluk, sinirlilik** — genelde **12–24 saat** sonra başlar ve **2–9 gün** sürebilir. Bu gerçek bir geri tepmedir, zayıflık değil." },
        { t: "art", kind: "leaf", caption: "Nazikçe azalt — vücudun neredeyse fark etmez." },
        { t: "h2", s: "İşe yarayan bir azaltma" },
        { t: "ul", items: [
          "1–2 hafta boyunca hepsini birden değil, **birkaç günde bir kabaca %10–25** azalt.",
          "Her seferinde **bir normal fincanı decaf ile değiştir** — aynı ritüel, daha az kafein.",
          "Önce **kesim saatini erkene** çek; geç kafein uykuyu bozar, o da isteği besler.",
          "Bol su iç ve birkaç durgun güne hazırlıklı ol — geçer." ] },
        { t: "callout", s: "Caffy'nin detoks planları bu azaltmayı senin için kurar (5–14 gün) ve her günü takip eder; böylece azaltmak bir savaş değil, ilerleme gibi hissettirir." },
      ] },
    { title: "Hamilelikte ne kadar kafein güvenli?",
      excerpt: "Büyük sağlık kurumları aynı fikirde: hamilelikte kafeini günde 200 mg'ın altında tut. Bunun kaç fincana denk geldiğini ve vücudunun kafeini neden çok daha yavaş attığını anlatıyoruz.",
      sourceLabels: ["NHS — Hamilelikte kaçınılacak besinler", "EFSA — Kafein"],
      body: [
        { t: "p", s: "Hamileysen ve sabah kahveni seviyorsan, kahveyi tamamen bırakman gerekmez. Ama güvenli miktar normalden daha düşük ve vücudun artık kafeini çok farklı işliyor." },
        { t: "h2", s: "200 mg kuralı" },
        { t: "p", s: "**NHS**, **ACOG** ve **EFSA**'nın üçü de hamilelikte günde **200 mg'dan fazla kafein** alınmamasını öneriyor. Bu yaklaşık iki fincan hazır kahveye ya da bir orta boy filtre kahveye denk geliyor. Üstelik bu sınıra çay, kola, çikolata ve enerji içecekleri gibi kafein içeren her şey dahil." },
        { t: "art", kind: "heart", caption: "Günde yaklaşık iki fincan, hem de tüm kaynaklar bir arada." },
        { t: "h2", s: "Sınır neden daha düşük?" },
        { t: "p", s: "Kafein plasentayı geçiyor ve gelişmekte olan bebek onu parçalayamıyor. Aynı dönemde senin metabolizman da belirgin şekilde yavaşlıyor. Kafeinin yarı ömrü son üç ayda yaklaşık 5 saatten **15 saat ve üzerine** çıkabiliyor. Yani kafein vücudunda her zamankinden çok daha uzun süre kalıyor ve birikiyor." },
        { t: "ul", items: [
          "**Filtre kahve:** fincan başına yaklaşık 140 mg. Biri sınır içinde, ikincisi sınırı aşıyor.",
          "**Hazır kahve:** yaklaşık 100 mg. İki fincan neredeyse günlük sınırına eşit.",
          "**Çay:** fincan başına yaklaşık 75 mg. **Kola:** kutu başına yaklaşık 40 mg.",
          "**Sade çikolata (50 g):** yaklaşık 25 mg." ] },
        { t: "callout", s: "Kafein hamilelikte çok yavaş atıldığı için Caffy'de hamilelik profili oluşturabilirsin. Uygulama uzayan yarı ömrü hesaba katarak günlük toplamını 200 mg sınırına göre anlık takip eder." },
      ] },
    { title: "Kafein anksiyete yapar mı?",
      excerpt: "Kafein anksiyeteyi yoktan yaratmaz ama var olanı büyütebilir. Vücudunun korku sandığı o hızlı kalbi ve huzursuzluğu tetikler. Peki keyifli enerji ile titreme arasındaki çizgi tam olarak nerede?",
      sourceLabels: ["Mayo Clinic — Kafein: ne kadarı fazla", "NCBI — Kafein Farmakolojisi"],
      body: [
        { t: "p", s: "Bir fazla kahveden sonra gelen o gergin, tetikte olma hissi hayal ürünü değil. Arkasında gerçek bir kimyasal sebep var." },
        { t: "h2", s: "Kafein neden anksiyete gibi hissettirir?" },
        { t: "p", s: "Kafein, dinlenme sinyali veren sakinleştirici bir madde olan **adenozini** bloke eder ve **adrenalin** salınımını tetikler. Ortaya çıkan tablo, yani hızlanan kalp, sıkışan göğüs ve huzursuzluk, vücudun anksiyete tepkisiyle neredeyse birebir aynıdır. Bu yüzden beynin bunu doğrudan kaygı olarak algılayabilir." },
        { t: "art", kind: "gauge", caption: "Kişisel sınırını aşınca uyanıklık yerini titremeye bırakır." },
        { t: "h2", s: "Hem doz hem hassasiyet önemli" },
        { t: "p", s: "Çoğu insan günde 400 mg'a kadar kafeini sorunsuz kaldırır. Ama anksiyeteye yatkın kişiler genelde çok daha hassastır ve onlarda 200 mg bile belirtileri başlatabilir. Kafeini ne kadar hızlı attığını ve gerginliğin ne kadar sürdüğünü büyük ölçüde genlerin, özellikle de **CYP1A2** geni belirler." },
        { t: "ul", items: [
          "Hızlı ya da güçlü çarpan bir kalp, huzursuzluk, titreme",
          "Uykuya dalmakta zorlanma; bu da ertesi gün kaygıyı artırır",
          "Öğleden sonra gelen ve bir kahve daha içirten enerji düşüşü, kısır döngüyü besler" ] },
        { t: "callout", s: "Kahve seni kaygılandırıyorsa çözüm genelde kahveyi bırakmak değil, doğru zaman ve doğru dozdur. Caffy şu an vücudunda ne kadar kafein aktif olduğunu gösterir; böylece seni aşırıya kaçırmadan enerji veren miktarı bulabilirsin." },
      ] },
    { title: "Matcha mı kahve mi? Kafein, L-theanine ve daha sakin bir odak",
      excerpt: "Matcha'da kahveden daha az kafein var ama yanında L-theanine geliyor. Matcha'ya ani bir zirve ve çöküş yerine dengeli bir odak kazandıran şey tam da bu.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Çay", "CSPI — Kafein tablosu"],
      body: [
        { t: "p", s: "Matcha son dönemde en popüler kahve alternatifi oldu. Bunun sebebi daha güçlü olması değil, verdiği enerji hissinin farklı olması." },
        { t: "h2", s: "Hangisinde ne kadar kafein var?" },
        { t: "p", s: "Bir fincan matcha yaklaşık **60-70 mg**, bir fincan filtre kahve ise yaklaşık **95-120 mg** kafein içerir. Yani ham kafein miktarında kahve önde. Matcha'nın asıl cazibesi miktarında değil, verdiği enerjinin türünde." },
        { t: "art", kind: "leaf", caption: "Daha az kafein, ama yanında sakinleştirici bir amino asitle." },
        { t: "h2", s: "L-theanine farkı" },
        { t: "p", s: "Matcha, sakin ve odaklı bir uyanıklık sağlayan **L-theanine** amino asidi açısından zengindir. Bu madde kafeinin sert etkisini yumuşatır. Çoğu kişi, büyük bir kahvenin getirdiği titreme ve çöküş olmadan matcha ile daha dengeli bir odak yakaladığını söyler." },
        { t: "ul", items: [
          "**Kahve:** daha çok kafein, daha hızlı etki. Zorlu bir sabaha başlamak için ideal.",
          "**Matcha:** daha yumuşak, daha uzun ve daha sakin enerji. Uzun süreli odak için iyi.",
          "**Yine de sayılır:** matcha kafeinsiz değildir, günlük toplamına eklenir." ] },
        { t: "callout", s: "İster matcha'ya geç ister ikisini birlikte iç, kafein aynı şekilde birikir. Caffy'de matcha, kahve ve yüzlerce içecek hazır tanımlı gelir. Herhangi birini tek dokunuşla kaydeder ve gerçek günlük toplamını görürsün." },
      ] },
    { title: "Enerji içeceklerinde ne kadar kafein var?",
      excerpt: "80 mg'lık bir Red Bull'dan 300 mg'lık bir Bang'e kadar enerji içeceklerinin kafeini uçtan uca değişiyor. Ne içtiğini net bilmen için marka marka bir döküm hazırladık.",
      sourceLabels: ["CSPI — Kafein tablosu", "Mayo Clinic — İçeceklerin kafein içeriği"],
      body: [
        { t: "p", s: "İnsanların güvenli kafein sınırını fark etmeden en çok aştığı yer enerji içecekleridir. Çünkü kutunun üstündeki rakam markadan markaya, ölçülüden devasaya kadar değişir." },
        { t: "h2", s: "Kutu başına kafein" },
        { t: "ul", items: [
          "**Red Bull (250 ml):** yaklaşık 80 mg",
          "**Monster (500 ml):** yaklaşık 160 mg. **White Monster:** yaklaşık 160 mg",
          "**Celsius (355 ml):** yaklaşık 200 mg",
          "**Alani Nu (355 ml):** yaklaşık 200 mg",
          "**Bang (500 ml):** yaklaşık 300 mg. **Reign (500 ml):** yaklaşık 300 mg",
          "**5-Hour Energy (57 ml):** yaklaşık 200 mg" ] },
        { t: "art", kind: "cups", caption: "Bir kutu 80 mg da olabilir, 300 mg da." },
        { t: "h2", s: "Neden abartması bu kadar kolay?" },
        { t: "p", s: "Tek bir Celsius ya da Alani, yetişkinler için günlük 400 mg sınırının zaten yarısı demek. İkisini içip üstüne bir de sabah kahvesi eklersen, o kadar içtiğini hissetmeden sınırı aşarsın. Büyük kutu boyutu dozu gözden gizler." },
        { t: "callout", s: "Caffy'de bu enerji içecekleri güncel kafein değerleriyle hazır tanımlı gelir. Tek dokunuş gerçek miktarı kaydeder ve iki kutu seni günlük sınırının ötesine taşımadan önce uyarır." },
      ] },
    { title: "Çok fazla kafein: belirtiler ve ne yapmalı?",
      excerpt: "Titreme, hızlı çarpan bir kalp, mide bulantısı ve kaygı, vücudunun aşırı kafeini haber vermesidir. Bu belirtileri nasıl tanıyacağını ve güvenle nasıl sakinleşeceğini anlatıyoruz.",
      sourceLabels: ["Mayo Clinic — Kafein: ne kadarı fazla", "EFSA — Kafein"],
      body: [
        { t: "p", s: "Kafeinin rahat bir aralığı, bir de bu aralığın bittiği net bir çizgisi vardır. O çizgiyi aşınca vücudun sana açık sinyaller gönderir." },
        { t: "h2", s: "Fazla kaçırdığının işaretleri" },
        { t: "ul", items: [
          "**Titreme ve el ayak titremesi**, huzursuzluk, sinirlilik",
          "**Hızlı ya da düzensiz kalp atışı** ve yükselen tansiyon",
          "**Kaygı**, uykuya dalmakta zorlanma, baş ağrısı",
          "**Mide bulantısı ya da mide rahatsızlığı**" ] },
        { t: "art", kind: "heart", caption: "Hızlı çarpan bir kalp, en klasik aşırı yükleme sinyalidir." },
        { t: "h2", s: "Ne kadarı fazla sayılır?" },
        { t: "p", s: "Belirtiler genelde yetişkinlerde günde 400 mg sınırının üzerinde başlar, hamilelikte ise bu sınır 200 mg'dır. Hassas kişiler bunları çok daha erken hisseder. Kusma, zihin bulanıklığı ve çok hızlı kalp atışıyla giden gerçek bir **kafein zehirlenmesi** ise nadirdir. Bu bir tıbbi acil durumdur ve neredeyse her zaman kahveden değil, kafein hapı ya da tozundan kaynaklanır." },
        { t: "h2", s: "Nasıl sakinleşirsin?" },
        { t: "ul", items: [
          "Günün geri kalanında **tüm kafeini bırak.** 'Dayanmak için bir tane daha' yok.",
          "**Su iç ve biraz yürü.** Hafif hareket rahatlatır.",
          "**Geçmesini bekle.** Yaklaşık 5-6 saatlik yarı ömürle en yoğun kısım birkaç saatte geçer." ] },
        { t: "callout", s: "Aşırı yüklemelerin çoğu, sadece zamanı kötü seçilmiş ikinci ya da üçüncü fincandır. Caffy'nin canlı göstergesi sınırına yaklaştığını gösterir; böylece titreme başlamadan durabilirsin." },
      ] },
    { title: "Kafein detoksu: gün gün yoksunluk takvimi",
      excerpt: "Kafeini mi azaltıyorsun? Yoksunluk genelde birinci ve ikinci günde zirve yapar, bir hafta içinde de geçer. İşte saat saat yoksunluk takvimi ve bu süreci kolaylaştırmanın yolları.",
      sourceLabels: ["BodySpec — Kafein yoksunluğu takvimi", "EFSA — Kafein"],
      body: [
        { t: "p", s: "Kafeini bıraktığında ya da azalttığında yoksunluk şaşırtıcı derecede öngörülebilir bir seyir izler. Bu seyri bilmek, zorlu günleri atlatmayı çok kolaylaştırır." },
        { t: "h2", s: "Yoksunluk takvimi" },
        { t: "ul", items: [
          "**12-24 saat:** adenozin geri devreye girdikçe ilk baş ağrısı ve yorgunluk başlar.",
          "**24-51 saat:** belirtiler zirveye çıkar. Baş ağrısı, sinirlilik, düşük ruh hali ve zihin bulanıklığı en yoğun bu aralıkta hissedilir.",
          "**2-9 gün:** belirtiler yavaş yavaş azalır. Çoğu insan bir hafta içinde kendini normal hisseder." ] },
        { t: "art", kind: "taper", caption: "Belirtiler erken zirve yapar, sonra hafta boyunca söner." },
        { t: "h2", s: "Bu neden olur?" },
        { t: "p", s: "Düzenli kafein, beyninin fazladan **adenozin reseptörü** üretmesine yol açar. Kafeini kestiğinde bu reseptörler bir anda karşılıksız kalır ve ortaya çıkan adenozin dalgası baş ağrısı ile ağırlık hissine neden olur. Beynin birkaç gün içinde yeniden dengeye gelir." },
        { t: "h2", s: "Süreci kolaylaştır" },
        { t: "ul", items: [
          "**Aniden değil, kademeli bırak.** Hepsini birden kesmek yerine birkaç günde bir yüzde 10-25 azalt.",
          "**Bol su iç** ve uyku düzenini koru.",
          "En zor günün **birinci ya da ikinci gün** olacağını bil; sonrası rahatlar." ] },
        { t: "callout", s: "Caffy'nin detoks planları senin için 5-14 günlük kademeli bir azaltma programı kurar ve her günü takip eder. Böylece kafein detoksu iki günlük bir baş ağrısı değil, adım adım ilerleyen bir süreç gibi hissettirir." },
      ] },
    { title: "Kafein ve DEHB: gerçekten işe yarar mı?",
      excerpt: "Kafein hafif bir uyarıcı olduğu için bir süreliğine odağı keskinleştirebilir. Ama DEHB tedavisinin yerini tutmaz ve belirtileri kontrol altında tutan uykuyu bozabilir.",
      sourceLabels: ["NCBI — Kafein Farmakolojisi", "Sleep Foundation — Kafein ve uyku"],
      body: [
        { t: "p", s: "DEHB'si olan birçok kişi kahvenin odaklanmasına yardımcı olduğunu söyler ve bunun arkasında gerçek bir mekanizma var. Ama tablo 'kafein işe yarıyor' demekten daha karmaşık." },
        { t: "h2", s: "Odağa neden yardımcı olabilir?" },
        { t: "p", s: "Kafein, adenozini bloke eden ve **dopamini** hafifçe yükselten bir **uyarıcıdır**. Dopamin, DEHB ilaçlarının da hedeflediği kimyasaldır ama kafein bunu çok daha zayıf yapar. Yine de bu, uyanıklık ve konsantrasyonda ölçülü ve geçici bir artış sağlayabilir." },
        { t: "art", kind: "beans", caption: "Odakta hafif bir yükseliş, ama bir tedavi değil." },
        { t: "h2", s: "İşin zor yanı" },
        { t: "p", s: "Kafein DEHB tedavisinin yerini tutmaz ve etkisi hem küçük hem kısa ömürlüdür. Dahası uykuyu bozabilir. Kötü uyku ise DEHB belirtilerini, yani dikkat dağınıklığını, dürtüselliği ve huzursuzluğu ertesi gün belirgin şekilde artırır ve elde ettiğin faydayı silip götürür." },
        { t: "ul", items: [
          "Dozu ölçülü tut. Fazla miktar odağı titremeyle değiştirir.",
          "Zamanlamaya dikkat et. Geç saatte kafein uykuya zarar verir ve ters teper.",
          "Uyarıcı bir ilaç kullanıyorsan kafein eklemek yan etkileri üst üste bindirebilir. Doktoruna danış." ] },
        { t: "callout", s: "Odaklanmak için kafein kullanıyorsan her şey zamanlamada. Caffy aktif kafein seviyeni ve sana özel bir kesme saatini gösterir; böylece bugünkü odak artışı bu geceki uykuna mal olmaz." },
      ] },
    { title: "Antrenman öncesi kafein: ne kadar ve ne zaman?",
      excerpt: "Kafein, doğru zamanlandığında en çok araştırılmış performans artırıcılardan biridir. İşte uykunu bozmadan işe yarayan doz ve zamanlama.",
      sourceLabels: ["Sleep Foundation — Kafein ve uyku", "Mayo Clinic — İçeceklerin kafein içeriği"],
      body: [
        { t: "p", s: "Kafein antrenmanda dayanıklılığı, gücü ve odağı gerçekten artırır. Neredeyse her pre-workout ürününde bulunmasının sebebi de bu. İşin püf noktası doz ve zamanlamada." },
        { t: "h2", s: "Ne kadarı işe yarar?" },
        { t: "p", s: "Spor beslenmesi araştırmaları, performans faydası için kabaca **vücut ağırlığının kilogramı başına 3-6 mg** öneriyor. Bu, 70 kiloluk biri için yaklaşık 200-400 mg demek. Daha fazlası nadiren fayda sağlar, çoğunlukla sadece titreme ekler. Sert bir kahve (yaklaşık 150-200 mg) çoğu insan için yeterli." },
        { t: "art", kind: "mug", caption: "Çoğu antrenman için sert bir kahve yeterli." },
        { t: "h2", s: "Ne zaman almalı?" },
        { t: "p", s: "Kafein, içtikten yaklaşık 30-60 dakika sonra kanında en yüksek seviyeye ulaşır. Bu yüzden antrenmandan yaklaşık 45 dakika önce almak en mantıklısı. Bir pre-workout'un günün en büyük kafein dozlarından biri olmasının sebebi de bu." },
        { t: "ul", items: [
          "Zamanlamaya dikkat et. Akşam antrenmanı akşam dozu demektir ve bu uykunu bozabilir.",
          "Geç saatteki antrenmanlar için kafeinsiz pre-workout iyi bir seçenektir.",
          "Kafein yine de günlük 400 mg sınırına dahildir." ] },
        { t: "callout", s: "Bir pre-workout çoğu zaman kişinin gün içindeki en büyük tek dozudur. Caffy bunu tek dokunuşla kaydeder ve hem günlük toplamına hem de uyku kesme saatine ekler. Böylece sıkı antrenman yapmak, kötü uyumak zorunda kalmak anlamına gelmez." },
      ] },
    { title: "Matcha nedir? Herkesin içtiği yeşil çaya basit bir rehber",
      excerpt: "Matcha, demlemek yerine suyun içinde çırptığın toz haline getirilmiş yeşil çaydır. Ne olduğunu, ne kadar kafein içerdiğini ve neden kahveden farklı hissettirdiğini anlatıyoruz.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Çay", "CSPI — Kafein tablosu"],
      body: [
        { t: "p", s: "Matcha şu an her yerde, kafelerden market raflarına kadar. Ama diğer çaylardan biraz farklı ve işin bütün özü de bu farkta." },
        { t: "h2", s: "Toz haline getirilmiş bütün yeşil çay" },
        { t: "p", s: "Matcha, gölgede yetiştirilen, kurutulan ve ince bir toz haline öğütülen yeşil çay yapraklarından yapılır. Yaprakları demleyip atmak yerine, tozu sıcak suda çırpar ve yaprağın tamamını içersin. Matcha'nın hem tat hem de içerik olarak daha yoğun olmasının sebebi bu." },
        { t: "art", kind: "leaf", caption: "Sadece bir demleme değil, yaprağın tamamını içiyorsun." },
        { t: "h2", s: "İçinde ne kadar kafein var?" },
        { t: "p", s: "Bir fincan matcha yaklaşık **60-70 mg** kafein içerir. Bu, bir fincan kahveden biraz az ama normal demlenmiş yeşil çaydan fazladır. Ayrıca içindeki **L-theanine** amino asidi, matcha'ya o daha sakin ve dengeli enerjisini verir." },
        { t: "ul", items: [
          "**Tören sınıfı (ceremonial):** daha parlak ve yumuşak, sadece suyla içmek için.",
          "**Mutfak sınıfı (culinary):** daha güçlü ve acımsı, latte ve pişirme için.",
          "**Tat:** çimensi ve hafif tatlı, umami denen bir lezzet notasıyla." ] },
        { t: "callout", s: "Nasıl içersen iç, matcha yine gününe kafein ekler. Caffy'de matcha hazır tanımlıdır; bir fincanı tek dokunuşla kaydeder ve günlük toplamını doğru tutarsın." },
      ] },
    { title: "L-theanine: matcha'daki sakin odağın arkasındaki amino asit",
      excerpt: "L-theanine, çayı kahveden daha sakin hissettiren bileşendir. Kafeinle birlikte odağı keskinleştirirken titremenin sertliğini de alır.",
      sourceLabels: ["NIH / PMC — L-theanine ve zihinsel durum", "Harvard T.H. Chan — The Nutrition Source: Çay"],
      body: [
        { t: "p", s: "Matcha ya da yeşil çay seni uyanık ama gergin olmayan bir halde bırakıyorsa, işbaşındaki şey L-theanine'dir." },
        { t: "h2", s: "L-theanine ne yapar?" },
        { t: "p", s: "L-theanine, neredeyse yalnızca çayda bulunan bir amino asittir. Tek başına, seni uykulu yapmadan **sakin ve rahat bir uyanıklık** hali sağlar. Araştırmalar onu daha düşük stres ve daha iyi dikkatle ilişkilendiriyor." },
        { t: "art", kind: "moon", caption: "Uyanık, ama gergin değil, sakin." },
        { t: "h2", s: "Kafeinle neden bu kadar iyi eşleşir?" },
        { t: "p", s: "Kafein ve L-theanine bir takım gibi çalışır. Kafein uyanıklığı yükseltir, L-theanine ise onun sert kenarlarını yumuşatır. Böylece ikisi birlikte, tek başına kafeine göre **daha az titremeyle dengeli bir odak** verir. Bir fincan matcha'nın sert bir kahveden daha temiz hissettirmesinin sebebi bu bileşimdir." },
        { t: "ul", items: [
          "**Çayda:** en çok matcha içerir, ardından diğer yeşil ve siyah çaylar gelir.",
          "**Kafeinle:** bu eşleşme klasik 'sakin odak' etkisini yaratır.",
          "**Yatıştırıcı değil:** zihni gevşetir ama seni uykulu yapmaz." ] },
        { t: "callout", s: "L-theanine, kafeinin nasıl hissettirdiğini değiştirir ama ne kadar aldığını değiştirmez. Caffy, matcha ve kahvendeki kafeini takip eder; böylece günlük toplamın dürüst kalır." },
      ] },
    { title: "Matcha'nın faydaları: bilimin gerçekte söyledikleri",
      excerpt: "Matcha antioksidan ve L-theanine açısından zengindir ve araştırmalar umut verici. Ama sağlam bulguları abartıdan ayırmakta fayda var.",
      sourceLabels: ["NCCIH (NIH) — Yeşil çay", "Harvard T.H. Chan — The Nutrition Source: Çay"],
      body: [
        { t: "p", s: "Matcha'ya süper besin deniyor ve gerçekten güçlü yanları var. Ama dürüst tablo 'umut verici ama kanıtlanmamış' şeklinde ve inanmadan önce bunu bilmekte fayda var." },
        { t: "h2", s: "İyi desteklenen yanları" },
        { t: "p", s: "Yaprağın tamamını içtiğin için matcha, EGCG'yi de içeren bir antioksidan grubu olan **kateşinler** açısından özellikle zengindir. Yeşil çay kateşinleri **kolesterolde** ölçülü iyileşmelerle ilişkilendiriliyor ve içindeki **L-theanine**, sakinlik ve odak için oldukça iyi kanıta sahip." },
        { t: "art", kind: "heart", caption: "Gerçek güçlü yanlar, ama dürüst sınırlarla." },
        { t: "h2", s: "İddiaların bilimi aştığı yer" },
        { t: "p", s: "Ciddi kilo kaybı ya da hastalık önleme gibi daha büyük iddialar ise netleşmiş değil. NIH gibi sağlık kurumları kanıtın hâlâ karışık olduğunu belirtiyor. Matcha gerçekten sağlıklı bir içecek, ama bir tedavi değil." },
        { t: "ul", items: [
          "**Antioksidanlar:** yaprağın tamamını içtiğin için kateşin açısından zengin.",
          "**Sakin odak:** L-theanine ve kafein bileşimi en güçlü kanıta sahip olan.",
          "**Dikkat:** yine de kafein içerir, yani günlük sınır hâlâ geçerli." ] },
        { t: "callout", s: "Matcha'nın tadını sağlıklı biçimde çıkarmanın yolu, kafeine göz kulak olmaktan geçer. Caffy her fincanı kaydeder ve günlük toplamını kişisel sınırının altında tutar." },
      ] },
    { title: "Evde matcha nasıl hazırlanır (ve iyisi nasıl seçilir)",
      excerpt: "Oranı ve çırpmayı öğrenince iyi matcha yapmak kolaydır. İşte basit bir yöntem ve acı olmayan bir toz seçmenin yolları.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Çay", "CSPI — Kafein tablosu"],
      body: [
        { t: "p", s: "Kötü matcha acı ve topaklıdır. İyi matcha ise pürüzsüz ve doğal olarak hafif tatlıdır. Aradaki fark çoğunlukla şans değil, teknik ve kalitedir." },
        { t: "h2", s: "Basit bir yöntem" },
        { t: "ul", items: [
          "Topakları gidermek için 1-2 tatlı kaşığı matcha'yı bir fincana **eleyerek** koy.",
          "Yaklaşık 60 ml, 70-80°C **su ekle.** Kaynar su matcha'yı acılaştırır.",
          "Bambu çırpıcıyla, zikzak çizerek köpürene dek **hızlıca çırp.**",
          "**Latte için:** üstüne sonradan buharla ısıtılmış süt ekle." ] },
        { t: "art", kind: "mug", caption: "Kaynar su değil, ve köpürene kadar çırp." },
        { t: "h2", s: "İyi bir matcha seçmek" },
        { t: "p", s: "Tazeliğin işareti olan **canlı yeşil** bir renk ve Uji gibi bir Japon menşei ara. **Tören sınıfı** suyla içmek için en iyisidir; **mutfak sınıfı** ise daha ucuzdur ve sütün acılığı gizlediği latte'ler için gayet uygundur." },
        { t: "callout", s: "Bir fincan matcha yaklaşık 60-70 mg kafeindir. Caffy'de hazır tanımlıdır; böylece sabahki kâsen günlük toplamına otomatik olarak eklenir." },
      ] },
  ],
  de: [
    { title: "Wie lange bleibt Koffein im Körper?",
      excerpt: "Die Halbwertszeit von Koffein liegt bei etwa 5–6 Stunden — was das für deinen Nachmittagskaffee bedeutet und wann er den Körper verlässt.",
      sourceLabels: ["Sleep Foundation — Wie lange Koffein wirkt", "NCBI — Pharmakologie von Koffein"],
      body: [
        { t: "p", s: "Der Kaffee um 14 Uhr ist beim Abendessen nicht weg. Koffein verlässt den Körper nach einem festen Zeitplan, bestimmt durch seine **Halbwertszeit** — das Nützlichste, was du über deine Gewohnheit wissen kannst." },
        { t: "h2", s: "Was „Halbwertszeit“ bedeutet" },
        { t: "p", s: "Die Halbwertszeit ist die Zeit, die dein Körper braucht, um die **Hälfte** einer Dosis abzubauen. Bei gesunden Erwachsenen sind das im Schnitt **etwa 5–6 Stunden**, je nach Genen, Alter, Leber und Medikamenten rund 1,5 bis 9,5 Stunden." },
        { t: "art", kind: "beans", caption: "Der Nachmittagskaffee wirkt Stunden später noch." },
        { t: "p", s: "Trinkst du um 9 Uhr **200 mg** (ein großer Kaffee), zirkulieren am Nachmittag noch etwa **100 mg**. Bis Koffein praktisch weg ist, dauert es rund **5–6 Halbwertszeiten — fast einen ganzen Tag**." },
        { t: "h2", s: "Warum dein Wert individuell ist" },
        { t: "ul", items: [
          "**Schwangerschaft & Antibabypille** verlangsamen ihn — spät in der Schwangerschaft bis zu 15 Stunden.",
          "**Rauchen** beschleunigt ihn und halbiert die Halbwertszeit etwa.",
          "**Genetik (CYP1A2)** macht manche zu schnellen, andere zu langsamen Verwertern." ] },
        { t: "callout", s: "Genau das modelliert Caffy. Statt einer Faustregel nutzt es **deine** Halbwertszeit und zeigt, wie viel Koffein gerade aktiv ist." },
      ] },
    { title: "Wann solltest du für besseren Schlaf keinen Kaffee mehr trinken?",
      excerpt: "Eine Meta-Analyse von 2023 gibt der alten Regel eine Zahl: höre etwa 8,8 Stunden vor dem Schlafengehen mit Kaffee auf.",
      sourceLabels: ["Gardiner et al. 2023, Sleep Medicine Reviews", "AJMC — Koffein und Schlaf"],
      body: [
        { t: "p", s: "Du kannst nach einem Abendkaffee einschlafen und trotzdem schlechter schlafen — Koffein tauscht leise deinen **Tiefschlaf** gegen leichteren Schlaf." },
        { t: "h2", s: "Was die Forschung sagt" },
        { t: "p", s: "Ein **systematischer Review von 2023** in Sleep Medicine Reviews fasste 24 Studien zusammen. Im Schnitt verkürzte Koffein den Schlaf um **45 Minuten**, senkte die Schlafeffizienz und verschob den Schlaf in leichtere Phasen." },
        { t: "art", kind: "moon", caption: "Schütze den Schlaf, den du nicht nachholst." },
        { t: "p", s: "Die Empfehlung: ein normaler Kaffee (~107 mg) sollte spätestens **8,8 Stunden vor dem Schlafengehen** der letzte sein. Ein starkes Pre-Workout (~217 mg) braucht etwa **13 Stunden**." },
        { t: "h2", s: "In eine Uhrzeit übersetzt" },
        { t: "ul", items: [
          "Bett um 23 Uhr? Letzter Kaffee etwa **14 Uhr**.",
          "Bett um 22 Uhr? Ziel etwa **13 Uhr**.",
          "Höhere Dosis oder langsamer Stoffwechsel? Früher ansetzen." ] },
        { t: "callout", s: "Caffy berechnet aus Schlafenszeit und Stoffwechsel eine persönliche **sichere Uhrzeit** — und warnt dich, bevor ein Nachmittagsgetränk deinen Schlaf kostet." },
      ] },
    { title: "Wie viel Koffein steckt in Kaffee, Tee, Espresso und Energydrinks?",
      excerpt: "Espresso, Filter, Cold Brew, grüner Tee, Red Bull — ein klarer, quellenbasierter Vergleich, damit du weißt, was du wirklich trinkst.",
      sourceLabels: ["Mayo Clinic — Koffeingehalt von Getränken", "CSPI — Koffein-Tabelle"],
      body: [
        { t: "p", s: "„Ein Kaffee“ kann 60 mg oder 300 mg bedeuten. Hier typische Mengen nach Mayo-Clinic- und CSPI-Daten — nützlich, um unter deinem Tageslimit zu bleiben." },
        { t: "art", kind: "mug", caption: "„Ein Kaffee“ kann 60 mg sein — oder 300." },
        { t: "h2", s: "Typisches Koffein pro Portion" },
        { t: "ul", items: [
          "**Filterkaffee (240 ml):** ~70–100 mg",
          "**Espresso (1 Shot):** ~63–80 mg — pro ml am stärksten",
          "**Cold Brew (240 ml):** ~100–200 mg",
          "**Schwarzer Tee:** ~47–55 mg · **Grüner Tee:** ~28–35 mg",
          "**Energydrink (240 ml, z. B. Red Bull):** ~80 mg",
          "**Energy-Shot (5-Hour Energy):** ~200 mg",
          "**Cola (355 ml):** ~35–40 mg" ] },
        { t: "h2", s: "Zwei häufige Irrtümer" },
        { t: "p", s: "Erstens die **Größe**: ein 470-ml-Kaffee kann 2–3 „Tassen“ Koffein enthalten. Zweitens: **Espresso wirkt stärker**, ein Shot hat aber oft weniger Koffein als eine Tasse Filterkaffee — nur konzentrierter." },
        { t: "callout", s: "Caffy hat diese Getränke (und Hunderte mehr) integriert — Erfassen ist ein Tipp, und jedes fließt in deinen Live-Koffeinwert." },
      ] },
    { title: "Sichere Koffein-Tagesmenge: wie viel ist zu viel?",
      excerpt: "FDA und EFSA nennen 400 mg pro Tag für die meisten Erwachsenen — und 200 mg in der Schwangerschaft. Was das in Tassen heißt.",
      sourceLabels: ["EFSA — Koffein", "Coffee & Health — Leitlinien zur Koffeinzufuhr"],
      body: [
        { t: "p", s: "Für gesunde Erwachsene gibt es eine weithin akzeptierte Zahl, und US- wie EU-Behörden landen bei derselben." },
        { t: "h2", s: "Die 400-mg-Regel" },
        { t: "p", s: "Sowohl die **FDA** als auch die **Europäische Behörde für Lebensmittelsicherheit (EFSA)** halten bis zu **400 mg Koffein pro Tag** für die meisten gesunden, nicht schwangeren Erwachsenen für sicher — rund **vier Tassen Kaffee**." },
        { t: "art", kind: "heart", caption: "Zu viel zeigt sich als Zittern und Herzrasen." },
        { t: "h2", s: "Schwangerschaft ist anders" },
        { t: "p", s: "ACOG, EFSA und der NHS empfehlen in der Schwangerschaft **höchstens 200 mg pro Tag**. Koffein wird dann viel langsamer abgebaut — die Halbwertszeit kann im dritten Trimester auf **~15 Stunden** steigen." },
        { t: "ul", items: [
          "Zittrigkeit, Herzrasen oder Angst",
          "Probleme beim Ein- oder Durchschlafen",
          "Kopfschmerzen oder ein Nachmittagstief, das du mit mehr Koffein „beheben“ musst" ] },
        { t: "callout", s: "Caffy setzt ein persönliches Tageslimit und zeigt eine Live-Anzeige, damit du siehst, wann du dich 400 mg näherst — vorher, nicht danach." },
      ] },
    { title: "Koffein reduzieren – ohne Kopfschmerzen",
      excerpt: "Abruptes Aufhören ist der Grund fürs Scheitern. Ein schrittweises Ausschleichen über 1–2 Wochen hält Entzug fern.",
      sourceLabels: ["BodySpec — Koffeinentzug-Zeitverlauf", "EFSA — Koffein"],
      body: [
        { t: "p", s: "Wenn dich Reduzieren je mit zwei Tagen Kopfschmerz zurückließ, lag es nicht an der Willenskraft — sondern am Tempo." },
        { t: "h2", s: "Warum Entzug entsteht" },
        { t: "p", s: "Setzt du Koffein abrupt ab, beginnen Symptome — **Kopfschmerz, Müdigkeit, Reizbarkeit** — meist **12–24 Stunden** später und halten **2–9 Tage** an. Das ist ein echter Rückschlag, keine Schwäche." },
        { t: "art", kind: "leaf", caption: "Sanft reduzieren — dein Körper merkt es kaum." },
        { t: "h2", s: "Ein Ausschleichen, das funktioniert" },
        { t: "ul", items: [
          "Über 1–2 Wochen **alle paar Tage um etwa 10–25 %** senken, nicht auf einmal.",
          "Jeweils **eine normale Tasse durch entkoffeiniert** ersetzen — gleiches Ritual, weniger Koffein.",
          "Zuerst die **Uhrzeit früher** legen; spätes Koffein schadet dem Schlaf, das befeuert das Verlangen.",
          "Viel trinken und ein paar flache Tage einplanen — es geht vorbei." ] },
        { t: "callout", s: "Caffys Detox-Pläne bauen dieses Ausschleichen für dich (5–14 Tage) und begleiten jeden Tag, sodass sich Reduzieren wie Fortschritt anfühlt." },
      ] },
    { title: "Wie viel Koffein ist in der Schwangerschaft sicher?",
      excerpt: "Große Gesundheitsbehörden sind sich einig: In der Schwangerschaft unter 200 mg Koffein pro Tag bleiben. So viele Tassen sind das — und warum dein Körper es jetzt viel langsamer abbaut.",
      sourceLabels: ["NHS — Lebensmittel, die man in der Schwangerschaft meiden sollte", "EFSA — Koffein"],
      body: [
        { t: "p", s: "Wenn du schwanger bist und deinen Morgenkaffee liebst, musst du nicht ganz verzichten. Aber die sichere Menge ist niedriger als sonst, und dein Körper verarbeitet Koffein jetzt ganz anders." },
        { t: "h2", s: "Die 200-mg-Regel" },
        { t: "p", s: "**NHS**, **ACOG** und **EFSA** empfehlen alle nicht mehr als **200 mg Koffein pro Tag** in der Schwangerschaft. Das sind etwa **zwei Tassen Instantkaffee** oder ein mittlerer Filterkaffee. Diese Grenze zählt jede Quelle, auch Tee, Cola, Schokolade und Energydrinks." },
        { t: "art", kind: "heart", caption: "Etwa zwei Tassen pro Tag, aus allen Quellen zusammen." },
        { t: "h2", s: "Warum die Grenze niedriger ist" },
        { t: "p", s: "Koffein passiert die Plazenta, und ein ungeborenes Baby kann es nicht abbauen. Gleichzeitig verlangsamt sich dein Stoffwechsel drastisch. Die Halbwertszeit von Koffein kann im dritten Trimester von etwa 5 Stunden auf **15 Stunden oder mehr** steigen, sodass es viel länger im Körper bleibt und sich anreichert." },
        { t: "ul", items: [
          "**Filterkaffee:** etwa 140 mg pro Tasse. Eine ist ok, zwei sind zu viel.",
          "**Instantkaffee:** etwa 100 mg. Zwei Tassen sind ungefähr dein Tageslimit.",
          "**Tee:** etwa 75 mg pro Tasse. **Cola:** etwa 40 mg pro Dose.",
          "**Zartbitterschokolade (50 g):** etwa 25 mg." ] },
        { t: "callout", s: "Weil Koffein in der Schwangerschaft so langsam abgebaut wird, kannst du in Caffy ein Schwangerschaftsprofil einstellen. Es nutzt die längere Halbwertszeit, um deine Tagesmenge in Echtzeit gegen das 200-mg-Limit zu verfolgen." },
      ] },
    { title: "Verursacht Koffein Angst?",
      excerpt: "Koffein erfindet keine Angst, kann sie aber verstärken. Es löst dasselbe Herzrasen und die Unruhe aus, die dein Körper als Angst liest. Wo verläuft die Grenze zwischen Kick und Zittern?",
      sourceLabels: ["Mayo Clinic — Koffein: wie viel ist zu viel", "NCBI — Pharmakologie des Koffeins"],
      body: [
        { t: "p", s: "Dieses aufgedrehte, angespannte Gefühl nach einer Tasse zu viel ist nicht eingebildet. Dahinter steckt ein echter chemischer Grund." },
        { t: "h2", s: "Warum sich Koffein wie Angst anfühlt" },
        { t: "p", s: "Koffein blockiert **Adenosin**, den beruhigenden Stoff, der Ruhe signalisiert, und löst eine **Adrenalin**-Ausschüttung aus. Das Ergebnis, ein schnellerer Herzschlag, ein engeres Brustgefühl und Unruhe, ist der Angstreaktion des Körpers fast identisch. Deshalb kann dein Gehirn es genau so deuten." },
        { t: "art", kind: "gauge", caption: "Über deinem persönlichen Limit kippt Wachheit in Zittern." },
        { t: "h2", s: "Dosis und Empfindlichkeit zählen beide" },
        { t: "p", s: "Die meisten vertragen bis zu **400 mg pro Tag** problemlos, aber angstanfällige Menschen sind oft viel empfindlicher. Bei ihnen können schon **200 mg** Symptome auslösen. Deine Gene, besonders das **CYP1A2**-Gen, bestimmen, wie schnell du Koffein abbaust und wie lange die Anspannung anhält." },
        { t: "ul", items: [
          "Ein rasendes oder pochendes Herz, Unruhe, Zittern",
          "Schlafprobleme, die am nächsten Tag die Angst selbst verschlimmern",
          "Ein Nachmittagstief, das zur nächsten Tasse verleitet und den Kreislauf nährt" ] },
        { t: "callout", s: "Wenn Kaffee dich ängstlich macht, ist die Lösung meist Timing und Dosis, nicht Verzicht. Caffy zeigt, wie viel Koffein gerade in deinem Körper aktiv ist, damit du die Menge findest, die Energie gibt, ohne dich zu überreizen." },
      ] },
    { title: "Matcha vs. Kaffee: Koffein, L-Theanin und ruhigerer Fokus",
      excerpt: "Matcha hat weniger Koffein als Kaffee, kombiniert es aber mit L-Theanin. Das ist der Grund, warum es steten Fokus statt Spitze und Absturz liefert.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tee", "CSPI — Koffein-Tabelle"],
      body: [
        { t: "p", s: "Matcha ist zur bevorzugten Kaffee-Alternative geworden. Nicht weil es stärker ist, sondern weil sich sein Koffein anders anfühlt." },
        { t: "h2", s: "Wie viel Koffein jeder hat" },
        { t: "p", s: "Eine Tasse Matcha hat etwa **60–70 mg** Koffein, eine Tasse Filterkaffee etwa **95–120 mg**. Beim reinen Koffein gewinnt also Kaffee. Matchas Reiz ist die Art der Energie, nicht die Menge." },
        { t: "art", kind: "leaf", caption: "Weniger Koffein, aber mit einer beruhigenden Aminosäure kombiniert." },
        { t: "h2", s: "Der L-Theanin-Unterschied" },
        { t: "p", s: "Matcha ist reich an **L-Theanin**, einer Aminosäure, die ruhige, fokussierte Wachheit fördert. Sie glättet die scharfe Kante des Koffeins, und viele finden, dass Matcha steteren Fokus ohne das Zittern oder den Absturz gibt, den ein großer Kaffee bringen kann." },
        { t: "ul", items: [
          "**Kaffee:** mehr Koffein, schnellerer Kick. Ideal für einen harten Morgenstart.",
          "**Matcha:** sanftere, längere, ruhigere Energie. Gut für anhaltenden Fokus.",
          "**Zählt trotzdem:** Matcha ist nicht koffeinfrei und kommt zu deiner Tagesmenge dazu." ] },
        { t: "callout", s: "Ob du zu Matcha wechselst oder beides trinkst, das Koffein summiert sich gleich. Caffy hat Matcha, Kaffee und Hunderte Getränke integriert, sodass du beides mit einem Tipp loggst und deine echte Tagesmenge siehst." },
      ] },
    { title: "Wie viel Koffein steckt in Energydrinks?",
      excerpt: "Von einem 80-mg-Red-Bull bis zu einem 300-mg-Bang schwankt das Koffein in Energydrinks enorm. Hier ist eine klare Aufschlüsselung Marke für Marke.",
      sourceLabels: ["CSPI — Koffein-Tabelle", "Mayo Clinic — Koffeingehalt von Getränken"],
      body: [
        { t: "p", s: "Bei Energydrinks überschreiten Menschen am häufigsten unbemerkt ein sicheres Koffein-Limit, weil die Zahl auf der Dose von moderat bis riesig reicht." },
        { t: "h2", s: "Koffein pro Dose" },
        { t: "ul", items: [
          "**Red Bull (250 ml):** etwa 80 mg",
          "**Monster (500 ml):** etwa 160 mg. **White Monster:** etwa 160 mg",
          "**Celsius (355 ml):** etwa 200 mg",
          "**Alani Nu (355 ml):** etwa 200 mg",
          "**Bang (500 ml):** etwa 300 mg. **Reign (500 ml):** etwa 300 mg",
          "**5-Hour Energy (57-ml-Shot):** etwa 200 mg" ] },
        { t: "art", kind: "cups", caption: "Eine Dose kann irgendwo zwischen 80 und 300 mg liegen." },
        { t: "h2", s: "Warum man leicht übertreibt" },
        { t: "p", s: "Ein einziger **Celsius oder Alani ist bereits die Hälfte** des 400-mg-Tageslimits für Erwachsene. Trink zwei davon plus einen Morgenkaffee, und du bist drüber, oft ohne das Gefühl, so viel getrunken zu haben. Die große Portionsgröße verbirgt die Dosis." },
        { t: "callout", s: "Caffy hat diese Energydrinks mit aktuellen Koffeinwerten integriert. Ein Tipp loggt die echte Zahl und warnt dich, bevor zwei Dosen dich über dein Tageslimit bringen." },
      ] },
    { title: "Zu viel Koffein: Symptome und was zu tun ist",
      excerpt: "Zittern, Herzrasen, Übelkeit und Angst sind Signale deines Körpers für eine Koffein-Überlastung. So erkennst du sie und kommst sicher wieder runter.",
      sourceLabels: ["Mayo Clinic — Koffein: wie viel ist zu viel", "EFSA — Koffein"],
      body: [
        { t: "p", s: "Koffein hat einen angenehmen Bereich und eine klare Grenze darüber hinaus. Überschreitest du sie, sendet dein Körper unmissverständliche Signale." },
        { t: "h2", s: "Anzeichen für zu viel" },
        { t: "ul", items: [
          "**Zittern und Nervosität**, Unruhe, Reizbarkeit",
          "**Ein rasender oder unregelmäßiger Herzschlag** und höherer Blutdruck",
          "**Angst**, Schlafprobleme, Kopfschmerzen",
          "**Übelkeit oder ein flauer Magen**" ] },
        { t: "art", kind: "heart", caption: "Ein rasendes Herz ist das klassische Überlastungssignal." },
        { t: "h2", s: "Wie viel ist zu viel?" },
        { t: "p", s: "Symptome treten meist über der Marke von **400 mg/Tag** für Erwachsene auf, in der Schwangerschaft ab 200 mg, aber empfindliche Menschen spüren sie viel früher. Eine echte **Koffein-Überdosis** mit Erbrechen, Verwirrtheit und sehr schnellem Herzschlag ist selten, aber ein medizinischer Notfall, und fast immer an Pillen oder Pulver gebunden, nicht an Kaffee." },
        { t: "h2", s: "So kommst du runter" },
        { t: "ul", items: [
          "**Kein Koffein mehr** für den Rest des Tages. Nicht 'zum Durchhalten' noch eins.",
          "**Trinken und Bewegung.** Leichtes Gehen hilft.",
          "**Abwarten.** Bei rund 5–6 Stunden Halbwertszeit ist das Schlimmste in ein paar Stunden vorbei." ] },
        { t: "callout", s: "Die meisten Überlastungen sind nur eine schlecht getimte zweite oder dritte Tasse. Caffys Live-Anzeige zeigt, wann du dich deinem Limit näherst, damit du aufhören kannst, bevor das Zittern beginnt." },
      ] },
    { title: "Koffein-Detox: der Entzugsverlauf, Tag für Tag",
      excerpt: "Koffein reduzieren? Der Entzug erreicht seinen Höhepunkt um Tag eins bis zwei und klingt innerhalb einer Woche ab. Hier ist der Verlauf Stunde für Stunde, und wie du ihn leichter machst.",
      sourceLabels: ["BodySpec — Koffein-Entzugsverlauf", "EFSA — Koffein"],
      body: [
        { t: "p", s: "Wenn du Koffein absetzt oder reduzierst, folgt der Entzug einem erstaunlich vorhersehbaren Zeitplan. Ihn zu kennen macht die harten Tage viel leichter durchzustehen." },
        { t: "h2", s: "Der Entzugsverlauf" },
        { t: "ul", items: [
          "**12–24 Stunden:** die ersten Kopfschmerzen und Müdigkeit setzen ein, wenn Adenosin zurückflutet.",
          "**24–51 Stunden:** die Symptome erreichen ihren Höhepunkt, mit Kopfschmerzen, Reizbarkeit, gedrückter Stimmung und Gehirnnebel.",
          "**2–9 Tage:** die Symptome klingen ab, und die meisten fühlen sich innerhalb einer Woche normal." ] },
        { t: "art", kind: "taper", caption: "Die Symptome erreichen früh ihren Höhepunkt und klingen über die Woche ab." },
        { t: "h2", s: "Warum es passiert" },
        { t: "p", s: "Regelmäßiges Koffein lässt dein Gehirn zusätzliche **Adenosinrezeptoren** bilden. Nimmst du das Koffein weg, sind sie plötzlich ungebremst, und die Adenosinflut verursacht Kopfschmerz und Schwere. Dein Gehirn justiert sich über mehrere Tage neu." },
        { t: "h2", s: "Mach es leichter" },
        { t: "ul", items: [
          "**Ausschleichen statt Schluss auf einen Schlag.** Reduziere alle paar Tage um 10–25 %.",
          "**Viel trinken** und den Schlaf stabil halten.",
          "Rechne an **Tag eins bis zwei** mit dem Schlimmsten, danach folgt Erleichterung." ] },
        { t: "callout", s: "Caffys Detox-Pläne bauen ein schrittweises Ausschleichen über 5–14 Tage für dich und begleiten jeden Tag. So fühlt sich ein Koffein-Detox wie steter Fortschritt an statt wie ein zweitägiger Kopfschmerz." },
      ] },
    { title: "Koffein und ADHS: hilft es wirklich?",
      excerpt: "Koffein ist ein mildes Stimulans, kann den Fokus also eine Weile schärfen. Aber es ersetzt keine ADHS-Behandlung und kann den Schlaf ruinieren, der die Symptome in Schach hält.",
      sourceLabels: ["NCBI — Pharmakologie des Koffeins", "Sleep Foundation — Koffein und Schlaf"],
      body: [
        { t: "p", s: "Viele Menschen mit ADHS finden, dass Kaffee ihnen beim Fokussieren hilft, und dahinter steckt ein echter Mechanismus. Aber das Bild ist komplizierter als 'Koffein wirkt.'" },
        { t: "h2", s: "Warum es den Fokus unterstützen kann" },
        { t: "p", s: "Koffein ist ein **Stimulans**, das Adenosin blockiert und **Dopamin** leicht anhebt, genau den Neurotransmitter, den ADHS-Medikamente ansteuern, nur viel schwächer. Das kann einen moderaten, vorübergehenden Schub bei Wachheit und Konzentration bringen." },
        { t: "art", kind: "beans", caption: "Ein milder Fokus-Schub, keine Behandlung." },
        { t: "h2", s: "Der Haken" },
        { t: "p", s: "Koffein ist kein Ersatz für eine ADHS-Behandlung, und seine Wirkung ist klein und kurzlebig. Schlimmer noch, es kann den Schlaf stören, und schlechter Schlaf macht ADHS-Symptome (Unaufmerksamkeit, Impulsivität, Unruhe) am nächsten Tag deutlich schlimmer und hebt jeden Gewinn auf." },
        { t: "ul", items: [
          "Halte die Dosen moderat. Große Mengen tauschen Fokus gegen Zittern.",
          "Achte auf das Timing. Spätes Koffein schadet dem Schlaf, was nach hinten losgeht.",
          "Bei Stimulanzien-Medikation können sich mit Koffein Nebenwirkungen summieren, frag deinen Arzt." ] },
        { t: "callout", s: "Wenn du Koffein zum Fokussieren nutzt, ist Timing alles. Caffy zeigt deinen aktiven Koffeinspiegel und eine persönliche Cutoff-Zeit, damit ein Fokus-Schub heute nicht deinen Schlaf heute Nacht kostet." },
      ] },
    { title: "Koffein vor dem Training: wie viel und wann",
      excerpt: "Koffein ist einer der am besten untersuchten Leistungsbooster, wenn du es richtig timest. Hier sind Dosis und Timing, die helfen, ohne deinen Schlaf zu ruinieren.",
      sourceLabels: ["Sleep Foundation — Koffein und Schlaf", "Mayo Clinic — Koffeingehalt von Getränken"],
      body: [
        { t: "p", s: "Koffein verbessert Ausdauer, Kraft und Fokus im Training tatsächlich, deshalb steckt es in fast jedem Pre-Workout. Der Trick liegt in Dosis und Timing." },
        { t: "h2", s: "Wie viel hilft" },
        { t: "p", s: "Die Sporternährungsforschung deutet auf etwa **3–6 mg pro kg Körpergewicht** für einen Leistungsvorteil hin, rund **200–400 mg** für eine 70-kg-Person. Mehr hilft selten und bringt nur Zittern. Ein starker Kaffee, etwa 150–200 mg, reicht den meisten." },
        { t: "art", kind: "mug", caption: "Ein starker Kaffee reicht für die meisten Workouts." },
        { t: "h2", s: "Wann du es nehmen solltest" },
        { t: "p", s: "Koffein erreicht **30–60 Minuten** nach dem Trinken seinen Blutspitzenwert, also nimm es etwa **45 Minuten vor** dem Training. Deshalb ist ein Pre-Workout oft einer deiner größten Koffein-Hits des Tages." },
        { t: "ul", items: [
          "**Achte aufs Timing.** Ein Abendtraining bedeutet eine Abenddosis, die den Schlaf ruinieren kann.",
          "**Koffeinfreies Pre-Workout** ist eine sinnvolle Option für spätes Training.",
          "Es zählt trotzdem zu deinem **Tageslimit von 400 mg**." ] },
        { t: "callout", s: "Ein Pre-Workout ist oft die einzelne größte Dosis des Tages. Caffy loggt es mit einem Tipp und rechnet es in deine Tagesmenge und deine Schlaf-Cutoff-Zeit ein, damit hartes Training nicht schlechten Schlaf bedeuten muss." },
      ] },
    { title: "Was ist Matcha? Ein einfacher Leitfaden zum grünen Tee, den alle trinken",
      excerpt: "Matcha ist pulverisierter Grüntee, den du ins Wasser rührst statt zu ziehen lässt. Hier erfährst du, was er ist, wie viel Koffein er hat und warum er sich anders anfühlt als Kaffee.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tee", "CSPI — Koffein-Tabelle"],
      body: [
        { t: "p", s: "Matcha ist gerade überall, vom Café bis ins Supermarktregal. Aber er unterscheidet sich ein wenig von jedem anderen Tee, und genau darum geht es." },
        { t: "h2", s: "Es ist ganzer Grüntee, als Pulver" },
        { t: "p", s: "Matcha wird aus Grünteeblättern hergestellt, die im Schatten wachsen, getrocknet und zu einem feinen Pulver gemahlen werden. Statt Blätter ziehen zu lassen und wegzuwerfen, rührst du das Pulver in heißes Wasser und trinkst das ganze Blatt. Deshalb ist Matcha konzentrierter, sowohl im Geschmack als auch in den Inhaltsstoffen." },
        { t: "art", kind: "leaf", caption: "Du trinkst das ganze Blatt, nicht nur einen Aufguss." },
        { t: "h2", s: "Wie viel Koffein steckt drin?" },
        { t: "p", s: "Eine Tasse Matcha hat etwa **60–70 mg** Koffein, etwas weniger als eine Tasse Kaffee, aber mehr als normal aufgegossener Grüntee. Sie enthält außerdem **L-Theanin**, eine Aminosäure, die Matcha seine ruhigere, gleichmäßigere Energie verleiht." },
        { t: "ul", items: [
          "**Ceremonial Grade:** heller und weicher, zum Trinken mit reinem Wasser.",
          "**Culinary Grade:** kräftiger und bitterer, für Lattes und zum Backen.",
          "**Geschmack:** grasig und leicht süß, mit einer herzhaften Note namens Umami." ] },
        { t: "callout", s: "Wie du ihn auch trinkst, Matcha fügt deinem Tag Koffein hinzu. Caffy hat Matcha integriert, sodass du eine Tasse mit einem Tipp loggst und deine Tagesmenge genau hältst." },
      ] },
    { title: "L-Theanin: die Aminosäure hinter Matchas ruhigem Fokus",
      excerpt: "L-Theanin ist der Stoff, der Tee ruhiger wirken lässt als Kaffee. Mit Koffein kombiniert, kann es den Fokus schärfen und zugleich das Zittern abmildern.",
      sourceLabels: ["NIH / PMC — L-Theanin und mentaler Zustand", "Harvard T.H. Chan — The Nutrition Source: Tee"],
      body: [
        { t: "p", s: "Wenn Matcha oder Grüntee dich wach, aber nicht aufgedreht macht, spürst du L-Theanin am Werk." },
        { t: "h2", s: "Was L-Theanin bewirkt" },
        { t: "p", s: "L-Theanin ist eine Aminosäure, die fast nur in Tee vorkommt. Für sich genommen fördert sie einen Zustand **ruhiger, entspannter Wachheit**, ohne müde zu machen. Studien bringen sie mit weniger Stress und besserer Aufmerksamkeit in Verbindung." },
        { t: "art", kind: "moon", caption: "Wach, aber ruhig statt aufgedreht." },
        { t: "h2", s: "Warum es so gut zu Koffein passt" },
        { t: "p", s: "Koffein und L-Theanin arbeiten als Team. Koffein hebt die Wachheit, und L-Theanin glättet ihre rauen Kanten, sodass sie zusammen oft **steten Fokus mit weniger Zittern** geben als Koffein allein. Diese Kombination ist der Grund, warum sich eine Tasse Matcha sauberer anfühlen kann als ein starker Kaffee." },
        { t: "ul", items: [
          "**Im Tee:** Matcha hat am meisten, gefolgt von anderen grünen und schwarzen Tees.",
          "**Mit Koffein:** die Kombination ergibt den klassischen 'ruhigen Fokus'.",
          "**Kein Beruhigungsmittel:** es entspannt den Geist, ohne müde zu machen." ] },
        { t: "callout", s: "L-Theanin ändert, wie sich Koffein anfühlt, aber nicht, wie viel du hattest. Caffy verfolgt das Koffein in deinem Matcha und Kaffee, damit deine Tagesmenge ehrlich bleibt." },
      ] },
    { title: "Matcha und seine gesundheitlichen Vorteile: was die Evidenz wirklich sagt",
      excerpt: "Matcha ist reich an Antioxidantien und L-Theanin, und die Forschung ist vielversprechend. Aber es lohnt sich, solide Befunde vom Hype zu trennen.",
      sourceLabels: ["NCCIH (NIH) — Grüntee", "Harvard T.H. Chan — The Nutrition Source: Tee"],
      body: [
        { t: "p", s: "Matcha wird als Superfood bezeichnet, und er hat echte Stärken. Aber das ehrliche Bild ist 'vielversprechend, nicht bewiesen', und das solltest du wissen, bevor du überzeugt bist." },
        { t: "h2", s: "Was gut belegt ist" },
        { t: "p", s: "Weil du das ganze Blatt trinkst, ist Matcha besonders reich an **Catechinen**, einer Gruppe von Antioxidantien, zu der EGCG gehört. Grüntee-Catechine werden mit moderaten Verbesserungen beim **Cholesterin** in Verbindung gebracht, und sein **L-Theanin** hat brauchbare Belege für Ruhe und Fokus." },
        { t: "art", kind: "heart", caption: "Echte Stärken, mit ehrlichen Grenzen." },
        { t: "h2", s: "Wo die Behauptungen die Wissenschaft überholen" },
        { t: "p", s: "Größere Behauptungen wie deutlicher Gewichtsverlust oder Krankheitsvorbeugung sind nicht gesichert. Gesundheitsbehörden wie das NIH merken an, dass die Evidenz noch gemischt ist. Matcha ist ein wirklich gesundes Getränk, aber kein Heilmittel." },
        { t: "ul", items: [
          "**Antioxidantien:** reich an Catechinen, weil du das ganze Blatt trinkst.",
          "**Ruhiger Fokus:** L-Theanin plus Koffein hat die besten Belege.",
          "**Vorsicht:** es enthält weiterhin Koffein, dein Tageslimit gilt also weiter." ] },
        { t: "callout", s: "Der gesunde Weg, Matcha zu genießen, ist, das Koffein im Blick zu behalten. Caffy loggt jede Tasse und hält deine Tagesmenge unter deinem persönlichen Limit." },
      ] },
    { title: "Matcha zu Hause zubereiten (und einen guten auswählen)",
      excerpt: "Guter Matcha ist leicht zuzubereiten, wenn du Verhältnis und Besen kennst. Hier ist eine einfache Methode, plus wie du ein Pulver wählst, das nicht bitter ist.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Tee", "CSPI — Koffein-Tabelle"],
      body: [
        { t: "p", s: "Schlechter Matcha ist bitter und klumpig. Guter Matcha ist geschmeidig und von Natur aus leicht süß, und der Unterschied liegt vor allem an Technik und Qualität, nicht am Glück." },
        { t: "h2", s: "Eine einfache Methode" },
        { t: "ul", items: [
          "**Sieb** 1–2 Teelöffel Matcha in eine Tasse, um Klumpen zu entfernen.",
          "**Gib** etwa 60 ml Wasser bei 70–80 °C dazu. Kochendes Wasser macht ihn bitter.",
          "**Schlage** mit einem Bambusbesen zügig im Zickzack, bis es schaumig ist.",
          "**Für einen Latte:** danach aufgeschäumte Milch darübergeben." ] },
        { t: "art", kind: "mug", caption: "Kein kochendes Wasser, und bis zum Schaum schlagen." },
        { t: "h2", s: "Einen guten Matcha wählen" },
        { t: "p", s: "Achte auf eine **leuchtend grüne** Farbe, die für Frische steht, und eine japanische Herkunft wie Uji. **Ceremonial Grade** ist am besten zum Trinken mit Wasser, während **Culinary Grade** günstiger und gut für Lattes ist, wo die Milch jede Bitterkeit verbirgt." },
        { t: "callout", s: "Eine Tasse Matcha sind rund 60–70 mg Koffein. Caffy hat ihn integriert, sodass deine morgendliche Schale automatisch zu deiner Tagesmenge zählt." },
      ] },
  ],
  es: [
    { title: "¿Cuánto tiempo permanece la cafeína en tu cuerpo?",
      excerpt: "La vida media de la cafeína es de unas 5–6 horas: esto es lo que significa para el café de la tarde y cuándo sale de tu sistema.",
      sourceLabels: ["Sleep Foundation — Cuánto dura la cafeína", "NCBI — Farmacología de la cafeína"],
      body: [
        { t: "p", s: "Ese café de las 2 de la tarde no desaparece para la cena. La cafeína sale del cuerpo según un horario fijo marcado por su **vida media** — lo más útil que puedes saber sobre tu hábito." },
        { t: "h2", s: "Qué significa “vida media”" },
        { t: "p", s: "La vida media es el tiempo que tu cuerpo necesita para eliminar **la mitad** de una dosis. En un adulto sano promedia **unas 5–6 horas**, pero varía de 1,5 a 9,5 según genes, edad, hígado y medicamentos." },
        { t: "art", kind: "beans", caption: "Ese café de la tarde sigue actuando horas después." },
        { t: "p", s: "Si tomas **200 mg** (un café grande) a las 9, a media tarde aún circulan unos **100 mg**. La cafeína tarda unas **5–6 vidas medias — casi un día entero** en desaparecer del todo." },
        { t: "h2", s: "Por qué tu número es personal" },
        { t: "ul", items: [
          "**Embarazo y anticonceptivos orales** la ralentizan — al final del embarazo puede llegar a 15 horas.",
          "**Fumar** la acelera y casi la reduce a la mitad.",
          "**La genética (CYP1A2)** hace que unos metabolicen rápido y otros lento." ] },
        { t: "callout", s: "Esto es lo que modela Caffy. En vez de una regla general, usa **tu** vida media para mostrar cuánta cafeína está activa ahora mismo." },
      ] },
    { title: "¿A qué hora deberías dejar el café para dormir mejor?",
      excerpt: "Un metaanálisis de 2023 puso número al viejo consejo: deja el café unas 8,8 horas antes de acostarte para proteger tu sueño.",
      sourceLabels: ["Gardiner et al. 2023, Sleep Medicine Reviews", "AJMC — Cafeína y sueño"],
      body: [
        { t: "p", s: "Puedes dormirte tras un café por la noche y aun así dormir peor — la cafeína cambia silenciosamente tu **sueño profundo** por sueño ligero." },
        { t: "h2", s: "Qué dice la investigación" },
        { t: "p", s: "Una **revisión sistemática de 2023** en Sleep Medicine Reviews reunió 24 estudios. De media, la cafeína redujo el sueño total en **45 minutos**, bajó la eficiencia del sueño y lo desplazó a fases más ligeras." },
        { t: "art", kind: "moon", caption: "Protege el sueño que no vas a recuperar." },
        { t: "p", s: "Su recomendación práctica: un café normal (~107 mg) debe ser el último **al menos 8,8 horas antes de dormir**. Un preentreno fuerte (~217 mg) necesita unas **13 horas**." },
        { t: "h2", s: "Conviértelo en una hora límite" },
        { t: "ul", items: [
          "¿A la cama a las 23:00? Último café hacia las **14:00**.",
          "¿A las 22:00? Apunta a las **13:00** aprox.",
          "¿Dosis alta o metabolismo lento? Adelántalo." ] },
        { t: "callout", s: "Caffy calcula una **hora límite** personal según tu hora de dormir y tu metabolismo — y te avisa antes de que una bebida de la tarde se coma tu sueño." },
      ] },
    { title: "¿Cuánta cafeína hay en café, té, espresso y bebidas energéticas?",
      excerpt: "Espresso, filtrado, cold brew, té verde, Red Bull — una comparación clara y con fuentes para saber qué bebes de verdad.",
      sourceLabels: ["Mayo Clinic — Contenido de cafeína", "CSPI — Tabla de cafeína"],
      body: [
        { t: "p", s: "“Un café” puede ser 60 mg o 300 mg. Aquí las cantidades típicas según datos de Mayo Clinic y CSPI — útiles para no pasar tu límite diario." },
        { t: "art", kind: "mug", caption: "“Un café” puede ser 60 mg — o 300." },
        { t: "h2", s: "Cafeína típica por porción" },
        { t: "ul", items: [
          "**Café filtrado (240 ml):** ~70–100 mg",
          "**Espresso (1 shot):** ~63–80 mg — el más fuerte por ml",
          "**Cold brew (240 ml):** ~100–200 mg",
          "**Té negro:** ~47–55 mg · **Té verde:** ~28–35 mg",
          "**Bebida energética (240 ml, p. ej. Red Bull):** ~80 mg",
          "**Shot energético (5-Hour Energy):** ~200 mg",
          "**Cola (355 ml):** ~35–40 mg" ] },
        { t: "h2", s: "Dos cosas que confunden" },
        { t: "p", s: "Primero, el **tamaño**: un café de 470 ml puede llevar 2–3 “tazas” de cafeína. Segundo, **el espresso parece más fuerte**, pero un shot suele tener menos cafeína total que una taza de filtrado — solo está concentrado." },
        { t: "callout", s: "Caffy incluye estas bebidas (y cientos más), así registrar es un toque — y cada una suma a tu nivel de cafeína en vivo." },
      ] },
    { title: "Límite diario seguro de cafeína: ¿cuánto es demasiado?",
      excerpt: "La FDA y la EFSA coinciden en 400 mg al día para la mayoría de adultos — y 200 mg en el embarazo. Qué significan en tazas.",
      sourceLabels: ["EFSA — Cafeína", "Coffee & Health — Guías de consumo de cafeína"],
      body: [
        { t: "p", s: "Hay una cifra ampliamente aceptada para adultos sanos, y los reguladores de EE. UU. y Europa coinciden en ella." },
        { t: "h2", s: "La regla de los 400 mg" },
        { t: "p", s: "Tanto la **FDA** como la **Autoridad Europea de Seguridad Alimentaria (EFSA)** consideran seguros hasta **400 mg de cafeína al día** para la mayoría de adultos sanos no embarazados — unas **cuatro tazas de café**." },
        { t: "art", kind: "heart", caption: "El exceso aparece como nervios y taquicardia." },
        { t: "h2", s: "El embarazo es distinto" },
        { t: "p", s: "ACOG, EFSA y el NHS recomiendan **no más de 200 mg al día** en el embarazo. La cafeína se elimina mucho más lento entonces — su vida media puede subir a **~15 horas** en el tercer trimestre." },
        { t: "ul", items: [
          "Nerviosismo, taquicardia o ansiedad",
          "Dificultad para conciliar o mantener el sueño",
          "Dolores de cabeza o un bajón de tarde que “necesitas” arreglar con más cafeína" ] },
        { t: "callout", s: "Caffy fija un límite diario personal y muestra un indicador en vivo, para que veas cuándo te acercas a 400 mg — antes, no después." },
      ] },
    { title: "Cómo reducir la cafeína sin dolores de cabeza",
      excerpt: "Dejarla de golpe es por lo que la gente falla. Una reducción gradual de 1–2 semanas mantiene a raya el síndrome de abstinencia.",
      sourceLabels: ["BodySpec — Cronología de la abstinencia", "EFSA — Cafeína"],
      body: [
        { t: "p", s: "Si reducir alguna vez te dejó con dos días de dolor de cabeza, el problema no fue la fuerza de voluntad — fue ir demasiado rápido." },
        { t: "h2", s: "Por qué ocurre la abstinencia" },
        { t: "p", s: "Al cortar la cafeína de golpe, los síntomas — **dolor de cabeza, fatiga, irritabilidad** — suelen empezar **12–24 horas** después y durar **2–9 días**. Es un rebote real, no debilidad." },
        { t: "art", kind: "leaf", caption: "Baja poco a poco — tu cuerpo apenas lo nota." },
        { t: "h2", s: "Una reducción que funciona" },
        { t: "ul", items: [
          "Reduce **un 10–25 % cada pocos días** durante 1–2 semanas, no todo de golpe.",
          "Cambia **una taza normal por descafeinado** cada vez — mismo ritual, menos cafeína.",
          "Adelanta primero tu **hora límite**; la cafeína tardía daña el sueño y eso alimenta el antojo.",
          "Hidrátate y cuenta con unos días planos — pasa." ] },
        { t: "callout", s: "Los planes de detox de Caffy arman esta reducción por ti (5–14 días) y siguen cada día, para que reducir se sienta un avance y no una pelea." },
      ] },
    { title: "¿Cuánta cafeína es segura durante el embarazo?",
      excerpt: "Los grandes organismos de salud coinciden: en el embarazo, mantén la cafeína por debajo de 200 mg al día. Esto es lo que equivale en tazas y por qué tu cuerpo la elimina mucho más lento ahora.",
      sourceLabels: ["NHS — Alimentos que evitar en el embarazo", "EFSA — Cafeína"],
      body: [
        { t: "p", s: "Si estás embarazada y amas tu café de la mañana, no tienes que dejarlo del todo. Pero la cantidad segura es más baja de lo habitual, y tu cuerpo ahora maneja la cafeína de forma muy distinta." },
        { t: "h2", s: "La regla de los 200 mg" },
        { t: "p", s: "La **NHS**, el **ACOG** y la **EFSA** recomiendan no más de **200 mg de cafeína al día** durante el embarazo. Eso equivale a unas **dos tazas de café instantáneo** o un café de filtro mediano. Este límite cuenta todas las fuentes, incluidos el té, la cola, el chocolate y las bebidas energéticas." },
        { t: "art", kind: "heart", caption: "Unas dos tazas al día, sumando todas las fuentes." },
        { t: "h2", s: "Por qué el límite es más bajo" },
        { t: "p", s: "La cafeína cruza la placenta, y un bebé en desarrollo no puede descomponerla. Al mismo tiempo, tu metabolismo se ralentiza drásticamente. La vida media de la cafeína puede subir de unas 5 horas a **15 horas o más** en el tercer trimestre, así que permanece y se acumula mucho más tiempo que de costumbre." },
        { t: "ul", items: [
          "**Café de filtro:** unos 140 mg por taza. Una está bien, dos es pasarse.",
          "**Café instantáneo:** unos 100 mg. Dos tazas son casi tu límite diario.",
          "**Té:** unos 75 mg por taza. **Cola:** unos 40 mg por lata.",
          "**Chocolate negro (50 g):** unos 25 mg." ] },
        { t: "callout", s: "Como la cafeína se elimina tan lento en el embarazo, Caffy te permite configurar un perfil de embarazo. Usa la vida media más larga para seguir tu total diario frente al límite de 200 mg en tiempo real." },
      ] },
    { title: "¿La cafeína causa ansiedad?",
      excerpt: "La cafeína no inventa la ansiedad, pero puede amplificarla. Desencadena el mismo corazón acelerado y la inquietud que tu cuerpo lee como miedo. ¿Dónde está la línea entre la energía y el nerviosismo?",
      sourceLabels: ["Mayo Clinic — Cafeína: cuánta es demasiada", "NCBI — Farmacología de la cafeína"],
      body: [
        { t: "p", s: "Esa sensación acelerada y en tensión tras un café de más no es imaginaria. Hay una razón química real detrás." },
        { t: "h2", s: "Por qué la cafeína se siente como ansiedad" },
        { t: "p", s: "La cafeína bloquea la **adenosina**, la sustancia calmante que señala el descanso, y desencadena una liberación de **adrenalina**. El resultado, un ritmo cardíaco más rápido, un pecho más apretado e inquietud, es casi idéntico a la respuesta de ansiedad del cuerpo. Por eso tu cerebro puede interpretarlo exactamente así." },
        { t: "art", kind: "gauge", caption: "Pasado tu límite personal, el estado de alerta se vuelve nerviosismo." },
        { t: "h2", s: "La dosis y la sensibilidad importan" },
        { t: "p", s: "La mayoría tolera hasta **400 mg al día** sin problema, pero las personas propensas a la ansiedad suelen ser mucho más sensibles. Para ellas, incluso **200 mg** pueden desatar síntomas. Tus genes, sobre todo el gen **CYP1A2**, deciden cuán rápido eliminas la cafeína y cuánto dura el nerviosismo." },
        { t: "ul", items: [
          "Corazón acelerado o palpitante, inquietud, nerviosismo",
          "Problemas para dormir, que a su vez empeoran la ansiedad al día siguiente",
          "Un bajón a media tarde que tienta a otra taza y alimenta el ciclo" ] },
        { t: "callout", s: "Si el café te da ansiedad, la solución suele ser el momento y la dosis, no dejarlo. Caffy muestra cuánta cafeína está activa en tu cuerpo ahora mismo, para que encuentres la cantidad que da energía sin pasarte de la raya." },
      ] },
    { title: "Matcha vs. café: cafeína, L-teanina y un enfoque más tranquilo",
      excerpt: "El matcha tiene menos cafeína que el café pero la combina con L-teanina. Esa es la razón por la que da un enfoque estable en vez de un pico y una caída.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Té", "CSPI — Tabla de cafeína"],
      body: [
        { t: "p", s: "El matcha se ha vuelto la alternativa preferida al café. No porque sea más fuerte, sino por cómo se siente su cafeína." },
        { t: "h2", s: "Cuánta cafeína tiene cada uno" },
        { t: "p", s: "Una taza de matcha tiene unos **60–70 mg** de cafeína, y una taza de café de filtro unos **95–120 mg**. Así que en cafeína pura gana el café. El atractivo del matcha es el tipo de energía, no la cantidad." },
        { t: "art", kind: "leaf", caption: "Menos cafeína, pero acompañada de un aminoácido que calma." },
        { t: "h2", s: "La diferencia de la L-teanina" },
        { t: "p", s: "El matcha es rico en **L-teanina**, un aminoácido que favorece un estado de alerta tranquilo y concentrado. Suaviza el filo de la cafeína, y mucha gente encuentra que el matcha da un enfoque más estable, sin el nerviosismo ni la caída que puede traer un café grande." },
        { t: "ul", items: [
          "**Café:** más cafeína, golpe más rápido. Ideal para un arranque de mañana difícil.",
          "**Matcha:** energía más suave, más larga y tranquila. Bueno para un enfoque sostenido.",
          "**Sigue contando:** el matcha no es sin cafeína, así que suma a tu total diario." ] },
        { t: "callout", s: "Ya sea que cambies al matcha o bebas ambos, la cafeína se acumula igual. Caffy trae matcha, café y cientos de bebidas integrados, así que registras cualquiera con un toque y ves tu total diario real." },
      ] },
    { title: "¿Cuánta cafeína hay en las bebidas energéticas?",
      excerpt: "De un Red Bull de 80 mg a un Bang de 300 mg, la cafeína de las energéticas varía muchísimo. Aquí tienes un desglose claro, marca por marca.",
      sourceLabels: ["CSPI — Tabla de cafeína", "Mayo Clinic — Contenido de cafeína de las bebidas"],
      body: [
        { t: "p", s: "Las bebidas energéticas son donde la gente más a menudo supera un límite seguro de cafeína sin notarlo, porque el número en la lata va de moderado a enorme." },
        { t: "h2", s: "Cafeína por lata" },
        { t: "ul", items: [
          "**Red Bull (250 ml):** unos 80 mg",
          "**Monster (500 ml):** unos 160 mg. **White Monster:** unos 160 mg",
          "**Celsius (355 ml):** unos 200 mg",
          "**Alani Nu (355 ml):** unos 200 mg",
          "**Bang (500 ml):** unos 300 mg. **Reign (500 ml):** unos 300 mg",
          "**5-Hour Energy (shot de 57 ml):** unos 200 mg" ] },
        { t: "art", kind: "cups", caption: "Una lata puede ir de 80 a 300 mg." },
        { t: "h2", s: "Por qué es fácil pasarse" },
        { t: "p", s: "Un solo **Celsius o Alani ya es la mitad** del límite diario de 400 mg para adultos. Bebe dos de ellos, más un café de la mañana, y te pasas, muchas veces sin sentir que bebiste tanto. El gran tamaño de la porción esconde la dosis." },
        { t: "callout", s: "Caffy trae estas energéticas integradas con cantidades de cafeína actualizadas, así un toque registra el número real y te avisa antes de que dos latas te pasen del límite diario." },
      ] },
    { title: "Demasiada cafeína: síntomas y qué hacer",
      excerpt: "Nervios, corazón acelerado, náuseas y ansiedad son tu cuerpo señalando una sobrecarga de cafeína. Aquí está cómo reconocerlo y cómo bajar de forma segura.",
      sourceLabels: ["Mayo Clinic — Cafeína: cuánta es demasiada", "EFSA — Cafeína"],
      body: [
        { t: "p", s: "La cafeína tiene una zona cómoda y una línea clara más allá de ella. Cruza esa línea y tu cuerpo envía señales inconfundibles." },
        { t: "h2", s: "Señales de que fue demasiada" },
        { t: "ul", items: [
          "**Nervios y temblores**, inquietud, irritabilidad",
          "**Corazón acelerado o irregular** y presión arterial más alta",
          "**Ansiedad**, problemas para dormir, dolor de cabeza",
          "**Náuseas o malestar estomacal**" ] },
        { t: "art", kind: "heart", caption: "Un corazón acelerado es la señal clásica de sobrecarga." },
        { t: "h2", s: "¿Cuánta es demasiada?" },
        { t: "p", s: "Los síntomas suelen aparecer por encima de los **400 mg/día** en adultos, o 200 mg en el embarazo, pero las personas sensibles los sienten mucho antes. Una verdadera **sobredosis de cafeína**, con vómitos, confusión y latidos muy rápidos, es rara pero una emergencia médica, y casi siempre está ligada a pastillas o polvos, no al café." },
        { t: "h2", s: "Cómo bajar" },
        { t: "ul", items: [
          "**Deja toda la cafeína** el resto del día. Nada de otra 'para aguantar'.",
          "**Hidrátate y camina.** El movimiento ligero ayuda.",
          "**Espera a que pase.** Con una vida media de unas 5–6 horas, lo peor pasa en unas horas." ] },
        { t: "callout", s: "La mayoría de las sobrecargas son solo una segunda o tercera taza mal cronometrada. El indicador en vivo de Caffy muestra cuándo te acercas a tu límite, para que pares antes de que empiecen los nervios." },
      ] },
    { title: "Detox de cafeína: la línea de tiempo de la abstinencia, día a día",
      excerpt: "¿Reduciendo la cafeína? La abstinencia llega a su punto máximo hacia el día uno o dos y se desvanece en una semana. Aquí está la línea de tiempo hora por hora y cómo hacerla más llevadera.",
      sourceLabels: ["BodySpec — Línea de tiempo de la abstinencia de cafeína", "EFSA — Cafeína"],
      body: [
        { t: "p", s: "Cuando dejas o reduces la cafeína, la abstinencia sigue un calendario sorprendentemente predecible. Conocerlo hace los días difíciles mucho más fáciles de sobrellevar." },
        { t: "h2", s: "La línea de tiempo de la abstinencia" },
        { t: "ul", items: [
          "**12–24 horas:** llegan el primer dolor de cabeza y la fatiga cuando la adenosina vuelve de golpe.",
          "**24–51 horas:** los síntomas llegan a su punto máximo, con dolor de cabeza, irritabilidad, ánimo bajo y niebla mental.",
          "**2–9 días:** los síntomas se atenúan, y la mayoría se siente normal en una semana." ] },
        { t: "art", kind: "taper", caption: "Los síntomas suben pronto y luego se desvanecen durante la semana." },
        { t: "h2", s: "Por qué pasa" },
        { t: "p", s: "La cafeína habitual hace que tu cerebro forme **receptores de adenosina** de más. Quita la cafeína y quedan de pronto sin oposición, y esa avalancha de adenosina es lo que causa el dolor de cabeza y la pesadez. Tu cerebro se reajusta a lo largo de varios días." },
        { t: "h2", s: "Hazlo más llevadero" },
        { t: "ul", items: [
          "**Reduce poco a poco, no de golpe.** Recorta un 10–25 % cada pocos días.",
          "**Hidrátate** y mantén el sueño estable.",
          "Cuenta con lo peor en el **día uno o dos**, y luego llega el alivio." ] },
        { t: "callout", s: "Los planes de detox de Caffy arman una reducción gradual de 5–14 días por ti y siguen cada día, para que un detox de cafeína se sienta un avance constante en vez de un dolor de cabeza de dos días." },
      ] },
    { title: "Cafeína y TDAH: ¿realmente ayuda?",
      excerpt: "La cafeína es un estimulante suave, así que puede afinar el enfoque un rato. Pero no sustituye el tratamiento del TDAH, y puede arruinar el sueño que mantiene los síntomas a raya.",
      sourceLabels: ["NCBI — Farmacología de la cafeína", "Sleep Foundation — Cafeína y sueño"],
      body: [
        { t: "p", s: "Muchas personas con TDAH sienten que el café les ayuda a concentrarse, y hay un mecanismo real detrás. Pero el panorama es más complicado que 'la cafeína funciona.'" },
        { t: "h2", s: "Por qué puede ayudar al enfoque" },
        { t: "p", s: "La cafeína es un **estimulante** que bloquea la adenosina y sube un poco la **dopamina**, el mismo neurotransmisor al que apuntan los medicamentos del TDAH, solo que mucho más débilmente. Eso puede dar un impulso modesto y temporal en alerta y concentración." },
        { t: "art", kind: "beans", caption: "Un leve empujón al enfoque, no un tratamiento." },
        { t: "h2", s: "El problema" },
        { t: "p", s: "La cafeína no reemplaza el tratamiento del TDAH, y su efecto es pequeño y breve. Peor aún, puede alterar el sueño, y dormir mal empeora notablemente los síntomas del TDAH (falta de atención, impulsividad, inquietud) al día siguiente, anulando cualquier ganancia." },
        { t: "ul", items: [
          "Mantén las dosis moderadas. Grandes cantidades cambian enfoque por nervios.",
          "Cuida el momento. La cafeína tardía daña el sueño, lo que sale por la culata.",
          "Si tomas medicación estimulante, sumar cafeína puede acumular efectos secundarios, así que consulta a tu médico." ] },
        { t: "callout", s: "Si usas cafeína para concentrarte, el momento lo es todo. Caffy muestra tu nivel de cafeína activo y una hora de corte personal, para que un impulso de enfoque hoy no te cueste el sueño de esta noche." },
      ] },
    { title: "Cafeína antes de entrenar: cuánta y cuándo",
      excerpt: "La cafeína es uno de los potenciadores de rendimiento mejor estudiados, si la cronometras bien. Aquí están la dosis y el momento que ayudan, sin arruinar tu sueño.",
      sourceLabels: ["Sleep Foundation — Cafeína y sueño", "Mayo Clinic — Contenido de cafeína de las bebidas"],
      body: [
        { t: "p", s: "La cafeína realmente mejora la resistencia, la fuerza y el enfoque en el entrenamiento, por eso está en casi todos los pre-entrenos. El truco está en la dosis y el momento." },
        { t: "h2", s: "Cuánta ayuda" },
        { t: "p", s: "La investigación en nutrición deportiva apunta a unos **3–6 mg por kg de peso corporal** para un beneficio de rendimiento, unos **200–400 mg** para una persona de 70 kg. Más que eso rara vez ayuda y solo añade nervios. Un café fuerte, de unos 150–200 mg, basta para la mayoría." },
        { t: "art", kind: "mug", caption: "Un café fuerte basta para la mayoría de los entrenamientos." },
        { t: "h2", s: "Cuándo tomarla" },
        { t: "p", s: "La cafeína alcanza su pico en sangre **30–60 minutos** después de beberla, así que tómala unos **45 minutos antes** de entrenar. Por eso un pre-entreno suele ser uno de tus mayores golpes de cafeína del día." },
        { t: "ul", items: [
          "**Cuida el momento.** Un entrenamiento nocturno significa una dosis nocturna, y puede arruinar tu sueño.",
          "El **pre-entreno sin cafeína** es una opción válida para entrenar tarde.",
          "Sigue contando para tu **límite diario de 400 mg**." ] },
        { t: "callout", s: "Un pre-entreno suele ser la mayor dosis individual del día. Caffy lo registra con un toque y lo integra en tu total diario y tu hora de corte de sueño, para que entrenar duro no signifique dormir mal." },
      ] },
    { title: "¿Qué es el matcha? Una guía sencilla del té verde que todos beben",
      excerpt: "El matcha es té verde en polvo que se bate en agua, no se infusiona. Aquí tienes qué es, cuánta cafeína tiene y por qué se siente distinto al café.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Té", "CSPI — Tabla de cafeína"],
      body: [
        { t: "p", s: "El matcha está por todas partes ahora, de las cafeterías a las estanterías del supermercado. Pero es un poco distinto de cualquier otro té, y en esa diferencia está todo." },
        { t: "h2", s: "Es té verde entero, en polvo" },
        { t: "p", s: "El matcha se hace con hojas de té verde cultivadas a la sombra, secadas y molidas hasta un polvo fino. En vez de infusionar las hojas y tirarlas, bates el polvo en agua caliente y bebes la hoja entera. Por eso el matcha es más concentrado, tanto en sabor como en compuestos." },
        { t: "art", kind: "leaf", caption: "Bebes la hoja entera, no solo una infusión." },
        { t: "h2", s: "¿Cuánta cafeína tiene?" },
        { t: "p", s: "Una taza de matcha tiene unos **60–70 mg** de cafeína, un poco menos que una taza de café pero más que el té verde infusionado normal. También contiene **L-teanina**, un aminoácido que le da al matcha su energía más tranquila y estable." },
        { t: "ul", items: [
          "**Grado ceremonial:** más brillante y suave, para beber solo con agua.",
          "**Grado culinario:** más fuerte y amargo, para lattes y repostería.",
          "**Sabor:** herbáceo y ligeramente dulce, con una nota sabrosa llamada umami." ] },
        { t: "callout", s: "Como sea que lo bebas, el matcha suma cafeína a tu día. Caffy trae el matcha integrado, así registras una taza con un toque y mantienes tu total diario exacto." },
      ] },
    { title: "L-teanina: el aminoácido detrás del enfoque tranquilo del matcha",
      excerpt: "La L-teanina es el compuesto que hace que el té se sienta más tranquilo que el café. Junto con la cafeína, puede afinar el enfoque y a la vez suavizar el nerviosismo.",
      sourceLabels: ["NIH / PMC — L-teanina y estado mental", "Harvard T.H. Chan — The Nutrition Source: Té"],
      body: [
        { t: "p", s: "Si el matcha o el té verde te dejan alerta pero no acelerado, estás notando la L-teanina en acción." },
        { t: "h2", s: "Qué hace la L-teanina" },
        { t: "p", s: "La L-teanina es un aminoácido que se encuentra casi solo en el té. Por sí sola promueve un estado de **alerta tranquila y relajada** sin darte sueño. La investigación la ha vinculado a menos estrés y mejor atención." },
        { t: "art", kind: "moon", caption: "Alerta, pero tranquilo en vez de acelerado." },
        { t: "h2", s: "Por qué combina tan bien con la cafeína" },
        { t: "p", s: "La cafeína y la L-teanina trabajan en equipo. La cafeína sube la alerta, y la L-teanina suaviza sus bordes ásperos, así que juntas suelen dar **un enfoque estable con menos nervios** que la cafeína sola. Esa combinación es la razón por la que una taza de matcha puede sentirse más limpia que un café fuerte." },
        { t: "ul", items: [
          "**En el té:** el matcha tiene la mayor cantidad, seguido de otros tés verdes y negros.",
          "**Con cafeína:** la combinación produce el clásico 'enfoque tranquilo'.",
          "**No es un sedante:** relaja la mente sin darte sueño." ] },
        { t: "callout", s: "La L-teanina cambia cómo se siente la cafeína, pero no cuánta has tomado. Caffy sigue la cafeína de tu matcha y tu café para que tu total diario sea honesto." },
      ] },
    { title: "Beneficios del matcha para la salud: qué dice realmente la evidencia",
      excerpt: "El matcha es rico en antioxidantes y L-teanina, y la investigación es prometedora. Pero vale la pena separar los hallazgos sólidos de la exageración.",
      sourceLabels: ["NCCIH (NIH) — Té verde", "Harvard T.H. Chan — The Nutrition Source: Té"],
      body: [
        { t: "p", s: "Al matcha lo llaman superalimento, y de verdad tiene puntos fuertes. Pero el panorama honesto es 'prometedor, no probado', y conviene saberlo antes de convencerte." },
        { t: "h2", s: "Lo que está bien respaldado" },
        { t: "p", s: "Como bebes la hoja entera, el matcha es especialmente rico en **catequinas**, un grupo de antioxidantes que incluye el EGCG. Las catequinas del té verde se asocian a mejoras modestas en el **colesterol**, y su **L-teanina** tiene evidencia decente para la calma y el enfoque." },
        { t: "art", kind: "heart", caption: "Puntos fuertes reales, con límites honestos." },
        { t: "h2", s: "Donde las afirmaciones superan a la ciencia" },
        { t: "p", s: "Las afirmaciones mayores, como una pérdida de peso importante o la prevención de enfermedades, no están resueltas. Organismos de salud como el NIH señalan que la evidencia sigue siendo mixta. El matcha es una bebida genuinamente sana, pero no una cura." },
        { t: "ul", items: [
          "**Antioxidantes:** rico en catequinas, porque bebes la hoja entera.",
          "**Enfoque tranquilo:** la L-teanina con cafeína tiene la mejor evidencia.",
          "**Cuidado:** sigue teniendo cafeína, así que tu límite diario sigue aplicando." ] },
        { t: "callout", s: "La forma sana de disfrutar el matcha es vigilar la cafeína. Caffy registra cada taza y mantiene tu total diario por debajo de tu límite personal." },
      ] },
    { title: "Cómo preparar matcha en casa (y elegir uno bueno)",
      excerpt: "Un buen matcha es fácil de preparar cuando conoces la proporción y el batidor. Aquí tienes un método sencillo, además de cómo elegir un polvo que no sea amargo.",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source: Té", "CSPI — Tabla de cafeína"],
      body: [
        { t: "p", s: "El mal matcha es amargo y grumoso. El buen matcha es sedoso y naturalmente un poco dulce, y la diferencia es sobre todo técnica y calidad, no suerte." },
        { t: "h2", s: "Un método sencillo" },
        { t: "ul", items: [
          "**Tamiza** 1–2 cucharaditas de matcha en una taza para quitar los grumos.",
          "**Añade** unos 60 ml de agua a 70–80 °C. El agua hirviendo lo vuelve amargo.",
          "**Bate** enérgicamente en zigzag con un batidor de bambú hasta que espume.",
          "**Para un latte:** añade leche vaporizada por encima después." ] },
        { t: "art", kind: "mug", caption: "Agua sin hervir, y batir hasta que espume." },
        { t: "h2", s: "Elegir un buen matcha" },
        { t: "p", s: "Busca un color **verde vivo**, que indica frescura, y un origen japonés como Uji. El **grado ceremonial** es el mejor para beber con agua, mientras que el **grado culinario** es más barato y va bien para lattes, donde la leche esconde cualquier amargor." },
        { t: "callout", s: "Una taza de matcha son unos 60–70 mg de cafeína. Caffy lo trae integrado, así que tu tazón de la mañana cuenta hacia tu total diario automáticamente." },
      ] },
  ],
  ja: [
    { title: "カフェインはどれくらい体内に残る？",
      excerpt: "カフェインの半減期は約5〜6時間。午後に飲んだコーヒーが何を意味し、いつ体から抜けるのかを解説します。",
      sourceLabels: ["Sleep Foundation — カフェインの持続時間", "NCBI — カフェインの薬理"],
      body: [
        { t: "p", s: "午後2時のコーヒーは夕食時にはまだ残っています。カフェインは**半減期**が決める予測可能なスケジュールで抜けていきます — 毎日の習慣について知るべき最も役立つ知識です。" },
        { t: "h2", s: "「半減期」とは" },
        { t: "p", s: "半減期とは、体が1回分の**半分**を代謝するのにかかる時間です。健康な成人で平均**約5〜6時間**、遺伝子・年齢・肝臓・薬によりおよそ1.5〜9.5時間と幅があります。" },
        { t: "art", kind: "beans", caption: "午後の一杯は数時間後もまだ効いている。" },
        { t: "p", s: "朝9時に**200mg**（大きめのコーヒー）を飲むと、午後の半ばでも約**100mg**が体内を巡っています。カフェインが実質的に消えるには**5〜6半減期＝ほぼ丸一日**かかります。" },
        { t: "h2", s: "あなたの数値が個人差を持つ理由" },
        { t: "ul", items: [
          "**妊娠・経口避妊薬**は遅くする — 妊娠後期には半減期が15時間になることも。",
          "**喫煙**は速くし、半減期をおよそ半分に。",
          "**遺伝（CYP1A2）**により速い代謝と遅い代謝に分かれる。" ] },
        { t: "callout", s: "Caffyはまさにこれをモデル化します。一般的な目安ではなく、**あなたの**半減期で今どれだけカフェインが活性かを表示します。" },
      ] },
    { title: "より良い睡眠のために、何時までにコーヒーをやめるべき？",
      excerpt: "2023年のメタ分析が古い助言に数字を与えました。睡眠を守るには就寝の約8.8時間前にコーヒーをやめましょう。",
      sourceLabels: ["Gardiner ほか 2023, Sleep Medicine Reviews", "AJMC — カフェインと睡眠"],
      body: [
        { t: "p", s: "夜のコーヒーの後でも寝つけますが、睡眠の質は落ちます — カフェインは静かに**深い睡眠**を浅い睡眠と入れ替えます。" },
        { t: "h2", s: "研究が示すこと" },
        { t: "p", s: "Sleep Medicine Reviews掲載の**2023年の系統的レビュー**は24件の研究をまとめました。平均でカフェインは総睡眠時間を**45分**短縮し、睡眠効率を下げ、睡眠を浅い段階へずらしました。" },
        { t: "art", kind: "moon", caption: "取り戻せない睡眠を守ろう。" },
        { t: "p", s: "実用的な指針：通常のコーヒー（約107mg）は**就寝の少なくとも8.8時間前**が最後の一杯。強めのプレワークアウト（約217mg）は約**13時間**必要です。" },
        { t: "h2", s: "これを「締め切り時刻」に" },
        { t: "ul", items: [
          "就寝23時？ 最後のコーヒーはおよそ**14時**。",
          "就寝22時？ 目安は**13時**ごろ。",
          "量が多い・代謝が遅い？ さらに早めに。" ] },
        { t: "callout", s: "Caffyは就寝時刻と代謝から個人向けの**安全な締め切り時刻**を計算し、午後の一杯が今夜の睡眠を削る前に警告します。" },
      ] },
    { title: "コーヒー・お茶・エスプレッソ・エナジードリンクのカフェイン量は？",
      excerpt: "エスプレッソ、ドリップ、コールドブリュー、緑茶、レッドブル — 実際に何を飲んでいるか分かる、出典付きの比較。",
      sourceLabels: ["Mayo Clinic — 飲料のカフェイン量", "CSPI — カフェイン一覧"],
      body: [
        { t: "p", s: "「コーヒー1杯」は60mgのことも300mgのこともあります。Mayo ClinicとCSPIのデータによる目安 — 1日の上限内に収めるのに便利です。" },
        { t: "art", kind: "mug", caption: "「コーヒー1杯」は60mgにも、300mgにもなる。" },
        { t: "h2", s: "1食分あたりの目安" },
        { t: "ul", items: [
          "**ドリップコーヒー（240ml）:** 約70〜100mg",
          "**エスプレッソ（1ショット）:** 約63〜80mg — ml当たり最強",
          "**コールドブリュー（240ml）:** 約100〜200mg",
          "**紅茶:** 約47〜55mg ・ **緑茶:** 約28〜35mg",
          "**エナジードリンク（240ml、例: レッドブル）:** 約80mg",
          "**エナジーショット（5-Hour Energy）:** 約200mg",
          "**コーラ（355ml）:** 約35〜40mg" ] },
        { t: "h2", s: "つまずきやすい2点" },
        { t: "p", s: "第一に**サイズ**：470mlのカフェのコーヒーは2〜3「杯」分のカフェインを含みます。第二に、**エスプレッソは強く感じます**が、1ショットの総カフェインはドリップ1杯より少ないことが多い — 濃いだけです。" },
        { t: "callout", s: "Caffyにはこれらの飲み物（と数百種）が内蔵され、記録はワンタップ — それぞれがリアルタイムのカフェイン量に加算されます。" },
      ] },
    { title: "安全な1日のカフェイン量：どこからが多すぎ？",
      excerpt: "FDAとEFSAは、ほとんどの成人で1日400mg、妊娠中は200mgで一致。これがカップ換算で何杯かを解説します。",
      sourceLabels: ["EFSA — カフェイン", "Coffee & Health — カフェイン摂取ガイドライン"],
      body: [
        { t: "p", s: "健康な成人向けに広く合意された数字があり、米国と欧州の規制当局が同じ値に落ち着いています。" },
        { t: "h2", s: "400mgの目安" },
        { t: "p", s: "**FDA**も**欧州食品安全機関（EFSA）**も、健康で妊娠していない成人の多くにとって**1日400mgまで**のカフェインを安全としています — おおよそ**コーヒー4杯**です。" },
        { t: "art", kind: "heart", caption: "摂りすぎは動悸や手の震えとして現れる。" },
        { t: "h2", s: "妊娠中は別" },
        { t: "p", s: "ACOG、EFSA、NHSはいずれも妊娠中は**1日200mgまで**を推奨します。この時期はカフェインの代謝がずっと遅く — 妊娠後期には半減期が**約15時間**まで延び、蓄積します。" },
        { t: "ul", items: [
          "手の震え、動悸、不安",
          "寝つき・寝つづきの悪さ",
          "頭痛や、さらにカフェインで「直したくなる」午後の失速" ] },
        { t: "callout", s: "Caffyは個人向けの1日の上限を設定し、ライブのゲージを表示 — 400mgに近づいていることを、後ではなく事前に確認できます。" },
      ] },
    { title: "頭痛なしでカフェインを減らす方法",
      excerpt: "急にやめることが失敗の原因。1〜2週間かけて少しずつ減らせば、離脱症状を抑えられます。",
      sourceLabels: ["BodySpec — カフェイン離脱の経過", "EFSA — カフェイン"],
      body: [
        { t: "p", s: "減らそうとして2日間の頭痛に見舞われたことがあるなら、問題は意志力ではなく — 速すぎたことです。" },
        { t: "h2", s: "なぜ離脱が起きるのか" },
        { t: "p", s: "急にやめると、症状 — **頭痛・疲労・いらだち** — は通常**12〜24時間**後に始まり、**2〜9日**続くことがあります。これは本物の反動で、弱さではありません。" },
        { t: "art", kind: "leaf", caption: "ゆっくり減らせば、体はほとんど気づかない。" },
        { t: "h2", s: "うまくいく減らし方" },
        { t: "ul", items: [
          "1〜2週間かけて、一度にではなく**数日ごとに約10〜25%**減らす。",
          "毎回**通常の1杯をデカフェに**置き換える — 同じ習慣で、カフェインは少なく。",
          "まず**締め切り時刻を早める**；遅いカフェインは睡眠を乱し、それが渇望を強める。",
          "水分を取り、数日は低調でも大丈夫 — 過ぎ去ります。" ] },
        { t: "callout", s: "Caffyのデトックスプランはこの減量を自動で組み（5〜14日）、毎日を記録 — 減らすことが戦いではなく前進に感じられます。" },
      ] },
    { title: "妊娠中のカフェインはどれくらいまで安全？",
      excerpt: "主要な保健機関の見解は一致しています。妊娠中はカフェインを1日200mg未満に。これが何杯分か、そしてなぜ今は体からずっとゆっくり抜けるのかを解説します。",
      sourceLabels: ["NHS — 妊娠中に避けたい食品", "EFSA — カフェイン"],
      body: [
        { t: "p", s: "妊娠中で朝のコーヒーが好きでも、完全にやめる必要はありません。ただし安全な量はいつもより少なく、体は今、カフェインをまったく違うように処理します。" },
        { t: "h2", s: "200mgルール" },
        { t: "p", s: "**NHS**、**ACOG**、**EFSA** はいずれも、妊娠中は**1日200mgを超えないカフェイン**を推奨しています。これはおおよそ**インスタントコーヒー2杯**、または中サイズのドリップコーヒー1杯にあたります。この上限は紅茶、コーラ、チョコレート、エナジードリンクなど、すべての源を合計して数えます。" },
        { t: "art", kind: "heart", caption: "1日およそ2杯、しかもすべての源を合わせて。" },
        { t: "h2", s: "なぜ上限が低いのか" },
        { t: "p", s: "カフェインは胎盤を通過し、発育中の赤ちゃんはそれを分解できません。同時に、あなたの代謝も大きく遅くなります。カフェインの半減期は妊娠後期に約5時間から**15時間以上**まで延び、いつもよりずっと長く体内に残り、蓄積します。" },
        { t: "ul", items: [
          "**ドリップコーヒー：**1杯あたり約140mg。1杯はOK、2杯で超過します。",
          "**インスタントコーヒー：**約100mg。2杯でほぼ1日の上限です。",
          "**紅茶：**1杯あたり約75mg。**コーラ：**1缶あたり約40mg。",
          "**ダークチョコレート（50g）：**約25mg。" ] },
        { t: "callout", s: "妊娠中はカフェインが非常にゆっくり抜けるため、Caffyでは妊娠プロファイルを設定できます。長くなった半減期を使い、1日の合計を200mgの上限に対してリアルタイムで追跡します。" },
      ] },
    { title: "カフェインは不安を引き起こす？",
      excerpt: "カフェインは不安を生み出しはしませんが、増幅させることはあります。体が恐怖と読み取るあの動悸や落ち着かなさを引き起こすのです。高揚と神経過敏の境目はどこにあるのでしょう。",
      sourceLabels: ["Mayo Clinic — カフェイン：どれくらいが多すぎか", "NCBI — カフェインの薬理学"],
      body: [
        { t: "p", s: "コーヒーを1杯飲みすぎたあとの、あの高ぶって落ち着かない感覚は気のせいではありません。その裏には本当の化学的な理由があります。" },
        { t: "h2", s: "なぜカフェインは不安のように感じるのか" },
        { t: "p", s: "カフェインは、休息を知らせる鎮静物質**アデノシン**をブロックし、**アドレナリン**の放出を引き起こします。その結果である心拍の上昇、胸の締めつけ、落ち着かなさは、体の不安反応とほぼ同じです。だから脳はそれをそのまま不安と解釈することがあります。" },
        { t: "art", kind: "gauge", caption: "個人の限界を超えると、覚醒は神経過敏へと傾く。" },
        { t: "h2", s: "量と感受性のどちらも重要" },
        { t: "p", s: "多くの人は1日**400mg**までなら問題なく耐えられますが、不安になりやすい人はずっと敏感なことが多く、そうした人では**200mg**でも症状が出ることがあります。カフェインを抜く速さと高ぶりの続く長さは、遺伝子、とくに**CYP1A2**遺伝子が決めます。" },
        { t: "ul", items: [
          "動悸や強い鼓動、落ち着かなさ、神経過敏",
          "寝つきの悪さ。これ自体が翌日の不安を悪化させます。",
          "午後の失速がもう1杯を誘い、悪循環を生む" ] },
        { t: "callout", s: "コーヒーで不安になるなら、解決は多くの場合やめることではなく、タイミングと量です。Caffyは今あなたの体内でどれだけカフェインが活性かを表示するので、過剰にせずエネルギーになる量を見つけられます。" },
      ] },
    { title: "抹茶とコーヒー：カフェイン、L-テアニン、そして穏やかな集中",
      excerpt: "抹茶はコーヒーよりカフェインが少ないですが、L-テアニンと組み合わさっています。これが、急上昇と急降下ではなく安定した集中をもたらす理由です。",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source：お茶", "CSPI — カフェイン一覧"],
      body: [
        { t: "p", s: "抹茶は定番のコーヒー代替になりました。強いからではなく、そのカフェインの感じ方が違うからです。" },
        { t: "h2", s: "それぞれのカフェイン量" },
        { t: "p", s: "抹茶1杯は**約60〜70mg**のカフェイン、ドリップコーヒー1杯は**約95〜120mg**です。純粋なカフェイン量ではコーヒーが勝ちます。抹茶の魅力は量ではなく、エネルギーの質にあります。" },
        { t: "art", kind: "leaf", caption: "カフェインは少なく、しかし心を落ち着けるアミノ酸とともに。" },
        { t: "h2", s: "L-テアニンの違い" },
        { t: "p", s: "抹茶は、穏やかで集中した覚醒を促すアミノ酸**L-テアニン**を豊富に含みます。これがカフェインの鋭さを和らげます。多くの人は、大きなコーヒーが招く神経過敏や失速なしに、より安定した集中を抹茶から得られると感じています。" },
        { t: "ul", items: [
          "**コーヒー：**カフェインが多く効きが速い。つらい朝の始動に最適。",
          "**抹茶：**より穏やかで長く、静かなエネルギー。持続する集中に向く。",
          "**それでも数える：**抹茶はノンカフェインではなく、1日の合計に加算されます。" ] },
        { t: "callout", s: "抹茶に変えても両方飲んでも、カフェインは同じように積み上がります。Caffyには抹茶やコーヒーなど数百種類の飲み物が内蔵されているので、どちらもワンタップで記録し、本当の1日の合計を確認できます。" },
      ] },
    { title: "エナジードリンクのカフェイン量はどれくらい？",
      excerpt: "80mgのレッドブルから300mgのBangまで、エナジードリンクのカフェインは大きく変わります。何を飲んでいるかが分かる、ブランド別の明快な内訳です。",
      sourceLabels: ["CSPI — カフェイン一覧", "Mayo Clinic — 飲み物のカフェイン含有量"],
      body: [
        { t: "p", s: "エナジードリンクは、人が最も気づかぬうちに安全なカフェイン上限を超えやすい場所です。缶の数字が控えめから膨大まで幅広いからです。" },
        { t: "h2", s: "缶あたりのカフェイン" },
        { t: "ul", items: [
          "**レッドブル（250ml）：**約80mg",
          "**Monster（500ml）：**約160mg。**White Monster：**約160mg",
          "**Celsius（355ml）：**約200mg",
          "**Alani Nu（355ml）：**約200mg",
          "**Bang（500ml）：**約300mg。**Reign（500ml）：**約300mg",
          "**5-Hour Energy（57mlショット）：**約200mg" ] },
        { t: "art", kind: "cups", caption: "1缶で80〜300mgと幅がある。" },
        { t: "h2", s: "なぜやりすぎやすいのか" },
        { t: "p", s: "**CelsiusやAlaniは1本で、すでに成人の1日400mg上限の半分**です。これを2本、さらに朝のコーヒーを足すと、そんなに飲んだ感覚もないまま上限を超えます。大きな容量が量を隠すのです。" },
        { t: "callout", s: "Caffyはこれらのエナジードリンクを最新のカフェイン量とともに内蔵しています。ワンタップで実際の数値を記録し、2本で1日の上限を超える前に警告します。" },
      ] },
    { title: "カフェインの摂りすぎ：症状と対処法",
      excerpt: "神経過敏、動悸、吐き気、不安は、体がカフェイン過多を知らせるサインです。見分け方と、安全に落ち着く方法を解説します。",
      sourceLabels: ["Mayo Clinic — カフェイン：どれくらいが多すぎか", "EFSA — カフェイン"],
      body: [
        { t: "p", s: "カフェインには快適な範囲と、その先にはっきりした一線があります。その線を越えると、体はまぎれもないサインを送ります。" },
        { t: "h2", s: "摂りすぎのサイン" },
        { t: "ul", items: [
          "**神経過敏や震え**、落ち着かなさ、いらだち",
          "**動悸や不整脈**、そして血圧の上昇",
          "**不安**、寝つきの悪さ、頭痛",
          "**吐き気や胃の不快感**" ] },
        { t: "art", kind: "heart", caption: "動悸は典型的な過多のサイン。" },
        { t: "h2", s: "どれくらいが多すぎ？" },
        { t: "p", s: "症状はふつう成人で**1日400mg**を超えると現れます。妊娠中は200mgです。ただし敏感な人はずっと早く感じます。嘔吐、混乱、非常に速い心拍をともなう本当の**カフェイン中毒**はまれですが、医療上の緊急事態であり、ほぼ常にコーヒーではなく錠剤や粉末に関係します。" },
        { t: "h2", s: "落ち着く方法" },
        { t: "ul", items: [
          "その日はもう**すべてのカフェインを止める。**「乗り切るため」の一杯はなし。",
          "**水分を取って歩く。**軽い運動が助けになります。",
          "**過ぎるのを待つ。**半減期は約5〜6時間で、最悪は数時間で去ります。" ] },
        { t: "callout", s: "過多のほとんどは、タイミングの悪い2杯目や3杯目にすぎません。Caffyのライブゲージは上限に近づいたときを示すので、神経過敏が始まる前に止められます。" },
      ] },
    { title: "カフェイン・デトックス：離脱の経過を一日ごとに",
      excerpt: "カフェインを減らしていますか？離脱は1〜2日目あたりでピークを迎え、1週間以内に消えていきます。時間ごとの経過と、それを楽にする方法を解説します。",
      sourceLabels: ["BodySpec — カフェイン離脱の経過", "EFSA — カフェイン"],
      body: [
        { t: "p", s: "カフェインをやめたり減らしたりすると、離脱は驚くほど予測可能なスケジュールをたどります。それを知っていれば、つらい日々もずっと乗り切りやすくなります。" },
        { t: "h2", s: "離脱の経過" },
        { t: "ul", items: [
          "**12〜24時間：**アデノシンが戻り、最初の頭痛と疲労が始まります。",
          "**24〜51時間：**症状がピークに達します。頭痛、いらだち、気分の落ち込み、頭のもやが最も強く出ます。",
          "**2〜9日：**症状は和らぎ、多くの人は1週間以内に元通りに感じます。" ] },
        { t: "art", kind: "taper", caption: "症状は早くピークを迎え、その週のうちに薄れていく。" },
        { t: "h2", s: "なぜ起きるのか" },
        { t: "p", s: "習慣的なカフェインは、脳に余分な**アデノシン受容体**を作らせます。カフェインを取り去るとそれらが急に無抑制になり、このアデノシンの氾濫が頭痛と重さを生みます。脳は数日かけて再調整します。" },
        { t: "h2", s: "楽にするには" },
        { t: "ul", items: [
          "**一気にやめず、少しずつ減らす。**数日ごとに10〜25%カットします。",
          "**水分を取り**、睡眠を安定させる。",
          "最悪は**1〜2日目**と見込む。その後は楽になります。" ] },
        { t: "callout", s: "Caffyのデトックスプランは、5〜14日の緩やかな減量をあなたのために組み、毎日を記録します。カフェイン・デトックスが2日間の頭痛ではなく、着実な前進に感じられます。" },
      ] },
    { title: "カフェインとADHD：本当に効く？",
      excerpt: "カフェインは軽い刺激物なので、しばらくは集中を高められます。でもADHD治療の代わりにはならず、症状を抑える睡眠を台無しにしかねません。",
      sourceLabels: ["NCBI — カフェインの薬理学", "Sleep Foundation — カフェインと睡眠"],
      body: [
        { t: "p", s: "ADHDのある多くの人が、コーヒーで集中しやすくなると感じます。そこには本当の仕組みがあります。ですが実情は「カフェインは効く」よりも複雑です。" },
        { t: "h2", s: "なぜ集中を助けうるのか" },
        { t: "p", s: "カフェインはアデノシンをブロックし、**ドーパミン**をわずかに押し上げる**刺激物**です。これはADHD治療薬が狙うのと同じ神経伝達物質ですが、作用はずっと弱いものです。それでも、覚醒と集中にささやかで一時的な後押しが得られます。" },
        { t: "art", kind: "beans", caption: "集中のわずかな後押し。治療ではありません。" },
        { t: "h2", s: "落とし穴" },
        { t: "p", s: "カフェインはADHD治療の代わりにはならず、効果は小さく短命です。さらに悪いことに、睡眠を乱すことがあります。睡眠不足は翌日のADHD症状、つまり不注意、衝動性、落ち着かなさを目に見えて悪化させ、得た分を打ち消してしまいます。" },
        { t: "ul", items: [
          "量はほどほどに。多すぎると集中を神経過敏と引き換えにします。",
          "タイミングに注意。遅いカフェインは睡眠を損ない、逆効果になります。",
          "刺激薬を服用中なら、カフェインを足すと副作用が重なりえます。医師に相談を。" ] },
        { t: "callout", s: "集中のためにカフェインを使うなら、タイミングがすべてです。Caffyは活性カフェイン量と個人の締め切り時刻を表示するので、今日の集中の後押しが今夜の睡眠を犠牲にしません。" },
      ] },
    { title: "運動前のカフェイン：どれくらい、いつ",
      excerpt: "カフェインは、正しくタイミングを取れば最もよく研究されたパフォーマンス向上手段の一つです。睡眠を台無しにせず効く量とタイミングを解説します。",
      sourceLabels: ["Sleep Foundation — カフェインと睡眠", "Mayo Clinic — 飲み物のカフェイン含有量"],
      body: [
        { t: "p", s: "カフェインはトレーニングで持久力・筋力・集中を実際に高めます。だからほぼすべてのプレワークアウトに入っています。コツは量とタイミングです。" },
        { t: "h2", s: "どれくらいが効くか" },
        { t: "p", s: "スポーツ栄養の研究は、パフォーマンス向上には**体重1kgあたり約3〜6mg**を示唆します。70kgの人でおよそ**200〜400mg**です。それ以上はめったに役立たず、神経過敏を増すだけ。濃いめのコーヒー、約150〜200mgで多くの人には十分です。" },
        { t: "art", kind: "mug", caption: "たいていの運動には濃いコーヒー1杯で十分。" },
        { t: "h2", s: "いつ摂るか" },
        { t: "p", s: "カフェインは飲んでから**30〜60分**で血中濃度がピークになるので、運動の**約45分前**に摂りましょう。プレワークアウトが1日で最大級のカフェインになりやすいのもこのためです。" },
        { t: "ul", items: [
          "**タイミングに注意。**夜の運動は夜の摂取を意味し、睡眠を台無しにしかねません。",
          "遅い時間の運動には**ノンカフェインのプレワークアウト**も有効な選択肢です。",
          "それでも**1日400mg**の上限に加算されます。" ] },
        { t: "callout", s: "プレワークアウトは、その人の1日で最大の一回量になることがよくあります。Caffyはワンタップで記録し、1日の合計と睡眠の締め切り時刻に組み込みます。きつく追い込んでも、眠りが犠牲になりません。" },
      ] },
    { title: "抹茶とは？みんなが飲んでいる緑茶のやさしい入門",
      excerpt: "抹茶は、浸出させるのではなく水に点てる粉末の緑茶です。それが何か、カフェインはどれくらいか、そしてなぜコーヒーと違って感じるのかを解説します。",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source：お茶", "CSPI — カフェイン一覧"],
      body: [
        { t: "p", s: "抹茶はいま、カフェからスーパーの棚まで、どこにでもあります。でも他のどのお茶とも少し違い、その違いこそがポイントです。" },
        { t: "h2", s: "丸ごとの緑茶を、粉末に" },
        { t: "p", s: "抹茶は、日光を遮って育てた緑茶の葉を乾燥させ、細かい粉末に挽いて作ります。葉を浸出させて捨てるのではなく、粉末を湯に点てて葉を丸ごと飲みます。抹茶が風味も成分も濃いのはそのためです。" },
        { t: "art", kind: "leaf", caption: "浸出液だけでなく、葉を丸ごと飲む。" },
        { t: "h2", s: "カフェインはどれくらい？" },
        { t: "p", s: "抹茶1杯のカフェインは**約60〜70mg**で、コーヒー1杯より少し少なく、ふつうに浸出させた緑茶より多めです。さらに、抹茶にあの穏やかで安定したエネルギーを与えるアミノ酸**L-テアニン**も含みます。" },
        { t: "ul", items: [
          "**茶道用（セレモニアル）：**より明るくまろやかで、水だけで飲むためのもの。",
          "**料理用（クリナリー）：**より濃く苦め、ラテや焼き菓子向け。",
          "**風味：**青々しくほのかに甘く、うま味と呼ばれるコクがある。" ] },
        { t: "callout", s: "どう飲んでも、抹茶はその日のカフェインに加わります。Caffyには抹茶が内蔵されているので、1杯をワンタップで記録し、1日の合計を正確に保てます。" },
      ] },
    { title: "L-テアニン：抹茶の穏やかな集中を支えるアミノ酸",
      excerpt: "L-テアニンは、お茶をコーヒーより穏やかに感じさせる成分です。カフェインと組み合わさると、集中を高めつつ神経過敏をやわらげます。",
      sourceLabels: ["NIH / PMC — L-テアニンと精神状態", "Harvard T.H. Chan — The Nutrition Source：お茶"],
      body: [
        { t: "p", s: "抹茶や緑茶で、覚めているのに高ぶらない感じがするなら、それはL-テアニンが働いているのを感じているのです。" },
        { t: "h2", s: "L-テアニンの働き" },
        { t: "p", s: "L-テアニンは、ほぼお茶にしか含まれないアミノ酸です。それ自体は、眠気を起こさずに**穏やかでリラックスした覚醒**を促します。研究では、ストレスの低下や注意力の向上と関連づけられています。" },
        { t: "art", kind: "moon", caption: "覚めている、でも高ぶらず穏やか。" },
        { t: "h2", s: "なぜカフェインと相性が良いのか" },
        { t: "p", s: "カフェインとL-テアニンはチームとして働きます。カフェインが覚醒を高め、L-テアニンがその角を丸めるので、二つ合わさるとカフェイン単独より**神経過敏が少なく安定した集中**になりやすいのです。抹茶1杯が濃いコーヒーよりすっきり感じられるのは、この組み合わせのおかげです。" },
        { t: "ul", items: [
          "**お茶の中では：**抹茶が最も多く、次いで他の緑茶や紅茶。",
          "**カフェインと一緒に：**この組み合わせが古典的な「穏やかな集中」を生む。",
          "**鎮静剤ではない：**眠くさせずに心をほぐす。" ] },
        { t: "callout", s: "L-テアニンはカフェインの感じ方を変えますが、摂った量は変えません。Caffyは抹茶やコーヒーのカフェインを追跡し、1日の合計を正直に保ちます。" },
      ] },
    { title: "抹茶の健康効果：エビデンスが実際に示すこと",
      excerpt: "抹茶は抗酸化物質とL-テアニンが豊富で、研究は有望です。ただし、確かな知見と誇張を切り分ける価値があります。",
      sourceLabels: ["NCCIH（NIH）— 緑茶", "Harvard T.H. Chan — The Nutrition Source：お茶"],
      body: [
        { t: "p", s: "抹茶はスーパーフードと呼ばれ、確かに本当の強みがあります。ただし正直なところは「有望だが証明済みではない」で、信じ込む前に知っておく価値があります。" },
        { t: "h2", s: "よく裏づけられていること" },
        { t: "p", s: "葉を丸ごと飲むため、抹茶はEGCGを含む抗酸化物質のグループ**カテキン**が特に豊富です。緑茶のカテキンは**コレステロール**の緩やかな改善と関連づけられ、含まれる**L-テアニン**は落ち着きと集中についてまずまずのエビデンスがあります。" },
        { t: "art", kind: "heart", caption: "本当の強み、しかし正直な限界とともに。" },
        { t: "h2", s: "主張が科学を追い越すところ" },
        { t: "p", s: "大幅な減量や病気の予防といった大きな主張は、まだ決着していません。NIHのような保健機関は、エビデンスがまだ入り混じっていると述べています。抹茶は本当に健康的な飲み物ですが、万能薬ではありません。" },
        { t: "ul", items: [
          "**抗酸化物質：**葉を丸ごと飲むため、カテキンが豊富。",
          "**穏やかな集中：**L-テアニンとカフェインの組み合わせが最も裏づけがある。",
          "**注意：**それでもカフェインを含むので、1日の上限は変わらず適用される。" ] },
        { t: "callout", s: "抹茶を健康的に楽しむコツは、カフェインに目を配ることです。Caffyは各杯を記録し、1日の合計をあなたの個人的な上限内に保ちます。" },
      ] },
    { title: "自宅での抹茶の点て方（と良い抹茶の選び方）",
      excerpt: "分量と茶筅を知れば、良い抹茶は簡単に点てられます。シンプルな手順と、苦くない粉末の選び方を紹介します。",
      sourceLabels: ["Harvard T.H. Chan — The Nutrition Source：お茶", "CSPI — カフェイン一覧"],
      body: [
        { t: "p", s: "悪い抹茶は苦くてダマになります。良い抹茶はなめらかで自然にほんのり甘く、その違いはほとんど運ではなく、技術と品質です。" },
        { t: "h2", s: "シンプルな手順" },
        { t: "ul", items: [
          "ダマを取るため、抹茶を小さじ1〜2杯、器に**ふるい入れる。**",
          "70〜80℃の湯を約60ml**注ぐ。**熱湯は苦くします。",
          "竹の茶筅でジグザグに、泡立つまで**手早く点てる。**",
          "**ラテにするなら：**あとからスチームミルクを上に加える。" ] },
        { t: "art", kind: "mug", caption: "熱湯ではなく、泡立つまで点てる。" },
        { t: "h2", s: "良い抹茶の選び方" },
        { t: "p", s: "鮮度の目印である**鮮やかな緑**の色と、宇治のような日本産を選びましょう。**茶道用**は水で飲むのに最適で、**料理用**はより安く、ミルクが苦味を隠すラテには十分です。" },
        { t: "callout", s: "抹茶1杯はおよそ60〜70mgのカフェインです。Caffyに内蔵されているので、朝の一服が自動的に1日の合計に加わります。" },
      ] },
  ],
};

function build(locale: LocaleCode): Post[] {
  const c = CONTENT[locale] ?? CONTENT.en;
  return SHARED.map((m, i) => ({
    slug: m.slug,
    date: m.date,
    readMins: m.readMins,
    cover: m.cover,
    title: c[i].title,
    excerpt: c[i].excerpt,
    body: c[i].body,
    sources: m.urls.map((url, j) => ({ url, label: c[i].sourceLabels[j] })),
  })).sort((a, b) => b.date.localeCompare(a.date));
}

export const getPosts = (locale: LocaleCode): Post[] => build(locale);
export const getPost = (locale: LocaleCode, slug: string): Post | undefined =>
  build(locale).find((p) => p.slug === slug);
