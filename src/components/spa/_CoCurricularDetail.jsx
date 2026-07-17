import DetailPanel from '../DetailPanel'

export function CoCurricularDetail({ selectedDetails, onClose }) {
  if (!selectedDetails) return null;

  return (
    <DetailPanel
      open={!!selectedDetails}
      onClose={onClose}
      title={selectedDetails.title}
      badge={selectedDetails.badge}
      icon={selectedDetails.icon}
      desc={selectedDetails.desc}
    >
      {selectedDetails.sections?.map((sect, sIdx) => (
        <div key={sIdx} className="detail-panel-section">
          <h4 className="detail-panel-section-title">{sect.title}</h4>
          {sect.content && <p>{sect.content}</p>}
          {sect.list && (
            <div className="detail-panel-list-grid">
              {sect.list.map((li, i) => (
                <div className="detail-panel-list-card" key={i}>
                  <i className="fa-solid fa-circle-chevron-right" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {selectedDetails.winners && (
        <div className="detail-panel-members">
          <h3>Recent winners</h3>
          <ul>
            {selectedDetails.winners.slice(0, 16).map((w, i) => (
              <li key={i}>
                <strong>{w.name}</strong>
                <span>{w.week} · {w.date}</span>
                {w.roll && <span className="roll">{w.roll}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </DetailPanel>
  )
}
