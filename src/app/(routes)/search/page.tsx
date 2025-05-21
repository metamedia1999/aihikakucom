'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ServiceCard } from '@/components/cards/service-card'
import { SearchBarLive } from '@/components/search/search-bar-live'
import { StickyFilterBar } from '@/components/filter/sticky-filter-bar'
import { searchContent } from '@/lib/api/fetchers'
import { Service } from '@/types'

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
                <p className="text-muted-foreground">
                  「{query}」に一致する結果が見つかりませんでした。<br />
                  別のキーワードで検索してみてください。
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              検索キーワードを入力してください。<br />
              AIサービス名や機能、業界名などで検索できます。
            </p>
          </div>
        )}
      </div>
    </>
  )
}
