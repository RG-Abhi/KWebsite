import { useEffect, useState } from 'react'
import { adminApi } from '../../../services/adminApi'
import { getStoredUser } from '../../../services/adminApi'
import { canApprove } from '../../../config/adminRoles'
import SpreadsheetTable from '../components/SpreadsheetTable'

const CATEGORIES = ['regulation', 'syllabus', 'timetable', 'calendar', 'circular', 'report']

export default function AcademicsModule() {
  const [docs, setDocs] = useState([])
  const [form, setForm] = useState({ title: '', category: 'syllabus', regulationCode: 'KR24', branch: '', year: '', fileUrl: '' })
  const [editingId, setEditingId] = useState(null)
  const user = getStoredUser()

  const load = () => adminApi.academics.list().then(setDocs).catch(() => {})

  useEffect(() => { load() }, [])

  const saveDoc = async () => {
    if (editingId) {
      await adminApi.academics.update(editingId, form)
    } else {
      await adminApi.academics.create(form)
    }
    setForm({ title: '', category: 'syllabus', regulationCode: 'KR24', branch: '', year: '', fileUrl: '' })
    setEditingId(null)
    load()
  }

  const handleEdit = (doc) => {
    setForm({
      title: doc.title || '',
      category: doc.category || 'syllabus',
      regulationCode: doc.regulationCode || 'KR24',
      branch: doc.branch || '',
      year: doc.year || '',
      fileUrl: doc.fileUrl || ''
    })
    setEditingId(doc._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cms-module" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#DF5305', borderRadius: '4px' }} />
          {editingId ? 'Edit Academic Document' : 'Academic Documents'}
        </h3>
        <p className="media-hint" style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>Regulations, syllabi, timetables, calendars — link files from Media Library.</p>
        <div className="cms-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <input placeholder="Document Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ width: '100%' }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input placeholder="Regulation (KR20–KR25)" value={form.regulationCode} onChange={(e) => setForm({ ...form, regulationCode: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <input placeholder="Branch (e.g. CSE)" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <input placeholder="Year (e.g. I, II, III)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <input placeholder="File URL (/uploads/…)" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} style={{ width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="add-btn" onClick={saveDoc}>
            <i className={editingId ? "fa-solid fa-pen-to-square" : "fa-solid fa-file-circle-plus"} /> {editingId ? 'Update Document' : 'Add Document'}
          </button>
          {editingId && (
            <button type="button" className="reset-btn" onClick={() => { setEditingId(null); setForm({ title: '', category: 'syllabus', regulationCode: 'KR24', branch: '', year: '', fileUrl: '' }) }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ padding: '0', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <SpreadsheetTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'regulationCode', label: 'Regulation' },
            { key: 'fileUrl', label: 'File URL' },
            { key: 'status', label: 'Status' },
          ]}
          rows={docs}
          emptyLabel="No academic documents"
          onChange={() => {}}
        />
        {docs.length > 0 && (
          <div style={{ borderTop: '1px solid #e2e8f0', padding: '1rem 2rem', background: '#f8fafc' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>Pending Actions</h4>
            <ul className="cms-doc-list" style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {docs.map((d) => (
                <li key={d._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`cms-badge cms-badge-${d.status}`} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 600, background: d.status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: d.status === 'published' ? '#10b981' : '#f59e0b', textTransform: 'capitalize' }}>{d.status}</span>
                    <strong style={{ fontSize: '0.9rem', color: '#1f2937', fontWeight: 600 }}>{d.title}</strong> 
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>— {d.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {canApprove(user?.role) && d.status !== 'published' && (
                      <button type="button" className="add-btn" onClick={() => adminApi.academics.publish(d._id).then(load)}>Publish</button>
                    )}
                    <button type="button" onClick={() => handleEdit(d)} style={{ background: 'rgba(59, 130, 246, 0.1)', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#3b82f6', cursor: 'pointer' }} title="Edit">
                      <i className="fa-solid fa-pen-to-square" />
                    </button>
                    <button type="button" onClick={() => adminApi.academics.remove(d._id).then(load)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }} title="Delete">
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
