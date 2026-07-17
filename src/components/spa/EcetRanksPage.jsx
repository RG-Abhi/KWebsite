import { useState } from 'react'
import PageShell from './PageShell'
import { ECET_YEARS, ECET_RANKS } from '../../data/rankCutoffData'

const COLUMNS = [
  { key: 'category', label: 'CATEGORY' },
  { key: 'cse_m_open', label: 'MALE (Open)', branch: 'CSE' },
  { key: 'cse_m_close', label: 'MALE (Close)', branch: 'CSE' },
  { key: 'cse_f_open', label: 'FEMALE (Open)', branch: 'CSE' },
  { key: 'cse_f_close', label: 'FEMALE (Close)', branch: 'CSE' },
  { key: 'csm_m_open', label: 'MALE (Open)', branch: 'CSM' },
  { key: 'csm_m_close', label: 'MALE (Close)', branch: 'CSM' },
  { key: 'csm_f_open', label: 'FEMALE (Open)', branch: 'CSM' },
  { key: 'csm_f_close', label: 'FEMALE (Close)', branch: 'CSM' },
]

function exportCsv(rows, year) {
  const header1 = 'CATEGORY,CSE,,,CSM,,,'
  const header2 = ',MALE (Open),MALE (Close),FEMALE (Open),FEMALE (Close),MALE (Open),MALE (Close),FEMALE (Open),FEMALE (Close)'
  const body = rows.map(r => COLUMNS.map(c => r[c.key] ?? '').join(',')).join('\n')
  const blob = new Blob([`${header1}\n${header2}\n${body}`], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `kmit-ecet-${year}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function EcetRanksPage() {
  const [year, setYear] = useState(ECET_YEARS[0])
  const validYear = ECET_RANKS[year] ? year : ECET_YEARS[0]
  const rows = ECET_RANKS[validYear] || []

  return (
    <PageShell
      eyebrow="Lateral Entry · 10% Intake"
      title="ECET"
      titleEm="Last Rank"
      description="Closing ranks for diploma holders entering B.Tech second year via ECET counselling."
      breadcrumbs={[{ label: 'Admissions', to: '/admissions/coursesoffered' }, { label: 'ECET Last Rank' }]}
      actions={
        <a href="/admissions/admission-procedure" className="btn btn-outline">Admission Procedure</a>
      }
    >
      <section className="page-section">
        <div className="container">
          <div className="rank-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="year-tabs" role="tablist">
              {ECET_YEARS.map(y => (
                <button key={y} type="button" className={validYear === y ? 'active' : ''} onClick={() => setYear(y)}>{y}</button>
              ))}
            </div>
            <div className="rank-toolbar-actions">
              <button type="button" className="btn btn-outline" onClick={() => exportCsv(rows, year)}>
                <i className="fa-solid fa-download" /> Export CSV
              </button>
            </div>
          </div>

          <p className="rank-disclaimer" style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
            <i className="fa-solid fa-circle-info" /> Sample reference data for UI demonstration. Replace with official cut-offs from the admissions office before publication.
          </p>

          <div className="data-table-wrap" style={{ margin: '2rem 0' }}>
            <table className="data-table rank-table" style={{ width: '100%', minWidth: '800px', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>CATEGORY</th>
                  <th colSpan="4" style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>CSE</th>
                  <th colSpan="4" style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>CSM</th>
                </tr>
                <tr>
                  {COLUMNS.slice(1).map(c => (
                    <th key={c.key} style={{ 
                      textAlign: 'center', 
                      fontSize: '0.75rem', 
                      padding: '0.75rem 0.5rem', 
                      borderLeft: c.key === 'csm_m_open' ? '1px solid rgba(255,255,255,0.1)' : 'none' 
                    }}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {COLUMNS.map(c => (
                      <td key={c.key} style={{ 
                        textAlign: 'center', 
                        fontWeight: c.key === 'category' ? '600' : 'normal',
                        borderRight: c.key === 'category' ? '1px solid var(--light-grey)' : 'none',
                        borderLeft: c.key === 'csm_m_open' ? '1px solid var(--light-grey)' : 'none',
                        color: c.key === 'category' ? 'var(--navy)' : 'inherit'
                      }}>
                        {row[c.key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
