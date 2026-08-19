import Link from 'next/link'
import { RotateCcw, Shirt, Scissors, Brush, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionCard } from '@/components/results/result-section-card'
import {
  SeasonalRankingChart,
  VectorScoreChart
} from '@/components/results/result-metrics'
import { ScoreVector, ColorResult } from '@/types/quiz'

const result: ColorResult = {
  season: 'Soft Summer',
  confidenceScore: '88%',
  primaryAttribute: 'Soft (chroma)',
  secondaryAttribute: 'Cool (temperature)',
  vectorScores: { temperature: -11.5, value: 3.0, chroma: -10.5 },
  topSeasons: ['Soft Summer', 'Cool Summer', 'Light Summer'],
  explanation:
    'Low melanin density and cool/pale undertones lead to quick burning and minimal tanning capability.',
  suggestions: {
    clothes:
      'Reach for dusty, muted tones — slate blue, soft mauve, sage and cool taupe. Keep contrast gentle and avoid stark black or bright saturated shades.',
    hair: 'Ashy, cool-toned colors flatter you most — think cool brunette, soft mushroom blonde or a smoky pastel. Steer clear of warm golden or copper tones.',
    makeup:
      'Rosy, muted blushes and soft berry or mauve lips harmonize with your cool undertone. Choose matte, blended finishes over high-shimmer or orange-based shades.',
  },
}

const suggestionItems = [
  { key: 'clothes', label: 'Clothing', icon: Shirt },
  { key: 'hair', label: 'Hair', icon: Scissors },
  { key: 'makeup', label: 'Makeup', icon: Brush },
] as const

const palette = ['#a7b1c4', '#c6b2c8', '#b3c7c2', '#d8c3ce', '#8b93a6', '#9fb0b3']

export default function ResultsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-lilac/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-sky/40 blur-3xl"
      />

      {/* brand */}
      <header className="relative z-10 px-6 pt-8 sm:px-12">
        <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Hue You Are
          <span className="text-primary">.</span>
        </span>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-12">
        {/* hero */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" />
            Your color season
          </span>
          <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
            {result.season}
          </h1>

          {/* palette */}
          <ul className="mt-8 flex items-center gap-2 sm:gap-3">
            {palette.map((color) => (
              <li
                key={color}
                className="size-11 rounded-full shadow-sm ring-1 ring-border sm:size-14"
                style={{ backgroundColor: color }}
                aria-label={`Palette color ${color}`}
              />
            ))}
          </ul>

          {/* key attributes */}
          <dl className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Confidence
              </dt>
              <dd className="mt-2 font-serif text-3xl font-semibold text-primary">
                {result.confidenceScore}
              </dd>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Primary
              </dt>
              <dd className="mt-2 font-serif text-lg font-semibold text-foreground">
                {result.primaryAttribute}
              </dd>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Secondary
              </dt>
              <dd className="mt-2 font-serif text-lg font-semibold text-foreground">
                {result.secondaryAttribute}
              </dd>
            </div>
          </dl>
        </div>

        {/* detail sections */}
        <div className="mt-10 flex flex-col gap-4">
          <SectionCard title="Color dimensions">
            <VectorScoreChart scores={result.vectorScores} />
          </SectionCard>

          <SectionCard title="Closest season matches">
            <SeasonalRankingChart rankings={result.topSeasons} />
          </SectionCard>

          <SectionCard title="Why this season">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              {result.explanation}
            </p>
          </SectionCard>

          <SectionCard title="Styling suggestions">
            <ul className="flex flex-col gap-4">
              {suggestionItems.map(({ key, label, icon: Icon }) => (
                <li
                  key={key}
                  className="flex gap-4 rounded-2xl border border-border bg-card/60 p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-foreground">
                      {label}
                    </h3>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {result.suggestions[key]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* actions */}
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="group h-14 rounded-full border-primary/30 bg-card/60 px-8 text-base backdrop-blur hover:border-primary/60 hover:bg-primary/5"
            nativeButton={false}
            render={<Link href="/quiz" />}
          >
            <RotateCcw className="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-180" />
            Retake the quiz
          </Button>
        </div>
      </div>
    </main>
  )
}
