import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import ProblemSolution from '../components/home/ProblemSolution';
import TrustSection from '../components/home/TrustSection';
import BotFlowEditor from '../components/home/BotFlowEditor';
import InfiniteBusinessScroll from '../components/InfiniteBusinessScroll';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import HowItWorks from '../components/home/HowItWorks';
import CTA from '../components/home/CTA';
// import LiveConversation from '../components/home/LiveConversation'; // Temporarily removed as per user request
// import DashboardPreview from '../components/home/DashboardPreview'; // Removed as per user request

const Home: NextPage = () => {
  return (
    <div className="bg-cream text-gray-800 font-sans">
      <Head>
        <title>Nexus Flow AI - Turn Your DMs Into Deals. Automatically.</title>
        <meta name="description" content="One AI agent to answer WhatsApp, Insta, and Facebook." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        {/* <LiveConversation /> Temporarily removed as per user request */}
        <div id="features">
          <ProblemSolution />
          <TrustSection />
          <BotFlowEditor />
        </div>
        {/* <div id="dashboard">
          <DashboardPreview />
        </div> */}
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="get-started">
          <CTA />
        </div>
      </main>
    </div>
  );
};

export default Home;
