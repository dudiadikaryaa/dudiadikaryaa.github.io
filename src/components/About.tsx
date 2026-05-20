import s from './About.module.css'

export function About() {
  return (
    <section className={s.section} id="about">
      <div className={`wrap ${s.grid}`}>
        <div>
          <div className="section-eyebrow">about</div>
          <h2 className="section-title">About<span className="it">.</span></h2>
          <p className={s.leadP}>Most QA engineers focus on writing and maintaining tests. I focus on building quality systems that scale.</p>
          <p className={s.bodyP}>
            Over the last 6+ years, I&apos;ve worked across manual testing, API automation, web automation, and QA process design.
          </p>
          <p className={s.bodyP}>
            At Shopee, I worked on QA at scale for one of Southeast Asia&apos;s largest e-commerce platforms.
            More recently at Jiffy.com, I designed and implemented AI-orchestrated QA workflows that supported the full STLC —
            from ticket intake and test planning to Playwright execution, bug reporting, PR review, and test documentation.
          </p>
          <p className={s.bodyP}>
            My core strength is combining strong QA fundamentals with automation architecture. I work hands-on with Playwright
            and TypeScript, build reusable test frameworks, improve coverage across critical user flows, and create workflows
            that help teams move faster without compromising reliability.
          </p>
          <p className={s.bodyP}>
            I&apos;m currently based in Melbourne and open to QA Automation Engineer, SDET, and Quality Engineering roles —
            especially in teams that value modern automation, practical AI adoption, and scalable quality systems.
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
