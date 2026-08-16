'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnswerCardProps } from '@/types/quiz'

export function AnswerCard({ option, selected, onSelect }: AnswerCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option)}
      className={cn(
        'group relative flex w-full items-center gap-4 rounded-2xl border bg-card/70 p-4 text-left backdrop-blur transition-all duration-300 outline-none',
        'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10',
        'focus-visible:ring-3 focus-visible:ring-ring/50',
        selected
          ? 'border-primary bg-primary/5 shadow-md shadow-primary/15'
          : 'border-border hover:border-primary/40',
      )}
    >
      {option.swatch ? (
        <span
          aria-hidden="true"
          className="size-12 shrink-0 rounded-full shadow-sm ring-1 ring-border"
          style={{ backgroundColor: option.swatch }}
        />
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="block font-serif text-lg font-semibold text-foreground">
          {option.label}
        </span>
        {option.description ? (
          <span className="mt-0.5 block text-pretty text-sm leading-relaxed text-muted-foreground">
            {option.description}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
          selected
            ? 'border-primary bg-primary text-primary-foreground scale-100'
            : 'border-border bg-background text-transparent scale-90 group-hover:border-primary/40',
        )}
      >
        <Check className="size-4" />
      </span>
    </button>
  )
}
