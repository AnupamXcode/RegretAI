import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, ShieldCheck, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.2], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative min-h-[150vh] bg-[#020617] text-white overflow-hidden perspective-container">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass p-5 rounded-[2.5rem]">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-3 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter">FUTURE<span className="text-cyan-400">SENSE</span></span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">Login</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-52 pb-32 px-6 z-10">
        <motion.div 
          style={{ rotateX: springRotateX, scale: springScale }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center px-6 py-2.5 glass rounded-full mb-10 border-cyan-500/30"
          >
            <Zap className="w-4 h-4 text-cyan-400 mr-3" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">Decision Intelligence 2.0</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10">
            Stop Wondering, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Know Your Future.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            AI-powered regret forecasting. We analyze your emotional state and risk factors before you commit, so you can move forward with absolute certainty.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/signup" className="btn-primary flex items-center group">
              Start Free Trial <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/login" className="btn-secondary">View Demo</Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid with 3D Reveal */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />, title: "Precision Risk", desc: "Scientific Logistic Regression models tuned for decision behavioral inputs." },
            { icon: <Zap className="w-8 h-8 text-purple-400" />, title: "Emotion Engine", desc: "Interactive mood mapping affecting your regret probability in real-time." },
            { icon: <BarChart3 className="w-8 h-8 text-emerald-400" />, title: "Gemini Wisdom", desc: "Real-time AI insights powered by Google's most advanced vision models." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
            >
              <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6">{f.icon}</div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
