import { useState, type ReactNode } from "react";

/**
 * Realistic iPhone 15 Pro frame.
 *   - uniform (non-elliptical) corner radii so it never looks skewed
 *   - titanium rail with real side buttons
 *   - when a real screenshot is shown, NO drawn Dynamic Island (the screenshot
 *     already has its own status bar). The island is only drawn for the
 *     rendered fallback screen.
 *   - if `src` is missing OR fails to load, the rendered `children` fallback
 *     is shown, so you never see a broken image.
 */
export function PhoneMock({
  src,
  alt,
  children,
  className = "",
}: {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className={`relative aspect-[1290/2796] w-full select-none ${className}`}>
      {/* side buttons */}
      <div className="absolute -left-[2px] top-[20%] h-[5.5%] w-[3px] rounded-l bg-[#22232a]" />
      <div className="absolute -left-[2px] top-[30%] h-[9%] w-[3px] rounded-l bg-[#22232a]" />
      <div className="absolute -left-[2px] top-[42%] h-[9%] w-[3px] rounded-l bg-[#22232a]" />
      <div className="absolute -right-[2px] top-[26%] h-[13%] w-[3px] rounded-r bg-[#22232a]" />

      {/* titanium frame */}
      <div className="absolute inset-0 rounded-[14.5%] bg-gradient-to-b from-[#43444a] via-[#2b2c31] to-[#1a1b1f] p-[2.4%] shadow-[0_30px_70px_-25px_rgba(10,10,14,0.55)]">
        {/* black bezel */}
        <div className="relative h-full w-full rounded-[12.6%] bg-black p-[2.6%]">
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[10.4%] bg-night">
            {showImage ? (
              <img
                src={src}
                alt={alt ?? ""}
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <>
                {children}
                {/* Dynamic Island (fallback only) */}
                <div className="absolute left-1/2 top-[2.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              </>
            )}
            {/* subtle screen sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-[10.4%] bg-gradient-to-tr from-transparent via-transparent to-white/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A rendered in-app fallback (shown only if a screenshot file is missing). */
export function DashboardFallback() {
  const pct = 64;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-night to-[#050507] px-5 pt-[20%] text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white/50">Good evening</p>
          <p className="text-[15px] font-semibold">Today</p>
        </div>
        <img src="./icons/owl.png" className="h-9 w-9 rounded-xl" alt="" />
      </div>
      <div className="relative mx-auto mt-7 h-[130px] w-[130px]">
        <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
          <circle cx="65" cy="65" r={r} stroke="#26262b" strokeWidth="11" fill="none" />
          <circle cx="65" cy="65" r={r} stroke="#FF6600" strokeWidth="11" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] font-bold leading-none">128</span>
          <span className="text-[10px] text-white/50">mg active</span>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-white/[0.05] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/60">Caffeine at bedtime</span>
          <span className="text-[11px] font-semibold text-caffeine-yellow">42 mg</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-caffeine-yellow" />
        </div>
      </div>
      <p className="mt-5 text-[11px] font-medium text-white/50">Recent</p>
      <div className="mt-2 space-y-2">
        {[
          { i: "drip_coffee.png", n: "Drip Coffee", t: "08:15", mg: "95 mg" },
          { i: "espresso.png", n: "Espresso", t: "13:40", mg: "63 mg" },
          { i: "matcha.png", n: "Matcha", t: "16:05", mg: "70 mg" },
        ].map((d) => (
          <div key={d.n} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2">
            <img src={`./icons/${d.i}`} className="h-7 w-7" alt="" />
            <div className="flex-1">
              <p className="text-[12px] font-medium">{d.n}</p>
              <p className="text-[10px] text-white/45">{d.t}</p>
            </div>
            <span className="text-[12px] font-semibold text-accent-light">{d.mg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
