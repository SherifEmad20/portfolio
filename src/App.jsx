import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import TerminalSection from './components/Terminal'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <TerminalSection />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
