import { motion } from 'framer-motion';

interface HeroMetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const HeroMetricCard: React.FC<HeroMetricCardProps> = ({ title, value, icon }) => {
  return (
    <motion.div
      className="relative p-6 bg-white rounded-xl shadow-soft-lg overflow-hidden hero-metric-card transform transition-transform duration-300 hover:scale-105 hover:shadow-glow-gold" /* Updated shadow and added hover effects */
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="hero-metric-card-glow absolute inset-0 rounded-xl"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold text-gray-800">{value}</div>
        <div className="text-gray-600 text-3xl">{icon}</div> {/* Changed icon color to gray-600 for consistency */}
      </div>
      <div className="text-lg text-gray-700 mb-2">{title}</div> {/* Changed title color to gray-700 */}
    </motion.div>
  );
};

export default HeroMetricCard;
