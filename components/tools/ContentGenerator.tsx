'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';

const contentTypes = ["Ad Caption", "Instagram Post", "Blog Intro", "YouTube Video Title", "LinkedIn Article Headline"];

export default function ContentGenerator() {
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [topic, setTopic] = useState('');

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/generate/content',
    body: {
      contentType,
      topic,
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // We need to manually set the input for the useCompletion hook to the topic
    // as the hook's 'input' state is what's sent in the request body by default.
    // However, we are overriding the body, so we just need to trigger the submission.
    // A more robust implementation might directly use the topic state.
    handleSubmit(e);
  };
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
    // Also update the hook's input if we want to use it directly, though it's not necessary with the custom body
    handleInputChange(e);
  }


  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900/50 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tighter">AI Content Generator</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Select a content type, provide a topic, and let AI do the rest.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="p-8 border-t border-gray-200 dark:border-gray-800 space-y-6">
          <div>
            <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Type
            </label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-900 dark:text-white"
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topic
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={handleTopicChange}
              placeholder="e.g., 'The future of renewable energy'"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-900 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic}
            className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </button>
        </form>

        {completion && (
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Content:</h2>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg prose prose-indigo dark:prose-invert max-w-none">
              <p>{completion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}