import { motion } from 'framer-motion';

export default function BotFlowEditor() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-white via-rose-50 to-amber-50">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold text-gray-800 tracking-tight pb-4">
            Build a Brain,<br />Not Just Replies
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Nexus Flow AI is more than a chatbot. It's a memory-wired, feedback-optimizing cognition engine that adapts, evolves, and understands.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold rounded-full shadow-lg"
          >
            Explore the Engine
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
