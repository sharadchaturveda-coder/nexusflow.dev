import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';

const Contact: React.FC = () => {
  return (
    <>
      <SeoHead title="Contact Us - Nexus Flow AI" description="Get in touch with Nexus Flow AI" />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Get in Touch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Talk to Sales</h2>
              <p className="text-lg text-gray-700 mb-4">
                Interested in our Enterprise plan or have a sales inquiry?
              </p>
              <a href="mailto:sales@nexusflow.ai" className="text-xl font-semibold text-indigo-600 hover:underline">
                sales@nexusflow.ai
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Support</h2>
              <p className="text-lg text-gray-700 mb-4">
                Need help with your account, technical issues, or general questions?
              </p>
              <a href="mailto:support@nexusflow.ai" className="text-xl font-semibold text-indigo-600 hover:underline">
                support@nexusflow.ai
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;