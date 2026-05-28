import { motion } from 'motion/react';
import { Calendar, Users, Rocket, Award, BookOpen } from 'lucide-react';
import { ASSETS } from '../assets';
import { PortfolioData } from '../lib/defaultData';

interface AboutViewProps {
  data: PortfolioData;
}

export default function AboutView({ data }: AboutViewProps) {
  const isDarkTheme = data.theme === 'midnight-neon';

  return (
    <div className={isDarkTheme ? "bg-[#0c0e17] py-16 px-4 sm:px-6" : "bg-[#fbfcff] py-16 px-4 sm:px-6"}>
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* Section 1: Meet Chiyo */}
        <section id="chiyo-about-card" className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`font-mono text-[10px] font-bold tracking-widest uppercase bg-purple-50 border px-3 py-1 rounded-full mb-4 ${
              isDarkTheme ? 'text-[#c084fc] bg-[#1e152a] border-[#c084fc]/20' : 'text-purple-650 bg-purple-50 border-purple-200/50'
            }`}
          >
            Creative Identity A
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-display font-bold text-3xl sm:text-4xl mb-8 ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}
          >
            Meet {data.ownerA.nickname}
          </motion.h2>

          {/* Avatar with circular gradients */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-purple-100 to-indigo-50 border border-purple-200/40 shadow-md mb-8 group"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative shadow-inner animate-[subtle-bob_6s_ease-in-out_infinite]">
              <img 
                src={ASSETS.chiyoAvatar} 
                alt="Chiyo Portrait" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Visual halo effect */}
            <div className="absolute inset-0 rounded-full border border-dashed border-purple-300/40 animate-[spin_40s_linear_infinite]"></div>
          </motion.div>

          {/* Profile Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-full border rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative ${
              isDarkTheme ? 'bg-[#181a25] border-cyan-500/10' : 'bg-white border-purple-100/50'
            }`}
          >
            <div className="flex flex-col items-start gap-4">
              <div className={`flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-full border ${
                isDarkTheme ? 'text-[#c084fc] bg-[#1e152a] border-[#c084fc]/20' : 'text-purple-700 bg-purple-50 border-purple-200/30'
              }`}>
                <Calendar className="w-3.5 h-3.5" />
                {data.ownerA.ageText}
              </div>
              
              <p className={`font-light text-base sm:text-lg leading-relaxed pt-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {data.ownerA.bio}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {data.ownerA.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`text-[10px] font-mono tracking-wider font-semibold border px-3 py-1.5 rounded-full ${
                      isDarkTheme ? 'text-[#c084fc] bg-[#1e152a] border-[#c084fc]/20' : 'text-purple-700 bg-purple-100/60 border-purple-200/50'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Meet Requiha */}
        <section id="requiha-about-card" className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`font-mono text-[10px] font-bold tracking-widest uppercase border px-3 py-1 rounded-full mb-4 ${
              isDarkTheme ? 'text-[#fbbf24] bg-[#2d1b06] border-[#fbbf24]/20' : 'text-[#855306] bg-amber-50 border-amber-200/50'
            }`}
          >
            Creative Identity B
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-display font-bold text-3xl sm:text-4xl mb-8 ${isDarkTheme ? 'text-white' : 'text-amber-950'}`}
          >
            Meet {data.ownerB.nickname}
          </motion.h2>

          {/* Avatar with circular gradients */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-amber-100 to-yellow-50 border border-amber-200/40 shadow-md mb-8 group"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative shadow-inner animate-[subtle-bob_6s_ease-in-out_infinite_reverse]">
              <img 
                src={ASSETS.requihaAvatar} 
                alt="Requiha Portrait" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Visual halo effect */}
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-450/40 animate-[spin_40s_linear_infinite_reverse]"></div>
          </motion.div>

          {/* Profile Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-full border rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative ${
              isDarkTheme ? 'bg-[#181a25] border-cyan-500/10' : 'bg-white border-amber-100/50'
            }`}
          >
            <div className="flex flex-col items-start gap-4">
              <div className={`flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-full border ${
                isDarkTheme ? 'text-[#fbbf24] bg-[#2d1b06] border-[#fbbf24]/20' : 'text-[#855306] bg-amber-50 border-amber-200/30'
              }`}>
                <Calendar className="w-3.5 h-3.5" />
                {data.ownerB.ageText}
              </div>
              
              <p className={`font-light text-base sm:text-lg leading-relaxed pt-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {data.ownerB.bio}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {data.ownerB.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`text-[10px] font-mono tracking-wider font-semibold border px-3 py-1.5 rounded-full ${
                      isDarkTheme ? 'text-[#fbbf24] bg-[#2d1b06] border-[#fbbf24]/20' : 'text-[#855306] bg-amber-100/60 border-amber-200/50'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Shared Creative Vision */}
        <section className="flex flex-col items-center pt-8">
          <motion.h3 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`font-display font-bold text-2xl sm:text-3xl mb-12 tracking-tight text-center ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}
          >
            Shared Creative Vision
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Vision Card 1: Meaningful Connections */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                isDarkTheme ? 'bg-[#181a25] border-cyan-500/10 text-white/90' : 'bg-white border-purple-50'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-lg text-purple-950 mb-2">
                Meaningful Connections
              </h4>
              <p className="text-sm font-light text-gray-500 leading-relaxed">
                Whether it's {data.ownerA.nickname}'s deep conversations or {data.ownerB.nickname}'s public speaking engagements, we believe that human connection is the foundation of all great work.
              </p>
            </motion.div>

            {/* Vision Card 2: Continuous Growth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-purple-900 border border-purple-950 rounded-2xl p-6 shadow-sm hover:shadow-md text-white/90"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-800/80 flex items-center justify-center text-purple-200 mb-4">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-lg text-white mb-2">
                Continuous Growth
              </h4>
              <p className="text-sm font-light text-purple-100/80 leading-relaxed">
                Embracing challenges to reach new heights in leadership and personal creativity, turning aspirations into concrete realities.
              </p>
            </motion.div>

            {/* Vision Card 3: Impactful Leadership */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#713f12] border border-[#5c320e] rounded-2xl p-6 shadow-sm hover:shadow-md text-amber-50/90"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-950/40 flex items-center justify-center text-amber-200 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-lg text-white mb-2">
                Impactful Leadership
              </h4>
              <p className="text-sm font-light text-amber-100/80 leading-relaxed">
                Leading with empathy and precision to inspire others in the academic and professional spheres, leaving a lasting trace.
              </p>
            </motion.div>

            {/* Vision Card 4: Academic Excellence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`border rounded-2xl p-6 shadow-sm hover:shadow-md ${
                isDarkTheme ? 'bg-[#181a25] border-cyan-500/10 text-gray-300' : 'bg-purple-50 border-purple-100'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-lg text-purple-950 mb-2">
                Academic Excellence
              </h4>
              <p className="text-sm font-light text-gray-500 leading-relaxed">
                From CBAA lectures to student council meetings at MSU, our journey is deeply rooted in learning and constant pursuit of excellence.
              </p>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
}
