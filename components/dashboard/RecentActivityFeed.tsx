import React from 'react';
import { FaEnvelope, FaRobot, FaDollarSign } from 'react-icons/fa';

interface Activity {
  id: string;
  type: 'message' | 'bot' | 'cost';
  description: string;
  timestamp: string;
}

interface RecentActivityFeedProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'message': return <FaEnvelope className="text-blue-500" />;
    case 'bot': return <FaRobot className="text-green-500" />;
    case 'cost': return <FaDollarSign className="text-red-500" />;
    default: return null;
  }
};

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm">{activity.description}</p>
              <p className="text-gray-500 text-xs">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
