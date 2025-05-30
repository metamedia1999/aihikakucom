import Link from 'next/link'
import { formatDate, stripHtml, truncateText, getArticleImage } from '@/lib/utils'
import { DEFAULT_FEATURED_IMAGE } from '@/lib/constants'
import type { Post } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { CalendarIcon } from 'lucide-react'

interface ArticleCardProps {
  post: Post
  featured?: boolean
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  
  if (!post) {
    return null
  }
  
  const {
    slug,
    title,
    excerpt,
    date,
    featuredImage,
    categories,
  } = post

  const imageUrl = getArticleImage(post as unknown as Record<string, unknown>)
  
  // excerptを安全に処理 - HTMLタグを除去してから省略
  const cleanExcerpt = excerpt ? stripHtml(truncateText(excerpt, 150)) : ''
  

  return (
    <Link href={`/blog/${slug}`}>
      <Card className={`h-full overflow-hidden card-hover ${featured ? 'border-primary/20 shadow-md' : ''}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title || '記事画像'}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fallbackType="article"
          />
        </div>

        <CardContent className="p-4">
          <div className="flex items-center text-xs text-muted-foreground space-x-2 mb-2">
            <CalendarIcon className="h-3 w-3" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>

          <h3 className="font-bold line-clamp-2 leading-tight">{title}</h3>

          {categories?.nodes && categories.nodes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {categories.nodes.map((category) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{cleanExcerpt}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <span className="text-xs text-primary hover:underline">記事を読む &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
