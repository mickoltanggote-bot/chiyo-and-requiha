import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import HobbiesView from './components/HobbiesView';
import ContactView from './components/ContactView';
import CreatorStudio from './components/CreatorStudio';
import { Tab } from './types';
import { DEFAULT_PORTFOLIO_DATA, PortfolioData } from './lib/defaultData';
import { Sliders, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('chiyo_requiha_custom_portfolio');
      return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO_DATA;
    } catch (_) {
      return DEFAULT_PORTFOLIO_DATA;
    }
  });

  const handleSavePortfolio = (updated: PortfolioData) => {
    setPortfolioData(updated);
    try {
      localStorage.setItem('chiyo_requiha_custom_portfolio', JSON.stringify(updated));
    } catch (_) {}
  };

  const handleResetPortfolio = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem('chiyo_requiha_custom_portfolio');
    } catch (_) {}
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} data={portfolioData} />;
      case 'about':
        return <AboutView data={portfolioData} />;
      case 'hobbies':
        return <HobbiesView setActiveTab={setActiveTab} data={portfolioData} />;
      case 'contact':
        return <ContactView data={portfolioData} />;
      default:
        return <HomeView setActiveTab={setActiveTab} data={portfolioData} />;
    }
  };

  // Determine overall wrapper styling based on selected theme
  const isDarkTheme = portfolioData.theme === 'midnight-neon';
  const wrapperClass = isDarkTheme 
    ? "min-h-screen flex flex-col justify-between bg-[#0a0c10] text-[#f1f5f9] transition-colors duration-350 font-sans" 
    : "min-h-screen flex flex-col justify-between bg-[#fafbfc] text-[#1f2937] transition-colors duration-350 font-sans";

  return (
    <div className={wrapperClass}>
      {/* Header element */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data={portfolioData} 
        onOpenStudio={() => setIsStudioOpen(true)} 
      />

      {/* Main Container with smooth view switcher animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data={portfolioData} 
        onOpenStudio={() => setIsStudioOpen(true)} 
      />

      {/* Global Floating Customizer Toggle button */}
      <motion.button
        id="global-studio-toggle-btn"
        onClick={() => setIsStudioOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-purple-700 to-amber-600 text-white rounded-full p-3.5 shadow-2xl flex items-center gap-1.5 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all group shrink-0"
        title="Open Website Customize Studio"
      >
        <Sliders className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest hidden md:inline pr-1">Customize Portfolio</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
        </span>
      </motion.button>

      {/* Creator Customize Workspace Screen */}
      <AnimatePresence>
        {isStudioOpen && (
          <CreatorStudio 
            isOpen={isStudioOpen} 
            onClose={() => setIsStudioOpen(false)}
            data={portfolioData}
            onSave={handleSavePortfolio}
            onReset={handleResetPortfolio}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
