import { useState } from 'react';
import { Menu, X, Globe, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../types';
import { PortfolioData } from '../lib/defaultData';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  data: PortfolioData;
  onOpenStudio: () => void;
}

export default function Header({ activeTab, setActiveTab, data, onOpenStudio }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <button 
            id="logo-button"
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 duration-200"
          >
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-purple-600 to-amber-600 shadow-sm">
              {/* Bisected colored circle representing Chiyo (purple) & Requiha (gold) */}
              <div id="bisected-logo" className="absolute inset-0 flex">
                <div className="w-1/2 h-full bg-purple-700"></div>
                <div className="w-1/2 h-full bg-[#855306]"></div>
              </div>
              {/* Overlaid minimal geometric frame */}
              <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border border-purple-100 bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-purple-600 animate-pulse" />
                </div>
              </div>
            </div>
            
            <span className="font-display font-bold text-xl tracking-tight text-purple-950 flex">
              {data.ownerA.nickname} <span className="text-[#855306] font-medium px-1">&</span> {data.ownerB.nickname}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-desktop-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-purple-950 font-semibold' 
                      : 'text-gray-500 hover:text-purple-800 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabOutline"
                      className="absolute inset-0 bg-purple-100/50 border border-purple-100/80 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            
            <button
              id="header-contact-cta"
              onClick={() => handleTabClick('contact')}
              className="ml-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 border border-purple-200 text-purple-950 hover:bg-purple-100 transition-all duration-200 shadow-sm"
            >
              Contact
            </button>

            <button
              id="header-studio-cta"
              onClick={onOpenStudio}
              className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-800 to-amber-650 hover:scale-102 text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Open Personalization center"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Studio</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-purple-950 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-purple-50 bg-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item, index) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    id={`nav-mobile-${item.id}`}
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex w-full items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-50 to-amber-50 border-l-4 border-purple-600 text-purple-950 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-100">
                <button
                  id="mobile-drawer-contact-cta"
                  onClick={() => handleTabClick('contact')}
                  className="w-full text-center px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-purple-700 to-[#855306] text-white hover:opacity-90 transition-opacity shadow-md"
                >
                  Send Inquiry / Collaborate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
