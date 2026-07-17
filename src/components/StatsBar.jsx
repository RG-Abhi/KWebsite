import { useEffect, useRef, useState } from 'react'
import { useData } from '../context/websiteData'
import ScrollReveal from './ScrollReveal'

function useCountUp(target, enabled, onComplete) {
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        let startTime = null
        const update = (now) => {
          if (!startTime) startTime = now
          const targetNum = Number(target) || 0
          const progress = Math.min((now - startTime) / duration, 1)
          el.textContent = Math.floor(progress * targetNum)
          if (progress < 1) {
            requestAnimationFrame(update)
          } else {
            el.textContent = targetNum
            if (onComplete) onComplete()
          }
        }
        requestAnimationFrame(update)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, enabled, onComplete])

  return ref
}

function StatBlock({ stat, isFirst }) {
  const [complete, setComplete] = useState(false)
  const countRef = useCountUp(stat.value, stat.animate, () => setComplete(true))

  return (
    <div className={`home-stat-block ${isFirst ? 'active-glow' : ''}`}>
      <div className={`home-stat-block-icon ${stat.color} ${complete ? 'pulse-once' : ''}`}>
        <i className={`fa-solid ${stat.icon}`}></i>
      </div>
      <div>
        <span className="stat-num">
          {stat.animate ? (
            <><span ref={countRef}>0</span>{stat.suffix}</>
          ) : stat.display}
        </span>
        <span className="stat-lbl">{stat.label}</span>
      </div>
    </div>
  )
}

export default function StatsBar() {
  const { data } = useData()
  const STATS = data.stats
  return (
    <div className="stats-bar">
      {/* Geometric Decos removed for clean light design */}
      <div className="stats-grid container">
        {STATS.map((s, i) => (
          <ScrollReveal key={i} delay={i * 150} threshold={0.5}>
            <StatBlock stat={s} isFirst={i === 0} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
