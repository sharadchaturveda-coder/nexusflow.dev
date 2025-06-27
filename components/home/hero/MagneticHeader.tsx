import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MagneticHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="max-w-4xl mx-auto pt-24"
    >
      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 pb-4">
        Let AI Handle the Inbox
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange">
          You Handle the Empire
        </span>
      </h1>
      <p className="mt-6 text-lg text-gray-600 uppercase tracking-widest">
        Across WhatsApp, Instagram, Facebook — One Voice. Yours.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-magenta to-orange text-white font-bold py-4 px-8 rounded-full shadow-lg border-2 border-white"
        >
          Try Nexus Now
        </motion.button>
        <a href="#dashboard" className="text-gray-600 font-bold hover:text-magenta transition-all underline">
          See Demo
        </a>
      </div>
      {/* Stacked Avatars Element */}
      <div className="mt-12 flex items-center justify-center -space-x-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Image
            key={i}
            className="w-10 h-10 rounded-full border-2 border-white"
            src={`https://randomuser.me/api/portraits/men/${i + 1}.jpg`} // Placeholder avatars
            alt={`User ${i + 1}`}
            width={40}
            height={40}
          />
        ))}
        <span className="ml-4 text-lg font-semibold text-gray-700">
          273 businesses automated their support this week.
        </span>
      </div>
    </motion.div>
  );
}
