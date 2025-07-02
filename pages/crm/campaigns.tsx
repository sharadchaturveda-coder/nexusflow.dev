import { useState } from 'react';
import { NextPage } from 'next';
// Replaced shadcn/ui components with standard HTML and Tailwind CSS
import { supabase } from '@/lib/supabaseClient';
import SeoHead from '@/components/SeoHead';

const CampaignsPage: NextPage = () => {
  const [campaignName, setCampaignName] = useState('');
  const [trigger, setTrigger] = useState('new_lead_added');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const toast = ({ title, description }: { title: string, description: string }) => {
    // Replace with a proper toast implementation if available
    alert(`${title}\n${description}`);
  };

  const handleSaveCampaign = async () => {
    setIsSaving(true);
    const { data, error } = await supabase.from('campaigns').insert([
      {
        name: campaignName,
        trigger: trigger,
        message1: message1,
        message2: message2,
        message3: message3,
      },
    ]);

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error saving campaign',
        description: error.message,
      });
    } else {
      toast({
        title: 'Campaign saved!',
        description: 'The new campaign has been created successfully.',
      });
      setCampaignName('');
      setMessage1('');
      setMessage2('');
      setMessage3('');
    }
  };

  return (
    <>
      <SeoHead
        title="Drip Campaigns | Your CRM"
        description="Create and manage automated WhatsApp drip campaigns."
      />
      <div className="min-h-screen bg-gray-50/50">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                WhatsApp Drip Campaigns
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Create automated message sequences to engage new leads.
              </p>
            </div>

            <div className="bg-white shadow-lg border-0 rounded-xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold">Create New Campaign</h2>
                <p className="text-gray-500 mt-1">
                  Define the trigger and messages for your automated campaign.
                </p>
              </div>
              <div className="p-6 space-y-8">
                <div className="space-y-2">
                  <label htmlFor="campaign-name" className="text-base font-semibold">Campaign Name</label>
                  <input
                    id="campaign-name"
                    placeholder="e.g., 'New Lead Welcome Sequence'"
                    value={campaignName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaignName(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="trigger" className="text-base font-semibold">Trigger</label>
                  <select
                    id="trigger"
                    value={trigger}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTrigger(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="new_lead_added">New Lead Added</option>
                  </select>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="message1" className="text-base font-semibold">Message 1 (sends instantly)</label>
                    <textarea
                      id="message1"
                      placeholder="e.g., 'Hi {{lead_name}}! Thanks for your interest. How can I help you today?'"
                      value={message1}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage1(e.target.value)}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="message2" className="text-base font-semibold">Message 2 (sends after 1 day)</label>
                    <textarea
                      id="message2"
                      placeholder="e.g., 'Just following up. Did you have any questions about our services?'"
                      value={message2}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage2(e.target.value)}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="message3" className="text-base font-semibold">Message 3 (sends after 3 days)</label>
                    <textarea
                      id="message3"
                      placeholder="e.g., 'Last chance to get our special offer! Let me know if you are interested.'"
                      value={message3}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage3(e.target.value)}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <button
                  onClick={handleSaveCampaign}
                  disabled={isSaving || !campaignName || !message1}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignsPage;