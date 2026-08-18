'use client';

import { useEffect, useRef } from 'react';
import { getPixelHexFromCanvas } from '@/lib/color-utils';

interface Props {
  imageUrl: string;
  onPickColor: (hex: string) => void;
  isActive: boolean;
}

export function ImageColorPicker({ imageUrl, onPickColor, isActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx?.drawImage(img, 0, 0);
    };
  }, [imageUrl]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive || !canvasRef.current){
        console.log('Color picking is not active or canvas is not ready.');
        return; }
    const hex = getPixelHexFromCanvas(canvasRef.current, e.clientX, e.clientY);
    console.log('Picked color:', hex, 'at position:', e.clientX, e.clientY)
    if (hex) onPickColor(hex);
  };

  return (
    <div className="relative flex items-center justify-center border-2 border-dashed rounded-xl p-2 bg-slate-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className={`max-w-full max-h-[500px] object-contain rounded-lg transition-cursor ${
          isActive ? 'cursor-crosshair hover:ring-2 hover:ring-primary' : 'cursor-not-allowed opacity-80'
        }`}
      />
    </div>
  );
}