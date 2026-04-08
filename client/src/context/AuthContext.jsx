import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(res.data.user)
        } catch (err) {
          localStorage.removeItem('token')
          setUser(null)
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toast.success(`Welcome back, ${res.data.user.name}!`)
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toast.success('Account created successfully!')
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
