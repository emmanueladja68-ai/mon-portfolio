import { useState, useEffect, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { Menu, Moon, Sun, X, Github, Linkedin, Mail, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { cn } from '../lib/utils'
import { PageTransition } from './PageTransition'

const themeStorageKey = 'portfolio-theme'

export function Layout() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(themeStorageKey)
    if (stored === 'light') return false
    if (stored === 'dark') return true
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll()
  const location = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    if (isDark) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
      localStorage.setItem(themeStorageKey, 'dark')
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
      localStorage.setItem(themeStorageKey, 'light')
    }
    const timeout = window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 240)
    return () => window.clearTimeout(timeout)
  }, [isDark])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Scroll to top on route change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  const navigation = t('navigation', { returnObjects: true }) as any
  const footer = t('footer', { returnObjects: true }) as any

  const toggleLang = () => {
    const currentLang = i18n.language.startsWith('fr') ? 'fr' : 'en'
    const newLang = currentLang === 'fr' ? 'en' : 'fr'
    
    const currentPath = location.pathname
    const stripped = currentPath.replace(/^\/(en|fr)/, '')
    const newPath = `/${newLang}${stripped || ''}`

    i18n.changeLanguage(newLang)
    navigate(newPath)
  }

  const currentLang = i18n.language.startsWith('fr') ? 'fr' : 'en'
  const getLocalizedPath = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (cleanPath === '/') return `/${currentLang}`;
    return `/${currentLang}${cleanPath}`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Desktop Navigation - Floating Pill */}
      <header
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-2 rounded-full border border-border/40 backdrop-blur-md transition-all duration-300",
          isScrolled ? "bg-background/80 shadow-lg" : "bg-transparent border-transparent"
        )}
      >
        <div className="flex items-center gap-1 px-2">
          {navigation.links.map((link: any) => (
            <NavLink
              key={link.href}
              to={getLocalizedPath(link.href)}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="h-6 w-px bg-border/50 mx-1" />
        <div className="flex items-center gap-1 px-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={toggleLang}
            aria-label="Toggle Language"
          >
            <Languages size={18} />
            <span className="sr-only">Toggle Language</span>
            <span className="ml-1 text-[10px] font-bold">{i18n.language.substring(0, 2).toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button asChild size="sm" className="rounded-full px-5 h-9">
            <a href={navigation.cta.href} target="_blank" rel="noopener noreferrer">
              {navigation.cta.label}
            </a>
          </Button>
        </div>
      </header>

      {/* Mobile Navigation - Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border">
        <NavLink to={getLocalizedPath('/')} className="font-bold text-lg tracking-tighter">
          {navigation.brand}
        </NavLink>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={toggleLang}
          >
            <span className="text-[10px] font-bold">{i18n.language.substring(0, 2).toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation - Overlay and Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-2xl pt-20 px-6 md:hidden"
            >
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"
              >
                <X />
              </button>
              <nav className="flex flex-col gap-4 text-xl font-medium pb-6">
                {navigation.links.map((link: any, index: number) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={getLocalizedPath(link.href)}
                      className={({ isActive }) =>
                        cn(
                          "block py-3 border-b border-border/50",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="pb-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <span className="text-sm font-medium">Apparence</span>
                  <div className="flex items-center gap-3">
                    <Sun size={16} className={!isDark ? "text-primary" : "text-muted-foreground"} />
                    <Switch checked={isDark} onCheckedChange={setIsDark} />
                    <Moon size={16} className={isDark ? "text-primary" : "text-muted-foreground"} />
                  </div>
                </div>
                <Button asChild size="lg" className="w-full text-lg h-12 rounded-xl">
                  <a href={navigation.cta.href}>{navigation.cta.label}</a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-24 md:pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border bg-muted/30 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4 max-w-md">
            <h3 className="text-2xl font-bold tracking-tight">{footer.headline}</h3>
            <div className="flex gap-4">
              <a href={(t('contact.info.github') as string) || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github size={20} /></a>
              <a href={(t('contact.info.linkedin') as string) || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin size={20} /></a>
              <a href={`mailto:${t('contact.info.email')}`} className="text-muted-foreground hover:text-foreground transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <Button asChild variant="default" size="lg" className="rounded-full px-8">
              <NavLink to={getLocalizedPath(footer.cta.href)}>{footer.cta.label}</NavLink>
            </Button>
            <div className="flex gap-2 items-center mt-4">
               <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleLang}
                  aria-label="Toggle Language"
                >
                  <Languages size={20} />
                  <span className="sr-only">Toggle Language</span>
                  <span className="ml-2 text-xs font-bold">{i18n.language.substring(0, 2).toUpperCase()}</span>
                </Button>
                 <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsDark(!isDark)}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
