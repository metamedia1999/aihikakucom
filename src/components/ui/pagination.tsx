'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams()
  
  // URLクエリパラメータを維持しながらページ番号を変更
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  // ページ番号の配列を生成
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    
    // 総ページ数が7以下なら全て表示
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // 現在のページを中心に前後2ページずつ表示
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)
      
      // 最初のページを表示
      if (startPage > 1) {
        pageNumbers.push(1)
        if (startPage > 2) {
          pageNumbers.push('...')
        }
      }
      
      // 中央のページ番号を表示
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      
      // 最後のページを表示
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...')
        }
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center mt-8" aria-label="ページネーション">
      <ul className="flex items-center gap-1 flex-wrap justify-center">
        {/* 前へボタン */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className="px-2 sm:px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
              aria-label="前のページへ"
            >
              <span className="hidden sm:inline">前へ</span>
              <span className="sm:hidden">←</span>
            </Link>
          ) : (
            <span className="px-2 sm:px-3 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
              <span className="hidden sm:inline">前へ</span>
              <span className="sm:hidden">←</span>
            </span>
          )}
        </li>

        {/* ページ番号 */}
        {getPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === '...' ? (
              <span className="px-3 py-2 text-sm font-medium text-muted-foreground">...</span>
            ) : (
              <Link
                href={createPageUrl(pageNumber as number)}
                className={cn(
                  "px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  currentPage === pageNumber
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
                aria-label={`ページ ${pageNumber}`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </Link>
            )}
          </li>
        ))}

        {/* 次へボタン */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={createPageUrl(currentPage + 1)}
              className="px-2 sm:px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
              aria-label="次のページへ"
            >
              <span className="hidden sm:inline">次へ</span>
              <span className="sm:hidden">→</span>
            </Link>
          ) : (
            <span className="px-2 sm:px-3 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
              <span className="hidden sm:inline">次へ</span>
              <span className="sm:hidden">→</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}