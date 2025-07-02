import { useState } from 'react';
import useSWR from 'swr';
import { Dialog } from '@headlessui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
}

const LeadsPage = () => {
  const { data: leads, error, mutate } = useSWR<Lead[]>('/api/crm/leads', fetcher);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('Manual Entry');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = { name, email, source };

    await fetch('/api/crm/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLead),
    });

    mutate();
    setIsOpen(false);
    setName('');
    setEmail('');
    setSource('Manual Entry');
  };

  return (
    <>
      <SeoHead title="Lead Management - NexusFlow" description="Manage your customer leads efficiently." />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Add Lead Manually
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads?.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="p-4 text-red-500">Failed to load leads.</p>}
          {!error && !leads && <p className="p-4 text-gray-500">Loading leads...</p>}
          {!error && leads && leads.length === 0 && <p className="p-4 text-gray-500">No leads found.</p>}
        </div>
      </main>
      <Footer />

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Add New Lead</Dialog.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
                <select
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                >
                  <option>Manual Entry</option>
                  <option>Facebook Ad</option>
                  <option>Organic</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default LeadsPage;