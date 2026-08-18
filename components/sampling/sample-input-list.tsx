'use client';

import { ColorSample } from '@/types/color-sampling';
import { Card } from '@/components/ui/card';

interface SampleInputListProps {
  samples: ColorSample[];
  activeSampleId: string | null;
  onSelectSlot: (id: string) => void;
}

export function SampleInputList({ samples, activeSampleId, onSelectSlot }: SampleInputListProps) {
  return (
    <div className="space-y-3">
      {samples.map((sample) => {
        const isActive = activeSampleId === sample.id;
        const isFilled = sample.hex !== null;

        return (
          <Card
            key={sample.id}
            onClick={() => onSelectSlot(sample.id)}
            className={`p-3 cursor-pointer transition-all border-2 ${
              isActive
                ? 'border-primary bg-primary/5 shadow-sm'
                : isFilled
                ? 'border-slate-200 bg-white'
                : 'border-dashed border-slate-300 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium text-sm flex items-center gap-2">
                  <span>{sample.label}</span>
                  {isActive && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Choosing...</span>}
                </div>
                <p className="text-xs text-muted-foreground">{sample.samplingInstruction}</p>
              </div>

              {/* color preview and HEX code */}
              <div className="flex items-center gap-2 min-w-[100px] justify-end">
                {sample.hex ? (
                  <>
                    <span className="font-mono text-xs font-semibold">{sample.hex}</span>
                    <div
                      className="w-8 h-8 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: sample.hex }}
                    />
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                    ?
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}