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

  // Removed fake SVG sparklines for a cleaner, professional look

  return (
    <div className="cms-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Metrics Row */}
      <div className="cms-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: 0 }}>
        
        {/* Published Notices */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(223, 83, 5, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DF5305', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-bullhorn" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Published Notices</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.publishedNotices ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Total active notices in system</span>
          </div>
        </div>

        {/* Faculty Directory */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(34, 132, 131, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#228483', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-users" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Faculty Members</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.faculty ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Registered accounts in the system</span>
          </div>
        </div>

        {/* Academic Documents */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Academic Docs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.academicDocs ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Academic files and reports</span>
          </div>
        </div>

        {/* Workflow Queue */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '1.1rem' }}>
              <i className="fa-regular fa-calendar-check" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Global Pending Workflows</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.pendingApprovals ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Awaiting HOD/Principal Approval</span>
          </div>
        </div>

        {/* Media Assets */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontSize: '1.1rem' }}>
              <i className="fa-regular fa-images" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Media Assets</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.mediaFiles ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Images and files uploaded</span>
          </div>
        </div>

        {/* CMS Pages */}
        <div className="cms-stat-card" style={{ background: '#FEFEFF', padding: '1.75rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '1.1rem' }}>
              <i className="fa-solid fa-sitemap" />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Visual Blocks Pages</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <strong style={{ fontSize: '2.4rem', color: '#1f2937', fontWeight: 600, lineHeight: 1 }}>{stats?.cmsPages ?? '0'}</strong>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Active landing pages</span>
          </div>
        </div>

      </div>

      {/* Quick actions triggers */}
      <div className="admin-card cms-quick-actions" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }} />
          Quick Action Channels
        </h3>
        <div className="cms-action-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 0 }}>
          
          <button type="button" onClick={() => onNavigateModule('content')} style={{ background: '#f8fafc', color: '#1f2937', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'none'; }}>
            <i className="fa-solid fa-circle-plus" style={{ color: '#DF5305' }} /> Write New Notice
          </button>
          
          <button type="button" onClick={() => onNavigateModule('media')} style={{ background: '#f8fafc', color: '#1f2937', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'none'; }}>
            <i className="fa-solid fa-cloud-arrow-up" style={{ color: '#3b82f6' }} /> Upload File to Library
          </button>
          
          <button type="button" onClick={() => onNavigateModule('people')} style={{ background: '#f8fafc', color: '#1f2937', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'none'; }}>
            <i className="fa-solid fa-user-plus" style={{ color: '#10b981' }} /> Add Faculty Record
          </button>
          
          <button type="button" onClick={() => window.open('/', '_blank')} style={{ background: '#f8fafc', color: '#1f2937', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'none'; }}>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: '#64748b' }} /> Visit Main Site
          </button>

        </div>
      </div>

      {/* Pending Approvals queue */}
      {canApprove(user?.role) && pending.length > 0 && (
        <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }} />
            Pending Workflows & Approvals ({pending.length})
          </h3>
          <ul className="cms-pending-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pending.map((item) => (
              <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#1f2937', fontWeight: 600 }}>{item.title}</strong>
                  <small style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.entityType} · submitted by <span style={{ color: '#64748b', fontWeight: 600 }}>{item.submittedBy}</span></small>
                </div>
                <div className="cms-pending-actions" style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={async () => {
                    await adminApi.workflows.approve(item._id)
                    setPending((p) => p.filter((x) => x._id !== item._id))
                  }} style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#f8fafc', color: '#10b981', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}>
                    <i className="fa-solid fa-check" /> Approve
                  </button>
                  <button type="button" onClick={async () => {
                    await adminApi.workflows.reject(item._id, 'Needs revision')
                    setPending((p) => p.filter((x) => x._id !== item._id))
                  }} style={{ width: 'auto', height: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#f8fafc', color: '#ef4444', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}>
                    <i className="fa-solid fa-xmark" /> Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Audit Log Activity */}
      <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }} />
          Recent Activity Timeline
        </h3>
        {activity.length === 0 ? (
          <p className="media-hint" style={{ color: '#64748b' }}>No activity logged yet.</p>
        ) : (
          <ul className="cms-activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {activity.slice(0, 6).map((a) => (
              <li key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0' }} />
                  <span style={{ fontSize: '0.95rem', color: '#1f2937', fontWeight: 500 }}>{a.action}</span>
                </div>
                <small style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  by <strong style={{ color: '#475569', fontWeight: 600 }}>{a.username}</strong> · {new Date(a.createdAt).toLocaleTimeString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}
