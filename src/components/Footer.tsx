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
