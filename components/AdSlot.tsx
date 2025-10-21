
import React from 'react';
import type { AdSlot as AdSlotType } from '../types';

interface AdSlotProps {
  ad: AdSlotType;
  isWatched: boolean;
  onToggleWatched: (id: number) => void;
}

const AdSlot: React.FC<AdSlotProps> = ({ ad, isWatched, onToggleWatched }) => {
  return (
    <div className={`border-2 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 ${isWatched ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800'}`}>
      <div className="flex-grow flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md mb-4 min-h-[100px]">
        <span className="text-gray-500 dark:text-gray-400 text-sm">Ad Placeholder #{ad.id}</span>
      </div>
      <label className="flex items-center justify-center cursor-pointer select-none">
        <input 
          type="checkbox" 
          checked={isWatched} 
          onChange={() => onToggleWatched(ad.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">Mark as watched</span>
      </label>
    </div>
  );
};

export default AdSlot;
