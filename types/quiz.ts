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

export type Question = {
  stepTitle: string
  question: string
  description?: string
  options?: AnswerOption[]
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