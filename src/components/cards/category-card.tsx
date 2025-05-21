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
      <div className="category-card border rounded-md bg-white hover:shadow transition-shadow duration-150 h-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}
