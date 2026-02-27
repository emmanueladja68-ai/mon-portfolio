# Design System

## Objectif
Créer une expérience premium, claire et mesurable, adaptée aux recruteurs et aux équipes produit.

## Tokens de base

### Couleurs
- Background: `rgb(var(--bg))`
- Surface: `rgb(var(--surface))`
- Texte principal: `rgb(var(--text))`
- Texte secondaire: `rgb(var(--muted))`
- Bordures: `rgb(var(--border))`
- Accent: `rgb(var(--accent))`

### Typographie
- Police: Inter / SF Pro Display / system
- Titres: 28–48px, semi-bold
- Corps: 14–16px, regular
- Eyebrow: 10–12px, uppercase, tracking large

### Rythme et espacement
- Grille: 12 colonnes, max-width 6xl
- Espacements: 8, 12, 16, 24, 32, 48, 64
- Radius: 16–32px

## Composants

### Button
États: default, secondary, outline, ghost. Micro-interactions par hover et active scale.

### Card
Surface élevée, bordure douce, hover subtil, compatible light/dark.

### Badge
Label discret pour stack et tags.

### Input / Textarea
Focus ring accent, shadow léger, transitions fluides.

### Switch
Toggle thème, compatibilité motion-reduce.

### MotionReveal
Révélation progressive au scroll, respect reduce motion.

### PageTransition
Transitions douces entre pages avec AnimatePresence.

### LoadingScreen
Chargement élégant avec animations réduites si nécessaire.

## Layout
- Header sticky avec navigation et toggle thème
- Footer avec CTA et rappel de positionnement
- SectionHeader homogène pour la hiérarchie des pages

## Thèmes
Thème clair par défaut, thème sombre via classe `dark` persistée en localStorage.

## Accessibilité
- Respect `prefers-reduced-motion`
- Focus visibles sur tous les champs
- Contrastes optimisés via variables de couleur
