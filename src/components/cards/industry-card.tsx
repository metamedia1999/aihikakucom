import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Industry } from '@/types'
import { INDUSTRIES } from '@/lib/constants'
import { stripHtml } from '@/lib/utils'

interface IndustryCardProps {
  industry: Industry
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const { slug, name, description } = industry

  // constants.tsから追加情報を取得
  const industryData = INDUSTRIES.find(i => i.slug === slug)
  const icon = industryData?.icon || '🔍'

  return (
    <Link href={`/industry/${slug}`}>
      <Card className="h-full overflow-hidden card-hover transition-all duration-300">
        <CardContent className="p-6">
          <div className="mb-4 text-4xl">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {stripHtml(description || `${name}業界向けのAIBPOサービスを見つけましょう。`)}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-end">
          <Button variant="ghost" size="sm" className="text-primary">
            サービス一覧を見る
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
