import Image from 'next/image'
import { MOCK_IMAGES } from '@/lib/constants'

export default function CaseStudiesSection() {
  // モック導入事例データ
  const caseStudies = [
    {
      id: 'case-1',
      title: '株式会社ABCの業務効率化事例',
      description: 'AIアシスタントの導入により、カスタマーサポート業務の対応時間を50%削減。顧客満足度も15%向上しました。',
      image: MOCK_IMAGES.case1,
      company: '株式会社ABC',
      industry: '小売'
    },
    {
      id: 'case-2',
      title: 'XYZ製薬の研究開発効率化',
      description: 'AI分析ツールの活用により、新薬開発プロセスのデータ分析時間を70%短縮。研究者の創造的業務に集中できる環境を実現しました。',
      image: MOCK_IMAGES.case2,
      company: 'XYZ製薬',
      industry: '製薬'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">導入事例</h2>
          <div className="text-muted-foreground max-w-2xl mx-auto">
            AIサービスを導入した企業の成功事例をご紹介します。
            業務効率化や売上向上など、具体的な成果をご覧ください。
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => (
            <a key={caseStudy.id} href={`/case-studies/${caseStudy.id}`} className="case-study-card border rounded-md bg-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <Image
                  src={caseStudy.image || '/placeholder.jpg'}
                  alt={caseStudy.title || '導入事例画像'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{caseStudy.company}</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">{caseStudy.industry}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{caseStudy.title}</h3>
                <div className="text-sm text-muted-foreground">{caseStudy.description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
