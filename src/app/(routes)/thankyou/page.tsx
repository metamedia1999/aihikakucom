'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/cards/service-card'
import { useEffect, useState } from 'react'
import { getHomeData } from '@/lib/api/fetchers'
import type { Service } from '@/types'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('lead') || ''
  const [recommendedServices, setRecommendedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendedServices() {
      try {
        // 実際の実装ではleadIdを元に最適なサービスを取得
        // ここではダミーとしてトップのサービスから3つを表示
        const { services } = await getHomeData()
        setRecommendedServices(services.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch recommended services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedServices()
  }, [leadId])

  return (
    <div className="container-wide py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">お問い合わせありがとうございます</h1>
        <p className="text-muted-foreground">
          AI診断の情報を受け付けました。担当者が内容を確認し、最適なAIサービスのご提案を48時間以内にメールでお送りします。
          {leadId && <span className="block mt-2 text-sm">お問い合わせID: {leadId}</span>}
        </p>
      </div>

      <div className="bg-secondary/30 rounded-lg p-8 mb-12">
        <h2 className="text-xl font-bold mb-6 text-center">あなたにおすすめのAIサービス</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-pulse">データを読み込み中...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="mb-4 text-muted-foreground">
          その他のご質問やご要望がございましたら、お気軽にお問い合わせください。
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">ホームに戻る</Link>
          </Button>
          <Button asChild>
            <Link href="/services">サービス一覧を見る</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
