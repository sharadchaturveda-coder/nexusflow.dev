import { useState } from 'react';
import PricingCard from '../components/home/PricingCard';
import UpgradeButton from '../components/UpgradeButton';
import { plans } from '../lib/pricing/planData';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { TestimonialCard } from '../components/home/Testimonials'; // Re-using the TestimonialCard component

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('pro');

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="bg-cream text-gray-800 font-sans">
      <Head>
        <title>Nexus Flow AI - Simple, Transparent Pricing</title>
        <meta name="description" content="Choose the plan that's right for your business." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4 pb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Choose the plan that's right for your business.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Social Proof Section */}
        <section className="py-16 px-4 bg-cream">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Customers Say
            </h3>
            <p className="text-lg text-gray-700 mx-auto whitespace-nowrap">
              Hear from businesses who are already seeing results with Nexus Flow AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard name="Alex P." title="CEO of TechSolutions" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705a">
              "Nexus Flow AI has revolutionized our customer engagement. The ROI is undeniable!"
            </TestimonialCard>
            <TestimonialCard name="Maria S." title="Founder of Bloom & Grow" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705b">
              "Our support team is more efficient than ever. Nexus Flow handles the routine, so we can focus on growth."
            </TestimonialCard>
            <TestimonialCard name="David L." title="Operations Director, Global Corp" avatar="https://i.pravatar.cc/40?u=a042581f4e29026705c">
              "The seamless integration and intelligent automation provided by Nexus Flow AI have exceeded our expectations."
            </TestimonialCard>
          </div>
        </section>

        {/* Compare All Features Table */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Compare All Features
            </h3>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              A detailed breakdown of what each plan offers.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Feature</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Starter</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Pro</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Business</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">AI Conversations / mo</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800">50</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800">500</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800">1,500</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800">Custom</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Standard AI Model</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Chat History</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Train AI on Your Own Data (URLs, PDFs)</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Advanced AI Model (GPT-4)</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Priority Support</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Team Collaboration (3 seats)</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Advanced Analytics</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">SOC 2 Compliance</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-800">Dedicated Account Manager</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-800">Custom Integrations</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-gray-800"></td>
                  <td className="py-4 px-6 text-center text-sm text-green-500">✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <section className="py-16 px-4 bg-cream">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Find answers to common questions about our pricing and plans.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h4 className="font-bold text-lg mb-2">What counts as one 'AI-Handled Conversation'?</h4>
              <p className="text-gray-700">An AI-handled conversation is defined as a continuous exchange of messages between a user and the AI where the AI successfully resolves the user's query without human intervention. If a conversation requires a human agent, it does not count towards the AI-handled limit.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h4 className="font-bold text-lg mb-2">What happens if I go over my monthly limit?</h4>
              <p className="text-gray-700">If you exceed your monthly AI-handled conversation limit, additional conversations will be charged at a per-conversation rate, or you will be prompted to upgrade your plan for continued seamless service. We'll notify you well in advance before you reach your limit.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h4 className="font-bold text-lg mb-2">Can I cancel my plan at any time?</h4>
              <p className="text-gray-700">Yes, you can cancel your plan at any time directly from your account dashboard. Your subscription will remain active until the end of your current billing cycle, and you will not be charged for subsequent periods.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
