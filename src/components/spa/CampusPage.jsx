import PageShell from './PageShell'
import './CampusPage.css' // We will create this for custom styles

export default function CampusPage() {
  const facilities = [
    {
      icon: 'fa-book',
      title: 'KMIT Granthalaya',
      subtitle: 'Central Library',
      desc: 'A world-class library with 40,000+ volumes, digital subscriptions (IEEE, Springer, Elsevier), and dedicated reading halls with high-speed internet access.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      size: 'large'
    },
    {
      icon: 'fa-flask',
      title: 'Computing Labs',
      subtitle: 'State-of-the-Art',
      desc: '50+ labs including AI/ML Studio, IoT, and Cloud Computing Centers.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      size: 'tall'
    },
    {
      icon: 'fa-users-rectangle',
      title: 'Auditorium',
      subtitle: 'Event Spaces',
      desc: 'A 1,000-seat auditorium for annual events and grand lectures.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      size: 'wide'
    },
    {
      icon: 'fa-futbol',
      title: 'Sports Facilities',
      subtitle: 'Athletics & Recreation',
      desc: 'Basketball court, volleyball, cricket nets, and indoor games.',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
      size: 'normal'
    },
    {
      icon: 'fa-chalkboard',
      title: 'Smart Classrooms',
      subtitle: 'Interactive Learning',
      desc: 'ICT-enabled with smart boards, high-def projectors, and Wi-Fi.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      size: 'normal'
    },
    {
      icon: 'fa-wifi',
      title: 'Digital Infrastructure',
      subtitle: 'Connected Campus',
      desc: '24x7 high-speed internet, TESSELLATOR LMS, and centralized digital platforms.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      size: 'wide'
    }
  ]

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Campus &"
      titleEm="Facilities"
      description="Located in the heart of Hyderabad, KMIT's campus features state-of-the-art learning infrastructure designed to support academic excellence, research, and holistic student development."
      breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Campus & Infrastructure' }]}
    >
      {/* Campus Video/Hero highlight */}
      <section className="campus-hero-section">
        <div className="container">
          <div className="campus-hero-banner glass-panel">
            <div className="chb-content">
              <div className="section-eyebrow"><i className="fa-solid fa-tree-city"></i> A Vibrant Ecosystem</div>
              <h2>Where Innovation <em>Thrives</em></h2>
              <p>Our campus is more than just buildings; it's a dynamic ecosystem designed to foster creativity, collaboration, and cutting-edge research. Explore spaces meticulously crafted for the engineers of tomorrow.</p>
              <div className="chb-stats">
                <div className="chb-stat">
                  <strong>50+</strong>
                  <span>Advanced Labs</span>
                </div>
                <div className="chb-stat">
                  <strong>40k+</strong>
                  <span>Library Volumes</span>
                </div>
                <div className="chb-stat">
                  <strong>1 Gbps</strong>
                  <span>Campus Wi-Fi</span>
                </div>
              </div>
            </div>
            <div className="chb-image">
              <img src="/photos/infrastructure/audi_360.webp" alt="KMIT Auditorium" />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Bento Grid */}
      <section className="page-section bg-light">
        <div className="container">
          <div className="section-header centered">
            <div className="section-eyebrow"><i className="fa-solid fa-building"></i> Core Facilities</div>
            <h2>World-Class <em>Infrastructure</em></h2>
            <div className="section-divider"></div>
            <p>Every facility at KMIT is designed to enhance learning, encourage research, and support student well-being.</p>
          </div>
          
          <div className="bento-grid">
            {facilities.map((f, i) => (
              <div key={i} className={`bento-card bento-${f.size}`}>
                <div className="bento-img-wrap">
                  <img src={f.image} alt={f.title} className="bento-img" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <div className="bento-icon"><i className={`fa-solid ${f.icon}`}></i></div>
                  <div className="bento-text">
                    <div className="bento-subtitle">{f.subtitle}</div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features (Accessibility & Location) */}
      <section className="page-section-alt">
        <div className="container">
          <div className="dual-feature-grid">
            <div className="feature-block glass-panel">
              <div className="feature-icon"><i className="fa-solid fa-wheelchair-move"></i></div>
              <h3>Inclusive Campus</h3>
              <p>Ramps, lifts, and accessible restrooms across all floors. KMIT is committed to creating an inclusive, barrier-free environment for all students and staff.</p>
            </div>
            <div className="feature-block glass-panel">
              <div className="feature-icon"><i className="fa-solid fa-map-location-dot"></i></div>
              <h3>Central Location</h3>
              <p>Centrally located at 3-5-1026, Narayanguda. Just a 2-minute walk from the Metro station, making daily commute seamless and easy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-map-pin"></i> Location</div>
            <h2>Find <em>Us Here</em></h2>
            <div className="section-divider"></div>
          </div>
          <div className="contact-grid">
            <div className="contact-info-cards">
              {[
                { icon: 'fa-location-dot', label: 'Address', value: '3-5-1026, Narayanguda, Hyderabad – 500 029, Telangana' },
                { icon: 'fa-phone', label: 'Phone', value: '040-23261407' },
                { icon: 'fa-envelope', label: 'Email', value: 'info@kmit.in' },
                { icon: 'fa-train-subway', label: 'Nearest Metro', value: 'Narayanguda Metro Station — 2 min walk' },
              ].map((item, i) => (
                <div key={i} className="contact-card">
                  <div className="contact-card-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                  <div className="contact-card-text">
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.303882191366!2d78.48784931418768!3d17.39719830710286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x8aa5456a7d836bb5!2sKeshav%20Memorial%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1605358581165!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                title="KMIT Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
