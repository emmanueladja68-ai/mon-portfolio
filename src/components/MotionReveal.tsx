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
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {children}
    </motion.div>
  )
}
