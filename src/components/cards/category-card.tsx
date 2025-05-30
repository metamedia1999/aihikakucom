'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  category: {
    id: string
    title: string
    description: string
    icon: string
    slug: string
  }
  index?: number
}

// カテゴリー別の色設定（紫を排除）
const categoryColors: { [key: string]: { bg: string; color: string } } = {
  'ai-efficiency': { bg: '#FEF3C7', color: '#F59E0B' }, // 業務効率化
  'ai-analysis': { bg: '#E6F2FF', color: '#0066CC' }, // データ分析
  'ai-support': { bg: '#D1FAE5', color: '#38A169' }, // 顧客対応
  'ai-document': { bg: '#EDF2F7', color: '#718096' }, // 文書処理
  'ai-image': { bg: '#FED7AA', color: '#FF6B35' }, // 画像処理
  'ai-prediction': { bg: '#DBEAFE', color: '#3B82F6' }, // 予測分析（紫→青に変更）
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const { title, description, icon, slug } = category
  const colors = categoryColors[slug] || { bg: '#F7FAFC', color: '#4A5568' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/search?category=${slug}`}>
        <div className="relative bg-white border border-neutral-200 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary-blue hover:-translate-y-1 cursor-pointer overflow-hidden group">
          <div className="flex flex-col items-center text-center">
            <div 
              className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: colors.bg, color: colors.color }}
            >
              {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900 group-hover:text-primary-blue transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
