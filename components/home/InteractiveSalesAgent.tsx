'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAnimate } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { cn } from '../../utils/cn.ts';

// Light theme color palette
const USER_COLOR = 'bg-blue-500';
const AI_COLOR = 'bg-gray-200';
const ACCENT_COLOR = 'bg-indigo-600';

const ChatBubble = ({ message, author, className }: { message: ReactNode; author: 'user' | 'ai'; className?: string }) => {
  const isUser = author === 'user';
  return (
    <div
      className={cn(
        'flex items-end gap-2 max-w-[80%] lg:max-w-[70%]',
        isUser ? 'self-end justify-end' : 'self-start justify-start',
        className
      )}
    >
      <div
        className={cn(
          'rounded-2xl p-3 shadow-md',
          isUser
            ? `${USER_COLOR} text-white rounded-br-lg`
            : `${AI_COLOR} text-gray-800 rounded-bl-lg`
        )}
      >
        {typeof message === 'string' ? <p className="text-sm sm:text-base">{message}</p> : message}
      </div>
    </div>
  );
};

const TypingIndicator = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center space-x-1 p-3 rounded-2xl bg-gray-200', className)}>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
  </div>
);

const chatScenarios = [
  {
    userMessage: "Hey, I saw your ad for the new Chronos watch. Is it waterproof?",
    aiResponse: "Great question! The Chronos X is water-resistant up to 50 meters, perfect for daily wear and swimming. We also offer a 30-day free return policy.",
    callToAction: (
      <button className={cn(
        'flex items-center gap-2 font-bold py-2 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:scale-105',
        ACCENT_COLOR,
        'animate-pulse hover:animate-none'
      )}>
        <FiShoppingCart />
        Add to Cart
      </button>
    ),
  },
  {
    userMessage: "Hi, I need to change the shipping address for my order #NXF-1138.",
    aiResponse: "I can help with that. I've put a temporary hold on the shipment. Please provide the new address, and I'll update it for you right away.",
    callToAction: <button className={cn('font-bold py-2 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:scale-105', ACCENT_COLOR)}>Securely Update Address</button>,
  },
  {
    userMessage: "We're a team of 50 and need a robust solution. Do you integrate with Salesforce?",
    aiResponse: "Yes, our Enterprise plan includes a native Salesforce integration for seamless lead and contact syncing. Would you like to see how it works?",
    callToAction: <button className={cn('font-bold py-2 px-4 rounded-lg text-white transition-all duration-300 ease-in-out transform hover:scale-105', ACCENT_COLOR)}>Book a 15-min Demo</button>,
  },
];

export default function InteractiveSalesAgent() {
  const [scope, animate] = useAnimate();
  const [scenarioIndex, setScenarioIndex] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // Initial state: all hidden
        await animate([
          ['.chat-bubble', { opacity: 0, y: 20, scale: 0.9 }, { duration: 0 }],
          ['.typing-indicator', { opacity: 0, scale: 0.9 }, { duration: 0 }],
          ['.cta-bubble', { opacity: 0, scale: 0.9 }, { duration: 0 }],
        ]);

        // Step 1: User message fades in
        await animate('.user-message', { opacity: 1, y: 0, scale: 1 }, { duration: 0.2, ease: 'easeInOut' });
        await new Promise(resolve => setTimeout(resolve, 150));

        // Step 2: AI typing indicator
        await animate('.typing-indicator', { opacity: 1, scale: 1 }, { duration: 0.15 });
        await new Promise(resolve => setTimeout(resolve, 500));
        await animate('.typing-indicator', { opacity: 0, scale: 0.9 }, { duration: 0.15 });

        // Step 3: AI response message
        await animate('.ai-response-message', { opacity: 1, y: 0, scale: 1 }, { duration: 0.2, ease: 'easeInOut' });
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Step 4: Final AI message with Call to Action
        await animate('.cta-bubble', { opacity: 1, y: 0, scale: 1 }, { duration: 0.2, ease: 'easeInOut' });

        // Step 5: Pause and fade out
        await new Promise(resolve => setTimeout(resolve, 2000));
        await animate(scope.current, { opacity: 0 }, { duration: 0.3, ease: 'easeInOut' });
        
        // Update to the next scenario
        setScenarioIndex((prevIndex) => (prevIndex + 1) % chatScenarios.length);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        await animate(scope.current, { opacity: 1 }, { duration: 0 }); // Reset opacity for next loop
      }
    };
    sequence();
  }, [animate, scope, scenarioIndex]);

  const currentScenario = chatScenarios[scenarioIndex];

  return (
    <div ref={scope} className="w-full max-w-md mx-auto h-[450px] bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl p-4 flex flex-col space-y-4 border border-gray-200 overflow-hidden">
      <ChatBubble
        author="user"
        message={currentScenario.userMessage}
        className="chat-bubble user-message"
      />
      <TypingIndicator className="typing-indicator self-start" />
      <ChatBubble
        author="ai"
        message={currentScenario.aiResponse}
        className="chat-bubble ai-response-message"
      />
      <ChatBubble
        author="ai"
        message={currentScenario.callToAction}
        className="chat-bubble cta-bubble"
      />
    </div>
  );
}