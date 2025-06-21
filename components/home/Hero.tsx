import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-blush px-4 sm:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4"
      >
        Conversations that Convert
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-gray-700 max-w-xl"
      >
        Automate every reply. Seduce every lead. Instantly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-magenta to-orange text-white font-bold py-4 px-8 rounded-full shadow-lg"
        >
          Try Free Now
        </motion.button>
      </motion.div>
    </section>
  );
}
