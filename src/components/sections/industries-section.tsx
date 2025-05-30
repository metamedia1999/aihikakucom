import Link from 'next/link'
import Image from 'next/image'
import { MOCK_IMAGES } from '@/lib/constants'

interface IndustriesSectionProps {
  solutions?: any[]
}

export default function IndustriesSection({ solutions = [] }: IndustriesSectionProps) {
  // フォールバック用のモック業界データ（サービス数付き）
  const defaultIndustries = [
    { id: 'industry-1', name: '金融', slug: 'finance', image: MOCK_IMAGES.industry1, serviceCount: 0 },
    { id: 'industry-2', name: '製造', slug: 'manufacturing', image: MOCK_IMAGES.industry2, serviceCount: 0 },
    { id: 'industry-3', name: '製薬', slug: 'pharma', image: MOCK_IMAGES.industry3, serviceCount: 0 },
    { id: 'industry-4', name: '小売', slug: 'retail', image: MOCK_IMAGES.industry4, serviceCount: 0 }
  ];

  // WordPressからのデータがある場合はそれを使用、ない場合はデフォルトを使用
  const industries = solutions.length > 0 
    ? solutions.map(solution => ({
        id: solution.id,
        name: solution.name || solution.industrySolutionFields?.targetIndustry || solution.title,
        slug: solution.slug,
        image: solution.image || solution.featuredImage?.node?.sourceUrl || MOCK_IMAGES.industry1,
        description: solution.description || solution.content || '',
        serviceCount: solution.serviceCount || 0
      }))
    : defaultIndustries;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">業界別AIソリューション</h2>
          <div className="text-muted-foreground max-w-2xl mx-auto">
            各業界に特化したAIソリューションをご紹介します。
            あなたの業界に最適なAIサービスを見つけましょう。
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industry/${industry.slug}`}>
              <div className="industry-card relative h-48 rounded-md overflow-hidden group">
                <Image
                  src={industry.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format'}
                  alt={industry.name || '業界ソリューション画像'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                  <h3 className="text-white text-xl font-bold mb-2">{industry.name}</h3>
                  {industry.serviceCount > 0 && (
                    <p className="text-white/90 text-sm">
                      {industry.serviceCount}件のサービス
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
