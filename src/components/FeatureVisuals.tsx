// Real cropped app UI for each feature — far more convincing than mocked cards.
// Crops live in /public/screens/feat-*.jpg.

function ShotCard({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-night-line bg-night shadow-lift ring-1 ring-black/5">
      <img
        src={`./screens/${src}`}
        alt=""
        loading="lazy"
        className="w-full"
      />
    </div>
  );
}

export const RealtimeVisual = () => <ShotCard src="feat-realtime.jpg" />;
export const SleepVisual = () => <ShotCard src="feat-sleep.jpg" />;
export const DetoxVisual = () => <ShotCard src="feat-detox.jpg" />;
export const InsightsVisual = () => <ShotCard src="feat-insights.jpg" />;
export const WidgetsVisual = () => <ShotCard src="feat-widgets.jpg" />;
