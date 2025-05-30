/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useEffect, useState } from 'react'
import { register } from 'swiper/element/bundle'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGO } from '@/lib/constants'

// モックの事例データ
const MOCK_CASES = [
  {
    id: 'case1',
    title: '大手製造業A社のAI品質検査導入事例',
    logo: 'https://picsum.photos/id/101/200/200',
    excerpt: '目視検査工程をAIカメラに置き換え、不良品検出率が27%向上、検査時間を80%削減しました。',
    link: '/cases/manufacturing-quality'
  },
  {
    id: 'case2',
    title: '中規模会計事務所B社の請求書自動化事例',
    logo: 'https://picsum.photos/id/102/200/200',
    excerpt: '月間3000件の請求書処理をAIで自動化し、入力ミスをゼロに、処理時間を94%削減しました。',
    link: '/cases/accounting-invoice'
  },
  {
    id: 'case3',
    title: '医療機関C病院の問診票デジタル化事例',
    logo: 'https://picsum.photos/id/103/200/200',
    excerpt: '紙の問診票をAIでデジタル化し、データ入力の手間を省き、患者データの分析精度を向上させました。',
    link: '/cases/medical-questionnaire'
  },
  {
    id: 'case4',
    title: '不動産会社D社の物件情報自動生成事例',
    logo: 'https://picsum.photos/id/104/200/200',
    excerpt: 'AIを活用して物件情報と写真から魅力的な物件紹介文を自動生成、成約率が15%向上しました。',
    link: '/cases/real-estate'
  },
  {
    id: 'case5',
    title: '小売チェーンE社の需要予測AI導入事例',
    logo: 'https://picsum.photos/id/105/200/200',
    excerpt: 'AIによる需要予測で在庫の最適化を実現し、欠品率を68%削減、廃棄ロスを42%削減しました。',
    link: '/cases/retail-demand'
  }
]

export function CaseStudyCarousel() {
  const [swiperEl, setSwiperEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    register()
    const swiper = document.querySelector('swiper-container')
    setSwiperEl(swiper)

    if (swiper) {
      Object.assign(swiper, {
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: true,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      })

      swiper.initialize()
    }
  }, [])

  const handlePrev = () => {
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slideNext()
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">導入事例</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrev}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">前へ</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={handleNext}>
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">次へ</span>
          </Button>
        </div>
      </div>

      <swiper-container init="false">
        {MOCK_CASES.map((caseItem) => (
          <swiper-slide key={caseItem.id}>
            <Link href={caseItem.link}>
              <div className="bg-white border rounded-lg overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="p-4 flex items-center space-x-3 border-b">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                    <Image
                      src={caseItem.logo || DEFAULT_LOGO}
                      alt={caseItem.title || '事例ロゴ'}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1">{caseItem.title}</h3>
                </div>
                <div className="p-4 flex-1">
                  <p className="text-sm text-muted-foreground">{caseItem.excerpt}</p>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-primary text-xs flex items-center">
                    詳細を見る
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  )
}
