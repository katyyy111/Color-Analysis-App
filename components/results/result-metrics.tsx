import { ScoreVector} from '@/types/quiz'

const axes: {
    key: keyof ScoreVector
    label: string
    low: string
    high: string
    }[] = [
    { key: 'temperature', label: 'Temperature', low: 'Cool', high: 'Warm' },
    { key: 'value', label: 'Value / Brightness', low: 'Deep', high: 'Light' },
    { key: 'chroma', label: 'Chroma / Saturation', low: 'Soft', high: 'Bright' },
]

const SCALE = 18

export function VectorScoreChart({ scores }: { scores: ScoreVector }) {
  return (
    <ul className="flex flex-col gap-6">
      {axes.map((axis) => {
        const raw = scores[axis.key]
        const clamped = Math.max(-SCALE, Math.min(SCALE, raw))
        const magnitude = (Math.abs(clamped) / SCALE) * 50 // percent from center
        const positive = clamped >= 0
        return (
          <li key={axis.key}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {axis.label}
              </span>
              <span className="font-mono text-sm font-medium text-foreground">
                {raw > 0 ? '+' : ''}
                {raw.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 text-right text-xs text-muted-foreground">
                {axis.low}
              </span>
              <div className="relative h-2.5 flex-1 rounded-full bg-secondary">
                {/* center line */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-border"
                />
                <span
                  className="absolute top-0 h-full rounded-full bg-primary transition-all duration-700 ease-out"
                  style={{
                    left: positive ? '50%' : `${50 - magnitude}%`,
                    width: `${magnitude}%`,
                  }}
                />
              </div>
              <span className="w-10 text-xs text-muted-foreground">
                {axis.high}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function SeasonalRankingChart({ rankings }: { rankings: string[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {rankings.map((season, index) => {
        const isTop = index === 0
        return (
          <li
            key={season}
            className={
              isTop
                ? 'flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3.5'
                : 'flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-4 py-3.5'
            }
          >
            <span
              className={
                isTop
                  ? 'flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground'
                  : 'flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-sm font-semibold text-secondary-foreground'
              }
            >
              {index + 1}
            </span>
            <span className="flex-1 font-serif text-base font-semibold text-foreground">
              {season}
            </span>
            {isTop && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
                Best match
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
