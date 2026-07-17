import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function CampusVideoSection() {
  const [play, setPlay] = useState(false)

  return (
    <section className="campus-video-section">
      <div className="gm-deco gm-ring" style={{ top: '10%', right: '5%', opacity: 0.05 }} aria-hidden="true"></div>
      
      <div className="container video-inner">
        <ScrollReveal animation="fade-up">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-eyebrow">Virtual Tour</p>
            <h2 className="section-title">Explore KMIT <em>Campus</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0.8rem auto 0', fontSize: '0.95rem' }}>
              Take a flight over our state-of-the-art infrastructure, advanced labs, sporting arenas, and bustling student life.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="video-player-wrap">
          {!play ? (
            <div 
              className="video-poster"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="video-poster-overlay">
                <button 
                  className="video-play-btn"
                  onClick={() => setPlay(true)}
                  aria-label="Play virtual tour video"
                >
                  <i className="fa-solid fa-play"></i>
                </button>
                <span className="play-lbl">Watch Virtual Tour</span>
              </div>
            </div>
          ) : (
            <div className="iframe-container">
              <iframe
                title="KMIT Campus Tour"
                src="https://www.youtube.com/embed/zH01vW723oY?autoplay=1&mute=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
