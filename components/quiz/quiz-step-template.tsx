'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuizStepTemplateProps } from '@/types/quiz'

/**
 * Shared layout for every quiz step: progress bar, step title, question
 * header, the step body, and the primary "continue" button. Both QuizStep
 * (answer cards) and PhotoQuizStep (photo capture) build on top of this.
 */
export function QuizStepTemplate({
  question,
  currentStep,
  totalSteps,
  onNext,
  canProceed,
  isLastStep = false,
  children,
}: QuizStepTemplateProps) {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      {/* progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span>{question.stepTitle}</span>
          <span>
            {currentStep} / {totalSteps}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* question */}
      <h2 className="text-balance font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {question.question}
      </h2>
      {question.description ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
          {question.description}
        </p>
      ) : null}

      {/* step body */}
      <div className="mt-8">{children}</div>

      {/* next button */}
      <Button
        size="lg"
        disabled={!canProceed}
        onClick={onNext}
        className="group mt-10 h-14 rounded-full px-8 text-base shadow-lg shadow-primary/20 transition-all duration-300 disabled:shadow-none"
      >
        {isLastStep ? 'Proceed' : 'Save & continue'}
        <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  )
}
