import { useMemo, useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Code2, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
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
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; items: string[]; index: number; title: string }>({
    isOpen: false,
    items: [],
    index: 0,
    title: ''
  })

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox.isOpen])

  const openLightbox = (items: string[], index: number, title: string) => {
    setLightbox({ isOpen: true, items, index, title })
  }

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }))
  }

  const nextLightbox = () => {
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.items.length }))
  }

  const prevLightbox = () => {
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }))
  }

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
              <MediaCarousel 
                items={project.gallery} 
                title={project.name} 
                onExpand={(idx) => openLightbox(project.gallery, idx, project.name)} 
              />
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

      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-8"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground z-[110] transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center group">
              {lightbox.items.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                    className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground z-[110] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                    className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground z-[110] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black/20">
                  {/\.mp4(\?|$)/i.test(lightbox.items[lightbox.index]) ? (
                    <video
                      key={lightbox.items[lightbox.index]}
                      src={lightbox.items[lightbox.index]}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                    />
                  ) : (
                    <img
                      key={lightbox.items[lightbox.index]}
                      src={lightbox.items[lightbox.index]}
                      alt={lightbox.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <h4 className="text-lg font-semibold text-foreground">{lightbox.title}</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                    {lightbox.index + 1} / {lightbox.items.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MediaCarousel({ items, title, onExpand }: { items: string[]; title: string; onExpand: (index: number) => void }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const total = items.length
  const current = items[index]
  const isVideo = /\.mp4(\?|$)/i.test(current)
  const counterText = isVideo
    ? t('projects.counter.video', { current: index + 1, total })
    : t('projects.counter.photo', { current: index + 1, total })
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i - 1 + total) % total); }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i + 1) % total); }

  return (
    <div 
      className="relative rounded-lg overflow-hidden border border-border/50 bg-muted/20 cursor-zoom-in group/carousel"
      onClick={() => onExpand(index)}
    >
      <div className="absolute inset-0 bg-primary/0 group-hover/carousel:bg-primary/5 transition-colors z-10 flex items-center justify-center">
        <Maximize2 className="text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity drop-shadow-lg" size={32} />
      </div>
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
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur border border-border px-3 py-1 text-sm z-20 hover:bg-background transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur border border-border px-3 py-1 text-sm z-20 hover:bg-background transition-colors"
            aria-label="Next"
          >
            ›
          </button>
          <div className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-background/80 border border-border z-20">
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
