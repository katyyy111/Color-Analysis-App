'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { QuizQuestionFlow } from '@/components/quiz/quiz-question-flow'
import { ColorSampleDataSet } from '@/types/color-sampling'

export interface QuizSession {
    frontFacingPhoto: string | null
    samples: Record<number, ColorSampleDataSet[]>
    answers: Record<number, string>
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState<'photos' | 'questions'>('questions')

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

  function handleQuizComplete() {
    console.log('Final quiz session:', session)
    sessionStorage.setItem('quiz-session', JSON.stringify(session))
    router.push('/results')
    }

    return (
        <QuizQuestionFlow
            answers={session.answers}
            saveAnswer={updateAnswer}
            onComplete={handleQuizComplete}
        />
    )
}
