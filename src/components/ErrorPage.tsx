import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as any
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">Oups, une erreur est survenue</h1>
        <p className="text-muted-foreground">
          Merci de recharger la page ou de revenir à l’accueil.
        </p>
        {error?.message ? (
          <pre className="p-3 rounded border border-border bg-muted/50 text-left text-xs overflow-auto">
            {String(error.message)}
          </pre>
        ) : null}
        <a href="/" className="inline-block px-4 py-2 rounded border border-border hover:bg-muted">
          Retour à l’accueil
        </a>
      </div>
    </div>
  )
}
