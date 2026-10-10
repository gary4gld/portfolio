'use client'

import { useEffect, useState } from 'react'
import { HamburgerIcon, CloseIcon } from './icons'

const NAV_ITEMS = ['About', 'Projects', 'Skills', 'Contact'] as const
const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'contact']

// Fixed top nav for the home page. Highlights the section currently in the
// middle of the viewport and handles the mobile menu.
export default function HomeNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white">Gary De la Cruz</span>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase()
            return (
              <a
                key={item}
                href={`#${id}`}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </a>
            )
          })}
        </div>

        {/* Mobile hamburger — only visible below sm breakpoint */}
        <button
          className="sm:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu sm:hidden ${menuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
        inert={!menuOpen}
      >
        <div className="max-w-5xl mx-auto px-6 pb-4 flex flex-col">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase()
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-sm py-3 border-b border-white/5 last:border-0 transition-colors ${
                  activeSection === id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
