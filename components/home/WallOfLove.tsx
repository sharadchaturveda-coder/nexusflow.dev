import React from 'react';
import { TwitterIcon, ReplyIcon, RetweetIcon, LikeIcon } from './TweetIcons'; // Assuming these icons will be created or imported

interface TweetCardProps {
  avatar: string;
  name: string;
  handle: string;
  quote: string;
  timestamp: string;
  replies: number;
  retweets: number;
  likes: number;
}

const TweetCard: React.FC<TweetCardProps> = ({
  avatar,
  name,
  handle,
  quote,
  timestamp,
  replies,
  retweets,
  likes,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-3 border border-gray-200">
      <div className="flex items-center space-x-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{handle}</p>
        </div>
        <TwitterIcon className="ml-auto w-5 h-5 text-blue-400" />
      </div>
      <p className="text-gray-800 leading-relaxed">{quote}</p>
      <div className="text-sm text-gray-500 flex justify-between items-center pt-2 border-t border-gray-200">
        <span>{timestamp}</span>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <ReplyIcon className="w-4 h-4" />
            <span>{replies}</span>
          </div>
          <div className="flex items-center space-x-1">
            <RetweetIcon className="w-4 h-4" />
            <span>{retweets}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LikeIcon className="w-4 h-4" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WallOfLove: React.FC = () => {
  const tweets: TweetCardProps[] = [
    {
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Sarah J. Ops',
      handle: '@sarahj_ops',
      quote: 'Just replaced our old chatbot with @NexusFlowAI. The difference is night and day. Our support queue has never been this quiet. Highly recommend!',
      timestamp: '1h ago',
      replies: 7,
      retweets: 21,
      likes: 89,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      name: 'Mark T. Dev',
      handle: '@markt_dev',
      quote: 'The integration capabilities of @NexusFlowAI are insane. Had it up and running with our existing systems in minutes. Game changer for dev teams!',
      timestamp: '3h ago',
      replies: 12,
      retweets: 35,
      likes: 150,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      name: 'Emily R. Mktg',
      handle: '@emilyr_mktg',
      quote: '@NexusFlowAI has revolutionized our customer engagement. The personalized interactions are boosting our conversion rates significantly. Amazing product!',
      timestamp: '5h ago',
      replies: 9,
      retweets: 28,
      likes: 112,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'David L. Sales',
      handle: '@davidl_sales',
      quote: 'Closing deals faster thanks to @NexusFlowAI. The instant support it provides frees up our sales team to focus on high-value leads. Essential for growth!',
      timestamp: '8h ago',
      replies: 5,
      retweets: 18,
      likes: 75,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      name: 'Olivia K. HR',
      handle: '@oliviak_hr',
      quote: 'Even for internal support, @NexusFlowAI is a lifesaver. Our HR queries are handled efficiently, allowing us to focus on strategic initiatives. Fantastic!',
      timestamp: '10h ago',
      replies: 3,
      retweets: 10,
      likes: 45,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      name: 'Chris P. Prod',
      handle: '@chrisp_prod',
      quote: 'The analytics from @NexusFlowAI are incredibly insightful. We\'re making data-driven decisions on product improvements like never before. A must-have!',
      timestamp: '12h ago',
      replies: 15,
      retweets: 40,
      likes: 180,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jessica M. Fin',
      handle: '@jessicam_fin',
      quote: 'Streamlined our financial support processes with @NexusFlowAI. The accuracy and speed are unparalleled. Our clients are happier, and so are we!',
      timestamp: '14h ago',
      replies: 6,
      retweets: 20,
      likes: 95,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      name: 'Daniel S. Eng',
      handle: '@daniels_eng',
      quote: 'As an engineer, I appreciate the robust API and documentation of @NexusFlowAI. It\'s a joy to work with and integrate into complex systems. Top-tier!',
      timestamp: '16h ago',
      replies: 10,
      retweets: 30,
      likes: 130,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Our Customers Say It Best
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tweets.map((tweet, index) => (
            <TweetCard key={index} {...tweet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;