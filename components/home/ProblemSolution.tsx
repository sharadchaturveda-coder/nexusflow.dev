import { motion } from 'framer-motion';

function Card({ emoji, title, description, footer }: { emoji: string, title: string, description: string, footer: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold mb-2 pb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="mt-4 text-sm font-bold">{footer}</p>
    </motion.div>
  );
}

const cardData = [
  {
    emoji: '✨',
    title: 'Unified Customer Engagement',
    description: 'Consolidate all your customer interactions from WhatsApp, Instagram, and Facebook into one intuitive platform.',
    footer: '✅ Effortless Management',
  },
  {
    emoji: '�',
    title: 'Empower Your Support Team',
    description: 'Free your expert agents from repetitive tasks, allowing them to focus on high-value interactions that drive business growth.',
    footer: '📈 Boost Productivity',
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
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-400 pb-4">
          Unlock Peak Performance.<br />Nexus Leads.
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Automate routine inquiries and empower your team to focus on strategic growth.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {cardData.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
    </section>
  );
}
