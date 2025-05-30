'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Search } from 'lucide-react'

export function HeroSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const encodedQuery = encodeURIComponent(searchQuery)
    router.push(`/search?q=${encodedQuery}`)
  }

  return (
    <form onSubmit={handleSubmit} className="hero-search">
      <input
        type="search"
        placeholder="AIサービスを検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="hero-search-input"
      />
      <button
        type="submit"
        className="hero-search-button"
        disabled={!searchQuery.trim()}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">検索</span>
      </button>
    </form>
  )
}
