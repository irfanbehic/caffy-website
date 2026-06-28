// Real cropped app UI for each feature — far more convincing than mocked cards.
// Crops live in /public/screens/feat-*.jpg.

function ShotCard({ src, padTop = false }: { src: string; padTop?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-night-line bg-night shadow-lift ring-1 ring-black/5 ${
        padTop ? "pt-6" : ""
      }`}
    >
      <img src={`./screens/${src}`} alt="" loading="lazy" className="block w-full" />
      {/* fade the bottom edge into the card so the crop never looks cut off */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}

export const RealtimeVisual = () => <ShotCard src="feat-realtime.jpg" padTop />;
export const SleepVisual = () => <ShotCard src="feat-sleep.jpg" padTop />;
export const DetoxVisual = () => <ShotCard src="feat-detox.jpg" />;
export const InsightsVisual = () => <ShotCard src="feat-insights.jpg" />;
export const WidgetsVisual = () => <ShotCard src="feat-widgets.jpg" padTop />;
