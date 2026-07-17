import { useData } from '../../../context/websiteData'
import SpreadsheetTable from '../components/SpreadsheetTable'

export default function PlacementsModule() {
  const { data, deepUpdate, updateData } = useData()
  if (!data?.archives) return null

  return (
    <div className="cms-module">
      <div className="admin-card">
        <h3>Recruiter marquee</h3>
        <p className="media-hint">Company domains for logo strip on homepage.</p>
        <div className="cms-form-grid cols-2">
          <div>
            <h4>Row 1</h4>
            {(data.recruiters?.fwd || []).map((slug, i) => (
              <div key={i} className="admin-item">
                <input value={slug} onChange={(e) => {
                  const next = [...data.recruiters.fwd]; next[i] = e.target.value
                  deepUpdate('recruiters.fwd', next)
                }} />
                <button type="button" className="delete-btn" onClick={() => deepUpdate('recruiters.fwd', data.recruiters.fwd.filter((_, x) => x !== i))}>×</button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => deepUpdate('recruiters.fwd', [...(data.recruiters.fwd || []), 'company.com'])}>+ Add</button>
          </div>
          <div>
            <h4>Row 2</h4>
            {(data.recruiters?.rev || []).map((slug, i) => (
              <div key={i} className="admin-item">
                <input value={slug} onChange={(e) => {
                  const next = [...data.recruiters.rev]; next[i] = e.target.value
                  deepUpdate('recruiters.rev', next)
                }} />
                <button type="button" className="delete-btn" onClick={() => deepUpdate('recruiters.rev', data.recruiters.rev.filter((_, x) => x !== i))}>×</button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => deepUpdate('recruiters.rev', [...(data.recruiters.rev || []), 'company.com'])}>+ Add</button>
          </div>
        </div>
      </div>

      {Object.keys(data.archives).map((year) => (
        <div key={year} className="admin-card">
          <h3>Placement year {data.archives[year].year}</h3>
          <div className="cms-form-grid">
            <input placeholder="Highest package" value={data.archives[year].highest} onChange={(e) => deepUpdate(`archives.${year}.highest`, e.target.value)} />
            <input placeholder="Average package" value={data.archives[year].avg} onChange={(e) => deepUpdate(`archives.${year}.avg`, e.target.value)} />
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

      <div className="admin-card">
        <h3>Global placement stats</h3>
        {data.siteMeta?.stats && Object.keys(data.siteMeta.stats).map((key) => (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input value={data.siteMeta.stats[key]} onChange={(e) => deepUpdate(`siteMeta.stats.${key}`, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  )
}
