import { useState, useEffect, useCallback, useRef } from 'react'
import { listMedia, uploadMedia, deleteMedia, replaceMedia } from '../../services/mediaService'

export default function MediaPanel({ showToast }) {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [replacingId, setReplacingId] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  
  // Search & Folders
  const [search, setSearch] = useState('')
  const [activeFolder, setActiveFolder] = useState('All') // 'All', 'Images', 'PDFs', 'Documents'
  
  const inputRef = useRef(null)
  const replaceInputRef = useRef(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const list = await listMedia()
      setAssets(list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Normal upload
  const handleFiles = async (files) => {
    if (!files?.length) return
    setUploading(true)
    setError('')
    for (const file of files) {
      try {
        setProgress(0)
        await uploadMedia(file, setProgress)
        if (showToast) showToast(`"${file.name}" uploaded successfully!`, 'success')
      } catch (err) {
        setError(err.message)
        if (showToast) showToast(`Upload failed: ${err.message}`, 'error')
      }
    }
    setUploading(false)
    setProgress(0)
    await load()
  }

  // Overwriting byte-swap replacement upload
  const handleReplaceFile = async (e) => {
    const file = e.target.files[0]
    if (!file || !replacingId) return
    
    setUploading(true)
    setProgress(0)
    try {
      await replaceMedia(replacingId, file, setProgress)
      if (showToast) showToast('File bytes successfully swapped & updated!', 'success')
      load()
    } catch (err) {
      setError(err.message)
      if (showToast) showToast(`Replacement failed: ${err.message}`, 'error')
    } finally {
      setUploading(false)
      setReplacingId(null)
      setProgress(0)
    }
  }

  const triggerReplaceSelector = (assetId) => {
    setReplacingId(assetId)
    replaceInputRef.current?.click()
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles([...e.dataTransfer.files])
  }

  const copyUrl = (url) => {
    const full = `${window.location.origin}${url}`
    navigator.clipboard.writeText(full)
    if (showToast) showToast('Asset URL copied to clipboard!', 'success')
  }

  // Filter assets by search query and folders
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name?.toLowerCase().includes(search.toLowerCase()) || 
                          asset.url?.toLowerCase().includes(search.toLowerCase())
    
    let matchesFolder = true
    const isImage = asset.mime?.startsWith('image/')
    const isPdf = asset.mime === 'application/pdf' || asset.name?.toLowerCase().endsWith('.pdf')
    
    if (activeFolder === 'Images') {
      matchesFolder = isImage
    } else if (activeFolder === 'PDFs') {
      matchesFolder = isPdf
    } else if (activeFolder === 'Documents') {
      matchesFolder = !isImage && !isPdf
    }
    
    return matchesSearch && matchesFolder
  })

  return (
    <div className="media-panel">
      
      {/* Search & Folder filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '6px' }} className="cms-subnav">
          {['All', 'Images', 'PDFs', 'Documents'].map((folder) => (
            <button
              key={folder}
              type="button"
              className={activeFolder === folder ? 'active' : ''}
              onClick={() => setActiveFolder(folder)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                border: '1px solid #cbd5e1',
                background: activeFolder === folder ? 'var(--navy)' : '#fff',
                color: activeFolder === folder ? '#fff' : '#475569',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              {folder === 'All' && <i className="fa-solid fa-folder-open" style={{ marginRight: '6px' }} />}
              {folder === 'Images' && <i className="fa-solid fa-file-image" style={{ marginRight: '6px' }} />}
              {folder === 'PDFs' && <i className="fa-solid fa-file-pdf" style={{ marginRight: '6px' }} />}
              {folder === 'Documents' && <i className="fa-solid fa-file-word" style={{ marginRight: '6px' }} />}
              {folder}
            </button>
          ))}
        </div>
        
        <input
          type="text"
          placeholder="Search uploaded files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            maxWidth: '260px',
            padding: '0.55rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            margin: 0
          }}
        />
      </div>

      {/* Upload Drag & Drop Area */}
      <div
        className={`media-dropzone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onChange={(e) => handleFiles([...e.target.files])}
        />
        <input
          ref={replaceInputRef}
          type="file"
          hidden
          accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onChange={handleReplaceFile}
        />
        <i className="fa-solid fa-cloud-arrow-up" />
        <p><strong>Drag & drop documents / images here</strong> or click to browse</p>
        <p className="media-hint">Max file capacity: 25 MB. All references automatically reflect byte-swaps.</p>
        
        {uploading && (
          <div className="media-progress" style={{ maxWidth: '400px', margin: '1rem auto 0' }}>
            <div className="media-progress-bar" style={{ width: `${progress}%` }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--navy)', marginTop: '4px', display: 'block' }}>Uploading: {progress}%</span>
          </div>
        )}
      </div>

      {error && <p className="media-error">{error}</p>}

      {/* Media Grid */}
      {loading ? (
        <p className="media-hint">Loading library directory…</p>
      ) : filteredAssets.length === 0 ? (
        <p className="media-hint">No uploads match your search/folder selection.</p>
      ) : (
        <div className="media-grid">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="media-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="media-preview" style={{ height: '130px', position: 'relative' }}>
                {asset.mime?.startsWith('image/') ? (
                  <img src={asset.url} alt={asset.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-file-pdf" style={{ fontSize: '2.5rem', color: 'var(--brand-orange-text)' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>PDF Circular</span>
                  </div>
                )}
              </div>
              
              <div className="media-meta" style={{ padding: '0.85rem', flexGrow: 1 }}>
                <strong title={asset.name} style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{asset.name}</strong>
                <code style={{ fontSize: '0.7rem', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', display: 'block', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.url}</code>
              </div>
              
              <div className="media-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', padding: '0.5rem 0.85rem 0.85rem' }}>
                <button type="button" onClick={() => copyUrl(asset.url)} style={{ fontSize: '0.72rem', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                  Copy URL
                </button>
                <button type="button" onClick={() => triggerReplaceSelector(asset.id)} style={{ fontSize: '0.72rem', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: 'rgba(241,127,8,0.06)', color: 'var(--brand-orange-text)', borderColor: 'rgba(241,127,8,0.2)' }}>
                  Replace
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={async () => {
                    if (!confirm(`Are you sure you want to permanently delete: "${asset.name}"?`)) return
                    await deleteMedia(asset.id)
                    if (showToast) showToast('File deleted successfully!', 'success')
                    load()
                  }}
                  style={{ width: '100%', height: 'auto', padding: '0.4rem', fontSize: '0.72rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
