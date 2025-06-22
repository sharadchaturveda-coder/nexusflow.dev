import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa'; // Only FaEnvelope needed for now
import { UsageLog } from '@/types/dashboard'; // Import UsageLog

interface RecentActivityFeedProps {
  activities: UsageLog[];
}

// Helper function to format timestamp to relative time
const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 2592000) { // 30 days
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString(); // Fallback to full date
  }
};

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-soft-lg">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex-shrink-0 mt-1">
              <FaEnvelope className="text-purple-dark" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm">{activity.description}</p>
              <p className="text-gray-600 text-xs">{formatRelativeTime(activity.created_at)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
