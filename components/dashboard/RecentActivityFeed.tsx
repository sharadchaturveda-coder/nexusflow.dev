import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { UsageLog } from '@/types/dashboard';
import { formatRelativeTime } from '@/lib/dashboard/utils/timeFormatters';

interface RecentActivityFeedProps {
  activities: UsageLog[];
}

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
              <p className="text-gray-800 text-sm">
                {activity.description?.includes('Message relayed') ? 'You sent a message' :
                 activity.description?.includes('SupportBot used by user ID') ? 'New conversation started' :
                 activity.description || 'Unknown activity'}
              </p>
              <p className="text-gray-600 text-xs">{formatRelativeTime(activity.created_at)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
