import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';

const Docs: React.FC = () => {
  return (
    <>
      <SeoHead title="Documentation - Nexus Flow AI" description="Developer Documentation for Nexus Flow AI" />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Developer Documentation</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our comprehensive developer documentation, including API references and guides, is currently being written. We expect it to be available in Q3 2024. Thank you for your patience.
          </p>
        </div>
      </main>
    </>
  );
};

export default Docs;