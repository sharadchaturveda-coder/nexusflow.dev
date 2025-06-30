import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { getSortedPostsData, getPostData } from '../../lib/blog';
import { motion } from 'framer-motion';

interface PostData {
  title: string;
  date: string;
  author: string;
  image: string;
  contentHtml: string;
}

interface PostProps {
  postData: PostData;
}

const Post: React.FC<PostProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title} - Nexus Flow AI Blog</title>
        <meta name="description" content={postData.title} />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.article
          className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={postData.image} alt={postData.title} className="w-full h-96 object-cover rounded-md mb-8" />
          <h1 className="text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            {postData.title}
          </h1>
          <div className="text-center text-gray-400 mb-8">
            By {postData.author} on {postData.date}
          </div>
          <div
            className="prose prose-invert max-w-none text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </motion.article>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = getSortedPostsData();
  const paths = allPostsData.map(({ id }) => ({
    params: { id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;