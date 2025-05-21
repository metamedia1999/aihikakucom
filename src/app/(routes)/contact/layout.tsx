import { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'お問い合わせ | ' + SITE_NAME,
  description: 'AI比較.comへのお問い合わせはこちらから。サービスについての質問や資料請求を受け付けています。',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
