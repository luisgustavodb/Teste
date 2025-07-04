import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 my-8">
      <div 
        className="relative text-center bg-gray-900 rounded-2xl p-12 sm:p-20 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740')"}}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight">
                Empowering Students with AI-Driven<br/>Mental Wellness
            </h1>
            <p className="max-w-3xl text-lg text-gray-200 mb-8">
                MindfulMe provides personalized support and resources to help students thrive academically and emotionally.
            </p>
            <button
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
                Explore Now
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;