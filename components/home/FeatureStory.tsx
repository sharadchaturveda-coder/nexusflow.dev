import React from 'react';
import { motion } from 'framer-motion';

interface FeatureStoryProps {
  headline: string;
  description: string;
  bulletPoints: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}

const FeatureStory: React.FC<FeatureStoryProps> = ({
  headline,
  description,
  bulletPoints,
  visual,
  reverse = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
            reverse ? 'md:grid-flow-col-dense' : ''
          }`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            className={`${reverse ? 'md:col-start-2' : ''}`}
            variants={itemVariants}
          >
            <h3 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {headline}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {description}
            </p>
            <ul className="space-y-3">
              {bulletPoints.map((point, index) => (
                <motion.li key={index} className="flex items-start text-gray-800" variants={itemVariants}>
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className={`${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}
            variants={itemVariants}
          >
            {visual}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureStory;