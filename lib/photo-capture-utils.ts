const MAX_FILE_SIZE = 10 * 1024 * 1024

export const isValidPhoto = (file: File) => {
return file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE
}

export const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string) // register event listener for successful read
    reader.onerror = () => reject(new Error('Failed to read file as data URL'))
    reader.readAsDataURL(file)
})

export const saveSquareImageDataUrl = (video: HTMLVideoElement): string => {
  const canvas = document.createElement('canvas')
  const size = Math.min(video.videoWidth, video.videoHeight)
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  // center-crop to a square, mirror to match the preview
  const sx = (video.videoWidth - size) / 2
  const sy = (video.videoHeight - size) / 2
  ctx.translate(canvas.width, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size)
  return canvas.toDataURL('image/jpeg', 0.9)
}
