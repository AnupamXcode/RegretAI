import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, LayoutDashboard, History, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
            <Sparkles size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase text-white">FUTURE<span className="text-cyan-400">SENSE</span></span>
        </Link>
        
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link to="/history" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">
                <History size={18} />
                <span className="hidden sm:inline">History</span>
              </Link>
              <div className="h-8 w-[1px] bg-white/10"></div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-cyan-400 uppercase tracking-widest">{user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-8 py-3 bg-cyan-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
