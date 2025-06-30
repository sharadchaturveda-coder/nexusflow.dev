import React from 'react';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/blog';
import { motion } from 'framer-motion';

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ id, title, excerpt, image, author, date, category }) => (
  <motion.div
    className="relative bg-white rounded-lg shadow-md overflow-hidden group"
    whileHover="hover"
    initial="rest"
  >
    <img src={image} alt={title} className="w-full" style={{ height: '200px', objectFit: 'contain' }} />
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-700 text-sm mb-4">{excerpt}</p>
      <p className="text-gray-600 text-xs font-medium mb-2">{category}</p>
      <p className="text-gray-600 text-xs font-medium">By {author} on {date}</p>
      <Link href={`/blog/${id}`} passHref legacyBehavior>
        <motion.a
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mt-4"
          variants={{
            rest: { x: 0 },
            hover: { x: 5 },
          }}
          transition={{ duration: 0.2 }}
        >
          Read More
          <motion.span
            className="ml-1"
            variants={{
              rest: { x: 0 },
              hover: { x: 5 },
            }}
            transition={{ duration: 0.2 }}
          >
            &rarr;
          </motion.span>
        </motion.a>
      </Link>
    </div>
    <motion.div
      className="absolute inset-0 rounded-lg pointer-events-none"
      style={{
        background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
        opacity: 0,
        filter: 'blur(10px)',
        zIndex: -1,
      }}
      variants={{
        rest: { opacity: 0 },
        hover: { opacity: 0.5 },
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

interface BlogProps {
  allPostsData: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    category: string;
  }[];
}

const Blog: React.FC<BlogProps> = ({ allPostsData }) => {
  return (
    <>
      <SeoHead title="Blog - Nexus Flow AI" description="Insights from Nexus Flow" />
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Insights from Nexus Flow
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPostsData.map(({ id, title, excerpt, image, author, date, category }) => (
              <BlogPostCard
                key={id}
                id={id}
                title={title}
                excerpt={excerpt}
                image={image}
                author={author}
                date={date}
                category={category}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Blog;