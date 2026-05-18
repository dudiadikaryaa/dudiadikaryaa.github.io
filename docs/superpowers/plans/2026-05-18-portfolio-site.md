# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dudi Adikarya's personal portfolio site as a Next.js 15 / React 19 / TypeScript static site, pixel-perfectly matching the `portfolio v2.html` design.

**Architecture:** Single-page app with server components for static sections (Hero, Projects, Experience, About, Footer) and client components for interactive pieces (Nav/theme toggle, terminal animation, scroll progress, keyboard shortcuts). CSS Modules alongside a globals.css that carries all design tokens and shared utility classes — avoids Tailwind friction since the design already has a polished CSS variable system.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, CSS Modules, `next/font/google` (Newsreader + JetBrains Mono + Geist), static export for Netlify/Vercel deployment.

---

## File Structure

```
~/portfolio/
  src/
    app/
      layout.tsx              HTML shell, font setup, inline theme-persistence script
      page.tsx                Assembles all section components
      globals.css             Tokens (light/dark), reset, shared utility classes
      favicon.ico
    components/
      Nav.tsx                 [CLIENT] Sticky nav, brand dot, nav links, theme toggle
      Hero.tsx                [SERVER] Two-column name + mantra grid, hero eyebrow, role pill
      Projects.tsx            [SERVER] Section wrapper, featured card shell, demo grid
      TerminalAnimation.tsx   [CLIENT] IntersectionObserver + async typing animation
      Experience.tsx          [SERVER] Compact timeline rows + education sub-section
      About.tsx               [SERVER] About text + icon tiles
      Footer.tsx              [SERVER] ASCII art + footer meta
      ScrollProgress.tsx      [CLIENT] Fixed 2px bar at top tracking scroll %
      KeyboardShortcuts.tsx   [CLIENT] T = theme toggle, 'qaqa' easter egg
  next.config.ts              output: 'export', images: unoptimized
  tsconfig.json
  package.json
```

---

## Task 1: Bootstrap Next.js project

**Files:**
- Create: `~/portfolio/` (entire project via `create-next-app`)
- Modify: `next.config.ts`
- Modify: `tsconfig.json`

- [ ] **Step 1: Scaffold the project**

```bash
cd ~
npx create-next-app@latest portfolio \
  --typescript \
  --app \
  --no-tailwind \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```

When prompted about Turbopack — press Enter to accept default (yes).

- [ ] **Step 2: Clean out the boilerplate**

Delete these files (they're Next.js starter noise):
```bash
cd ~/portfolio
rm -rf src/app/page.tsx src/app/globals.css src/app/layout.tsx
rm -rf public/next.svg public/vercel.svg
```

- [ ] **Step 3: Configure for static export**

Replace `next.config.ts` with:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4: Verify project starts**

```bash
cd ~/portfolio
npm run dev
```

Expected: Server starts on `http://localhost:3000`. The page will 404 (we deleted page.tsx). That's fine.

- [ ] **Step 5: Commit**

```bash
cd ~/portfolio
git add -A
git commit -m "chore: bootstrap Next.js 15 static portfolio"
```

---

## Task 2: Global CSS (design tokens + shared classes)

**Files:**
- Create: `src/app/globals.css`

- [ ] **Step 1: Create globals.css**

Create `src/app/globals.css` with the full token system and shared classes:

```css
/* ─── Google Fonts are loaded via next/font — no @import needed here ─── */

/* ─── Tokens ─── */
:root {
  --bg:        #f3efe6;
  --bg-soft:   #ece7da;
  --bg-card:   #faf7ef;
  --ink:       #1b1814;
  --ink-soft:  #6a655a;
  --ink-faint: #9a9486;
  --rule:      #d9d2c1;
  --accent:    #5f7b62;
  --accent-w:  #5f7b6210;

  --maxw: 1180px;
  --pad:  clamp(20px, 4vw, 56px);
  --grain-opacity: 0.06;
}

html[data-theme="dark"] {
  --bg:        #14130f;
  --bg-soft:   #1c1a15;
  --bg-card:   #1f1d17;
  --ink:       #ece6d5;
  --ink-soft:  #968f7e;
  --ink-faint: #5c574c;
  --rule:      #2c2920;
  --accent:    #93b298;
  --accent-w:  #93b29818;
  --grain-opacity: 0.08;
}

/* ─── Reset ─── */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background 0.4s ease, color 0.4s ease;
  overflow-x: hidden;
}

/* ─── Grain overlay ─── */
body::before {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  mix-blend-mode: multiply;
}
html[data-theme="dark"] body::before { mix-blend-mode: screen; }

/* ─── Layout ─── */
.wrap {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 var(--pad);
}

section { position: relative; }

.section-eyebrow {
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 28px;
}
.section-eyebrow::before {
  content: '';
  width: 24px; height: 1px;
  background: var(--ink-faint);
}

/* ─── Fade-up ─── */
.fade-up {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
}
.fade-up.in { opacity: 1; transform: translateY(0); }

/* ─── Shared button ─── */
.btn {
  font-size: 12px;
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid var(--rule);
  background: var(--bg);
  color: var(--ink);
  text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover {
  border-color: var(--ink);
  transform: translateY(-1px);
}
.btn.primary {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}
.btn.primary:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
html[data-theme="dark"] .btn.primary:hover { color: #14130f; }

.kbd {
  font-size: 10px;
  border: 1px solid var(--rule);
  background: var(--bg-card);
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--ink-soft);
}
```

- [ ] **Step 2: No test needed (pure CSS, visual) — commit**

```bash
cd ~/portfolio
git add src/app/globals.css
git commit -m "style: add global CSS tokens and shared classes"
```

---

## Task 3: App layout (shell + theme FOUC prevention)

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Newsreader, JetBrains_Mono, Geist } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dudi Adikarya — QA Engineer',
  description: 'QA Automation Engineer based in Melbourne. Playwright, TypeScript, AI-orchestrated testing.',
}

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${newsreader.variable} ${jetbrainsMono.variable} ${geist.variable}`}
            style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Add font variables to globals.css**

Add to `:root` in `src/app/globals.css`:
```css
--serif: var(--font-serif), 'Times New Roman', serif;
--mono:  var(--font-mono), ui-monospace, monospace;
--sans:  var(--font-sans), ui-sans-serif, system-ui, sans-serif;
```

Update `body` in `globals.css` to remove the font-family (it's now set inline from layout):
```css
body {
  background: var(--bg);
  color: var(--ink);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background 0.4s ease, color 0.4s ease;
  overflow-x: hidden;
}
```

And for components that use font variables, they'll reference `var(--serif)`, `var(--mono)`, `var(--sans)`.

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add app layout with font loading and theme FOUC fix"
```

