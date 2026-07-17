import { useEffect, useState } from 'react'
import { adminApi } from '../../../services/adminApi'
import { canApprove } from '../../../config/adminRoles'

export default function DashboardModule({ user, onNavigateModule }) {
  const [stats, setStats] = useState(null)
  const [pending, setPending] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    adminApi.dashboard().then((d) => {
      setStats(d.stats)
      setActivity(d.recentActivity || [])
    }).catch(() => {}).finally(() => setLoading(false))
    
    if (canApprove(user?.role)) {
      adminApi.workflows.pending().then(setPending).catch(() => {})
    }
  }, [user?.role])

  // Custom micro-sparkline SVG paths
  const sparks = {
    notices: "0,25 15,10 30,22 45,5 60,18 75,2 90,14 100,5",
    faculty: "0,20 15,22 30,15 45,18 60,10 75,12 90,5 100,2",
    documents: "0,15 15,20 30,10 45,25 60,15 75,8 90,12 100,6",
    approvals: "0,5 15,18 30,12 45,20 60,10 75,25 90,8 100,15",
    media: "0,25 15,15 30,22 45,10 60,18 75,5 90,14 100,2",
    pages: "0,18 15,10 30,15 45,8 60,12 75,5 90,9 100,2"
  }

  return (
    <div className="cms-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Metrics Row */}
      <div className="cms-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: 0 }}>
        
        {/* Published Notices */}
        <div className="cms-stat-card metric-card-custom metric-card-blue" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Published Notices</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.publishedNotices ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-bullhorn metric-card-icon" style={{ color: '#3b82f6' }} />
          {/* Micro SVG Sparkline Chart */}
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" points={sparks.notices} />
          </svg>
        </div>

        {/* Faculty Directory */}
        <div className="cms-stat-card metric-card-custom metric-card-purple" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Faculty Members</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.faculty ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-chalkboard-user metric-card-icon" style={{ color: '#8b5cf6' }} />
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#8b5cf6" strokeWidth="2.5" points={sparks.faculty} />
          </svg>
        </div>

        {/* Academic Documents */}
        <div className="cms-stat-card metric-card-custom metric-card-green" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Academic Docs</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.academicDocs ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-graduation-cap metric-card-icon" style={{ color: '#10b981' }} />
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points={sparks.documents} />
          </svg>
        </div>

        {/* Pending Approvals */}
        <div className="cms-stat-card metric-card-custom metric-card-crimson" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Workflow Queue</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.pendingApprovals ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-square-check metric-card-icon" style={{ color: '#f43f5e' }} />
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#f43f5e" strokeWidth="2.5" points={sparks.approvals} />
          </svg>
        </div>

        {/* Media files */}
        <div className="cms-stat-card metric-card-custom metric-card-orange" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Media Assets</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.mediaFiles ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-photo-film metric-card-icon" style={{ color: '#f97316' }} />
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#f97316" strokeWidth="2.5" points={sparks.media} />
          </svg>
        </div>

        {/* CMS Pages */}
        <div className="cms-stat-card metric-card-custom metric-card-gold" style={{ padding: '1.5rem', borderRadius: '12px', minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Visual Blocks Pages</span>
            <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>{stats?.cmsPages ?? '0'}</strong>
          </div>
          <i className="fa-solid fa-sitemap metric-card-icon" style={{ color: '#f59e0b' }} />
          <svg style={{ position: 'absolute', bottom: 10, left: 15, right: 15, width: 'calc(100% - 30px)', height: '30px', opacity: 0.4 }} viewBox="0 0 100 30">
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" points={sparks.pages} />
          </svg>
        </div>

      </div>

      {/* Quick actions triggers */}
      <div className="admin-card cms-quick-actions" style={{ padding: '1.5rem 2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af', marginBottom: '1rem', borderLeft: '3px solid var(--crimson)', paddingLeft: '8px' }}>
          Quick Action Channels
        </h3>
        <div className="cms-action-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 0 }}>
          
          <button type="button" className="action-chip-custom" onClick={() => onNavigateModule('content')} style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
            <i className="fa-solid fa-circle-plus" style={{ color: '#f43f5e' }} /> Write New Notice
          </button>
          
          <button type="button" className="action-chip-custom" onClick={() => onNavigateModule('media')} style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
            <i className="fa-solid fa-cloud-arrow-up" style={{ color: '#3b82f6' }} /> Upload File to Library
          </button>
          
          <button type="button" className="action-chip-custom" onClick={() => onNavigateModule('people')} style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
            <i className="fa-solid fa-user-plus" style={{ color: '#8b5cf6' }} /> Add Faculty Record
          </button>
          
          <button type="button" className="action-chip-custom" onClick={() => window.open('/', '_blank')} style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: '#10b981' }} /> Visit Main Site
          </button>

        </div>
      </div>

      {/* Pending Approvals queue */}
      {canApprove(user?.role) && pending.length > 0 && (
        <div className="admin-card" style={{ padding: '1.5rem 2rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af', marginBottom: '1.25rem', borderLeft: '3px solid #8b5cf6', paddingLeft: '8px' }}>
            Pending Workflows & Approvals ({pending.length})
          </h3>
          <ul className="cms-pending-list">
            {pending.map((item) => (
              <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{item.title}</strong>
                  <small style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{item.entityType} · submitted by <span style={{ color: '#f59e0b', fontWeight: 600 }}>{item.submittedBy}</span></small>
                </div>
                <div className="cms-pending-actions" style={{ display: 'flex', gap: '6px' }}>
                  <button type="button" className="add-btn" onClick={async () => {
                    await adminApi.workflows.approve(item._id)
                    setPending((p) => p.filter((x) => x._id !== item._id))
                  }} style={{ margin: 0, padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                    <i className="fa-solid fa-check" /> Approve
                  </button>
                  <button type="button" className="delete-btn" onClick={async () => {
                    await adminApi.workflows.reject(item._id, 'Needs revision')
                    setPending((p) => p.filter((x) => x._id !== item._id))
                  }} style={{ width: 'auto', height: 'auto', padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                    <i className="fa-solid fa-xmark" /> Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Audit Log Activity */}
      <div className="admin-card" style={{ padding: '1.5rem 2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af', marginBottom: '1.25rem', borderLeft: '3px solid #10b981', paddingLeft: '8px' }}>
          Recent Activity Timeline (Audit Logs)
        </h3>
        {activity.length === 0 ? (
          <p className="media-hint">No activity logged yet.</p>
        ) : (
          <ul className="cms-activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activity.slice(0, 6).map((a) => (
              <li key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.88rem', color: '#e5e7eb', fontWeight: 500 }}>{a.action}</span>
                </div>
                <small style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  by <strong style={{ color: '#fff' }}>{a.username}</strong> · {new Date(a.createdAt).toLocaleTimeString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}
