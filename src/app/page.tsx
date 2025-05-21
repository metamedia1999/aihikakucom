// src/app/page.tsx

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI比較.com',
  description: '中小企業向けAIBPOサービスを比較・検討できるプラットフォーム',
}

export default function HomePage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">AI比較.com</h1>
      <p className="text-lg mb-8">中小企業向けAIBPOサービスを比較・検討できるプラットフォームです。</p>
      <p className="text-muted-foreground">このページは現在メンテナンス中です。</p>
    </div>
  )
}
