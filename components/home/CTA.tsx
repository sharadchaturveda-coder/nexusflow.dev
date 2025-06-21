import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-r from-blush to-orange-100">
      <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
        Nexus Flow Is the End of Manual Replies
      </h2>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        Start your trial. Your future’s already responding.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-gradient-to-r from-magenta to-orange text-white font-bold py-4 px-8 sm:py-6 sm:px-12 rounded-full shadow-2xl text-xl sm:text-2xl"
      >
        Start your flow now
      </motion.button>
    </section>
  );
}
