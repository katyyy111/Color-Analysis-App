import { ReactNode } from "react"

export type ScoreVector = {
  temperature: number
  value: number
  chroma: number
}

export type OptionValue = {
    scores: ScoreVector,
    primaryAttribute: string,
    seasonAffinities: string[],
    explanation: string
}

export type AnswerOption = {
  id: string,
  value: OptionValue
  label: string
  description?: string
  swatch?: string
}

export type AnswerCardProps = {
  option: AnswerOption
  selected: boolean
  onSelect: (value: AnswerOption) => void
}

export type Question = {
  stepTitle: string
  question: string
  description?: string
  options?: AnswerOption[]
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

export type SeasonalRanking = {
  season: string
  count: number
}

export type ColorResult = {
  season: string
  confidenceScore: string
  primaryAttribute: string
  secondaryAttribute: string
  vectorScores: ScoreVector
  seasonalRankings: SeasonalRanking[]
  diagnosticExplanations: string[]
}