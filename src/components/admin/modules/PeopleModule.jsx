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
    <div className="cms-module">
      <div className="admin-card">
        <h3>Faculty directory</h3>
        <div className="cms-form-grid">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} disabled={!!user?.departmentId}>
            {DEPTS.map((d) => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Photo URL" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        </div>
        <button type="button" className="add-btn" onClick={async () => {
          await adminApi.faculty.create(form)
          setForm({ name: '', designation: '', departmentId: user?.departmentId || 'cse', email: '', photoUrl: '' })
          load()
        }}>Add faculty</button>
      </div>
      <div className="admin-card">
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
