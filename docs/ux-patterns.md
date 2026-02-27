# Patterns UX

## Transitions de page
Transitions basées sur `PageTransition` pour réduire la sensation de rupture entre sections.

## Révélation au scroll
`MotionReveal` applique un léger offset vertical et une montée en opacité. Les vues sont déclenchées une seule fois.

## Micro-interactions
- Boutons: hover lift et active press léger
- Filtres: feedback immédiat au clic
- Formulaires: scale subtile sur focus-within

## Parallaxe
Orbes de fond animées dans la hero pour créer de la profondeur sans perturber la lecture.

## Chargement élégant
Loader animé, forme simple, loop douce, respect du reduced motion.

## Mode sombre
Transition fluide entre light/dark via variables CSS, persistance localStorage et synchronisation `prefers-color-scheme`.

## Responsive
Grilles adaptatives, navigation mobile compacte, densité optimisée.

## Performance perçue
Lazy loading des pages, transitions légères, animations déclenchées au scroll pour limiter le coût initial.
