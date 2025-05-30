'use client'

import { SearchBarLive } from '@/components/search/search-bar-live'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-primary-light to-white overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-[-50%] right-[-25%] w-1/2 h-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 204, 0.05) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-wide relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 leading-tight tracking-tight"
          >
            AIサービス選びに疲れたあなたへ
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed"
          >
            個人・中小企業向けAIサービス・AI・BPOサービスを比較・検討できるプラットフォーム。<br />
            業務効率化に最適なAIサービスを見つけましょう。
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-[600px] mx-auto mb-12"
          >
            <div className="relative bg-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl border-2 border-neutral-200 focus-within:border-primary-blue focus-within:shadow-blue">
              <SearchBarLive />
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-blue mb-1">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <div className="text-sm text-neutral-600">導入企業数</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-blue mb-1">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-sm text-neutral-600">AIサービス数</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-blue mb-1">
                <AnimatedCounter value={50000} suffix="+" />
              </div>
              <div className="text-sm text-neutral-600">月間利用者数</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
