'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export function Search() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const encodedQuery = encodeURIComponent(searchQuery)
    router.push(`/search?q=${encodedQuery}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex items-center">
      <Input
        type="search"
        placeholder="AIサービスを検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 w-full"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
        disabled={!searchQuery.trim()}
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">検索</span>
      </Button>
    </form>
  )
}
