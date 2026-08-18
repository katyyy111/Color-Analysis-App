import { ReactNode } from 'react'
import { AnswerOption, Question } from './quiz'

export interface AnswerCardProps {
  option: AnswerOption
  selected: boolean
  onSelect: (value: AnswerOption) => void
}

export interface QuizStepTemplateProps {
  question: Question
  currentStep: number
  totalSteps: number
  onNext: () => void
  canProceed: boolean
  isLastStep?: boolean
  children?: ReactNode
}

export interface PhotoQuizStepProps extends QuizStepTemplateProps {
  photo: string | null
  onPhotoChange: (photo: string | null) => void
}

export interface QuizStepProps extends QuizStepTemplateProps {
  selected: string | null
  onSelect: (value: AnswerOption) => void
}

export interface PhotoCaptureProps {
  initialPhoto: string | null
  onChange: (dataUrl: string | null) => void
}