import { Briefcase, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function Experience() {
  const { t } = useTranslation()
  const experience = t('experience', { returnObjects: true }) as any

  return (
    <div className="space-y-16 pb-20">
      <SectionHeader
        eyebrow={experience.eyebrow}
        title={experience.headline}
        description={experience.description}
      />

      <div className="relative border-l border-border/50 ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
        {experience.items?.map?.((item: any, index: number) => (
          <MotionReveal key={`${item.company}-${item.title}`} delay={index * 0.1} className="relative">
            <span className="absolute -left-[41px] md:-left-[57px] top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border ring-4 ring-background">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </span>
            
            <Card className="border-border/60 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card/80">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{item.company}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit flex items-center gap-1.5 font-normal">
                    <Calendar className="h-3 w-3" />
                    {item.year}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.summary ? <p className="text-muted-foreground">{item.summary}</p> : null}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">{experience.keyImpact}</h4>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {item.highlights?.map?.((highlight: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </MotionReveal>
        ))}
      </div>

      {(() => {
        const about = t('about', { returnObjects: true }) as any
        const eduItems = about.education as any[] | undefined
        if (!Array.isArray(eduItems) || eduItems.length === 0) return null
        return (
          <div className="space-y-10 mt-8">
            <SectionHeader
              eyebrow={experience.eyebrow}
              title={about.educationTitle}
              description={undefined}
            />
            <div className="relative border-l border-border/50 ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
              {eduItems.map((item: any, index: number) => (
                <MotionReveal key={`${item.title}-${item.year}`} delay={index * 0.1} className="relative">
                  <span className="absolute -left-[41px] md:-left-[57px] top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border ring-4 ring-background">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  
                  <Card className="border-border/60 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card/80">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-xl text-foreground flex items-center gap-2">
                            {item.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{item.organization || item.company || ''}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="w-fit flex items-center gap-1.5 font-normal">
                          <Calendar className="h-3 w-3" />
                          {item.year}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {item.location ? <p className="text-muted-foreground">{item.location}</p> : null}
                      {item.details ? <p className="text-sm text-muted-foreground">{item.details}</p> : null}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">{experience.keyImpact}</h4>
                        <ul className="grid gap-2 text-sm text-muted-foreground">
                          {item.highlights?.map?.((highlight: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </MotionReveal>
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
