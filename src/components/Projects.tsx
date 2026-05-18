import { TerminalAnimation } from './TerminalAnimation'
import s from './Projects.module.css'

export function Projects() {
  return (
    <section className={s.section} id="work">
      <div className="wrap">
        <div className="section-eyebrow">selected work · 2026</div>

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

      </div>
    </section>
  )
}
