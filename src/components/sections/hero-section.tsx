import { SearchBarLive } from '@/components/search/search-bar-live'

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI技術で仕事を効率化
          </h1>
          <div className="text-xl text-muted-foreground mb-8">
            中小企業向けAIBPOサービスを比較・検討できるプラットフォーム。<br />
            業務効率化に最適なAIサービスを見つけましょう。
          </div>
          
          {/* 検索バー */}
          <div className="hero-search max-w-2xl mx-auto">
            <SearchBarLive />
          </div>
        </div>
      </div>
    </section>
  )
}
