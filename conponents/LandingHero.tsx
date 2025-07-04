
import React from 'react';

interface LandingHeroProps {
  onGetStartedClick: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="py-20 my-8">
      <div className="relative text-center bg-gradient-to-br from-pink-200/50 via-stone-200/50 to-teal-200/50 rounded-2xl p-12 sm:p-20 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                Welcome to MindfulMe
            </h1>
            <p className="max-w-3xl text-lg text-gray-600 mb-8">
                Your AI-powered psychology companion. Discover personalized insights and support for your mental well-being.
            </p>
            <button
                onClick={onGetStartedClick}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
                Get Started
            </button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
