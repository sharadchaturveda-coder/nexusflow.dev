import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';

const Integrations: React.FC = () => {
  const integrationsData = [
    {
      name: 'Zendesk',
      src: 'https://cdn.simpleicons.org/zendesk/FFFFFF',
      useCase: 'Automatically create, update, and close tickets.',
      category: 'Help Desk',
    },
    {
      name: 'Intercom',
      src: 'https://cdn.simpleicons.org/intercom/FFFFFF',
      useCase: 'Engage with customers directly within your chat.',
      category: 'Help Desk',
    },
    {
      name: 'Freshdesk',
      src: 'https://cdn.simpleicons.org/freshdesk/FFFFFF',
      useCase: 'Streamline support workflows and customer interactions.',
      category: 'Help Desk',
    },
    {
      name: 'WhatsApp',
      src: 'https://cdn.simpleicons.org/whatsapp/FFFFFF',
      useCase: 'Communicate with customers on their preferred messaging app.',
      category: 'Messaging Platforms',
    },
    {
      name: 'Instagram',
      src: 'https://cdn.simpleicons.org/instagram/FFFFFF',
      useCase: 'Manage customer inquiries and comments from Instagram.',
      category: 'Messaging Platforms',
    },
    {
      name: 'Facebook Messenger',
      src: 'https://cdn.simpleicons.org/facebook/FFFFFF',
      useCase: 'Handle customer messages and automate responses on Facebook.',
      category: 'Messaging Platforms',
    },
    {
      name: 'Slack',
      src: 'https://cdn.simpleicons.org/slack/FFFFFF',
      useCase: 'Send critical alerts and notifications to your support channel.',
      category: 'Messaging Platforms',
    },
    {
      name: 'Shopify',
      src: 'https://cdn.simpleicons.org/shopify/FFFFFF',
      useCase: 'Instantly check order status and initiate returns.',
      category: 'E-commerce',
    },
    {
      name: 'WooCommerce',
      src: 'https://cdn.simpleicons.org/woocommerce/FFFFFF',
      useCase: 'Automate order inquiries and product information for your store.',
      category: 'E-commerce',
    },
  ];

  const categories = Array.from(new Set(integrationsData.map((integration) => integration.category)));

  return (
    <>
      <SeoHead title="Integrations - Nexus Flow AI" description="Integrate Nexus Flow with Your Favorite Tools" />
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500">
            Integrate Nexus Flow with Your Ecosystem
          </h1>

          {categories.map((category) => (
            <section key={category} className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-10 text-gray-100">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
                {integrationsData
                  .filter((integration) => integration.category === category)
                  .map((integration) => (
                    <motion.div
                      key={integration.name}
                      className="relative flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg w-40 h-40 justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={integration.src} alt={integration.name} className="h-16 w-16 object-contain mb-4" />
                      <p className="text-lg font-semibold text-gray-100 text-center">{integration.name}</p>
                      <motion.div
                        className="absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {integration.useCase}
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default Integrations;