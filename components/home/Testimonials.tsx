import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-blush">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
          They're Already Obsessed.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Real businesses. Real automation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.1 }}
          className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center mb-4">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-goldenrod" />
            <div>
              <p className="font-bold">Sarah J.</p>
              <p className="text-sm text-gray-500">Founder of a D2C brand</p>
            </div>
          </div>
          <p className="text-gray-600">"Nexus Flow AI has transformed our customer support. We're saving hours every day and our customers are happier."</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center mb-4">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704e" alt="Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-goldenrod" />
            <div>
              <p className="font-bold">Mike R.</p>
              <p className="text-sm text-gray-500">Marketing Manager</p>
            </div>
          </div>
          <p className="text-gray-600">"The ability to handle all our social media DMs in one place is a game-changer. The AI is scarily good."</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
          className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center mb-4">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704f" alt="Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-goldenrod" />
            <div>
              <p className="font-bold">Emily K.</p>
              <p className="text-sm text-gray-500">E-commerce Store Owner</p>
            </div>
          </div>
          <p className="text-gray-600">"I was skeptical at first, but Nexus Flow has exceeded all my expectations. It's like having a new team member."</p>
        </motion.div>
      </div>
    </section>
  );
}
