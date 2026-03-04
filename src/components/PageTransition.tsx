import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  )
}
