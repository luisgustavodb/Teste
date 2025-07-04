
import React, { useState } from 'react';
import { LogoIcon, MenuIcon, XIcon } from '../constants';

interface HeaderProps {
    userName: string | null;
    avatarUrl: string;
    onLogoutClick: () => void;
    onHomeClick: () => void;
    onChatClick: () => void;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, avatarUrl, onLogoutClick, onHomeClick, onChatClick, onSettingsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
      { name: 'Página Principal', handler: onHomeClick },
      { name: 'Chat com IA', handler: onChatClick },
      { name: 'Community', handler: () => {} },
      { name: 'About Us', handler: () => {} },
  ];

  const handleNavLinkClick = (handler: () => void) => {
    handler();
    setIsMenuOpen(false);
  }

  const firstName = userName ? userName.split(' ')[0] : null;

  return (
    <header className="bg-white py-4 sticky top-0 z-50 border-b border-gray-200/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={onHomeClick} className="flex items-center space-x-3 focus:outline-none" aria-label="Go to homepage">
          <LogoIcon />
          <span className="font-bold text-2xl text-gray-900">MindfulMe</span>
        </button>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                link.handler();
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={onSettingsClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue rounded-full p-1">
            {firstName && <span className="text-gray-700 font-semibold">{firstName}</span>}
            <img 
              src={avatarUrl} 
              alt="User avatar" 
              className="w-10 h-10 rounded-full object-cover" 
            />
          </button>
           <button
            onClick={onLogoutClick}
            className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-semibold py-2 px-5 rounded-lg transition-colors"
          >
            Log Out
          </button>
        </div>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-gray-900" aria-label="Open menu">
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
        </div>
      </nav>
      {isMenuOpen && (
          <div className="md:hidden mt-4 px-4 pb-4 border-t border-gray-200/80">
              <div className="flex flex-col space-y-2 mb-4">
                 {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavLinkClick(link.handler);
                      }}
                      className="block text-gray-600 hover:text-gray-900 transition-colors py-2 px-2 rounded-md text-base"
                    >
                      {link.name}
                    </a>
                  ))}
              </div>
              <div className="border-t border-gray-200/80 pt-4">
                <button onClick={() => handleNavLinkClick(onSettingsClick)} className="flex items-center space-x-3 focus:outline-none w-full text-left mb-4">
                  <img 
                    src={avatarUrl} 
                    alt="User avatar" 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  {userName && <span className="text-gray-700 font-semibold">{userName}</span>}
                </button>
                <button
                  onClick={onLogoutClick}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-gray-700 font-semibold py-3 px-5 rounded-lg transition-colors text-center"
                >
                  Log Out
                </button>
              </div>
          </div>
      )}
    </header>
  );
};

export default Header;
