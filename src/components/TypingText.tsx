import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type TypingTextProps = {
  phrases: string[]
  typingSpeedMs?: number
  pauseMs?: number
}

export function TypingText({
  phrases,
  typingSpeedMs = 70,
  pauseMs = 1300,
}: TypingTextProps) {
  const safePhrases = useMemo(() => phrases.filter(Boolean), [phrases])
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (safePhrases.length === 0 || reduceMotion) {
      return
    }
    const current = safePhrases[index % safePhrases.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, display.length + 1)
        setDisplay(next)
        if (next === current) {
          setIsDeleting(true)
        }
      } else {
        const next = current.slice(0, Math.max(0, display.length - 1))
        setDisplay(next)
        if (next.length === 0) {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % safePhrases.length)
        }
      }
    }, isDeleting ? typingSpeedMs / 2 : typingSpeedMs)

    if (!isDeleting && display === current) {
      clearTimeout(timeout)
      const pause = setTimeout(() => {
        setIsDeleting(true)
      }, pauseMs)
      return () => clearTimeout(pause)
    }

    return () => clearTimeout(timeout)
  }, [display, index, isDeleting, pauseMs, reduceMotion, safePhrases, typingSpeedMs])

  if (safePhrases.length === 0) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-2 text-base text-[rgb(var(--muted))]">
      <span className="h-5 w-1 animate-pulse rounded-full bg-accent" />
      <span>{reduceMotion ? safePhrases[0] : display}</span>
    </span>
  )
}
