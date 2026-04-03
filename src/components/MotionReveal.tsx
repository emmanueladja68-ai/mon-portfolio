import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type MotionRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function MotionReveal({ children, className }: MotionRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
