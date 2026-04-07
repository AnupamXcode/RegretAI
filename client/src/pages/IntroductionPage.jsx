import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Zap, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const IntroductionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models analyze your decisions in real-time"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description: "Get regret probability predictions within seconds"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your decision patterns and emotional trends over time"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Smart Filtering",
      description: "Organize your history by emotion, importance, and risk level"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6">
        <div className="max-w-4xl w-full">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">FUTURE<span className="text-cyan-400">SENSE</span></span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Welcome, <span className="text-cyan-400">{user?.name || 'Friend'}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              You're now ready to make smarter decisions. Our AI will analyze your choices and predict potential regret before you commit.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="p-6 glass rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-black mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-3xl p-8 md:p-12 border border-cyan-500/20 mb-12"
          >
            <h2 className="text-3xl font-black mb-8 tracking-tight">How It Works</h2>
            <div className="space-y-6">
              {[
                { num: 1, title: "Input Your Decision", desc: "Describe what you're deciding on and your emotional state" },
                { num: 2, title: "Set Your Parameters", desc: "Choose importance level, risk tolerance, and time horizon" },
                { num: 3, title: "Get AI Analysis", desc: "Our model predicts regret probability with intelligent insights" },
                { num: 4, title: "Track & Learn", desc: "Build a history of decisions and identify your patterns" }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500/20 text-cyan-400 font-black text-lg">
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-lg">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center gap-3"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/history')}
              className="px-8 py-4 bg-white/5 rounded-full font-black uppercase text-sm tracking-[0.2em] border border-white/10 hover:bg-white/10 transition-all"
            >
              View History
            </button>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-slate-500 text-sm">
              ✨ <span className="text-cyan-400">Pro Tip:</span> The more decisions you analyze, the better our AI becomes at understanding your patterns.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;