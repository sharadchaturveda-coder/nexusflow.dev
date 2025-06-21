import { motion } from 'framer-motion';
import { InboxStackIcon, SparklesIcon, ChartBarIcon, UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function FeatureStrip() {
  return (
    <div className="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <InboxStackIcon className="h-12 w-12 text-magenta mx-auto mb-4" />
        <h3 className="text-xl font-bold">Unified Inbox</h3>
        <p className="text-gray-600 mt-2">All your messages in one place.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <SparklesIcon className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-bold">Instant GPT Replies</h3>
        <p className="text-gray-600 mt-2">Let AI handle the conversation.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <ChartBarIcon className="h-12 w-12 text-goldenrod mx-auto mb-4" />
        <h3 className="text-xl font-bold">Live Insights</h3>
        <p className="text-gray-600 mt-2">See everything, miss nothing.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <UserGroupIcon className="h-12 w-12 text-magenta mx-auto mb-4" />
        <h3 className="text-xl font-bold">Team Collaboration</h3>
        <p className="text-gray-600 mt-2">Invite team members and manage permissions.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <ArrowPathIcon className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-bold">Continuous Learning</h3>
        <p className="text-gray-600 mt-2">The AI learns from every interaction.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.6 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center"
      >
        <SparklesIcon className="h-12 w-12 text-goldenrod mx-auto mb-4" />
        <h3 className="text-xl font-bold">Customizable Personality</h3>
        <p className="text-gray-600 mt-2">Tailor the AI's voice to match your brand.</p>
      </motion.div>
    </div>
  );
}
