import { getToken } from './authService'

const USER_KEY = 'kmit_admin_user'

export function saveUser(user) {
  if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function clearStoredUser() {
  sessionStorage.removeItem(USER_KEY)
}

async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(path, { ...options, headers })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.message || `Request failed (${res.status})`)
  return body
}

export const adminApi = {
  me: () => api('/api/users/me'),
  dashboard: () => api('/api/analytics/dashboard'),
  search: (q) => api(`/api/search?q=${encodeURIComponent(q)}`),
  notices: {
    list: (status) => api(`/api/notices${status ? `?status=${status}` : ''}`),
    create: (data) => api('/api/notices', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/notices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    submit: (id) => api(`/api/notices/${id}/submit`, { method: 'POST' }),
    publish: (id) => api(`/api/notices/${id}/publish`, { method: 'POST' }),
    archive: (id) => api(`/api/notices/${id}/archive`, { method: 'POST' }),
    remove: (id) => api(`/api/notices/${id}`, { method: 'DELETE' }),
  },
  faculty: {
    list: (departmentId) => api(`/api/faculty${departmentId ? `?departmentId=${departmentId}` : ''}`),
    create: (data) => api('/api/faculty', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/faculty/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => api(`/api/faculty/${id}`, { method: 'DELETE' }),
  },
  academics: {
    list: (category) => api(`/api/academics${category ? `?category=${category}` : ''}`),
    create: (data) => api('/api/academics', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/academics/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    publish: (id) => api(`/api/academics/${id}/publish`, { method: 'POST' }),
    remove: (id) => api(`/api/academics/${id}`, { method: 'DELETE' }),
  },
  exams: {
    listAdmin: () => api('/api/exams/admin'),
    create: (data) => api('/api/exams', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/exams/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => api(`/api/exams/${id}`, { method: 'DELETE' }),
  },
  pages: {
    get: (pageKey) => api(`/api/pages/${pageKey}`),
    update: (pageKey, data) => api(`/api/pages/${pageKey}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  departments: {
    get: (deptKey) => api(`/api/departments/${deptKey}`),
    update: (deptKey, data) => api(`/api/departments/${deptKey}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  workflows: {
    pending: () => api('/api/workflows/pending'),
    approve: (id, comment) => api(`/api/workflows/${id}/approve`, { method: 'POST', body: JSON.stringify({ comment }) }),
    reject: (id, comment) => api(`/api/workflows/${id}/reject`, { method: 'POST', body: JSON.stringify({ comment }) }),
  },
  users: {
    list: () => api('/api/users'),
    create: (data) => api('/api/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
}

