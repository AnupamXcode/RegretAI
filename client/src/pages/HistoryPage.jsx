import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Search, Trash2, Sparkles, Target, Zap, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const HistoryPage = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/decisions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDecisions(res.data.decisions || []);
    } catch (err) {
      console.error(err);
      // Mock data for demo if API fails
      setDecisions([
        {
          _id: '1',
          decisionTitle: 'Starting a Tech Blog',
          importance: 'medium',
          regretProbability: 25,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          decisionTitle: 'Moving to a new city',
          importance: 'high',
          regretProbability: 65,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/decisions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDecisions(decisions.filter(d => d._id !== id));
      toast.success('Record purged from memory.');
    } catch (err) {
      // Local filter for demo persistence
      setDecisions(decisions.filter(d => d._id !== id));
      toast.success('Record removed (Demo Mode)');
    }
  };

  const filteredDecisions = decisions.filter(d => 
    d.decisionTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 gap-6">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
      <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs">Accessing Future Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-cyan-400 transition-colors mb-6 group text-xs font-black uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4 uppercase">
              <HistoryIcon className="text-cyan-400" size={48} />
              DECISION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">ARCHIVE</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl font-medium tracking-wide">
              Review your past forecasts and the evolution of your decision-making patterns.
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              className="input-field pl-16 py-6 bg-white/5 border-white/5 focus:border-cyan-500/50"
              placeholder="Filter by decision title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {filteredDecisions.length === 0 ? (
          <div className="glass-card py-32 text-center border-dashed border-white/10 opacity-60">
            <div className="inline-flex p-8 bg-white/5 rounded-full mb-8">
              <AlertTriangle size={64} className="text-slate-600" />
            </div>
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">No Future-Traces Found</h3>
            <p className="text-slate-500 text-lg">Start making predictions to populate your personal archive.</p>
            <Link to="/dashboard" className="btn-primary mt-8 inline-block px-12">Return to Dashboard</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDecisions.map((decision, index) => (
                <motion.div
                  key={decision._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card tilt-card border-white/5 p-8 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Zap size={64} />
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                       {decision.importance}
                    </div>
                    <button 
                      onClick={() => handleDelete(decision._id)}
                      className="text-slate-600 hover:text-rose-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <h3 className="text-2xl font-black mb-4 line-clamp-1 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    {decision.decisionTitle}
                  </h3>
                  
                  <div className="mt-8 flex items-end justify-between pt-8 border-t border-white/5">
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Regret Prob.</p>
                        <p className="text-4xl font-black text-gradient leading-none">{decision.regretProbability}%</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Date Logged</p>
                       <p className="text-[11px] font-bold text-slate-400">{new Date(decision.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
