import { useState, useEffect } from 'react'
import { adminApi } from '../../../services/adminApi'
import { uploadMedia } from '../../../services/mediaService'

const CATEGORIES = ['Notification', 'Hall Ticket', 'Timetable', 'Result', 'Circular']
const VIEW_MODES = [
  { value: 'view', label: 'View in Browser' },
  { value: 'download', label: 'Force Download' },
  { value: 'both', label: 'Both View & Download' }
]

export default function ExamsModule({ showToast }) {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All') // 'All', 'Active', 'Expired', 'Archived'
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState(null) // null for create, object for edit
  const [form, setForm] = useState({
    title: '',
    category: 'Notification',
    publishDate: '',
    expiryDate: '',
    fileUrl: '',
    viewMode: 'both',
    linkUrl: '',
    isArchived: false
  })
  
  // Upload state inside modal
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Load admin exams
  const loadExams = async () => {
    setLoading(true)
    try {
      const data = await adminApi.exams.listAdmin()
      setExams(data)
    } catch (err) {
      if (showToast) showToast(`Error: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExams()
  }, [])

  // Open modal for creating new exam
  const handleCreateOpen = () => {
    setEditingExam(null)
    const today = new Date().toISOString().split('T')[0]
    setForm({
      title: '',
      category: 'Notification',
      publishDate: today,
      expiryDate: '',
      fileUrl: '',
      viewMode: 'both',
      linkUrl: '',
      isArchived: false
    })
    setModalOpen(true)
  }

  // Open modal for editing an existing exam
  const handleEditOpen = (exam) => {
    setEditingExam(exam)
    setForm({
      title: exam.title || '',
      category: exam.category || 'Notification',
      publishDate: exam.publishDate ? new Date(exam.publishDate).toISOString().split('T')[0] : '',
      expiryDate: exam.expiryDate ? new Date(exam.expiryDate).toISOString().split('T')[0] : '',
      fileUrl: exam.fileUrl || '',
      viewMode: exam.viewMode || 'both',
      linkUrl: exam.linkUrl || '',
      isArchived: !!exam.isArchived
    })
    setModalOpen(true)
  }

  // Handle PDF upload inside modal
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    setUploadProgress(0)
    try {
      const asset = await uploadMedia(file, (progress) => {
        setUploadProgress(progress)
      })
      setForm((prev) => ({ ...prev, fileUrl: asset.url }))
      if (showToast) showToast('File uploaded successfully!', 'success')
    } catch (err) {
      if (showToast) showToast(`Upload failed: ${err.message}`, 'error')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  // Save (Create or Update) Exam
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      if (showToast) showToast('Please enter a title', 'error')
      return
    }

    try {
      const payload = {
        ...form,
        publishDate: form.publishDate ? new Date(form.publishDate) : new Date(),
        expiryDate: form.expiryDate ? new Date(form.expiryDate) : null
      }

      if (editingExam) {
        await adminApi.exams.update(editingExam._id, payload)
        if (showToast) showToast('Exam record updated successfully!', 'success')
      } else {
        await adminApi.exams.create(payload)
        if (showToast) showToast('New Exam record created!', 'success')
      }
      
      setModalOpen(false)
      loadExams()
    } catch (err) {
      if (showToast) showToast(`Save failed: ${err.message}`, 'error')
    }
  }

  // Delete Exam
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete the exam: "${title}"?`)) return
    
    try {
      await adminApi.exams.remove(id)
      if (showToast) showToast('Exam record deleted successfully', 'success')
      loadExams()
    } catch (err) {
      if (showToast) showToast(`Delete failed: ${err.message}`, 'error')
    }
  }

  // Toggle quick archival
  const handleToggleArchive = async (exam) => {
    try {
      await adminApi.exams.update(exam._id, { isArchived: !exam.isArchived })
      if (showToast) showToast(exam.isArchived ? 'Exam unarchived' : 'Exam archived', 'success')
      loadExams()
    } catch (err) {
      if (showToast) showToast(`Archive toggle failed: ${err.message}`, 'error')
    }
  }

  // Filter exams based on search query, category and expiry status
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title?.toLowerCase().includes(search.toLowerCase()) || 
                          exam.category?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || exam.category === categoryFilter
    
    const now = new Date()
    const isExpired = exam.expiryDate && new Date(exam.expiryDate) < now
    
    let matchesStatus = true
    if (statusFilter === 'Active') {
      matchesStatus = !exam.isArchived && !isExpired
    } else if (statusFilter === 'Expired') {
      matchesStatus = !exam.isArchived && isExpired
    } else if (statusFilter === 'Archived') {
      matchesStatus = !!exam.isArchived
    }
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Expiry badge generator
  const renderExpiryBadge = (exam) => {
    if (exam.isArchived) {
      return <span className="cms-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>Archived</span>
    }
    const now = new Date()
    if (exam.expiryDate && new Date(exam.expiryDate) < now) {
      return <span className="cms-badge" style={{ background: '#fee2e2', color: '#dc2626' }}>Expired</span>
    }
    return <span className="cms-badge cms-badge-published">Active</span>
  }

  return (
    <div className="cms-module">
      <div className="admin-card cms-toolbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Exams counter directory</h3>
          <p className="media-hint">Dedicated workspace for exam timetables, notifications, hall tickets, and circulars.</p>
        </div>
        <button type="button" className="add-btn" onClick={handleCreateOpen}>
          <i className="fa-solid fa-plus" /> Add Exam Record
        </button>
      </div>

      {/* Filter panel */}
      <div className="admin-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 2rem' }}>
        <div className="cms-form-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'flex-end', gap: '1rem', marginBottom: 0 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ marginBottom: '4px' }}>Search Exams</label>
            <input
              type="text"
              placeholder="Search by title, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ marginBottom: '4px' }}>Circular Category</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ marginBottom: '4px' }}>Publish Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Active">Active (Live)</option>
              <option value="Expired">Expired</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="reset-btn" onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All') }}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table view */}
      <div className="admin-card" style={{ padding: '1rem 0' }}>
        {loading ? (
          <div className="sheet-empty"><p>Loading exams directory…</p></div>
        ) : filteredExams.length === 0 ? (
          <div className="sheet-empty">
            <p>No exam records match your search criteria.</p>
            <button type="button" className="add-btn" onClick={handleCreateOpen} style={{ margin: '1rem auto 0' }}>Add Exam</button>
          </div>
        ) : (
          <div className="sheet-wrap">
            <table className="sheet-table" style={{ border: 'none' }}>
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>Status</th>
                  <th style={{ width: '130px' }}>Category</th>
                  <th>Title</th>
                  <th style={{ width: '120px' }}>Publish Date</th>
                  <th style={{ width: '120px' }}>Expiry Date</th>
                  <th style={{ width: '180px' }}>Attached Files / Links</th>
                  <th style={{ width: '150px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr key={exam._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                      {renderExpiryBadge(exam)}
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <span className="cms-badge" style={{ background: 'rgba(24, 58, 105, 0.08)', color: 'var(--navy)' }}>{exam.category}</span>
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>
                      {exam.title}
                    </td>
                    <td style={{ padding: '0.85rem', fontSize: '0.82rem', color: '#64748b' }}>
                      {exam.publishDate ? new Date(exam.publishDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '0.85rem', fontSize: '0.82rem', color: '#64748b' }}>
                      {exam.expiryDate ? new Date(exam.expiryDate).toLocaleDateString() : <em style={{ opacity: 0.5 }}>Never</em>}
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {exam.fileUrl && (
                          <a href={exam.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: 'var(--brand-orange-text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="fa-solid fa-file-pdf" /> PDF File ({exam.viewMode})
                          </a>
                        )}
                        {exam.linkUrl && (
                          <a href={exam.linkUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="fa-solid fa-link" /> Link URL
                          </a>
                        )}
                        {!exam.fileUrl && !exam.linkUrl && <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>None</span>}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <button type="button" onClick={() => handleEditOpen(exam)} title="Edit Record" style={{ background: '#f1f5f9', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', color: 'var(--navy)' }}>
                          <i className="fa-solid fa-pen-to-square" />
                        </button>
                        <button type="button" onClick={() => handleToggleArchive(exam)} title={exam.isArchived ? 'Unarchive Circular' : 'Archive Circular'} style={{ background: exam.isArchived ? '#dcfce7' : '#fef9c3', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', color: exam.isArchived ? '#166534' : '#854d0e' }}>
                          <i className={`fa-solid ${exam.isArchived ? 'fa-box-open' : 'fa-box'}`} />
                        </button>
                        <button type="button" className="delete-btn" onClick={() => handleDelete(exam._id, exam.title)} title="Delete Record" style={{ width: '30px', height: '30px' }}>
                          <i className="fa-solid fa-trash" style={{ fontSize: '0.8rem' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRUD Modal Form Overlay */}
      {modalOpen && (
        <div className="admin-login-page" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)' }}>
          <div className="login-card" style={{ maxWidth: '640px', padding: '2.5rem', borderRadius: '16px', position: 'relative' }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
            <h3 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              {editingExam ? 'Edit Exam Circular' : 'Create Exam Circular'}
            </h3>
            
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Circular Title</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech IV Year II Sem Timetable June 2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="cms-form-grid cols-2" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label>Circular Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>PDF View Mode</label>
                  <select value={form.viewMode} onChange={(e) => setForm({ ...form, viewMode: e.target.value })}>
                    {VIEW_MODES.map((vm) => <option key={vm.value} value={vm.value}>{vm.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="cms-form-grid cols-2" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label>Publish Date (Show Circular From)</label>
                  <input
                    type="date"
                    value={form.publishDate}
                    onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date (Hide After - Optional)</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>PDF Attachment</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="/uploads/exams/..."
                    value={form.fileUrl}
                    onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <div style={{ position: 'relative' }}>
                    <button type="button" className="add-btn">
                      <i className="fa-solid fa-upload" /> Upload File
                    </button>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                </div>
                {uploading && (
                  <div className="media-progress" style={{ marginTop: '8px' }}>
                    <div className="media-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>External Portal Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://results.jntuh.ac.in/..."
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1.25rem 0' }}>
                <input
                  type="checkbox"
                  id="modalIsArchived"
                  checked={form.isArchived}
                  onChange={(e) => setForm({ ...form, isArchived: e.target.checked })}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
                <label htmlFor="modalIsArchived" style={{ cursor: 'pointer', margin: 0 }}>Archive this circular immediately (hide from visitor SPA)</label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <button type="button" className="reset-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="add-btn">
                  <i className="fa-solid fa-floppy-disk" /> Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
