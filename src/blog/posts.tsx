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
  }));
}

export const getPosts = (locale: LocaleCode): Post[] => build(locale);
export const getPost = (locale: LocaleCode, slug: string): Post | undefined =>
  build(locale).find((p) => p.slug === slug);
