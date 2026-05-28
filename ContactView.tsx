import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Zap, Mail, CheckCircle2, RefreshCw } from 'lucide-react';
import { ASSETS } from '../assets';
import { PortfolioData } from '../lib/defaultData';

interface ContactViewProps {
  data: PortfolioData;
}

export default function ContactView({ data }: ContactViewProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('chiyo_requiha_leads');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  const isDarkTheme = data.theme === 'midnight-neon';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all fields before submitting.');
      return;
    }

    setErrorMessage(null);
    setStatus('submitting');
    setTimeout(() => {
      const newSubmission = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      };
      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem('chiyo_requiha_leads', JSON.stringify(updated));
      } catch (_) {}
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className={isDarkTheme ? "bg-[#0c0e17] py-16 px-4 sm:px-6 animate-fadeIn" : "bg-[#fbfcff] py-16 px-4 sm:px-6"}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-display font-bold text-4xl sm:text-5xl tracking-tight ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}
          >
            Let's Create Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`font-light text-base sm:text-lg leading-relaxed ${isDarkTheme ? 'text-gray-350' : 'text-gray-500'}`}
          >
            Whether you're looking for creative direction, student leadership alignment, or tactical development, we are here to collaborate.
          </motion.p>
        </div>

        {/* Main Grid: Form Left, Cards Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
          
          {/* Card Form container */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col h-full justify-between border ${
              isDarkTheme ? 'bg-[#181a25] border-cyan-500/10' : 'bg-white border-purple-50'
            }`}
          >
            <div className={`flex items-center gap-2 mb-6 border-b pb-4 ${isDarkTheme ? 'border-cyan-500/10' : 'border-purple-50'}`}>
              <Send className="w-5 h-5 text-purple-600" />
              <h3 className={`font-display font-semibold text-lg uppercase tracking-wider ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}>
                Send a Message
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center text-center py-12 space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                  <h4 className={`font-display font-bold text-xl ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}>Inquiry Received!</h4>
                  <p className="text-xs text-gray-500 font-light max-w-xs">
                    Thank you for reaching out to us. We will get back to you with insights shortly.
                  </p>
                  <button
                    id="submit-another-btn"
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-55 border border-red-200/50 text-red-600 rounded-xl text-xs font-light text-center"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">
                      NAME
                    </label>
                    <input
                      id="form-name-input"
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={status === 'submitting'}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all ${
                        isDarkTheme ? 'bg-[#202336] border-neutral-700 text-white focus:bg-[#202336]' : 'bg-gray-50/50 border-purple-100/50 text-purple-950 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">
                      EMAIL
                    </label>
                    <input
                      id="form-email-input"
                      type="email"
                      name="email"
                      required
                      placeholder="email@school.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={status === 'submitting'}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all ${
                        isDarkTheme ? 'bg-[#202336] border-neutral-700 text-white focus:bg-[#202336]' : 'bg-gray-50/50 border-purple-100/50 text-purple-950 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">
                      MESSAGE
                    </label>
                    <textarea
                      id="form-message-input"
                      name="message"
                      required
                      rows={4}
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={status === 'submitting'}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none ${
                        isDarkTheme ? 'bg-[#202336] border-neutral-700 text-white focus:bg-[#202336]' : 'bg-gray-50/50 border-purple-100/50 text-purple-950 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-message-btn"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl text-xs font-semibold tracking-widest uppercase text-white bg-purple-900 hover:bg-purple-950 disabled:opacity-50 transition-all font-mono border border-purple-800 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        PROCESSING INQUIRY...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND INQUIRY
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Cards list */}
          <div className="space-y-6">
            {/* Card Profile 1: Aneela Emina (Chiyo Perspective) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col space-y-4 border ${
                isDarkTheme ? 'bg-[#181a25] border-cyan-500/10 text-white' : 'bg-[#fbf9ff] border-purple-100/70'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-display font-bold text-xl leading-none ${isDarkTheme ? 'text-white' : 'text-purple-950'}`}>
                    {data.ownerA.name}
                  </h4>
                  <span className="font-mono text-[9px] font-bold text-purple-400 tracking-wider uppercase mt-1.5 inline-block">
                    {data.ownerA.course}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Email utility path */}
              <div className={`flex items-center gap-2.5 text-xs font-light border-y py-3 mt-3 ${
                isDarkTheme ? 'border-cyan-500/10 text-gray-350' : 'border-purple-100/40 text-gray-500'
              }`}>
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <a href={`mailto:${data.ownerA.email}`} className="hover:text-purple-400 hover:underline">
                  {data.ownerA.email}
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Creative Design', 'Behance'].map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] font-mono tracking-wide bg-purple-100/10 border border-purple-200/30 text-purple-400 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card Profile 2: Requiha Yana (Athletic Precision) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', damping: 25, delay: 0.1 }}
              className="bg-[#1e1b1e] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-display font-bold text-xl text-white leading-none">
                    {data.ownerB.name}
                  </h4>
                  <span className="font-mono text-[9px] font-bold text-yellow-500 tracking-wider uppercase mt-1.5 inline-block">
                    {data.ownerB.course}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-yellow-500">
                  <Zap className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Email utility path */}
              <div className="flex items-center gap-2.5 text-xs text-stone-300 font-light border-y border-neutral-800 py-3 mt-3">
                <Mail className="w-3.5 h-3.5 text-yellow-500" />
                <a href={`mailto:${data.ownerB.email}`} className="hover:text-yellow-400 hover:underline">
                  {data.ownerB.email}
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Leadership', 'LinkedIn'].map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] font-mono tracking-wide bg-amber-500/10 border border-amber-500/20 text-yellow-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-44 rounded-3xl overflow-hidden shadow-sm border border-purple-50 group mb-4"
        >
          <img 
            src={ASSETS.achievementBanner} 
            alt="Achievement banner background" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-[0.8]"
            referrerPolicy="no-referrer"
          />
          {/* Accent light banner overlay */}
          <div className="absolute inset-0 bg-purple-950/20 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono font-bold text-xs tracking-[0.25em] uppercase text-purple-950 bg-white border border-purple-50 shadow-lg px-6 py-2.5 rounded-full animate-pulse">
              ACHIEVEMENT FOCUSED
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
