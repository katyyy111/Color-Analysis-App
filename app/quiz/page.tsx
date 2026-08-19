'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { QuizQuestionFlow } from '@/components/quiz/quiz-question-flow'
import { QuizPhotoFlow } from '@/components/quiz/quiz-photo-flow'
import { useColorAnalysis } from '@/hooks/useAIColorAnalysis'
import { prepareAnalysisInput } from '@/lib/analysis-input'
import { ColorSampleDataSet } from '@/types/color-sampling'
import { QuizSession } from '@/types/quiz'

export default function QuizPage() {
  const router = useRouter()
  const { analyze, isLoading, error } = useColorAnalysis()
  const [step, setStep] = useState<'photos' | 'questions'>('photos')

  const [session, setSession] = useState<QuizSession>({
    frontFacingPhoto: null,
    samples: {},
    answers: {},
  })

  function updatePhoto(data: string | null) {
    setSession((previous) => ({
      ...previous,
      frontFacingPhoto: data,
    }))
  }

  function updateSamples(questionIndex: number, samples: ColorSampleDataSet[]) {
    setSession((previous) => ({
      ...previous,
      samples: {
        ...previous.samples,
        [questionIndex]: samples,
      },
    }))
  }

  function updateAnswer(questionIndex: number, answerId: string) {
    setSession((previous) => ({
      ...previous,
      answers: {
        ...previous.answers,
        [questionIndex]: answerId,
      },
    }))
  }

  async function handleQuizComplete() {
    try {
      const input = prepareAnalysisInput(session)
      sessionStorage.setItem('quiz-session', JSON.stringify(session))
      await analyze(input)
      router.push('/results')
    } catch (error) {
      console.error('Unable to prepare quiz analysis:', error)
    }
  }

    if (step == 'photos') {
        return (
            <QuizPhotoFlow
                saveSamples={updateSamples}
                setFrontFacingImage={updatePhoto}
                onComplete={() => setStep('questions')}
            />
        )
    }

    if (isLoading) {
      return <p>Analyzing your colors...</p>
    }

    if (error) {
      return <p>{error}</p>
    }

    return (
        <QuizQuestionFlow
            answers={session.answers}
            saveAnswer={updateAnswer}
            onComplete={handleQuizComplete}
        />
    )
}
