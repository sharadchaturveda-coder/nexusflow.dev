import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';
import { motion, Easing } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, ServerStackIcon } from '@heroicons/react/24/outline';

const Security: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const iconVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut" as Easing,
      },
    },
  };

  return (
    <>
      <SeoHead title="Security - Nexus Flow AI" description="Security is Our Foundation" />
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            A Commitment to Your Security and Privacy
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="relative p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="mb-6"
                variants={iconVariants}
                animate="pulse"
              >
                <LockClosedIcon className="h-12 w-12 text-pink-400" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Encrypted by Default.</h2>
              <p className="text-lg text-gray-300">
                Every message, every piece of data, every interaction. Your information is secured with military-grade AES-256 encryption, both in transit and at rest. No compromises.
              </p>
            </motion.div>

            <motion.div
              className="relative p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="mb-6"
                variants={iconVariants}
                animate="pulse"
              >
                <ShieldCheckIcon className="h-12 w-12 text-blue-400" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Built for Compliance.</h2>
              <p className="text-lg text-gray-300">
                Our infrastructure is designed from the ground up to meet rigorous global standards. We are built in adherence to SOC 2 and GDPR principles, ensuring your business is ready for enterprise-level scrutiny.
              </p>
            </motion.div>

            <motion.div
              className="relative p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl flex flex-col items-center text-center md:col-span-2"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="mb-6"
                variants={iconVariants}
                animate="pulse"
              >
                <ServerStackIcon className="h-12 w-12 text-green-400" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">99.9% Uptime Guarantee.</h2>
              <p className="text-lg text-gray-300">
                Powered by the world-class infrastructure of Vercel and Supabase, we guarantee rock-solid reliability, so your AI agent is always online when your customers need it most.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Security;