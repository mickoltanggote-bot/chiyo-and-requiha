import { useState } from 'react';
import { Share2, AtSign, Globe, Check, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../types';
import { PortfolioData } from '../lib/defaultData';

interface FooterProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  data: PortfolioData;
  onOpenStudio: () => void;
}

export default function Footer({ activeTab, setActiveTab, data, onOpenStudio }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleNavClick = (tabId: Tab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.ownerA.nickname} & ${data.ownerB.nickname} Portfolio`,
        text: `Check out the collaborative portfolio of ${data.ownerA.nickname} & ${data.ownerB.nickname}!`,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-[#fcfaff] border-t border-purple-50/50 py-12 md:py-16 text-center text-gray-500">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main Title branding */}
        <h3 className="font-display font-semibold tracking-widest text-sm uppercase text-gray-800 mb-2">
          {data.ownerA.nickname} & {data.ownerB.nickname}
        </h3>
        
        {/* Principal Copyright */}
        <p className="text-xs text-gray-400 mb-2 max-w-lg mx-auto leading-relaxed">
          © {data.currentYear} {data.ownerA.nickname} & {data.ownerB.nickname} | Portfolio Project | Section {data.section}
        </p>

        {/* Detailed Author Credits */}
        <p className="text-[11px] text-gray-400 max-w-xl mx-auto leading-relaxed border-t border-purple-50/70 pt-2 mb-6">
          <span className="font-medium text-gray-500">CREATED BY:</span> {data.ownerA.name} & {data.ownerB.name} <span className="text-purple-300">|</span> Section: {data.section}
        </p>

        {/* Quick navigational footer links */}
        <div className="flex justify-center items-center gap-6 sm:gap-8 mb-8 text-xs font-medium">
          {(['home', 'about', 'hobbies', 'contact'] as Tab[]).map((tabId) => (
            <button
              id={`footer-nav-${tabId}`}
              key={tabId}
              onClick={() => handleNavClick(tabId)}
              className={`capitalize transition-colors hover:text-purple-700 ${
                activeTab === tabId ? 'text-purple-800 font-semibold underline underline-offset-4' : 'text-gray-400'
              }`}
            >
              {tabId}
            </button>
          ))}
        </div>

        {/* Social utility interactions */}
        <div className="flex justify-center gap-4">
          <div className="relative">
            <button
              id="share-button"
              onClick={handleShare}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm ${
                copied 
                  ? 'bg-green-50 border-green-200 text-green-600' 
                  : 'bg-white hover:bg-purple-50 border-gray-100 text-gray-500 hover:text-purple-700'
              }`}
              title={copied ? "Copied!" : "Share Portfolio"}
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-950 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md whitespace-nowrap z-50 pointer-events-none"
                >
                  LINK COPIED!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            id="footer-email-button"
            onClick={() => handleNavClick('contact')}
            className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-purple-700 transition-all duration-200 active:scale-90 shadow-sm"
            title="Email / Contact"
          >
            <AtSign className="w-4 h-4" />
          </button>
          <button
            id="footer-studio-button"
            onClick={onOpenStudio}
            className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-purple-700 transition-all duration-200 active:scale-90 shadow-sm"
            title="Open Dynamic Creator Studio"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
