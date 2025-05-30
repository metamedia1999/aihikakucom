'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Industry } from '@/types'
import { INDUSTRIES } from '@/lib/constants'
import { stripHtml } from '@/lib/utils'
import { motion } from 'framer-motion'

interface IndustryCardProps {
  industry: Industry
  index?: number
}

// 業界別のグラデーション設定（紫を排除）
const industryGradients: { [key: string]: string } = {
  'finance': 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
  'manufacturing': 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)',
  'retail': 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
  'healthcare': 'linear-gradient(135deg, #FF6B35 0%, #E53E3E 100%)',
  'education': 'linear-gradient(135deg, #F6AD55 0%, #F59E0B 100%)',
  'logistics': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
}

export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const { slug, name, description } = industry

  // constants.tsから追加情報を取得
  const industryData = INDUSTRIES.find(i => i.slug === slug)
  const icon = industryData?.icon || '🔍'
  const gradient = industryGradients[slug] || 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/industry/${slug}`}>
        <div className="relative h-60 rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
          {/* 背景グラデーション */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ background: gradient }}
          />
          
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 transition-all duration-300 group-hover:to-black/50" />
          
          {/* コンテンツ */}
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-8 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <h3 className="text-2xl font-bold mb-3 text-shadow-md">
              {name}
            </h3>
            <p className="text-sm opacity-95 leading-relaxed text-shadow">
              {stripHtml(description || `${name}業界向けのAIサービスで業務を革新`)}
            </p>
            
            {/* ホバー時に表示される矢印 */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
