import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_LOGO } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
// import { Industry, Service } from '@/types'
// import { CircularProgressbar } from 'react-circular-progressbar'
// import 'react-circular-progressbar/dist/styles.css'

interface ServiceCardProps {
  service: any
  featured?: boolean
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const {
    slug,
    title,
    excerpt,
    serviceFields,
    industries,
  } = service

  const logoUrl = serviceFields?.logo?.sourceUrl || DEFAULT_LOGO
  
  // KPI値の取得 (モックデータを使用)
  const costTier = Math.floor(Math.random() * 5) + 1
  const aiRate = Math.floor(Math.random() * 100)
  const effectTime = ['week', 'month', 'quarter'][Math.floor(Math.random() * 3)]
  const supportRating = Math.floor(Math.random() * 5) + 1

  // 効果時間表示用のヘルパー
  const getEffectTimeText = (type: string) => {
    switch(type) {
      case 'week': return '1-2週間';
      case 'month': return '1ヶ月程度';
      case 'quarter': return '3ヶ月以上';
      default: return '要確認';
    }
  }

  // コストティア用のヘルパー関数
  const renderCostTier = (tier: number) => {
    return '¥'.repeat(tier);
  }

  // サポート評価用のヘルパー関数
  const renderSupportRating = (rating: number) => {
    return '★'.repeat(rating);
  }

  // KPI値をリスト化
  const kpiList = [
    { label: '料金帯', value: renderCostTier(costTier) },
    { label: 'AI活用率', value: `${aiRate}%` },
    { label: '効果実感', value: getEffectTimeText(effectTime) },
    { label: 'サポート', value: renderSupportRating(supportRating) },
  ]

  return (
    <Link href={`/service/${slug}`}>
      <div className="service-card border rounded-md bg-white hover:shadow transition-shadow duration-150 h-full overflow-hidden">
        <div className="p-4 flex items-start space-x-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-secondary">
            <Image
              src={logoUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold leading-tight">{title}</h3>
            {serviceFields?.price && (
              <p className="text-xs text-muted-foreground">
                料金: {serviceFields.price}
              </p>
            )}
            {industries?.nodes && industries.nodes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {industries.nodes.map((industry: any) => (
                  <Badge key={industry.id} variant="secondary" className="text-[10px]">
                    {industry.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KPI Badges */}
        <div className="px-4 pb-2">
          <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-b py-2 my-2">
            {kpiList.map((kpi, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{kpi.label}:</span>
                <span className="font-medium">{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          
          {/* Transparency Score - 円グラフを使わない代替表示 */}
          <div className="mt-2 text-xs text-right">
            <span className="text-muted-foreground">透明性スコア: </span>
            <span className="font-medium text-blue-500">{Math.floor(Math.random() * 100)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
