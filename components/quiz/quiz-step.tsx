'use client'

import { QuizStepTemplate } from '@/components/quiz/quiz-step-template'
import { AnswerCard } from '@/components/quiz/answer-card'
import { QuizStepProps } from '@/types/quiz'

/** A standard single-choice question step with selectable answer cards. */
export function QuizStep({
  props,
  selected,
  onSelect
}: QuizStepProps) {
  return (
    <QuizStepTemplate
      {...props}
    >
      <div role="radiogroup" aria-label={props.question.question} className="flex flex-col gap-3">
        {props.question.options?.map((option) => (
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
