import { motion } from 'framer-motion';

export default function VisualShowcase() {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="h-full"
      >
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full h-full flex flex-col">
          <div className="flex-grow flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">Do you have this in size M?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">Yes, we do! We have 3 left in stock.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">Great! I'll take one.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">Awesome! I've added it to your cart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="h-full"
      >
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full h-full flex flex-col">
          <div className="flex-grow flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">What are your hours?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">We're open 9am-5pm, Mon-Fri.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">Do you have any availability tomorrow?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">We have a few spots open in the afternoon. Would you like to book one?</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        className="h-full"
      >
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full h-full flex flex-col">
          <div className="flex-grow flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">Can I book an appointment?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">Of course! What time works for you?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-sm">How about 2pm?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-pink-500 text-white p-3 rounded-lg">
                <p className="text-sm">You're all set for 2pm tomorrow!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
