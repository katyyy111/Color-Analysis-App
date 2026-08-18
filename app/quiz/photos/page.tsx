'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PhotoQuizStep } from '@/components/quiz/photo-quiz-step'
import { photoQuestions } from '@/lib/photo-data'
import { ColorSampleDataSet } from '@/types/color-sampling'
import { ColorSamplingStep } from '@/components/sampling/color-sampling-step'

export default function QuizPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)

  const [photos, setPhotos] = useState<Record<number, string | null>>({})
  const [collectedSamples, setCollectedSamples] = useState<Record<number, ColorSampleDataSet[]>>({})

  const [readyToCollectColors, setReadyToCollectColors] = useState(false)

  const question = photoQuestions[current]
  const isLastStep = current === photoQuestions.length - 1

  function handlePhotoChange(photo: string | null) {
    setPhotos((prev) => ({ ...prev, [current]: photo }))
  }

  function handlePhotoSelectComplete() {
    if (!photos[current]) return
    setReadyToCollectColors(true)
  }

  function handlePickedColors(samples: ColorSampleDataSet[]) {
    setCollectedSamples((prev) => ({ ...prev, [current]: samples }))
    if (!isLastStep) {
      setReadyToCollectColors(false);
      setCurrent((prev) => prev + 1)
      return
    }
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
        { readyToCollectColors ? (
          <ColorSamplingStep
            imageUrl={photos[current] ?? ''}
            initialSamples={question.colorSamples}
            onNext={handlePickedColors}
            />
          ) : (
          <PhotoQuizStep
            question={question}
            currentStep={current + 1}
            totalSteps={photoQuestions.length}
            onNext={handlePhotoSelectComplete}
            canProceed={!!photos[current]}
            isLastStep={isLastStep}
            photo={photos[current] ?? null}
            onPhotoChange={handlePhotoChange}
          />
        )}
      </div>
    </main>
  )
}
