import { useTranslation } from 'react-i18next'
import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Skills() {
  const { t } = useTranslation()
  const skills = t('skills', { returnObjects: true }) as any

  return (
    <div className="space-y-16 pb-20">
      <SectionHeader
        eyebrow={skills.eyebrow}
        title={skills.headline}
        description={skills.description}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        {skills.categories?.map?.((category: any, index: number) => (
          <MotionReveal key={category.name} delay={index * 0.1}>
            <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.items?.map?.((skill: string) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </MotionReveal>
        ))}
      </div>
    </div>
  )
}
