import { LoadingPage } from '@/components/ui/loading'

export default function Loading() {
  return (
    <LoadingPage 
      title="ページを読み込んでいます..."
      description="AIサービスのデータを取得しています。しばらくお待ちください。"
    />
  )
}