import { useState, useRef } from 'react'

export default function SpreadsheetTable({
  columns = [],
  rows = [],
  onChange,
  onAddRow,
  onDeleteRow,
  emptyLabel = 'No rows'
}) {
  const [newColName, setNewColName] = useState('')
  const csvInputRef = useRef(null)

  // Add a new column dynamically
  const handleAddColumn = () => {
    const name = newColName.trim()
    if (!name) return

    // Prevent duplicate column keys
    const colKey = name.toLowerCase().replace(/[^a-z0-9]/g, '_')
    if (columns.some((c) => c.key === colKey)) {
      alert('A column with this name already exists.')
      return
    }

    const nextCols = [...columns, { key: colKey, label: name }]
    const nextRows = rows.map((r) => ({ ...r, [colKey]: '' }))

    onChange(nextCols, nextRows)
    setNewColName('')
  }

  // Remove a column dynamically
  const handleRemoveColumn = (colKey, colLabel) => {
    if (!window.confirm(`Are you sure you want to delete the column: "${colLabel}"? This will delete all data under this column.`)) return

    const nextCols = columns.filter((c) => c.key !== colKey)
    const nextRows = rows.map((r) => {
      const copy = { ...r }
      delete copy[colKey]
      return copy
    })

    onChange(nextCols, nextRows)
  }

  // Reorder rows up/down
  const moveRow = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= rows.length) return

    const nextRows = [...rows]
    const temp = nextRows[index]
    nextRows[index] = nextRows[target]
    nextRows[target] = temp

    onChange(columns, nextRows)
  }

  // Export spreadsheet as CSV
  const handleExportCSV = () => {
    if (!rows.length) return

    // Map headers
    const headers = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`).join(',')
    
    // Map rows
    const csvRows = rows.map((row) =>
      columns.map((col) => {
        const val = String(row[col.key] ?? '')
        return `"${val.replace(/"/g, '""')}"`
      }).join(',')
    )

    const csvContent = [headers, ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `export-table-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // Import spreadsheet from CSV (Option A: Overwrite entirely)
  const handleImportCSV = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target.result
      const lines = text.split(/\r?\n/).filter((l) => l.trim())
      if (lines.length === 0) return

      // Simple CSV parser
      const parseCSVLine = (line) => {
        const result = []
        let current = ''
        let inQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"'
              i++ // skip double double quotes
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim())
            current = ''
          } else {
            current += char
          }
        }
        result.push(current.trim())
        return result
      }

      const headers = parseCSVLine(lines[0])
      const importedCols = headers.map((h) => {
        const key = h.toLowerCase().replace(/[^a-z0-9]/g, '_')
        return { key, label: h }
      })

      const importedRows = lines.slice(1).map((line) => {
        const values = parseCSVLine(line)
        const row = {}
        importedCols.forEach((col, idx) => {
          row[col.key] = values[idx] ?? ''
        })
        return row
      })

      onChange(importedCols, importedRows)
      alert(`Imported ${importedRows.length} rows successfully!`)
    }
    reader.readAsText(file)
  }

  return (
    <div className="admin-card" style={{ padding: '1.5rem', border: '1px solid #cbd5e1' }}>
      
      {/* CSV Operations & Column Manager Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        
        {/* Dynamic Column Addition */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="New Column Label..."
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', maxWidth: '180px', margin: 0 }}
          />
          <button type="button" className="add-btn" onClick={handleAddColumn} style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            + Add Col
          </button>
        </div>

        {/* CSV import/export buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" className="reset-btn" onClick={() => csvInputRef.current?.click()} style={{ padding: '0.5rem 1rem', margin: 0, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', color: '#475569', border: 'none' }}>
            <i className="fa-solid fa-file-import" /> Import CSV
          </button>
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            style={{ display: 'none' }}
          />
          
          <button type="button" className="reset-btn" onClick={handleExportCSV} disabled={!rows.length} style={{ padding: '0.5rem 1rem', margin: 0, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', color: '#475569', border: 'none', opacity: rows.length ? 1 : 0.5 }}>
            <i className="fa-solid fa-file-export" /> Export CSV
          </button>
        </div>

      </div>

      {/* Spreadsheet Table Rendering */}
      {!rows.length ? (
        <div className="sheet-empty">
          <p>{emptyLabel}</p>
          {onAddRow && <button type="button" className="add-btn" onClick={onAddRow} style={{ margin: '0.5rem auto 0' }}>Add Row</button>}
        </div>
      ) : (
        <div className="sheet-wrap">
          <table className="sheet-table">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {columns.map((col) => (
                  <th key={col.key} style={{ padding: '8px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span>{col.label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColumn(col.key, col.label)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                        title="Delete Column"
                      >
                        <i className="fa-solid fa-trash-can" style={{ fontSize: '0.75rem' }} />
                      </button>
                    </div>
                  </th>
                ))}
                <th style={{ width: '130px', textAlign: 'center' }}>Row Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '4px' }}>
                      <input
                        type={col.type || 'text'}
                        value={row[col.key] ?? ''}
                        onChange={(e) => {
                          const nextRows = rows.map((r, i) =>
                            i === ri ? { ...r, [col.key]: col.type === 'number' ? Number(e.target.value) : e.target.value } : r
                          )
                          onChange(columns, nextRows)
                        }}
                        style={{ padding: '0.45rem', fontSize: '0.85rem' }}
                      />
                    </td>
                  ))}
                  <td style={{ padding: '4px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => moveRow(ri, -1)}
                        disabled={ri === 0}
                        style={{ padding: '4px 6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: ri === 0 ? 'not-allowed' : 'pointer', opacity: ri === 0 ? 0.4 : 1 }}
                        title="Move Row Up"
                      >
                        <i className="fa-solid fa-chevron-up" style={{ fontSize: '0.7rem' }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveRow(ri, 1)}
                        disabled={ri === rows.length - 1}
                        style={{ padding: '4px 6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: ri === rows.length - 1 ? 'not-allowed' : 'pointer', opacity: ri === rows.length - 1 ? 0.4 : 1 }}
                        title="Move Row Down"
                      >
                        <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }} />
                      </button>
                      {onDeleteRow && (
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => onDeleteRow(ri)}
                          style={{ width: '26px', height: '26px', padding: 0 }}
                          title="Delete Row"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {onAddRow && (
            <button type="button" className="add-btn sheet-add" onClick={onAddRow} style={{ marginTop: '1rem' }}>
              + Add Table Row
            </button>
          )}
        </div>
      )}
    </div>
  )
}
