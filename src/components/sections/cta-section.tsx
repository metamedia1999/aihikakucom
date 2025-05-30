'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-light to-blue-50 relative overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            簡単AI診断で最適サービスを探す
          </h2>
          <p className="text-lg text-neutral-600 mb-10">
            5つの質問に答えるだけで、あなたのビジネスに最適なAIサービスをご提案します
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #E53E3E 100%)'
                }}
              >
                無料診断スタート
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-primary-blue bg-white border-2 border-primary-blue rounded-lg shadow-sm transition-all duration-300 hover:bg-primary-blue hover:text-white hover:shadow-md hover:-translate-y-0.5"
              >
                全てのサービスを見る
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
