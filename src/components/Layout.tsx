import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, X, Github, Linkedin, Mail, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { cn } from '../lib/utils'

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
  const location = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    // retire le préfixe de langue existant et reconstruit correctement
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
                  "px-3 py-2 text-sm font-medium rounded-full transition-colors relative whitespace-nowrap",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                    />
                  )}
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="h-6 w-px bg-border/50 mx-2" />

        <div className="flex items-center gap-2 pr-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={toggleLang}
            aria-label="Toggle Language"
          >
            <span className="text-xs font-bold">{i18n.language.substring(0, 2).toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </motion.div>
            </AnimatePresence>
          </Button>
          <Button asChild size="sm" className="rounded-full px-5">
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
            aria-label="Toggle Language"
          >
            <span className="text-xs font-bold">{i18n.language.substring(0, 2).toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {/* Mobile Navigation - Overlay and Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <div
            className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-2xl pt-20 px-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-200"
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
                <div key={link.href} className="animate-in fade-in slide-in-from-left-2 duration-200 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
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
                </div>
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
          </div>
        </>
      )}

      <main className="pt-24 md:pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
        <Outlet />
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
