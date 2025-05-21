import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostData } from '@/lib/api/fetchers'
import { formatDate } from '@/lib/utils'
import { DEFAULT_FEATURED_IMAGE, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'

// 10分間隔でページを再生成
export const revalidate = 600

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPostData(params.slug).catch(() => null)

  if (!post) {
    return { title: '記事が見つかりません' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : undefined,
    },
  }
}

/**
 * ブログ記事詳細ページ
 */
export default async function BlogPostPage({ params }: any): Promise<JSX.Element> {
  try {
    const post = await getPostData(params.slug).catch(() => null)

    if (!post) {
      notFound()
    }

    const { title, content, date, featuredImage, categories } = post!
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
    console.error('Failed to load blog post:', error)
    return (
      <div className="container-wide py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-muted-foreground">
          記事の読み込み中にエラーが発生しました。<br />
          しばらく経ってからもう一度お試しください。
        </p>
      </div>
    )
  }
}
