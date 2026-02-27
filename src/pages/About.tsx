import { useTranslation } from 'react-i18next'
import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function About() {
  const { t } = useTranslation()
  const about = t('about', { returnObjects: true }) as any

  return (
    <div className="space-y-16 pb-20">
      <SectionHeader
        eyebrow={about.eyebrow}
        title={about.headline}
        description={about.bio}
      />
      
      <MotionReveal>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">{about.valuesTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {about.values?.map?.((value: any) => (
                <div key={value.title} className="space-y-2">
                  <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground pl-3.5 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {about.vision}
              </p>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground italic">
                  "{about.headline}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionReveal>

      <MotionReveal>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">{about.educationTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {about.education?.map?.((edu: any) => (
                <div key={`${edu.title}-${edu.year}`} className="space-y-1.5">
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  <h4 className="text-base font-semibold">{edu.title}</h4>
                  {edu.organization ? (
                    <p className="text-sm text-muted-foreground">{edu.organization}</p>
                  ) : null}
                  {edu.details ? (
                    <p className="text-xs text-muted-foreground">{edu.details}</p>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">{about.languagesTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {about.languages?.map?.((lang: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{lang}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">{about.interestsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="flex flex-wrap gap-2">
                {about.interests?.map?.((interest: string) => (
                  <li key={interest} className="px-3 py-1 rounded-full bg-muted/70 text-sm">
                    {interest}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </MotionReveal>
    </div>
  )
}
