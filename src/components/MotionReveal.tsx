import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type MotionRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function MotionReveal({ children, delay = 0, className }: MotionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {children}
    </motion.div>
  )
}
