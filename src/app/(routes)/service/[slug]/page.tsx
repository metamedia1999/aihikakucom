import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceData } from '@/lib/api/fetchers'
import { stripHtml, getServiceImage } from '@/lib/utils'
import { DEFAULT_LOGO, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Mail } from 'lucide-react'
import { ComparisonTable } from '@/components/tables/comparison-table'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

// 10分間隔でページを再生成
export const revalidate = 600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  
  try {
    const service = await getServiceData(slug)
    

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
    
    return {
      title: 'サービスが見つかりません',
      description: 'サービスの読み込み中にエラーが発生しました。'
    }
  }
}

// Helper function to convert percentage to text label
function getTextLabel(value: number | string | undefined | null, type: 'effectiveness' | 'supportLevel'): string {
  if (value === undefined || value === null) return '-';
  
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value;
  
  if (type === 'effectiveness') {
    if (numValue >= 90) return '非常に高い';
    if (numValue >= 70) return '高い';
    if (numValue >= 50) return '普通';
    if (numValue >= 30) return '低い';
    return '非常に低い';
  }
  
  if (type === 'supportLevel') {
    if (numValue >= 90) return '充実';
    if (numValue >= 70) return '良好';
    if (numValue >= 50) return '標準';
    if (numValue >= 30) return '基本的';
    return '最小限';
  }
  
  return '-';
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  
  
  try {
    const service = await getServiceData(slug)
    
    if (!service) {
      notFound()
    }
    
    
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
    
    
    const logoUrl = getServiceImage(service)
    

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
      "priceRange": (fields as any)?.price || "要問い合わせ",
      "image": featuredImage?.node?.sourceUrl || logoUrl
    }

    return (
      <div className="container-wide" style={{ paddingTop: '8px !important', paddingBottom: '8px !important' }}>
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="p-3 md:p-4 border-b" style={{ padding: '12px !important' }}>
            <div className="flex items-center">
              <div className="relative h-20 w-20 mr-6 shrink-0 overflow-hidden rounded bg-secondary">
                <ImageWithFallback
                  src={logoUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="80px"
                  fallbackType="service"
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
            <div className="lg:col-span-2 p-3 md:p-4" style={{ padding: '12px !important' }}>
              <div className="relative aspect-video w-full mb-3 overflow-hidden rounded" style={{ marginBottom: '12px !important' }}>
                <ImageWithFallback
                  src={featuredImage?.node?.sourceUrl || getServiceImage(service)}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw"
                  fallbackType="service"
                />
              </div>

              <div className="prose max-w-none content" dangerouslySetInnerHTML={{ __html: content || '' }} />

              {/* 比較テーブル - 一時的にコメントアウト
                  TODO: ACFフィールドの設定後に有効化
                  
                  実装手順:
                  1. WordPress管理画面でACFフィールドグループに追加:
                     - フィールド名: comparison_table_id
                     - フィールドタイプ: Text
                     - 説明: TablePressで作成したテーブルのID
                  
                  2. GraphQLクエリ(queries.ts)を更新:
                     serviceDetail {
                       ...existing (fields as any)...
                       comparisonTableId
                     }
                  
                  3. TablePress APIまたはWPGraphQL拡張を実装:
                     - TablePressデータをGraphQL経由で取得
                     - または別途REST APIエンドポイントを作成
                  
                  4. ComparisonTableコンポーネントを更新:
                     - fetchersでTablePressデータ取得関数を追加
                     - モックデータを実データに置き換え
                  
                  5. 以下のコメントを解除して有効化:
              */}
              {/* <div className="mt-10 mb-6">
                <h2 className="text-xl font-bold mb-4">他サービスと比較</h2>
                <ComparisonTable tableId={(fields as any)?.comparisonTableId || "compare"} />
              </div> */}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1 p-3 md:p-4 bg-secondary/30 lg:border-l" style={{ padding: '12px !important' }}>
              <div className="sticky top-24 space-y-6">
                {/* サービス概要 */}
                <div>
                  <h3 className="text-lg font-bold mb-4">サービス概要</h3>

                  {((fields as any)?.serviceSummary || (fields as any)?.summary) && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">{(fields as any).serviceSummary || (fields as any).summary}</p>
                    </div>
                  )}

                  {(fields as any)?.price && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">料金プラン</h4>
                      <p className="text-sm">{(fields as any).price}</p>
                    </div>
                  )}

                  {/* 評価指標 */}
                  {((fields as any)?.aiUtilization !== undefined || (fields as any)?.effectiveness !== undefined || 
                    (fields as any)?.supportLevel !== undefined || (fields as any)?.transparencyScore !== undefined) && (
                    <div className="space-y-3 mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">評価指標</h4>
                      <div className="space-y-3">
                    {(fields as any)?.aiUtilization !== undefined && (fields as any)?.aiUtilization !== null && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">AI活用度</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-secondary rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Number((fields as any).aiUtilization)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{Number((fields as any).aiUtilization)}%</span>
                        </div>
                      </div>
                    )}

                    {(fields as any)?.effectiveness !== undefined && (fields as any)?.effectiveness !== null && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">効果性</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-secondary rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Number((fields as any).effectiveness)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{getTextLabel((fields as any).effectiveness, 'effectiveness')}</span>
                        </div>
                      </div>
                    )}

                    {(fields as any)?.supportLevel !== undefined && (fields as any)?.supportLevel !== null && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">サポートレベル</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-secondary rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Number((fields as any).supportLevel)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{getTextLabel((fields as any).supportLevel, 'supportLevel')}</span>
                        </div>
                      </div>
                    )}

                    {(fields as any)?.transparencyScore !== undefined && (fields as any)?.transparencyScore !== null && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">透明性スコア</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-secondary rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Number((fields as any).transparencyScore)}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{Number((fields as any).transparencyScore)}%</span>
                        </div>
                      </div>
                    )}
                      </div>
                    </div>
                  )}

                  {(fields as any)?.industryCategory && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-1">業界カテゴリ</h4>
                      <p className="text-sm text-muted-foreground">{(fields as any).industryCategory}</p>
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