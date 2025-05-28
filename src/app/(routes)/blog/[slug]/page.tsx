import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostData } from '@/lib/api/fetchers'
import { formatDate, stripHtml } from '@/lib/utils'
import { DEFAULT_FEATURED_IMAGE, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'

// 10分間隔でページを再生成
export const revalidate = 600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  console.log('🔍 generateMetadata called for blog post:', {
    originalSlug: encodedSlug,
    decodedSlug: slug
  })
  
  try {
    const post = await getPostData(slug)
    
    console.log('✅ Blog post metadata generated successfully for:', post.title)
    
    return {
      title: post.title,
      description: stripHtml(post.excerpt || ''),
      openGraph: {
        title: `${post.title} | ${SITE_NAME}`,
        description: stripHtml(post.excerpt || ''),
        type: 'article',
        publishedTime: post.date,
        images: post.featuredImage?.node?.sourceUrl
          ? [{ url: post.featuredImage.node.sourceUrl }]
          : undefined,
      },
    }
  } catch (error) {
    console.error('❌ Blog post metadata generation failed:', {
      originalSlug: encodedSlug,
      decodedSlug: slug,
      error: error instanceof Error ? error.message : error
    })
    
    return {
      title: '記事が見つかりません',
      description: '記事の読み込み中にエラーが発生しました。'
    }
  }
}

/**
 * ブログ記事詳細ページ
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  console.log('📄 BlogPostPage rendering for slug:', {
    originalSlug: encodedSlug,
    decodedSlug: slug
  })
  
  try {
    console.log('🔄 Fetching post data...')
    const post = await getPostData(slug)

    if (!post) {
      console.error('❌ Post not found for slug:', {
        originalSlug: encodedSlug,
        decodedSlug: slug
      })
      notFound()
    }
    
    console.log('✅ Post data fetched successfully:', {
      title: post.title,
      contentLength: post.content?.length || 0,
      hasImage: !!post.featuredImage?.node?.sourceUrl,
      categoriesCount: post.categories?.nodes?.length || 0
    })

    const { title, content, date, featuredImage, categories } = post
    const imageUrl = featuredImage?.node?.sourceUrl || DEFAULT_FEATURED_IMAGE

    return (
      <article className="container-wide py-12">
        <div className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <time dateTime={date}>{formatDate(date)}</time>

              {categories?.nodes && categories.nodes.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.nodes.map((category) => (
                      <Link key={category.id} href={`/category/${category.slug}`}>
                        <Badge variant="secondary">{category.name}</Badge>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
          </div>

          {/* アイキャッチ画像 */}
          <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 50vw"
              priority
            />
          </div>

          {/* 記事コンテンツ */}
          <div
            className="prose max-w-none content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* 記事フッター */}
          <div className="mt-12 pt-6 border-t">
            <div className="flex justify-between">
              <Link href="/blog" className="text-primary hover:underline">
                ← 記事一覧に戻る
              </Link>

              {categories?.nodes && categories.nodes[0] && (
                <Link
                  href={`/category/${categories.nodes[0].slug}`}
                  className="text-primary hover:underline"
                >
                  {categories.nodes[0].name} の記事一覧 →
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error('❌ Failed to load blog post:', {
      originalSlug: encodedSlug,
      decodedSlug: slug,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      timestamp: new Date().toISOString()
    })
    
    // GraphQLエラーの詳細情報を表示
    if (error && typeof error === 'object' && 'response' in error) {
      console.error('🚑 GraphQL Response Error:', error.response)
    }
    
    return (
      <div className="container-wide py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-muted-foreground mb-4">
          記事の読み込み中にエラーが発生しました。<br />
          しばらく経ってからもう一度お試しください。
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-red-800 mb-2">デバッグ情報:</h3>
            <pre className="text-xs text-red-700 whitespace-pre-wrap">
              {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    )
  }
}
