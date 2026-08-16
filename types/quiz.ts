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
}

export type QuizStepProps = {
  question: Question
  currentStep: number
  totalSteps: number
  selected: string | null
  onSelect: (value: AnswerOption) => void
  onNext: () => void
  isLastStep?: boolean
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