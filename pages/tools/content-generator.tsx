import ContentGenerator from '@/components/tools/ContentGenerator';
import SeoHead from '@/components/SeoHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContentGeneratorPage = () => {
  return (
    <>
      <SeoHead
        title="AI Content Generator - Your Ultimate Content Creation Tool"
        description="Generate high-quality content for ads, social media, blogs, and more with our AI-powered tool. Get started now to streamline your content creation process."
      />
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <ContentGenerator />
      </main>
      <Footer />
    </>
  );
};

export default ContentGeneratorPage;