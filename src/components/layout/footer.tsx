import Link from 'next/link'
import { FOOTER_LINKS, SITE_NAME } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'
import { Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <div className="mt-3 text-sm text-muted-foreground">
              AIBPOサービスの検索・比較プラットフォーム。業種別・業務別のAIサービスを簡単に探せます。
            </div>
            <div className="mt-4">
              <a
                href="https://twitter.com/aihikaku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>フォローする</span>
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-medium">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container-wide py-4 text-center text-xs text-muted-foreground">
        <div>© {currentYear} {SITE_NAME} All rights reserved.</div>
      </div>
    </footer>
  )
}
