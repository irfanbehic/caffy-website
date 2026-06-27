// Bespoke mini-UI mocks for each feature row — keeps the page from looking
// like repeated stock cards.

function Ring({ pct, value, sub, color }: { pct: number; value: string; sub: string; color: string }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[118px] w-[118px]">
      <svg viewBox="0 0 118 118" className="-rotate-90">
        <circle cx="59" cy="59" r={r} className="stroke-paper-line dark:stroke-night-line" strokeWidth="10" fill="none" />
        <circle cx="59" cy="59" r={r} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[24px] font-bold leading-none">{value}</span>
        <span className="text-[10px] text-faint">{sub}</span>
      </div>
    </div>
  );
}

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="surface-card relative w-full overflow-hidden p-6">
    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/5 blur-2xl" />
    {children}
  </div>
);

export function RealtimeVisual() {
  return (
    <Shell>
      <div className="flex items-center gap-5">
        <Ring pct={68} value="128" sub="mg active" color="#FF6600" />
        <div className="flex-1 space-y-2.5">
          {[["08:15", "Coffee", "95", 90], ["13:40", "Espresso", "63", 60], ["16:05", "Matcha", "70", 66]].map(
            ([time, name, mg, w]) => (
              <div key={name as string} className="flex items-center gap-2">
                <span className="w-10 text-[11px] text-faint">{time}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.05] dark:bg-white/[0.06]">
                  <div className="h-full rounded-full bg-accent/70" style={{ width: `${w}%` }} />
                </div>
                <span className="w-8 text-right text-[11px] font-semibold">{mg}</span>
              </div>
            )
          )}
        </div>
      </div>
    </Shell>
  );
}

export function SleepVisual() {
  return (
    <Shell>
      <div className="flex items-center gap-5">
        <Ring pct={42} value="64" sub="sleep score" color="#00B4D8" />
        <div className="flex-1">
          <div className="rounded-2xl border border-caffeine-yellow/30 bg-caffeine-yellow/10 px-4 py-3">
            <p className="text-[12px] font-semibold text-caffeine-yellow">Heads up</p>
            <p className="mt-1 text-[12.5px] text-muted">
              42 mg will still be active at 23:00. That last espresso could cost you deep sleep.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function DetoxVisual() {
  const bars = [100, 86, 72, 58, 44, 30, 20];
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">7-day step-down</p>
        <span className="rounded-full bg-detox/15 px-2.5 py-1 text-[11px] font-semibold text-detox">
          −80%
        </span>
      </div>
      <div className="mt-5 flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className="w-full rounded-md"
              style={{ height: `${h}%`, background: `linear-gradient(180deg,#A78BFA,#8B5CF6)`, opacity: 0.45 + i * 0.07 }}
            />
            <span className="text-[9px] text-faint">D{i + 1}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function InsightsVisual() {
  return (
    <Shell>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">✦</span>
        <p className="text-[13px] font-semibold">Weekly insight</p>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
        Your caffeine peaks at <span className="font-semibold text-ink dark:text-white">2:40 PM</span> — and
        on days you drink after 4 PM, your sleep score drops <span className="font-semibold text-caffeine-red">23%</span>.
      </p>
      <svg viewBox="0 0 240 48" className="mt-4 w-full">
        <polyline
          points="0,38 30,30 60,34 90,18 120,24 150,10 180,20 210,8 240,14"
          fill="none"
          stroke="#FF6600"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Shell>
  );
}

export function WidgetsVisual() {
  return (
    <Shell>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-night to-[#1a1a1f] p-4 text-white">
          <p className="text-[10px] text-white/50">Active now</p>
          <p className="mt-1 text-[26px] font-bold leading-none">128<span className="text-[12px] font-medium text-white/50"> mg</span></p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-accent" />
          </div>
        </div>
        <div className="rounded-2xl border border-paper-line p-4 dark:border-night-line">
          <p className="text-[10px] text-faint">Until bedtime-safe</p>
          <p className="mt-1 text-[26px] font-bold leading-none">3h 10m</p>
          <p className="mt-3 text-[11px] text-caffeine-green">On track for great sleep</p>
        </div>
        <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-paper-line p-3 dark:border-night-line">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-caffeine-red/15 text-caffeine-red">♥</span>
          <p className="text-[12px] text-muted">Synced with Apple Health</p>
        </div>
      </div>
    </Shell>
  );
}
