import { MotionReveal } from './MotionReveal'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center' : 'text-left'

  return (
    <MotionReveal className={`space-y-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm text-muted-foreground md:text-base">{description}</p>
      ) : null}
    </MotionReveal>
  )
}
