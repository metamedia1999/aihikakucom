import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'
import { ServiceCard } from '@/components/cards/service-card'
import { SearchBarLive } from '@/components/search/search-bar-live'
import { StickyFilterBar } from '@/components/filter/sticky-filter-bar'
import { getServices } from '@/lib/api/fetchers'

export const metadata: Metadata = {
  title: `サービス一覧 | ${SITE_NAME}`,
  description: 'AIBPOサービスの一覧。中小企業の業務効率化に最適なAIサービスを比較・検討できます。',
}

// 10分間隔でページを再生成
export const revalidate = 600

export default async function ServicesPage() {
  try {
    // 新しいデータフェッチャーを使用
    const services = await getServices()

    return (
      <>
        {/* スクロールで表示されるフィルターバー */}
        <StickyFilterBar taskFacet="business_issues" industryFacet="industries" />

        <div className="container-wide py-12">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl font-bold mb-6">AIサービス一覧</h1>

            {/* 検索バー */}
            <div className="hero-search">
              <SearchBarLive />
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              業務課題や業界から最適なAIサービスを見つけましょう
            </p>
          </div>

          {/* サービス一覧 */}
          {services && services.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {services.length}件のAIサービスが見つかりました
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">サービスを読み込み中</h2>
                <p className="text-muted-foreground mb-6">
                  AIサービスの情報を取得しています。<br />
                  しばらくお待ちください。
                </p>
                
                {/* 基本的なサービス情報を表示 */}
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">AI Assistant Pro</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      月額50,000円〜 | 業務自動化・効率化
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">Smart Data Analyzer</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      月額100,000円〜 | データ分析・予測
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">AI Document Processor</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      従量課金制 | 文書処理・データ抽出
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-secondary rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">お探しのサービスが見つかりませんか？</h2>
            <p className="text-muted-foreground mb-6">
              AI比較.comでは、随時新しいAIサービスを追加しています。<br />
              掲載して欲しいサービスがありましたら、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Failed to load services page:', error);
    return (
      <div className="container-wide py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">サービス一覧</h1>
          <div className="bg-secondary/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">サービス情報を準備中</h2>
            <p className="text-muted-foreground mb-8">
              AIサービスの最新情報を取得しています。<br />
              少々お待ちください。
            </p>
            
            {/* 緊急時の基本情報 */}
            <div className="grid gap-4 text-left max-w-md mx-auto">
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">AI Assistant Pro</h3>
                <p className="text-sm text-muted-foreground">多機能AIアシスタント</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">Smart Data Analyzer</h3>
                <p className="text-sm text-muted-foreground">データ分析AI</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">AI Document Processor</h3>
                <p className="text-sm text-muted-foreground">文書処理AI</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                詳細についてお問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}