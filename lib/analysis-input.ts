import { AnalysisInput, QuizSession } from '@/types/quiz'
import { prepareScores, parseQuizSelections } from '@/lib/result-calculations'

export function prepareAnalysisInput(session: QuizSession): AnalysisInput {
  if (!session.frontFacingPhoto) {
    throw new Error('A front-facing photo is required before analysis.')
  }

  const selectedValues = parseQuizSelections(session.answers)
  const calculatedResult = prepareScores(selectedValues)

  return {
    quizAnswers: session.answers,
    calculatedVector: calculatedResult.vectorScores,
    seasonalRankings: calculatedResult.seasonalRankings,
    colorSamples: session.samples,
    frontFacingImageBase64: session.frontFacingPhoto,
  }
}