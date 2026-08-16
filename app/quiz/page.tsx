'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { QuizStep } from '@/components/quiz/quiz-step'
import { questions } from '@/lib/quiz-data'
import { AnswerOption } from '@/types/quiz'

export default function QuizPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const question = questions[current]
  const isLastStep = current === questions.length - 1

  function handleSelect(ans: AnswerOption) {
    setAnswers((prev) => ({ ...prev, [current]: ans.id }))
    console.log('Selected answer:', ans)
  }

  function handleNext() {
    if (!answers[current]) return
    if (!isLastStep) {
      setCurrent((prev) => prev + 1)
      return
    }
    console.log('Final quiz answers:', answers)
    sessionStorage.setItem('quiz-selection', JSON.stringify(answers))
    router.push('/results')
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
        <QuizStep
          question={question}
          currentStep={current + 1}
          totalSteps={questions.length}
          selected={answers[current] ?? null}
          onSelect={handleSelect}
          onNext={handleNext}
          isLastStep={isLastStep}
        />
      </div>
    </main>
  )
}
