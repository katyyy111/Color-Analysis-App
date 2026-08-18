'use client'

import { QuizStepTemplate } from '@/components/quiz/quiz-step-template'
import { PhotoCapture } from '@/components/quiz/photo-capture'
import { PhotoQuizStepProps } from '@/types/quiz-components-props'

/** A quiz step that collects a photo via upload or the camera. */
export function PhotoQuizStep({
  question,
  currentStep,
  totalSteps,
  onNext,
  canProceed,
  isLastStep,
  photo,
  onPhotoChange,
}: PhotoQuizStepProps) {
  return (
    <QuizStepTemplate
      question={question}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      canProceed={canProceed}
      isLastStep={isLastStep}
    >
      <PhotoCapture initialPhoto={photo} onChange={onPhotoChange} />
    </QuizStepTemplate>
  )
}
