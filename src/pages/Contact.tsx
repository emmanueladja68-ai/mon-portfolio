import { Mail, Linkedin, Github, Twitter, MapPin, Calendar, ArrowRight, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { MotionReveal } from '../components/MotionReveal'
import { SectionHeader } from '../components/SectionHeader'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

export default function Contact() {
  const { t } = useTranslation()
  const contact = t('contact', { returnObjects: true }) as any

  return (
    <div className="space-y-16 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Info */}
        <div className="space-y-10">
          <SectionHeader
            title={contact.title}
            description={contact.subtitle}
          />

          <MotionReveal delay={0.2} className="space-y-6">
            <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <a href={`mailto:${contact.info.email}`} className="text-lg font-medium">
                {contact.info.email}
              </a>
            </div>

            {contact?.info?.phone ? (
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone size={20} />
                </div>
                <a href={`tel:${contact.info.phone}`} className="text-lg">
                  {contact.info.phone}
                </a>
              </div>
            ) : null}

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <span className="text-lg">{contact.info.location}</span>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-emerald-500">
                <Calendar size={20} />
              </div>
              <span className="text-lg text-emerald-500 font-medium">{contact.info.availability}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="pt-8 border-t border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Socials</h3>
              <div className="flex gap-4">
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={contact?.info?.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={contact?.info?.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                  </Button>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Right Column: Form */}
        <MotionReveal delay={0.4}>
          <Card className="p-8 border-border/60 bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/5">
            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="name">
                  {contact.form.nameLabel}
                </label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="bg-background/50 border-border focus:ring-primary/20" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  {contact.form.emailLabel}
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-background/50 border-border focus:ring-primary/20" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="message">
                  {contact.form.messageLabel}
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Bonjour, je voudrais discuter de..." 
                  className="min-h-[150px] bg-background/50 border-border focus:ring-primary/20 resize-none" 
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full text-base gap-2">
                {contact.form.submitLabel}
                <ArrowRight size={18} />
              </Button>
            </form>
          </Card>
        </MotionReveal>
      </div>
    </div>
  )
}
