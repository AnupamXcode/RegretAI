import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History as HistoryIcon, Search, Trash2, Sparkles, AlertTriangle, 
  ArrowLeft, Filter, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const HistoryPage = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    importance: '',
    emotion: '',
    minRegret: '',
    maxRegret: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  const fetchHistory = async (appliedFilters = {}) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (appliedFilters.importance) params.append('importance', appliedFilters.importance);
      if (appliedFilters.emotion) params.append('emotion', appliedFilters.emotion);
      if (appliedFilters.minRegret) params.append('minRegret', appliedFilters.minRegret);
      if (appliedFilters.maxRegret) params.append('maxRegret', appliedFilters.maxRegret);

      const res = await axios.get(`/api/decisions?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDecisions(res.data.decisions || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(filters);
  }, [searchTerm]);

  const handleApplyFilters = () => {
    setLoading(true);
    fetchHistory(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      importance: '',
      emotion: '',
      minRegret: '',
      maxRegret: ''
    });
    setSearchTerm('');
    setShowFilters(false);
    setLoading(true);
    fetchHistory({});
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/decisions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDecisions(decisions.filter(d => d._id !== id));
      toast.success('Decision removed from history');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const getRiskColor = (regret) => {
    if (regret > 70) return 'bg-red-500/10 border-red-500/30 text-red-400';
    if (regret > 40) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-green-500/10 border-green-500/30 text-green-400';
  };

  const getRiskLabel = (regret) => {
    if (regret > 70) return '⚠️ High Risk';
    if (regret > 40) return '⚡ Moderate';
    return '✅ Low Risk';
  };

  const emotionEmoji = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐',
    confused: '🤔'
  };

  if (loading && decisions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 gap-6">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
        <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs">Loading Your History...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-2xl font-black tracking-tight">Decision <span className="text-cyan-400">History</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white/5 rounded-full hover:bg-cyan-500/20 transition-all border border-white/5"
              title="Toggle Filters"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 glass p-6 rounded-3xl border border-cyan-500/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">Filter Results</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Importance Filter */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2 block">
                    Importance
                  </label>
                  <select
                    value={filters.importance}
                    onChange={(e) => setFilters({ ...filters, importance: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold text-sm transition-all hover:border-cyan-300/60 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      paddingRight: '2rem'
                    }}
                  >
                    <option value="">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Emotion Filter */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2 block">
                    Emotion
                  </label>
                  <select
                    value={filters.emotion}
                    onChange={(e) => setFilters({ ...filters, emotion: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold text-sm transition-all hover:border-cyan-300/60 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      paddingRight: '2rem'
                    }}
                  >
                    <option value="">All</option>
                    <option value="happy">😊 Happy</option>
                    <option value="neutral">😐 Neutral</option>
                    <option value="confused">🤔 Confused</option>
                    <option value="sad">😢 Sad</option>
                    <option value="angry">😠 Angry</option>
                  </select>
                </div>

                {/* Min Regret Filter */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2 block">
                    Min Regret %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={filters.minRegret}
                    onChange={(e) => setFilters({ ...filters, minRegret: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold text-sm transition-all hover:border-cyan-300/60"
                    placeholder="0"
                  />
                </div>

                {/* Max Regret Filter */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2 block">
                    Max Regret %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={filters.maxRegret}
                    onChange={(e) => setFilters({ ...filters, maxRegret: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-2 border-cyan-500/40 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white font-semibold text-sm transition-all hover:border-cyan-300/60"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleApplyFilters}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-white/5 rounded-lg font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search decisions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 border-2 border-cyan-500/40 rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-300 outline-none text-white placeholder:text-slate-400 font-semibold transition-all hover:border-cyan-300/50"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm text-slate-400">
            Found <span className="font-black text-cyan-400">{decisions.length}</span> decision{decisions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Decision Cards */}
        <AnimatePresence>
          {decisions.length > 0 ? (
            <div className="grid gap-6">
              {decisions.map((decision, index) => (
                <motion.div
                  key={decision._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass p-6 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black mb-3 truncate group-hover:text-cyan-400 transition-colors">
                        {decision.decisionTitle}
                      </h3>

                      <div className="flex flex-wrap gap-3 mb-4">
                        {/* Importance Badge */}
                        <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-black uppercase tracking-widest text-blue-400">
                          {decision.importance}
                        </div>

                        {/* Emotion Badge */}
                        <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-black uppercase tracking-widest text-purple-400">
                          {emotionEmoji[decision.emotion]} {decision.emotion}
                        </div>

                        {/* Risk Badge */}
                        <div className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${getRiskColor(decision.prediction?.regretProbability || 0)}`}>
                          {getRiskLabel(decision.prediction?.regretProbability || 0)}
                        </div>
                      </div>

                      {decision.description && (
                        <p className="text-sm text-slate-400 line-clamp-2">
                          {decision.description}
                        </p>
                      )}
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-end gap-4">
                      {/* Regret Probability */}
                      <div className="text-right">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                          {decision.prediction?.regretProbability || 0}%
                        </div>
                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Regret</p>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-slate-500">
                        {new Date(decision.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(decision._id)}
                        className="p-2 bg-white/5 rounded-full hover:bg-rose-500/20 transition-all border border-white/5"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-400" />
                      </button>
                    </div>
                  </div>

                  {/* Prediction Bar */}
                  {decision.prediction && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-xs font-black uppercase text-slate-500 mb-2">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${decision.prediction.regretProbability}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${
                            decision.prediction.regretProbability > 70
                              ? 'bg-gradient-to-r from-red-500 to-orange-500'
                              : decision.prediction.regretProbability > 40
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-green-500 to-cyan-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-12 rounded-3xl border border-cyan-500/20 flex flex-col items-center justify-center text-center min-h-96"
            >
              <div className="p-4 bg-cyan-500/10 rounded-full mb-6">
                <HistoryIcon className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black mb-3">No Decisions Found</h3>
              <p className="text-slate-400 mb-8">
                {searchTerm || Object.values(filters).some(v => v)
                  ? 'Try adjusting your search or filters'
                  : 'Start by analyzing your first decision to build your history!'}
              </p>
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                Make Your First Decision
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryPage;