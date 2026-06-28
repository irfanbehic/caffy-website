import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { useI18n } from "../i18n";
import { Reveal } from "./ui";
import { Bed } from "./icons";
import {
  PRESETS,
  PROFILES,
  buildCurve,
  totalAt,
  peakOf,
  verdictFor,
  clockLabel,
  DOMAIN_START,
  DOMAIN_END,
  type Drink,
} from "../lib/caffeine";

const MAX_DRINKS = 6;

// Compact SVG geometry
const VB_W = 760;
const VB_H = 184;
const PAD = { l: 10, r: 10, t: 28, b: 24 };
const PLOT_W = VB_W - PAD.l - PAD.r;
const PLOT_H = VB_H - PAD.t - PAD.b;

const xOf = (t: number) =>
  PAD.l + ((t - DOMAIN_START) / (DOMAIN_END - DOMAIN_START)) * PLOT_W;
const timeFromX = (x: number) =>
  DOMAIN_START + ((x - PAD.l) / PLOT_W) * (DOMAIN_END - DOMAIN_START);
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

let idSeq = 0;
const newId = () => `d${idSeq++}`;
const seed = (): Drink[] => {
  idSeq = 0;
  return [
    { id: newId(), kind: "coffee", mg: 95, at: 8 },
    { id: newId(), kind: "espresso", mg: 63, at: 13.5 },
    { id: newId(), kind: "matcha", mg: 70, at: 16 },
  ];
};

