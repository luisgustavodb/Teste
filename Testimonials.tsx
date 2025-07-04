
import React from 'react';
import { Testimonial } from '../types';
import { FilledStarIcon, EmptyStarIcon, ThumbsUpIcon, ThumbsDownIcon } from '../constants';

const testimonials: Testimonial[] = [
  {
    avatarUrl: 'https://picsum.photos/id/237/50/50',
    name: 'Sophia Clark',
    time: '2 months ago',
    rating: 5,
    comment: 'MindfulMe has been a game-changer for me. The personalized insights and support have helped me manage my stress levels effectively.',
    likes: 15,
    dislikes: 2,
  },
  {
    avatarUrl: 'https://picsum.photos/id/1027/50/50',
    name: 'Ethan Bennett',
    time: '3 months ago',
    rating: 4,
    comment: 'I appreciate the 24/7 availability of the AI chatbot. It\'s like having a supportive friend always there for me.',
    likes: 12,
    dislikes: 1,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) =>
        i < rating ? <FilledStarIcon key={i} /> : <EmptyStarIcon key={i} />
      )}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Success Stories</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.time}</p>
                </div>
              </div>
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-700 mb-4">{testimonial.comment}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <button className="flex items-center mr-6 hover:text-gray-800"><ThumbsUpIcon /> {testimonial.likes}</button>
                <button className="flex items-center hover:text-gray-800"><ThumbsDownIcon /> {testimonial.dislikes}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
