import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'
import { getIndustryData, getIndustries, getIndustrySolutions } from '@/lib/api/fetchers'
import { ServiceCard } from '@/components/cards/service-card'
import { SearchBarLive } from '@/components/search/search-bar-live'

interface IndustryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    // getIndustrySolutionsを使用してサービスがある業界のみを取得
    const industriesWithServices = await getIndustrySolutions()
    return industriesWithServices.map((industry) => ({
      slug: industry.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return [
      { slug: 'finance' },
      { slug: 'pharma' },
      { slug: 'manufacturing' }
    ]
  }
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const { industry } = await getIndustryData(slug)
    return {
      title: `${industry.name}業界向けAIサービス | ${SITE_NAME}`,
      description: industry.description || `${industry.name}業界向けのAIサービス一覧。業務効率化に最適なソリューションを見つけましょう。`,
    }
  } catch (error) {
    return {
      title: `業界向けAIサービス | ${SITE_NAME}`,
      description: '業界特化型AIサービスの一覧',
    }
  }
}

export const revalidate = 600

export default async function IndustryPage({ params }: IndustryPageProps) {
  try {
    const { slug } = await params
    const { industry, services } = await getIndustryData(slug)

    if (!industry) {
      notFound()
    }

    return (
      <div className="container-wide py-12">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダーセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              {industry.name}業界向けAIサービス
            </h1>
            {industry.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                {industry.description}
              </p>
            )}
            
            {/* 検索バー */}
            <div className="max-w-md mx-auto">
              <SearchBarLive />
            </div>
          </div>

          {/* サービス一覧 */}
          {services && services.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {industry.name}業界向けサービス一覧
                </h2>
                <p className="text-muted-foreground">
                  {services.length}件のサービスが見つかりました
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">
                  この業界のサービスは現在登録されていません
                </h2>
                <p className="text-muted-foreground mb-6">
                  {industry.name}業界に特化したAIサービスは現在登録されていません。<br />
                  他の業界向けサービスもご覧ください。
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">AI Assistant Pro</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {industry.name}業界でも活用可能な汎用AIアシスタント
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">Smart Data Analyzer</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {industry.name}業界のデータ分析に対応
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 関連情報 */}
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold mb-4">
              {industry.name}業界のAI導入をサポート
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {industry.name}業界特有の課題に対応したAIソリューションの導入から運用まで、
              専門コンサルタントがサポートいたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                導入相談をする
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-primary bg-transparent px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                全サービスを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load industry page:', error);
    return (
      <div className="container-wide py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">業界向けAIサービス</h1>
          <div className="bg-secondary/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">業界情報を読み込み中</h2>
            <p className="text-muted-foreground mb-8">
              業界向けAIサービスの情報を準備しています。<br />
              少々お待ちください。
            </p>
            
            <div className="grid gap-4 text-left max-w-md mx-auto">
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">金融業界向けAI</h3>
                <p className="text-sm text-muted-foreground">リスク分析・予測AI</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">製薬業界向けAI</h3>
                <p className="text-sm text-muted-foreground">創薬支援AI</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">製造業界向けAI</h3>
                <p className="text-sm text-muted-foreground">品質検査AI</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                全サービスを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}