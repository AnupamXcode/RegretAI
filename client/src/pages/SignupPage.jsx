import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-xl"
      >
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="glass-card tilt-card border-white/5 p-16">
          <div className="text-center mb-12">
             <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-400 to-rose-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl -rotate-12">
               <User className="w-10 h-10 text-white" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">JOIN <span className="text-cyan-400">FUTURE SENSE</span></h1>
             <p className="text-slate-400 font-medium tracking-wide">Start predicting your next big moves.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="label-text">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    className="input-field pl-16 py-6"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    className="input-field pl-16 py-6"
                    placeholder="rahul.sharma@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label-text">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="password" 
                    className="input-field pl-16 py-6"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <button className="btn-primary w-full py-6 text-lg" disabled={loading}>
              {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Claim Your Future'}
            </button>
          </form>

          <p className="text-center mt-12 text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-black">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
