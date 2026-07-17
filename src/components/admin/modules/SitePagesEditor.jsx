import { useState, useEffect } from 'react'
import { adminApi } from '../../../services/adminApi'
import { uploadMedia } from '../../../services/mediaService'

const BLOCK_TYPES = [
  { value: 'richText', label: 'Rich Text Paragraphs' },
  { value: 'cards', label: 'Feature Cards (Icon/Title/Desc)' },
  { value: 'stats', label: 'Statistics (Value/Label)' },
  { value: 'timeline', label: 'Timeline Events (Year/Title/Desc)' },
  { value: 'badges', label: 'Badges / Accreditations' },
  { value: 'profileCard', label: 'Leadership / Faculty Profiles' },
  { value: 'gallery', label: 'Image Gallery with Lightbox' },
  { value: 'accordion', label: 'Accordions (Expandable FAQ/Details)' },
  { value: 'tabs', label: 'Tabs Layout' },
  { value: 'pdfTable', label: 'PDF Documents Table' },
  { value: 'videoEmbed', label: 'Video Embed (YouTube)' },
  { value: 'contactInfo', label: 'Contact Info Cards' },
  { value: 'downloadList', label: 'File Downloads Directory' },
  { value: 'table', label: 'Data Table' },
  { value: 'dataTable', label: 'Spreadsheet Searchable Table' },
  { value: 'clubGrid', label: 'Student Clubs & Activities Grid' }
]

const PAGES_LIST = [
  { path: 'about', label: 'About Overview' },
  { path: 'about/kmes', label: 'KMES History' },
  { path: 'about/perspective-plan', label: 'Perspective Plan' },
  { path: 'about/hr-policy', label: 'HR Policy' },
  { path: 'administration/principal', label: 'Principal Profile' },
  { path: 'administration/academic-director', label: 'Director Profile' },
  { path: 'administration/hod', label: 'Heads of Departments' },
  { path: 'administration/academic-core-committee', label: 'Academic Core Committee' },
  { path: 'administration/innovation-council', label: 'IIC Council' },
  { path: 'administration/idmc', label: 'IDMC Committee' },
  { path: 'administration/committees', label: 'College Committees' },
  { path: 'admissions/coursesoffered', label: 'Courses Offered' },
  { path: 'admissions/admission-procedure', label: 'Admission Procedure' },
  { path: 'admissions/eapcet-ranks', label: 'EAPCET Ranks' },
  { path: 'admissions/ecet-ranks', label: 'ECET Ranks' },
  { path: 'academics/regulations', label: 'Academic Regulations' },
  { path: 'academics/calendar', label: 'Academic Calendars' },
  { path: 'academics/syllabus', label: 'Syllabus Schemes' },
  { path: 'academics/value-added', label: 'Value-Added Courses' },
  { path: 'academics/awards', label: 'Endowment Awards' },
  { path: 'academics/evaluation', label: 'Teaching Evaluation' },
  { path: 'student-life/events', label: 'Campus Events Timeline' },
  { path: 'student-life/project-school', label: 'Project School' },
  { path: 'admissions/fees', label: 'Fee Structures' }
]

