import MagneticHeader from './hero/MagneticHeader';
import VisualShowcase from './hero/VisualShowcase';
import FeatureStrip from './hero/FeatureStrip';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blush to-white px-4 sm:px-8 relative overflow-hidden">
      <MagneticHeader />
      <VisualShowcase />
      <FeatureStrip />
    </section>
  );
}
