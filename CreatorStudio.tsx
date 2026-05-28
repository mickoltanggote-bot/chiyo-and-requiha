import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, Sparkles, Paintbrush, Mail, Trash2, 
  RotateCcw, Check, Copy, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import { PortfolioData, THEMES, CreatorProfile, CreatorHobby } from '../lib/defaultData';

interface CreatorStudioProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
}

export default function CreatorStudio({ isOpen, onClose, data, onSave, onReset }: CreatorStudioProps) {
  const [activeTab, setActiveTab] = useState<'profiles' | 'hobbies' | 'inbox' | 'style'>('profiles');
  const [editedData, setEditedData] = useState<PortfolioData>(() => JSON.parse(JSON.stringify(data)));
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  // AI assist states
  const [generatingBioFor, setGeneratingBioFor] = useState<'A' | 'B' | null>(null);
  const [draftingReplyFor, setDraftingReplyFor] = useState<number | null>(null);
  const [aiDraftResults, setAiDraftResults] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Load inquiries from localStorage on mount/open
  useEffect(() => {
    if (isOpen) {
      setEditedData(JSON.parse(JSON.stringify(data)));
      try {
        const savedLeads = localStorage.getItem('chiyo_requiha_leads');
        setInquiries(savedLeads ? JSON.parse(savedLeads) : []);
      } catch (_) {
        setInquiries([]);
      }
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  // Handle Profile changes
  const handleProfileFieldChange = (owner: 'A' | 'B', field: keyof CreatorProfile, value: string) => {
    setEditedData(prev => {
      const copy = { ...prev };
      if (owner === 'A') {
        copy.ownerA = { ...copy.ownerA, [field]: value };
      } else {
        copy.ownerB = { ...copy.ownerB, [field]: value };
      }
      return copy;
    });
  };

  const handleProfileTagsChange = (owner: 'A' | 'B', tagsString: string) => {
    const list = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    setEditedData(prev => {
      const copy = { ...prev };
      if (owner === 'A') {
        copy.ownerA = { ...copy.ownerA, tags: list };
      } else {
        copy.ownerB = { ...copy.ownerB, tags: list };
      }
      return copy;
    });
  };

  // Handle Hobby changes
  const handleHobbyFieldChange = (id: string, field: keyof CreatorHobby, value: any) => {
    setEditedData(prev => {
      const copy = { ...prev };
      copy.hobbies = copy.hobbies.map(h => {
        if (h.id === id) {
          return { ...h, [field]: value };
        }
        return h;
      });
      return copy;
    });
  };

  const handleHobbyTagsChange = (id: string, tagsString: string) => {
    const list = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    setEditedData(prev => {
      const copy = { ...prev };
      copy.hobbies = copy.hobbies.map(h => {
        if (h.id === id) {
          return { ...h, tags: list };
        }
        return h;
      });
      return copy;
    });
  };

  // Submit edits
  const handleSaveChanges = () => {
    onSave(editedData);
    setSuccessMessage('Successfully saved all website personalizations!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  // Delete an inquiry
  const handleDeleteInquiry = (id: number) => {
    const filtered = inquiries.filter(item => item.id !== id);
    setInquiries(filtered);
    try {
      localStorage.setItem('chiyo_requiha_leads', JSON.stringify(filtered));
    } catch (_) {}
  };

  // Reset website
  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset all modifications back to original settings?")) {
      onReset();
      setSuccessMessage("Website data restored to default successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1000);
    }
  };

  // AI Polish Bio using standard backend Gemini
  const handleAiPolishBio = async (owner: 'A' | 'B') => {
    setErrorMessage(null);
    setGeneratingBioFor(owner);
    const targetProfile = owner === 'A' ? editedData.ownerA : editedData.ownerB;
    
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bio',
          prompt: `Rewrite or expand upon the following biographic state into a polished, fascinating college student summary: "${targetProfile.bio}". Make it feel highly authentic and inspiring, staying under 70 words.`
        })
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || 'Failed to polish bio');

      handleProfileFieldChange(owner, 'bio', resData.text);
      setSuccessMessage(`AI polished bio for ${targetProfile.nickname}!`);
      setTimeout(() => setSuccessMessage(null), 2500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to query server Gemini credentials.');
    } finally {
      setGeneratingBioFor(null);
    }
  };

  // AI Draft Inbound reply using standard backend Gemini
  const handleAiDraftReply = async (inquiry: any) => {
    setErrorMessage(null);
    setDraftingReplyFor(inquiry.id);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reply',
          context: {
            studentA: editedData.ownerA.name,
            studentB: editedData.ownerB.name,
            studentA_nickname: editedData.ownerA.nickname,
            studentB_nickname: editedData.ownerB.nickname,
            senderName: inquiry.name,
            senderEmail: inquiry.email,
            senderMessage: inquiry.message
          },
          prompt: `Create a warm, professional, collaborative email draft responding to the message: "${inquiry.message}" from ${inquiry.name} (${inquiry.email}). Signal that Aneela(Chiyo) & Requiha look forward to working together on this idea.`
        })
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || 'Failed to draft reply');

      setAiDraftResults(prev => ({ ...prev, [inquiry.id]: resData.text }));
    } catch (err: any) {
      setErrorMessage(err.message || 'AI Reply generation failed.');
    } finally {
      setDraftingReplyFor(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    const prev = successMessage;
    setSuccessMessage('Copied to clipboard!');
    setTimeout(() => setSuccessMessage(prev), 2000);
  };

  return (
    <div id="creator-studio-dimmer" className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 bg-purple-950/40 backdrop-blur-xs">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Studio container */}
      <motion.div 
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '100vw' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-2xl h-full sm:h-[95vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col z-10 border-l border-purple-50"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-amber-50 rounded-t-none sm:rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
              ⚙️
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-purple-950">
                Creator Workspace Studio
              </h3>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                Personalize & Manage Your Website
              </p>
            </div>
          </div>
          <button 
            id="close-studio-top-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-150 text-gray-400 hover:text-purple-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {[
            { id: 'profiles', label: '👤 Edit Profiles' },
            { id: 'hobbies', label: '🎨 Hobbies Feed' },
            { id: 'inbox', label: '📥 Client Inbox' },
            { id: 'style', label: '🌈 Styles' },
          ].map((tab) => (
            <button
              id={`tab-studio-${tab.id}`}
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-purple-950 border-b-2 border-purple-700 font-bold shadow-sm'
                  : 'text-gray-400 hover:text-purple-900 hover:bg-gray-100/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action notifications banner */}
        {errorMessage && (
          <div className="m-4 mx-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-light">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="m-4 mx-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600 shrink-0" />
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Scrollable content canvas */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* 1. PROFILES TAB */}
          {activeTab === 'profiles' && (
            <div className="space-y-8">
              {/* Creator A: Chiyo */}
              <div className="bg-[#fcfaff] border border-purple-100/60 rounded-2xl p-5 space-y-4">
                <span className="font-mono text-[9px] font-bold tracking-widest text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/50">
                  CREATOR A (CHIYO / NICKNAME)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">FULL LEGAL NAME</label>
                    <input 
                      type="text"
                      value={editedData.ownerA.name}
                      onChange={(e) => handleProfileFieldChange('A', 'name', e.target.value)}
                      className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">NICKNAME ALIAS</label>
                    <input 
                      type="text"
                      value={editedData.ownerA.nickname}
                      onChange={(e) => handleProfileFieldChange('A', 'nickname', e.target.value)}
                      className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">UNIVERSITY / CBAA DETAIL</label>
                    <input 
                      type="text"
                      value={editedData.ownerA.course}
                      onChange={(e) => handleProfileFieldChange('A', 'course', e.target.value)}
                      className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">BIRTHDAY & AGE TEXT</label>
                    <input 
                      type="text"
                      value={editedData.ownerA.ageText}
                      onChange={(e) => handleProfileFieldChange('A', 'ageText', e.target.value)}
                      placeholder='Jan 20, 2006 [20 Years Old]'
                      className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">CONTACT EMAIL</label>
                  <input 
                    type="email"
                    value={editedData.ownerA.email}
                    onChange={(e) => handleProfileFieldChange('A', 'email', e.target.value)}
                    className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">BIOGRAPHY STATEMENT</label>
                    <button
                      id="ai-polish-chiyo-bio"
                      type="button"
                      disabled={generatingBioFor === 'A'}
                      onClick={() => handleAiPolishBio('A')}
                      className="text-[10px] font-mono font-bold text-purple-700 flex items-center gap-1 hover:text-purple-900 disabled:opacity-50"
                    >
                      {generatingBioFor === 'A' ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          AI POLISHING...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-purple-600 animate-bounce" />
                          AI POLISH BIO
                        </>
                      )}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    value={editedData.ownerA.bio}
                    onChange={(e) => handleProfileFieldChange('A', 'bio', e.target.value)}
                    className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none leading-relaxed text-gray-600"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-purple-900 font-bold">TAG LABELS (comma separated)</label>
                  <input 
                    type="text"
                    value={editedData.ownerA.tags.join(', ')}
                    onChange={(e) => handleProfileTagsChange('A', e.target.value)}
                    className="bg-white border border-purple-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Creator B: Requiha */}
              <div className="bg-[#fffdfa] border border-amber-100/60 rounded-2xl p-5 space-y-4">
                <span className="font-mono text-[9px] font-bold tracking-widest text-[#855306] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                  CREATOR B (REQUIHA / NICKNAME)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">FULL LEGAL NAME</label>
                    <input 
                      type="text"
                      value={editedData.ownerB.name}
                      onChange={(e) => handleProfileFieldChange('B', 'name', e.target.value)}
                      className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">NICKNAME ALIAS</label>
                    <input 
                      type="text"
                      value={editedData.ownerB.nickname}
                      onChange={(e) => handleProfileFieldChange('B', 'nickname', e.target.value)}
                      className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">UNIVERSITY / LEADERSHIP POSITION</label>
                    <input 
                      type="text"
                      value={editedData.ownerB.course}
                      onChange={(e) => handleProfileFieldChange('B', 'course', e.target.value)}
                      className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">BIRTHDAY & AGE TEXT</label>
                    <input 
                      type="text"
                      value={editedData.ownerB.ageText}
                      onChange={(e) => handleProfileFieldChange('B', 'ageText', e.target.value)}
                      placeholder='Dec 3, 2002 [23 Years Old]'
                      className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">CONTACT EMAIL</label>
                  <input 
                    type="email"
                    value={editedData.ownerB.email}
                    onChange={(e) => handleProfileFieldChange('B', 'email', e.target.value)}
                    className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">BIOGRAPHY STATEMENT</label>
                    <button
                      id="ai-polish-requiha-bio"
                      type="button"
                      disabled={generatingBioFor === 'B'}
                      onClick={() => handleAiPolishBio('B')}
                      className="text-[10px] font-mono font-bold text-amber-800 flex items-center gap-1 hover:text-amber-950 disabled:opacity-50"
                    >
                      {generatingBioFor === 'B' ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          AI POLISHING...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-600 animate-bounce" />
                          AI POLISH BIO
                        </>
                      )}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    value={editedData.ownerB.bio}
                    onChange={(e) => handleProfileFieldChange('B', 'bio', e.target.value)}
                    className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none leading-relaxed text-gray-600"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-yellow-900 font-bold">TAG LABELS (comma separated)</label>
                  <input 
                    type="text"
                    value={editedData.ownerB.tags.join(', ')}
                    onChange={(e) => handleProfileTagsChange('B', e.target.value)}
                    className="bg-white border border-amber-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. HOBBIES FEED TAB */}
          {activeTab === 'hobbies' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400 font-light italic bg-purple-50/40 p-3 rounded-xl border border-purple-50">
                You can easily customize titles, descriptions, and searchable tags for the 6 creative milestones displayed on the Hobbies stream.
              </p>
              
              <div className="space-y-6">
                {editedData.hobbies.map((hobby) => (
                  <div key={hobby.id} className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-white hover:border-purple-200 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        hobby.owner === 'chiyo' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-800'
                      }`}>
                        Owner: {hobby.owner === 'chiyo' ? editedData.ownerA.nickname : editedData.ownerB.nickname}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">{hobby.category}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-650">HOBBY/PROJECT TITLE</label>
                        <input 
                          type="text"
                          value={hobby.title}
                          onChange={(e) => handleHobbyFieldChange(hobby.id, 'title', e.target.value)}
                          className="border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-650">CATEGORY HEADING</label>
                        <input 
                          type="text"
                          value={hobby.category}
                          onChange={(e) => handleHobbyFieldChange(hobby.id, 'category', e.target.value)}
                          className="border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-650">SUMMARY DESCRIPTION</label>
                      <textarea 
                        rows={2}
                        value={hobby.text}
                        onChange={(e) => handleHobbyFieldChange(hobby.id, 'text', e.target.value)}
                        className="border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none font-light leading-relaxed"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-650">TAGS (comma separated)</label>
                      <input 
                        type="text"
                        value={hobby.tags.join(', ')}
                        onChange={(e) => handleHobbyTagsChange(hobby.id, e.target.value)}
                        className="border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CLIENT INBOX TAB */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-display font-semibold text-purple-950 text-sm">Submitted Inquiries ({inquiries.length})</h4>
                  <p className="text-[10px] text-gray-400">Visitor messages retrieved instantly from local storage cache.</p>
                </div>
                {inquiries.length > 0 && (
                  <button
                    id="clear-all-leads"
                    className="text-[10px] font-mono text-xs text-red-600 hover:text-red-700 font-semibold"
                    onClick={() => {
                      if (window.confirm("Delete all visitor messages?")) {
                        try {
                          localStorage.setItem('chiyo_requiha_leads', '[]');
                        } catch (_) {}
                        setInquiries([]);
                      }
                    }}
                  >
                    Clear All Message Logs
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-gray-150 rounded-2xl flex flex-col items-center">
                  <Mail className="w-8 h-8 text-purple-200 mb-2 animate-pulse" />
                  <p className="text-gray-450 text-xs">No guest inquiry logged yet.</p>
                  <p className="text-[10px] text-gray-400 mt-1">Submit a test message in the "Contact" tab to view it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-[#fbfcff] border border-gray-100 rounded-2xl p-5 space-y-3 shadow-xs relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-display font-bold text-sm text-purple-950">{inq.name}</h5>
                          <p className="text-[10px] font-mono text-gray-400 font-light">{inq.email} <span className="text-purple-200 px-1">•</span> Received {inq.date}</p>
                        </div>
                        <button
                          id={`delete-lead-${inq.id}`}
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="bg-white border border-gray-50 rounded-xl p-3 text-xs leading-relaxed text-gray-650 select-text">
                        {inq.message}
                      </div>

                      {/* AI Draft Response Button to help the student collaborate */}
                      <div className="pt-1.5">
                        {draftingReplyFor === inq.id ? (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-purple-700 bg-purple-50 p-2.5 rounded-lg">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Server Gemini AI drafts your collaborative response...</span>
                          </div>
                        ) : aiDraftResults[inq.id] ? (
                          <div className="space-y-3.5 bg-purple-950/5 border border-purple-100 rounded-xl p-4">
                            <div className="flex justify-between items-center pb-2 border-b border-purple-100/30">
                              <span className="font-mono text-[9px] font-bold text-purple-800 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                🤖 GEMINI AI SUGGESTED REPLY DRAFT:
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => copyToClipboard(aiDraftResults[inq.id], inq.id)}
                                  className="text-[10px] font-mono font-semibold text-purple-700 hover:text-purple-900 bg-white shadow-xs px-2.5 py-1 rounded-md border border-purple-100 flex items-center gap-1"
                                >
                                  <Copy className="w-3 h-3" /> Copy Draft
                                </button>
                                <button
                                  onClick={() => handleAiDraftReply(inq)}
                                  className="text-[10px] font-mono hover:text-purple-950 text-gray-400 bg-white shadow-xs px-2 py-1 rounded-md border border-gray-100"
                                >
                                  Redraft
                                </button>
                              </div>
                            </div>
                            <div className="text-xs leading-relaxed font-light text-purple-950/90 whitespace-pre-line bg-white/90 p-3 rounded-lg border border-purple-50 hover:shadow-inner select-all">
                              {aiDraftResults[inq.id]}
                            </div>
                          </div>
                        ) : (
                          <button
                            id={`ai-reply-btn-${inq.id}`}
                            onClick={() => handleAiDraftReply(inq)}
                            className="bg-purple-900 hover:bg-purple-950 text-white font-mono text-[10px] px-3 py-1.5 rounded-lg border border-purple-800 flex items-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                            AI ASSISTANT RESPONSE DRAFT
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. STYLE & METADATA TAB */}
          {activeTab === 'style' && (
            <div className="space-y-6">
              {/* Theme Selector */}
              <div className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-white">
                <div className="flex items-center gap-1.5">
                  <Paintbrush className="w-4 h-4 text-purple-700" />
                  <h4 className="font-display font-bold text-slate-800 text-sm">Select Active Website Visual Palette</h4>
                </div>
                <div className="grid grid-cols-1 gap-3.5">
                  {Object.entries(THEMES).map(([id, theme]) => (
                    <button
                      key={id}
                      onClick={() => setEditedData(prev => ({ ...prev, theme: id as any }))}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                        editedData.theme === id
                          ? 'border-purple-600 bg-purple-50/20'
                          : 'border-slate-100 bg-slate-50/30 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold font-display text-gray-950">{theme.name}</span>
                        <div className="flex gap-2.5 items-center">
                          <span className="w-4 h-4 rounded-full bg-purple-700 inline-block"></span>
                          {id === 'lavender-amber' && <span className="w-4 h-4 rounded-full bg-amber-500 inline-block"></span>}
                          {id === 'coral-slate' && <span className="w-4 h-4 rounded-full bg-slate-500 inline-block"></span>}
                          {id === 'rose-teal' && <span className="w-4 h-4 rounded-full bg-teal-500 inline-block"></span>}
                          {id === 'midnight-neon' && <span className="w-4 h-4 rounded-full bg-emerald-500 inline-block"></span>}
                          {id === 'emerald-gold' && <span className="w-4 h-4 rounded-full bg-yellow-500 inline-block"></span>}
                        </div>
                      </div>
                      
                      {editedData.theme === id ? (
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-gray-400">Apply Style</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course details & Academic footer labels */}
              <div className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-white">
                <h4 className="font-display font-bold text-slate-850 text-sm">Academic Metadata Groupings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-900 font-bold">EDUCATION SECTION CODE</label>
                    <input 
                      type="text"
                      value={editedData.section}
                      onChange={(e) => setEditedData(prev => ({ ...prev, section: e.target.value }))}
                      placeholder='Section: CS-301'
                      className="bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-900 font-bold">COPYRIGHT YEAR</label>
                    <input 
                      type="text"
                      value={editedData.currentYear}
                      onChange={(e) => setEditedData(prev => ({ ...prev, currentYear: e.target.value }))}
                      placeholder='2024'
                      className="bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions panel */}
        <div className="p-4 px-6 border-t border-purple-100/55 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center rounded-b-none sm:rounded-b-3xl">
          <button
            id="reset-studio-btn"
            onClick={handleResetClick}
            className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-semibold tracking-wider uppercase font-mono border border-gray-150 rounded-xl flex items-center justify-center gap-1.5 transition-colors duration-150 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            Restore Defaults
          </button>
          
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              id="cancel-studio-btn"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-150 bg-white hover:bg-gray-100 rounded-xl transition-colors text-center"
            >
              Cancel
            </button>
            <button
              id="save-studio-btn"
              onClick={handleSaveChanges}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-purple-900 hover:bg-purple-950 hover:scale-101 border border-purple-850 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save Modifications
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
