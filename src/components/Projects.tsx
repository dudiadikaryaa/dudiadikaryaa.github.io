import s from './Projects.module.css'

export function Projects() {
  return (
    <section className={s.section} id="work">
      <div className="wrap">
        <div className="section-eyebrow">selected work · 2026</div>

        <div className={s.projectGrid}>
          <article className={s.projectCard}>
            <div className={s.pfMeta}>
              <span className={s.badge}>★ featured</span>
              <span>open source · npm</span>
              <span>·</span>
              <span>v0.1</span>
            </div>
            <h2 className={s.pfTitle}>pw<span className={s.slash}>/</span>forge</h2>
            <div className={s.pfTag}>CLI that scaffolds a full Playwright TypeScript project from a single URL.</div>
            <ul className={s.pfBullets}>
              <li>Generates a full POM-structured suite in one command</li>
              <li>Optional <span className="kbd">--ai</span> flag for site-aware test scenarios</li>
              <li>Published to npm · zero-config CI workflow included</li>
            </ul>
            <div className={s.pfCta}>
              <a href="https://github.com/dudiadikaryaa/pwforge" target="_blank" rel="noopener" className="btn primary">View repo →</a>
              <a href="#" className="btn">npx pwforge ↗</a>
            </div>
          </article>

          <article className={s.projectCard}>
            <div className={s.pfMeta}>
              <span className={s.badge}>open source</span>
              <span>macOS · Electron</span>
            </div>
            <h2 className={s.pfTitle}>Skill<span className={s.slash}> </span><span className={s.last}>Manager</span></h2>
            <div className={s.pfTag}>Desktop app for managing your Claude Code configuration in one place.</div>
            <ul className={s.pfBullets}>
              <li>Browse and edit skills, memory files, and CLAUDE.md</li>
              <li>Monitor active Claude CLI sessions and hook scripts</li>
              <li>Built with Electron + React + Monaco Editor</li>
            </ul>
            <div className={s.pfCta}>
              <a href="https://github.com/dudiadikaryaa/dcm" target="_blank" rel="noopener" className="btn primary">View repo →</a>
              <a href="https://github.com/dudiadikaryaa/dcm/releases" target="_blank" rel="noopener" className="btn">Download ↗</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
