'use client'

import Image from 'next/image'
import { getImageFallback, getGradientFallback } from '@/lib/utils'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  fallbackType?: 'service' | 'article' | 'industry'
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
  useGradientFallback?: boolean
  gradientSeed?: string
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  fallbackType = 'service',
  priority = false,
  loading = 'lazy',
  quality = 75,
  useGradientFallback = false,
  gradientSeed
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [useGradient, setUseGradient] = useState(false)

  const handleError = () => {
    if (useGradientFallback) {
      setUseGradient(true)
      setIsLoading(false)
    } else {
      setImgSrc(getImageFallback(fallbackType))
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (useGradient) {
    const gradient = getGradientFallback(gradientSeed || alt)
    return (
      <div 
        className={`relative ${className}`}
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-medium text-lg opacity-80">
            AI
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse rounded" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        priority={priority}
        loading={loading}
        quality={quality}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}