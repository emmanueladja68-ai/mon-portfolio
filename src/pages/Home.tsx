import { useScroll, useTransform, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Terminal } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { TypingText } from '../components/TypingText'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Home() {
  const { t, i18n } = useTranslation()
  const hero = t('home.hero', { returnObjects: true }) as any
  const services = t('home.services', { returnObjects: true }) as any
  const trust = t('home.trust', { returnObjects: true }) as any
  const heroRef = useRef<HTMLDivElement | null>(null)
  
  const currentLang = i18n.language.startsWith('fr') ? 'fr' : 'en'
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div className="flex flex-col gap-24 md:gap-32 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8 relative z-10">
            <MotionReveal>
              <Badge variant="outline" className="px-4 py-1 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
                {hero.eyebrow}
              </Badge>
            </MotionReveal>
            
            <MotionReveal delay={0.1} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                {hero.name}
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                {hero.title}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {hero.subtitle}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <div className="h-8">
                <TypingText phrases={hero.typingPhrases} />
              </div>
            </MotionReveal>

            <MotionReveal delay={0.4} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                <Link to={`/${currentLang}${hero.primaryCta.href}`}>{hero.primaryCta.label}</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base" asChild>
                <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
              </Button>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {hero.availability}
              </div>
            </MotionReveal>
          </div>

          {/* Hero Visual */}
          <motion.div style={{ y: y1 }} className="relative hidden lg:block">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50 dark:opacity-20" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] opacity-50 dark:opacity-20" />
            
            <div className="relative aspect-square rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              <img
                src="/portrait.jpg"
                alt="Portrait Emmanuel ADJA AMANGOUA"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-12">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.items.map((item: any, index: number) => (
            <MotionReveal key={index} delay={index * 0.1}>
              <Card className="h-full p-8 flex flex-col justify-between hover:shadow-lg transition-shadow border-border/50 bg-card/50">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Terminal size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Trust/Outcomes Section */}
      <section className="space-y-12 pb-20">
         <SectionHeader
          eyebrow={trust.eyebrow}
          title={trust.title}
          description={trust.description}
        />
        
        <div className="grid md:grid-cols-2 gap-4">
          {trust.items.map((item: any, index: number) => (
            <MotionReveal key={index} delay={index * 0.05}>
              <Card className="p-6 flex items-center justify-between group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
