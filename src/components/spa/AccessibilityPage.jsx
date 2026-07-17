import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      icon: 'fa-ramp-loading',
      title: 'Ramps',
      desc: 'Wheelchair-accessible ramps are installed at all building entrances and between floor-level changes, ensuring barrier-free movement across the campus for students and visitors with mobility challenges.',
    },
    {
      icon: 'fa-elevator',
      title: 'Elevators',
      desc: 'Modern elevators are available in all multi-storey blocks, enabling students with physical disabilities to access every floor — including classrooms, labs, and seminar halls — without difficulty.',
    },
    {
      icon: 'fa-restroom',
      title: 'Accessible Restrooms',
      desc: 'Specially designed accessible washrooms are provided on every floor of the campus buildings, equipped with grab bars, adequate space for wheelchair access, and appropriate fixtures.',
    },
    {
      icon: 'fa-signs-post',
      title: 'Signage & Wayfinding',
      desc: 'Clear and visible signage across the campus helps differently-abled students navigate buildings, locate facilities, and identify accessible routes with ease.',
    },
    {
      icon: 'fa-hand-holding-heart',
      title: 'Support & Assistance',
      desc: 'Dedicated support staff and a counselling cell are available to assist differently-abled students with academic, personal, and logistical needs throughout their time at KMIT.',
    },
    {
      icon: 'fa-universal-access',
      title: 'Inclusive Environment',
      desc: 'KMIT is committed to creating an inclusive and welcoming environment for all students, irrespective of physical ability, ensuring equal access to education and campus life.',
    },
  ]

  const galleryImages = [
    {
      src: '/photos/accessibility/Ramp.webp',
      caption: 'Wheelchair-accessible ramp at building entrance',
    },
    {
      src: '/photos/accessibility/Lift_1.webp',
      caption: 'Elevator facility — View 1',
    },
    {
      src: '/photos/accessibility/Lift_2.webp',
      caption: 'Elevator facility — View 2',
    },
    {
      src: '/photos/accessibility/Washroom.webp',
      caption: 'Accessible restroom facility',
    },
  ]

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Campus"
      titleEm="Accessibility"
      description="With ramps, elevators, and accessible washrooms built on campus, Keshav Memorial Institute of Technology is a Physically Disabled friendly campus."
      breadcrumbs={[
        { label: 'Campus & Infra', to: '/campus/library' },
        { label: 'Accessibility' },
      ]}
    >
      {/* Introduction */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-wheelchair-move"></i> Accessibility
            </div>
            <h2>
              An Inclusive <em>Campus for All</em>
            </h2>
            <div className="section-divider"></div>
            <ScrollReveal animation="fade-up">
            <p>
              Keshav Memorial Institute of Technology is committed to providing a barrier-free and inclusive
              campus environment. With ramps, elevators, and accessible washrooms built into the campus
              infrastructure, KMIT ensures that students with physical disabilities can navigate every corner
              of the college with ease and dignity.
            </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-universal-access"></i> Facilities
            </div>
            <h2>
              Accessibility <em>Features</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              Every facility at KMIT is designed to ensure equal access and convenience for differently-abled
              students and visitors.
            </p>
          </div>
          <div className="info-cards-grid">
            {accessibilityFeatures.map((f, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
              <div className="info-card" style={{ height: '100%' }}>
                <div className="info-card-icon">
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="page-section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-images"></i> Gallery
            </div>
            <h2>
              Campus <em>Accessibility in Action</em>
            </h2>
            <div className="section-divider"></div>
            <p>
              A glimpse of the accessible infrastructure at KMIT — ramps, elevators, and washrooms designed
              for differently-abled students.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
            }}
          >
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50} style={{ height: '100%' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  background: 'var(--glass-bg, rgba(255,255,255,0.06))',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.10))',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: '100%',
                    height: '260px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
                <div style={{ padding: '1rem 1.2rem', flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      opacity: 0.85,
                      fontWeight: 500,
                    }}
                  >
                    {img.caption}
                  </p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
          <p
            style={{
              textAlign: 'right',
              marginTop: '1.5rem',
              fontSize: '0.85rem',
              opacity: 0.7,
              fontStyle: 'italic',
            }}
          >
            Photos by: <em>Traces of Lenses club</em>
          </p>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow">
              <i className="fa-solid fa-heart"></i> Our Commitment
            </div>
            <h2>
              Equal Access, <em>Equal Opportunity</em>
            </h2>
            <div className="section-divider"></div>
          </div>
          <ScrollReveal animation="fade-up">
          <div className="content-text-block">
            <p>
              KMIT firmly believes that every student deserves equal access to quality education, regardless
              of physical ability. The institution continuously invests in upgrading its infrastructure and
              support systems to create a campus where all students feel welcome, included, and empowered
              to achieve their full potential.
            </p>
            <p>
              From accessible building entrances and elevator-equipped blocks to dedicated restrooms and
              assistive support services, KMIT strives to eliminate barriers and foster a truly inclusive
              academic community.
            </p>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
