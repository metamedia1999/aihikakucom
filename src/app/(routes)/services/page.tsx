// src/app/(routes)/services/page.tsx

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'サービス一覧',
  description: 'サービス一覧ページ',
}

export default function Page() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold">サービス一覧</h1>
      <p className="mt-4">このページは現在メンテナンス中です。</p>
    </div>
  )
}
