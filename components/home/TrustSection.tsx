import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

function TestimonialCard({ name, company, avatar, quote }: { name: string, company: string, avatar: string, quote: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-200 text-left"
    >
      <div className="flex items-center mb-3">
        <Image src={avatar} alt={`${name} avatar`} width={40} height={40} className="w-10 h-10 rounded-full mr-3 border-2 border-pink-300" />
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-600">{company}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm italic">"{quote}"</p>
    </motion.div>
  );
}

export default function TrustSection() {
  const testimonials = [
    {
      name: "Alex P.",
      company: "GrowthMarketer Inc.",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704a",
      quote: "Our support volume dropped by 70% overnight. Nexus Flow is a lifesaver!"
    },
    {
      name: "Maria S.",
      company: "EcomSolutions",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704b",
      quote: "Finally, an AI that understands our customers. It's like magic."
    },
    {
      name: "David L.",
      company: "SaaS Innovators",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704c",
      quote: "The insights we get from conversation data are invaluable. Highly recommend."
    },
    {
      name: "Jessica T.",
      company: "Retail Revolution",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704d",
      quote: "Our customer satisfaction scores have never been higher. Truly transformative."
    },
    {
      name: "Ben C.",
      company: "TechStartups",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704e",
      quote: "Seamless integration and powerful automation. A must-have for any growing business."
    },
    {
      name: "Olivia M.",
      company: "Creative Agency",
      avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704f",
      quote: "We're now focusing on what truly matters, thanks to Nexus Flow handling the repetitive tasks."
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Outcome */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-normal pb-4">
            Never Answer the Same Question Twice
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl lg:mx-0 mx-auto">
            Nexus Flow acts as your tireless agent, resolving up to 80% of support tickets automatically, freeing your team to focus on complex issues and strategic growth.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              Handle 50 conversations for free.
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Column: Wall of Love */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
