import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'
import './StudentCouncilPage.css'

const councilMembers = [
  { sno: 1, name: 'T Sai Karthik Reddy', roll: '22BD1A12B8', designation: 'President' },
  { sno: 2, name: 'Bilakanti Karthik', roll: '23BD1A0513', designation: 'Secretary' },
  { sno: 3, name: 'Rishab Deshpande', roll: '23BD1A056G', designation: 'Head of PR' },
  { sno: 4, name: 'Rythma Reddy Lakkady', roll: '23BD1A056K', designation: 'SIC of PR' },
  { sno: 5, name: 'A. Rishik', roll: '23BD1A1205', designation: 'CR Manager' },
  { sno: 6, name: 'K. Syanthan Kumar Reddy', roll: '23BD1A0534', designation: 'Content Creator' },
  { sno: 7, name: 'Arnav Agarwal', roll: '23BD1A6602', designation: 'Developer' },
  { sno: 8, name: 'B Sai Rushik', roll: '23BD1A050Q', designation: 'Video Editor' },
  { sno: 9, name: 'Rishika Jala', roll: '23BD1A056H', designation: 'Documentation Incharge' },
  { sno: 10, name: 'G Abhinandan Goud', roll: '23BD1A05CD', designation: 'Video Editor' },
  { sno: 11, name: 'Viraj Palnitkar', roll: '23BD1A057P', designation: 'Head of OC' },
  { sno: 12, name: 'M V V S Rajeev', roll: '23BD1A054M', designation: 'SIC of OC' },
  { sno: 13, name: 'Chavi Singh', roll: '23BD1A05C6', designation: 'Member of OC' },
  { sno: 14, name: 'Mohammed Zaheed', roll: '23BD1A663P', designation: 'Member of OC' },
  { sno: 15, name: 'Ranga Srinidhi', roll: '23BD1A053X', designation: 'Member of OC' },
  { sno: 16, name: 'Raniya Rida', roll: '23BD1A665G', designation: 'Member of OC' },
  { sno: 17, name: 'Vishnu Priya', roll: '23BD1A0575', designation: 'Member of OC' },
  { sno: 18, name: 'Ronit Jatania', roll: '23BD1A12B8', designation: 'Member of OC' },
  { sno: 19, name: 'Ruthveej Rao', roll: '23BD1A661V', designation: 'Member of OC' },
  { sno: 20, name: 'Prasanna Kumar Kota', roll: '23BD1A05BD', designation: 'KMITRA Representative' },
  { sno: 21, name: 'Nidhi Sachin Shah', roll: '24BD1A051A', designation: 'KMITRA Representative' },
  { sno: 22, name: 'Abhiram', roll: '23BD1A6632', designation: 'Aalap Clubhead' },
  { sno: 23, name: 'Sankeertana', roll: '23BD1A665J', designation: 'Aalap Clubhead' },
  { sno: 24, name: 'Sreeshma Gurram', roll: '23BD1A059T', designation: 'Mudra Clubhead' },
  { sno: 25, name: 'Shri Keerthi A', roll: '22BD1A05BN', designation: 'Mudra Clubhead' },
  { sno: 26, name: 'Swaran', roll: '23BD1A051G', designation: 'Abhinaya Clubhead' },
  { sno: 27, name: 'Suma', roll: '23BD1A6779', designation: 'Abhinaya Clubhead' },
  { sno: 28, name: 'M. Javali', roll: '23BD1A051W', designation: 'Kreeda Clubhead' },
  { sno: 29, name: 'M. A. Basith', roll: '22BD1A6656', designation: 'Kreeda Clubhead' },
  { sno: 30, name: 'Jai A Parmar', roll: '22BD1A0517', designation: 'Recurse Clubhead' },
  { sno: 31, name: 'Greeshma', roll: '23BD1A054U', designation: 'Recurse Clubhead' },
  { sno: 32, name: 'Akhilesh Kumkuma', roll: '23BD1A05B1', designation: 'TOL Clubhead' },
  { sno: 33, name: 'Banuri Sagarika', roll: '22BD1A0568', designation: 'TOL Clubhead' },
  { sno: 34, name: 'Shaik Mohammed Omar', roll: '24BD1A051J', designation: 'Vachan Clubhead' },
  { sno: 35, name: 'M. Shubhang', roll: '24BD1A05D9', designation: 'Vachan Clubhead' },
  { sno: 36, name: 'Anurag Srikrishna', roll: '23BD1A050G', designation: 'Aakarshan Clubhead' },
  { sno: 37, name: 'Marati Sainath Mahendra', roll: '23BD1A67A4', designation: 'Aakarshan Clubhead' },
  { sno: 38, name: 'Kotha Sathwik', roll: '23BD1A6611', designation: 'Riti Clubhead' },
  { sno: 39, name: 'Ishitha Kulkarni', roll: '23BD1A0521', designation: 'Riti Clubhead' },
]

