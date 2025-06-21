import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import BeforeAfter from '../components/home/BeforeAfter';
import ProblemSolution from '../components/home/ProblemSolution';
import DashboardPreview from '../components/home/DashboardPreview';
import RateSlider from '../components/RateSlider';
import Pricing from '../components/home/Pricing';
import BotFlowEditor from '../components/home/BotFlowEditor';
import InfiniteBusinessScroll from '../components/InfiniteBusinessScroll';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import HowItWorks from '../components/home/HowItWorks';
import CTA from '../components/home/CTA';

const Home: NextPage = () => {
  return (
    <div className="bg-cream text-gray-800 font-sans">
      <Head>
        <title>Nexus Flow AI - Turn Your DMs Into Deals. Automatically.</title>
        <meta name="description" content="One AI agent to answer WhatsApp, Insta, and Facebook." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="features">
          <BeforeAfter />
          <ProblemSolution />
          <BotFlowEditor />
        </div>
        <div id="dashboard">
          <DashboardPreview />
        </div>
        <div id="pricing">
          <RateSlider />
          <Pricing />
        </div>
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
