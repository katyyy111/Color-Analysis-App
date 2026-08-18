"use client";

import { ImageColorPicker } from "./image-color-picker";
import { SampleInputList } from "./sample-input-list";
import { Button } from "@/components/ui/button";
import { ColorSample, ColorSampleDataSet } from "@/types/color-sampling";
import { useState } from "react";
import { getFormattedSamples } from "@/lib/color-utils";

interface ColorSamplingStepProps {
  imageUrl: string;
  initialSamples: ColorSample[];
  onNext: (samples: ColorSampleDataSet[]) => void;
}

export function ColorSamplingStep({
  imageUrl,
  initialSamples,
  onNext,
}: ColorSamplingStepProps) {
  const [samples, setSamples] = useState<ColorSample[]>(initialSamples);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  // const { activeSampleId, setActiveSampleId, selectColor, getFormattedSamples, isComplete } = useColorSampling();

  const handlePickColor = (hex: string) => {
    if (!activeSampleId) return;
    setSamples((prev) => {
      const next = prev.map((sample) => {
        if (sample.id === activeSampleId) {
          return { ...sample, hex };
        }
        return sample;
      });
      return next;
    });
  };

  const isComplete = samples.every((sample) => sample.hex !== null);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold">Color sampling</h2>
        <p className="text-sm text-muted-foreground">
          Click the selected slot on the right, then indicate the corresponding
          point on your image on the left.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* left side - image */}
        <ImageColorPicker
          imageUrl={imageUrl}
          onPickColor={handlePickColor}
          isActive={activeSampleId !== null}
        />

        {/* right side - sample inputs */}
        <SampleInputList
          samples={samples}
          activeSampleId={activeSampleId}
          onSelectSlot={setActiveSampleId}
        />
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          disabled={!isComplete}
          onClick={() => onNext(getFormattedSamples(samples))}
          size="lg"
        >
          {isComplete
            ? "Proceed to next step"
            : "Collect all samples to proceed"}
        </Button>
      </div>
    </div>
  );
}
