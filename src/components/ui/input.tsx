import * as React from 'react'

import { cn } from '../../lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:shadow-[0_0_0_4px_rgba(56,189,248,0.15)] dark:border-white/10 dark:bg-white/5 dark:text-white',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
