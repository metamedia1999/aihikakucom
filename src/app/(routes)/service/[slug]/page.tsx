import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceData } from '@/lib/api/fetchers'
import { stripHtml } from '@/lib/utils'
import { DEFAULT_LOGO, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Mail } from 'lucide-react'
import { ComparisonTable } from '@/components/tables/comparison-table'

// 10分間隔でページを再生成
export const revalidate = 600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  console.log('🔍 generateMetadata called for service:', {
    originalSlug: encodedSlug,
    decodedSlug: slug
  })
  
  try {
    const service = await getServiceData(slug)
    
    console.log('✅ Service metadata generated successfully:', {
      title: service.title,
      hasExcerpt: !!service.excerpt,
      hasImage: !!service.featuredImage?.node?.sourceUrl
    })

    return {
      title: service.title,
      description: stripHtml(service.excerpt || ''),
      openGraph: {
        title: `${service.title} | ${SITE_NAME}`,
        description: stripHtml(service.excerpt || ''),
        images: service.featuredImage?.node?.sourceUrl
          ? [{ url: service.featuredImage.node.sourceUrl }]
          : undefined,
      },
    }
  } catch (error) {
    console.error('❌ Service metadata generation failed:', {
      originalSlug: encodedSlug,
      decodedSlug: slug,
      error: error instanceof Error ? error.message : error
    })
    
    return {
      title: 'サービスが見つかりません',
      description: 'サービスの読み込み中にエラーが発生しました。'
    }
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  console.log('📋 ServicePage rendering for slug:', {
    originalSlug: encodedSlug,
    decodedSlug: slug
  })
  
  try {
    console.log('🔄 Fetching service data...')
    const service = await getServiceData(slug)
    
    if (!service) {
      console.error('❌ Service not found for slug:', {
        originalSlug: encodedSlug,
        decodedSlug: slug
      })
      notFound()
    }
    
    console.log('✅ Service data fetched successfully:', {
      title: service.title,
      hasContent: !!service.content,
      hasServiceDetail: !!service.serviceDetail,
      hasServiceFields: !!service.serviceFields,
      industriesCount: service.industries?.nodes?.length || 0,
      hasImage: !!service.featuredImage?.node?.sourceUrl
    })
    
    const {
      title,
      content,
      serviceFields,
      serviceDetail,
      industries,
      featuredImage
    } = service

    // Handle both new and legacy field structures with debugging
    const fields = serviceDetail || serviceFields
    
    console.log('🔧 Service fields structure:', {
      serviceDetail: serviceDetail ? Object.keys(serviceDetail) : null,
      serviceFields: serviceFields ? Object.keys(serviceFields) : null,
      finalFields: fields ? Object.keys(fields) : null
    })
    
    const logoUrl = fields?.logo?.node?.sourceUrl || fields?.logo?.sourceUrl || DEFAULT_LOGO
    
    console.log('🇿 Logo URL resolved:', logoUrl)

    // Schema.org用のJSONデータ（実際はYoast SEOで生成されるべき）
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": title,
      "description": service.excerpt,
      "provider": {
        "@type": "Organization",
        "name": "AI比較.com"
      },
      "priceRange": fields?.price || "要問い合わせ",
      "image": featuredImage?.node?.sourceUrl || logoUrl
    }

    return (
      <div className="container-wide py-12">
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="p-6 md:p-8 border-b">
            <div className="flex items-center">
              <div className="relative h-20 w-20 mr-6 shrink-0 overflow-hidden rounded bg-secondary">
                <Image
                  src={logoUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

                {industries?.nodes && industries.nodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {industries.nodes.map((industry) => (
                      <Link key={industry.id} href={`/search?q=${industry.name}`}>
                        <Badge variant="secondary">{industry.name}</Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* コンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2 p-6 md:p-8">
              {featuredImage?.node?.sourceUrl && (
                <div className="relative aspect-video w-full mb-8 overflow-hidden rounded">
                  <Image
                    src={featuredImage.node.sourceUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw"
                  />
                </div>
              )}

              <div className="prose max-w-none content" dangerouslySetInnerHTML={{ __html: content }} />

              {/* 比較テーブル */}
              <div className="mt-10 mb-6">
                <h2 className="text-xl font-bold mb-4">他サービスと比較</h2>
                <ComparisonTable tableId="compare" />
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 p-6 md:p-8 bg-secondary/30 lg:border-l">
              <div className="sticky top-24 space-y-6">
                {/* サービス概要 */}
                <div>
                  <h3 className="text-lg font-bold mb-4">サービス概要</h3>

                  {(fields?.serviceSummary || fields?.summary) && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">{fields.serviceSummary || fields.summary}</p>
                    </div>
                  )}

                  {fields?.price && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">料金プラン</h4>
                      <p className="text-sm">{fields.price}</p>
                    </div>
                  )}
                </div>

                {/* お問い合わせボタン */}
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Mail className="mr-2 h-4 w-4" /> 資料請求・お問い合わせ
                  </Link>
                </div>

                {/* 関連業界 */}
                {industries?.nodes && industries.nodes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">関連業界</h3>
                    <ul className="space-y-2">
                      {industries.nodes.map((industry) => (
                        <li key={industry.id}>
                          <Link href={`/search?q=${industry.name}`} className="flex items-center text-sm hover:text-primary">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {industry.name}業界のサービス一覧
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </div>
    )
  } catch (error) {
    console.error('❌ Failed to load service page:', {
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
      <div className="container-wide py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">サービス詳細エラー</h1>
          <div className="bg-secondary/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">サービス情報の読み込みに失敗しました</h2>
            <p className="text-muted-foreground mb-8">
              サービスの詳細情報を取得できませんでした。<br />
              しばらく待ってから再度お試しください。
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left mb-8">
                <h3 className="font-semibold text-red-800 mb-2">デバッグ情報:</h3>
                <pre className="text-xs text-red-700 whitespace-pre-wrap">
                  {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">機能・特徴</h3>
                <p className="text-sm text-muted-foreground">詳細な機能説明を準備中</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">料金プラン</h3>
                <p className="text-sm text-muted-foreground">価格情報を取得中</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">導入事例</h3>
                <p className="text-sm text-muted-foreground">成功事例を準備中</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// import { Metadata } from 'next'
// import { SITE_NAME } from '@/lib/constants'
// import { getHomeServices } from '@/lib/api/fetchers'
// import { ServiceCard } from '@/components/cards/service-card'
// import { HeroSection } from '@/components/sections/hero-section'

// export const metadata: Metadata = {
//   title: SITE_NAME,
//   description: '中小企業向け AIBPO サービスを比較できるプラットフォーム',
// }

// export const revalidate = 600 // ISR 10 分

// export default async function HomePage() {
//   const services = await getHomeServices()

//   return (
//     <>
//       <HeroSection />

//       <section className="container-wide py-16">
//         <h2 className="text-3xl font-bold mb-8 text-center">最新 AI サービス一覧</h2>

//         {services.length === 0 ? (
//           <p className="text-center text-muted-foreground">サービス記事がまだありません。</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {services.map((svc) => (
//               <ServiceCard key={svc.id} service={svc as any} />
//             ))}
//           </div>
//         )}
//       </section>
//     </>
//   )
// }