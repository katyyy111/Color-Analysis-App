'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PhotoQuizStep } from '@/components/quiz/photo-quiz-step'
import { photoQuestions } from '@/lib/photo-data'

export default function QuizPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [photos, setPhotos] = useState<Record<number, string | null>>({})

  const question = photoQuestions[current]
  const isLastStep = current === photoQuestions.length - 1

  function handleSelect(photo: string | null) {
    setPhotos((prev) => ({ ...prev, [current]: photo }))
    console.log('Selected photo:', photo)
  }

  function handleNext() {
    if (!photos[current]) return
    if (!isLastStep) {
      setCurrent((prev) => prev + 1)
      return
    }
    console.log('Final quiz answers:', photos)
    router.push('/quiz/questions')
  }

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
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-3xl flex-col justify-center px-6 py-12">
        <PhotoQuizStep
          question={question}
          currentStep={current + 1}
          totalSteps={photoQuestions.length}
          onNext={handleNext}
          canProceed={!!photos[current]}
          isLastStep={isLastStep}
          photo={photos[current] ?? null}
          onPhotoChange={handleSelect}
        />
      </div>
    </main>
  )
}
