import { clearStoredUser, saveUser } from './adminApi'

const TOKEN_KEY = 'kmit_admin_token'

export const login = async (username, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const result = await response.json();
    if (result.success) {
      sessionStorage.setItem(TOKEN_KEY, result.token);
      if (result.user) saveUser(result.user);
      return { success: true, token: result.token, user: result.user };
    }
    return { success: false, message: result.message || 'Invalid credentials' };
  } catch (err) {
    return { success: false, message: 'Server connection failed' };
  }
}

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  clearStoredUser();
}

export const verifyToken = async () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const result = await response.json();
    if (result.valid && result.user) saveUser(result.user);
    return result.valid === true;
  } catch (err) {
    console.error('Verification failed:', err);
    return false;
  }
}

export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
