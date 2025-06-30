import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SeoHead title="Terms of Service - Nexus Flow AI" description="Terms of Service for Nexus Flow AI" />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">Last Updated: June 27, 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing or using the Nexus Flow AI website and services, you agree to be bound by these Terms of Service and all terms incorporated by reference. If you do not agree to all of these terms, do not use our website or services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify or revise these Terms of Service at any time. All changes are effective immediately when we post them. Your continued use of the website following the posting of revised Terms of Service means that you accept and agree to the changes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Please refer to our Privacy Policy for information on how we collect, use, and disclose your personal information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree to use the website and services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of Nexus Flow AI or its content suppliers and protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The website and services are provided on an "as is" and "as available" basis. Nexus Flow AI makes no representations or warranties of any kind, express or implied, as to the operation of the website or the information, content, materials, or products included on this website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nexus Flow AI will not be liable for any damages of any kind arising from the use of this website, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction where Nexus Flow AI is headquartered, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us at hello@nexusflow.ai.
          </p>
        </div>
      </main>
    </>
  );
};

export default TermsOfService;