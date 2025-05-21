import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, MOCK_IMAGES } from '@/lib/constants'
import { ServiceCard } from '@/components/cards/service-card'
import { SearchBarLive } from '@/components/search/search-bar-live'
import { StickyFilterBar } from '@/components/filter/sticky-filter-bar'

export const metadata: Metadata = {
  title: `サービス一覧 | ${SITE_NAME}`,
  description: 'AIBPOサービスの一覧。中小企業の業務効率化に最適なAIサービスを比較・検討できます。',
}

// 10分間隔でページを再生成
export const revalidate = 600

// モックサービスデータ（直接定義）
const mockServices = [
  {
    id: 'service-1',
    slug: 'ai-assistant-pro',
    title: 'AI Assistant Pro',
    excerpt: 'あらゆるビジネスシーンで活躍する多機能AIアシスタント。自然言語処理により、問い合わせ対応や定型業務を自動化します。',
    content: '<p>AI Assistant Proの詳細説明</p>',
    serviceFields: {
      price: '月額50,000円〜',
      summary: 'あらゆるビジネスシーンで活躍するAIアシスタント。',
      logo: {
        sourceUrl: MOCK_IMAGES.service1
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service1
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-1',
          name: '金融',
          slug: 'finance'
        },
        {
          id: 'industry-2',
          name: '製造',
          slug: 'manufacturing'
        }
      ]
    }
  },
  {
    id: 'service-2',
    slug: 'smart-data-analyzer',
    title: 'Smart Data Analyzer',
    excerpt: '大量のデータから有益な洞察を抽出するAI分析ツール。ビジネスの意思決定を支援します。',
    content: '<p>Smart Data Analyzerの詳細説明</p>',
    serviceFields: {
      price: '初期費用200,000円 + 月額100,000円〜',
      summary: '大量のデータから意味のあるパターンを発見し、ビジネスの意思決定を支援するAI分析ツール。',
      logo: {
        sourceUrl: MOCK_IMAGES.service2
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service2
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-1',
          name: '金融',
          slug: 'finance'
        },
        {
          id: 'industry-3',
          name: '製薬',
          slug: 'pharma'
        }
      ]
    }
  },
  {
    id: 'service-3',
    slug: 'ai-document-processor',
    title: 'AI Document Processor',
    excerpt: '書類の自動認識・データ抽出を行うAIソリューション。紙の書類からデジタルデータへの変換を効率化します。',
    content: '<p>AI Document Processorの詳細説明</p>',
    serviceFields: {
      price: 'ドキュメント処理量に応じた従量課金制',
      summary: '書類やPDFから必要なデータを自動抽出するAIソリューション。',
      logo: {
        sourceUrl: MOCK_IMAGES.service3
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service3
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-2',
          name: '製造',
          slug: 'manufacturing'
        }
      ]
    }
  },
  {
    id: 'service-4',
    slug: 'ai-quality-inspector',
    title: 'AI Quality Inspector',
    excerpt: '製造ラインの品質検査を自動化するAIソリューション。画像認識技術により不良品を高精度で検出します。',
    content: '<p>AI Quality Inspectorの詳細説明</p>',
    serviceFields: {
      price: '初期費用300,000円 + 月額150,000円〜',
      summary: '製造ラインの品質検査を自動化するAIソリューション。',
      logo: {
        sourceUrl: MOCK_IMAGES.service4
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service4
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-2',
          name: '製造',
          slug: 'manufacturing'
        }
      ]
    }
  },
  {
    id: 'service-5',
    slug: 'pharma-research-ai',
    title: 'Pharma Research AI',
    excerpt: '創薬研究を加速するAIソリューション。膨大な研究データから新たな知見を発見し、研究開発を効率化します。',
    content: '<p>Pharma Research AIの詳細説明</p>',
    serviceFields: {
      price: '要問合せ',
      summary: '創薬研究を加速するAIソリューション。',
      logo: {
        sourceUrl: MOCK_IMAGES.service5
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service5
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-3',
          name: '製薬',
          slug: 'pharma'
        }
      ]
    }
  },
  {
    id: 'service-6',
    slug: 'finance-predict-ai',
    title: 'Finance Predict AI',
    excerpt: '金融市場の予測分析を行うAIソリューション。過去のデータから将来のトレンドを予測し、投資判断を支援します。',
    content: '<p>Finance Predict AIの詳細説明</p>',
    serviceFields: {
      price: '月額200,000円〜',
      summary: '金融市場の予測分析を行うAIソリューション。',
      logo: {
        sourceUrl: MOCK_IMAGES.service6
      }
    },
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.service6
      }
    },
    industries: {
      nodes: [
        {
          id: 'industry-1',
          name: '金融',
          slug: 'finance'
        }
      ]
    }
  }
];

export default function ServicesPage() {
  try {
    // モックサービスデータを使用
    const services = mockServices;

    return (
      <>
        {/* スクロールで表示されるフィルターバー */}
        <StickyFilterBar taskFacet="business_issues" industryFacet="industries" />

        <div className="container-wide py-12">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl font-bold mb-6">AIサービス一覧</h1>

            {/* 検索バー */}
            <div className="hero-search">
              <SearchBarLive />
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              業務課題や業界から最適なAIサービスを見つけましょう
            </p>
          </div>

          {/* サービス一覧 */}
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                現在、掲載されているサービスはありません。<br />
                後ほどお試しください。
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-secondary rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">お探しのサービスが見つかりませんか？</h2>
            <p className="text-muted-foreground mb-6">
              AI比較.comでは、随時新しいAIサービスを追加しています。<br />
              掲載して欲しいサービスがありましたら、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Failed to load services page:', error);
    return (
      <div className="container-wide py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-muted-foreground">
          ページの読み込み中にエラーが発生しました。<br />
          しばらく経ってからもう一度お試しください。
        </p>
      </div>
    );
  }
}
