import { SystemStatus } from '@/types/dashboard';

export const mapStatusToWidgetStatus = (status: SystemStatus['status']) => {
  switch (status) {
    case 'ok': return 'success';
    case 'error': return 'failure';
    case 'pending': return 'loading';
    default: return 'loading';
  }
};
