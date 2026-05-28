import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Award, Gamepad2, Palette, Disc, Calendar, Flame, Trophy, Sparkles, Star } from 'lucide-react';
import { Tab } from '../types';
import { PortfolioData } from '../lib/defaultData';

interface HobbiesViewProps {
  setActiveTab?: (tab: Tab) => void;
  data: PortfolioData;
}

export default function HobbiesView({ setActiveTab, data }: HobbiesViewProps) {
  const [selectedStat, setSelectedStat] = useState<boolean>(false);
  const [activeOwnerFilter, setActiveOwnerFilter] = useState<'all' | 'chiyo' | 'requiha'>('all');

  const getIcon = (id: string) => {
    switch (id) {
      case 'hobby-literature': return Book;
      case 'hobby-athletic': return Flame;
      case 'hobby-gaming': return Gamepad2;
      case 'hobby-painting': return Palette;
      case 'hobby-kpop': return Disc;
      case 'hobby-event': return Award;
      default: return Star;
    }
  };

  const filteredHobbies = data.hobbies.filter(item => 
    activeOwnerFilter === 'all' ? true : item.owner === activeOwnerFilter
  );

  const isDarkTheme = data.theme === 'midnight-neon';

  return (
    <div className={isDarkTheme ? "bg-[#0c0e17] py-16 px-4 sm:px-6 animate-fadeIn" : "bg-[#fbfcff] py-16 px-4 sm:px-6"}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header split descriptions */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 border-b pb-12 mb-12 ${
          isDarkTheme ? 'border-cyan-500/10' : 'border-purple-100/70'
        }`}>
          {/* Chiyo column header */}
          <div className="flex flex-col border-l-4 border-purple-600 pl-6 space-y-3">
            <span className="font-mono text-[10px] font-bold tracking-widest text-purple-700 uppercase">
              The Creative Mind
            </span>
            <h2 className={`font-display font-semibold text-2xl sm:text-3xl ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}>
              {data.ownerA.nickname}'s Atmosphere
            </h2>
            <p className={`text-sm font-light leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              Exploring the ethereal worlds of literature, digital landscapes, and the vibrant rhythms of global pop culture.
            </p>
          </div>

          {/* Requiha column header */}
          <div className="flex flex-col border-l-4 border-amber-600 pl-6 space-y-3">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#855306] uppercase">
              The Strategic Leader
            </span>
            <h2 className={`font-display font-semibold text-2xl sm:text-3xl ${isDarkTheme ? 'text-white' : 'text-amber-955'}`}>
              {data.ownerB.nickname}'s Precision
            </h2>
            <p className={`text-sm font-light leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              Driven by athletic discipline, artistic expression through fine arts, and a passion for organizational excellence.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Activities' },
            { id: 'chiyo', label: `${data.ownerA.nickname}'s Hobbies` },
            { id: 'requiha', label: `${data.ownerB.nickname}'s Hobbies` },
          ].map((btn) => (
            <button
              id={`filter-hobbies-${btn.id}`}
              key={btn.id}
              onClick={() => setActiveOwnerFilter(btn.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                activeOwnerFilter === btn.id
                  ? 'bg-purple-950 text-white border-purple-950 shadow-sm font-bold'
                  : 'bg-white text-gray-400 border-gray-100 hover:text-purple-950'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Activity feed list */}
        <div className="space-y-16">
          {filteredHobbies.map((hobby, index) => {
            const IconComponent = getIcon(hobby.id);
            const isChiyo = hobby.owner === 'chiyo';
            
            return (
              <motion.div
                id={hobby.id}
                key={hobby.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center border p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow ${
                  isDarkTheme ? 'bg-[#181a25] border-cyan-500/10' : 'bg-white border-gray-5 * 10'
                }`}
              >
                {/* Banner Image */}
                <div className="w-full md:w-5/12 h-56 rounded-2xl overflow-hidden relative group shrink-0 shadow-inner">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isChiyo ? 'from-purple-950/20' : 'from-amber-950/25'
                  } to-transparent`}></div>
                </div>

                {/* Info block */}
                <div className="flex-1 flex flex-col items-start space-y-4">
                  <div className="flex items-center gap-1.5">
                    <IconComponent className={`w-4 h-4 ${isChiyo ? 'text-purple-600' : 'text-amber-600'}`} />
                    <span className={`font-mono text-[9px] font-bold tracking-widest ${
                      isChiyo ? 'text-purple-700 bg-purple-50' : 'text-amber-800 bg-amber-50'
                    } px-2.5 py-0.5 rounded-full border ${isChiyo ? 'border-purple-200/30' : 'border-amber-200/30'}`}>
                      {hobby.category}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold text-2xl ${isChiyo ? 'text-purple-950' : 'text-amber-950'}`}>
                    {hobby.title}
                  </h3>

                  <p className={`font-light text-sm sm:text-base leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                    {hobby.text}
                  </p>

                  {/* Special Modal stats button */}
                  {hobby.hasSpecialButton && (
                    <button
                      id="view-stats-btn"
                      onClick={() => setSelectedStat(true)}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-amber-800 hover:bg-amber-900 text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      {hobby.buttonText || 'View Stats'}
                    </button>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hobby.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[9px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-full ${
                          isChiyo 
                            ? 'text-purple-600 bg-purple-100/55' 
                            : 'text-amber-700 bg-amber-100/55'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Road: Where Two Worlds Meet */}
        <section className={`mt-24 pt-12 border-t flex flex-col items-center ${
          isDarkTheme ? 'border-cyan-500/10' : 'border-purple-100/50'
        }`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-amber-100 flex items-center justify-center text-purple-700 mb-6">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          
          <h3 className={`font-display font-semibold text-2xl sm:text-3xl tracking-tight text-center mb-4 ${
            isDarkTheme ? 'text-white' : 'text-purple-900'
          }`}>
            Where Two Worlds Meet
          </h3>

          <p className={`text-center font-light max-w-2xl leading-relaxed text-sm sm:text-base mb-10 ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-500'
          }`}>
            Whether it's the tactical focus required in a MSUone Cup match or the coordination of a student-led event, {data.ownerA.nickname} and {data.ownerB.nickname} find common ground in the pursuit of excellence and the joy of shared interests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              id="show-chiyo-highlights"
              onClick={() => {
                if (setActiveTab) setActiveTab('about');
                setTimeout(() => {
                  document.getElementById('chiyo-about-card')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              className="px-8 py-3.5 rounded-full bg-purple-800 text-white hover:bg-purple-900 text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 text-center cursor-pointer"
            >
              Explore {data.ownerA.nickname}'s Portfolio
            </button>
            <button
              id="show-requiha-highlights"
              onClick={() => {
                if (setActiveTab) setActiveTab('about');
                setTimeout(() => {
                  document.getElementById('requiha-about-card')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              className={`px-8 py-3.5 rounded-full border-2 text-xs font-semibold uppercase tracking-widest transition-all active:scale-95 text-center cursor-pointer ${
                isDarkTheme ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-950/20' : 'border-purple-900 text-purple-900 hover:bg-purple-50'
              }`}
            >
              Explore {data.ownerB.nickname}'s Work
            </button>
          </div>
        </section>

      </div>

      {/* Stats Modal */}
      <AnimatePresence>
        {selectedStat && (
          <div id="stats-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStat(false)}
              className="absolute inset-0 bg-purple-950/50 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white border border-purple-50 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <h4 className="font-display font-bold text-xl text-amber-950 mb-2 flex items-center gap-1.5 border-b border-amber-50 pb-3">
                <Trophy className="w-5 h-5 text-amber-600" />
                Tournament Track & Milestones
              </h4>
              <p className="text-xs text-amber-800/80 mb-6 bg-amber-50 px-3 py-1 pb-1.5 rounded-lg border border-amber-200/30">
                A brief timeline of {data.ownerB.nickname}'s athletic leadership inside MSUTeam Sports leagues.
              </p>

              {/* Timeline Items */}
              <div className="space-y-4">
                {[
                  { year: '2023', match: 'Pickleball Intercollegiate Cup', place: 'Gold Medal / Title Captain' },
                  { year: '2023', match: 'MSU Annual Volleyball Tournament', place: 'MVP & Team Captain' },
                  { year: '2024', match: 'Regionals Athletic Open Qualifier', place: 'Finalist / Double division' },
                ].map((item, id) => (
                  <div key={id} className="flex gap-4 items-start">
                    <span className="font-mono text-xs font-bold bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded border border-amber-300/30 shrink-0">
                      {item.year}
                    </span>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-gray-700 leading-tight">{item.match}</p>
                      <p className="text-gray-400 mt-0.5">{item.place}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                id="close-modal-btn"
                onClick={() => setSelectedStat(false)}
                className="mt-8 w-full py-2.5 rounded-full text-xs font-semibold bg-purple-900 hover:bg-purple-950 text-white text-center tracking-widest uppercase transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer animate-[pulse_2s_infinite]"
              >
                Close Timeline
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
