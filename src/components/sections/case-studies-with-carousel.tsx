'use client'

import dynamic from 'next/dynamic'

const CaseStudyCarousel = dynamic(() => import('@/components/carousel/case-study-carousel').then(mod => mod.CaseStudyCarousel), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  ),
  ssr: false
})

export default function CaseStudiesWithCarousel() {
  return (
    <section className="py-16 bg-background">
      <div className="container-wide">
        <CaseStudyCarousel />
      </div>
    </section>
  )
}