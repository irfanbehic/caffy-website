import { useState, type ReactNode } from "react";

/**
 * Realistic iPhone 15 Pro frame.
 *
 * Corner radii & bezel use container-query width units (`cqw`) so every corner
 * has the SAME radius in px regardless of the phone's rendered size — no more
 * stretched/elliptical corners (which is what `%` radii produce on a tall box).
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
    <div
      className={`relative aspect-[1290/2796] w-full select-none [container-type:inline-size] ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[1.5%] top-[16%] h-[4.5%] w-[1.6%] rounded-l-[2px] bg-[#202126]" />
      <span className="absolute -left-[1.5%] top-[25%] h-[8%] w-[1.6%] rounded-l-[2px] bg-[#202126]" />
      <span className="absolute -left-[1.5%] top-[36%] h-[8%] w-[1.6%] rounded-l-[2px] bg-[#202126]" />
      <span className="absolute -right-[1.5%] top-[24%] h-[11%] w-[1.6%] rounded-r-[2px] bg-[#202126]" />

      {/* titanium rail */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#48494f] via-[#2c2d32] to-[#191a1e] shadow-[0_30px_70px_-26px_rgba(8,8,12,0.6)] [border-radius:15cqw] [padding:2.4cqw]">
        {/* black bezel */}
        <div className="h-full w-full bg-black [border-radius:12.6cqw] [padding:2.4cqw]">
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden bg-night [border-radius:10.2cqw]">
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
                <div className="absolute left-1/2 top-[2.4%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Rendered in-app fallback — shown only if a screenshot file is missing. */
export function DashboardFallback() {
  const pct = 64;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-night to-[#050507] px-5 pt-[20%] text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white/50">Caffy</p>
          <p className="text-[15px] font-semibold">Today</p>
        </div>
        <img src="/icons/owl.png" className="h-9 w-9 rounded-xl" alt="" />
      </div>
      <div className="relative mx-auto mt-7 h-[130px] w-[130px]">
        <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
          <circle cx="65" cy="65" r={r} stroke="#26262b" strokeWidth="11" fill="none" />
          <circle cx="65" cy="65" r={r} stroke="#FF6600" strokeWidth="11" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] font-bold leading-none">128</span>
          <span className="text-[10px] text-white/50">mg</span>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {[
          { i: "drip_coffee.png", mg: 95 },
          { i: "espresso.png", mg: 63 },
          { i: "matcha.png", mg: 70 },
        ].map((d) => (
          <div key={d.i} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2">
            <img src={`/icons/${d.i}`} className="h-7 w-7" alt="" />
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-accent/70" style={{ width: `${d.mg}%` }} />
            </div>
            <span className="text-[12px] font-semibold text-accent-light">{d.mg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
