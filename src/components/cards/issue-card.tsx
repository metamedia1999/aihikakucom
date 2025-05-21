'use client'

import { useRouter } from 'next/navigation'

interface IssueCardProps {
  id: string
  title: string
  icon: string
  description: string
  searchTerm: string
}

export function IssueCard({ id, title, icon, description, searchTerm }: IssueCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div
      className="issue-card group"
      onClick={handleClick}
      aria-label={`${title}に関するAIサービスを検索`}
    >
      <div className="issue-icon group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-base font-bold mb-1 text-center group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-xs text-muted-foreground text-center">{description}</p>
    </div>
  )
}
