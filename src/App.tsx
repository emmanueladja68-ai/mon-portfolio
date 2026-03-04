import { Suspense, lazy, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Layout } from './components/Layout'
import { LoadingScreen } from './components/LoadingScreen'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Experience = lazy(() => import('./pages/Experience'))
const Skills = lazy(() => import('./pages/Skills'))
const Professional = lazy(() => import('./pages/Professional'))
const Contact = lazy(() => import('./pages/Contact'))

const childRoutes = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
  { path: 'projects', element: <Projects /> },
  { path: 'experience', element: <Experience /> },
  { path: 'skills', element: <Skills /> },
  { path: 'professional', element: <Professional /> },
  { path: 'contact', element: <Contact /> },
]

const router = createBrowserRouter([
  {
    path: '/fr',
    element: <Layout />,
    children: childRoutes,
  },
  {
    path: '/en',
    element: <Layout />,
    children: childRoutes,
  },
  {
    path: '/',
    element: <Navigate to="/fr" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/fr" replace />,
  }
])

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title')
    const existing = document.querySelector('meta[name="description"]')
    if (existing) {
      existing.setAttribute('content', t('meta.description'))
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = t('meta.description')
      document.head.appendChild(meta)
    }

    // Hreflang handling
    const languages = ['en', 'fr'];
    languages.forEach(lang => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      // Set correct URL for hreflang
      // Current path without lang prefix?
      // This is tricky client-side, but let's try to be helpful.
      const currentPath = window.location.pathname.replace(/^\/(en|fr)/, '');
      link.href = `${window.location.origin}/${lang}${currentPath}`;
    });

  }, [t])

  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<LoadingScreen label={t('meta.loadingLabel')} />}>
        <RouterProvider router={router} />
      </Suspense>
    </MotionConfig>
  )
}

export default App
