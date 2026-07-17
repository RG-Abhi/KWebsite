import { useEffect, useState } from 'react'
import { adminApi, getStoredUser } from '../../../services/adminApi'
import SpreadsheetTable from '../components/SpreadsheetTable'

const DEPTS = ['cse', 'it', 'csm', 'csd', 'hs']

export default function PeopleModule() {
  const user = getStoredUser()
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    name: '', designation: '', departmentId: user?.departmentId || 'cse', email: '', photoUrl: '',
  })

  const load = () => adminApi.faculty.list().then(setList).catch(() => {})
  useEffect(() => { load() }, [])

  const rows = list.map((f) => ({
    _id: f._id,
    name: f.name,
    designation: f.designation,
    departmentId: f.departmentId,
    email: f.email,
    photoUrl: f.photoUrl,
  }))

  return (
    <div className="cms-module" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#DF5305', borderRadius: '4px' }} />
          Faculty Directory
        </h3>
        <div className="cms-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} disabled={!!user?.departmentId} style={{ width: '100%' }}>
              {DEPTS.map((d) => <option key={d} value={d}>{d.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <input placeholder="Photo URL" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} style={{ width: '100%' }} />
          </div>
        </div>
        <button type="button" className="add-btn" onClick={async () => {
          await adminApi.faculty.create(form)
          setForm({ name: '', designation: '', departmentId: user?.departmentId || 'cse', email: '', photoUrl: '' })
          load()
        }} style={{ padding: '0.6rem 1.2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <i className="fa-solid fa-user-plus" /> Add Faculty Member
        </button>
      </div>
      <div className="admin-card" style={{ padding: '0', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <SpreadsheetTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'designation', label: 'Designation' },
            { key: 'departmentId', label: 'Dept' },
            { key: 'email', label: 'Email' },
          ]}
          rows={rows}
          onChange={async (next) => {
            for (let i = 0; i < next.length; i++) {
              if (JSON.stringify(next[i]) !== JSON.stringify(rows[i])) {
                const { _id, ...rest } = next[i]
                await adminApi.faculty.update(_id, rest)
              }
            }
            load()
          }}
          onAddRow={() => {}}
          onDeleteRow={(ri) => adminApi.faculty.remove(list[ri]._id).then(load)}
          emptyLabel="No faculty yet"
        />
      </div>
    </div>
  )
}
