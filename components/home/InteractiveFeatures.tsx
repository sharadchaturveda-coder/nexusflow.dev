import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { InboxStackIcon, SparklesIcon, BoltIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';

const InteractiveFeatures = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-cream text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Built for a Modern Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FeatureCard
            icon={<InboxStackIcon className="h-12 w-12 text-purple-400" />}
            headline="One Inbox. Total Control."
            text="Connect WhatsApp, Instagram, and Facebook to see every customer conversation in one elegant command center."
          />
          {/* Card 2 */}
          <FeatureCard
            icon={<SparklesIcon className="h-12 w-12 text-pink-400" />}
            headline="Your Brand, Your Voice."
            text="Go beyond generic responses. Train the AI on your unique brand tone—from formal and professional to witty and fun."
          />
          {/* Card 3 */}
          <FeatureCard
            icon={<BoltIcon className="h-12 w-12 text-blue-400" />}
            headline="It Doesn't Just Talk. It Acts."
            text="Empower your AI to do more. It can process refunds, update accounts, and trigger workflows in your other tools, automatically."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  headline: string;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, headline, text }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "relative flex flex-col items-center p-8 rounded-xl border border-gray-200 shadow-soft-lg",
        "bg-white", // Clean, light background
        "hover:shadow-xl transition-shadow duration-300 ease-in-out", // Hover effect
        "transform-gpu" // Ensure GPU acceleration
      )}
    >
      <motion.div
        style={{
          transform: 'translateZ(75px)', // Parallax effect for icon
        }}
        className="mb-6"
      >
        {icon}
      </motion.div>
      <motion.h3
        style={{
          transform: 'translateZ(50px)', // Parallax effect for headline
        }}
        className="text-3xl font-bold mb-4 text-center"
      >
        {headline}
      </motion.h3>
      <motion.p
        style={{
          transform: 'translateZ(25px)', // Parallax effect for text
        }}
        className="text-lg text-gray-600 text-center"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default InteractiveFeatures;