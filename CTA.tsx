
import React from 'react';

interface CTAProps {
    onLearnMoreClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onLearnMoreClick }) => {
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
        <p className="text-gray-600 text-lg mb-8">
          Discover how MindfulMe can help you achieve a healthier and happier mind. Explore our services and get started today.
        </p>
        <button
          onClick={onLearnMoreClick}
          className="bg-[#B0CBE5] hover:bg-[#9ebcda] text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default CTA;
