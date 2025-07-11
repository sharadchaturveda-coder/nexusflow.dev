import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import ProblemSolution from '../components/home/ProblemSolution';
import TrustSection from '../components/home/TrustSection';
import BotFlowEditor from '../components/home/BotFlowEditor';
import InfiniteBusinessScroll from '../components/InfiniteBusinessScroll';
import Testimonials from '../components/home/Testimonials';
import WallOfLove from '../components/home/WallOfLove';
import FeatureStory from '../components/home/FeatureStory';
import AnimatedChatCard from '../components/home/AnimatedChatCard';
import FAQ from '../components/home/FAQ';
import HowItWorks from '../components/home/HowItWorks';
import InteractiveFeatures from '../components/home/InteractiveFeatures';
import CTA from '../components/home/CTA';
import InteractiveSalesAgent from '../components/home/InteractiveSalesAgent';
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
        <div id="feature-stories">
          <FeatureStory
            headline="Capture leads and make buying easy."
            description="Our AI agents seamlessly guide customers through the sales funnel, answering questions, providing product information, and even processing orders directly within the chat interface. Turn every conversation into a conversion opportunity."
            bulletPoints={[
              "Automated product recommendations",
              "In-chat payment processing",
              "24/7 lead qualification",
            ]}
            visual={
              <InteractiveSalesAgent />
            }
          />
          <FeatureStory
            headline="Balance AI automation and the human touch."
            description="Nexus Flow AI intelligently handles routine inquiries, freeing up your human agents for complex cases. Seamlessly escalate conversations to live agents when needed, ensuring a perfect blend of efficiency and personalized support."
            bulletPoints={[
              "Intelligent escalation to human agents",
              "Real-time conversation monitoring",
              "Customizable AI response flows",
            ]}
            visual={<AnimatedChatCard />}
            reverse
          />
        </div>
        <div id="wall-of-love">
          <WallOfLove />
        </div>
        <div id="impact-metrics">
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="interactive-features">
          <InteractiveFeatures />
        </div>
        <div id="get-started">
          <CTA />
        </div>
      </main>
    </div>
  );
};

export default Home;
