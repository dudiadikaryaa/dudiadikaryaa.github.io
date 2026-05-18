'use client'
import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        height: 2, width: '0%',
        background: 'var(--accent)',
        zIndex: 100,
        transition: 'width 0.1s linear',
      }}
    />
  )
}
