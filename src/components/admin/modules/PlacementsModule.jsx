import { useData } from '../../../context/websiteData'
import SpreadsheetTable from '../components/SpreadsheetTable'

export default function PlacementsModule() {
  const { data, deepUpdate, updateData } = useData()
  if (!data?.archives) return null

  return (
    <div className="cms-module" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#DF5305', borderRadius: '4px' }} />
          Recruiter Marquee
        </h3>
        <p className="media-hint" style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>Company domains for logo strip on homepage.</p>
        <div className="cms-form-grid cols-2" style={{ gap: '2rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Row 1 Logos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(data.recruiters?.fwd || []).map((slug, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input value={slug} onChange={(e) => {
                    const next = [...data.recruiters.fwd]; next[i] = e.target.value
                    deepUpdate('recruiters.fwd', next)
                  }} style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                  <button type="button" onClick={() => deepUpdate('recruiters.fwd', data.recruiters.fwd.filter((_, x) => x !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}><i className="fa-solid fa-times" /></button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={() => deepUpdate('recruiters.fwd', [...(data.recruiters.fwd || []), 'company.com'])}>+ Add Logo</button>
          </div>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Row 2 Logos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(data.recruiters?.rev || []).map((slug, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input value={slug} onChange={(e) => {
                    const next = [...data.recruiters.rev]; next[i] = e.target.value
                    deepUpdate('recruiters.rev', next)
                  }} style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                  <button type="button" onClick={() => deepUpdate('recruiters.rev', data.recruiters.rev.filter((_, x) => x !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}><i className="fa-solid fa-times" /></button>
                </div>
              ))}
            </div>
            <button type="button" className="add-btn" onClick={() => deepUpdate('recruiters.rev', [...(data.recruiters.rev || []), 'company.com'])}>+ Add Logo</button>
          </div>
        </div>
      </div>

      {Object.keys(data.archives).map((year) => (
        <div key={year} className="admin-card" style={{ padding: '0', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>Placement Year: {data.archives[year].year}</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input placeholder="Highest package" value={data.archives[year].highest} onChange={(e) => deepUpdate(`archives.${year}.highest`, e.target.value)} style={{ padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
              <input placeholder="Average package" value={data.archives[year].avg} onChange={(e) => deepUpdate(`archives.${year}.avg`, e.target.value)} style={{ padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
            </div>
          </div>
          <SpreadsheetTable
            columns={[
              { key: 'company', label: 'Company' },
              { key: 'students', label: 'Selected' },
              { key: 'pkg', label: 'Package' },
            ]}
            rows={data.archives[year].drives}
            onChange={(drives) => deepUpdate(`archives.${year}.drives`, drives)}
            onAddRow={() => deepUpdate(`archives.${year}.drives`, [...data.archives[year].drives, { company: 'New Co', students: '0', pkg: '0 LPA' }])}
            onDeleteRow={(ri) => deepUpdate(`archives.${year}.drives`, data.archives[year].drives.filter((_, i) => i !== ri))}
          />
        </div>
      ))}

      <div className="admin-card" style={{ padding: '2rem', background: '#FEFEFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', background: '#DF5305', borderRadius: '4px' }} />
          Global Placement Stats
        </h3>
        <div className="cms-form-grid">
          {data.siteMeta?.stats && Object.keys(data.siteMeta.stats).map((key) => (
            <div key={key} className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' }}>{key}</label>
              <input value={data.siteMeta.stats[key]} onChange={(e) => deepUpdate(`siteMeta.stats.${key}`, e.target.value)} style={{ width: '100%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
