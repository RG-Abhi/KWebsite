import React, { useRef, useEffect, useState } from 'react'

export default function ScrollReveal({ children, animation = 'fade-up', threshold = 0.15, delay = 0, className = '', style = {} }) {
  const [isVisible, setIsVisible] = useState(false)
  const [actualDelay, setActualDelay] = useState(delay)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If the element is already well above the trigger line (e.g. user scrolled fast or it was in view on load)
          // we zero the delay so they don't wait for a long staggered animation out of thin air.
          if (entry.boundingClientRect.top < window.innerHeight * 0.80) {
            setActualDelay(0)
          } else {
            // Cap the maximum delay to prevent elements waiting forever (e.g. a list of 30 items)
            setActualDelay(Math.min(delay, 400))
          }
          
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: Math.min(threshold, 0.2), // prevent large elements from waiting too long
        rootMargin: '0px 0px -15% 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.disconnect()
    }
  }, [threshold, delay])

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: isVisible ? `${actualDelay}ms` : '0ms', ...style }}
    >
      {children}
    </div>
  )
}
