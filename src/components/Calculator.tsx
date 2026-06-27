import { useEffect, useMemo, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../i18n";
import { Reveal } from "./ui";
import { Plus, Bed, Activity } from "./icons";
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
const VB_H = 170;
const PAD = { l: 10, r: 10, t: 14, b: 24 };
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
  // Scale the y-axis to the FULL-weight peak so it stays fixed while a freshly
  // added drink grows in — otherwise the whole curve visibly rescales mid-add.
  const axisPeak = peakOf(buildCurve(drinks, half));
  const maxY = Math.max(150, Math.ceil((axisPeak * 1.18) / 20) * 20);
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
          <div className="surface-card mt-8 overflow-hidden p-4 sm:p-6">
            {/* readouts — fixed 3-col grid so changing digits never reflow the row */}
            <div className="grid grid-cols-3 gap-2">
              <Readout label={t.calc.now} value={nowVal} unit={t.calc.mg} />
              <Readout label={t.calc.peak} value={peak} unit={t.calc.mg} />
              <Readout label={t.calc.atBedtime} value={atBed} unit={t.calc.mg} color={vColor} />
            </div>
            {/* verdict — its own row with reserved height so text length can't jump it */}
            <div
              className="mt-2 flex min-h-[42px] items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: `${vColor}14` }}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: vColor }}
              >
                <Bed className="h-3 w-3 text-white" />
              </span>
              <p className="text-[12.5px] font-medium leading-snug" style={{ color: vColor }}>
                {vText}
              </p>
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
                    <stop offset="0%" stopColor="#FF6600" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <line
                  x1={PAD.l}
                  y1={yOf(0)}
                  x2={VB_W - PAD.r}
                  y2={yOf(0)}
                  className="stroke-paper-line dark:stroke-night-line"
                  strokeWidth={1}
                />
                {hourTicks.map((h) => (
                  <text
                    key={h}
                    x={xOf(h)}
                    y={VB_H - 9}
                    textAnchor="middle"
                    className="fill-ink-faint text-[13px]"
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
                  strokeWidth={2.5}
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
                  y1={PAD.t - 4}
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
                  transform={`translate(${xOf(bedtime)}, ${PAD.t - 10})`}
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
            <div className="mt-4 grid gap-4 border-t border-paper-line pt-4 lg:grid-cols-2 dark:border-night-line">
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-faint">
                  <Plus className="h-3.5 w-3.5" /> {t.calc.addLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.kind}
                      onClick={() => addDrink(p.kind, p.mg)}
                      disabled={atMax}
                      className="group flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-surface py-1 pl-1 pr-2.5 text-[12.5px] font-medium transition-all enabled:hover:-translate-y-0.5 enabled:hover:border-accent/40 enabled:hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-40 dark:border-night-line dark:bg-night-surface"
                    >
                      <img src={`./icons/${p.icon}`} alt="" className="h-5 w-5" />
                      <span>{t.calc.drinks[p.kind as keyof typeof t.calc.drinks]}</span>
                      <span className="text-faint">{p.mg}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {drinks.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2.5 flex flex-wrap gap-1.5"
                    >
                      {drinks.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => removeDrink(d.id)}
                          className="flex items-center gap-1 rounded-full bg-black/[0.04] px-2 py-0.5 text-[11.5px] text-muted hover:bg-caffeine-red/10 hover:text-caffeine-red dark:bg-white/[0.05]"
                        >
                          {clockLabel(d.at)}·{d.mg}
                          <span className="text-[13px] leading-none">×</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-faint">
                  <Activity className="h-3.5 w-3.5" /> {t.calc.profileLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PROFILES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setProfileKey(p.key)}
                      className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                        profileKey === p.key
                          ? "border-accent bg-accent text-white shadow-soft"
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
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-[12.5px] text-muted">
                    <Bed className="h-3.5 w-3.5" /> {t.calc.bedtimeLabel}
                    <span className="font-semibold tabular-nums text-ink dark:text-white">
                      {clockLabel(bedtime)}
                    </span>
                  </span>
                  <button
                    onClick={reset}
                    className="text-[12.5px] font-medium text-faint underline-offset-4 hover:text-accent hover:underline"
                  >
                    {t.calc.reset}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-[12px] leading-relaxed text-faint">{t.calc.note}</p>
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

function Readout({
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
    <div className="flex flex-col justify-center overflow-hidden rounded-xl border border-paper-line bg-paper-card px-2.5 py-1.5 dark:border-night-line dark:bg-night-card">
      <p className="truncate text-[9.5px] font-semibold uppercase tracking-wider text-faint">
        {label}
      </p>
      <p
        className="mt-0.5 flex items-baseline text-[19px] font-bold leading-none sm:text-[21px]"
        style={color ? { color } : undefined}
      >
        {/* fixed-width number box so adding a digit never shifts the unit */}
        <span className="inline-block min-w-[3ch] text-right tabular-nums">
          <AnimatedNumber value={value} />
        </span>
        <span className="ml-0.5 text-[11px] font-medium text-faint">{unit}</span>
      </p>
    </div>
  );
}
