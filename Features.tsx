import React from 'react';
import { HeartIcon, CommunityIcon, EducationIcon } from '../constants';

const features = [
  {
    icon: <HeartIcon />,
    title: 'Personalized Wellness Plans',
    description: 'AI-powered recommendations tailored to individual student needs.',
  },
  {
    icon: <CommunityIcon />,
    title: 'Community Support',
    description: 'Connect with peers and share experiences in a safe and supportive environment.',
  },
  {
    icon: <EducationIcon />,
    title: 'Educational Resources',
    description: 'Access articles, videos, and exercises to learn about mental health and well-being.',
  },
];

const KeyFeatures: React.FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="text-left mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
        <p className="max-w-3xl text-gray-600 text-lg">
          MindfulMe offers a range of tools and resources to support student mental health.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-50 p-8 rounded-xl border border-gray-200/80 transition-shadow">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;