---

## Task 4: ScrollProgress + KeyboardShortcuts (client utilities)

**Files:**
- Create: `src/components/ScrollProgress.tsx`
- Create: `src/components/KeyboardShortcuts.tsx`

- [ ] **Step 1: Create ScrollProgress.tsx**

```typescript
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
```

- [ ] **Step 2: Create KeyboardShortcuts.tsx**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/components/ScrollProgress.tsx src/components/KeyboardShortcuts.tsx
git commit -m "feat: add scroll progress bar and keyboard shortcuts (T theme, qaqa egg)"
```

---

## Task 5: Nav component (sticky + theme toggle)

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Nav.module.css`

- [ ] **Step 1: Create Nav.module.css**

```css
.nav {
  position: sticky; top: 0;
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rule);
  z-index: 50;
}
.inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 14px var(--pad);
  display: flex;
  align-items: center;
  gap: 32px;
}
.brand {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: -0.01em;
  display: flex; align-items: center; gap: 8px;
  user-select: none;
}
.brandDot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
  animation: pulse 2.4s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}
.links {
  margin-left: auto;
  display: flex; gap: 28px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-soft);
}
.links a {
  color: inherit;
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
}
.links a:hover { color: var(--ink); }
.links a::before {
  content: '';
  position: absolute;
  left: -14px; top: 50%;
  width: 4px; height: 1px;
  background: var(--ink-faint);
  transform: translateY(-50%);
}
.toggle {
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--ink-soft);
  font-family: var(--mono);
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  transition: all 0.2s;
}
.toggle:hover { color: var(--ink); border-color: var(--ink-soft); }
.ico { width: 12px; height: 12px; }
```

- [ ] **Step 2: Create Nav.tsx**

```typescript
'use client'
import { useState, useEffect } from 'react'
import s from './Nav.module.css'

const SUN_PATH = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
const MOON_PATH = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'

export function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
    setTheme(stored || 'light')

    function onThemeChange(e: Event) {
      setTheme((e as CustomEvent).detail)
    }
    window.addEventListener('theme-change', onThemeChange)
    return () => window.removeEventListener('theme-change', onThemeChange)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
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
          <svg className={s.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
               dangerouslySetInnerHTML={{ __html: theme === 'dark' ? MOON_PATH : SUN_PATH }} />
          <span>{theme}</span>
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/components/Nav.tsx src/components/Nav.module.css
git commit -m "feat: add Nav with theme toggle and pulsing brand dot"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.module.css`

- [ ] **Step 1: Create Hero.module.css**

