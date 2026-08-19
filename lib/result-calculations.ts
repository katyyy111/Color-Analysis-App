import { OptionValue, SeasonalRanking } from '@/types/quiz'
import { questions } from './quiz-data';

/**
 * 12-Season Matrix Mapping
 * Maps [Dominant Trait] + [Secondary Trait Direction] to specific seasonal subtypes.
 */
type TraitKey = 'Light' | 'Deep' | 'Warm' | 'Cool' | 'Bright' | 'Soft';

const SEASON_MATRIX: Record<TraitKey, Partial<Record<TraitKey, string>>> = {
  Light: {
    Warm: 'Light Spring',
    Cool: 'Light Summer'
  },
  Deep: {
    Warm: 'Deep Autumn',
    Cool: 'Deep Winter'
  },
  Warm: {
    Light: 'Warm Spring',
    Deep: 'Warm Autumn',
    Bright: 'Warm Spring',
    Soft: 'Warm Autumn'
  },
  Cool: {
    Light: 'Cool Summer',
    Deep: 'Cool Winter',
    Bright: 'Cool Winter',
    Soft: 'Cool Summer'
  },
  Bright: {
    Warm: 'Bright Spring',
    Cool: 'Bright Winter'
  },
  Soft: {
    Cool: 'Soft Summer',
    Warm: 'Soft Autumn'
  }
};

function getOptionValue(questionId: number, answerId: string) {
  const question = questions[questionId]
  if (!question) {
    throw new Error(`Invalid quiz selection index: ${questionId}`);
  }

  const option = question?.options.find((item) => item.id === answerId)
  if (!option) {
    throw new Error(`Invalid answer ${answerId} for question ${questionId}`)
  }

  return option.value
}

export function parseQuizSelections(rawSelections: Record<number, string> | null): OptionValue[] {
  if (!rawSelections) {
    return [];
  }

  const returnedSelections: OptionValue[] = [];

  for (const [questionId, value] of Object.entries(rawSelections)) {
    const index = Number(questionId)
    const option = getOptionValue(index, value)
    returnedSelections.push(option);
  }
  return returnedSelections;
}

export function prepareScores(selectedValues: OptionValue[]) {
  if (!selectedValues || selectedValues.length === 0) {
    throw new Error('No user selections provided for color analysis.');
  }

  const totals = { temperature: 0, value: 0, chroma: 0 };
  const seasonTally: Record<string, number> = {};

  selectedValues.forEach((item) => {
    totals.temperature += item.scores.temperature;
    totals.value += item.scores.value;
    totals.chroma += item.scores.chroma;

    if (item.seasonAffinities) {
      item.seasonAffinities.forEach((season) => {
        seasonTally[season] = (seasonTally[season] || 0) + 1;
      });
    }
  });

  return {
    vectorScores: {
      temperature: Number(totals.temperature.toFixed(2)), // (+) Warm, (-) Cool
      value: Number(totals.value.toFixed(2)),             // (+) Light, (-) Deep
      chroma: Number(totals.chroma.toFixed(2))             // (+) Bright, (-) Soft
    },
    seasonalRankings: Object.entries(seasonTally)
      .map(([season, count]) => ({ season, count }))
      .sort((a, b) => b.count - a.count) as SeasonalRanking[],
  };
}