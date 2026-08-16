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

export function parseQuizSelections(rawSelections: Record<number, string>[] | null): OptionValue[] {
  if (!rawSelections || rawSelections.length === 0) {
    return [];
  }

  const returnedSelections: OptionValue[] = [];
  for (const [questionId, value] of Object.entries(rawSelections)) {
    const index = Number(questionId)
    const question = questions[index]
    if (!question) {
      throw new Error(`Invalid quiz selection index: ${index}`);
    }
    const option = question.options.find((opt) => opt.id === value);
    if (!option) {
      throw new Error(`Invalid quiz option id: ${value} at index ${index}`);
    }
    returnedSelections.push(option.value);
  }
  return returnedSelections;
}

/**
 * Calculates final 12-season color analysis result from selected quiz option values.
 *
 * @param {OptionValue[]} selectedValues - Array of option.value objects selected by the user.
 * @returns {Object} Analytical breakdown including season, confidence score, and vectors.
 */
export function calculateColorAnalysis(selectedValues: OptionValue[]) {
  if (!selectedValues || selectedValues.length === 0) {
    throw new Error('No user selections provided for color analysis.');
  }

  // 1. Accumulate Vector Scores and Season Affinities
  const totals = { temperature: 0, value: 0, chroma: 0 };
  const seasonTally: Record<string, number> = {};
  const explanations: string[] = [];

  selectedValues.forEach((item) => {
    totals.temperature += item.scores.temperature;
    totals.value += item.scores.value;
    totals.chroma += item.scores.chroma;

    // Season affinity weight collection
    if (item.seasonAffinities) {
      item.seasonAffinities.forEach((season) => {
        seasonTally[season] = (seasonTally[season] || 0) + 1;
      });
    }

    // Collect individual explanations for final synthesis
    if (item.explanation) {
      explanations.push(item.explanation);
    }
  });

  // 2. Identify Trait Polarities and Magnitudes
  const dimensions = [
    {
      name: 'temperature',
      magnitude: Math.abs(totals.temperature),
      direction: totals.temperature > 0 ? 'Warm' : 'Cool'
    },
    {
      name: 'value',
      magnitude: Math.abs(totals.value),
      direction: totals.value > 0 ? 'Light' : 'Deep'
    },
    {
      name: 'chroma',
      magnitude: Math.abs(totals.chroma),
      direction: totals.chroma > 0 ? 'Bright' : 'Soft'
    }
  ];

  // Sort by highest absolute magnitude to find Dominant vs Secondary traits
  dimensions.sort((a, b) => b.magnitude - a.magnitude);

  const primaryDimension = dimensions[0];
  const secondaryDimension = dimensions[1];

  const dominantTrait: TraitKey = primaryDimension.direction as TraitKey;
  const secondaryDirection: TraitKey = secondaryDimension.direction as TraitKey;

  // 3. Resolve Season from Matrix
  let matchedSeason = SEASON_MATRIX[dominantTrait]?.[secondaryDirection];

  // Fallback: If combination doesn't map directly, use highest affinity tally
  if (!matchedSeason) {
    const sortedSeasons = Object.entries(seasonTally).sort((a, b) => b[1] - a[1]); // sort by count descending
    matchedSeason = sortedSeasons[0]?.[0] || 'Unknown';
  }

  // 4. Calculate Confidence Score (0% - 100%)
  const maxPossiblePoints = selectedValues.length * 2.0; // 2.0 is the max absolute score per dimension per selection
  const dominantStrength = primaryDimension.magnitude / maxPossiblePoints;
  const tallyAgreement = (seasonTally[matchedSeason] || 0) / selectedValues.length;

  const confidenceScore = Math.min(
    100,
    Math.round((dominantStrength * 0.5 + tallyAgreement * 0.5) * 100)
  );

  // 5. Construct Final Payload
  return {
    season: matchedSeason,
    confidenceScore: `${confidenceScore}%`,
    primaryAttribute: `${dominantTrait} (${primaryDimension.name})`,
    secondaryAttribute: `${secondaryDirection} (${secondaryDimension.name})`,
    vectorScores: {
      temperature: Number(totals.temperature.toFixed(2)), // (+) Warm, (-) Cool
      value: Number(totals.value.toFixed(2)),             // (+) Light, (-) Deep
      chroma: Number(totals.chroma.toFixed(2))             // (+) Bright, (-) Soft
    },
    seasonalRankings: Object.entries(seasonTally)
      .map(([season, count]) => ({ season, count }))
      .sort((a, b) => b.count - a.count) as SeasonalRanking[],
    diagnosticExplanations: explanations
  };
}