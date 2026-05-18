'use client'
import { useEffect } from 'react'

export function FadeUpInit() {
  useEffect(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in'))
    })
  }, [])
  return null
}
