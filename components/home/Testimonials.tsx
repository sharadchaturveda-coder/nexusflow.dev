import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialCard({ name, title, avatar, children }: { name: string, title: string, avatar: string, children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      className="bg-white/30 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl"
    >
      <div className="flex items-center mb-4">
        <Image src={avatar} alt="Avatar" width={48} height={48} className="w-12 h-12 rounded-full mr-4 border-2 border-goldenrod" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <p className="text-gray-600">{children}</p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-blush">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4 pb-4">
          The New Standard<br />in Customer Delight
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Real businesses. Real automation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <TestimonialCard name="Sarah J." title="Founder of a D2C brand" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705d">
          "Nexus Flow AI has transformed our customer support. We're saving hours every day and our customers are happier."
        </TestimonialCard>
        <TestimonialCard name="Mike R." title="Marketing Manager" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705f">
          "The ability to handle all our social media DMs in one place is a game-changer. The AI is scarily good."
        </TestimonialCard>
        <TestimonialCard name="Emily K." title="E-commerce Store Owner" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705e">
          "I was skeptical at first, but Nexus Flow has exceeded all my expectations. It's like having a new team member."
        </TestimonialCard>
      </div>
    </section>
  );
}
