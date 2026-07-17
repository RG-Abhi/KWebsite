import { useEffect, useState } from 'react'
import { adminApi, getStoredUser } from '../../../services/adminApi'
import { canApprove } from '../../../config/adminRoles'
import SitePagesEditor from './SitePagesEditor'
import DeptEditor from './DeptEditor'

export default function ContentModule({ subTab, setSubTab, user, showToast }) {
  const [notices, setNotices] = useState([])
  const [form, setForm] = useState({ title: '', body: '', type: 'marquee', link: '', expiresAt: '' })

  const load = () => adminApi.notices.list().then(setNotices).catch(() => {})

  useEffect(() => { load() }, [])

  const createNotice = async () => {
    if (!form.title.trim()) return
    await adminApi.notices.create({
      ...form,
      expiresAt: form.expiresAt || null,
    })
    setForm({ title: '', body: '', type: 'marquee', link: '', expiresAt: '' })
    if (showToast) showToast('Notice created successfully!', 'success')
    load()
  }

  return (
    <div className="cms-module">
      <div className="cms-subnav">
        <button type="button" className={subTab === 'notices' ? 'active' : ''} onClick={() => setSubTab('notices')}>Notices & News</button>
        <button type="button" className={subTab === 'pages' ? 'active' : ''} onClick={() => setSubTab('pages')}>Pages</button>
        <button type="button" className={subTab === 'departments' ? 'active' : ''} onClick={() => setSubTab('departments')}>Departments</button>
      </div>

      {subTab === 'notices' && (
        <>
          <div className="admin-card">
            <h3>Create notice</h3>
            <div className="cms-form-grid">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="marquee">Announcement Ticker (Marquee)</option>
                <option value="news">Latest News Tab</option>
                <option value="notice">Exams Tab Notice</option>
                <option value="placement">Placements Tab Notice</option>
                <option value="popup">Popup Alert</option>
              </select>
              <input placeholder="Link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
              <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} title="Expiry date" />
              <textarea placeholder="Body" rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <button type="button" className="add-btn" onClick={createNotice}>Save draft</button>
          </div>

          <div className="admin-card">
            <h3>All content ({notices.length})</h3>
            <div className="cms-notice-list">
              {notices.map((n) => (
                <div key={n._id} className="cms-notice-item">
                  <div>
                    <span className={`cms-badge cms-badge-${n.status}`}>{n.status}</span>
                    <span className="cms-badge">
                      {n.type === 'marquee' ? 'Ticker' : n.type === 'news' ? 'News Tab' : n.type === 'notice' ? 'Exams Tab' : n.type === 'placement' ? 'Placements Tab' : 'Popup'}
                    </span>
                    <strong>{n.title}</strong>
                    <p>{n.body?.slice(0, 120)}</p>
                  </div>
                  <div className="cms-notice-actions">
                    {n.status === 'draft' && (
                      <button type="button" onClick={() => adminApi.notices.submit(n._id).then(load)}>Submit</button>
                    )}
                    {canApprove(user?.role) && n.status !== 'published' && (
                      <button type="button" className="add-btn" onClick={() => adminApi.notices.publish(n._id).then(load)}>Publish</button>
                    )}
                    {n.status === 'published' && (
                      <button type="button" onClick={() => adminApi.notices.archive(n._id).then(load)}>Archive</button>
                    )}
                    <button type="button" className="delete-btn" onClick={() => adminApi.notices.remove(n._id).then(load)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {subTab === 'pages' && <SitePagesEditor showToast={showToast} />}
      {subTab === 'departments' && <DeptEditor showToast={showToast} />}
    </div>
  )
}

