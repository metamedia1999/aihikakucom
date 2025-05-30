'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ServiceCard } from '@/components/cards/service-card'
import { SearchBarLive } from '@/components/search/search-bar-live'
import { StickyFilterBar } from '@/components/filter/sticky-filter-bar'
import { searchContent } from '@/lib/api/fetchers'
import type { Service } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setServices([])
        return
      }

      setIsLoading(true)
      try {
        const results = await searchContent(query)
        // サービスと記事を一緒に表示する
        setServices([...results.services, ...results.posts])
      } catch (error) {
        console.error('Search failed:', error)
        // エラー時は空の結果を設定
        setServices([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  return (
    <>
      {/* スクロールで表示されるフィルターバー */}
      <StickyFilterBar taskFacet="business_issues" industryFacet="industries" />

      <div className="container-wide py-12">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold mb-6">検索結果</h1>

          {/* 検索バー */}
          <div className="hero-search">
            <SearchBarLive />
          </div>
        </div>

        {query ? (
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-medium">
                「{query}」の検索結果 <span className="text-muted-foreground">（{services.length}件）</span>
              </h2>
            </div>

            {isLoading ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin mr-2">⏳</div>
                <p className="text-muted-foreground">検索結果を読み込んでいます...</p>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-4">検索結果が見つかりません</h3>
                  <p className="text-muted-foreground mb-6">
                    「{query}」に一致する結果が見つかりませんでした。<br />
                    別のキーワードで検索してみてください。
                  </p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>検索のヒント：</p>
                    <ul className="text-left space-y-1">
                      <li>• 「AI」「データ分析」「自動化」などのキーワード</li>
                      <li>• 「金融」「製薬」「製造」などの業界名</li>
                      <li>• 「効率化」「BPO」「アシスタント」など</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">AIサービスを検索</h3>
              <p className="text-muted-foreground mb-6">
                検索キーワードを入力してください。<br />
                AIサービス名や機能、業界名などで検索できます。
              </p>
              
              <div className="grid gap-3 text-sm">
                <div className="p-3 bg-secondary/50 rounded border">
                  <span className="font-medium">人気の検索キーワード</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-background rounded text-xs">AI</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">データ分析</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">自動化</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
