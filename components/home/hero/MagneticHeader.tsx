import { motion } from 'framer-motion';

const avatarUrls = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
];

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
      <div className="mt-6 flex items-center justify-center">
        {/* The Stacked Avatars */}
        <div className="flex -space-x-4">
          {avatarUrls.map((url, index) => (
            <img
              key={index}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
              src={url}
              alt={`User ${index + 1}`}
            />
          ))}
        </div>

        {/* The Text */}
        <p className="ml-4 text-sm font-medium text-gray-600">
          <span className="font-bold text-gray-800">273 businesses</span> automated their support this week.
        </p>
      </div>
    </motion.div>
  );
}
