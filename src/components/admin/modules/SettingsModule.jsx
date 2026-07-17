import { useEffect, useState } from 'react'
import { useData } from '../../../context/websiteData'
import { adminApi, getStoredUser } from '../../../services/adminApi'
import { ROLES } from '../../../config/adminRoles'

export default function SettingsModule({ subTab, setSubTab }) {
  const { data, deepUpdate, updateData, resetData } = useData()
  const user = getStoredUser()
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'content_editor', displayName: '' })

  useEffect(() => {
    if (user?.role === 'super_admin' && subTab === 'users') {
      adminApi.users.list().then(setUsers).catch(() => {})
    }
  }, [subTab, user?.role])

  return (
    <div className="cms-module">
      <div className="cms-subnav">
        <button type="button" className={subTab === 'site' ? 'active' : ''} onClick={() => setSubTab('site')}>Site & SEO</button>
        <button type="button" className={subTab === 'home' ? 'active' : ''} onClick={() => setSubTab('home')}>Homepage</button>
        <button type="button" className={subTab === 'departments' ? 'active' : ''} onClick={() => setSubTab('departments')}>Departments</button>
        {user?.role === 'super_admin' && (
          <button type="button" className={subTab === 'users' ? 'active' : ''} onClick={() => setSubTab('users')}>Users & roles</button>
        )}
      </div>

      {subTab === 'site' && (
        <div className="admin-grid-edit">
          <div className="admin-card">
            <h3>Institution metadata</h3>
            <div className="form-group"><label>Name</label>
              <input value={data.siteMeta.fullName} onChange={(e) => deepUpdate('siteMeta.fullName', e.target.value)} />
            </div>
            <div className="form-group"><label>Location</label>
              <textarea value={data.siteMeta.location} onChange={(e) => deepUpdate('siteMeta.location', e.target.value)} />
            </div>
            <div className="form-group"><label>Email</label>
              <input value={data.siteMeta.email} onChange={(e) => deepUpdate('siteMeta.email', e.target.value)} />
            </div>
            <div className="form-group"><label>Navbar CTA label</label>
              <input value={data.siteMeta.ctaLabel || ''} onChange={(e) => deepUpdate('siteMeta.ctaLabel', e.target.value)} />
            </div>
            <div className="form-group"><label>Navbar CTA link</label>
              <input value={data.siteMeta.ctaLink || ''} onChange={(e) => deepUpdate('siteMeta.ctaLink', e.target.value)} />
            </div>
            <div className="form-group"><label>Footer description</label>
              <textarea value={data.siteMeta.footerDesc || ''} onChange={(e) => deepUpdate('siteMeta.footerDesc', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {subTab === 'home' && data.homeContent && (
        <div className="admin-grid-edit">
          <div className="admin-card">
            <h3>Welcome section</h3>
            <input value={data.homeContent.welcome.eyebrow} onChange={(e) => deepUpdate('homeContent.welcome.eyebrow', e.target.value)} placeholder="Eyebrow" />
            <input value={data.homeContent.welcome.title} onChange={(e) => deepUpdate('homeContent.welcome.title', e.target.value)} placeholder="Title" />
            <textarea value={data.homeContent.welcome.text} onChange={(e) => deepUpdate('homeContent.welcome.text', e.target.value)} />
          </div>
          <div className="admin-card">
            <h3>Why Choose tiles</h3>
            {data.whyChoose?.map((tile, i) => (
              <div key={i} className="cms-block-item">
                <input value={tile.title} onChange={(e) => {
                  const next = [...data.whyChoose]; next[i] = { ...tile, title: e.target.value }; deepUpdate('whyChoose', next)
                }} />
                <textarea value={tile.desc} onChange={(e) => {
                  const next = [...data.whyChoose]; next[i] = { ...tile, desc: e.target.value }; deepUpdate('whyChoose', next)
                }} />
              </div>
            ))}
          </div>
          <div className="admin-card">
            <h3>Hero slides</h3>
            {data.heroSlides?.map((slide, i) => (
              <div key={i} className="cms-block-item">
                <input value={slide.title} placeholder="Title" onChange={(e) => {
                  const next = [...data.heroSlides]; next[i] = { ...slide, title: e.target.value }; updateData('heroSlides', next)
                }} />
                <input value={slide.subtitle || ''} placeholder="Subtitle" onChange={(e) => {
                  const next = [...data.heroSlides]; next[i] = { ...slide, subtitle: e.target.value }; updateData('heroSlides', next)
                }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'departments' && data.deptDetails && (
        <div className="admin-grid-edit">
          {Object.keys(data.deptDetails).map((key) => {
            const dept = data.deptDetails[key]
            return (
              <div key={key} className="admin-card">
                <h3>{dept.name}</h3>
                <input value={dept.intake} type="number" onChange={(e) => deepUpdate(`deptDetails.${key}.intake`, parseInt(e.target.value, 10))} />
                <textarea value={dept.desc} onChange={(e) => deepUpdate(`deptDetails.${key}.desc`, e.target.value)} />
              </div>
            )
          })}
        </div>
      )}

      {subTab === 'users' && user?.role === 'super_admin' && (
        <div className="admin-card">
          <h3>Users & RBAC</h3>
          <div className="cms-form-grid">
            <input placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <input placeholder="Display name" value={newUser.displayName} onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })} />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              {Object.values(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button type="button" className="add-btn" onClick={async () => {
            await adminApi.users.create(newUser)
            setNewUser({ username: '', password: '', role: 'content_editor', displayName: '' })
            adminApi.users.list().then(setUsers)
          }}>Create user</button>
          <ul className="cms-user-list">
            {users.map((u) => (
              <li key={u._id}><strong>{u.username}</strong> — {u.role} {u.departmentId && `(${u.departmentId})`}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="admin-card cms-danger-zone">
        <h3>Danger zone</h3>
        <button type="button" className="reset-btn" onClick={() => { if (confirm('Reset all site data?')) resetData() }}>Factory reset database</button>
      </div>
    </div>
  )
}
