import { ColorSample, ColorSampleDataSet } from "./color-sampling"

export interface ScoreVector {
  temperature: number
  value: number
  chroma: number
}

export interface OptionValue {
    scores: ScoreVector,
    primaryAttribute: string,
    seasonAffinities: string[],
    explanation: string
}

export interface AnswerOption {
  id: string,
  value: OptionValue
  label: string
  description?: string
  swatch?: string
}

export interface Question {
  stepTitle: string
  question: string
  description?: string
  options?: AnswerOption[]
}

export interface PhotoQuestion extends Question {
  colorSamples: ColorSample[];
}

export interface SeasonalRanking {
  season: string
  count: number
}

export interface QuizSession {
    frontFacingPhoto: string | null
    samples: Record<number, ColorSampleDataSet[]>
    answers: Record<number, string>
}

export interface AnalysisInput {
  quizAnswers: Record<number, string>
  calculatedVector: ScoreVector
  seasonalRankings: SeasonalRanking[]
  colorSamples: Record<number, ColorSampleDataSet[]>
  frontFacingImageBase64: string
}

export interface ColorResult {
  season: string
  confidenceScore: string
  primaryAttribute: string
  secondaryAttribute: string
  vectorScores: ScoreVector
  topSeasons: string[]
  explanation: string
  suggestions: Record<'clothes' | 'hair' | 'makeup', string>
}