export function Calculator() {
  const { t } = useI18n();
  const [drinks, setDrinks] = useState<Drink[]>(seed);
  const [profileKey, setProfileKey] = useState("average");
  const [bedtime, setBedtime] = useState(23);

  const targetHalf = PROFILES.find((p) => p.key === profileKey)!.halfLife;
  const [half, setHalf] = useState(targetHalf);
  const [maxY, setMaxY] = useState(160);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<string | null>(null);
  // Per-drink weight (0→1) so a newly added drink grows into the curve
  // smoothly instead of snapping in. Missing id ⇒ fully grown (weight 1).
  const weightsRef = useRef<Map<string, number>>(new Map());
  const [, setTick] = useState(0);
  const tick = () => setTick((n) => n + 1);
  const weightOf = (id: string) => weightsRef.current.get(id) ?? 1;

  // smooth half-life morph on profile change
  useEffect(() => {
    const controls = animate(half, targetHalf, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setHalf(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetHalf]);

  // weighted drinks drive every readout, the curve and the markers
  const effective = drinks.map((d) => ({ ...d, mg: d.mg * weightOf(d.id) }));

  const curve = buildCurve(effective, half);
  const peak = peakOf(curve);
  // Target the y-axis to the full-weight peak, then EASE the axis toward it so
  // adding a drink grows the curve and the axis together — no snap, no rescale
  // glitch, and the existing curve never compresses.
  const axisPeak = peakOf(buildCurve(drinks, half));
  const targetMaxY = Math.max(150, Math.ceil((axisPeak * 1.18) / 20) * 20);
  useEffect(() => {
    const c = animate(maxY, targetMaxY, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setMaxY(v),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMaxY]);
  const yOf = (mg: number) => PAD.t + (1 - mg / maxY) * PLOT_H;

  const atBed = totalAt(effective, bedtime, half);
  const nowVal = totalAt(effective, 18, half); // demo "now" = 18:00
  const verdict = verdictFor(atBed);
  const vColor =
    verdict === "safe" ? "#00C48C" : verdict === "caution" ? "#FFB800" : "#FF4757";
  const vText =
    verdict === "safe"
      ? t.calc.verdictSafe
      : verdict === "caution"
      ? t.calc.verdictCaution
      : t.calc.verdictPoor;

  const linePath = curve
    .map((p, i) => `${i ? "L" : "M"}${xOf(p.t).toFixed(1)} ${yOf(p.mg).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${xOf(DOMAIN_END).toFixed(1)} ${yOf(0)} L${xOf(
    DOMAIN_START
  ).toFixed(1)} ${yOf(0)} Z`;

  // dragging via pointer capture (reliable on touch + mouse)
  const onDown = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = id;
  };
  const onDrag = (e: React.PointerEvent) => {
    if (!dragRef.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xv = ((e.clientX - rect.left) / rect.width) * VB_W;
    const tHour = clamp(timeFromX(xv), DOMAIN_START, DOMAIN_END);
    if (dragRef.current === "bedtime") {
      setBedtime(Math.round(tHour * 2) / 2);
    } else {
      const id = dragRef.current;
      setDrinks((ds) =>
        ds.map((d) => (d.id === id ? { ...d, at: Math.round(tHour * 4) / 4 } : d))
      );
    }
  };
  const onUp = () => (dragRef.current = null);

  const addDrink = (kind: string, mg: number) => {
    if (drinks.length >= MAX_DRINKS) return;
    const id = newId();
    weightsRef.current.set(id, 0);
    setDrinks((ds) => [
      ...ds,
      { id, kind, mg, at: clamp(15 + (ds.length % 4) * 0.7, 6, 20) },
    ]);
    animate(0, 1, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        weightsRef.current.set(id, v);
        tick();
      },
    });
  };
  const atMax = drinks.length >= MAX_DRINKS;
  const removeDrink = (id: string) => {
    animate(weightOf(id), 0, {
      duration: 0.35,
      ease: "easeIn",
      onUpdate: (v) => {
        weightsRef.current.set(id, v);
        tick();
      },
      onComplete: () => {
        weightsRef.current.delete(id);
        setDrinks((ds) => ds.filter((d) => d.id !== id));
      },
    });
  };
  const reset = () => {
    weightsRef.current.clear();
    setDrinks(seed());
    setProfileKey("average");
    setBedtime(23);
  };

  const iconFor = (kind: string) =>
    PRESETS.find((p) => p.kind === kind)?.icon ?? "drip_coffee.png";
  const hourTicks = [8, 12, 16, 20, 24, 28];

  return (
    <section id="calculator" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.calc.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-[42px]">
              {t.calc.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              {t.calc.subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="surface-card mt-8 p-4 sm:p-6">
            {/* big live number (Apple-Health style) + quiet secondary stats */}
            <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {t.calc.now}
                </p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[40px] font-bold leading-none tabular-nums sm:text-[48px]">
                    <AnimatedNumber value={nowVal} />
                  </span>
                  <span className="text-[15px] font-medium text-faint">{t.calc.mg}</span>
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: vColor }} />
                  <p className="text-[12.5px] leading-snug text-muted">{vText}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <MiniStat label={t.calc.peak} value={peak} unit={t.calc.mg} />
                <MiniStat label={t.calc.atBedtime} value={atBed} unit={t.calc.mg} color={vColor} />
              </div>
            </div>

            {/* chart */}
            <div className="mt-4">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full touch-none"
                style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
                onPointerMove={onDrag}
                onPointerUp={onUp}
                onPointerLeave={onUp}
              >
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6600" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* faint horizontal gridlines + right-aligned mg labels */}
                {[0, 0.5, 1].map((f) => {
                  const mg = maxY * f;
                  const y = yOf(mg);
                  return (
                    <g key={f}>
                      <line
                        x1={PAD.l}
                        y1={y}
                        x2={VB_W - PAD.r}
                        y2={y}
                        className="stroke-paper-line dark:stroke-night-line"
                        strokeWidth={f === 0 ? 1 : 0.6}
                        opacity={f === 0 ? 1 : 0.6}
                      />
                      {f > 0 && (
                        <text
                          x={VB_W - PAD.r}
                          y={y - 3}
                          textAnchor="end"
                          className="fill-ink-faint text-[8px]"
                        >
                          {Math.round(mg)}
                        </text>
                      )}
                    </g>
                  );
                })}
                {hourTicks.map((h) => (
                  <text
                    key={h}
                    x={xOf(h)}
                    y={VB_H - 8}
                    textAnchor="middle"
                    className="fill-ink-faint text-[9px]"
                  >
                    {clockLabel(h)}
                  </text>
                ))}

                <motion.path
                  d={areaPath}
                  fill="url(#area)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                />
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#FF6600"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* bedtime */}
                <line
                  x1={xOf(bedtime)}
                  y1={PAD.t - 2}
                  x2={xOf(bedtime)}
                  y2={yOf(0)}
                  stroke={vColor}
                  strokeWidth={1.4}
                  strokeDasharray="4 4"
                />
                {/* pulsing halo */}
                <motion.circle
                  cx={xOf(bedtime)}
                  cy={yOf(atBed)}
                  fill={vColor}
                  initial={{ r: 4, opacity: 0.45 }}
                  animate={{ r: 12, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <circle cx={xOf(bedtime)} cy={yOf(atBed)} r={4.5} fill={vColor} />
                <g
                  transform={`translate(${xOf(bedtime)}, ${PAD.t - 14})`}
                  className="cursor-ew-resize"
                  onPointerDown={onDown("bedtime")}
                  onPointerMove={onDrag}
                  onPointerUp={onUp}
                >
                  <rect x={-16} y={-14} width={32} height={28} fill="transparent" />
                  <rect x={-13} y={-10} width={26} height={20} rx={7} fill={vColor} />
                  <g transform="translate(-7,-7) scale(0.62)" stroke="#fff" fill="none">
                    <Bed />
                  </g>
                </g>

                {/* drink markers */}
                {drinks.map((d) => (
                  <g key={d.id}>
                    <line
                      x1={xOf(d.at)}
                      y1={yOf(0)}
                      x2={xOf(d.at)}
                      y2={yOf(totalAt(effective, d.at, half))}
                      className="stroke-ink-faint/30"
                      strokeWidth={1}
                    />
                    <g
                      transform={`translate(${xOf(d.at)}, ${yOf(0) - 16})`}
                      className="cursor-grab active:cursor-grabbing"
                      onPointerDown={onDown(d.id)}
                      onPointerMove={onDrag}
                      onPointerUp={onUp}
                    >
                      <circle r={18} fill="transparent" />
                      <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 480, damping: 26 }}
                      >
                        <circle
                          r={13}
                          className="fill-paper-surface stroke-paper-line dark:fill-night-surface dark:stroke-night-line"
                          strokeWidth={1.5}
                        />
                        <image
                          href={`./icons/${iconFor(d.kind)}`}
                          x={-9.5}
                          y={-9.5}
                          width={19}
                          height={19}
                          style={{ pointerEvents: "none" }}
                        />
                      </motion.g>
                    </g>
                  </g>
                ))}
              </svg>
            </div>

            {/* controls */}
            <div className="mt-5 grid gap-5 border-t border-paper-line pt-5 lg:grid-cols-2 dark:border-night-line">
              {/* left: add + remove drinks */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {t.calc.addLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.kind}
                      onClick={() => addDrink(p.kind, p.mg)}
                      disabled={atMax}
                      className="flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-surface py-1 pl-1 pr-2.5 text-[13px] font-medium transition-all enabled:hover:-translate-y-0.5 enabled:hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-night-line dark:bg-night-surface"
                    >
                      <img src={`./icons/${p.icon}`} alt="" className="h-5 w-5" />
                      {t.calc.drinks[p.kind as keyof typeof t.calc.drinks]}
                      <span className="text-faint">{p.mg}</span>
                    </button>
                  ))}
                </div>

                {/* added drinks — tap × to remove */}
                {drinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-faint">
                      {t.calc.added}
                    </span>
                    {drinks.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => removeDrink(d.id)}
                        className="group flex items-center gap-1 rounded-full bg-black/[0.05] py-0.5 pl-0.5 pr-2 text-[12px] text-muted transition-colors hover:bg-caffeine-red/10 hover:text-caffeine-red dark:bg-white/[0.06]"
                        title={t.calc.remove}
                      >
                        <img src={`./icons/${iconFor(d.kind)}`} alt="" className="h-4 w-4" />
                        <span className="tabular-nums">{clockLabel(d.at)}</span>
                        <span className="text-[14px] leading-none opacity-60 group-hover:opacity-100">×</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* right: metabolism + bedtime */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {t.calc.profileLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PROFILES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setProfileKey(p.key)}
                      className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all ${
                        profileKey === p.key
                          ? "border-accent bg-accent text-white"
                          : "border-paper-line bg-paper-surface hover:border-accent/40 dark:border-night-line dark:bg-night-surface"
                      }`}
                    >
                      {t.calc.profiles[p.key]}
                      <span className={profileKey === p.key ? "ml-1 opacity-80" : "ml-1 text-faint"}>
                        {p.halfLife}h
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1.5 text-[13px] text-muted">
                      <Bed className="h-4 w-4" /> {t.calc.bedtimeLabel}
                    </span>
                    <div className="flex items-center gap-1 rounded-full border border-paper-line p-0.5 dark:border-night-line">
                      <button
                        onClick={() => setBedtime((b) => clamp(b - 0.5, 19, 28))}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[16px] leading-none text-muted hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
                        aria-label="-30 min"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-[13px] font-semibold tabular-nums">
                        {clockLabel(bedtime)}
                      </span>
                      <button
                        onClick={() => setBedtime((b) => clamp(b + 0.5, 19, 28))}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[16px] leading-none text-muted hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
                        aria-label="+30 min"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={reset}
                    className="text-[13px] font-medium text-faint underline-offset-4 hover:text-accent hover:underline"
                  >
                    {t.calc.reset}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-faint">{t.calc.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Smoothly counts up/down to the target value. */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{Math.round(display)}</>;
}

function MiniStat({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-faint">
        {label}
      </p>
      <p
        className="mt-1 flex items-baseline gap-1 text-[20px] font-bold leading-none tabular-nums"
        style={color ? { color } : undefined}
      >
        <AnimatedNumber value={value} />
        <span className="text-[11px] font-medium text-faint">{unit}</span>
      </p>
    </div>
  );
}
