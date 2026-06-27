import { useI18n } from "../i18n";

function Ring({ pct, value, color }: { pct: number; value: string; color: string }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[112px] w-[112px] shrink-0">
      <svg viewBox="0 0 112 112" className="-rotate-90">
        <circle cx="56" cy="56" r={r} className="stroke-black/[0.06] dark:stroke-white/[0.08]" strokeWidth="9" fill="none" />
        <circle cx="56" cy="56" r={r} stroke={color} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[26px] font-bold leading-none">{value}</span>
      </div>
    </div>
  );
}

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="surface-card relative w-full overflow-hidden p-6">{children}</div>
);

export function RealtimeVisual() {
  return (
    <Shell>
      <div className="flex items-center gap-5">
        <Ring pct={68} value="128" color="#FF6600" />
        <div className="flex-1 space-y-3">
          {[
            { i: "drip_coffee.png", t: "08:15", w: 95, mg: 95 },
            { i: "espresso.png", t: "13:40", w: 62, mg: 63 },
            { i: "matcha.png", t: "16:05", w: 70, mg: 70 },
          ].map((d) => (
            <div key={d.i} className="flex items-center gap-2.5">
              <img src={`./icons/${d.i}`} alt="" className="h-6 w-6" />
              <span className="w-10 text-[11px] tabular-nums text-faint">{d.t}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
                <div className="h-full rounded-full bg-accent" style={{ width: `${d.w}%` }} />
              </div>
              <span className="w-9 text-right text-[11.5px] font-semibold tabular-nums">{d.mg}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function SleepVisual() {
  const { t } = useI18n();
  return (
    <Shell>
      <div className="flex items-center gap-5">
        <Ring pct={64} value="64" color="#00B4D8" />
        <div className="flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">
            {t.viz.sleepScore}
          </p>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-caffeine-yellow/10 px-3.5 py-2.5">
            <span className="text-[12.5px] text-muted">{t.calc.atBedtime}</span>
            <span className="text-[14px] font-bold text-caffeine-yellow tabular-nums">42 mg</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
            <div className="h-full w-[42%] rounded-full bg-caffeine-yellow" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function DetoxVisual() {
  const { t } = useI18n();
  const bars = [100, 88, 74, 60, 46, 32, 22];
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">{t.viz.stepDown}</p>
        <span className="rounded-full bg-detox/15 px-2.5 py-1 text-[11px] font-bold text-detox">
          −80%
        </span>
      </div>
      <div className="mt-5 flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div
              className="w-full rounded-md bg-detox"
              style={{ height: `${h}%`, opacity: 0.4 + i * 0.085 }}
            />
            <span className="text-[9px] text-faint">{i + 1}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function InsightsVisual() {
  const { t } = useI18n();
  return (
    <Shell>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M12 2l2.2 6L20 10l-5.8 2L12 18l-2.2-6L4 10l5.8-2L12 2z" />
          </svg>
        </span>
        <p className="text-[13px] font-semibold">{t.viz.weeklyInsight}</p>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{t.viz.insightLine}</p>
      <svg viewBox="0 0 240 46" className="mt-4 w-full">
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6600" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,36 L30,30 L60,33 L90,18 L120,24 L150,11 L180,20 L210,8 L240,14 L240,46 L0,46 Z" fill="url(#spark)" />
        <polyline points="0,36 30,30 60,33 90,18 120,24 150,11 180,20 210,8 240,14" fill="none" stroke="#FF6600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Shell>
  );
}

export function WidgetsVisual() {
  const { t } = useI18n();
  return (
    <Shell>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-night to-[#1a1a1f] p-4 text-white">
          <p className="text-[10.5px] text-white/50">{t.viz.activeNow}</p>
          <p className="mt-1 text-[26px] font-bold leading-none tabular-nums">
            128<span className="text-[12px] font-medium text-white/50"> mg</span>
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-accent" />
          </div>
        </div>
        <div className="rounded-2xl border border-paper-line p-4 dark:border-night-line">
          <p className="text-[10.5px] text-faint">{t.viz.untilSafe}</p>
          <p className="mt-1 text-[26px] font-bold leading-none tabular-nums">3h 10m</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
            <div className="h-full w-1/2 rounded-full bg-caffeine-green" />
          </div>
        </div>
        <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-paper-line p-3 dark:border-night-line">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-caffeine-red/15 text-caffeine-red">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5.5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z" />
            </svg>
          </span>
          <p className="text-[12.5px] text-muted">{t.viz.health}</p>
        </div>
      </div>
    </Shell>
  );
}
