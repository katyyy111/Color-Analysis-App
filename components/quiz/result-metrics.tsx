import {SeasonalRanking, ScoreVector} from '@/types/quiz'

const axes: {
    key: keyof ScoreVector
    label: string
    low: string
    high: string
    }[] = [
    { key: 'temperature', label: 'Temperature', low: 'Cool', high: 'Warm' },
    { key: 'value', label: 'Value', low: 'Deep', high: 'Light' },
    { key: 'chroma', label: 'Chroma', low: 'Soft', high: 'Bright' },
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

export function SeasonalRankingChart({
  rankings,
}: {
  rankings: SeasonalRanking[]
}) {
  const max = Math.max(...rankings.map((r) => r.count), 1)
  return (
    <ul className="flex flex-col gap-4">
      {rankings.map((ranking, index) => {
        const width = (ranking.count / max) * 100
        const isTop = index === 0
        return (
          <li key={ranking.season} className="flex items-center gap-4">
            <span className="w-28 shrink-0 truncate font-serif text-sm font-semibold text-foreground">
              {ranking.season}
            </span>
            <div className="h-8 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className={
                  isTop
                    ? 'flex h-full items-center justify-end rounded-full bg-primary px-3 transition-all duration-700 ease-out'
                    : 'flex h-full items-center justify-end rounded-full bg-accent px-3 transition-all duration-700 ease-out'
                }
                style={{ width: `${width}%` }}
              >
                <span
                  className={
                    isTop
                      ? 'font-mono text-xs font-semibold text-primary-foreground'
                      : 'font-mono text-xs font-semibold text-accent-foreground'
                  }
                >
                  {ranking.count}
                </span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
