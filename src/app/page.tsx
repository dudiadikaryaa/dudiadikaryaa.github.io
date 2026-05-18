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
