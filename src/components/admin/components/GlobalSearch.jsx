import { useState } from 'react'
import { adminApi } from '../../../services/adminApi'

export default function GlobalSearch({ onNavigate }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)

  const search = async (value) => {
    setQ(value)
    if (value.trim().length < 2) {
      setResults([])
      return
    }
    try {
      const { results: r } = await adminApi.search(value)
      setResults(r)
      setOpen(true)
    } catch {
      setResults([])
    }
  }

  return (
    <div className="admin-global-search">
      <i className="fa-solid fa-magnifying-glass" />
      <input
        type="search"
        placeholder="Search pages, notices, faculty, PDFs…"
        value={q}
        onChange={(e) => search(e.target.value)}
        onFocus={() => q.length >= 2 && setOpen(true)}
      />
      {open && results.length > 0 && (
        <ul className="admin-search-results">
          {results.map((r, i) => (
            <li key={`${r.type}-${r.id}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.(r)
                  setOpen(false)
                  setQ('')
                }}
              >
                <span className="search-type">{r.type}</span>
                <strong>{r.title}</strong>
                <small>{r.subtitle}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
