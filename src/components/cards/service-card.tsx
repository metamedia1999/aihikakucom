import Link from 'next/link'
import { DEFAULT_LOGO } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { stripHtml, getServiceImage } from '@/lib/utils'

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

  const logoUrl = getServiceImage(service)
  
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
      <div className="service-card border rounded-lg bg-card hover:shadow-lg transition-all duration-200 h-full overflow-hidden group">
        <div className="p-4 sm:p-6 flex items-start space-x-3 sm:space-x-4">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
            <ImageWithFallback
              src={logoUrl}
              alt={title || 'サービスロゴ'}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 48px, 64px"
              fallbackType="service"
            />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-semibold leading-tight text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
            {serviceFields?.price && (
              <div className="text-xs text-muted-foreground truncate">
                料金: {serviceFields.price}
              </div>
            )}
            {industries?.nodes && industries.nodes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {industries.nodes.slice(0, 2).map((industry: any) => (
                  <Badge key={industry.id} variant="secondary" className="text-[10px] px-2 py-0.5">
                    {industry.name}
                  </Badge>
                ))}
                {industries.nodes.length > 2 && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                    +{industries.nodes.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* KPI Badges */}
        <div className="px-4 sm:px-6 pb-2">
          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] border-t border-b py-2 my-2">
            {kpiList.map((kpi, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground truncate">{kpi.label}:</span>
                <span className="font-medium ml-1">{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-4">
          <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">{stripHtml(excerpt || '')}</div>
          
          {/* Transparency Score - 円グラフを使わない代替表示 */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">透明性スコア</span>
            <div className="flex items-center space-x-1">
              <div className="w-8 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                />
              </div>
              <span className="font-medium text-primary">{Math.floor(Math.random() * 100)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