```css
.hero {
  padding: clamp(60px, 11vh, 120px) 0 clamp(60px, 10vh, 110px);
}
.eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-soft);
  margin-bottom: 44px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.star { color: var(--accent); }
.sep  { color: var(--ink-faint); }

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
@media (max-width: 880px) {
  .grid { grid-template-columns: 1fr; gap: 36px; }
}

.name {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(56px, 9.4vw, 138px);
  line-height: 0.9;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--ink);
}
.amp  { font-style: italic; color: var(--accent); padding: 0 0.04em; }
.last { font-style: italic; }

.role {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--ink-soft);
  margin: 24px 0 0;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
}
.pill {
  border: 1px solid var(--rule);
  padding: 5px 11px;
  border-radius: 999px;
  background: var(--bg-card);
}
.pillDot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 7px;
  vertical-align: 1px;
}

.mantra {
  position: relative;
  padding-left: clamp(16px, 2.4vw, 32px);
  border-left: 1px solid var(--rule);
}
@media (max-width: 880px) {
  .mantra { border-left: 0; border-top: 1px solid var(--rule); padding-left: 0; padding-top: 24px; }
}
.mantraText {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(26px, 3.3vw, 44px);
  line-height: 1.08;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
  max-width: 14ch;
}
.caret {
  display: inline-block;
  width: 0.36ch; height: 0.78em;
  background: var(--ink);
  vertical-align: -0.08em;
  margin-left: 0.08em;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.mantraAttr {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  margin-top: 14px;
  letter-spacing: 0.02em;
}
.mantraAttr sup {
  font-size: 9px;
  cursor: help;
  margin-left: 2px;
  color: var(--accent);
}
.footnote {
  display: inline-block;
  margin-left: 10px;
  font-size: 11px;
  color: var(--ink-soft);
  opacity: 0;
  transform: translateY(-3px);
  transition: all 0.25s;
  border-left: 1px solid var(--rule);
  padding-left: 10px;
}
.mantraAttr sup:hover + .footnote { opacity: 1; transform: translateY(0); }
```

- [ ] **Step 2: Create Hero.tsx**

```typescript
import s from './Hero.module.css'

export function Hero() {
  return (
    <section className={`${s.hero} wrap`}>
      <div className={`${s.eyebrow} fade-up`}>
        <span className={s.star}>✦</span>
        <span>QA Automation Engineer</span>
        <span className={s.sep}>·</span>
        <span>Melbourne · Naarm, AU</span>
        <span className={s.sep}>·</span>
        <span>Open for work — 2026</span>
      </div>

      <div className={s.grid}>
        <h1 className={`${s.name} fade-up`} style={{ transitionDelay: '0.08s' }}>
          Dudi<br />
          Adi<span className={s.amp}>k</span><span className={s.last}>arya</span>
        </h1>

        <div className={`${s.mantra} fade-up`} style={{ transitionDelay: '0.22s' }}>
          <p className={s.mantraText}>
            Live your life — before life leaves you
            <span className={s.caret} />
          </p>
          <div className={s.mantraAttr}>
            — personal mantra<sup>¹</sup>
            <span className={s.footnote}>also reasonable QA advice: ship today.</span>
          </div>
          <div className={s.role}>
            <span className={s.pill}>
              <span className={s.pillDot} />
              Playwright · TypeScript · AI-orchestrated QA
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wire up fade-up on mount**

In `src/app/page.tsx` (create minimal version first to test):
```typescript
import { Hero } from '@/components/Hero'

export default function Page() {
  return <main><Hero /></main>
}
```

Add a client component `src/components/FadeUpInit.tsx` to trigger the `.in` class:
```typescript
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
```

Add `<FadeUpInit />` to `layout.tsx` inside `<body>` before `{children}`.

- [ ] **Step 4: Commit**

```bash
cd ~/portfolio
git add src/components/Hero.tsx src/components/Hero.module.css src/components/FadeUpInit.tsx src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add Hero section with name, mantra, role pill, fade-up"
```

---

## Task 7: Terminal animation component

**Files:**
- Create: `src/components/TerminalAnimation.tsx`
- Create: `src/components/TerminalAnimation.module.css`

- [ ] **Step 1: Create TerminalAnimation.module.css**

```css
.wrap {
  background:
    radial-gradient(900px 400px at 100% 0%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%),
    var(--bg-soft);
  border-left: 1px solid var(--rule);
  padding: 28px;
  display: flex; flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
  min-height: 460px;
}
@media (max-width: 880px) {
  .wrap { border-left: 0; border-top: 1px solid var(--rule); min-height: unset; padding: 24px; }
}
.stamp {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex; align-items: center; gap: 10px;
}
.stamp::before { content: ''; width: 18px; height: 1px; background: var(--ink-faint); }

