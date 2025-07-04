
import React from 'react';
import { BrainIcon, ChatBubbleIcon, HeartIcon } from '../constants';

const features = [
  {
    icon: <BrainIcon />,
    title: 'Personalized Insights',
    description: 'Receive tailored insights into your mental health based on advanced AI analysis.',
  },
  {
    icon: <ChatBubbleIcon />,
    title: 'AI-Powered Chat',
    description: 'Engage in supportive conversations with our AI chatbot, available 24/7.',
  },
  {
    icon: <HeartIcon />,
    title: 'Well-being Support',
    description: 'Access resources and tools to promote your overall well-being and emotional balance.',
  },
];

const LandingFeatures: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 max-w-4xl">
          <h2 className="text-gray-500 uppercase tracking-wider font-semibold mb-2">Key Features</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore the Benefits of MindfulMe</h3>
          <p className="text-gray-600 text-lg">
            Our AI psychology platform offers a range of features designed to support your mental health journey. From personalized insights to AI-powered chat and well-being resources, we're here to help you thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200/80 transition-shadow hover:shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
