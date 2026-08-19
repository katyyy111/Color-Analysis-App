import { useState } from 'react';
import { ColorResult } from '@/types/quiz';
import { AnalysisInput } from '@/types/quiz';

export function useColorAnalysis() {
  const [data, setData] = useState<ColorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (payload: AnalysisInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Wystąpił błąd podczas analizy obrazu');

      const result: ColorResult = await res.json();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return { analyze, data, isLoading, error };
}