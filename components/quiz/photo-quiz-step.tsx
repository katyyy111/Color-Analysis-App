'use client'

import { QuizStepTemplate } from '@/components/quiz/quiz-step-template'
import { PhotoCapture } from '@/components/quiz/photo-capture'
import { PhotoQuizStepProps } from '@/types/quiz-components-props'

/** A quiz step that collects a photo via upload or the camera. */
export function PhotoQuizStep({
  props,
  photo,
  onPhotoChange,
}: PhotoQuizStepProps) {
  const canProceed = photo != null
  const stepProps = { ...props, canProceed }

  return (
    <QuizStepTemplate {...stepProps}>
      <PhotoCapture initialPhoto={photo} onChange={onPhotoChange} />
    </QuizStepTemplate>
  )
}
