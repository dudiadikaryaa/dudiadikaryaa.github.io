import type { Metadata } from 'next'
import { Newsreader, JetBrains_Mono, Geist } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { ScrollProgress } from '@/components/ScrollProgress'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts'
import { FadeUpInit } from '@/components/FadeUpInit'

const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
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
    var t = localStorage.getItem('theme') || 'dark';
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
      <body className={`${newsreader.variable} ${jetbrainsMono.variable} ${geist.variable}`}>
        <ScrollProgress />
        <KeyboardShortcuts />
        <FadeUpInit />
        <Nav />
        {children}
      </body>
    </html>
  )
}
