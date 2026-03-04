import { useTranslation } from 'react-i18next'
import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function Professional() {
  const { t } = useTranslation()
  const data = t('professional', { returnObjects: true }) as any

  return (
    <div className="space-y-16 pb-20">
      <SectionHeader eyebrow={data.eyebrow} title={data.title} description={data.subtitle} />

      <nav className="flex flex-wrap gap-2 border-b border-border pb-4">
        {data.anchors?.map?.((a: any) => (
          <a key={a.href} href={a.href} className="px-3 py-1 rounded-full border border-border text-sm hover:bg-muted transition-colors">
            {a.label}
          </a>
        ))}
      </nav>

      <section id="intro" className="space-y-6 scroll-mt-28">
        <MotionReveal>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">{data.intro.badge}</Badge>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <p className="text-muted-foreground leading-relaxed">{data.intro.text}</p>
        </MotionReveal>
      </section>

      <section id="pillars" className="space-y-6 scroll-mt-28">
        <SectionHeader eyebrow={data.pillars.eyebrow} title={data.pillars.title} description={data.pillars.description} />
        <div className="grid gap-6 md:grid-cols-3">
          {data.pillars.items?.map?.((item: any, i: number) => (
            <MotionReveal key={item.title} delay={i * 0.1}>
              <Card className="p-6 h-full border-border/60 bg-card/50">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section id="path-skills" className="space-y-6 scroll-mt-28">
        <SectionHeader eyebrow={data.path.eyebrow} title={data.path.title} description={undefined} />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 border-border/60 bg-card/50">
            <h4 className="font-semibold mb-3">{data.path.timelineTitle}</h4>
            <ul className="space-y-2 text-muted-foreground">
              {data.path.timeline?.map?.((li: string, i: number) => (
                <li key={i} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />{li}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 border-border/60 bg-card/50">
            <h4 className="font-semibold mb-3">{data.path.skillsTitle}</h4>
            <ul className="flex flex-wrap gap-2">
              {data.path.skills?.map?.((s: string) => (
                <Badge key={s} variant="secondary" className="px-3 py-1">{s}</Badge>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section id="pitch" className="space-y-6 scroll-mt-28">
        <SectionHeader eyebrow={data.pitch.eyebrow} title={data.pitch.title} description={undefined} />
        <blockquote className="border-l-4 border-primary/60 bg-muted/30 p-6 rounded-r-xl text-lg leading-relaxed">
          {data.pitch.text}
        </blockquote>
      </section>

      <section id="vision" className="space-y-4 scroll-mt-28">
        <div className="p-6 rounded-xl border border-border/60 bg-card/50">
          <p className="text-center font-medium">{data.vision.note}</p>
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <a href="#intro">{data.backToTop}</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
