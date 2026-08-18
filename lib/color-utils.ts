import { ColorSample, ColorSampleDataSet } from "@/types/color-sampling";

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function getPixelHexFromCanvas(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): string | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rect = canvas.getBoundingClientRect();
  // calculate the scale between the canvas actual size and its displayed size
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor((clientX - rect.left) * scaleX);
  const y = Math.floor((clientY - rect.top) * scaleY);

  const pixel = ctx.getImageData(x, y, 1, 1).data;
  return rgbToHex(pixel[0], pixel[1], pixel[2]);
}

export function getFormattedSamples(samples: ColorSample[]): ColorSampleDataSet[] {
  return samples.map(({ id, hex }) => ({ id, hex }));
}