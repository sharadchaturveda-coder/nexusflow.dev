import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useNotificationPreferences } from "@/lib/hooks/useNotificationPreferences";

export const NotificationsCard = () => {
  const { preferences, updatePreferences, isLoading, error } = useNotificationPreferences();

  const [localPreferences, setLocalPreferences] = useState({
    newLead: false,
    conversationAttention: false,
    weeklySummary: false,
  });

  useEffect(() => {
    if (preferences) {
      setLocalPreferences({
        newLead: preferences.newLead || false,
        conversationAttention: preferences.conversationAttention || false,
        weeklySummary: preferences.weeklySummary || false,
      });
    }
  }, [preferences]);

  const handleToggle = (key: keyof typeof localPreferences) => {
    setLocalPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = async () => {
    await updatePreferences(localPreferences);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
        <p className="text-gray-600 mb-6">Manage your email alert preferences.</p>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label htmlFor="new-lead-switch" className="text-gray-700 flex-grow cursor-pointer">
              Email me when I get a new lead.
            </label>
            <Switch
              id="new-lead-switch"
              checked={localPreferences.newLead}
              onChange={() => handleToggle('newLead')}
              className={`${
                localPreferences.newLead ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                className={`${
                  localPreferences.newLead ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="conversation-switch" className="text-gray-700 flex-grow cursor-pointer">
              Email me when a conversation needs my attention.
            </label>
            <Switch
              id="conversation-switch"
              checked={localPreferences.conversationAttention}
              onChange={() => handleToggle('conversationAttention')}
              className={`${
                localPreferences.conversationAttention ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                className={`${
                  localPreferences.conversationAttention ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="summary-switch" className="text-gray-700 flex-grow cursor-pointer">
              Email me with a weekly performance summary.
            </label>
            <Switch
              id="summary-switch"
              checked={localPreferences.weeklySummary}
              onChange={() => handleToggle('weeklySummary')}
              className={`${
                localPreferences.weeklySummary ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                className={`${
                  localPreferences.weeklySummary ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 flex justify-end">
        <button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        {error && <p className="text-sm text-red-600 ml-4 self-center">{error}</p>}
      </div>
    </div>
  );
};

export default NotificationsCard;