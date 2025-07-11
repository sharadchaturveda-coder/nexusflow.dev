import MagneticHeader from './hero/MagneticHeader';
import FeatureStrip from './hero/FeatureStrip';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blush to-white px-4 sm:px-8 relative pt-16">
      <MagneticHeader />
      <FeatureStrip />
    </section>
  );
}
