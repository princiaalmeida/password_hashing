import React from 'react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const sections = [
  {
    name: 'Aim',
    description: 'Understand the purpose and importance of salting passwords in modern security.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v1.5M12 16.253v1.5M17.747 8.253l-1.06 1.06M7.313 15.687l-1.06 1.06M21.253 12h-1.5M4.253 12h-1.5M17.747 15.687l-1.06-1.06M7.313 8.253l-1.06-1.06" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.753a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
      </svg>
    ),
  },
  {
    name: 'Theory',
    description: 'Explore the core concepts of hashing, salts, and rainbow table attacks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v1.5M12 16.253v1.5M17.747 8.253l-1.06 1.06M7.313 15.687l-1.06 1.06M21.253 12h-1.5M4.253 12h-1.5M17.747 15.687l-1.06-1.06M7.313 8.253l-1.06-1.06" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.753a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
      </svg>
    ),
  },
  {
    name: 'Procedure',
    description: 'See the step-by-step process for securely storing and verifying credentials.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    name: 'Demo',
    description: 'A hands-on demonstration of hashing with and without a salt.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    name: 'Conclusion',
    description: 'Summarize the key takeaways and best practices for password security.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <header className="mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-cyan-200">
          Password Hashing with Salt
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
          An interactive presentation on the principles of secure password storage using the SHA-256 algorithm.
        </p>
      </header>

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sections.map(section => (
            <div key={section.name} className="bg-brand-secondary rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-cyan-400 mb-4">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-cyan-200 mb-2">{section.name}</h2>
              <p className="text-gray-400 flex-grow mb-6">{section.description}</p>
              <button
                onClick={() => onNavigate(section.name)}
                className="mt-auto w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors duration-200"
              >
                {section.name === 'Demo' ? 'View Demo' : 'Learn More'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;