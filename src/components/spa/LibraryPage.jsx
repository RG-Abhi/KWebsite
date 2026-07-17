import PageShell from './PageShell'
import './LibraryPage.css'
import ScrollReveal from '../ScrollReveal'

export default function LibraryPage() {
  const infrastructureData = [
    { area: 'General Stacks and Text Book Area including some reading Area', size: '232.11 sqm.' },
    { area: 'Reference, Periodical & Reading Room Space', size: '101.94 sqm.' },
    { area: 'Digital Library', size: '32.94 sqm.' },
    { area: 'Seating Capacity', size: '100 Nos' },
  ]

  const rules = [
    'Users must keep their belongings in the pigeon-hole racks provided at the entrance however a note book/calculator may be allowed inside.',
    'Identity card should be shown at the checkpoint on demand.',
    'Sign in the register kept at the checkpoint, while entering the Library.',
    'Visitors should obtain prior permission from the authorities before utilizing the resources.',
    'Decency and Decorum should be maintained in the Library.',
    'Members are free to browse through the books. Books taken out of the shelves must be left on a table. Replacing the books on shelves is not encouraged as it may be misplaced. Misplaced book is a lost book.',
    "Readers shouldn't mark, underline, write, tear pages or damage the books.",
    'Show the documents, which are being taken out of the Library, to the staff at the checkpoint.',
    'Books lost by the Borrowers have to be reported immediately in writing to the Librarian, failing which fines will keep on accumulating. PLEASE DO NOT ASK FOR WAIVER OF FINES. Replace the book within the time permitted.',
    'Each borrower is responsible for the book issued on that card, hence borrowers are requested not to exchange the books with others.',
    'No due certificate will be issued at the end of every semester.',
    'Change of Department, Status, and Address etc., to be informed immediately.',
    'Use the dustbins provided in the reading area and help us to maintain library clean & tidy.',
    'Anyone who violates the rules and regulations of the library would be liable to lose the privilege of the membership.',
  ]

  const committeeMembers = [
    { sno: 1, name: 'Mr. L. Sai Kiran', branch: 'Library', designation: 'Librarian' },
    { sno: 2, name: 'Ms. M Bala Savitha', branch: 'Library', designation: 'Assistant Librarian' },
    { sno: 3, name: 'Mr. K Rajesh', branch: 'CSE', designation: 'Member' },
    { sno: 4, name: 'Ms. M. Nikitha', branch: 'IT', designation: 'Member' },
    { sno: 5, name: 'Ms. B. Sandya Reddy', branch: 'H&S', designation: 'Member' },
  ]

  const branchWiseBooks = [
    { sno: 1, branch: 'CSE', volumes: '10171', journals: '27' },
    { sno: 2, branch: 'IT', volumes: '2195', journals: '13' },
    { sno: 3, branch: 'ECE', volumes: '3297', journals: '17' },
    { sno: 4, branch: 'EIE', volumes: '1921', journals: '2' },
    { sno: 5, branch: 'H&S', volumes: '1846', journals: '9' },
  ]

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="KMIT"
      titleEm="Granthalaya (Library)"
      description="The KMIT Central Library promotes intellectual growth and creativity by developing collection, facilitating access to information resources, and offering research assistance."
      breadcrumbs={[{ label: 'Campus & Infra', to: '/campus/library' }, { label: 'About Library' }]}
    >
      {/* Vision Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-eye"></i> Vision</div>
            <h2>Vision of the <em>Library</em></h2>
            <div className="section-divider"></div>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="content-text-block">
            <p>
              The KMIT Central library promotes intellectual growth and creativity by developing collection,
              facilitating access to information resources, teaching the effective use of information resources and
              critical evaluation skills and offering research assistance. Broadly speaking, the vision of the KMIT
              Central Library is to provide access to a broad range of learning resources and information services to
              students and faculty.
            </p>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-building"></i> Infrastructure</div>
            <h2>Library <em>Infrastructure</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="content-text-block">
            <ScrollReveal>
            <p>
              The Central Library began its existence in 2007. It is centrally located in the campus. It is surrounded
              by academic classrooms, laboratories, workshops, placement wing and sports grounds. It is divided into
              different sections like Stack area, Reading room, Reference and periodical Sections, Circulation, Digital
              library and Reprographic Section. The library is housed spaciously with a plinth area as follows:
            </p>
            </ScrollReveal>
          </div>
          
          <div className="library-infra-grid">
            {infrastructureData.map((row, i) => {
              const icons = ['fa-layer-group', 'fa-book-open-reader', 'fa-computer', 'fa-chair']
              return (
                <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
                  <div className="lib-infra-card" style={{ height: '100%' }}>
                    <div className="lib-infra-icon">
                      <i className={`fa-solid ${icons[i] || 'fa-building'}`}></i>
                    </div>
                    <h4>{row.area}</h4>
                    <span className="lib-infra-val">{row.size}</span>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rules & Regulations Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-scale-balanced"></i> Guidelines</div>
            <h2>Rules & <em>Regulations</em></h2>
            <div className="section-divider"></div>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="library-rules-wrapper">
            <ol className="styled-rules-list">
              {rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Library Advisory Committee */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-users"></i> Committee</div>
            <h2>Library Advisory <em>Committee</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="content-text-block">
            <ScrollReveal>
            <ul style={{marginBottom:'1.5rem', lineHeight:'1.8', color: 'var(--text-dark)'}}>
              <li><i className="fa-solid fa-check text-accent" style={{marginRight: '8px', color: 'var(--vibrant-accent)'}}></i> The Library has an advisory committee involving representatives from all academic departments</li>
              <li><i className="fa-solid fa-check text-accent" style={{marginRight: '8px', color: 'var(--vibrant-accent)'}}></i> The Committee members meet twice in the year</li>
            </ul>
            </ScrollReveal>
          </div>
          
          <div className="lib-committee-grid">
            {committeeMembers.map((m, i) => (
              <ScrollReveal key={m.sno} animation="fade-up" delay={i * 50}>
                <div className="lib-com-card">
                  <div className="lib-com-avatar">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div className="lib-com-info">
                    <h4 className="lib-com-name">{m.name}</h4>
                    <span className="lib-com-role">{m.designation}</span>
                    <span className="lib-com-branch"><i className="fa-solid fa-building-user"></i> {m.branch}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Print Resources */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-book"></i> Resources</div>
            <h2>Print <em>Resources</em></h2>
            <div className="section-divider"></div>
          </div>

          {/* Stats */}
          <div className="library-hero-stats">
            {[
              { icon: 'fa-book', label: 'Total Books', value: '19,430' },
              { icon: 'fa-bookmark', label: 'Total Titles', value: '4,315' },
              { icon: 'fa-newspaper', label: 'Print Journals', value: '73' },
            ].map((s, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100} style={{ flex: '1 1 200px' }}>
              <div className="info-card" style={{textAlign:'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div className="info-card-icon" style={{ margin: '0 auto 1rem auto' }}><i className={`fa-solid ${s.icon}`}></i></div>
                <div>
                  <div style={{fontSize:'2.2rem', fontWeight:800, color:'var(--vibrant-accent)', lineHeight: 1}}>{s.value}</div>
                  <h3 style={{marginTop:'0.5rem', color: 'var(--navy)', fontSize: '1.1rem'}}>{s.label}</h3>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="section-header" style={{marginTop:'3rem'}}>
            <h3>Branch-wise Distribution of Books & Print Journals</h3>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="library-modern-table-wrapper">
            <table className="library-modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>S.No</th>
                  <th>Branch</th>
                  <th>Volumes</th>
                  <th>Journals</th>
                </tr>
              </thead>
              <tbody>
                {branchWiseBooks.map((row) => (
                  <tr key={row.sno}>
                    <td><strong>{row.sno}</strong></td>
                    <td><span style={{ fontWeight: 800, color: 'var(--navy)' }}>{row.branch}</span></td>
                    <td>{row.volumes}</td>
                    <td>{row.journals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up">
          <div style={{marginTop:'2rem'}}>
            <a
              href="https://kmit.in/infrastructure/List of Journals.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
              style={{display:'inline-flex', alignItems:'center', gap:'0.75rem', padding: '1rem 2rem', fontSize: '1.05rem'}}
            >
              <i className="fa-solid fa-file-pdf"></i> View List of Journals
            </a>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* E-Resources Link */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-laptop-file"></i> Digital Resources</div>
            <h2>E-Resources <em>Portal</em></h2>
            <div className="section-divider"></div>
            <p>Access digital journals, e-books, and online databases through the KMIT E-Resources portal.</p>
          </div>
          <ScrollReveal animation="fade-up">
          <div style={{textAlign:'center', marginTop:'2rem'}}>
            <a
              href="http://library.kmit.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
              style={{display:'inline-flex', alignItems:'center', gap:'0.75rem', padding: '1rem 2.5rem', fontSize: '1.1rem'}}
            >
              <i className="fa-solid fa-external-link"></i> Visit E-Resources Portal
            </a>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
