import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SeoHead title="Privacy Policy - Nexus Flow AI" description="Learn about the privacy policy of Nexus Flow AI." />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: June 27, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect various types of information in connection with the services we provide, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Personal Information:</strong> Such as your name, email address, and payment information when you register for an account or make a purchase.</li>
              <li><strong>Usage Data:</strong> Information about how you access and use our services, including IP addresses, browser type, operating system, referral URLs, pages viewed, and the dates/times of your visits.</li>
              <li><strong>Device Information:</strong> Information about the device you use to access our services, including hardware model, operating system and version, unique device identifiers, and mobile network information.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track the activity on our service and hold certain information.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The information we collect is used for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To provide and maintain our service, including to monitor the usage of our service.</li>
              <li>To manage your account: to manage your registration as a user of the service. The Personal Data you provide can give you access to different functionalities of the service that are available to you as a registered user.</li>
              <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services you have purchased or of any other contract with us through the service.</li>
              <li>To contact you by email, phone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including security updates, when necessary or reasonable for their implementation.</li>
              <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information.</li>
              <li>To attend and manage your requests to us.</li>
              <li>For business transfers: We may use your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by us about our Service users is among the assets transferred.</li>
              <li>For other purposes: We may use your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our service, products, services, marketing and your experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your personal information in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>With Service Providers:</strong> We may share your personal information with service providers to monitor and analyze the use of our service, to contact you.</li>
              <li><strong>For Business Transfers:</strong> We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li><strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any other subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
              <li><strong>With Business Partners:</strong> We may share your information with our business partners to offer you certain products, services or promotions.</li>
              <li><strong>With Other Users:</strong> when you share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Security of Your Personal Data</h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your Personal Data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;