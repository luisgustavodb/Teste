
import React from 'react';
import { StressIcon, AnxietyIcon, MoodIcon } from '../constants';

const supportTypes = [
  { icon: <StressIcon />, name: 'Stress Management' },
  { icon: <AnxietyIcon />, name: 'Anxiety Relief' },
  { icon: <MoodIcon />, name: 'Mood Tracking' },
];

const SupportTypes: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Types of Support</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {supportTypes.map((type, index) => (
            <button key={index} className="flex items-center bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
              {type.icon}
              {type.name}
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-lg">
          MindfulMe offers support for various mental health needs, including stress management, anxiety relief, and mood tracking. Our tools and resources are designed to help you achieve a healthier and happier mind.
        </p>
      </div>
    </section>
  );
};

export default SupportTypes;
