'use client'

import Link from 'next/link'
import { DEFAULT_LOGO } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { stripHtml, getServiceImage } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface ServiceCardProps {
  service: any
  featured?: boolean
  index?: number
}

// サービスロゴの背景色設定
const serviceLogoColors: { [key: string]: string } = {
  'chatgpt': 'linear-gradient(135deg, #10a37f 0%, #0d8f6f 100%)',
  'canva': 'linear-gradient(135deg, #00c4cc 0%, #00a8b0 100%)',
  'dalle': 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
  'firefly': 'linear-gradient(135deg, #ff4500 0%, #ff6347 100%)',
  'stable': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  'midjourney': 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
}

export function ServiceCard({ service, featured = false, index = 0 }: ServiceCardProps) {
  
  const {
    slug,
    title,
    excerpt,
    serviceFields,
    industries,
  } = service

  const logoUrl = getServiceImage(service)
  
  // 評価スコア (実際のデータがない場合のモック)
  const rating = serviceFields?.rating || '4.4'
  
  // サービスタグを決定
  const tags: { label: string; type: string }[] = []
  if (serviceFields?.featured || featured) tags.push({ label: '人気', type: 'popular' })
  if (serviceFields?.isFree) tags.push({ label: '無料', type: 'free' })
  if (serviceFields?.isSecure) tags.push({ label: '安心', type: 'safe' })
  if (serviceFields?.isHighQuality) tags.push({ label: '高品質', type: 'quality' })

  const getLogoStyle = (slug: string) => {
    const lowerSlug = slug.toLowerCase()
    return serviceLogoColors[lowerSlug] || 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/service/${slug}`}>
        <div className="bg-white border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300 h-full overflow-hidden hover:border-primary-blue hover:-translate-y-1 group">
          <div className="p-6">
            {/* ヘッダー部分 */}
            <div className="flex items-start space-x-4 mb-4">
              <div 
                className="relative h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105"
                style={{ background: getLogoStyle(slug) }}
              >
                {title?.charAt(0) || 'S'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-neutral-900 line-clamp-1 group-hover:text-primary-blue transition-colors">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(Number(rating)) ? 'fill-warning-yellow text-warning-yellow' : 'fill-neutral-300 text-neutral-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600">({rating})</span>
                </div>
              </div>
            </div>

            {/* 説明文 */}
            <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
              {stripHtml(excerpt || '') || 'AIを活用した革新的なサービスです。'}
            </p>

            {/* タグ */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border
                      ${tag.type === 'popular' ? 'bg-warning-yellow/10 text-yellow-800 border-warning-yellow/30' : ''}
                      ${tag.type === 'safe' ? 'bg-success-green/10 text-green-800 border-success-green/30' : ''}
                      ${tag.type === 'free' ? 'bg-primary-light text-primary-blue border-primary-blue/30' : ''}
                      ${tag.type === 'quality' ? 'bg-accent-orange/10 text-orange-800 border-accent-orange/30' : ''}
                      ${!tag.type ? 'bg-neutral-100 text-neutral-700 border-neutral-200' : ''}
                    `}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}

            {/* ボタン */}
            <button className="w-full py-3 px-4 border-2 border-primary-blue text-primary-blue rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-primary-blue hover:text-white hover:transform hover:translate-y-[-1px]">
              詳細を見る
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
