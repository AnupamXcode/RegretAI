import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import LandingPage from './pages/LandingPage'
import IntroductionPage from './pages/IntroductionPage'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
    </div>
  )
  if (!user) return <Navigate to="/login" />
  return children
}

function App() {
  const { user } = useAuth()
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#0f172a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.1em'
        }
      }} />
      {!isAuthPage && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={user ? <Navigate to="/intro" /> : <LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/intro" 
              element={
                <ProtectedRoute>
                  <IntroductionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
