import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';

const AboutUs: React.FC = () => {
  return (
    <>
      <SeoHead title="About Us - Nexus Flow AI" description="Learn about Nexus Flow AI's mission and team." />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            About Nexus Flow AI
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                We Believe in a Different Kind of AI.
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                AI shouldn't be a black box. It should be a partner. We're dedicated to building AI tools that are not only powerful but also transparent, trustworthy, and a genuine extension of your brand's voice.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
              <img
                src="/images/founder-headshot.jpg" // Placeholder for your headshot
                alt="Founder Headshot"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-purple-500"
              />
              <h2 className="text-3xl font-bold text-gray-100 mb-2">Your Name Here</h2>
              <p className="text-xl text-purple-400 mb-4">Founder, Nexus Flow AI</p>
              <p className="text-lg text-gray-300 leading-relaxed">
                As a solo founder who has navigated the challenges of customer support firsthand, I built Nexus Flow with a simple mission: to give every business access to the AI tools that were once reserved for tech giants. I'm passionate about building products that not only solve problems but also create delight.
              </p>
            </div>
          </div>

          <section className="mt-16 text-center">
            <h2 className="text-4xl font-bold text-gray-100 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We believe that small businesses deserve the same powerful tools as large enterprises. Our mission is to democratize access to world-class AI, helping you build better customer relationships and grow your empire. Nexus Flow is built by a small, passionate team dedicated to your success.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default AboutUs;