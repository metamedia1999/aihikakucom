import Image from 'next/image'
import { MOCK_IMAGES } from '@/lib/constants'

export default function CaseStudiesSection() {
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
          <a href="/case-studies/case-1" className="case-study-card border rounded-md bg-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48">
              <Image
                src={MOCK_IMAGES.case1 || '/placeholder.jpg'}
                alt="株式会社ABCの業務効率化事例"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">株式会社ABC</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">小売</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">株式会社ABCの業務効率化事例</h3>
              <div className="text-sm text-muted-foreground">AIアシスタントの導入により、カスタマーサポート業務の対応時間を50%削減。顧客満足度も15%向上しました。</div>
            </div>
          </a>

          <a href="/case-studies/case-2" className="case-study-card border rounded-md bg-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48">
              <Image
                src={MOCK_IMAGES.case2 || '/placeholder.jpg'}
                alt="XYZ製薬の研究開発効率化"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">XYZ製薬</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">製薬</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">XYZ製薬の研究開発効率化</h3>
              <div className="text-sm text-muted-foreground">AI分析ツールの活用により、新薬開発プロセスのデータ分析時間を70%短縮。研究者の創造的業務に集中できる環境を実現しました。</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
