import { motion, useReducedMotion } from 'framer-motion'

type LoadingScreenProps = {
  label: string
}

export function LoadingScreen({ label }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="relative flex flex-col items-center gap-5">
        <motion.div
          className="h-16 w-16 rounded-[28px] bg-gradient-to-br from-slate-200 via-slate-100 to-white shadow-[0_18px_30px_-20px_rgba(15,23,42,0.45)] dark:from-slate-800 dark:via-slate-900 dark:to-slate-950"
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { scale: [1, 1.08, 1], rotate: [0, 6, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }
          }
        />
        <motion.div
          className="text-xs uppercase tracking-[0.35em] text-[rgb(var(--muted))]"
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.4, ease: 'easeInOut', repeat: Infinity }
          }
        >
          {label}
        </motion.div>
      </div>
    </div>
  )
}
