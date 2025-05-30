import type { Metadata } from 'next'
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

// 静的パラメータの生成（画像ファイルを除外）
export async function generateStaticParams() {
  // 実際のプロジェクトでは getAllPosts() などの関数を使用
  // 現在はブログポストのスラッグを手動で定義
  const blogSlugs = [
    'ai-kakushin-jidai',
    'dx-senryaku-guide',
    'cloud-migration-best-practices',
    'security-compliance-2024'
  ];
  
  // 画像ファイルを明示的に除外
  return blogSlugs
    .filter(slug => !slug.match(/\.(jpg|png|gif|jpeg)$/i))
    .map(slug => ({
      slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  // 画像ファイル拡張子を即座に除外
  if (slug.match(/\.(jpg|png|gif|jpeg)$/i)) {
    return {
      title: 'ページが見つかりません',
      description: '要求されたページは存在しません。'
    };
  }
  
  try {
    const post = await getPostData(slug)
    
    
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
  
  // 画像ファイル拡張子を即座に除外
  if (slug.endsWith('.jpg') || 
      slug.endsWith('.png') || 
      slug.endsWith('.gif') ||
      slug.endsWith('.jpeg')) {
    notFound(); // 404ページにリダイレクト
  }
  
  try {
    const post = await getPostData(slug)

    if (!post) {
      console.error('❌ Post not found for slug:', {
        originalSlug: encodedSlug,
        decodedSlug: slug
      })
      notFound()
    }
    

    const { title, content, date, featuredImage, categories } = post
    const imageUrl = featuredImage?.node?.sourceUrl || DEFAULT_FEATURED_IMAGE

    return (
      <article className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* 記事ヘッダー */}
          <div className="mb-6">
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

            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>

          {/* アイキャッチ画像 */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
