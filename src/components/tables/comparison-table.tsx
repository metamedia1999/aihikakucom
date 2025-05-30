'use client'

import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'

// モック比較データ
const MOCK_COMPARISON_DATA = {
  headers: ['機能', '本サービス', 'A社', 'B社', 'C社'],
  rows: [
    ['AI精度', '95%', '80%', '85%', '75%'],
    ['自動化率', '90%', '60%', '70%', '50%'],
    ['APIサポート', true, true, false, true],
    ['カスタマイズ', true, false, true, false],
    ['無料トライアル', true, true, false, false],
    ['チャットサポート', true, false, true, false],
    ['マルチ言語対応', true, false, false, true],
    ['従量課金プラン', true, false, true, false],
    ['オンプレミス対応', false, true, false, false],
  ]
}

interface ComparisonTableProps {
  tableId?: string
}

export function ComparisonTable({ tableId = 'compare' }: ComparisonTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // データ読み込みのシミュレーション
    setIsLoading(false)
  }, [])
  
  // 実際の実装ではWordPressのTablePressからデータを取得
  // ここではモックデータを使用
  const { headers, rows } = MOCK_COMPARISON_DATA
  
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">比較表を読み込み中...</p>
      </div>
    )
  }

  // bool値をアイコンで表示するヘルパー関数
  const renderBoolValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-green-500" />
      ) : (
        <X className="mx-auto h-5 w-5 text-red-500" />
      )
    }
    return value
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`
                    whitespace-nowrap px-4 py-3 text-sm font-semibold
                    ${index === 0 
                      ? 'sticky left-0 z-10 bg-muted/50 text-left min-w-[140px] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-border' 
                      : 'text-center min-w-[120px]'
                    }
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`
                  border-b transition-colors hover:bg-muted/50
                  ${rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                `}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      whitespace-nowrap px-4 py-3 text-sm
                      ${cellIndex === 0 
                        ? 'sticky left-0 z-10 font-medium bg-inherit after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-border' 
                        : 'text-center'
                      }
                    `}
                  >
                    {cellIndex === 0 ? cell : renderBoolValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
