'use client'

import { useEffect, useState } from 'react'
import { BUSINESS_ISSUES, INDUSTRIES } from '@/lib/constants'
import { Filter, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter, usePathname } from 'next/navigation'

interface StickyFilterBarProps {
  taskFacet?: string
  industryFacet?: string
}

export function StickyFilterBar({ taskFacet, industryFacet }: StickyFilterBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [activeIssue, setActiveIssue] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // スクロール量に応じて表示/非表示を切り替え
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 120)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // フィルターが変更されたときの処理
  const handleFilterChange = (type: 'industry' | 'issue', value: string) => {
    if (type === 'industry') {
      if (activeIndustry === value) {
        setActiveIndustry(null)
      } else {
        setActiveIndustry(value)
        setActiveIssue(null) // 業界を選んだら課題はリセット
      }
    } else {
      if (activeIssue === value) {
        setActiveIssue(null)
      } else {
        setActiveIssue(value)
        setActiveIndustry(null) // 課題を選んだら業界はリセット
      }
    }
  }

  // フィルター条件で検索
  const handleSearch = () => {
    let searchQuery = ''

    if (activeIndustry) {
      const industry = INDUSTRIES.find(i => i.slug === activeIndustry)
      if (industry) searchQuery = industry.name
    }

    if (activeIssue) {
      const issue = BUSINESS_ISSUES.find(i => i.id === activeIssue)
      if (issue) searchQuery = issue.searchTerm
    }

    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // 現在のパスがサービス一覧や検索ページでない場合は表示しない
  if (pathname !== '/services' && !pathname.startsWith('/search')) {
    return null
  }

  return (
    <div
      className={`sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container-wide py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium mr-2 shrink-0">フィルター:</span>

            {/* 業界フィルター */}
            <div className="flex items-center gap-2">
              {INDUSTRIES.map((industry) => (
                <Badge
                  key={industry.slug}
                  variant={activeIndustry === industry.slug ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleFilterChange('industry', industry.slug)}
                >
                  {industry.icon} {industry.name}
                </Badge>
              ))}
            </div>

            <span className="mx-2 text-muted-foreground">|</span>

            {/* 課題フィルター */}
            <div className="flex items-center gap-2">
              {BUSINESS_ISSUES.slice(0, 4).map((issue) => (
                <Badge
                  key={issue.id}
                  variant={activeIssue === issue.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleFilterChange('issue', issue.id)}
                >
                  {issue.icon} {issue.title}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleSearch}
            disabled={!activeIndustry && !activeIssue}
          >
            <Tag className="mr-2 h-4 w-4" />
            フィルター検索
          </Button>
        </div>
      </div>
    </div>
  )
}
