
import React from 'react';
import type { User } from '../types';
import MenuIcon from './icons/MenuIcon';

interface HeaderProps {
  toggleSidebar: () => void;
  user: User | null;
  onAuthClick: () => void;
  quote: string;
  isLoadingQuote: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user, onAuthClick, quote, isLoadingQuote }) => {
  return (
    <header className="bg-slate-800 dark:bg-slate-900 text-white shadow-lg z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <MenuIcon />
            </button>
            <h1 className="text-xl font-bold ml-4">Earn Money</h1>
          </div>
          <div className="hidden md:block text-center mx-4 flex-1">
            {isLoadingQuote ? (
              <div className="animate-pulse h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
            ) : (
              <p className="text-sm italic text-cyan-300">{quote}</p>
            )}
          </div>
          <button
            onClick={onAuthClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {user ? `Hi, ${user.name}` : 'Sign In / Sign Up'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
