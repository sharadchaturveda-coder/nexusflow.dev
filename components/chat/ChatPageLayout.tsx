import React from 'react';
import Navbar from '../Navbar';
import SeoHead from '../SeoHead';

interface ChatPageLayoutProps {
  children: React.ReactNode;
}

const ChatPageLayout: React.FC<ChatPageLayoutProps> = ({ children }) => {
  return (
    <div className="font-sans">
      <SeoHead title="Nexus Flow AI - Chat" description="Nexus Flow AI Chat Interface" />
      <Navbar />
      <div className="flex h-[calc(100vh-theme(height.navbar))]">
        {children}
      </div>
    </div>
  );
};

export default ChatPageLayout;
