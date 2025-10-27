import React from 'react';

interface NavbarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-8">
        <ul className="flex items-center justify-center flex-wrap">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => onTabChange(tab)}
                className={`text-sm sm:text-base font-medium transition-colors duration-200 px-3 py-4 border-b-2
                  ${activeTab === tab
                    ? 'text-cyan-300 border-cyan-400'
                    : 'text-gray-400 border-transparent hover:text-white'
                  }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
