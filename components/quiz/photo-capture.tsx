'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, Upload, RefreshCw, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PhotoCaptureProps } from '@/types/quiz'

export function PhotoCapture({ value, onChange }: PhotoCaptureProps) {
  const [mode, setMode] = useState<'idle' | 'camera'>('idle')
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  useEffect(() => {
    return () => stopCamera()
  }, [stopCamera])

  const isValidPhoto = (file: File) =>
    file.type.startsWith('image/') &&
    file.size <= 10 * 1024 * 1024

  async function startCamera() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      setMode('camera')
      // wait for the video element to mount before attaching the stream
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          void videoRef.current.play()
        }
      })
    } catch {
      setError(
        'We could not access your camera. You can upload a photo instead.',
      )
      setMode('idle')
    }
  }

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    const size = Math.min(video.videoWidth, video.videoHeight)
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // center-crop to a square, mirror to match the preview
    const sx = (video.videoWidth - size) / 2
    const sy = (video.videoHeight - size) / 2
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size)
    onChange(canvas.toDataURL('image/jpeg', 0.9))
    stopCamera()
    setMode('idle')
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] // reads the first selected file
    if (!file) return
    if (!isValidPhoto(file)) {
      setError('Please upload a valid image file (PNG, JPEG, or WebP) up to 10MB.')
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function reset() {
    onChange(null)
    setError(null)
  } // used when retaking or replacing the photo

  // captured / uploaded preview
  if (value) {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <img
            src={value || '/placeholder.svg'}
            alt="Your uploaded photo for color analysis"
            className="size-56 rounded-3xl object-cover shadow-lg shadow-primary/15 ring-1 ring-border"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
          >
            <Check className="size-5" />
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={reset}
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="mr-1 size-4" />
          Retake or replace
        </Button>
      </div>
    )
  }

  // live camera view
  if (mode === 'camera') {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="relative size-56 overflow-hidden rounded-3xl bg-secondary shadow-lg shadow-primary/15 ring-1 ring-border">
          <video
            ref={videoRef}
            playsInline
            muted
            className="size-full -scale-x-100 object-cover"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={capturePhoto}
            size="lg"
            className="rounded-full px-6 shadow-lg shadow-primary/20"
          >
            <Camera className="mr-1 size-5" />
            Capture
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              stopCamera()
              setMode('idle')
            }}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 size-4" />
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  // idle: choose camera or upload
  return (
    <div className="flex flex-col items-center gap-5">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'group flex size-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary/30 bg-card/60 p-6 text-center backdrop-blur transition-all duration-300 outline-none',
          'hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10',
          'focus-visible:ring-3 focus-visible:ring-ring/50',
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
          <Upload className="size-6" />
        </span>
        <span className="font-serif text-lg font-semibold text-foreground">
          Upload a photo
        </span>
        <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
          A clear, natural-light selfie works best.
        </span>
      </button>

      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px w-8 bg-border" />
        or
        <span className="h-px w-8 bg-border" />
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={startCamera}
        className="rounded-full border-primary/30 bg-card/60 px-6 backdrop-blur hover:border-primary/60 hover:bg-primary/5"
      >
        <Camera className="mr-1 size-5" />
        Take a photo
      </Button>

      {error ? (
        <p className="text-pretty text-center text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        capture="user"
        onChange={handleFile}
        className="sr-only"
      />
    </div>
  )
}
