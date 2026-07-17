import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function IDMCPage() {
  const members = [
    { name: 'Dr. BL. Malleswari', dept: 'Principal', designation: 'Chairperson' },
    { name: 'Ms. Asha Sheldon', dept: 'CSE (AL&ML)', designation: 'Convenor' },
    { name: 'Ms. Savitha Ramesh', dept: 'IT', designation: 'Member' },
    { name: 'Ms. P. Aparna', dept: 'CSE (DS)', designation: 'Member' },
    { name: 'Ms. Lavanya Reddy', dept: 'H&S', designation: 'Member' },
    { name: 'Dr. Kishore Babu', dept: 'CSE (AI&ML)', designation: 'Member' },
    { name: 'Ms. M Saradamani', dept: 'H&S', designation: 'Member' }
  ]

  const functions = [
    "To give directions regarding methods of teaching, evaluation, research and improvements in academic standards.",
    "To consider matters of academic interest either on its own initiative or at the instance of the Governing Body and to take proper action thereon.",
    "To make arrangements for the conduction of examinations in conformity with the rules of AICTE & JNTUH.",
    "To promote research within the institute, acquire reports on such research activities from time to time.",
    "To make periodic review of the activities of the departments, to take appropriate measures with a view to maintain and improve the standards of the institution."
  ]

  return (
    <PageShell
      eyebrow="Committees"
      title="Institutional Development"
      titleEm="& Monitoring"
      description="The IDMC is the principal academic body of KMIT, overseeing academic standards, research initiatives, and institutional growth."
      breadcrumbs={[{ label: 'Administration' }, { label: 'IDMC' }]}
    >
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header">
              <div className="section-eyebrow"><i className="fa-solid fa-microchip"></i> Strategic Oversight</div>
              <h2>Committee <em>Composition</em></h2>
              <p className="subtitle">The following is the composition of the IDMC of KMIT.</p>
            </div>
          </ScrollReveal>

          <div className="data-table-container shadow-premium" style={{ marginTop: '2.5rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>S.NO</th>
                  <th style={{ width: '40%' }}>NAME OF THE MEMBER</th>
                  <th style={{ width: '25%' }}>DEPARTMENT</th>
                  <th style={{ width: '25%' }}>DESIGNATION</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="bold text-navy">{m.name}</td>
                    <td>{m.dept}</td>
                    <td>
                      <span className={`status-badge ${m.designation.toLowerCase() === 'chairperson' ? 'bg-navy' : m.designation.toLowerCase() === 'convenor' ? 'bg-crimson' : ''}`}>
                        {m.designation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal animation="fade-right">
              <div>
                <div className="section-header">
                  <div className="section-eyebrow">Responsibilities</div>
                  <h2 style={{ fontSize: '1.75rem' }}>Functions of the <em>Institutional Development and Monitoring Committee</em></h2>
                  <div className="section-divider"></div>
                </div>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                  The IDMC shall be the principal academic body of the institute and shall, in addition to all other powers and duties vested in it, have the following powers and duties:
                </p>
                
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  {functions.map((f, i) => (
                    <li key={i} style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      marginBottom: '1.5rem', 
                      background: '#fff', 
                      padding: '1.25rem', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                    }}>
                      <span style={{ 
                        flexShrink: 0, 
                        width: '28px', 
                        height: '28px', 
                        background: 'var(--navy)', 
                        color: '#fff', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.8rem', 
                        fontWeight: '800' 
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--navy)', fontWeight: '500', fontSize: '0.95rem', lineHeight: '1.5' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  width: '100%', 
                  height: '500px', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Monitoring" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-30px', 
                  right: '-30px', 
                  background: 'var(--crimson)', 
                  color: '#fff', 
                  padding: '2rem', 
                  borderRadius: '20px', 
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: '250px' 
                }}>
                  <i className="fa-solid fa-quote-left" style={{ fontSize: '2rem', opacity: 0.3, marginBottom: '1rem', display: 'block' }}></i>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: '1.4' }}>"Ensuring institutional growth through meticulous monitoring and academic excellence."</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


    </PageShell>
  )
}
