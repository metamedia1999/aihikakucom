'use client'

import Image from 'next/image'
import { getImageFallback } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  fallbackType?: 'service' | 'article' | 'industry'
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  sizes,
  fallbackType = 'service'
}: ImageWithFallbackProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={(e) => {
        e.currentTarget.src = getImageFallback(fallbackType);
      }}
    />
  )
}