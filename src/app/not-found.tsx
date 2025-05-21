import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SITE_NAME } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">ページが見つかりません</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        お探しのページは存在しないか、移動または削除された可能性があります。
        URLが正しいかご確認ください。
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">トップページに戻る</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search">サービスを検索する</Link>
        </Button>
      </div>
    </div>
  )
}
