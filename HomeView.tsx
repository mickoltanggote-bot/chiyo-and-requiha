import { motion } from 'motion/react';
import { Music, Trophy, ArrowUpRight } from 'lucide-react';
import { Tab } from '../types';
import { ASSETS } from '../assets';
import { PortfolioData } from '../lib/defaultData';

interface HomeViewProps {
  setActiveTab: (tab: Tab) => void;
  setHobbiesFilter?: (filter: string) => void;
  data: PortfolioData;
}

export default function HomeView({ setActiveTab, setHobbiesFilter, data }: HomeViewProps) {
  const handleExploreChiyo = () => {
    setActiveTab('about');
    setTimeout(() => {
      const element = document.getElementById('chiyo-about-card');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleExploreRequiha = () => {
    setActiveTab('about');
    setTimeout(() => {
      const element = document.getElementById('requiha-about-card');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCardClick = (tab: Tab, hashId: string) => {
    setActiveTab(tab);
    if (hashId) {
      setTimeout(() => {
        const element = document.getElementById(hashId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight effect
          element.classList.add('ring-2', 'ring-purple-500', 'ring-offset-2');
          setTimeout(() => element.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2'), 1500);
        }
      }, 200);
    }
  };

  const isDarkTheme = data.theme === 'midnight-neon';

  return (
    <div className="w-full">
      {/* 1. HERO - Owner A: The Soul of Creativity */}
      <section className="relative w-full h-[85vh] min-h-[500px] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background photo & overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ASSETS.chiyoHeroBg} 
            alt="Chiyo Background" 
            className="w-full h-full object-cover brightness-[0.7] saturate-[0.8]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-purple-950/20 to-purple-550/10 mix-blend-multiply"></div>
          {/* Lavender Soft Tint Overlay matching the screenshot theme */}
          <div className="absolute inset-0 bg-purple-900/10 backdrop-brightness-[0.95]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-purple-100 mb-4 bg-purple-950/40 backdrop-blur-md px-3 py-1 rounded-full border border-purple-400/20"
          >
            {data.ownerA.nickname.toUpperCase()}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md text-shadow"
          >
            The Soul of <br className="hidden sm:inline" /> Creativity
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-100/90 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg"
          >
            K-pop rhythm enthusiast and dedicated gamer, balancing <span className="font-semibold text-yellow-300 underline decoration-yellow-300">visual storytelling</span> inside digital realms.
          </motion.p>
          <motion.button 
            id="explore-chiyo-btn"
            onClick={handleExploreChiyo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full border-2 border-purple-300 text-purple-100 hover:text-white hover:border-white text-sm font-semibold tracking-wider uppercase transition-colors duration-200 bg-purple-950/20 backdrop-blur-sm shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            Explore {data.ownerA.nickname}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* 2. HERO - Owner B: The Spirit of Action */}
      <section className="relative w-full h-[85vh] min-h-[500px] flex flex-col justify-center items-center text-center overflow-hidden border-t border-amber-900/20">
        {/* Background photo & overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ASSETS.requihaHeroBg} 
            alt="Requiha Background" 
            className="w-full h-full object-cover brightness-[0.7] saturate-[0.8]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#422006]/35 via-[#422006]/15 to-[#fbbf24]/5 mix-blend-multiply"></div>
          {/* Soft Amber/Gold Tint Overlay */}
          <div className="absolute inset-0 bg-[#7c2d12]/10 backdrop-brightness-[0.95]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-amber-100 mb-4 bg-amber-950/50 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-50/20"
          >
            {data.ownerB.nickname.toUpperCase()}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md"
          >
            The Spirit of Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-amber-100/90 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
          >
            Varsity athlete and student leader, driving excellence through discipline and teamwork.
          </motion.p>
          <motion.button 
            id="explore-requiha-btn"
            onClick={handleExploreRequiha}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-[#855306] hover:bg-[#9a620b] border border-amber-600/30 text-white text-sm font-semibold tracking-wider uppercase transition-colors duration-200 shadow-xl flex items-center gap-2 group cursor-pointer"
          >
            Explore {data.ownerB.nickname}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* 3. Portfolio Introduction Frame */}
      <section className={isDarkTheme ? "bg-[#11131c] py-20 px-4 sm:px-6" : "bg-gradient-to-b from-[#fbfaff] to-[#f6f3fa] py-20 px-4 sm:px-6"}>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`font-display font-bold text-3xl sm:text-4xl text-center mb-8 tracking-tight ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}
          >
            The Portfolio of {data.ownerA.nickname} & {data.ownerB.nickname}
          </motion.h2>

          {/* Intro description card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.1 }}
            className={`w-full border rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left relative overflow-hidden ${
              isDarkTheme ? 'bg-[#181a25] border-cyan-500/10' : 'bg-white border-purple-100/60'
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-amber-500 to-purple-600"></div>
            
            <p className={`font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl ${isDarkTheme ? 'text-gray-300' : 'text-gray-650'}`}>
              We, <span className={`font-semibold ${isDarkTheme ? 'text-cyan-400' : 'text-purple-700'}`}>{data.ownerA.nickname}</span> and <span className={`font-semibold ${isDarkTheme ? 'text-emerald-400' : 'text-yellow-700'}`}>{data.ownerB.nickname}</span>, are proud MSU students balancing{' '}
              <span className="font-semibold text-purple-700 underline decoration-purple-150 decoration-2">creativity</span>,{' '}
              <span className="font-semibold text-indigo-700 underline decoration-indigo-150 decoration-2">gaming</span>,{' '}
              <span className="font-semibold text-[#855306] underline decoration-amber-150 decoration-2 font-display">academics</span>,{' '}
              <span className="font-semibold text-[#855306] underline decoration-amber-155 decoration-2">leadership</span>, and{' '}
              <span className="font-semibold text-[#855306] underline decoration-amber-160 decoration-2">sports</span>. 
              This portfolio represents our achievements in class <span className="font-mono text-sm underline decoration-dashed">{data.section}</span> and our continuous dedication to MSU excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Competency Cards / Quick Link Banners */}
      <section className="bg-[#f6f3fa] pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Vertical Stack / Bento Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* CARD 1: Digital Storytelling */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick('hobbies', 'hobby-literature')}
              className="group cursor-pointer relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-purple-50"
            >
              <img 
                src={ASSETS.openBook} 
                alt="Digital Storytelling" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
              <div className="absolute inset-0 bg-purple-950/20 mix-blend-overlay"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-purple-200 bg-purple-900/80 px-2.5 py-1 rounded-full border border-purple-500/20">
                  Gaming & Media
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl mt-3 text-white tracking-tight flex items-center gap-1">
                  Digital Storytelling
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-300" />
                </h3>
              </div>
            </motion.div>

            {/* CARD 2: Student Leadership */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleCardClick('hobbies', 'hobby-event')}
              className="group cursor-pointer relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-amber-50"
            >
              <img 
                src={ASSETS.studentLeadership} 
                alt="Student Leadership" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.7]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent"></div>
              <div className="absolute inset-0 bg-amber-950/10 mix-blend-overlay"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col items-start">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-amber-200 bg-[#855306]/85 px-2.5 py-1 rounded-full border border-amber-500/20">
                  Academics
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl mt-3 text-white tracking-tight flex items-center gap-1">
                  Student Leadership
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-300" />
                </h3>
                <p className="text-xs text-white/80 font-light mt-1">Navigating complexities of student governance.</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-amber-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-amber-400/25">Lead</span>
                  <span className="text-[10px] bg-amber-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-amber-400/25">Vision</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: K-Pop Culture */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick('hobbies', 'hobby-kpop')}
              className="group cursor-pointer bg-white border border-purple-50 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-all h-48"
            >
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-700 group-hover:bg-purple-150 transition-colors">
                <Music className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-xl text-purple-950 flex items-center gap-1 group-hover:text-purple-700 transition-colors">
                K-Pop Culture
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </h4>
            </motion.div>

            {/* CARD 4: Varsity Athletics */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleCardClick('hobbies', 'hobby-athletic')}
              className="group cursor-pointer bg-white border border-amber-50 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-all h-48"
            >
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-[#855306] group-hover:bg-amber-100 transition-colors">
                <Trophy className="w-6 h-6 rotate-12 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <h4 className="font-display font-bold text-xl text-[#855306] flex items-center gap-1 group-hover:text-yellow-800 transition-colors">
                Varsity Athletics
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
              </h4>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
