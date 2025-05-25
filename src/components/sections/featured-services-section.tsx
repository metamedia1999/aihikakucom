import { ServiceCard } from '@/components/cards/service-card'

interface FeaturedServicesSectionProps {
  services: any[]
}

export function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">おすすめAIサービス</h2>
          <div className="text-muted-foreground max-w-2xl mx-auto">
            中小企業の業務効率化に役立つAIサービスをご紹介します。
            各サービスの詳細ページで機能や料金を比較検討できます。
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/services" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            すべてのサービスを見る
          </a>
        </div>
      </div>
    </section>
  )
}
