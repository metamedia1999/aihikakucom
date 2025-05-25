import Link from 'next/link'

interface CategoryCardProps {
  category: {
    id: string
    title: string
    description: string
    icon: string
    slug: string
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { title, description, icon, slug } = category

  return (
    <Link href={`/search?category=${slug}`}>
      <div className="category-card border rounded-lg bg-card hover:shadow-lg transition-all duration-200 h-full p-4 sm:p-6 group">
        <div className="flex flex-col items-center text-center h-full">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transition-transform duration-200 group-hover:scale-110">{icon}</div>
          <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <div className="text-xs sm:text-sm text-muted-foreground flex-1 line-clamp-3">{description}</div>
        </div>
      </div>
    </Link>
  )
}
