
import React, { useState } from 'react';
import { FaqItem } from '../types';

const faqData: FaqItem[] = [
  {
    question: 'How does MindfulMe ensure my privacy?',
    answer: 'We prioritize your privacy and adhere to strict data protection policies. Your information is confidential and used solely to enhance your experience.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your data is secured with end-to-end encryption. We follow industry best practices to ensure the confidentiality and integrity of your information.',
  },
  {
    question: 'What are the subscription details?',
    answer: 'We offer various subscription plans, including a free tier with basic features and premium plans with advanced insights and unlimited chat. You can find more details on our pricing page.',
  },
];

const FaqAccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex justify-between items-center w-full p-6 font-semibold text-left text-gray-800"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span>{item.question}</span>
          <svg
            className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
          </svg>
        </button>
      </h2>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-6 pt-0">
          <p className="text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FaqAccordionItem 
                key={index}
                item={item}
                isOpen={openQuestionIndex === index}
                onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
