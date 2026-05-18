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