const leadershipRoles = [
  { name: 'T Sai Karthik Reddy', designation: 'President', icon: 'fa-solid fa-crown' },
  { name: 'Bilakanti Karthik', designation: 'Secretary', icon: 'fa-solid fa-pen-nib' },
  { name: 'Rishab Deshpande', designation: 'Head of PR', icon: 'fa-solid fa-bullhorn' },
  { name: 'Viraj Palnitkar', designation: 'Head of OC', icon: 'fa-solid fa-clipboard-list' },
]

const roleObjectives = [
  'To enhance communication between students, management and staff.',
  'To promote an environment conducive to educational and personal development.',
  'To promote friendship and respect among pupils.',
  'To support the management and staff in the development of the college.',
  'To represent the views of the students on matters of general concern to them.',
]

export default function StudentCouncilPage() {
  return (
    <PageShell
      eyebrow="Student Life"
      title="Student"
      titleEm="Council"
      description="The Student Council provides a representative structure through which students can debate issues of concern and undertake initiatives of benefit to the college and the wider community."
      breadcrumbs={[
        { label: 'Student Life', to: '/student-life' },
        { label: 'Student Council' },
      ]}
    >
      {/* About Section */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header">
            <div className="section-eyebrow">
              <i className="fa-solid fa-users" /> About the Council
            </div>
            <h2>Empowering <em>Student Voices</em></h2>
          </div>
          <div className="content-text-block">
            <p>
              The establishment of the Student Council plays an integral and important role in the student community.
              Student Council provide a representative structure through which students can debate issues of concern
              and undertake initiatives of benefit to the college and the wider community. Students have a voice and
              a contribution to make to their college. It is important that they be given the opportunity to express
              their views on issues of concern to them in the college. It is equally important that they are listened
              to and encouraged to take an active part in promoting the aims and objectives of the college.
            </p>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Role of Student Council */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header">
            <div className="section-eyebrow">
              <i className="fa-solid fa-bullseye" /> Objectives
            </div>
            <h2>Role of the <em>Student Council</em></h2>
          </div>
          <div className="content-text-block">
            <p>The Student Council will set its own objectives. Some general objectives include:</p>
            <ul>
              {roleObjectives.map((obj, i) => (
                <li key={i}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }} />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership Highlight Cards */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header">
            <div className="section-eyebrow">
              <i className="fa-solid fa-star" /> Leadership
            </div>
            <h2>Council <em>Leadership</em></h2>
          </div>
          <div className="info-cards-grid">
            {leadershipRoles.map((leader, i) => (
              <div className="info-card" key={i}>
                <div className="info-card-icon">
                  <i className={leader.icon} />
                </div>
                <h3>{leader.name}</h3>
                <p>{leader.designation}</p>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Full Representatives Table */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="section-header">
            <div className="section-eyebrow">
              <i className="fa-solid fa-id-badge" /> 2025–26
            </div>
            <h2>Student Council <em>Representatives</em></h2>
          </div>
          <div className="council-modern-table-wrapper">
            <table className="council-modern-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name of the Student</th>
                  <th>Roll Number</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {councilMembers.map((m) => (
                  <tr key={m.sno}>
                    <td><strong>{m.sno}</strong></td>
                    <td><span style={{ fontWeight: 800, color: 'var(--navy)' }}>{m.name}</span></td>
                    <td><span className="council-badge">{m.roll}</span></td>
                    <td><span className="council-role-badge">{m.designation}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
