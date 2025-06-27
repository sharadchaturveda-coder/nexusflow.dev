import AccordionItem from '../components/AccordionItem';
import HelpPageLayout from '../components/help/HelpPageLayout';
import { faqs } from '@/constants/faqs';

const HelpPage: React.FC = () => {
  return (
    <HelpPageLayout title="Nexus Flow AI - Help & FAQ" description="Nexus Flow AI Help and FAQ Page">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </HelpPageLayout>
  );
};

export default HelpPage;
