import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  )
}
