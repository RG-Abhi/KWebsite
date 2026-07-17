import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await login(formData.username, formData.password)
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="KMIT" className="login-logo" />
          <h2>KMIT CMS</h2>
          <p>Sign in with your staff account (admin, placement, exams, csehod, editor)</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>Admin ID</label>
            <input 
              type="text" 
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/">← Back to Website</a>
        </div>
      </div>
    </div>
  )
}
