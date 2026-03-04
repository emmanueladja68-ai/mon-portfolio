import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export default function Projects() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const { items, allLabel, filterLabel, headline, description, eyebrow } =
    t('projects', { returnObjects: true }) as any
  
  const filters = useMemo(() => {
    if (!items) return []
    const tags = new Set<string>()
    items.forEach((project: any) => (project?.tech || []).forEach((tag: string) => tags.add(tag)))
    return [allLabel, ...Array.from(tags)]
  }, [allLabel, items])
  
  const [activeFilter, setActiveFilter] = useState(allLabel)

  // Reset active filter when language changes if the current filter is "All" (localized)
  // This is a bit tricky, simpler to just reset to new allLabel if previous was old allLabel
  // But for now let's just use the current allLabel as default if state is empty or invalid
  
  const filteredProjects = useMemo(() => {
    if (!items) return []
    if (activeFilter === allLabel) {
      return items
    }
    return items.filter((project: any) => (project?.tech || []).includes(activeFilter))
  }, [activeFilter, allLabel, items])

  return (
    <div className="space-y-16">
      <SectionHeader eyebrow={eyebrow} title={headline} description={description} />
      
      <MotionReveal>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {filterLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <motion.div
                key={filter}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              >
                <Button
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full transition-all"
                >
                  {filter}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionReveal>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project: any, index: number) => (
          <MotionReveal key={project.name} delay={index * 0.1}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Card className="flex h-full flex-col gap-6 p-6 border-border/60 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all bg-card/50 backdrop-blur-sm group">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Code2 size={24} />
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <a href={project?.links?.code || '#'} target="_blank" rel="noopener noreferrer" aria-label="View Code">
                        <Github size={18} />
                      </a>
                    </Button>
                    <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <a href={project?.links?.project || '#'} target="_blank" rel="noopener noreferrer" aria-label="View Project">
                        <ExternalLink size={18} />
                      </a>
                    </Button>
                  </div>
                </div>

            {Array.isArray(project?.gallery) && project.gallery.length > 0 ? (
              <MediaCarousel items={project.gallery} title={project.name} />
            ) : (
              <PlaceholderVisual />
            )}

            <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 mt-auto">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-primary mr-2">✦</span>
                      {project.impact}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project?.stack?.map?.((item: any) => (
                      <Badge key={item} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </MotionReveal>
        ))}
      </div>

      {null}
    </div>
  )
}

function MediaCarousel({ items, title }: { items: string[]; title: string }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const total = items.length
  const current = items[index]
  const isVideo = /\.mp4(\?|$)/i.test(current)
  const counterText = isVideo
    ? t('projects.counter.video', { current: index + 1, total })
    : t('projects.counter.photo', { current: index + 1, total })
  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <div className="relative rounded-lg overflow-hidden border border-border/50 bg-muted/20">
      {isVideo ? (
        <video
          key={current}
          src={current}
          className="w-full aspect-video"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          key={current}
          src={current}
          alt={title}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />
      )}
      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur border border-border px-3 py-1 text-sm"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur border border-border px-3 py-1 text-sm"
            aria-label="Next"
          >
            ›
          </button>
          <div className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-background/80 border border-border">
            {counterText}
          </div>
        </>
      ) : null}
    </div>
  )
}

function PlaceholderVisual() {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden border border-border/50 bg-gradient-to-br from-muted/60 via-background to-muted/40 relative">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 20px, rgba(100,100,120,0.3) 1px, transparent 0)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-5xl font-black tracking-tight">∑</div>
          <div className="text-xs mt-1">Data Flow • Code • ML</div>
        </div>
      </div>
    </div>
  )
}
