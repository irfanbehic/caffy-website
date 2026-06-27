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

// Compact SVG geometry
const VB_W = 760;
const VB_H = 210;
const PAD = { l: 10, r: 10, t: 16, b: 28 };
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

  const curve = useMemo(() => buildCurve(drinks, half), [drinks, half]);
  const peak = peakOf(curve);
  const maxY = Math.max(150, Math.ceil((peak * 1.18) / 20) * 20);
  const yOf = (mg: number) => PAD.t + (1 - mg / maxY) * PLOT_H;

  const atBed = totalAt(drinks, bedtime, half);
  const nowVal = totalAt(drinks, 18, half); // demo "now" = 18:00
  const verdict = verdictFor(atBed);
  const vColor =
    verdict === "safe" ? "#00C48C" : verdict === "caution" ? "#FFB800" : "#FF4757";
  const vText =
    verdict === "safe"
      ? t.calc.verdictSafe
      : verdict === "caution"
      ? t.calc.verdictCaution
      : t.calc.verdictPoor;

  const linePath = useMemo(
    () =>
      curve
        .map((p, i) => `${i ? "L" : "M"}${xOf(p.t).toFixed(1)} ${yOf(p.mg).toFixed(1)}`)
        .join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [curve, maxY]
  );
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

  const addDrink = (kind: string, mg: number) =>
    setDrinks((ds) => [
      ...ds,
      { id: newId(), kind, mg, at: clamp(15 + (ds.length % 4) * 0.7, 6, 20) },
    ]);
  const removeDrink = (id: string) => setDrinks((ds) => ds.filter((d) => d.id !== id));
  const reset = () => {
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
            {/* readouts — compact inline */}
            <div className="flex flex-wrap items-stretch gap-2 sm:gap-3">
              <Readout label={t.calc.now} value={Math.round(nowVal)} unit={t.calc.mg} />
              <Readout label={t.calc.peak} value={Math.round(peak)} unit={t.calc.mg} />
              <Readout
                label={t.calc.atBedtime}
                value={Math.round(atBed)}
                unit={t.calc.mg}
                color={vColor}
              />
              {/* verdict pill fills remaining space */}
              <div
                className="flex min-w-[180px] flex-1 items-center gap-2.5 rounded-2xl px-4 py-2.5"
                style={{ background: `${vColor}14` }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: vColor }}
                >
                  <Bed className="h-3.5 w-3.5 text-white" />
                </span>
                <p className="text-[12.5px] font-medium leading-snug" style={{ color: vColor }}>
                  {vText}
                </p>
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

                <path d={areaPath} fill="url(#area)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#FF6600"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
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
                <circle cx={xOf(bedtime)} cy={yOf(atBed)} r={4.5} fill={vColor} />
                <g
                  transform={`translate(${xOf(bedtime)}, ${PAD.t - 10})`}
                  className="cursor-ew-resize"
                  onPointerDown={onDown("bedtime")}
                  onPointerMove={onDrag}
                  onPointerUp={onUp}
                >
                  {/* big invisible hit area */}
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
                      y2={yOf(totalAt(drinks, d.at, half))}
                      className="stroke-ink-faint/30"
                      strokeWidth={1}
                    />
                    <g
                      transform={`translate(${xOf(d.at)}, ${yOf(0)})`}
                      className="cursor-grab active:cursor-grabbing"
                      onPointerDown={onDown(d.id)}
                      onPointerMove={onDrag}
                      onPointerUp={onUp}
                    >
                      <circle r={18} fill="transparent" />
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
                      className="group flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-surface py-1 pl-1 pr-2.5 text-[12.5px] font-medium transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft dark:border-night-line dark:bg-night-surface"
                    >
                      <img src={`./icons/${p.icon}`} alt="" className="h-5 w-5" />
                      <span className="capitalize">{p.kind}</span>
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
    <div className="flex min-w-[92px] flex-1 flex-col justify-center rounded-2xl border border-paper-line bg-paper-card px-3 py-2 dark:border-night-line dark:bg-night-card sm:min-w-[104px]">
      <p className="text-[10.5px] font-medium uppercase tracking-wider text-faint">
        {label}
      </p>
      <p
        className="mt-0.5 text-[22px] font-bold leading-none tabular-nums sm:text-[26px]"
        style={color ? { color } : undefined}
      >
        {value}
        <span className="ml-0.5 text-[12px] font-medium text-faint">{unit}</span>
      </p>
    </div>
  );
}
