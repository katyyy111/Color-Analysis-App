'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnswerCard } from '@/components/quiz/answer-card'
import { QuizStepProps } from '@/types/quiz'

export function QuizStep({
  stepTitle,
  question,
  options,
  currentStep,
  totalSteps,
  selected,
  onSelect,
  onNext,
  isLastStep = false,
}: QuizStepProps) {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      {/* progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span>{stepTitle}</span>
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
        {question}
      </h2>

      {/* answers */}
      <div
        role="radiogroup"
        aria-label={question}
        className="mt-8 flex flex-col gap-3"
      >
        {options.map((option) => (
          <AnswerCard
            key={option.value.id}
            option={option}
            selected={selected === option.value.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* next button */}
      <Button
        size="lg"
        disabled={!selected}
        onClick={onNext}
        className="group mt-10 h-14 rounded-full px-8 text-base shadow-lg shadow-primary/20 transition-all duration-300 disabled:shadow-none"
      >
        {isLastStep ? 'See my results' : 'Save & continue'}
        <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  )
}
