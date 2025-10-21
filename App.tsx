
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AdGrid from './components/AdGrid';
import AuthScreen from './components/AuthScreen';
import ProfileScreen from './components/ProfileScreen';
import { getMotivationalQuote } from './services/geminiService';
import type { User } from './types';
import { View } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [user, setUser] = useState<User | null>(null);
  const [motivationalQuote, setMotivationalQuote] = useState<string>('Loading your daily inspiration...');
  const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(true);

  const fetchQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    try {
      const quote = await getMotivationalQuote();
      setMotivationalQuote(quote);
    } catch (error) {
      console.error("Failed to fetch motivational quote:", error);
      setMotivationalQuote("Success is not final, failure is not fatal: It is the courage to continue that counts.");
    } finally {
      setIsLoadingQuote(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleLogin = (email: string) => {
    setUser({ name: email.split('@')[0], email: email });
    setCurrentView(View.Home);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.Home);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Auth:
        return <AuthScreen onLogin={handleLogin} />;
      case View.Profile:
        return user ? <ProfileScreen user={user} onLogout={handleLogout} /> : <AuthScreen onLogin={handleLogin} />;
      case View.Home:
      default:
        return <AdGrid />;
    }
  };

  return (
    <div className="flex h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          user={user} 
          onAuthClick={() => setCurrentView(user ? View.Profile : View.Auth)} 
          quote={motivationalQuote}
          isLoadingQuote={isLoadingQuote}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
