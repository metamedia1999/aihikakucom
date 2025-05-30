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
          className="w-full py-5 pl-14 pr-36 text-lg border-none rounded-full outline-none transition-all duration-300 text-neutral-800 placeholder:text-neutral-500"
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500">
          <Search className="h-5 w-5" />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">クリア</span>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-blue to-primary-dark text-white rounded-full px-8 py-3 font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!searchQuery.trim()}
        >
          検索する
        </button>
      </form>

      {/* 候補一覧 */}
      {showSuggestions && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl z-10 max-h-80 overflow-y-auto">
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
                    className="w-full text-left p-4 hover:bg-neutral-100 flex items-start transition-colors duration-200"
                    onClick={() => handleSuggestionClick(item.slug)}
                  >
                    <div className="relative h-10 w-10 mr-3 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
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
