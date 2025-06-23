import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import AnimatedNumber from './AnimatedNumber';

export default function DashboardPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }, // Slightly faster
  };

  const barVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.2 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { width: "75%", transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <section className="py-20 px-4 bg-eggshell">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
          Your Business. At a Glance.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          See everything. Miss nothing. All in one panel.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white/60 backdrop-blur-lg border border-white/20 p-2 sm:p-4 rounded-3xl shadow-2xl will-change-transform will-change-opacity"
        >
          <div ref={ref} className="bg-black rounded-2xl p-4 sm:p-8 will-change-transform will-change-opacity">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-bold">Dashboard</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            {/* Hero Metrics */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
                <p className="text-sm text-gray-400">Tokens Consumed</p>
                <p className="text-2xl font-bold"><AnimatedNumber value={1200000} /></p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
                <p className="text-sm text-gray-400">API Calls</p>
                <p className="text-2xl font-bold"><AnimatedNumber value={85000} /></p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
                <p className="text-sm text-gray-400">Active Bots</p>
                <p className="text-2xl font-bold"><AnimatedNumber value={12} /></p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
                <p className="text-sm text-gray-400">Conversations</p>
                <p className="text-2xl font-bold"><AnimatedNumber value={3500} /></p>
              </div>
            </motion.div>

            {/* Usage Chart */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              className="bg-gray-800 p-4 rounded-lg mb-8"
            >
              <p className="text-white text-lg font-semibold mb-4">Usage Over Time</p>
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="flex items-end h-32 space-x-2"
              >
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-1/2 rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-3/4 rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-1/3 rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-full rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-2/3 rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-1/4 rounded-t origin-bottom"></motion.div>
                <motion.div variants={barVariants} className="flex-1 bg-blue-500 h-3/5 rounded-t origin-bottom"></motion.div>
              </motion.div>
            </motion.div>

            {/* Quota Overview */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              className="bg-gray-800 p-4 rounded-lg mb-8"
            >
              <p className="text-white text-lg font-semibold mb-4">Quota Overview</p>
              <p className="text-gray-400 text-sm mb-2">Current Plan: Pro Plan</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={progressBarVariants}
                  className="bg-green-500 h-4 rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              className="bg-gray-800 p-4 rounded-lg"
            >
              <p className="text-white text-lg font-semibold mb-4">Recent Activity</p>
              <motion.ul
                initial="hidden"
                animate={controls}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="text-gray-300 text-sm space-y-2"
              >
                <motion.li variants={listItemVariants}>AI responded to user query.</motion.li>
                <motion.li variants={listItemVariants}>New bot "Sales Assistant" created.</motion.li>
                <motion.li variants={listItemVariants}>User "John Doe" updated profile.</motion.li>
                <motion.li variants={listItemVariants}>API key generated for integration.</motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
