import Link from 'next/link'
import Image from 'next/image'
import { formatDate, stripHtml } from '@/lib/utils'
import { DEFAULT_FEATURED_IMAGE } from '@/lib/constants'
import { Post } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'

interface ArticleCardProps {
  post: Post
  featured?: boolean
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  console.log('ArticleCard rendering:', { title: post?.title, excerpt: post?.excerpt })
  
  const {
    slug,
    title,
    excerpt,
    date,
    featuredImage,
    categories,
  } = post

  const imageUrl = featuredImage?.node?.sourceUrl || DEFAULT_FEATURED_IMAGE

  return (
    <Link href={`/blog/${slug}`}>
      <Card className={`h-full overflow-hidden card-hover ${featured ? 'border-primary/20 shadow-md' : ''}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{stripHtml(excerpt || '')}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <span className="text-xs text-primary hover:underline">記事を読む &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
