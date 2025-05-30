import Link from 'next/link'
import { FOOTER_LINKS, SITE_NAME } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                AI
              </div>
              <span className="text-xl font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              AI・人工知能に関する様々なツールやサービス、AIBPOの比較プラットフォーム
            </p>
            <a
              href="https://twitter.com/aihikaku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-sm">Xをフォロー</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">ナビゲーション</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    サービス一覧
                  </Link>
                </li>
                <li>
                  <Link href="/industry" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    業界別活用事例
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    最新記事
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    AI診断・テスト
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">お問い合わせ</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    お問い合わせフォーム
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors duration-300">
                    AI診断を受ける
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-neutral-500">
            &copy; {currentYear} {SITE_NAME} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
