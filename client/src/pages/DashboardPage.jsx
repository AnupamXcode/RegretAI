import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, LogOut, Loader2, Target, TrendingUp, AlertTriangle, 
  History as HistoryIcon, BookOpen, Zap 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.decisionTitle.trim()) {
      toast.error('Decision title is required');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/predict', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPrediction(res.data);
      setSuccessMessage('Decision saved to your history!');
      toast.success('Analysis complete & saved!');
      
      // Reset form
      setFormData({
        decisionTitle: '',
        description: '',
        importance: 'medium',
        timeHorizon: 'short-term',
        riskTolerance: 50,
        uncertainty: 50,
        emotion: 'neutral'
      });

      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById('ai-results');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const emotionEmoji = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐',
    confused: '🤔'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/intro" className="flex items-center space-x-3 group">
            <div className="p-2 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-all">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-black tracking-tight">FUTURE<span className="text-cyan-400">SENSE</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-black uppercase tracking-widest text-slate-500">
              User: <span className="text-cyan-400">{user?.name || 'Guest'}</span>
            </span>
            <div className="flex gap-2">
              <Link 
                to="/history" 
                className="p-3 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-all border border-white/5"
                title="View History"
              >
                <HistoryIcon className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleLogout}
                className="p-3 bg-white/5 rounded-full hover:bg-rose-500/20 transition-all border border-white/5"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-slate-400 hover:text-rose-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Form Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="glass p-8 rounded-3xl border border-cyan-500/20 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Decision Input</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Decision Title */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
                    Decision Title
                  </label>
                  <input
                    type="text"
                    name="decisionTitle"
                    value={formData.decisionTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Starting a new startup"
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white placeholder:text-slate-400 font-semibold transition-all hover:border-cyan-300/50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide more context about your decision..."
                    rows="3"
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white placeholder:text-slate-400 font-semibold transition-all hover:border-cyan-300/50 resize-none"
                  />
                </div>

                {/* Importance */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-300 mb-3">
                    Importance
                  </label>
                  <select
                    name="importance"
                    value={formData.importance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold transition-all hover:border-cyan-300/60 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Time Horizon */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-300 mb-3">
                    Time Horizon
                  </label>
                  <select
                    name="timeHorizon"
                    value={formData.timeHorizon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold transition-all hover:border-cyan-300/60 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="short-term">Short-term (Days/Weeks)</option>
                    <option value="long-term">Long-term (Months/Years)</option>
                  </select>
                </div>

                {/* Emotion */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-300 mb-3">
                    Current Emotion {emotionEmoji[formData.emotion]}
                  </label>
                  <select
                    name="emotion"
                    value={formData.emotion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold transition-all hover:border-cyan-300/60 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="happy">😊 Happy</option>
                    <option value="neutral">😐 Neutral</option>
                    <option value="confused">🤔 Confused</option>
                    <option value="sad">😢 Sad</option>
                    <option value="angry">😠 Angry</option>
                  </select>
                </div>

                {/* Risk Tolerance Slider */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
                    Risk Tolerance: <span className="text-white">{formData.riskTolerance}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.riskTolerance}
                    onChange={(e) => handleSliderChange('riskTolerance', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* Uncertainty Slider */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
                    Uncertainty: <span className="text-white">{formData.uncertainty}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.uncertainty}
                    onChange={(e) => handleSliderChange('uncertainty', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-black uppercase text-sm tracking-[0.2em] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Calculate Future Regret
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <AnimatePresence>
              {prediction ? (
                <motion.div
                  id="ai-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {successMessage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold"
                    >
                      ✅ {successMessage}
                    </motion.div>
                  )}

                  {/* Regret Probability Card */}
                  <div className="glass p-8 rounded-3xl border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-2xl font-black tracking-tight">Regret Analysis</h3>
                    </div>

                    <div className="mb-8">
                      <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                        {prediction.regretProbability}%
                      </div>
                      <p className="text-slate-400">Regret Probability</p>
                    </div>

                    {/* Probability Bar */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                        <span>Low Risk</span>
                        <span>High Risk</span>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.regretProbability}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            prediction.regretProbability > 70 
                              ? 'bg-gradient-to-r from-red-500 to-orange-500'
                              : prediction.regretProbability > 40
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-green-500 to-cyan-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Risk Level Indicator */}
                    <div className={`inline-block px-4 py-2 rounded-full font-black uppercase text-xs tracking-widest ${
                      prediction.regretProbability > 70 
                        ? 'bg-red-500/20 text-red-400'
                        : prediction.regretProbability > 40
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {prediction.regretProbability > 70 
                        ? '⚠️ High Risk'
                        : prediction.regretProbability > 40
                        ? '⚡ Moderate Risk'
                        : '✅ Low Risk'}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="glass p-8 rounded-3xl border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                      <h3 className="text-xl font-black tracking-tight">AI Explanation</h3>
                    </div>
                    <p className="text-slate-300">{prediction.explanation}</p>
                  </div>

                  {/* AI Wisdom */}
                  <div className="glass p-8 rounded-3xl border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-indigo-400" />
                      <h3 className="text-xl font-black tracking-tight">AI Wisdom</h3>
                    </div>
                    <p className="text-slate-300 italic">{prediction.aiWisdom}</p>
                  </div>

                  {/* Suggestions */}
                  <div className="glass p-8 rounded-3xl border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-xl font-black tracking-tight">Suggestions</h3>
                    </div>
                    <ul className="space-y-2">
                      {prediction.suggestions?.map((suggestion, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Confidence */}
                  <div className="glass p-6 rounded-3xl border border-cyan-500/20">
                    <p className="text-sm text-slate-400">
                      Analysis Confidence: <span className="font-black text-cyan-400">{prediction.confidence}%</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass p-12 rounded-3xl border border-cyan-500/20 flex flex-col items-center justify-center min-h-96"
                >
                  <div className="p-4 bg-cyan-500/10 rounded-full mb-6">
                    <Sparkles className="w-12 h-12 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight">Waiting for Analysis</h3>
                  <p className="text-slate-400 text-center">
                    Fill out the form on the left and hit "Calculate Future Regret" to get started!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
