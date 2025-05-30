'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, type FormEvent, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { searchContent } from '@/lib/api/fetchers'
import type { Service } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_LOGO } from '@/lib/constants'
import { stripHtml } from '@/lib/utils'

// プレースホルダーのローテーション用テキスト
const PLACEHOLDER_TEXTS = [
  "請求書を自動化したい",
  "医療データをAIで整理したい",
  "顧客対応をチャットボット化したい",
  "AIで議事録を作成したい",
  "画像認識で検品したい",
  "データ分析を自動化したい"
]

export function SearchBarLive() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Service[]>([])
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_TEXTS[0])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // プレースホルダーを定期的に切り替える
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % PLACEHOLDER_TEXTS.length
      setPlaceholder(PLACEHOLDER_TEXTS[currentIndex])
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // 検索クエリが変更されたときに候補を取得
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const results = await searchContent(searchQuery)
        // サービスと記事を結合して最大5件まで表示
        setSuggestions([...results.services, ...results.posts].slice(0, 5))
      } catch (error) {
        // エラーが発生してもユーザーには表示しない
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // 検索フォームの送信処理
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setShowSuggestions(false)
    const encodedQuery = encodeURIComponent(searchQuery)
    router.push(`/search?q=${encodedQuery}`)
  }

  // 候補をクリックしたときの処理
  const handleSuggestionClick = (slug: string) => {
    setShowSuggestions(false)
    router.push(`/service/${slug}`)
  }

  // クリアボタンをクリックしたときの処理
  const handleClear = () => {
    setSearchQuery('')
    setSuggestions([])
  }

  // 画面の外側をクリックしたときに候補を閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="hero-search-input pl-12"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">クリア</span>
          </button>
        )}
        <button
          type="submit"
          className="hero-search-button"
          disabled={!searchQuery.trim()}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">検索</span>
        </button>
      </form>

      {/* 候補一覧 */}
      {showSuggestions && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              <span className="inline-block animate-spin mr-2">⏳</span>
              候補を読み込み中...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((item) => (
                <li key={item.id} className="border-b last:border-b-0">
                  <button
                    className="w-full text-left p-3 hover:bg-secondary flex items-start"
                    onClick={() => handleSuggestionClick(item.slug)}
                  >
                    <div className="relative h-10 w-10 mr-3 shrink-0 overflow-hidden rounded bg-secondary">
                      <Image
                        src={item.serviceFields?.logo?.sourceUrl || DEFAULT_LOGO}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                        loading="eager"
                        quality={60}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{stripHtml(item.excerpt || '')}</div>
                    </div>
                  </button>
                </li>
              ))}
              <li className="p-2 bg-secondary/50">
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="block w-full text-center text-sm text-primary hover:underline"
                >
                  「{searchQuery}」の検索結果をすべて表示
                </Link>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              候補が見つかりませんでした
            </div>
          )}
        </div>
      )}
    </div>
  )
}
