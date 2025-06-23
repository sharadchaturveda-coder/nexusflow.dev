import React from 'react';
import Head from 'next/head';

interface SeoHeadProps {
  title: string;
  description: string;
  favicon?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, favicon = '/favicon.ico' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default SeoHead;
