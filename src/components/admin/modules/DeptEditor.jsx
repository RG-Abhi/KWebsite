import { useState, useEffect } from 'react'
import { adminApi } from '../../../services/adminApi'
import { uploadMedia } from '../../../services/mediaService'

const DEPTS = [
  { key: 'cse', label: 'Computer Science (CSE)' },
  { key: 'it', label: 'Information Technology (IT)' },
  { key: 'csm', label: 'AI & Machine Learning (CSM)' },
  { key: 'csd', label: 'Data Science (CSD)' },
  { key: 'hs', label: 'Humanities & Sciences (H&S)' }
]

export default function DeptEditor({ showToast }) {
  const [deptKey, setDeptKey] = useState('cse')
  const [activeSubTab, setActiveSubTab] = useState('general') // 'general', 'faculty', 'labs', 'seo'
  const [deptData, setDeptData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(null) // index identifier for uploads

  const parseFaculty = (facultyField) => {
    if (!facultyField) return []
    if (Array.isArray(facultyField)) return facultyField
    if (typeof facultyField === 'object' && facultyField.type === 'table') {
      const table = facultyField.data?.[0]
      if (table && table.rows) {
        return table.rows.map((row, idx) => {
          const nameCell = row[1] || {}
          const designationCell = row[2] || {}
          const qualificationCell = row[3] || {}
          const areaCell = row[4] || {}
          return {
            name: nameCell.text || '',
            profileUrl: nameCell.link || '',
            designation: designationCell.text || '',
            qualification: qualificationCell.text || '',
            areaOfInterest: areaCell.text || '',
            photoUrl: '',
            order: idx + 1
          }
        })
      }
    }
    return []
  }

  const parseLabs = (labsField) => {
    if (!labsField) return []
    if (Array.isArray(labsField)) return labsField
    if (typeof labsField === 'object') {
      if (labsField.type === 'table') {
        const table = labsField.data?.[0]
        if (table && table.rows) {
          return table.rows.map((row) => {
            const titleCell = row[1] || {}
            const descCell = row[2] || {}
            return {
              title: titleCell.text || '',
              description: descCell.text || '',
              photoUrl: ''
            }
          })
        }
      } else if (labsField.type === 'info' && Array.isArray(labsField.data)) {
        return labsField.data.map((item) => ({
          title: item.title || '',
          description: item.desc || item.description || '',
          photoUrl: item.photoUrl || ''
        }))
      }
    }
    return []
  }

  const loadDept = async (key) => {
    setLoading(true)
    try {
      const data = await adminApi.departments.get(key)
      if (data) {
        data.faculty = parseFaculty(data.faculty)
        data.labs = parseLabs(data.labs)
      }
      setDeptData(data)
    } catch (err) {
      if (showToast) showToast(`Failed to load department: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDept(deptKey)
  }, [deptKey])

  const handleSave = async () => {
    if (!deptData) return
    setSaving(true)
    try {
      await adminApi.departments.update(deptKey, deptData)
      if (showToast) showToast('Department details updated successfully!', 'success')
    } catch (err) {
      if (showToast) showToast(`Save failed: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e, type, index, field = 'photoUrl') => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(`${type}_${index}_${field}`)
    try {
      const asset = await uploadMedia(file)
      const nextData = { ...deptData }
      if (type === 'faculty') {
        nextData.faculty[index][field] = asset.url
      } else if (type === 'labs') {
        nextData.labs[index][field] = asset.url
      } else if (type === 'hobs') {
        nextData.hobs[index][field] = asset.url
      } else if (type === 'seo') {
        nextData.seo[field] = asset.url
      }
      setDeptData(nextData)
      if (showToast) showToast('File uploaded successfully!', 'success')
    } catch (err) {
      if (showToast) showToast(`Upload failed: ${err.message}`, 'error')
    } finally {
      setUploading(null)
    }
  }

  // Row operations
  const addRow = (type) => {
    const nextData = { ...deptData }
    let emptyRow = {}
    if (type === 'faculty') {
      emptyRow = { name: '', designation: '', qualification: '', areaOfInterest: '', photoUrl: '', profileUrl: '', order: (nextData.faculty?.length || 0) + 1 }
      nextData.faculty = [...(nextData.faculty || []), emptyRow]
    } else if (type === 'labs') {
      emptyRow = { title: '', description: '', photoUrl: '' }
      nextData.labs = [...(nextData.labs || []), emptyRow]
    }
    setDeptData(nextData)
  }

  const deleteRow = (type, index) => {
    const nextData = { ...deptData }
    if (type === 'faculty') {
      nextData.faculty = nextData.faculty.filter((_, i) => i !== index)
    } else if (type === 'labs') {
      nextData.labs = nextData.labs.filter((_, i) => i !== index)
    }
    setDeptData(nextData)
  }

  const updateRowField = (type, index, field, value) => {
    const nextData = { ...deptData }
    if (type === 'faculty') {
      nextData.faculty[index][field] = value
    } else if (type === 'labs') {
      nextData.labs[index][field] = value
    }
    setDeptData(nextData)
  }

  return (
    <div>
      <div className="admin-card cms-toolbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Department Profile CMS</h3>
          <p className="media-hint">Directly configure faculty registries, infrastructure labs, publications, and specific SEO for KMIT departments.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select value={deptKey} onChange={(e) => setDeptKey(e.target.value)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>
            {DEPTS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
          </select>
          <button type="button" className="view-site-btn" onClick={() => window.open(`/academics/${deptKey}`, '_blank')}>
            <i className="fa-solid fa-arrow-up-right-from-square" /> Live Dept
          </button>
          <button type="button" className="add-btn" onClick={handleSave} disabled={saving} style={{ margin: 0, padding: '0.65rem 1.5rem' }}>
            <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving...' : 'Save Department'}
          </button>
        </div>
      </div>

      <div className="cms-subnav">
        <button type="button" className={activeSubTab === 'general' ? 'active' : ''} onClick={() => setActiveSubTab('general')}>
          <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }} /> General Info & Statements
        </button>
        <button type="button" className={activeSubTab === 'faculty' ? 'active' : ''} onClick={() => setActiveSubTab('faculty')}>
          <i className="fa-solid fa-chalkboard-user" style={{ marginRight: '6px' }} /> Faculty Registry
        </button>
        <button type="button" className={activeSubTab === 'labs' ? 'active' : ''} onClick={() => setActiveSubTab('labs')}>
          <i className="fa-solid fa-flask-vial" style={{ marginRight: '6px' }} /> Labs & Facilities
        </button>
        <button type="button" className={activeSubTab === 'seo' ? 'active' : ''} onClick={() => setActiveSubTab('seo')}>
          <i className="fa-solid fa-globe" style={{ marginRight: '6px' }} /> SEO & Metadata tags
        </button>
      </div>

      {loading ? (
        <div className="admin-card cms-empty"><p>Loading department details database…</p></div>
      ) : !deptData ? (
        <div className="admin-card cms-empty"><p>Could not load department record.</p></div>
      ) : (
        <>
          {activeSubTab === 'general' && (
            <div className="admin-grid-edit" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
              <div className="admin-card">
                <h3>Department Overview</h3>
                <div className="form-group">
                  <label>Department Heading Name</label>
                  <input value={deptData.name || ''} onChange={(e) => setDeptData({ ...deptData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>About Description</label>
                  <textarea rows={8} value={deptData.about || ''} onChange={(e) => setDeptData({ ...deptData, about: e.target.value })} />
                </div>
              </div>
              <div className="admin-card">
                <h3>Vision & Mission Statements</h3>
                <div className="form-group">
                  <label>Vision Statement</label>
                  <textarea rows={4} value={deptData.vision || ''} onChange={(e) => setDeptData({ ...deptData, vision: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Mission Statement</label>
                  <textarea rows={5} value={deptData.mission || ''} onChange={(e) => setDeptData({ ...deptData, mission: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'faculty' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <h3>Faculty Registry ({deptData.faculty?.length || 0} Registered)</h3>
                <button type="button" className="add-btn" onClick={() => addRow('faculty')} style={{ margin: 0, padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                  + Add Faculty Member
                </button>
              </div>

              {(!deptData.faculty || deptData.faculty.length === 0) ? (
                <div className="sheet-empty"><p>No faculty members listed in this department directory.</p></div>
              ) : (
                <div className="sheet-wrap">
                  <table className="sheet-table">
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={{ width: '80px', textAlign: 'center' }}>Photo</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Qualification</th>
                        <th>Area of Interest</th>
                        <th style={{ width: '220px' }}>Profile PDF / URL</th>
                        <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptData.faculty.map((member, i) => (
                        <tr key={i}>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '6px' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                              {member.photoUrl ? (
                                <img src={member.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <i className="fa-solid fa-chalkboard-user" style={{ color: '#94a3b8' }} />
                              )}
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'faculty', i)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} title="Change Photo" />
                            </div>
                            {uploading === `faculty_${i}_photoUrl` && <div style={{ fontSize: '0.6rem', color: 'var(--brand-orange-text)' }}>Uploading...</div>}
                          </td>
                          <td>
                            <input value={member.name || ''} onChange={(e) => updateRowField('faculty', i, 'name', e.target.value)} style={{ fontWeight: 600 }} />
                          </td>
                          <td>
                            <input value={member.designation || ''} onChange={(e) => updateRowField('faculty', i, 'designation', e.target.value)} />
                          </td>
                          <td>
                            <input value={member.qualification || ''} onChange={(e) => updateRowField('faculty', i, 'qualification', e.target.value)} />
                          </td>
                          <td>
                            <input value={member.areaOfInterest || ''} onChange={(e) => updateRowField('faculty', i, 'areaOfInterest', e.target.value)} />
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <input 
                                value={member.profileUrl || ''} 
                                onChange={(e) => updateRowField('faculty', i, 'profileUrl', e.target.value)} 
                                placeholder="PDF profile link..." 
                                style={{ flex: 1 }}
                              />
                              <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
                                <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626' }}></i>
                                <input 
                                  type="file" 
                                  accept=".pdf" 
                                  onChange={(e) => handleFileUpload(e, 'faculty', i, 'profileUrl')} 
                                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                                  title="Upload Profile PDF" 
                                />
                              </div>
                            </div>
                            {uploading === `faculty_${i}_profileUrl` && <div style={{ fontSize: '0.6rem', color: 'var(--brand-orange-text)' }}>Uploading PDF...</div>}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button type="button" className="delete-btn" onClick={() => deleteRow('faculty', i)} style={{ width: '28px', height: '28px', margin: '0 auto' }}>×</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'labs' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <h3>Academic & Research Labs ({deptData.labs?.length || 0} Registered)</h3>
                <button type="button" className="add-btn" onClick={() => addRow('labs')} style={{ margin: 0, padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                  + Add Lab Facility
                </button>
              </div>

              {(!deptData.labs || deptData.labs.length === 0) ? (
                <div className="sheet-empty"><p>No laboratories configured for this department yet.</p></div>
              ) : (
                <div className="sheet-wrap">
                  <table className="sheet-table">
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={{ width: '150px' }}>Facility Image</th>
                        <th style={{ width: '250px' }}>Lab Title</th>
                        <th>Specifications / Description</th>
                        <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptData.labs.map((lab, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ width: '130px', height: '80px', borderRadius: '4px', background: '#e2e8f0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid #cbd5e1' }}>
                              {lab.photoUrl ? (
                                <img src={lab.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <i className="fa-solid fa-network-wired" style={{ color: '#94a3b8', fontSize: '1.5rem' }} />
                              )}
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'labs', i)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} title="Change Image" />
                            </div>
                            {uploading === `labs_${i}` && <div style={{ fontSize: '0.6rem', color: 'var(--brand-orange-text)', textAlign: 'center' }}>Uploading...</div>}
                          </td>
                          <td>
                            <input value={lab.title || ''} onChange={(e) => updateRowField('labs', i, 'title', e.target.value)} style={{ fontWeight: 600 }} />
                          </td>
                          <td>
                            <textarea rows={3} value={lab.description || ''} onChange={(e) => updateRowField('labs', i, 'description', e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', resize: 'vertical' }} />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button type="button" className="delete-btn" onClick={() => deleteRow('labs', i)} style={{ width: '28px', height: '28px', margin: '0 auto' }}>×</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'seo' && (
            <div className="admin-grid-edit" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="admin-card">
                <h3>Google Search Results Mockup</h3>
                <p className="media-hint" style={{ marginBottom: '1.5rem' }}>Visual representation of this department's Google share indices.</p>
                
                <div style={{
                  background: '#fff',
                  border: '1px solid #dadce0',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  fontFamily: 'arial, sans-serif',
                  boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
                  maxWidth: '600px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '12px', color: '#202124' }}>
                    <img src="/logo.png" alt="" onError={(e) => { e.target.src = 'https://api.dicebear.com/9.x/initials/svg?seed=KMIT' }} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#f1f3f4', padding: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'normal' }}>Keshav Memorial Institute of Technology</span>
                      <span style={{ fontSize: '10px', color: '#70757a', lineHeight: 1 }}>https://kmit.in/academics/{deptKey}</span>
                    </div>
                  </div>
                  <h4 style={{
                    color: '#1a0dab',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    margin: '4px 0 2px 0',
                    lineHeight: '1.3',
                    fontFamily: 'arial, sans-serif'
                  }}>
                    {deptData.seo?.title || `${deptData.name || deptKey.toUpperCase()} Department | KMIT`}
                  </h4>
                  <p style={{
                    color: '#4d5156',
                    fontSize: '14px',
                    lineHeight: '1.58',
                    margin: 0,
                    fontFamily: 'arial, sans-serif'
                  }}>
                    {deptData.seo?.description || `Explore ${deptData.name} Department at KMIT Hyderabad. Faculty registries, timetables, lab configurations, student achievements and syllabus circulars.`}
                  </p>
                </div>
              </div>

              <div className="admin-card">
                <h3>Department SEO tags</h3>
                <div className="form-group">
                  <label>SEO Title Tag</label>
                  <input
                    value={deptData.seo?.title || ''}
                    placeholder={`${deptData.name} Department | KMIT`}
                    onChange={(e) => setDeptData({ ...deptData, seo: { ...(deptData.seo || {}), title: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label>SEO Meta Description</label>
                  <textarea
                    rows={4}
                    value={deptData.seo?.description || ''}
                    placeholder="Brief paragraph summarizing the department for organic Google crawlers..."
                    onChange={(e) => setDeptData({ ...deptData, seo: { ...(deptData.seo || {}), description: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label>SEO Keywords (Comma Separated)</label>
                  <input
                    value={deptData.seo?.keywords || ''}
                    placeholder="computer science, CSE faculty kmit, artificial intelligence"
                    onChange={(e) => setDeptData({ ...deptData, seo: { ...(deptData.seo || {}), keywords: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Floating Save Button */}
      {deptData && (
        <div style={{ position: 'fixed', bottom: '25px', right: '35px', zIndex: 999 }}>
          <button type="button" className="add-btn" onClick={handleSave} disabled={saving} style={{ margin: 0, padding: '1rem 2rem', boxShadow: '0 8px 25px rgba(241,127,8,0.3)', background: 'var(--crimson)', borderRadius: '30px' }}>
            <i className="fa-solid fa-cloud-arrow-up" /> {saving ? 'Saving changes...' : 'Save Department details'}
          </button>
        </div>
      )}
    </div>
  )
}
