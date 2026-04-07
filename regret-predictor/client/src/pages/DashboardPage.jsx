import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, History as HistoryIcon, LogOut, Loader2, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    decisionTitle: '',
    description: '',
    importance: 'medium',
    timeHorizon: 'short-term',
    riskTolerance: 50,
    uncertainty: 50,
    emotion: 'neutral'
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/predict', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrediction(res.data);
      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById('ai-results');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      // Fallback for demo
      setPrediction({
        regretProbability: 45,
        confidence: 92,
        explanation: "Analysis indicates a balanced risk-to-reward ratio with current inputs.",
        aiWisdom: "Stay grounded and focus on the immediate next step.",
        suggestions: ["Breathe", "Research competitors"]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 perspective-container">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
             <div className="p-3 bg-cyan-500 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)]">
               <Sparkles className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-3xl font-black tracking-tight uppercase">FUTURE<span className="text-cyan-400">SENSE</span> AI</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs font-black uppercase tracking-widest text-slate-500">Demo User: <span className="text-cyan-400">{user?.name || 'Guest'}</span></span>
            <button 
              onClick={handleLogout}
              className="p-4 bg-white/5 rounded-2xl hover:bg-rose-500/20 transition-all border border-white/5"
            >
              <LogOut className="w-6 h-6 text-slate-400 hover:text-rose-500" />
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Panel */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card space-y-8">
              <h2 className="text-2xl font-black mb-8 flex items-center">
                <Target className="mr-3 text-cyan-400" /> DECISION INPUT
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="label-text">Decision Title</label>
                  <input 
                    className="input-field" 
                    placeholder="e.g. Starting a new startup"
                    value={formData.decisionTitle}
                    onChange={(e) => setFormData({...formData, decisionTitle: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Importance</label>
                    <select 
                      className="input-field"
                      value={formData.importance}
                      onChange={(e) => setFormData({...formData, importance: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Emotion</label>
                    <select 
                      className="input-field"
                      value={formData.emotion}
                      onChange={(e) => setFormData({...formData, emotion: e.target.value})}
                    >
                      <option value="happy">Happy 😊</option>
                      <option value="neutral">Neutral 😐</option>
                      <option value="confused">Confused 🤔</option>
                      <option value="sad">Sad 😢</option>
                      <option value="angry">Angry 😠</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="label-text text-[10px] font-black tracking-[0.2em] opacity-50 mb-4 block">Risk Tolerance ({formData.riskTolerance}%)</label>
                    <input 
                      type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      value={formData.riskTolerance}
                      onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label-text text-[10px] font-black tracking-[0.2em] opacity-50 mb-4 block">Uncertainty ({formData.uncertainty}%)</label>
                    <input 
                      type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      value={formData.uncertainty}
                      onChange={(e) => setFormData({...formData, uncertainty: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.3em]" disabled={loading}>
                {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Calculate Future Regret'}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5" id="ai-results">
            <AnimatePresence mode="wait">
              {prediction ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card tilt-card border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black flex items-center">
                      <Zap className="mr-3 text-cyan-400" /> AI VERDICT
                    </h2>
                    <div className="px-4 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                      Confidence: {prediction.confidence}%
                    </div>
                  </div>

                  <div className="text-center mb-12">
                    <div className="text-8xl font-black text-gradient leading-none mb-2">
                       {prediction.regretProbability}%
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Regret Probability Index</p>
                  </div>

                  {prediction.aiWisdom && (
                    <div className="mb-08 p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <TrendingUp size={48} />
                      </div>
                      <p className="label-text mb-2 text-cyan-400">Gemini Insight</p>
                      <p className="text-xl font-bold leading-tight text-white mb-2 italic">
                        "{prediction.aiWisdom}"
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 mt-8">
                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                      <p className="label-text text-slate-500 mb-2">Detailed Analysis</p>
                      <p className="text-slate-300 leading-relaxed italic text-sm">
                        {prediction.explanation}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                         <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Key Action</p>
                         <p className="text-xs font-bold">{prediction.suggestions?.[0] || 'Observe Trends'}</p>
                       </div>
                       <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                         <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Risk Factor</p>
                         <p className="text-xs font-bold">Uncertainty Peak</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-card opacity-40 border-dashed flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="p-6 bg-white/5 rounded-full mb-6">
                    <AlertTriangle className="w-12 h-12 text-slate-600" />
                  </div>
                  <p className="text-xl font-black uppercase tracking-widest text-slate-600">Waiting for Data</p>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Fill the form and hit calculate</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
