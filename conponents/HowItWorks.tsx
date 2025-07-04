import React from 'react';

const StatsCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-slate-50 p-6 rounded-xl border border-gray-200/80 ${className}`}>
        {children}
    </div>
);

const Stats: React.FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="text-left mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Understanding Student Mental Health</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatsCard>
            <h3 className="font-semibold text-gray-600 mb-2">Student Stress Levels</h3>
            <p className="text-5xl font-bold text-gray-900 mb-1">72%</p>
            <p className="text-green-600 font-semibold text-lg">Last Month +5%</p>
            <div className="mt-8 flex justify-between items-end gap-2">
                <div className="text-center w-1/3">
                    <div className="h-12 bg-gray-200 rounded-t-md"></div>
                    <p className="text-sm text-gray-500 mt-2">Low</p>
                </div>
                <div className="text-center w-1/3">
                    <div className="h-24 bg-brand-blue/30 rounded-t-md border-t-4 border-brand-blue"></div>
                    <p className="text-sm text-gray-500 mt-2">Medium</p>
                </div>
                <div className="text-center w-1/3">
                    <div className="h-16 bg-gray-200 rounded-t-md"></div>
                    <p className="text-sm text-gray-500 mt-2">High</p>
                </div>
            </div>
        </StatsCard>
        <StatsCard>
             <h3 className="font-semibold text-gray-600 mb-2">Mood Trends Over Time</h3>
            <p className="text-5xl font-bold text-gray-900 mb-1">65%</p>
            <p className="text-red-600 font-semibold text-lg">Last 3 Months -3%</p>
            <div className="mt-8">
                <svg width="100%" height="100" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path d="M 0 50 C 30 20, 50 20, 80 50 S 130 80, 160 50 S 210 20, 240 50 S 270 80, 300 50" fill="none" stroke="#3B82F6" strokeWidth="3"/>
                    <path d="M 0 50 C 30 20, 50 20, 80 50 S 130 80, 160 50 S 210 20, 240 50 S 270 80, 300 50" fill="#3B82F6" stroke="none" opacity="0.1"/>
                </svg>
                 <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                </div>
            </div>
        </StatsCard>
      </div>
    </section>
  );
};

export default Stats;