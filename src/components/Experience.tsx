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
    recent: false,
    role: 'SDET',
    company: 'Shopee International',
    where: 'Jakarta, Indonesia · 7 SEA markets',
    summary: 'Owned User Loyalty & User Referral for Shopee International across seven Southeast Asian markets. Daily-sprint API + UI automation with Karate Framework and WebdriverIO. Led first-line production debug triage, identifying root causes before developer escalation.',
    chips: ['WebdriverIO', 'Karate', 'API automation', 'Loyalty', 'Referral', 'i18n', 'Production triage'],
  },
  {
    dates: 'May 2020 — Dec 2020',
    recent: false,
    role: 'QA Engineer',
    company: 'Sinbad Karya Perdagangan',
    where: 'Jakarta, Indonesia · B2B supply chain',
    summary: "Initiated and built the team's first UI automation framework with TestCafe — the company's first automated regression suite. Manual + API automation with MochaChai JS on a B2B supply-chain platform.",
    chips: ['TestCafe', 'MochaChai', 'API testing', 'Framework-zero-to-one'],
  },
  {
    dates: 'Jul 2019 — Mar 2020',
    recent: false,
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
      <div className="section-eyebrow">experience · 2019 — 2026</div>

      <div className={s.list}>
        {ROLES.map((r) => (
          <div className={s.row} key={r.company}>
            <div className={s.dates}>
              {r.dates}
              {r.recent && (
                <><br /><span className={s.now}>most recent</span></>
              )}
            </div>
            <div className={s.body}>
              <h3 className={s.role}>
                {r.role} <span className={s.at}>· {r.company}</span>
              </h3>
              <div className={s.where}>{r.where}</div>
              <p className={s.summary}>{r.summary}</p>
              <div className={s.chips}>
                {r.chips.map(c => <span key={c}>{c}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

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
              <span>Computer Science</span>
              <span>Software Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
