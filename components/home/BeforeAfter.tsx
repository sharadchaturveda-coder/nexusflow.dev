import { motion } from 'framer-motion';

export default function BeforeAfter() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
          Before Nexus: Chaos. After: Control.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Watch what changes when AI enters the chat.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Before */}
        <div className="space-y-4">
        <motion.div
          className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>🤯 Missed WhatsApp leads</p>
        </motion.div>
        <motion.div
          className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>😡 No central dashboard</p>
        </motion.div>
        <motion.div
          className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>😫 Manual responses at 2AM</p>
        </motion.div>
        </div>

        {/* Engine */}
        <motion.div
          className="bg-gradient-to-br from-orange to-magenta text-white p-8 rounded-full shadow-2xl"
        >
          <p className="text-2xl font-bold">NexusFlow Engine</p>
        </motion.div>

        {/* After */}
        <div className="space-y-4">
        <motion.div
          className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>✅ Unified Inbox</p>
        </motion.div>
        <motion.div
          className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>🤖 AI handles queries</p>
        </motion.div>
        <motion.div
          className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <p>📈 Insights on autopilot</p>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
