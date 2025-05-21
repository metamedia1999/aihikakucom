'use client'

import { Check, X } from 'lucide-react'

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
  // 実際の実装ではWordPressのTablePressからデータを取得
  // ここではモックデータを使用
  const { headers, rows } = MOCK_COMPARISON_DATA

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
    <div className="overflow-x-auto snap-x">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`
                  p-3 bg-secondary text-sm font-medium text-left border-b
                  ${index === 0 ? 'sticky left-0 z-10 bg-secondary/95 min-w-40' : 'text-center'}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-secondary/20'}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`
                    p-3 border-b text-sm
                    ${cellIndex === 0 ? 'sticky left-0 z-10 font-medium bg-inherit' : 'text-center'}
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
  )
}
