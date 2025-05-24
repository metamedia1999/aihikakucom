// import { Metadata } from 'next'
// import Link from 'next/link'
// import Image from 'next/image'
// import { SITE_NAME, MOCK_IMAGES } from '@/lib/constants'
// import { ServiceCard } from '@/components/cards/service-card'
// import { CategoryCard } from '@/components/cards/category-card'
// import { SearchBarLive } from '@/components/search/search-bar-live'
// import { HeroSection } from '@/components/sections/hero-section'
// import { IndustriesSection } from '@/components/sections/industries-section'
// import { FeaturedServicesSection } from '@/components/sections/featured-services-section'
// import { CaseStudiesSection } from '@/components/sections/case-studies-section'
// import { CTASection } from '@/components/sections/cta-section'

// export const metadata: Metadata = {
//   title: SITE_NAME,
//   description: '中小企業向けAIBPOサービスを比較・検討できるプラットフォーム。業務効率化に最適なAIサービスを見つけましょう。',
// }

// // 10分間隔でページを再生成
// export const revalidate = 600

// // モックカテゴリーデータ
// const categories = [
//   {
//     id: 'cat-1',
//     title: '業務効率化',
//     description: '定型業務の自動化やワークフローの最適化',
//     icon: '⚡',
//     slug: 'efficiency'
//   },
//   {
//     id: 'cat-2',
//     title: 'データ分析',
//     description: 'ビジネスデータからの洞察抽出と意思決定支援',
//     icon: '📊',
//     slug: 'data-analysis'
//   },
//   {
//     id: 'cat-3',
//     title: '顧客対応',
//     description: 'カスタマーサポートや問い合わせ対応の自動化',
//     icon: '💬',
//     slug: 'customer-support'
//   },
//   {
//     id: 'cat-4',
//     title: '文書処理',
//     description: '書類やテキストの自動処理・分析・要約',
//     icon: '📄',
//     slug: 'document-processing'
//   },
//   {
//     id: 'cat-5',
//     title: '画像認識',
//     description: '画像や映像からの情報抽出と分析',
//     icon: '🔍',
//     slug: 'image-recognition'
//   },
//   {
//     id: 'cat-6',
//     title: '予測分析',
//     description: '過去データからの将来予測とリスク分析',
//     icon: '🔮',
//     slug: 'predictive-analytics'
//   }
// ];

// // モックサービスデータ
// const featuredServices = [
//   {
//     id: 'service-1',
//     slug: 'ai-assistant-pro',
//     title: 'AI Assistant Pro',
//     excerpt: 'あらゆるビジネスシーンで活躍する多機能AIアシスタント。',
//     content: '<p>AI Assistant Proの詳細説明</p>',
//     serviceFields: {
//       price: '月額50,000円〜',
//       logo: {
//         sourceUrl: MOCK_IMAGES.service1
//       }
//     },
//     industries: {
//       nodes: [
//         {
//           id: 'industry-1',
//           name: '金融',
//           slug: 'finance'
//         },
//         {
//           id: 'industry-2',
//           name: '製造',
//           slug: 'manufacturing'
//         }
//       ]
//     }
//   },
//   {
//     id: 'service-2',
//     slug: 'smart-data-analyzer',
//     title: 'Smart Data Analyzer',
//     excerpt: '大量のデータから有益な洞察を抽出するAI分析ツール。',
//     content: '<p>Smart Data Analyzerの詳細説明</p>',
//     serviceFields: {
//       price: '初期費用200,000円 + 月額100,000円〜',
//       logo: {
//         sourceUrl: MOCK_IMAGES.service2
//       }
//     },
//     industries: {
//       nodes: [
//         {
//           id: 'industry-1',
//           name: '金融',
//           slug: 'finance'
//         },
//         {
//           id: 'industry-3',
//           name: '製薬',
//           slug: 'pharma'
//         }
//       ]
//     }
//   },
//   {
//     id: 'service-3',
//     slug: 'ai-document-processor',
//     title: 'AI Document Processor',
//     excerpt: '書類の自動認識・データ抽出を行うAIソリューション。',
//     content: '<p>AI Document Processorの詳細説明</p>',
//     serviceFields: {
//       price: 'ドキュメント処理量に応じた従量課金制',
//       logo: {
//         sourceUrl: MOCK_IMAGES.service3
//       }
//     },
//     industries: {
//       nodes: [
//         {
//           id: 'industry-2',
//           name: '製造',
//           slug: 'manufacturing'
//         }
//       ]
//     }
//   }
// ];

// export default function HomePage() {
//   try {
//     return (
//       <>
//         {/* ヒーローセクション */}
//         <HeroSection />

//         {/* カテゴリーセクション */}
//         <section className="py-16 bg-background">
//           <div className="container-wide">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">あなたの悩みから最適なAIサービスを見つける</h2>
//               <p className="text-muted-foreground max-w-2xl mx-auto">
//                 業務課題に合わせて、最適なAIサービスをご紹介します。
//                 各カテゴリーから、あなたのビジネスに最適なソリューションを見つけましょう。
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {categories.map((category) => (
//                 <CategoryCard key={category.id} category={category} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* おすすめサービスセクション */}
//         <FeaturedServicesSection services={featuredServices as any} />

//         {/* 業界別セクション */}
//         <IndustriesSection />

//         {/* 導入事例セクション */}
//         <CaseStudiesSection />

//         {/* CTAセクション */}
//         <CTASection />
//       </>
//     )
//   } catch (error) {
//     console.error('Failed to load home page:', error);
//     return (
//       <div className="container-wide py-12 text-center">
//         <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
//         <p className="text-muted-foreground">
//           ページの読み込み中にエラーが発生しました。<br />
//           しばらく経ってからもう一度お試しください。
//         </p>
//       </div>
//     );
//   }
// }
// import { Metadata } from 'next'
// import { SITE_NAME } from '@/lib/constants'
// import { getHomeServices } from '@/lib/api/fetchers'
// import { ServiceCard } from '@/components/cards/service-card'
// import { HeroSection } from '@/components/sections/hero-section'

// export const metadata: Metadata = {
//   title: SITE_NAME,
//   description: '中小企業向け AIBPO サービスを比較できるプラットフォーム',
// }

// export const revalidate = 600 // ISR

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

import { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { getHomeServices } from '@/lib/api/fetchers'
import { ServiceCard } from '@/components/cards/service-card'
import { HeroSection } from '@/components/sections/hero-section'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: '中小企業向け AIBPO サービスを比較できるプラットフォーム',
}

export const revalidate = 600 // ISR 10 分

export default async function HomePage() {
  const services = await getHomeServices()

  return (
    <>
      <HeroSection />

      <section className="container-wide py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">最新 AI サービス一覧</h2>

        {services.length === 0 ? (
          <p className="text-center text-muted-foreground">サービス記事がまだありません。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard key={svc.id} service={svc as any} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}