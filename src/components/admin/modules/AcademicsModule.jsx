import { useEffect, useState } from 'react'
import { adminApi } from '../../../services/adminApi'
import { getStoredUser } from '../../../services/adminApi'
import { canApprove } from '../../../config/adminRoles'
import SpreadsheetTable from '../components/SpreadsheetTable'

const CATEGORIES = ['regulation', 'syllabus', 'timetable', 'calendar', 'circular', 'report']

export default function AcademicsModule() {
  const [docs, setDocs] = useState([])
  const [form, setForm] = useState({ title: '', category: 'syllabus', regulationCode: 'KR24', branch: '', year: '', fileUrl: '' })
  const user = getStoredUser()

  const load = () => adminApi.academics.list().then(setDocs).catch(() => {})

  useEffect(() => { load() }, [])

  return (
    <div className="cms-module">
      <div className="admin-card">
        <h3>Academic documents</h3>
        <p className="media-hint">Regulations, syllabi, timetables, calendars — link files from Media Library.</p>
        <div className="cms-form-grid">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Regulation (KR20–KR25)" value={form.regulationCode} onChange={(e) => setForm({ ...form, regulationCode: e.target.value })} />
          <input placeholder="Branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} />
          <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <input placeholder="File URL (/uploads/…)" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} />
        </div>
        <button type="button" className="add-btn" onClick={async () => {
          await adminApi.academics.create(form)
          setForm({ title: '', category: 'syllabus', regulationCode: 'KR24', branch: '', year: '', fileUrl: '' })
          load()
        }}>Add document</button>
      </div>

      <div className="admin-card">
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
        <ul className="cms-doc-list">
          {docs.map((d) => (
            <li key={d._id}>
              <span className={`cms-badge cms-badge-${d.status}`}>{d.status}</span>
              <strong>{d.title}</strong> — {d.category}
              {canApprove(user?.role) && d.status !== 'published' && (
                <button type="button" className="add-btn" onClick={() => adminApi.academics.publish(d._id).then(load)}>Publish</button>
              )}
              <button type="button" className="delete-btn" onClick={() => adminApi.academics.remove(d._id).then(load)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
