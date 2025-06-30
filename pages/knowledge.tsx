import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const KnowledgeBasePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingMessage, setTrainingMessage] = useState('');

  const handleAddSourceClick = () => {
    setIsModalOpen(true);
    setTrainingMessage(''); // Clear any previous messages
  };

  const handleStartTraining = async (url: string) => {
    setIsModalOpen(false);
    setTrainingMessage('Training in progress...');

    try {
      const response = await fetch('/api/knowledge/add-source', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        console.log('Training request sent successfully.');
        // In a real app, you'd update the table status here
        setTrainingMessage('Training request sent. Check back later for status updates.');
      } else {
        console.error('Failed to send training request.');
        setTrainingMessage('Failed to start training. Please try again.');
      }
    } catch (error) {
      console.error('Error sending training request:', error);
      setTrainingMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Your Knowledge Base</title>
      </Head>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Knowledge Base</h1>

        <div className="mb-4">
          <button
            onClick={handleAddSourceClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Source
          </button>
        </div>

        {trainingMessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <p className="font-bold">Status:</p>
            <p>{trainingMessage}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Source</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for knowledge base entries */}
              <tr>
                <td className="py-2 px-4 border-b text-gray-700">Example Document 1</td>
                <td className="py-2 px-4 border-b text-gray-700">URL</td>
                <td className="py-2 px-4 border-b text-gray-700">Completed</td>
                <td className="py-2 px-4 border-b text-gray-700">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-gray-700">Example Document 2</td>
                <td className="py-2 px-4 border-b text-gray-700">File Upload</td>
                <td className="py-2 px-4 border-b text-gray-700">Processing</td>
                <td className="py-2 px-4 border-b text-gray-700">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <AddSourceModal
          onClose={() => setIsModalOpen(false)}
          onStartTraining={handleStartTraining}
        />
      )}
    </div>
  );
};

interface AddSourceModalProps {
  onClose: () => void;
  onStartTraining: (url: string) => void;
}

const AddSourceModal: React.FC<AddSourceModalProps> = ({ onClose, onStartTraining }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onStartTraining(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Source</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url-input" className="block text-gray-700 text-sm font-bold mb-2">
              Paste URL:
            </label>
            <input
              type="url"
              id="url-input"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., https://example.com/document"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;