import { useEffect, useState } from 'react'
import { adminApi, getStoredUser } from '../../../services/adminApi'
import { canApprove } from '../../../config/adminRoles'
import SitePagesEditor from './SitePagesEditor'
import DeptEditor from './DeptEditor'

export default function ContentModule({ subTab, setSubTab, user, showToast }) {
  const [notices, setNotices] = useState([])
  const [form, setForm] = useState({ title: '', body: '', type: 'marquee', link: '', expiresAt: '' })
  const [editingId, setEditingId] = useState(null)

  const load = () => adminApi.notices.list().then(setNotices).catch(() => {})

  useEffect(() => { load() }, [])

  const saveNotice = async () => {
    if (!form.title.trim()) return
    const payload = {
      ...form,
      expiresAt: form.expiresAt || null,
    }
    if (editingId) {
      await adminApi.notices.update(editingId, payload)
      if (showToast) showToast('Notice updated successfully!', 'success')
    } else {
      await adminApi.notices.create(payload)
      if (showToast) showToast('Notice created successfully!', 'success')
    }
    setForm({ title: '', body: '', type: 'marquee', link: '', expiresAt: '' })
    setEditingId(null)
    load()
  }

  const handleEdit = (notice) => {
    setForm({
      title: notice.title,
      body: notice.body || '',
      type: notice.type || 'marquee',
      link: notice.link || '',
      expiresAt: notice.expiresAt ? notice.expiresAt.split('T')[0] : ''
    })
    setEditingId(notice._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cms-module">
      <div className="cms-subnav">
        <button type="button" className={subTab === 'notices' ? 'active' : ''} onClick={() => setSubTab('notices')}>Notices & News</button>
        <button type="button" className={subTab === 'pages' ? 'active' : ''} onClick={() => setSubTab('pages')}>Pages</button>
        <button type="button" className={subTab === 'departments' ? 'active' : ''} onClick={() => setSubTab('departments')}>Departments</button>
      </div>

      {subTab === 'notices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '20px', background: '#DF5305', borderRadius: '4px' }} />
              {editingId ? 'Edit Notice' : 'Create Notice'}
            </h3>
            <div className="cms-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <input placeholder="Notice Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ width: '100%' }} />
              </div>
              <div className="form-group">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: '100%' }}>
                  <option value="marquee">Announcement Ticker (Marquee)</option>
                  <option value="news">Latest News Tab</option>
                  <option value="notice">Exams Tab Notice</option>
                  <option value="placement">Placements Tab Notice</option>
                  <option value="popup">Popup Alert</option>
                </select>
              </div>
              <div className="form-group">
                <input placeholder="Link URL (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} style={{ width: '100%' }} />
              </div>
              <div className="form-group">
                <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} title="Expiry date" style={{ width: '100%' }} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <textarea placeholder="Notice Body" rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} style={{ width: '100%', resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="add-btn" onClick={saveNotice}>
                <i className="fa-solid fa-pen-to-square" /> {editingId ? 'Update Notice' : 'Save Draft'}
              </button>
              {editingId && (
                <button type="button" className="reset-btn" onClick={() => { setEditingId(null); setForm({ title: '', body: '', type: 'marquee', link: '', expiresAt: '' }) }}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="admin-card" style={{ padding: '0', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>All Content ({notices.length})</h3>
            </div>
            <div className="cms-notice-list" style={{ display: 'flex', flexDirection: 'column' }}>
              {notices.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No notices found.</div>
              ) : (
                notices.map((n) => (
                  <div key={n._id} className="cms-notice-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        <span className={`cms-badge cms-badge-${n.status}`} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 600, background: n.status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: n.status === 'published' ? '#10b981' : '#f59e0b', textTransform: 'capitalize' }}>
                          {n.status}
                        </span>
                        <span className="cms-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 600, background: '#f1f5f9', color: '#64748b' }}>
                          {n.type === 'marquee' ? 'Ticker' : n.type === 'news' ? 'News Tab' : n.type === 'notice' ? 'Exams Tab' : n.type === 'placement' ? 'Placements Tab' : 'Popup'}
                        </span>
                      </div>
                      <strong style={{ fontSize: '1rem', color: '#1f2937', fontWeight: 600 }}>{n.title}</strong>
                      {n.body && <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, maxWidth: '600px' }}>{n.body?.slice(0, 120)}{n.body?.length > 120 ? '...' : ''}</p>}
                    </div>
                    <div className="cms-notice-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {n.status === 'draft' && (
                        <button type="button" onClick={() => adminApi.notices.submit(n._id).then(load)} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, color: '#475569', cursor: 'pointer' }}>Submit</button>
                      )}
                      {canApprove(user?.role) && n.status !== 'published' && (
                        <button type="button" className="add-btn" onClick={() => adminApi.notices.publish(n._id).then(load)}>Publish</button>
                      )}
                      {n.status === 'published' && (
                        <button type="button" onClick={() => adminApi.notices.archive(n._id).then(load)} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, color: '#475569', cursor: 'pointer' }}>Archive</button>
                      )}
                      <button type="button" onClick={() => handleEdit(n)} style={{ background: 'rgba(59, 130, 246, 0.1)', border: 'none', padding: '0.5rem', borderRadius: '6px', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit">
                        <i className="fa-solid fa-pen-to-square" />
                      </button>
                      <button type="button" onClick={() => adminApi.notices.remove(n._id).then(load)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.5rem', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {subTab === 'pages' && <SitePagesEditor showToast={showToast} />}
      {subTab === 'departments' && <DeptEditor showToast={showToast} />}
    </div>
  )
}

