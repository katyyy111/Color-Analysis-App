export type ScoreVector = {
  temperature: number
  value: number
  chroma: number
}

export type OptionValue = {
    id: string,
    scores: ScoreVector,
    primaryAttribute: string,
    seasonAffinities: string[],
    explanation: string
}

export type AnswerOption = {
  value: OptionValue
  label: string
  description?: string
  swatch?: string
}

export type AnswerCardProps = {
  option: AnswerOption
  selected: boolean
  onSelect: (value: string) => void
}

export type Question = {
  stepTitle: string
  question: string
  options: AnswerOption[]
}

export type QuizStepProps = {
  stepTitle: string
  question: string
  options: AnswerOption[]
  currentStep: number
  totalSteps: number
  selected: string | null
  onSelect: (value: string) => void
  onNext: () => void
  isLastStep?: boolean
}
