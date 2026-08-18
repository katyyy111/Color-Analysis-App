'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, Upload, RefreshCw, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PhotoCaptureProps } from '@/types/quiz'
import { isValidPhoto, readFileAsDataURL, saveSquareImageDataUrl } from '@/lib/photo-capture-utils'

const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/webp"

export function PhotoCapture({ initialPhoto, onChange }: PhotoCaptureProps) {
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

  const startCamera = useCallback(async () => {
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
  }, [])

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const dataURL = saveSquareImageDataUrl(video)
    onChange(dataURL)
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
    readFileAsDataURL(file)
      .then((dataUrl) => {
        onChange(dataUrl)
        event.target.value = '' // reset the input so the same file can be selected again if needed
      })
      .catch(() => {
        setError('Failed to read the file. Please try again.')
      })
  }

  function reset() {
    onChange(null)
    setError(null)
  } // used when retaking or replacing the photo

  function renderImagePreview() {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <Image
            width={224}
            height={224}
            src={initialPhoto || '/placeholder.svg'}
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

  function renderCameraView() {
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

  function renderIdleView() {
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
          accept={ACCEPTED_IMAGE_TYPES}
          capture="user"
          onChange={handleFile}
          className="sr-only"
        />
      </div>
    )
  }

  // captured / uploaded preview
  if (initialPhoto) {
    return renderImagePreview()
  }

  // live camera view
  if (mode === 'camera') {
    return renderCameraView()
  }

  // idle: choose camera or upload
  return renderIdleView()
}