.terminal {
  background: #0f0e0b;
  border-radius: 10px;
  font-family: var(--mono);
  font-size: 12.5px;
  color: #e6e0d0;
  box-shadow:
    0 1px 0 0 rgba(255,255,255,0.06) inset,
    0 30px 50px -30px rgba(0,0,0,0.4),
    0 4px 10px -4px rgba(0,0,0,0.3);
  overflow: hidden;
}
html[data-theme="dark"] .terminal {
  box-shadow:
    0 1px 0 0 rgba(255,255,255,0.04) inset,
    0 30px 60px -30px rgba(0,0,0,0.6);
}
.bar {
  display: flex; align-items: center;
  padding: 9px 13px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  gap: 7px;
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: #3a3833; }
.dotR { background: #d97757; }
.dotY { background: #d9b757; }
.dotG { background: #6f9f6f; }
.barTitle {
  margin-left: auto;
  font-size: 10.5px;
  color: #6b6759;
  letter-spacing: 0.04em;
}
.body {
  padding: 16px 18px 20px;
  min-height: 320px;
}
```

- [ ] **Step 2: Create TerminalAnimation.tsx**

```typescript
'use client'
import { useEffect, useRef } from 'react'
import s from './TerminalAnimation.module.css'

type Step =
  | { type: 'cmd'; html: string; speed: number }
  | { type: 'out'; html: string; delay: number }

const SCRIPT: Step[] = [
  { type: 'cmd', html: 'npx <span style="color:#cf9b76">pwforge</span> <span style="color:#c5a3e0">https://saucedemo.com</span>', speed: 32 },
  { type: 'out', html: '<span style="color:#6b6759">✓ Resolved pwforge@0.1.0</span>', delay: 400 },
  { type: 'out', html: '<span style="color:#c0baa6">→ Scaffolding Playwright project at</span> <span style="color:#d9b88a">./saucedemo-tests/</span>', delay: 250 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">package.json</span>          <span style="color:#6b6759">deps + scripts</span>', delay: 220 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">playwright.config.ts</span>  <span style="color:#6b6759">2 browsers, retries, traces</span>', delay: 180 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">tests/login.spec.ts</span>   <span style="color:#6b6759">happy + invalid creds</span>', delay: 160 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">pages/login.page.ts</span>   <span style="color:#6b6759">POM</span>', delay: 160 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">fixtures/auth.ts</span>      <span style="color:#6b6759">storageState reuse</span>', delay: 160 },
  { type: 'out', html: '<span style="color:#93b298">  ✓</span> <span style="color:#d9b88a">.github/workflows/test.yml</span> <span style="color:#6b6759">CI</span>', delay: 200 },
  { type: 'out', html: '', delay: 100 },
  { type: 'out', html: '<span style="color:#93b298">✦ done</span> <span style="color:#6b6759">in 2.4s · 11 files · 0 errors</span>', delay: 250 },
  { type: 'out', html: '', delay: 80 },
  { type: 'out', html: '<span style="color:#c0baa6">next:</span> <span style="color:#6b6759">cd saucedemo-tests &amp;&amp; npm test</span>', delay: 200 },
]

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

async function typeHtml(target: HTMLElement, html: string, speed: number) {
  const tokens: string[] = []
  let i = 0
  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i)
      tokens.push(html.slice(i, end + 1))
      i = end + 1
    } else {
      tokens.push(html[i])
      i++
    }
  }
  let acc = ''
  for (const t of tokens) {
    acc += t
    target.innerHTML = acc + '<span style="display:inline-block;width:7px;height:13px;background:#e6e0d0;vertical-align:-2px;animation:blink 1s step-end infinite"></span>'
    if (t.length === 1 && t !== ' ') await sleep(speed)
  }
  target.innerHTML = acc
}

export function TerminalAnimation() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const body = bodyRef.current
    const term = termRef.current
    if (!body || !term) return

    let cancelled = false

    function appendLine(prompt: boolean) {
      const line = document.createElement('div')
      line.style.cssText = 'display:flex;gap:8px;min-height:18px;line-height:1.55'
      if (prompt) {
        const p = document.createElement('span')
        p.style.color = '#93b298'
        p.style.userSelect = 'none'
        p.textContent = '~'
        line.appendChild(p)
      }
      const c = document.createElement('span')
      line.appendChild(c)
      body.appendChild(line)
      return c
    }

    async function run() {
      await new Promise<void>(resolve => {
        let started = false
        const io = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !started) {
            started = true; io.disconnect(); resolve()
          }
        }, { threshold: 0.25 })
        io.observe(term)
        setTimeout(() => { if (!started) { started = true; io.disconnect(); resolve() } }, 3000)
      })

      for (const step of SCRIPT) {
        if (cancelled) return
        if (step.delay) await sleep(step.delay)
        const target = appendLine(step.type === 'cmd')
        if (step.type === 'cmd') {
          await typeHtml(target, step.html, step.speed)
        } else {
          target.innerHTML = step.html
        }
      }
      if (!cancelled) {
        const final = appendLine(true)
        final.innerHTML = '<span style="display:inline-block;width:7px;height:13px;background:#e6e0d0;vertical-align:-2px;animation:blink 1s step-end infinite"></span>'
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className={s.wrap}>
      <div className={s.stamp}>/ live · one command</div>
      <div className={s.terminal} ref={termRef}>
        <div className={s.bar}>
          <span className={`${s.dot} ${s.dotR}`} />
          <span className={`${s.dot} ${s.dotY}`} />
          <span className={`${s.dot} ${s.dotG}`} />
          <span className={s.barTitle}>~/projects · zsh</span>
        </div>
        <div className={s.body} ref={bodyRef} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/components/TerminalAnimation.tsx src/components/TerminalAnimation.module.css
git commit -m "feat: add terminal typing animation with IntersectionObserver trigger"
```

---

## Task 8: Projects section

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Projects.module.css`

- [ ] **Step 1: Create Projects.module.css**

```css
.section {
  padding: clamp(80px, 14vh, 140px) 0 clamp(80px, 12vh, 120px);
  border-top: 1px solid var(--rule);
  background: var(--bg-soft);
}
.title {
  font-family: var(--serif);
  font-size: clamp(40px, 6vw, 76px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 56px;
}
.it { font-style: italic; color: var(--accent); }

.featured {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0;
  align-items: stretch;
  margin-bottom: 40px;
  border: 1px solid var(--rule);
  border-radius: 14px;
  background: var(--bg-card);
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s, border-color 0.3s;
}
.featured:hover {
  transform: translateY(-3px);
  border-color: var(--ink-faint);
  box-shadow: 0 20px 40px -28px rgba(0,0,0,0.25);
}
@media (max-width: 880px) { .featured { grid-template-columns: 1fr; } }

.pfContent {
  padding: clamp(32px, 4vw, 48px);
  display: flex; flex-direction: column; gap: 18px;
}
.pfMeta {
  display: flex; gap: 12px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  align-items: center;
}
.badge {
  background: var(--accent-w);
  color: var(--accent);
  padding: 4px 9px;
  border-radius: 4px;
  font-weight: 500;
}
.pfTitle {
  font-family: var(--serif);
  font-size: clamp(44px, 5.5vw, 68px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0;
}
.slash { color: var(--ink-faint); font-style: italic; }
.pfTag {
  font-family: var(--serif);
  font-style: italic;
  font-size: 22px;
  line-height: 1.3;
  color: var(--ink-soft);
  max-width: 28ch;
}
.pfDesc { color: var(--ink-soft); max-width: 38ch; }
.pfBullets {
  list-style: none; padding: 0; margin: 8px 0 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-soft);
  display: flex; flex-direction: column; gap: 8px;
}
.pfBullets li { display: flex; gap: 10px; }
.pfBullets li::before { content: '→'; color: var(--accent); flex-shrink: 0; }
.pfCta {
  margin-top: auto;
  display: flex; gap: 14px; flex-wrap: wrap;
  padding-top: 18px;
}

/* demo grid */
.demoGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 720px) { .demoGrid { grid-template-columns: 1fr; } }
.demoCard {
  border: 1px solid var(--rule);
  border-radius: 12px;
  padding: 32px;
  background: var(--bg-card);
  display: flex; flex-direction: column; gap: 16px;
  position: relative;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s, box-shadow 0.3s;
}
.demoCard:hover {
  transform: translateY(-3px);
  border-color: var(--ink-faint);
  box-shadow: 0 18px 30px -22px rgba(0,0,0,0.2);
}
.corner {
  position: absolute; top: 0; right: 0;
  width: 64px; height: 64px;
  background: linear-gradient(225deg, var(--accent-w) 0%, transparent 60%);
  pointer-events: none;
}
.cardMeta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: flex; gap: 12px; align-items: center;
}
.num {
  background: var(--bg);
  border: 1px solid var(--rule);
  padding: 2px 7px;
  border-radius: 4px;
  color: var(--ink-soft);
}
.cardTitle {
  font-family: var(--serif);
  font-size: 36px;
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 0;
}
.cardTitleIt { font-style: italic; color: var(--ink-soft); }
.copy { color: var(--ink-soft); font-size: 15px; line-height: 1.55; }
.chips {
  display: flex; gap: 6px; flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 10.5px;
  margin-top: 4px;
}
.chips span {
  border: 1px solid var(--rule);
  padding: 3px 8px;
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--bg);
}
.cardLink {
  margin-top: auto;
  font-family: var(--mono);
  font-size: 12px;
  text-decoration: none;
  color: var(--ink);
  display: inline-flex; align-items: center; gap: 6px;
  width: fit-content;
  border-bottom: 1px solid var(--ink-faint);
  padding-bottom: 2px;
  transition: gap 0.2s, border-color 0.2s, color 0.2s;
}
.cardLink:hover { gap: 12px; border-color: var(--accent); color: var(--accent); }
```

- [ ] **Step 2: Create Projects.tsx**

```typescript
import { TerminalAnimation } from './TerminalAnimation'
import s from './Projects.module.css'

export function Projects() {
  return (
    <section className={s.section} id="work">
      <div className="wrap">
        <div className="section-eyebrow">selected work · 2026</div>

        {/* Featured: pwforge */}
        <article className={s.featured}>
          <div className={s.pfContent}>
            <div className={s.pfMeta}>
              <span className={s.badge}>★ featured</span>
              <span>open source · npm</span>
              <span>·</span>
              <span>v0.1</span>
            </div>
            <h2 className={s.pfTitle}>pw<span className={s.slash}>/</span>forge</h2>
            <div className={s.pfTag}>A CLI that scaffolds a real Playwright TypeScript project from a single URL.</div>
            <p className={s.pfDesc}>
              Template-first generator with an optional Claude-powered enhancement pass.
              No API key required to work — POMs, fixtures, config, CI, README, all sensible defaults.
            </p>
            <ul className={s.pfBullets}>
              <li>Generates a full POM-structured suite in one command</li>
              <li>Optional <span className="kbd">--ai</span> flag for site-aware test scenarios</li>
              <li>Published to npm · zero-config CI workflow included</li>
            </ul>
            <div className={s.pfCta}>
              <a href="https://github.com/dudiadikaryaa" target="_blank" rel="noopener" className="btn primary">View repo →</a>
              <a href="#" className="btn">npx pwforge ↗</a>
            </div>
          </div>
          <TerminalAnimation />
        </article>

        {/* Demo cards */}
        <div className={s.demoGrid}>
          <article className={s.demoCard}>
            <div className={s.corner} />
            <div className={s.cardMeta}><span className={s.num}>02</span><span>example output</span></div>
            <h3 className={s.cardTitle}>pwforge-demo<br /><span className={s.cardTitleIt}>/saucedemo</span></h3>
            <p className={s.copy}>Generated by pwforge, then hand-enhanced. Full E2E flow on the QA community's standard demo storefront — login, listing, cart, checkout.</p>
            <div className={s.chips}>
              <span>login</span><span>cart</span><span>checkout</span><span>POM</span><span>CI</span>
            </div>
            <a href="https://github.com/dudiadikaryaa" target="_blank" rel="noopener" className={s.cardLink}>Open repo <span>→</span></a>
          </article>
          <article className={s.demoCard}>
            <div className={s.corner} />
            <div className={s.cardMeta}><span className={s.num}>03</span><span>example output</span></div>
            <h3 className={s.cardTitle}>pwforge-demo<br /><span className={s.cardTitleIt}>/demoqa</span></h3>
            <p className={s.copy}>A second example on a UI-rich practice site. Different POM shape, different patterns — modals, drag-and-drop, complex form interactions.</p>
            <div className={s.chips}>
              <span>forms</span><span>modals</span><span>drag-drop</span><span>alerts</span><span>CI</span>
            </div>
            <a href="https://github.com/dudiadikaryaa" target="_blank" rel="noopener" className={s.cardLink}>Open repo <span>→</span></a>
          </article>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/components/Projects.tsx src/components/Projects.module.css
git commit -m "feat: add Projects section with featured pwforge card and terminal animation"
```

---

## Task 9: Experience section

**Files:**
- Create: `src/components/Experience.tsx`
- Create: `src/components/Experience.module.css`

- [ ] **Step 1: Create Experience.module.css**

```css
.section {
  padding: clamp(100px, 16vh, 160px) 0;
}
.eyebrow { margin-bottom: 0; }

.list {
  display: flex; flex-direction: column;
  border-top: 1px dashed var(--rule);
  margin-top: 40px;
}
.row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 32px;
  padding: 28px 0;
  border-bottom: 1px dashed var(--rule);
  align-items: start;
  transition: padding-left 0.3s;
}
.row:hover { padding-left: 10px; }
@media (max-width: 660px) {
  .row { grid-template-columns: 1fr; gap: 8px; }
}
.dates {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
  padding-top: 7px;
}
.now {
  display: inline-block;
  background: var(--accent-w);
  color: var(--accent);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 10px;
  margin-left: 4px;
  letter-spacing: 0.04em;
}
.body { display: flex; flex-direction: column; gap: 10px; }
.role {
  font-family: var(--serif);
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0;
  transition: color 0.2s;
}
.row:hover .role { color: var(--accent); }
.at { font-style: italic; color: var(--ink-soft); }
.where {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: -4px;
}
.summary {
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.55;
  max-width: 60ch;
  margin: 4px 0 0;
}
.chips {
  display: flex; gap: 6px; flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 10.5px;
  margin-top: 4px;
}
.chips span {
  border: 1px solid var(--rule);
  padding: 3px 8px;
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--bg-card);
}

/* Education sub-block */
.eduBlock {
  margin-top: clamp(56px, 9vh, 96px);
  max-width: 760px;
}
.eduBlock .eduEyebrow { margin-bottom: 20px; }
.eduRow {
  border-top: 1px dashed var(--rule);
}
.eduRow .role { font-size: 24px; }
```

- [ ] **Step 2: Create Experience.tsx**

```typescript
import s from './Experience.module.css'

const ROLES = [
  {
    dates: 'Apr 2024 — Mar 2026',
    recent: true,
    role: 'Senior QA Engineer',
    company: 'JiffyShirts',
    where: 'California, USA · Remote',
    summary: 'Architected a fully autonomous STLC pipeline orchestrated by Claude Code — Jira intake → Playwright authoring → execution → triage → PR review → ticket close. Operated at 2–3× traditional QA throughput across 5 product lines including DTF Transfers, a top revenue product.',
    chips: ['Playwright', 'TypeScript', 'Claude Code', 'E2E checkout', 'payments', 'CI/CD', 'STLC pipeline'],
  },
  {
    dates: 'Jan 2021 — Mar 2024',
    role: 'SDET',
    company: 'Shopee International',
    where: 'Jakarta, Indonesia · 7 SEA markets',
    summary: 'Owned User Loyalty & User Referral for Shopee International across seven Southeast Asian markets. Daily-sprint API + UI automation with Karate Framework and WebdriverIO. Led first-line production debug triage, identifying root causes before developer escalation.',
    chips: ['WebdriverIO', 'Karate', 'API automation', 'Loyalty', 'Referral', 'i18n', 'Production triage'],
  },
  {
    dates: 'May 2020 — Dec 2020',
    role: 'QA Engineer',
    company: 'Sinbad Karya Perdagangan',
    where: 'Jakarta, Indonesia · B2B supply chain',
    summary: 'Initiated and built the team\'s first UI automation framework with TestCafe — the company\'s first automated regression suite. Manual + API automation with MochaChai JS on a B2B supply-chain platform.',
    chips: ['TestCafe', 'MochaChai', 'API testing', 'Framework-zero-to-one'],
  },
  {
    dates: 'Jul 2019 — Mar 2020',
    role: 'Quality Engineer',
    company: 'Alterra Indonesia',
    where: 'Jakarta, Indonesia · B2C PWA',
    summary: 'First role out of uni. Automated tests with Katalon, JBehave, RestAssured, and Cucumber on a B2C Progressive Web App. Manual Scrum validation against acceptance criteria each sprint.',
    chips: ['Katalon', 'JBehave', 'RestAssured', 'Cucumber', 'Scrum'],
  },
]

export function Experience() {
  return (
    <section className={`${s.section} wrap`} id="experience">
      <div className={`section-eyebrow ${s.eyebrow}`}>experience · 2019 — 2026</div>

      <div className={s.list}>
        {ROLES.map((r) => (
          <div className={s.row} key={r.company}>
            <div className={s.dates}>
              {r.dates}
              {r.recent && <><br /><span className={s.now}>most recent</span></>}
            </div>
            <div className={s.body}>
              <h3 className={s.role}>{r.role} <span className={s.at}>· {r.company}</span></h3>
              <div className={s.where}>{r.where}</div>
              <p className={s.summary}>{r.summary}</p>
              <div className={s.chips}>{r.chips.map(c => <span key={c}>{c}</span>)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={s.eduBlock}>
        <div className={`section-eyebrow ${s.eduEyebrow}`}>education</div>
        <div className={`${s.row} ${s.eduRow}`}>
          <div className={s.dates}>2015 — 2019</div>
          <div className={s.body}>
            <h3 className={`${s.role} ${s.eduRole}`}>
              B.Sc. Computer Science <span className={s.at}>· Airlangga University</span>
            </h3>
            <div className={s.where}>Surabaya, Indonesia</div>
            <div className={s.chips}>
              <span>Computer Science</span><span>Software Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/portfolio
git add src/components/Experience.tsx src/components/Experience.module.css
git commit -m "feat: add Experience section with compact timeline and education sub-section"
```

---

## Task 10: About + Footer sections

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/About.module.css`
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.module.css`

- [ ] **Step 1: Create About.module.css**

```css
.section {
  padding: clamp(100px, 16vh, 160px) 0;
  border-top: 1px solid var(--rule);
  background: var(--bg-soft);
}
.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 64px;
  align-items: start;
}
@media (max-width: 880px) { .grid { grid-template-columns: 1fr; gap: 40px; } }

.leadP {
  font-family: var(--serif);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.4;
  font-style: italic;
  color: var(--ink);
  margin: 0 0 22px;
  max-width: 22ch;
}
.bodyP {
  color: var(--ink-soft);
  font-size: 17px;
  line-height: 1.65;
  max-width: 38ch;
  margin: 0;
}

.card {
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: var(--bg-card);
  padding: 28px;
  display: flex; flex-direction: column; gap: 0;
}
.cardHead {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
.cardHead::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
.iconRow { display: flex; flex-direction: column; gap: 10px; }
.tile {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--rule);
  border-radius: 10px;
  background: var(--bg);
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.25s cubic-bezier(.2,.7,.2,1), border-color 0.2s, background 0.2s;
}
.tile:hover {
  transform: translateY(-2px);
  border-color: var(--ink-faint);
  background: var(--bg-card);
}
.tile svg {
  width: 22px; height: 22px;
  flex-shrink: 0;
  color: var(--ink-soft);
  transition: color 0.25s;
}
.tile:hover svg { color: var(--accent); }
.tileInfo { display: flex; flex-direction: column; gap: 1px; line-height: 1.2; min-width: 0; }
.tileName {
  font-family: var(--serif);
  font-size: 20px;
  font-style: italic;
  letter-spacing: -0.005em;
  color: var(--ink);
}
.tileSub {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--ink-faint);
  letter-spacing: 0.02em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tileGo {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--ink-faint);
  transition: transform 0.25s, color 0.2s;
  flex-shrink: 0;
}
.tile:hover .tileGo { transform: translate(3px, -3px); color: var(--accent); }
```

- [ ] **Step 2: Create About.tsx**

```typescript
import s from './About.module.css'

export function About() {
  return (
    <section className={s.section} id="about">
      <div className={`wrap ${s.grid}`}>
        <div>
          <div className="section-eyebrow">about</div>
          <p className={s.leadP}>I&apos;m a QA engineer who likes test code as much as the product it tests.</p>
          <p className={s.bodyP}>
            Based in Melbourne, recently arrived. Spent six years in QA — most recently two years at JiffyShirts
            wiring Claude Code into a full STLC pipeline, before that three+ years at Shopee International across
            seven SEA markets. I care about CI that doesn&apos;t lie, POMs that don&apos;t rot, and assertions
            that actually mean something. Off-keyboard: coffee that&apos;s a bit too strong, cycling, the slow stuff.
          </p>
        </div>

        <div className={s.card}>
          <div className={s.cardHead}>elsewhere</div>
          <div className={s.iconRow}>
            <a className={s.tile} href="https://github.com/dudiadikaryaa" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.67.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span className={s.tileInfo}>
                <span className={s.tileName}>GitHub</span>
                <span className={s.tileSub}>/dudiadikaryaa</span>
              </span>
              <span className={s.tileGo}>↗</span>
            </a>

            <a className={s.tile} href="https://www.linkedin.com/in/ilham-dudi/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
              </svg>
              <span className={s.tileInfo}>
                <span className={s.tileName}>LinkedIn</span>
                <span className={s.tileSub}>/ilham-dudi</span>
              </span>
              <span className={s.tileGo}>↗</span>
            </a>

            <a className={s.tile} href="mailto:ilhamdudi16@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2"/>
                <path d="m3.5 6 8.5 6.5L20.5 6"/>
              </svg>
              <span className={s.tileInfo}>
                <span className={s.tileName}>Email</span>
                <span className={s.tileSub}>ilhamdudi16@gmail.com</span>
              </span>
              <span className={s.tileGo}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Footer.module.css**

```css
.footer {
  border-top: 1px solid var(--rule);
  padding: 56px 0 36px;
}
.inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 32px;
  align-items: end;
}
@media (max-width: 720px) { .inner { grid-template-columns: 1fr; } }
.ascii {
  font-family: var(--mono);
  font-size: 10px;
  line-height: 1.05;
  color: var(--ink-faint);
  white-space: pre;
  letter-spacing: -0.02em;
  user-select: none;
  transition: color 0.3s;
  margin: 0;
}
.ascii:hover { color: var(--accent); }
.meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-soft);
  text-align: right;
  letter-spacing: 0.02em;
  display: flex; flex-direction: column; gap: 6px;
}
@media (max-width: 720px) { .meta { text-align: left; } }
.accent { color: var(--accent); }
```

- [ ] **Step 4: Create Footer.tsx**

```typescript
import s from './Footer.module.css'

