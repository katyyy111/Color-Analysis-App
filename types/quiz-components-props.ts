import { ReactNode } from 'react'
import { AnswerOption, Question } from './quiz'

export type AnswerCardProps = {
  option: AnswerOption
  selected: boolean
  onSelect: (value: AnswerOption) => void
}

export type QuizStepTemplateProps = {
  question: Question
  currentStep: number
  totalSteps: number
  onNext: () => void
  canProceed: boolean
  isLastStep?: boolean
  children?: ReactNode
}

export type PhotoQuizStepProps = {
  props: QuizStepTemplateProps
  photo: string | null
  onPhotoChange: (photo: string | null) => void
}

export type QuizStepProps = {
  props: QuizStepTemplateProps
  selected: string | null
  onSelect: (value: AnswerOption) => void
}

export type PhotoCaptureProps = {
  initialPhoto: string | null
  onChange: (dataUrl: string | null) => void
}