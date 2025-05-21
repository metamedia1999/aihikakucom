import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            AI導入でビジネスを次のレベルへ
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            AI比較.comでは、あなたのビジネスに最適なAIサービスを見つけるお手伝いをします。<br />
            まずは無料相談から始めてみませんか？
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              サービスを探す
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-primary bg-background px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-secondary"
            >
              無料相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
