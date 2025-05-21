import Link from 'next/link'
import Image from 'next/image'
import { MOCK_IMAGES } from '@/lib/constants'

export function IndustriesSection() {
  // モック業界データ
  const industries = [
    { id: 'industry-1', name: '金融', slug: 'finance', image: MOCK_IMAGES.industry1 },
    { id: 'industry-2', name: '製造', slug: 'manufacturing', image: MOCK_IMAGES.industry2 },
    { id: 'industry-3', name: '製薬', slug: 'pharma', image: MOCK_IMAGES.industry3 },
    { id: 'industry-4', name: '小売', slug: 'retail', image: MOCK_IMAGES.industry4 }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">業界別AIソリューション</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            各業界に特化したAIソリューションをご紹介します。
            あなたの業界に最適なAIサービスを見つけましょう。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industry/${industry.slug}`}>
              <div className="industry-card relative h-48 rounded-md overflow-hidden group">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{industry.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
