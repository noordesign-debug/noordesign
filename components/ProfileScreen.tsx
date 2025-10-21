
import React from 'react';
import type { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          src={`https://i.pravatar.cc/150?u=${user.email}`}
          alt="User Avatar"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          Welcome, {user.name}!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>
        
        <div className="text-left space-y-4 my-8">
            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold text-green-500">$123.45</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Referrals</p>
                <p className="text-2xl font-bold text-blue-500">12</p>
            </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
