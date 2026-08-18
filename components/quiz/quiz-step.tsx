'use client'

import { QuizStepTemplate } from '@/components/quiz/quiz-step-template'
import { AnswerCard } from '@/components/quiz/answer-card'
import { QuizStepProps } from '@/types/quiz-components-props'

/** A standard single-choice question step with selectable answer cards. */
export function QuizStep({
  question,
  currentStep,
  totalSteps,
  onNext,
  canProceed,
  isLastStep,
  selected,
  onSelect
}: QuizStepProps) {
  return (
    <QuizStepTemplate
      question={question}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      isLastStep={isLastStep}
      canProceed={canProceed}
    >
      <div role="radiogroup" aria-label={question.question} className="flex flex-col gap-3">
        {question.options?.map((option) => (
          <AnswerCard
            key={option.id}
            option={option}
            selected={selected === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </QuizStepTemplate>
  )
}
