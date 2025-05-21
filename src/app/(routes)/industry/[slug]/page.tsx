// import type { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import { getIndustryData } from '@/lib/api/fetchers'
// import { INDUSTRIES, SITE_NAME } from '@/lib/constants'
// import { ServiceCard } from '@/components/cards/service-card'
// import { Separator } from '@/components/ui/separator'

// // 10 分間隔でページを再生成
// export const revalidate = 600

// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   const industry = INDUSTRIES.find(i => i.slug === params.slug)
//   if (!industry) {
//     return {
//       title: '業界が見つかりません',
//     }
//   }

//   return {
//     title: `${industry.name}業界のAIサービス一覧`,
//     description: industry.description,
//     openGraph: {
//       title: `${industry.name}業界向けAIサービス | ${SITE_NAME}`,
//       description: industry.description,
//     },
//   }
// }

// export default async function IndustryPage({ params }: any) {
//   try {
//     const { industry, services } = await getIndustryData(params.slug)

//     const industryData = INDUSTRIES.find(i => i.slug === params.slug)
//     const icon = industryData?.icon || '🔍'

//     return (
//       <div className="container-wide py-12">
//         {/* ヘッダー部分 */}
//         <div className="mb-12">
//           <div className="flex items-center mb-4">
//             <div className="text-4xl mr-4">{icon}</div>
//             <h1 className="text-3xl md:text-4xl font-bold">{industry.name}業界</h1>
//           </div>
//           <div className="text-lg text-muted-foreground max-w-3xl">
//             {industry.description || `${industry.name}業界向けのAIBPOサービスを見つけましょう。`}
//           </div>
//         </div>

//         <Separator className="mb-12" />

//         {/* サービス一覧 */}
//         {services && services.length > 0 ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-8">{industry.name}業界向けサービス一覧</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {services.map((service) => (
//                 <ServiceCard key={service.id} service={service} />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold mb-4">現在登録されているサービスはありません</h2>
//             <p className="text-muted-foreground">
//               現在{industry.name}業界向けのサービスは登録されていません。<br />
//               また後ほどお試しください。
//             </p>
//           </div>
//         )}
//       </div>
//     )
//   } catch (error) {
//     console.error('Failed to load industry page:', error)
//     notFound()
//   }
// }


import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '業界ページ',
  description: '業界ページ',
}

export default function Page() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">業界ページ</h1>
      <p className="mt-4">このページは現在メンテナンス中です。</p>
    </div>
  )
}