const ASCII = `   ___                    ___
  /   \\  _   _  __| |(_)
 / /\\ /  | | | |/ _\` || |    .  .   live your life
/ /_// _ | |_| | (_| || |    .  .   before life
\\____/(_) \\__,_|\\__,_||_|    ◦ ◦   leaves you.`

export function Footer() {
  return (
    <footer className={`${s.footer} wrap`}>
      <div className={s.inner}>
        <pre className={s.ascii} title="hover me">{ASCII}</pre>
        <div className={s.meta}>
          <span>© 2026 · Dudi Adikarya</span>
          <span>built quietly in Melbourne</span>
          <span className={s.accent}>press <span className="kbd">T</span> to toggle theme</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/portfolio
git add src/components/About.tsx src/components/About.module.css src/components/Footer.tsx src/components/Footer.module.css
git commit -m "feat: add About section with icon tiles and Footer with ASCII art"
```

---

## Task 11: Wire everything into page.tsx + final verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update page.tsx to assemble all sections**

```typescript
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Update layout.tsx to include all client utilities**

Add to the `<body>` in `layout.tsx`:
```typescript
import { Nav } from '@/components/Nav'
import { ScrollProgress } from '@/components/ScrollProgress'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts'
import { FadeUpInit } from '@/components/FadeUpInit'

// Inside <body>:
<ScrollProgress />
<KeyboardShortcuts />
<FadeUpInit />
<Nav />
{children}
```

- [ ] **Step 3: Run the dev server and visually verify**

```bash
cd ~/portfolio
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Light mode renders correctly (cream background, ink text)
- [ ] Dark mode toggle works (T key + button), persists on refresh
- [ ] Hero: name in large serif, mantra in right column with blinking caret
- [ ] Projects: pwforge featured card visible, terminal animation plays when scrolled into view
- [ ] Experience: 4 timeline rows render, hover shifts left padding, chips visible
- [ ] Education sub-section visible below experience
- [ ] About: two-column layout, icon tiles lift on hover
- [ ] Footer: ASCII art, hover changes colour
- [ ] Scroll progress bar visible at top
- [ ] `qaqa` typed anywhere briefly turns accent orange

- [ ] **Step 4: Run static build to verify no build errors**

```bash
cd ~/portfolio
npm run build
```

Expected: `out/` directory created with no TypeScript errors.

- [ ] **Step 5: Final commit**

```bash
cd ~/portfolio
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: wire all sections into page, complete portfolio v1"
```

---

## Self-Review

**Spec coverage check:**
- [x] Big type-led hero — name + mantra side by side
- [x] Theme toggle (button + T key) with localStorage persistence
- [x] Scroll progress bar at top
- [x] Animated CLI typing demo inside pwforge card
- [x] pwforge featured large + 2 demo cards smaller
- [x] Compact timeline experience (4 roles)
- [x] Education sub-section
- [x] About text + icon tiles for GitHub / LinkedIn / Email
- [x] ASCII footer
- [x] Paper-grain overlay
- [x] Hover micro-interactions (cards, exp rows, icon tiles, links)
- [x] Footnote ¹ reveal on hover
- [x] `qaqa` easter egg
- [x] Blinking caret in mantra
- [x] Fade-up animation on hero elements
- [x] `nav` sticky with backdrop blur

**No gaps found.** All design requirements covered.
