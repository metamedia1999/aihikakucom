import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { SITE_NAME, MOCK_IMAGES } from '@/lib/constants'
import { getArticleImage } from '@/lib/utils'
import { ServiceCard } from '@/components/cards/service-card'
import { CategoryCard } from '@/components/cards/category-card'
import { SearchBarLive } from '@/components/search/search-bar-live'
import { HeroSection } from '@/components/sections/hero-section'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { getHomeData, getIndustrySolutions } from '@/lib/api/fetchers'

// 遅延読み込みするコンポーネント
const IndustriesSection = dynamic(() => import('@/components/sections/industries-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
})

const CaseStudiesSection = dynamic(() => import('@/components/sections/case-studies-section'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
})

const CTASection = dynamic(() => import('@/components/sections/cta-section'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />
})

export const metadata: Metadata = {
  title: SITE_NAME,
  description: '中小企業向けAIBPOサービスを比較・検討できるプラットフォーム。業務効率化に最適なAIサービスを見つけましょう。',
}

// 1時間間隔でページを再生成（パフォーマンス向上）
export const revalidate = 3600

// モックカテゴリーデータ
const categories = [
  {
    id: 'cat-1',
    title: '業務効率化',
    description: '定型業務の自動化やワークフローの最適化',
    icon: '⚡',
    slug: 'efficiency'
  },
  {
    id: 'cat-2',
    title: 'データ分析',
    description: 'ビジネスデータからの洞察抽出と意思決定支援',
    icon: '📊',
    slug: 'data-analysis'
  },
  {
    id: 'cat-3',
    title: '顧客対応',
    description: 'カスタマーサポートや問い合わせ対応の自動化',
    icon: '💬',
    slug: 'customer-support'
  },
  {
    id: 'cat-4',
    title: '文書処理',
    description: '書類やテキストの自動処理・分析・要約',
    icon: '📄',
    slug: 'document-processing'
  },
  {
    id: 'cat-5',
    title: '画像認識',
    description: '画像や映像からの情報抽出と分析',
    icon: '🔍',
    slug: 'image-recognition'
  },
  {
    id: 'cat-6',
    title: '予測分析',
    description: '過去データからの将来予測とリスク分析',
    icon: '🔮',
    slug: 'predictive-analytics'
  }
];

export default async function HomePage() {
  try {
    // 並列でデータを取得してパフォーマンス向上
    const [homeData, industrySolutions] = await Promise.all([
      getHomeData(),
      getIndustrySolutions()
    ])
    
    const { services, posts, industries } = homeData

    return (
      <>
        {/* ヒーローセクション */}
        <HeroSection />

        {/* カテゴリーセクション */}
        <section className="py-16 bg-background">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">あなたの悩みから最適なAIサービスを見つける</h2>
              <div className="text-muted-foreground max-w-2xl mx-auto">
                業務課題に合わせて、最適なAIサービスをご紹介します。
                各カテゴリーから、あなたのビジネスに最適なソリューションを見つけましょう。
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* おすすめサービスセクション */}
        {services && services.length > 0 && (
          <section className="py-16">
            <div className="container-wide">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">おすすめAIサービス</h2>
                <div className="text-muted-foreground max-w-2xl mx-auto">
                  業務効率化に実績のあるAIサービスを厳選してご紹介します。
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {services.slice(0, 6).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  すべてのサービスを見る
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 業界別セクション */}
        <IndustriesSection solutions={industrySolutions} />

        {/* 最新記事セクション */}
        {posts && posts.length > 0 && (
          <section className="py-16 bg-secondary/50">
            <div className="container-wide">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">AI活用に関する最新記事</h2>
                <div className="text-muted-foreground max-w-2xl mx-auto">
                  AIの導入事例や活用のポイントなど、役立つ情報をお届けします。
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.slice(0, 6).map((post) => (
                  <div key={post.id} className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={getArticleImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fallbackType="article"
                        loading="lazy"
                        priority={false}
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        {new Date(post.date).toLocaleDateString('ja-JP')}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim() : ''}
                      </div>
                      {post.categories?.nodes && post.categories.nodes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.categories.nodes.slice(0, 2).map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-1 bg-secondary text-xs rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md border border-primary bg-transparent px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  記事一覧を見る
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 導入事例セクション */}
        <CaseStudiesSection />

        {/* CTAセクション */}
        <CTASection />
      </>
    )
  } catch (error) {
    return (
      <div className="container-wide py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">サイトデータの読み込み中...</h1>
          <p className="text-muted-foreground mb-8">
            コンテンツを準備中です。しばらくお待ちください。<br />
            もしこのメッセージが長時間表示される場合は、ページを更新してください。
          </p>
          
          {/* 最低限のサービス表示 */}
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-6">主要なAIサービス</h2>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">AI Assistant Pro</h3>
                <p className="text-sm text-muted-foreground">
                  あらゆるビジネスシーンで活躍する多機能AIアシスタント
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Smart Data Analyzer</h3>
                <p className="text-sm text-muted-foreground">
                  大量のデータから有益な洞察を抽出するAI分析ツール
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">AI Document Processor</h3>
                <p className="text-sm text-muted-foreground">
                  書類の自動認識・データ抽出を行うAIソリューション
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}