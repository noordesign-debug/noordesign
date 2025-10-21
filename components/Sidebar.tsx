
import React, { useRef, useEffect } from 'react';
import { View } from '../types';
import CloseIcon from './icons/CloseIcon';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setCurrentView: (view: View) => void;
}

const NavLink: React.FC<{
  view: View;
  label: string;
  onClick: (view: View) => void;
}> = ({ view, label, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick(view);
    }}
    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700 text-gray-300 hover:text-white"
  >
    {label}
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, setCurrentView }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setIsOpen(false);
  };
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-slate-800 dark:bg-slate-900 text-white w-64 p-5 transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-slate-700">
             <CloseIcon />
          </button>
        </div>
        <nav>
          <NavLink view={View.Home} label="Home" onClick={handleNavigation} />
          <NavLink view={View.Profile} label="Profile" onClick={handleNavigation} />
          <NavLink view={View.Referrals} label="Referrals" onClick={handleNavigation} />
          <NavLink view={View.Earnings} label="Earnings" onClick={handleNavigation} />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