export default function SitePagesEditor({ showToast }) {
  const [editingPage, setEditingPage] = useState('about')
  const [activeTab, setActiveTab] = useState('layout') // 'layout' or 'seo'
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(null) // blockIndex_itemIndex identifier

  // Load decoupled page data
  const loadPage = async (key) => {
    setLoading(true)
    try {
      const data = await adminApi.pages.get(key)
      setPageData(data)
    } catch (err) {
      // Auto-initialize page if empty
      setPageData({
        pageKey: key,
        title: PAGES_LIST.find((p) => p.path === key)?.label || key,
        visible: true,
        hero: { eyebrow: 'KMIT Hyderabad', title: PAGES_LIST.find((p) => p.path === key)?.label || 'Page Title', text: 'Enter header description...' },
        sections: [],
        seo: { title: '', description: '', keywords: '', ogImage: '' }
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPage(editingPage)
  }, [editingPage])

  // Save page back to MongoDB
  const handleSave = async () => {
    if (!pageData) return
    setSaving(true)
    try {
      await adminApi.pages.update(editingPage, pageData)
      if (showToast) showToast('Page successfully updated and live!', 'success')
    } catch (err) {
      if (showToast) showToast(`Failed to save: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  // Handle local block uploads
  const handleBlockFileUpload = async (e, blockIndex, itemIndex = null, field = 'fileUrl') => {
    const file = e.target.files[0]
    if (!file) return

    const identifier = `${blockIndex}_${itemIndex !== null ? itemIndex : 'main'}`
    setUploading(identifier)
    try {
      const asset = await uploadMedia(file)
      const nextSections = [...pageData.sections]
      
      if (itemIndex !== null) {
        nextSections[blockIndex].items[itemIndex][field] = asset.url
      } else {
        nextSections[blockIndex][field] = asset.url
      }
      
      setPageData((prev) => ({ ...prev, sections: nextSections }))
      if (showToast) showToast('Asset uploaded successfully!', 'success')
    } catch (err) {
      if (showToast) showToast(`Upload failed: ${err.message}`, 'error')
    } finally {
      setUploading(null)
    }
  }

  // Reorder sections
  const moveSection = (index, direction) => {
    const next = [...pageData.sections]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    
    // Swap
    const temp = next[index]
    next[index] = next[target]
    next[target] = temp
    
    setPageData((prev) => ({ ...prev, sections: next }))
  }

  // Add a new section block
  const addSection = () => {
    const nextSections = [
      ...pageData.sections,
      { type: 'richText', eyebrow: '', title: '', content: [''] }
    ]
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Change block type and seed empty layout
  const changeBlockType = (index, type) => {
    const nextSections = [...pageData.sections]
    let baseBlock = { type }
    
    if (type === 'richText') {
      baseBlock = { type, eyebrow: '', title: '', content: [''] }
    } else if (type === 'videoEmbed') {
      baseBlock = { type, title: '', videoId: '', caption: '' }
    } else if (type === 'contactInfo') {
      baseBlock = { type, title: '', email: '', phone: '', address: '' }
    } else if (type === 'stats') {
      baseBlock = { type, items: [{ label: 'Stat Metric', value: '100+' }] }
    } else if (type === 'cards') {
      baseBlock = { type, items: [{ title: 'Title', desc: 'Description', icon: 'fa-star' }] }
    } else if (type === 'timeline') {
      baseBlock = { type, items: [{ year: '2026', title: 'Milestone', desc: 'Description' }] }
    } else if (type === 'badges') {
      baseBlock = { type, items: [{ label: 'NAAC A+', iconUrl: '' }] }
    } else if (type === 'profileCard') {
      baseBlock = { type, items: [{ name: 'HOD Name', title: 'Designation', photoUrl: '', desc: 'Bio...' }] }
    } else if (type === 'gallery') {
      baseBlock = { type, items: [{ imageUrl: '', caption: '' }] }
    } else if (type === 'accordion') {
      baseBlock = { type, items: [{ title: 'Question', content: 'Detailed answer...' }] }
    } else if (type === 'tabs') {
      baseBlock = { type, items: [{ label: 'Tab Title', content: 'Panel body content...' }] }
    } else if (type === 'pdfTable' || type === 'downloadList') {
      baseBlock = { type, items: [{ title: 'Document Title', fileUrl: '', viewMode: 'both' }] }
    } else if (type === 'table' || type === 'dataTable') {
      baseBlock = { type, eyebrow: '', title: '', headers: ['S.No', 'Title / Link', 'Label'], rows: [['1', { text: 'Regulations PDF Document', link: '' }, 'Active']], footnote: '' }
    } else if (type === 'clubGrid') {
      baseBlock = { type, items: [{ name: 'Club Name', logoUrl: '', desc: 'Activities...' }] }
    }

    nextSections[index] = baseBlock
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Update specific field inside section
  const updateSectionField = (index, field, value) => {
    const nextSections = [...pageData.sections]
    nextSections[index][field] = value
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Update specific item in section items array
  const updateSectionItemField = (blockIdx, itemIdx, field, value) => {
    const nextSections = [...pageData.sections]
    nextSections[blockIdx].items[itemIdx][field] = value
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Add item to section items array
  const addSectionItem = (blockIdx, type) => {
    const nextSections = [...pageData.sections]
    let emptyItem = {}
    
    if (type === 'stats') emptyItem = { label: 'Stat', value: '0' }
    else if (type === 'cards') emptyItem = { title: 'New Card', desc: 'Desc', icon: 'fa-star' }
    else if (type === 'timeline') emptyItem = { year: '2026', title: 'New Event', desc: 'Desc' }
    else if (type === 'badges') emptyItem = { label: 'New Badge', iconUrl: '' }
    else if (type === 'profileCard') emptyItem = { name: 'Name', title: 'Designation', photoUrl: '', desc: '' }
    else if (type === 'gallery') emptyItem = { imageUrl: '', caption: '' }
    else if (type === 'accordion') emptyItem = { title: 'New Item', content: '' }
    else if (type === 'tabs') emptyItem = { label: 'New Tab', content: '' }
    else if (type === 'pdfTable' || type === 'downloadList') emptyItem = { title: 'New File', fileUrl: '', viewMode: 'both' }
    else if (type === 'clubGrid') emptyItem = { name: 'New Club', logoUrl: '', desc: '' }

    nextSections[blockIdx].items = [...(nextSections[blockIdx].items || []), emptyItem]
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Remove item from section items array
  const removeSectionItem = (blockIdx, itemIdx) => {
    const nextSections = [...pageData.sections]
    nextSections[blockIdx].items = nextSections[blockIdx].items.filter((_, i) => i !== itemIdx)
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  // Dynamic table-specific helpers
  const addTableColumn = (si) => {
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    const colName = window.prompt("Enter new column header name:")
    if (!colName) return
    sec.headers = [...(sec.headers || []), colName]
    sec.rows = (sec.rows || []).map(row => [...row, ''])
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const renameTableColumn = (si, colIdx) => {
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    const oldName = sec.headers[colIdx]
    const newName = window.prompt("Rename column header:", oldName)
    if (newName === null) return
    sec.headers[colIdx] = newName
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const deleteTableColumn = (si, colIdx) => {
    if (!window.confirm("Are you sure you want to delete this column and all its cell data?")) return
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    sec.headers = sec.headers.filter((_, i) => i !== colIdx)
    sec.rows = sec.rows.map(row => row.filter((_, j) => j !== colIdx))
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const addTableRow = (si) => {
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    const newRow = Array((sec.headers || []).length).fill('')
    sec.rows = [...(sec.rows || []), newRow]
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const deleteTableRow = (si, rowIdx) => {
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    sec.rows = sec.rows.filter((_, i) => i !== rowIdx)
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const moveTableRow = (si, rowIdx, direction) => {
    const nextSections = [...pageData.sections]
    const sec = nextSections[si]
    const targetIdx = rowIdx + direction
    if (targetIdx < 0 || targetIdx >= (sec.rows || []).length) return
    const temp = sec.rows[rowIdx]
    sec.rows[rowIdx] = sec.rows[targetIdx]
    sec.rows[targetIdx] = temp
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const updateTableCell = (si, rowIdx, colIdx, value) => {
    const nextSections = [...pageData.sections]
    nextSections[si].rows[rowIdx][colIdx] = value
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  const toggleCellLinkType = (si, rowIdx, colIdx) => {
    const nextSections = [...pageData.sections]
    const cell = nextSections[si].rows[rowIdx][colIdx]
    if (typeof cell === 'object' && cell !== null) {
      nextSections[si].rows[rowIdx][colIdx] = cell.text || ''
    } else {
      nextSections[si].rows[rowIdx][colIdx] = { text: String(cell || ''), link: '' }
    }
    setPageData((prev) => ({ ...prev, sections: nextSections }))
  }

  return (
    <div>
      <div className="admin-card cms-toolbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Visual Page Builder</h3>
          <p className="media-hint">Select a dynamic page route below to customize its visual blocks and SEO metadata.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select value={editingPage} onChange={(e) => setEditingPage(e.target.value)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>
            {PAGES_LIST.map((r) => <option key={r.path} value={r.path}>{r.label} ({r.path})</option>)}
          </select>
          <button type="button" className="view-site-btn" onClick={() => window.open(`/${editingPage}`, '_blank')}>
            <i className="fa-solid fa-arrow-up-right-from-square" /> Live Page
          </button>
          <button type="button" className="add-btn" onClick={handleSave} disabled={saving} style={{ margin: 0, padding: '0.65rem 1.5rem' }}>
            <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      <div className="cms-subnav">
        <button type="button" className={activeTab === 'layout' ? 'active' : ''} onClick={() => setActiveTab('layout')}>
          <i className="fa-solid fa-cubes" style={{ marginRight: '6px' }} /> Page Layout Blocks
        </button>
        <button type="button" className={activeTab === 'seo' ? 'active' : ''} onClick={() => setActiveTab('seo')}>
          <i className="fa-solid fa-search" style={{ marginRight: '6px' }} /> Search Engine SEO Settings
        </button>
      </div>

      {loading ? (
        <div className="admin-card cms-empty"><p>Loading page configuration data…</p></div>
      ) : !pageData ? (
        <div className="admin-card cms-empty"><p>Could not load page data.</p></div>
      ) : (
        <>
          {activeTab === 'layout' && (
            <div className="admin-grid-edit" style={{ gridTemplateColumns: '1fr 2fr' }}>
              
              {/* Hero Banner Controls */}
              <div className="admin-card">
                <h3 style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>Hero Banner Header</h3>
                <div className="form-group">
                  <label>Eyebrow Text</label>
                  <input value={pageData.hero?.eyebrow || ''} onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, eyebrow: e.target.value } })} />
                </div>
                <div className="form-group">
                  <label>Header Title</label>
                  <input value={pageData.hero?.title || ''} onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, title: e.target.value } })} />
                </div>
                <div className="form-group">
                  <label>Description Text</label>
                  <textarea rows={4} value={pageData.hero?.text || ''} onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, text: e.target.value } })} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.5rem' }}>
                  <input type="checkbox" id="pageVisible" checked={!!pageData.visible} onChange={(e) => setPageData({ ...pageData, visible: e.target.checked })} style={{ width: 'auto', cursor: 'pointer' }} />
                  <label htmlFor="pageVisible" style={{ cursor: 'pointer', margin: 0 }}>Show this page on navigation menus</label>
                </div>
              </div>

              {/* Sections Block list */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                  <h3>Layout Blocks ({pageData.sections?.length || 0})</h3>
                  <button type="button" className="add-btn" onClick={addSection} style={{ margin: 0, padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                    + Add Block
                  </button>
                </div>

                {(!pageData.sections || pageData.sections.length === 0) ? (
                  <div className="sheet-empty" style={{ padding: '3rem' }}><p>No visual blocks added to this page yet. Click "+ Add Block" above to begin customizing.</p></div>
                ) : (
                  pageData.sections.map((sec, si) => (
                    <div key={si} className="cms-block" style={{ border: '1px solid #cbd5e1', borderRadius: '8px', background: '#f8fafc', padding: '1.25rem', marginBottom: '1.5rem' }}>
                      <div className="cms-block-head" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ background: 'var(--navy)', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>{si + 1}</span>
                          <strong style={{ color: 'var(--navy)' }}>Block Type:</strong>
                          <select value={sec.type} onChange={(e) => changeBlockType(si, e.target.value)} style={{ padding: '0.35rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                            {BLOCK_TYPES.map((bt) => <option key={bt.value} value={bt.value}>{bt.label}</option>)}
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button type="button" onClick={() => moveSection(si, -1)} disabled={si === 0} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', cursor: si === 0 ? 'not-allowed' : 'pointer', opacity: si === 0 ? 0.4 : 1 }} title="Move Block Up">
                            <i className="fa-solid fa-arrow-up" />
                          </button>
                          <button type="button" onClick={() => moveSection(si, 1)} disabled={si === pageData.sections.length - 1} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', cursor: si === pageData.sections.length - 1 ? 'not-allowed' : 'pointer', opacity: si === pageData.sections.length - 1 ? 0.4 : 1 }} title="Move Block Down">
                            <i className="fa-solid fa-arrow-down" />
                          </button>
                          <button type="button" className="delete-btn" onClick={() => setPageData((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== si) }))} style={{ width: '28px', height: '28px', marginLeft: '6px' }} title="Delete Block">
                            &times;
                          </button>
                        </div>
                      </div>

                      {/* Render block specific inputs */}
                      {sec.type === 'richText' && (
                        <div>
                          <div className="form-group"><label>Eyebrow / Small header</label>
                            <input value={sec.eyebrow || ''} onChange={(e) => updateSectionField(si, 'eyebrow', e.target.value)} />
                          </div>
                          <div className="form-group"><label>Section Title</label>
                            <input value={sec.title || ''} onChange={(e) => updateSectionField(si, 'title', e.target.value)} />
                          </div>
                          <div className="form-group"><label>Paragraphs Content</label>
                            {(sec.content || ['']).map((para, pi) => (
                              <div key={pi} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                                <textarea rows={4} value={para} onChange={(e) => {
                                  const c = [...sec.content]; c[pi] = e.target.value
                                  updateSectionField(si, 'content', c)
                                }} style={{ flex: 1 }} />
                                <button type="button" className="delete-btn" onClick={() => {
                                  const c = sec.content.filter((_, i) => i !== pi)
                                  updateSectionField(si, 'content', c.length ? c : [''])
                                }} style={{ width: '38px', height: '38px' }}>×</button>
                              </div>
                            ))}
                            <button type="button" className="add-btn" onClick={() => updateSectionField(si, 'content', [...(sec.content || []), ''])} style={{ padding: '4px 10px', fontSize: '0.75rem', marginTop: '4px' }}>+ Add Paragraph</button>
                          </div>
                        </div>
                      )}

                      {sec.type === 'videoEmbed' && (
                        <div className="cms-form-grid cols-2">
                          <div className="form-group"><label>Title</label>
                            <input value={sec.title || ''} onChange={(e) => updateSectionField(si, 'title', e.target.value)} />
                          </div>
                          <div className="form-group"><label>YouTube Video ID</label>
                            <input value={sec.videoId || ''} placeholder="e.g. dQw4w9WgXcQ" onChange={(e) => updateSectionField(si, 'videoId', e.target.value)} />
                          </div>
                        </div>
                      )}

                      {sec.type === 'contactInfo' && (
                        <div className="cms-form-grid cols-2">
                          <div className="form-group"><label>Card Title</label>
                            <input value={sec.title || ''} onChange={(e) => updateSectionField(si, 'title', e.target.value)} />
                          </div>
                          <div className="form-group"><label>Email Address</label>
                            <input value={sec.email || ''} onChange={(e) => updateSectionField(si, 'email', e.target.value)} />
                          </div>
                          <div className="form-group"><label>Phone Number</label>
                            <input value={sec.phone || ''} onChange={(e) => updateSectionField(si, 'phone', e.target.value)} />
                          </div>
                          <div className="form-group"><label>Physical Address</label>
                            <input value={sec.address || ''} onChange={(e) => updateSectionField(si, 'address', e.target.value)} />
                          </div>
                        </div>
                      )}

                      {/* Items arrays for lists */}
                      {['stats', 'cards', 'timeline', 'badges', 'profileCard', 'gallery', 'accordion', 'tabs', 'pdfTable', 'downloadList', 'clubGrid'].includes(sec.type) && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <label style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', color: '#64748b' }}>Item Cards list</label>
                            <button type="button" className="add-btn" onClick={() => addSectionItem(si, sec.type)} style={{ padding: '3px 8px', fontSize: '0.7rem', margin: 0 }}>+ Add Card Item</button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(sec.items || []).map((item, ii) => (
                              <div key={ii} className="cms-block-item" style={{ border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '1rem', background: '#fff', position: 'relative' }}>
                                <button type="button" onClick={() => removeSectionItem(si, ii)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#dc2626', fontSize: '1rem', cursor: 'pointer' }} title="Remove Item">&times;</button>
                                
                                <div className="cms-form-grid cols-2" style={{ marginBottom: 0, gap: '0.5rem' }}>
                                  
                                  {/* Stats */}
                                  {sec.type === 'stats' && (
                                    <>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Stat Value</label>
                                        <input value={item.value || ''} placeholder="e.g. 100+" onChange={(e) => updateSectionItemField(si, ii, 'value', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Metric Label</label>
                                        <input value={item.label || ''} placeholder="e.g. Faculty Members" onChange={(e) => updateSectionItemField(si, ii, 'label', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* Cards */}
                                  {sec.type === 'cards' && (
                                    <>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Title</label>
                                        <input value={item.title || ''} onChange={(e) => updateSectionItemField(si, ii, 'title', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>FontAwesome Icon class</label>
                                        <input value={item.icon || ''} placeholder="e.g. fa-star" onChange={(e) => updateSectionItemField(si, ii, 'icon', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Description text</label>
                                        <textarea rows={2} value={item.desc || ''} onChange={(e) => updateSectionItemField(si, ii, 'desc', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* Accordions / FAQ / Tabs */}
                                  {(sec.type === 'accordion' || sec.type === 'tabs') && (
                                    <>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Item Tab / Accordion Title</label>
                                        <input value={item.title || item.label || ''} onChange={(e) => {
                                          updateSectionItemField(si, ii, 'title', e.target.value)
                                          updateSectionItemField(si, ii, 'label', e.target.value)
                                        }} />
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Rich Content text</label>
                                        <textarea rows={3} value={item.content || ''} onChange={(e) => updateSectionItemField(si, ii, 'content', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* Timelines */}
                                  {sec.type === 'timeline' && (
                                    <>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Year / Milestone</label>
                                        <input value={item.year || ''} placeholder="e.g. 2026" onChange={(e) => updateSectionItemField(si, ii, 'year', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Event Title</label>
                                        <input value={item.title || ''} onChange={(e) => updateSectionItemField(si, ii, 'title', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Event Description</label>
                                        <textarea rows={2} value={item.desc || ''} onChange={(e) => updateSectionItemField(si, ii, 'desc', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* Profiles */}
                                  {sec.type === 'profileCard' && (
                                    <>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Full Name</label>
                                        <input value={item.name || ''} onChange={(e) => updateSectionItemField(si, ii, 'name', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Title / Role</label>
                                        <input value={item.title || ''} onChange={(e) => updateSectionItemField(si, ii, 'title', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Photo URL / File Picker</label>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                          <input value={item.photoUrl || ''} onChange={(e) => updateSectionItemField(si, ii, 'photoUrl', e.target.value)} style={{ flex: 1 }} />
                                          <div style={{ position: 'relative' }}>
                                            <button type="button" className="add-btn" style={{ margin: 0, padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Upload</button>
                                            <input type="file" accept="image/*" onChange={(e) => handleBlockFileUpload(e, si, ii, 'photoUrl')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                                          </div>
                                        </div>
                                        {uploading === `${si}_${ii}` && <div className="media-progress"><div className="media-progress-bar" style={{ width: '100%' }} /></div>}
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Short Bio</label>
                                        <textarea rows={2} value={item.desc || ''} onChange={(e) => updateSectionItemField(si, ii, 'desc', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* PDF Tables & Download Directories */}
                                  {(sec.type === 'pdfTable' || sec.type === 'downloadList') && (
                                    <>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Document Name</label>
                                        <input value={item.title || ''} onChange={(e) => updateSectionItemField(si, ii, 'title', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>File PDF Attachment / Link</label>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                          <input value={item.fileUrl || ''} onChange={(e) => updateSectionItemField(si, ii, 'fileUrl', e.target.value)} style={{ flex: 1 }} />
                                          <div style={{ position: 'relative' }}>
                                            <button type="button" className="add-btn" style={{ margin: 0, padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Upload</button>
                                            <input type="file" accept=".pdf" onChange={(e) => handleBlockFileUpload(e, si, ii, 'fileUrl')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Visitor View Option</label>
                                        <select value={item.viewMode || 'both'} onChange={(e) => updateSectionItemField(si, ii, 'viewMode', e.target.value)}>
                                          <option value="both">View & Download</option>
                                          <option value="view">View in Browser</option>
                                          <option value="download">Force Download</option>
                                        </select>
                                      </div>
                                    </>
                                  )}

                                  {/* Galleries & Images */}
                                  {sec.type === 'gallery' && (
                                    <>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Image Upload</label>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                          <input value={item.imageUrl || ''} onChange={(e) => updateSectionItemField(si, ii, 'imageUrl', e.target.value)} style={{ flex: 1 }} />
                                          <div style={{ position: 'relative' }}>
                                            <button type="button" className="add-btn" style={{ margin: 0, padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Upload</button>
                                            <input type="file" accept="image/*" onChange={(e) => handleBlockFileUpload(e, si, ii, 'imageUrl')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Image Caption</label>
                                        <input value={item.caption || ''} onChange={(e) => updateSectionItemField(si, ii, 'caption', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                  {/* Student Clubs */}
                                  {sec.type === 'clubGrid' && (
                                    <>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Club Name</label>
                                        <input value={item.name || ''} onChange={(e) => updateSectionItemField(si, ii, 'name', e.target.value)} />
                                      </div>
                                      <div className="form-group" style={{ marginBottom: 0 }}><label>Club Logo / Image</label>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                          <input value={item.logoUrl || ''} onChange={(e) => updateSectionItemField(si, ii, 'logoUrl', e.target.value)} style={{ flex: 1 }} />
                                          <div style={{ position: 'relative' }}>
                                            <button type="button" className="add-btn" style={{ margin: 0, padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Upload</button>
                                            <input type="file" accept="image/*" onChange={(e) => handleBlockFileUpload(e, si, ii, 'logoUrl')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}><label>Description Activities</label>
                                        <textarea rows={2} value={item.desc || ''} onChange={(e) => updateSectionItemField(si, ii, 'desc', e.target.value)} />
                                      </div>
                                    </>
                                  )}

                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specialized Data Tables / dataTable */}
                      {(sec.type === 'table' || sec.type === 'dataTable') && (
                        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginTop: '0.5rem' }}>
                          <div className="cms-form-grid cols-2" style={{ marginBottom: '1.5rem', gap: '1rem' }}>
                            <div className="form-group"><label>Eyebrow / Small Header</label>
                              <input value={sec.eyebrow || ''} onChange={(e) => updateSectionField(si, 'eyebrow', e.target.value)} />
                            </div>
                            <div className="form-group"><label>Section Title</label>
                              <input value={sec.title || ''} onChange={(e) => updateSectionField(si, 'title', e.target.value)} />
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                            <h4 style={{ color: 'var(--navy)', margin: 0, fontWeight: 700 }}>Spreadsheet Columns / Headers</h4>
                            <button type="button" className="add-btn" onClick={() => addTableColumn(si)} style={{ padding: '4px 10px', fontSize: '0.75rem', margin: 0 }}>
                              + Add Column
                            </button>
                          </div>

                          {/* Column list manager */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                            {(sec.headers || []).map((header, colIdx) => (
                              <div key={colIdx} style={{ display: 'inline-flex', alignItems: 'center', background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '30px', fontSize: '0.85rem' }}>
                                <span style={{ fontWeight: 600, color: 'var(--navy)', marginRight: '8px' }}>{header}</span>
                                <button type="button" onClick={() => renameTableColumn(si, colIdx)} style={{ background: 'none', border: 'none', color: 'var(--vibrant-accent)', cursor: 'pointer', padding: '0 4px', fontSize: '0.9em' }} title="Rename Header">
                                  <i className="fa-solid fa-pen" />
                                </button>
                                <button type="button" onClick={() => deleteTableColumn(si, colIdx)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0 4px', fontSize: '1em' }} title="Delete Column">
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ color: 'var(--navy)', margin: 0, fontWeight: 700 }}>Table Rows ({ (sec.rows || []).length })</h4>
                            <button type="button" className="add-btn" onClick={() => addTableRow(si)} style={{ padding: '6px 14px', fontSize: '0.8rem', margin: 0 }}>
                              + Add Row
                            </button>
                          </div>

                          {/* Spreadsheet data grid */}
                          {(!sec.rows || sec.rows.length === 0) ? (
                            <div className="sheet-empty" style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
                              <p>No rows in this table yet. Click "+ Add Row" above to get started.</p>
                            </div>
                          ) : (
                            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: '0.88rem' }}>
                                <thead>
                                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                                    <th style={{ padding: '8px 12px', textAlign: 'center', width: '50px', color: '#64748b', fontWeight: 600 }}>#</th>
                                    {(sec.headers || []).map((header, colIdx) => (
                                      <th key={colIdx} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--navy)', fontWeight: 700 }}>
                                        {header}
                                      </th>
                                    ))}
                                    <th style={{ padding: '8px 12px', textAlign: 'center', width: '140px', color: '#64748b', fontWeight: 600 }}>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sec.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                      {/* Index */}
                                      <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 'bold', color: '#64748b', background: '#f8fafc' }}>
                                        {rowIdx + 1}
                                      </td>

                                      {/* Cells */}
                                      {(sec.headers || []).map((_, colIdx) => {
                                        const cell = row[colIdx]
                                        const isLink = typeof cell === 'object' && cell !== null
                                        return (
                                          <td key={colIdx} style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                              <button
                                                type="button"
                                                onClick={() => toggleCellLinkType(si, rowIdx, colIdx)}
                                                style={{
                                                  background: isLink ? 'rgba(255, 107, 0, 0.1)' : 'transparent',
                                                  border: isLink ? '1px solid var(--vibrant-accent)' : '1px solid #cbd5e1',
                                                  color: isLink ? 'var(--vibrant-accent)' : '#64748b',
                                                  width: '28px',
                                                  height: '28px',
                                                  borderRadius: '6px',
                                                  display: 'inline-flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  cursor: 'pointer',
                                                  flexShrink: 0
                                                }}
                                                title={isLink ? "Toggle plain text mode" : "Toggle PDF link/anchor mode"}
                                              >
                                                <i className="fa-solid fa-link" style={{ fontSize: '0.85rem' }} />
                                              </button>

                                              {isLink ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                                  <input
                                                    value={cell.text || ''}
                                                    placeholder="Link Label (e.g. KR24 Regulations)"
                                                    onChange={(e) => updateTableCell(si, rowIdx, colIdx, { ...cell, text: e.target.value })}
                                                    style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                                                  />
                                                  <div style={{ display: 'flex', gap: '4px' }}>
                                                    <input
                                                      value={cell.link || ''}
                                                      placeholder="Link URL / PDF path (e.g. /uploads/KR24.pdf)"
                                                      onChange={(e) => updateTableCell(si, rowIdx, colIdx, { ...cell, link: e.target.value })}
                                                      style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem', flex: 1, fontFamily: 'monospace' }}
                                                    />
                                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                                      <button type="button" className="add-btn" style={{ margin: 0, padding: '5px 10px', fontSize: '0.75rem', height: '100%', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                                        Upload
                                                      </button>
                                                      <input
                                                        type="file"
                                                        accept=".pdf"
                                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                                        onChange={async (e) => {
                                                          const file = e.target.files[0]
                                                          if (!file) return
                                                          try {
                                                            const asset = await uploadMedia(file)
                                                            updateTableCell(si, rowIdx, colIdx, { text: cell.text || file.name, link: asset.url })
                                                            if (showToast) showToast('PDF uploaded successfully!', 'success')
                                                          } catch (err) {
                                                            if (showToast) showToast(`Upload failed: ${err.message}`, 'error')
                                                          }
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <input
                                                  value={cell || ''}
                                                  placeholder="Cell text..."
                                                  onChange={(e) => updateTableCell(si, rowIdx, colIdx, e.target.value)}
                                                  style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', flex: 1 }}
                                                />
                                              )}
                                            </div>
                                          </td>
                                        )
                                      })}

                                      {/* Actions */}
                                      <td style={{ padding: '10px 12px', verticalAlign: 'middle', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                          <button
                                            type="button"
                                            onClick={() => moveTableRow(si, rowIdx, -1)}
                                            disabled={rowIdx === 0}
                                            style={{
                                              background: '#fff',
                                              border: '1px solid #cbd5e1',
                                              padding: '4px 6px',
                                              borderRadius: '4px',
                                              cursor: rowIdx === 0 ? 'not-allowed' : 'pointer',
                                              opacity: rowIdx === 0 ? 0.4 : 1
                                            }}
                                            title="Move Row Up"
                                          >
                                            <i className="fa-solid fa-arrow-up" style={{ fontSize: '0.75rem' }} />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => moveTableRow(si, rowIdx, 1)}
                                            disabled={rowIdx === sec.rows.length - 1}
                                            style={{
                                              background: '#fff',
                                              border: '1px solid #cbd5e1',
                                              padding: '4px 6px',
                                              borderRadius: '4px',
                                              cursor: rowIdx === sec.rows.length - 1 ? 'not-allowed' : 'pointer',
                                              opacity: rowIdx === sec.rows.length - 1 ? 0.4 : 1
                                            }}
                                            title="Move Row Down"
                                          >
                                            <i className="fa-solid fa-arrow-down" style={{ fontSize: '0.75rem' }} />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => deleteTableRow(si, rowIdx)}
                                            style={{
                                              background: 'rgba(220, 38, 38, 0.1)',
                                              border: '1px solid rgba(220, 38, 38, 0.2)',
                                              color: '#dc2626',
                                              padding: '4px 8px',
                                              borderRadius: '4px',
                                              cursor: 'pointer'
                                            }}
                                            title="Delete Row"
                                          >
                                            <i className="fa-solid fa-trash-can" style={{ fontSize: '0.75rem' }} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          <div className="form-group" style={{ marginTop: '1.5rem' }}><label>Table Footnote (italicized at the bottom)</label>
                            <input value={sec.footnote || ''} placeholder="e.g. *Note: Regulations are subject to periodic revision." onChange={(e) => updateSectionField(si, 'footnote', e.target.value)} />
                          </div>
                        </div>
                      )}

                    </div>
                  ))
                )}
                
                <button type="button" className="add-btn" onClick={addSection} style={{ width: '100%', padding: '1rem', borderStyle: 'dashed', background: '#fff', border: '2px dashed #cbd5e1', color: 'var(--navy)' }}>
                  + Add Dynamic Content Block
                </button>
              </div>

            </div>
          )}

          {activeTab === 'seo' && (
            <div className="admin-grid-edit" style={{ gridTemplateColumns: '1fr 1fr' }}>
              
              {/* Google search card SERP preview mockup */}
              <div className="admin-card">
                <h3 style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>Interactive Google Search Preview</h3>
                <p className="media-hint" style={{ marginBottom: '1.5rem' }}>Visual representation of how this page's metadata will rank and look on Google results page.</p>
                
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
                      <span style={{ fontWeight: 'normal', color: '#202124' }}>Keshav Memorial Institute of Technology</span>
                      <span style={{ fontSize: '10px', color: '#70757a', lineHeight: 1 }}>https://kmit.in/{editingPage}</span>
                    </div>
                  </div>
                  <h4 style={{
                    color: '#1a0dab',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    margin: '4px 0 2px 0',
                    lineHeight: '1.3',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    fontFamily: 'arial, sans-serif'
                  }}>
                    {pageData.seo?.title || pageData.hero?.title || pageData.title} | KMIT
                  </h4>
                  <p style={{
                    color: '#4d5156',
                    fontSize: '14px',
                    lineHeight: '1.58',
                    margin: 0,
                    wordBreak: 'break-word',
                    fontFamily: 'arial, sans-serif'
                  }}>
                    {pageData.seo?.description || pageData.hero?.text || 'Access Keshav Memorial Institute of Technology, Hyderabad (KMIT). Comprehensive listings, timetables, events, departments legacy logs, syllabus and campus procedures.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', alignItems: 'center' }}>
                  <div style={{ width: '120px', height: '80px', borderRadius: '6px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    {pageData.seo?.ogImage ? (
                      <img src={pageData.seo.ogImage} alt="OG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <i className="fa-solid fa-photo-film" style={{ fontSize: '1.5rem', color: '#94a3b8' }} />
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 800, margin: '0 0 4px 0' }}>Social Media Share Image (og:image)</h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>Recommended dimensions: 1200x630px. Used by WhatsApp, LinkedIn, and Facebook links.</p>
                  </div>
                </div>
              </div>

              {/* Editable fields */}
              <div className="admin-card">
                <h3 style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>SEO Meta Tags Editor</h3>
                
                <div className="form-group">
                  <label>SEO Title Tag</label>
                  <input
                    value={pageData.seo?.title || ''}
                    placeholder="e.g. Best Engineering Colleges in Hyderabad | KMIT"
                    onChange={(e) => setPageData({ ...pageData, seo: { ...pageData.seo, title: e.target.value } })}
                  />
                  <small style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optimal length: 50–60 characters.</small>
                </div>

                <div className="form-group">
                  <label>SEO Meta Description</label>
                  <textarea
                    rows={4}
                    value={pageData.seo?.description || ''}
                    placeholder="Brief description summarizing the content of this page for crawlers..."
                    onChange={(e) => setPageData({ ...pageData, seo: { ...pageData.seo, description: e.target.value } })}
                  />
                  <small style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optimal length: 150–160 characters.</small>
                </div>

                <div className="form-group">
                  <label>SEO Keywords (Comma Separated)</label>
                  <input
                    value={pageData.seo?.keywords || ''}
                    placeholder="kmit, btech admission, computer science hyderabad"
                    onChange={(e) => setPageData({ ...pageData, seo: { ...pageData.seo, keywords: e.target.value } })}
                  />
                </div>

                <div className="form-group">
                  <label>OpenGraph Share Image Link (og:image)</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      value={pageData.seo?.ogImage || ''}
                      placeholder="/uploads/share-images/overview.jpg"
                      onChange={(e) => setPageData({ ...pageData, seo: { ...pageData.seo, ogImage: e.target.value } })}
                      style={{ flex: 1 }}
                    />
                    <div style={{ position: 'relative' }}>
                      <button type="button" className="add-btn" style={{ margin: 0, padding: '0.8rem 1.25rem' }}>
                        <i className="fa-solid fa-upload" /> Upload
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleBlockFileUpload(e, null, null, 'ogImage')}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </>
      )}

      {/* Floating Save Button */}
      {pageData && (
        <div style={{ position: 'fixed', bottom: '25px', right: '35px', zIndex: 999 }}>
          <button type="button" className="add-btn" onClick={handleSave} disabled={saving} style={{ margin: 0, padding: '1rem 2rem', boxShadow: '0 8px 25px rgba(241,127,8,0.3)', background: 'var(--crimson)', borderRadius: '30px' }}>
            <i className="fa-solid fa-cloud-arrow-up" /> {saving ? 'Saving changes...' : 'Save Page Layout & SEO'}
          </button>
        </div>
      )}
    </div>
  )
}
