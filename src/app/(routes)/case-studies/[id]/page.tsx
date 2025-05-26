import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MOCK_IMAGES } from '@/lib/constants'

interface CaseStudyPageProps {
  params: Promise<{
    id: string
  }>
}

const caseStudyData = {
  'case-1': {
    id: 'case-1',
    title: '株式会社ABCの業務効率化事例',
    company: '株式会社ABC',
    industry: '小売',
    description: 'AIアシスタントの導入により、カスタマーサポート業務の対応時間を50%削減。顧客満足度も15%向上しました。',
    image: MOCK_IMAGES.case1,
    challenge: '従来のカスタマーサポートでは、問い合わせ対応に多くの時間を要し、担当者の負荷が高い状況でした。また、営業時間外の対応ができないため、顧客満足度に課題がありました。',
    solution: 'ChatGPTベースのAIアシスタントを導入し、よくある質問への自動応答システムを構築。24時間365日の対応を実現し、複雑な問い合わせのみ人間のオペレーターが対応する体制に変更しました。',
    results: [
      '問い合わせ対応時間: 50%削減',
      '顧客満足度: 15%向上',
      '営業時間外対応率: 100%実現',
      'オペレーター負荷: 40%軽減'
    ],
    usedServices: ['ChatGPT API', 'AIチャットボット', 'カスタマーサポートAI']
  },
  'case-2': {
    id: 'case-2',
    title: 'XYZ製薬の研究開発効率化',
    company: 'XYZ製薬',
    industry: '製薬',
    description: 'AI分析ツールの活用により、新薬開発プロセスのデータ分析時間を70%短縮。研究者の創造的業務に集中できる環境を実現しました。',
    image: MOCK_IMAGES.case2,
    challenge: '新薬開発における膨大な実験データの解析に多大な時間を要し、研究者が本来の創造的な研究業務に集中できない状況でした。また、データの見落としによるリスクも懸念されていました。',
    solution: '機械学習を活用したデータ分析プラットフォームを導入。実験データの自動解析と異常値検出、パターン認識により、研究者の分析業務を大幅に効率化しました。',
    results: [
      'データ分析時間: 70%短縮',
      '研究効率: 3倍向上',
      '異常値検出精度: 95%以上',
      '新薬候補発見率: 2倍向上'
    ],
    usedServices: ['機械学習プラットフォーム', 'データ分析AI', '創薬支援AI']
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params
  const caseStudy = caseStudyData[id as keyof typeof caseStudyData]

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground">ホーム</a>
            <span>/</span>
            <span>導入事例</span>
            <span>/</span>
            <span>{caseStudy.company}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">{caseStudy.title}</h1>
            <span className="bg-secondary px-3 py-1 rounded text-sm">{caseStudy.industry}</span>
          </div>
          <div className="text-lg text-muted-foreground">{caseStudy.description}</div>
        </div>

        {/* メイン画像 */}
        <div className="relative h-80 rounded-lg overflow-hidden mb-12">
          {caseStudy.image && (
            <Image
              src={caseStudy.image || '/placeholder.svg'}
              alt={caseStudy.title || 'ケーススタディ画像'}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-8">
            {/* 課題 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">課題</h2>
              <div className="text-muted-foreground leading-relaxed">
                {caseStudy.challenge}
              </div>
            </section>

            {/* ソリューション */}
            <section>
              <h2 className="text-2xl font-bold mb-4">ソリューション</h2>
              <div className="text-muted-foreground leading-relaxed">
                {caseStudy.solution}
              </div>
            </section>

            {/* 結果・成果 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">結果・成果</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-secondary/20 p-4 rounded-lg">
                    <div className="font-medium text-primary">{result}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 企業情報 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-4">企業情報</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">企業名</span>
                  <div className="font-medium">{caseStudy.company}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">業界</span>
                  <div className="font-medium">{caseStudy.industry}</div>
                </div>
              </div>
            </div>

            {/* 利用サービス */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-4">利用AIサービス</h3>
              <div className="space-y-2">
                {caseStudy.usedServices.map((service, index) => (
                  <div key={index} className="text-sm bg-secondary px-3 py-2 rounded">
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="font-bold mb-2">無料診断のご案内</h3>
              <div className="text-sm text-muted-foreground mb-4">
                あなたの企業にも最適なAIソリューションを見つけませんか？
              </div>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                無料診断を申し込む
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}