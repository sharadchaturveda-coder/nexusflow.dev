import { motion } from 'framer-motion';

const cardData = [
  {
    emoji: '🤯',
    title: 'Scattered Conversations',
    description: 'Juggling DMs across WhatsApp, Instagram, and Facebook leads to burnout.',
    footer: '🔥 Burnout risk high',
  },
  {
    emoji: '😡',
    title: 'Overwhelmed Agents',
    description: 'Missed messages and slow replies are inevitable when agents are stretched.',
    footer: '⚡ Unified Clarity',
  },
  {
    emoji: '✨',
    title: 'Instant, AI-Powered Replies',
    description: 'NexusFlow brings all your customer conversations into one smart inbox.',
    footer: '✅ Automation Activated',
  },
  {
    emoji: '📈',
    title: 'One Unified View',
    description: 'See everything, miss nothing. All in one panel.',
    footer: '📊 Insights on Demand',
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white via-rose-50 to-orange-50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-400">
          You're Wasting Time. Nexus Doesn't.
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Stop typing the same replies. Let AI handle your inbox.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {cardData.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{card.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
            <p className="mt-4 text-sm font-bold">{card.footer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
