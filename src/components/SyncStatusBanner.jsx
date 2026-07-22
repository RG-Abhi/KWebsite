import { useData } from '../context/websiteData'

export default function SyncStatusBanner() {
  const { syncStatus, lastSyncedAt, syncError, refreshData } = useData()

  if (syncStatus === 'live') return null

  const onWrongPort = typeof window !== 'undefined' && window.location.port && window.location.port !== '5173'
  const label =
    syncStatus === 'loading'
      ? 'Connecting to live CMS…'
      : onWrongPort
        ? `Offline — use http://localhost:5173 (you are on port ${window.location.port}). API proxy only works on 5173.`
        : 'Offline mode — showing cached content. Ensure API is running (npm run dev:all).'

  return (
    <div className={`sync-status-banner sync-status-${syncStatus}`} role="status">
      <i className={`fa-solid ${syncStatus === 'loading' ? 'fa-spinner fa-spin' : 'fa-cloud-slash'}`} />
      <span>{label}</span>
      {syncStatus === 'offline' && (
        <button type="button" className="sync-retry-btn" onClick={() => refreshData()}>Retry</button>
      )}
      {syncError && syncStatus === 'offline' && (
        <span className="sync-status-meta" title={syncError}>{syncError}</span>
      )}
      {syncStatus === 'offline' && lastSyncedAt && (
        <span className="sync-status-meta">
          Last sync: {new Date(lastSyncedAt).toLocaleString()}
        </span>
      )}
    </div>
  )
}
