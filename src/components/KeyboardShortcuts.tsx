'use client'
import { useEffect } from 'react'

export function KeyboardShortcuts() {
  useEffect(() => {
    let buf = ''

    function onKey(e: KeyboardEvent) {
      // T = theme toggle
      if (e.key === 't' || e.key === 'T') {
        const active = document.activeElement
        if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return
        const current = document.documentElement.getAttribute('data-theme')
        const next = current === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        try { localStorage.setItem('theme', next) } catch (_) {}
        window.dispatchEvent(new CustomEvent('theme-change', { detail: next }))
      }

      // qaqa easter egg
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-4)
        if (buf === 'qaqa') {
          document.documentElement.style.setProperty('--accent', '#d97757')
          setTimeout(() => document.documentElement.style.removeProperty('--accent'), 2400)
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
