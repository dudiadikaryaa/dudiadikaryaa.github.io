import { TerminalAnimation } from './TerminalAnimation'
import s from './Projects.module.css'

export function Projects() {
  return (
    <section className={s.section} id="work">
      <div className="wrap">
        <div className="section-eyebrow">personal projects · 2026</div>
        <h2 className="section-title">Personal <span className="it">Projects.</span></h2>

        {/* Featured: pwforge */}
        <article className={s.featured}>
          <div className={s.pfContent}>
            <div className={s.pfMeta}>
              <span className={s.badge}>★ featured</span>
              <span>open source · npm</span>
              <span>·</span>
              <span>v0.1</span>
            </div>
            <h3 className={s.pfTitle}>pw<span className={s.slash}>/</span>forge</h3>
            <div className={s.pfTag}>A CLI that scaffolds a real Playwright TypeScript project from a single URL.</div>
            <p className={s.pfDesc}>Template-first generator with an optional Claude-powered enhancement pass. No API key required — POMs, fixtures, config, CI, README, all sensible defaults.</p>
            <ul className={s.pfBullets}>
              <li>Generates a full POM-structured suite in one command</li>
              <li>Optional <span className="kbd">--ai</span> flag for site-aware test scenarios</li>
              <li>Published to npm · zero-config CI workflow included</li>
            </ul>
            <div className={s.pfCta}>
              <a href="https://github.com/dudiadikaryaa/pwforge" target="_blank" rel="noopener" className="btn primary">View repo →</a>
              <a href="#" className="btn">npx pwforge ↗</a>
            </div>
          </div>
          <div className={s.pfTerminal}>
            <TerminalAnimation />
          </div>
        </article>

        {/* Stack: Skill Manager — full-bleed video, content strip below */}
        <article className={`${s.row} ${s.stack}`}>
          <div className={`${s.pfStage} ${s.wide}`}>
            <div className={s.stamp}>/ desktop · macOS</div>
            <div className={s.mediaWrap}>
              <div className={s.browserWindow}>
                <div className={s.browserBar}>
                  <span className={`${s.tbDot} ${s.dotR}`} />
                  <span className={`${s.tbDot} ${s.dotY}`} />
                  <span className={`${s.tbDot} ${s.dotG}`} />
                  <span className={s.barTitle}>Skill Manager</span>
                </div>
                <video autoPlay muted loop playsInline src="/videos/skill-manager.mp4" />
              </div>
            </div>
          </div>
          <div className={s.pfContent}>
            <div className={s.scLeft}>
              <div className={s.pfMeta}>
                <span className={s.badge}>02</span>
                <span>open source · desktop app</span>
                <span>·</span>
                <span>macOS · Electron</span>
              </div>
              <h3 className={s.pfTitle}>Skill <span className={s.slash}>/</span>Manager</h3>
              <div className={s.pfTag}>A single home for your Claude Code configuration.</div>
              <p className={s.pfDesc}>Browse and edit skills, memory files, and CLAUDE.md. Monitor active Claude CLI sessions and hook scripts. Built with Electron, React and Monaco.</p>
            </div>
            <div className={s.scRight}>
              <ul className={s.pfBullets}>
                <li>Skills, memory and CLAUDE.md editor — Monaco-powered</li>
                <li>Live view of active Claude CLI sessions and hooks</li>
                <li>One-click toggle for installed skills and agents</li>
              </ul>
              <div className={s.pfCta}>
                <a href="https://github.com/dudiadikaryaa/dcm" target="_blank" rel="noopener" className="btn primary">View repo →</a>
                <a href="https://github.com/dudiadikaryaa/dcm/releases" target="_blank" rel="noopener" className="btn">Download ↗</a>
              </div>
            </div>
          </div>
        </article>

        {/* Reverse: Naarm Adventure — phone frame on right */}
        <article className={`${s.row} ${s.reverse}`}>
          <div className={s.pfContent}>
            <div className={s.pfMeta}>
              <span className={s.badge}>03</span>
              <span>personal project</span>
              <span>·</span>
              <span>static site · Netlify</span>
            </div>
            <h3 className={s.pfTitle}>Naarm <span className={s.slash}>/</span>Adventure</h3>
            <div className={s.pfTag}>A random Melbourne suburb picker for spontaneous day-outs.</div>
            <p className={s.pfDesc}>Tap once, get a suburb with parks, cafés and local places — plus real PT travel time and transport modes from the CBD. Data curated via Google Places, served as static JSON.</p>
            <ul className={s.pfBullets}>
              <li>Curated picks per suburb · parks, cafés, local stops</li>
              <li>Real PT travel time + mode from Melbourne CBD</li>
              <li>Static JSON · zero-server · fast on mobile</li>
            </ul>
            <div className={s.pfCta}>
              <a href="https://naarm-adventure.netlify.app" target="_blank" rel="noopener" className="btn primary">Live site →</a>
              <a href="https://github.com/dudiadikaryaa/naarm-adventure" target="_blank" rel="noopener" className="btn">View repo ↗</a>
            </div>
          </div>
          <div className={`${s.pfStage} ${s.phone}`}>
            <div className={s.stamp}>/ mobile · web app</div>
            <div className={s.mediaWrap}>
              <div className={s.phoneFrame}>
                <div className={s.screen}>
                  <video autoPlay muted loop playsInline src="/videos/naarm-adventure.mp4" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
