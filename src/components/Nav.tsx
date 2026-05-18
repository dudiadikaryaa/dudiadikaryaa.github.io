'use client'
import { useState, useEffect } from 'react'
import s from './Nav.module.css'

const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'

export function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
    setTheme(stored || 'light')

    function onThemeChange(e: Event) {
      setTheme((e as CustomEvent<'light' | 'dark'>).detail)
    }
    window.addEventListener('theme-change', onThemeChange)
    return () => window.removeEventListener('theme-change', onThemeChange)
  }, [])

  function toggle() {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (_) {}
    window.dispatchEvent(new CustomEvent('theme-change', { detail: next }))
  }

  return (
    <header className={s.nav}>
      <div className={s.inner}>
        <div className={s.brand}>
          <span className={s.brandDot} />
          <span>dudi.adikarya</span>
        </div>
        <nav className={s.links}>
          <a href="#work">work</a>
          <a href="#experience">experience</a>
          <a href="#about">about</a>
        </nav>
        <button className={s.toggle} onClick={toggle} aria-label="Toggle theme">
          <svg
            className={s.ico}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            dangerouslySetInnerHTML={{ __html: theme === 'dark' ? MOON : SUN }}
          />
          <span>{theme}</span>
        </button>
      </div>
    </header>
  )
}
