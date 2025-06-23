import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Dashboard.module.css'; // Reusing dashboard styles for layout
import { getServerSideProps } from '@/lib/help/serverSideProps';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-lg font-medium text-left text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: "How is token usage calculated?",
      answer: "Token usage is calculated based on the input and output length of your interactions with the AI models. Each word or part of a word consumes a certain number of tokens. Different models may have different tokenization rules."
    },
    {
      question: "What is the difference between the Free and Pro plan?",
      answer: "The Free plan offers a limited number of tokens per month and access to basic features. The Pro plan provides a significantly higher token limit, access to advanced AI models, priority support, and additional premium features."
    },
    {
      question: "How do I reset my chat history?",
      answer: "You can reset your chat history from the 'Chat' page. Look for a 'Flush Memory' or 'Clear History' button, usually located near the chat input area or in the sidebar settings."
    }
  ];

  return (
    <div className={`${styles.container} font-sans flex`}>
      <Head>
        <title>Nexus Flow AI - Help & FAQ</title>
        <meta name="description" content="Nexus Flow AI Help and FAQ Page" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
