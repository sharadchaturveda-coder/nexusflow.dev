import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

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
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failure': return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'loading': return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      default: return null;
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-soft-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          className="bg-gold-gradient text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default SystemStatusWidget;
