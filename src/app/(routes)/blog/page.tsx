import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'
import { getPosts } from '@/lib/api/fetchers'

export const metadata: Metadata = {
  title: `記事一覧 | ${SITE_NAME}`,
  description: 'AI活用やBPOに関する最新記事。導入事例や活用のポイントなど、役立つ情報をお届けします。',
}

export const revalidate = 600

export default async function BlogPage() {
  try {
    const posts = await getPosts()

    return (
      <div className="container-wide py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">AI活用記事</h1>
            <p className="text-muted-foreground">
              AIの導入事例や活用のポイントなど、ビジネスに役立つ情報をお届けします。
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
                  <div className="md:flex">
                    {post.featuredImage?.node?.sourceUrl && (
                      <div className="md:w-1/3 aspect-video md:aspect-square">
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="md:w-2/3 p-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        {new Date(post.date).toLocaleDateString('ja-JP')}
                      </div>
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {post.categories?.nodes && post.categories.nodes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.nodes.map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-1 bg-secondary text-xs rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        続きを読む →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">記事を読み込み中</h2>
                <p className="text-muted-foreground mb-6">
                  最新の記事を取得しています。<br />
                  しばらくお待ちください。
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">2025年のAI動向</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      企業が注目すべき最新技術と活用事例
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">AIを活用したBPO</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      業務効率化の成功事例と導入ポイント
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h3 className="font-medium">中小企業におけるAI導入ガイド</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      限られたリソースでも成果を出す方法
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load blog page:', error);
    return (
      <div className="container-wide py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">記事一覧</h1>
          <div className="bg-secondary/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">記事を準備中</h2>
            <p className="text-muted-foreground mb-8">
              AI活用に関する最新記事を準備しています。<br />
              少々お待ちください。
            </p>
            
            <div className="grid gap-4 text-left max-w-md mx-auto">
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">AI導入の基礎知識</h3>
                <p className="text-sm text-muted-foreground">中小企業向けガイド</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">BPO×AIの可能性</h3>
                <p className="text-sm text-muted-foreground">業務効率化事例</p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold">AIサービス比較のポイント</h3>
                <p className="text-sm text-muted-foreground">選定の基準</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}