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

const CURSOR = '<span style="display:inline-block;width:7px;height:13px;background:#e6e0d0;vertical-align:-2px;animation:blink 1s step-end infinite"></span>'

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
    target.innerHTML = acc + CURSOR
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

    function appendLine(prompt: boolean): HTMLSpanElement {
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
        if (step.type === 'out') await sleep(step.delay)
        const target = appendLine(step.type === 'cmd')
        if (step.type === 'cmd') {
          await typeHtml(target, step.html, step.speed)
        } else {
          target.innerHTML = step.html
        }
      }
      if (!cancelled) {
        const final = appendLine(true)
        final.innerHTML = CURSOR
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
