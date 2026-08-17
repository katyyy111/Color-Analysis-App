import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SeasonCircles } from '@/components/season-circles'

export default function Page() {
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

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
        <span className="mb-6 inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
          Personal Color Analysis
        </span>

        <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Discover the colors that make you glow
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Take this short quiz to reveal your unique
          palette and learn which shades bring out your natural radiance.
        </p>

        <section className="mt-14 w-full" aria-label="Color seasons">
          <SeasonCircles />
        </section>

        <Button
          asChild
          size="lg"
          className="group mt-14 h-14 rounded-full px-8 text-base shadow-lg shadow-primary/20"
        >
          <Link href="/quiz/photos" className="inline-flex items-center">
            <span>Get started with the quiz</span>
            <ArrowRight className="ml-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </main>
  )
}
