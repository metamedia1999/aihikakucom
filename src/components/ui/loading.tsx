import { cn } from '@/lib/utils'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function Loading({ className, size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-primary', sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn('border rounded-lg bg-card p-4 sm:p-6 animate-pulse', className)}>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="h-12 w-12 sm:h-16 sm:w-16 bg-secondary rounded-lg shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-secondary rounded w-3/4" />
          <div className="h-3 bg-secondary rounded w-1/2" />
          <div className="flex space-x-1">
            <div className="h-4 bg-secondary rounded w-12" />
            <div className="h-4 bg-secondary rounded w-12" />
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-secondary rounded w-full" />
        <div className="h-3 bg-secondary rounded w-2/3" />
      </div>
    </div>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
}

export function LoadingGrid({ count = 6, className }: LoadingGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: count }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

interface LoadingPageProps {
  title?: string
  description?: string
}

export function LoadingPage({ title = 'データを読み込んでいます...', description }: LoadingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-12">
        <div className="text-center mb-8">
          <Loading size="lg" className="mb-4" />
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && (
            <div className="text-muted-foreground max-w-md mx-auto">{description}</div>
          )}
        </div>
        <LoadingGrid />
      </div>
    </div>
  )
}