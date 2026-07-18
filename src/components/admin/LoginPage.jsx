import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
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
          <img src="/photos/main/logo.png" alt="KMIT" className="login-logo" />
          <h2 className="login-title">KMIT <span className="text-orange">CMS</span></h2>
          <p>Please log in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>Employee ID / Email</label>
            <input 
              type="text" 
              placeholder="Enter Employee ID or Email"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrap">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>© 2026 KMIT-CMS. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
