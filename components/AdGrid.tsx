
import React, { useState } from 'react';
import type { AdSlot as AdSlotType } from '../types';
import AdSlot from './AdSlot';

const initialAdSlots: AdSlotType[] = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));

const AdGrid: React.FC = () => {
  const [adSlots] = useState<AdSlotType[]>(initialAdSlots);
  const [watchedAds, setWatchedAds] = useState<Set<number>>(new Set());
  const [earnings, setEarnings] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleToggleWatched = (adId: number) => {
    setWatchedAds(prev => {
      const newWatched = new Set(prev);
      if (newWatched.has(adId)) {
        newWatched.delete(adId);
      } else {
        newWatched.add(adId);
      }
      return newWatched;
    });
  };

  const handleSubmit = () => {
    const newEarnings = watchedAds.size * 0.10; // Example earning
    setEarnings(prev => prev + newEarnings);
    setWatchedAds(new Set());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600 rounded-lg">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300">Important Ad Policy Notice</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Displaying many ads on one screen can violate ad network policies (like AdMob) and create a poor user experience. This layout is a technical demonstration. For a real app, consider alternatives like rewarded ads or a paginated list.
          </p>
      </div>
      
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {adSlots.map(ad => (
          <AdSlot 
            key={ad.id} 
            ad={ad} 
            isWatched={watchedAds.has(ad.id)}
            onToggleWatched={handleToggleWatched} 
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-lg">Total Earnings: <span className="text-green-500">${earnings.toFixed(2)}</span></p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{watchedAds.size} ad{watchedAds.size !== 1 ? 's' : ''} selected for submission.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={watchedAds.size === 0}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          Submit & Earn
        </button>
      </div>

      {showSuccess && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl animate-bounce">
          Earnings Submitted!
        </div>
      )}
    </div>
  );
};

export default AdGrid;
