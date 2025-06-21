import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

interface SystemStatusWidgetProps {
  title: string;
  status: 'success' | 'failure' | 'loading';
  message: string;
  onAction?: () => void;
  actionLabel?: string;
}

const SystemStatusWidget: React.FC<SystemStatusWidgetProps> = ({
  title,
  status,
  message,
  onAction,
  actionLabel,
}) => {
  const statusIcon = () => {
    switch (status) {
      case 'success': return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'failure': return <FaTimesCircle className="text-red-500 text-2xl" />;
      case 'loading': return <FaSpinner className="text-blue-500 text-2xl animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        {statusIcon()}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default SystemStatusWidget;
