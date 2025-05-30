import { Industry, Service, Post, SearchResult } from '@/types';
import { INDUSTRIES, MOCK_IMAGES } from '@/lib/constants';

// モック業界データ
export const mockIndustries: Industry[] = INDUSTRIES.map((industry) => ({
  id: `industry-${industry.slug}`,
  slug: industry.slug,
  name: industry.name,
  description: industry.description,
}));

// モックサービスデータ
export const mockServices: Service[] = [
  {
    id: 'service-1',
    slug: 'ai-assistant-pro',
    title: 'AI Assistant Pro',
    excerpt: 'あらゆるビジネスシーンで活躍する多機能AIアシスタント。自然言語処理により、問い合わせ対応や定型業務を自動化します。',
    content: `
      <h2>AI Assistant Proの特徴</h2>
      <p>AI Assistant Proは、最新の人工知能技術を活用した多機能ビジネスアシスタントです。自然言語処理技術により、お客様からの問い合わせ対応や定型業務の自動化を実現します。</p>

      <h3>主な機能</h3>
      <ul>
        <li>24時間365日対応の自動チャットボット</li>
        <li>自然な日本語での会話が可能</li>
        <li>APIを通じた既存システムとの連携</li>
        <li>学習機能によるカスタマイズ</li>
      </ul>

      <h3>導入メリット</h3>
      <p>AI Assistant Proを導入することで、以下のようなメリットが得られます：</p>
      <ul>
        <li>人件費の削減</li>
        <li>対応品質の統一</li>
        <li>24時間対応による顧客満足度向上</li>
        <li>担当者の業務負荷軽減</li>
      </ul>
    `,
    serviceDetail: {
      price: '月額50,000円〜（利用規模により変動）',
      serviceSummary: 'あらゆるビジネスシーンで活躍する自然言語処理AIアシスタント。問い合わせ対応や定型業務を自動化し、業務効率化を実現します。',
      aiUtilization: '90',
      effectiveness: '85',
      supportLevel: '95',
      industryCategory: 'general',
      transparencyScore: '88',
      logo: {
        node: {
          sourceUrl: MOCK_IMAGES.service1
        }
      }
    },
    serviceFields: {
      price: '月額50,000円〜（利用規模により変動）',
      summary: 'あらゆるビジネスシーンで活躍する自然言語処理AIアシスタント。問い合わせ対応や定型業務を自動化し、業務効率化を実現します。',
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
        {...mockIndustries[0]},
        {...mockIndustries[2]}
      ]
    }
  },
  {
    id: 'service-2',
    slug: 'smart-data-analyzer',
    title: 'Smart Data Analyzer',
    excerpt: '大量のデータから有益な洞察を抽出するAI分析ツール。ビジネスの意思決定を支援します。',
    content: `
      <h2>Smart Data Analyzerとは</h2>
      <p>Smart Data Analyzerは、ビッグデータからビジネスに有益な洞察を導き出すAI分析ツールです。機械学習アルゴリズムを活用して、データの中に潜むパターンや傾向を発見し、意思決定を支援します。</p>

      <h3>主な機能</h3>
      <ul>
        <li>多様なデータソースからのデータ統合</li>
        <li>高度な予測分析機能</li>
        <li>直感的なダッシュボード</li>
        <li>カスタマイズ可能なレポート機能</li>
      </ul>

      <h3>活用シーン</h3>
      <p>以下のようなシーンでご活用いただけます：</p>
      <ul>
        <li>市場動向の分析と予測</li>
        <li>顧客行動の分析</li>
        <li>リスク管理</li>
        <li>業務プロセスの最適化</li>
      </ul>
    `,
    serviceDetail: {
      price: '初期費用200,000円 + 月額100,000円〜',
      serviceSummary: '大量のデータから意味のあるパターンを発見し、ビジネスの意思決定を支援するAI分析ツール。直感的なダッシュボードでデータを可視化します。',
      aiUtilization: '88',
      effectiveness: '92',
      supportLevel: '85',
      industryCategory: 'data',
      transparencyScore: '90',
      logo: {
        node: {
          sourceUrl: MOCK_IMAGES.service2
        }
      }
    },
    serviceFields: {
      price: '初期費用200,000円 + 月額100,000円〜',
      summary: '大量のデータから意味のあるパターンを発見し、ビジネスの意思決定を支援するAI分析ツール。直感的なダッシュボードでデータを可視化します。',
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
        {...mockIndustries[0]},
        {...mockIndustries[1]}
      ]
    }
  },
  {
    id: 'service-3',
    slug: 'ai-document-processor',
    title: 'AI Document Processor',
    excerpt: '書類の自動認識・データ抽出を行うAIソリューション。紙の書類からデジタルデータへの変換を効率化します。',
    content: `
      <h2>AI Document Processorの概要</h2>
      <p>AI Document Processorは、OCRと自然言語処理技術を組み合わせた文書処理AIソリューションです。紙の書類やPDFからテキストや構造化データを自動抽出し、業務効率化を実現します。</p>

      <h3>主な機能</h3>
      <ul>
        <li>高精度OCRによる文字認識</li>
        <li>フォーマットに依存しないデータ抽出</li>
        <li>手書き文字の認識</li>
        <li>抽出データの自動分類・整理</li>
      </ul>

      <h3>導入効果</h3>
      <p>AI Document Processorの導入により、以下のような効果が期待できます：</p>
      <ul>
        <li>データ入力工数の大幅削減</li>
        <li>入力ミスの防止</li>
        <li>書類処理のリードタイム短縮</li>
        <li>蓄積された情報の有効活用</li>
      </ul>
    `,
    serviceFields: {
      price: 'ドキュメント処理量に応じた従量課金制（詳細はお問い合わせください）',
      summary: '書類やPDFから必要なデータを自動抽出するAIソリューション。OCRと自然言語処理技術により、データ入力業務を効率化します。',
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
        {...mockIndustries[0]},
        {...mockIndustries[1]},
        {...mockIndustries[2]}
      ]
    }
  },
  {
    id: 'service-4',
    slug: 'ai-quality-inspector',
    title: 'AI Quality Inspector',
    excerpt: '画像認識AIによる製品検査自動化システム。不良品の検出精度を向上させながら検査コストを削減します。',
    content: `
      <h2>AI Quality Inspectorとは</h2>
      <p>AI Quality Inspectorは、ディープラーニングを用いた画像認識技術により、製造ラインの製品検査を自動化するシステムです。熟練検査員の目に匹敵する精度で不良品を検出し、品質管理コストの削減を実現します。</p>

      <h3>主な機能</h3>
      <ul>
        <li>リアルタイム画像処理による不良検出</li>
        <li>微細な傷や変形の検出</li>
        <li>AIによる不良パターンの学習・進化</li>
        <li>検査結果の記録・分析機能</li>
      </ul>

      <h3>導入メリット</h3>
      <p>本システムの導入により、以下のようなメリットが得られます：</p>
      <ul>
        <li>検査工程の人的コスト削減</li>
        <li>24時間稼働による生産性向上</li>
        <li>一定品質の検査精度維持</li>
        <li>不良発生パターンの分析による製造工程の改善</li>
      </ul>
    `,
    serviceFields: {
      price: '初期費用300,000円 + 月額80,000円〜',
      summary: 'ディープラーニングを活用した製品検査自動化システム。熟練検査員と同等以上の精度で不良品を検出し、品質管理業務を効率化します。',
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
        {...mockIndustries[2]}
      ]
    }
  },
  {
    id: 'service-5',
    slug: 'pharma-research-ai',
    title: 'Pharma Research AI',
    excerpt: '創薬研究を加速するAIプラットフォーム。膨大な研究データから新たな知見を発見し、医薬品開発を支援します。',
    content: `
      <h2>Pharma Research AIの概要</h2>
      <p>Pharma Research AIは、創薬研究に特化したAIプラットフォームです。論文や臨床データなど膨大な医学情報を分析し、新たな医薬品候補物質の発見や既存薬の新たな適応可能性を見つけ出します。</p>

      <h3>主な機能</h3>
      <ul>
        <li>医学論文の自動解析・知識抽出</li>
        <li>化合物-タンパク質相互作用の予測</li>
        <li>副作用予測および安全性評価</li>
        <li>バイオマーカーの同定支援</li>
      </ul>

      <h3>導入効果</h3>
      <p>本AIプラットフォームの導入により、以下のような効果が期待できます：</p>
      <ul>
        <li>研究開発期間の短縮</li>
        <li>開発コストの削減</li>
        <li>成功確率の向上</li>
        <li>研究者の洞察支援</li>
      </ul>
    `,
    serviceDetail: {
      price: '要お問い合わせ（利用規模や機能により異なります）',
      serviceSummary: '創薬研究に特化したAIプラットフォーム。膨大な医学情報から新たな治療ターゲットや化合物候補を発見し、医薬品開発プロセスを加速します。',
      aiUtilization: '95',
      effectiveness: '90',
      supportLevel: '85',
      industryCategory: 'pharma',
      transparencyScore: '80',
      logo: {
        node: {
          sourceUrl: MOCK_IMAGES.service5
        }
      }
    },
    serviceFields: {
      price: '要お問い合わせ（利用規模や機能により異なります）',
      summary: '創薬研究に特化したAIプラットフォーム。膨大な医学情報から新たな治療ターゲットや化合物候補を発見し、医薬品開発プロセスを加速します。',
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
        {...mockIndustries[1]}
      ]
    }
  },
  {
    id: 'service-6',
    slug: 'finance-predict-ai',
    title: 'Finance Predict AI',
    excerpt: '金融市場の動向予測と投資判断を支援するAIソリューション。リスク管理と資産運用の効率化を実現します。',
    content: `
      <h2>Finance Predict AIとは</h2>
      <p>Finance Predict AIは、機械学習とビッグデータ分析を活用した金融市場予測AIです。市場データ、企業情報、ニュース、SNSなど多様なデータソースを分析し、市場動向の予測と投資判断の支援を行います。</p>

      <h3>主な機能</h3>
      <ul>
        <li>市場動向の予測分析</li>
        <li>銘柄スクリーニングと評価</li>
        <li>リスク評価とポートフォリオ最適化</li>
        <li>異常検知によるリスク警告</li>
      </ul>

      <h3>活用シーン</h3>
      <p>以下のようなシーンでご活用いただけます：</p>
      <ul>
        <li>投資判断の意思決定支援</li>
        <li>リスク管理の強化</li>
        <li>市場動向の先行把握</li>
        <li>ポートフォリオのリバランス判断</li>
      </ul>
    `,
    serviceDetail: {
      price: '月額150,000円〜（オプション機能により変動）',
      serviceSummary: '金融市場データと経済ニュースを分析し、市場動向を予測するAIソリューション。投資判断の意思決定とリスク管理を支援します。',
      aiUtilization: '85',
      effectiveness: '88',
      supportLevel: '92',
      industryCategory: 'finance',
      transparencyScore: '85',
      logo: {
        node: {
          sourceUrl: MOCK_IMAGES.service6
        }
      }
    },
    serviceFields: {
      price: '月額150,000円〜（オプション機能により変動）',
      summary: '金融市場データと経済ニュースを分析し、市場動向を予測するAIソリューション。投資判断の意思決定とリスク管理を支援します。',
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
        {...mockIndustries[0]}
      ]
    }
  }
];

// モックブログ記事データ
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    slug: 'ai-trends-2025',
    title: '2025年のAI動向：企業が注目すべき最新技術と活用事例',
    excerpt: '急速に進化するAI技術の最新動向と、中小企業が実践できる活用方法について解説します。',
    content: `
      <h2>AI技術の進化が加速する2025年</h2>
      <p>2025年に向けて、AI技術はさらに進化を続けています。特に生成AIの発展により、テキスト生成やコード生成、画像生成などの分野で革新的な進化が見られます。本記事では、中小企業が取り入れるべきAI技術と、その具体的な活用方法について解説します。</p>

      <h3>生成AIの業務活用</h3>
      <p>生成AIは単なるチャットボットを超えて、コンテンツ作成から業務プロセスの自動化まで、幅広い分野で活用できるようになっています。マーケティング資料の作成、プログラミング支援、アイデア創出など、様々な場面で業務効率化を実現できます。</p>

      <h3>特化型AIの台頭</h3>
      <p>汎用AIに加えて、特定業界や業務に特化したAIソリューションが増加しています。金融向けのリスク分析AI、製造業向けの品質管理AI、医療分野での診断支援AIなど、専門性の高い分野でもAI活用が進んでいます。</p>

      <h3>中小企業がAIを導入する際のポイント</h3>
      <p>AIの導入は一般的に大企業が先行していましたが、クラウドベースのAIサービスの普及により、中小企業でも手軽に導入できるようになっています。導入の際は以下の点に注意しましょう：</p>
      <ul>
        <li>解決したい具体的な課題を明確にする</li>
        <li>初期投資を抑えたSaaSタイプのサービスから始める</li>
        <li>従業員のAIリテラシー向上を図る</li>
        <li>プライバシーとセキュリティに配慮する</li>
      </ul>

      <h2>まとめ</h2>
      <p>AIの導入は決して大企業だけのものではありません。中小企業こそ、限られたリソースを効率的に活用するためにAIを積極的に取り入れるべきでしょう。自社の課題を見極め、適切なAIソリューションを選択することで、ビジネスの競争力を高めることができます。</p>
    `,
    date: '2025-04-15T09:00:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post1
      }
    },
    categories: {
      nodes: [
        { id: 'cat-1', name: 'AI動向', slug: 'ai-trends' },
        { id: 'cat-2', name: 'ビジネス活用', slug: 'business-use' }
      ]
    }
  },
  {
    id: 'post-2',
    slug: 'bpo-with-ai',
    title: 'AIを活用したBPO：業務効率化の成功事例と導入ポイント',
    excerpt: 'AIとBPOを組み合わせることで実現する業務効率化の実例と、導入時の注意点を紹介します。',
    content: `
      <h2>AIとBPOの融合がもたらす変革</h2>
      <p>従来のBPO（ビジネス・プロセス・アウトソーシング）に人工知能（AI）を組み合わせることで、単純な業務委託を超えた高度な業務変革が可能になっています。AI-BPOの活用により、コスト削減だけでなく、業務品質の向上や新たな価値創造も実現できるようになりました。</p>

      <h3>AI-BPOの主な適用領域</h3>
      <p>AI-BPOは特に以下の業務領域で効果を発揮しています：</p>
      <ul>
        <li>カスタマーサポート（AIチャットボットとオペレーターの連携）</li>
        <li>経理・財務処理（請求書処理、経費精算、仕訳作業の自動化）</li>
        <li>人事業務（採用プロセス、勤怠管理、研修管理）</li>
        <li>データ入力・処理（フォームからのデータ抽出、データクレンジング）</li>
      </ul>

      <h3>導入企業の成功事例</h3>
      <p>株式会社Aでは、AIを活用した請求書処理システムを導入し、経理部門の作業時間を約70%削減することに成功しました。月間3,000件以上の請求書処理をわずか2名の担当者で行えるようになり、残りの人員を戦略的業務にシフトさせることができました。</p>
      <p>B社では、カスタマーサポートにAIチャットボットを導入し、問い合わせの約60%を自動応答で解決できるようになりました。その結果、オペレーターは複雑な問い合わせに集中でき、顧客満足度も向上しました。</p>

      <h3>AI-BPO導入のポイント</h3>
      <p>AI-BPOを導入する際は、以下の点に注意することが重要です：</p>
      <ul>
        <li>自動化する業務プロセスを明確に定義すること</li>
        <li>AIと人間の役割分担を適切に設計すること</li>
        <li>データの品質と量を確保すること</li>
        <li>段階的な導入と継続的な改善を行うこと</li>
      </ul>

      <h2>まとめ</h2>
      <p>AI-BPOは単なるコスト削減策ではなく、企業の競争力を高める戦略的ツールです。適切な業務選定と導入計画により、業務効率化と価値創造の両立が可能になります。</p>
    `,
    date: '2025-04-10T11:30:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post2
      }
    },
    categories: {
      nodes: [
        { id: 'cat-3', name: 'BPO', slug: 'bpo' },
        { id: 'cat-4', name: '業務効率化', slug: 'efficiency' }
      ]
    }
  },
  {
    id: 'post-3',
    slug: 'ai-implementation-small-business',
    title: '中小企業におけるAI導入ガイド：限られたリソースでも成果を出す方法',
    excerpt: 'リソースに制限のある中小企業がAIを効果的に導入するためのステップとベストプラクティスを紹介します。',
    content: `
      <h2>中小企業こそAIを活用すべき理由</h2>
      <p>大企業と比較してリソースの限られる中小企業こそ、AIを活用することで生産性向上やコスト削減の恩恵を受けられる可能性があります。本記事では、限られた予算と人員でも効果的にAIを導入する方法を紹介します。</p>

      <h3>AIツール選定のポイント</h3>
      <p>中小企業がAIツールを選ぶ際のポイントは以下の通りです：</p>
      <ul>
        <li>サブスクリプション型で初期投資を抑えられるもの</li>
        <li>専門知識がなくても導入できるユーザーフレンドリーなインターフェース</li>
        <li>既存システムと連携可能なAPI提供のあるもの</li>
        <li>必要に応じてスケールアップ・ダウンが容易なもの</li>
      </ul>

      <h3>段階的導入のすすめ</h3>
      <p>一度にすべての業務にAIを導入するのではなく、以下のような段階的アプローチが効果的です：</p>
      <ol>
        <li>最も効果が見込める1〜2の業務領域を特定する</li>
        <li>小規模なパイロットプロジェクトで効果を検証する</li>
        <li>成功事例をもとに社内の理解と協力を得る</li>
        <li>効果が確認できた施策から段階的に展開する</li>
      </ol>

      <h3>中小企業向けAI活用の具体例</h3>
      <p>従業員30名の製造業C社では、品質検査工程にAI画像認識システムを導入し、不良品検出率を15%向上させることに成功しました。初期費用を抑えるため、クラウドベースのAIサービスを利用し、月額制で導入しています。</p>
      <p>小売業D社は、AIを活用した需要予測ツールを導入し、在庫の適正化と欠品率の低減を実現。導入前と比較して在庫コストを約20%削減することができました。</p>

      <h3>導入時の注意点</h3>
      <p>AI導入時には以下の点に注意しましょう：</p>
      <ul>
        <li>AIに過度な期待をしないこと（万能ではない）</li>
        <li>従業員へのトレーニングを怠らないこと</li>
        <li>データの品質管理を行うこと</li>
        <li>セキュリティとプライバシーに配慮すること</li>
      </ul>

      <h2>まとめ</h2>
      <p>中小企業がAIを導入する際は、目的の明確化と段階的なアプローチが重要です。適切なAIツールを選定し、小さな成功体験を積み重ねることで、限られたリソースでも大きな効果を得ることができます。</p>
    `,
    date: '2025-04-05T14:45:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post3
      }
    },
    categories: {
      nodes: [
        { id: 'cat-5', name: '中小企業', slug: 'small-business' },
        { id: 'cat-2', name: 'ビジネス活用', slug: 'business-use' }
      ]
    }
  },
  // Additional posts for pagination testing
  {
    id: 'post-4',
    slug: 'ai-customer-service',
    title: 'AIカスタマーサービスの最前線：顧客満足度を向上させる活用術',
    excerpt: 'AIを活用したカスタマーサービスの最新トレンドと導入事例を紹介します。',
    content: `<h2>AIがカスタマーサービスを変える</h2><p>詳細な内容...</p>`,
    date: '2025-03-30T10:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-3', name: 'カスタマーサービス', slug: 'customer-service' }] }
  },
  {
    id: 'post-5',
    slug: 'data-analysis-with-ai',
    title: 'ビッグデータ×AI：データドリブン経営の実現方法',
    excerpt: 'AIを活用したデータ分析で経営判断を高度化する方法を解説します。',
    content: `<h2>データドリブン経営とは</h2><p>詳細な内容...</p>`,
    date: '2025-03-25T11:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-6', name: 'データ分析', slug: 'data-analysis' }] }
  },
  {
    id: 'post-6',
    slug: 'ai-security-measures',
    title: 'AI導入におけるセキュリティ対策：リスクと対応策',
    excerpt: 'AI活用に伴うセキュリティリスクと効果的な対策方法を詳しく解説します。',
    content: `<h2>AIセキュリティの重要性</h2><p>詳細な内容...</p>`,
    date: '2025-03-20T09:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post3 } },
    categories: { nodes: [{ id: 'cat-7', name: 'セキュリティ', slug: 'security' }] }
  },
  {
    id: 'post-7',
    slug: 'ai-manufacturing-innovation',
    title: '製造業におけるAI活用：品質管理から生産最適化まで',
    excerpt: '製造現場でのAI活用事例と導入効果を具体的に紹介します。',
    content: `<h2>製造業のAI革新</h2><p>詳細な内容...</p>`,
    date: '2025-03-15T14:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-8', name: '製造業', slug: 'manufacturing' }] }
  },
  {
    id: 'post-8',
    slug: 'ai-healthcare-revolution',
    title: '医療分野のAI革新：診断支援から創薬まで',
    excerpt: '医療・ヘルスケア分野でのAI活用最新動向と可能性を探ります。',
    content: `<h2>医療AIの現在と未来</h2><p>詳細な内容...</p>`,
    date: '2025-03-10T10:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-9', name: '医療・ヘルスケア', slug: 'healthcare' }] }
  },
  {
    id: 'post-9',
    slug: 'ai-finance-transformation',
    title: '金融業界のAI活用：リスク管理から顧客サービスまで',
    excerpt: '金融機関におけるAI活用の現状と今後の展望を解説します。',
    content: `<h2>金融AIの可能性</h2><p>詳細な内容...</p>`,
    date: '2025-03-05T13:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post3 } },
    categories: { nodes: [{ id: 'cat-10', name: '金融', slug: 'finance' }] }
  },
  {
    id: 'post-10',
    slug: 'ai-education-future',
    title: '教育分野のAI活用：個別最適化学習の実現',
    excerpt: 'AIが教育にもたらす変革と新しい学習体験について紹介します。',
    content: `<h2>教育×AIの未来</h2><p>詳細な内容...</p>`,
    date: '2025-02-28T11:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-11', name: '教育', slug: 'education' }] }
  },
  {
    id: 'post-11',
    slug: 'ai-retail-innovation',
    title: '小売業界のAI活用：需要予測から接客まで',
    excerpt: '小売・流通業界でのAI活用事例と成功のポイントを解説します。',
    content: `<h2>小売業のAI戦略</h2><p>詳細な内容...</p>`,
    date: '2025-02-25T09:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-12', name: '小売・流通', slug: 'retail' }] }
  },
  {
    id: 'post-12',
    slug: 'ai-logistics-optimization',
    title: '物流・配送のAI最適化：効率化と省人化の実現',
    excerpt: '物流業界でのAI活用による効率化事例を紹介します。',
    content: `<h2>物流AIの威力</h2><p>詳細な内容...</p>`,
    date: '2025-02-20T14:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post3 } },
    categories: { nodes: [{ id: 'cat-13', name: '物流', slug: 'logistics' }] }
  },
  {
    id: 'post-13',
    slug: 'ai-hr-management',
    title: 'AI人事管理：採用から育成まで人材戦略の革新',
    excerpt: '人事・HR分野でのAI活用方法と導入事例を詳しく解説します。',
    content: `<h2>人事AIの可能性</h2><p>詳細な内容...</p>`,
    date: '2025-02-15T10:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-14', name: '人事・HR', slug: 'hr' }] }
  },
  {
    id: 'post-14',
    slug: 'ai-marketing-automation',
    title: 'AIマーケティング自動化：効果的な顧客エンゲージメント',
    excerpt: 'AIを活用したマーケティング自動化の最新手法と成功事例を紹介します。',
    content: `<h2>マーケティングAIの進化</h2><p>詳細な内容...</p>`,
    date: '2025-02-10T11:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-15', name: 'マーケティング', slug: 'marketing' }] }
  },
  {
    id: 'post-15',
    slug: 'ai-legal-tech',
    title: 'リーガルテックのAI活用：契約書レビューから法務業務効率化まで',
    excerpt: '法務分野でのAI活用による業務効率化の実例を解説します。',
    content: `<h2>法務AIの実力</h2><p>詳細な内容...</p>`,
    date: '2025-02-05T09:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post3 } },
    categories: { nodes: [{ id: 'cat-16', name: '法務', slug: 'legal' }] }
  },
  {
    id: 'post-16',
    slug: 'ai-agriculture-tech',
    title: '農業×AI：スマート農業の最前線',
    excerpt: '農業分野でのAI活用による生産性向上と持続可能な農業の実現方法を紹介します。',
    content: `<h2>農業AIの革新</h2><p>詳細な内容...</p>`,
    date: '2025-01-30T13:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-17', name: '農業', slug: 'agriculture' }] }
  },
  {
    id: 'post-17',
    slug: 'ai-real-estate',
    title: '不動産業界のAI活用：価格査定から物件マッチングまで',
    excerpt: '不動産分野でのAI活用事例と今後の展望を解説します。',
    content: `<h2>不動産AIの可能性</h2><p>詳細な内容...</p>`,
    date: '2025-01-25T10:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-18', name: '不動産', slug: 'real-estate' }] }
  },
  {
    id: 'post-18',
    slug: 'ai-energy-management',
    title: 'エネルギー管理のAI活用：最適化と省エネの実現',
    excerpt: 'エネルギー分野でのAI活用による効率化と環境負荷低減の方法を紹介します。',
    content: `<h2>エネルギーAIの威力</h2><p>詳細な内容...</p>`,
    date: '2025-01-20T14:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post3 } },
    categories: { nodes: [{ id: 'cat-19', name: 'エネルギー', slug: 'energy' }] }
  },
  {
    id: 'post-19',
    slug: 'ai-tourism-hospitality',
    title: '観光・ホスピタリティ業界のAI活用：顧客体験の向上',
    excerpt: '観光・サービス業でのAI活用による顧客満足度向上の事例を解説します。',
    content: `<h2>観光AIの未来</h2><p>詳細な内容...</p>`,
    date: '2025-01-15T11:30:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post1 } },
    categories: { nodes: [{ id: 'cat-20', name: '観光・サービス', slug: 'tourism' }] }
  },
  {
    id: 'post-20',
    slug: 'ai-construction-tech',
    title: '建設業界のAI活用：設計最適化から現場管理まで',
    excerpt: '建設・建築分野でのAI活用による生産性向上と安全性確保の方法を紹介します。',
    content: `<h2>建設AIの革新</h2><p>詳細な内容...</p>`,
    date: '2025-01-10T09:00:00Z',
    featuredImage: { node: { sourceUrl: MOCK_IMAGES.post2 } },
    categories: { nodes: [{ id: 'cat-21', name: '建設・建築', slug: 'construction' }] }
  }
];

// モックデータ取得関数
export function getMockHomeData() {
  console.log('getMockHomeData called');
  
  // 安全なディープコピーを作成
  const safeServices = mockServices.map(service => {
    // 各サービスのディープコピーを作成
    const serviceCopy = JSON.parse(JSON.stringify(service));
    
    // industries.nodesが存在する場合、各industryのディープコピーを作成
    if (serviceCopy.industries && Array.isArray(serviceCopy.industries.nodes)) {
      serviceCopy.industries.nodes = serviceCopy.industries.nodes.map(industry => {
        return { ...industry };
      });
    }
    
    return serviceCopy;
  });
  
  console.log(`getMockHomeData returning ${safeServices.length} services`);
  
  return {
    services: safeServices,
    posts: JSON.parse(JSON.stringify(mockPosts)),
    industries: JSON.parse(JSON.stringify(mockIndustries))
  };
}

export function getMockIndustryData(slug: string) {
  console.log(`getMockIndustryData called for slug: ${slug}`);
  
  const industry = mockIndustries.find(i => i.slug === slug);
  
  if (!industry) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Creating fallback industry data for: ${slug}`);
    }
    
    // より詳細な業界名マッピング
    const industryNameMap: Record<string, { name: string; description: string; }> = {
      'finance': {
        name: '金融',
        description: '金融業界向けのAIソリューション。リスク分析、投資判断、顧客サービスの向上を実現する最新のAI技術をご提供します。'
      },
      'pharma': {
        name: '製薬',
        description: '製薬業界向けのAIソリューション。創薬研究、臨床試験、品質管理の効率化を支援する専門的なAI技術をご提供します。'
      },
      'manufacturing': {
        name: '製造業',
        description: '製造業向けのAIソリューション。品質検査、生産最適化、予知保全による生産性向上をサポートします。'
      },
      'healthcare': {
        name: '医療・ヘルスケア',
        description: '医療・ヘルスケア業界向けのAIソリューション。診断支援、患者ケア、医療業務の効率化を実現します。'
      },
      'retail': {
        name: '小売・流通',
        description: '小売・流通業界向けのAIソリューション。需要予測、在庫最適化、顧客体験の向上をサポートします。'
      },
      'logistics': {
        name: '物流',
        description: '物流業界向けのAIソリューション。配送最適化、倉庫管理、需要予測による効率化を実現します。'
      },
      'education': {
        name: '教育',
        description: '教育業界向けのAIソリューション。個別最適化学習、学習分析、教育業務の効率化をサポートします。'
      }
    };
    
    const industryInfo = industryNameMap[slug] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `${slug}業界向けのAIソリューション一覧。業務効率化と生産性向上を実現する最新のAI技術をご紹介します。`
    };
    
    // 汎用的に使えるサービスを選択（業界に関係なく使える AI Assistant Pro など）
    const universalServices = mockServices.filter(service => 
      service.slug === 'ai-assistant-pro' || 
      service.slug === 'smart-data-analyzer' || 
      service.slug === 'ai-document-processor'
    );
    
    const fallbackIndustry = {
      id: `industry-${slug}`,
      slug: slug,
      name: industryInfo.name,
      description: industryInfo.description
    };
    
    return {
      industry: JSON.parse(JSON.stringify(fallbackIndustry)),
      services: JSON.parse(JSON.stringify(universalServices))
    };
  }

  const industryServices = mockServices.filter(service => 
    service.industries?.nodes.some(i => i.slug === slug)
  );

  return {
    industry: JSON.parse(JSON.stringify(industry)),
    services: JSON.parse(JSON.stringify(industryServices))
  };
}

export function getMockServiceData(slug: string) {
  console.log(`getMockServiceData called for slug: ${slug}`);
  
  const service = mockServices.find(s => s.slug === slug);
  if (!service) {
    throw new Error(`Service with slug ${slug} not found`);
  }
  
  // オブジェクトのディープコピーを返す
  return JSON.parse(JSON.stringify(service));
}

export function getMockPostData(slug: string) {
  console.log(`getMockPostData called for slug: ${slug}`);
  
  const post = mockPosts.find(p => p.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  
  // オブジェクトのディープコピーを返す
  return JSON.parse(JSON.stringify(post));
}

export function mockSearchContent(searchTerm: string): SearchResult {
  console.log(`mockSearchContent called with term: ${searchTerm}`);
  
  // 検索語を小文字に変換して部分一致検索
  const term = searchTerm.toLowerCase();
  
  const filteredServices = mockServices.filter(service => 
    service.title.toLowerCase().includes(term) || 
    (service.excerpt || '').toLowerCase().includes(term) ||
    (service.content || '').toLowerCase().includes(term) ||
    service.industries?.nodes.some(i => i.name.toLowerCase().includes(term))
  );
  
  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(term) || 
    post.excerpt.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term) ||
    post.categories?.nodes.some(c => c.name.toLowerCase().includes(term))
  );
  
  return {
    services: JSON.parse(JSON.stringify(filteredServices)),
    posts: JSON.parse(JSON.stringify(filteredPosts))
  };
}

// =============================
// WordPress カスタムポストタイプ用モックデータ
// =============================

// AIサービス用モックデータ
export function getMockAiServices() {
  return [
    {
      id: 'ai-service-1',
      slug: 'chatgpt-business',
      title: 'ChatGPT Business',
      content: 'ビジネス向けの高度なAI会話システム。カスタマーサポート、文書作成、データ分析など幅広い業務に活用できます。',
      featuredImage: { node: { sourceUrl: MOCK_IMAGES.service1, altText: 'ChatGPT Business' } },
      aiServiceFields: {
        price: '月額2,000円/ユーザー',
        features: ['24時間365日対応', 'API連携', 'カスタムモデル', 'セキュリティ強化'],
        category: 'AI Assistant',
        vendor: 'OpenAI',
        rating: 4.8,
        summary: 'エンタープライズ向けの強力なAIアシスタント'
      }
    },
    {
      id: 'ai-service-2',
      slug: 'claude-enterprise',
      title: 'Claude Enterprise',
      content: 'Anthropic社が開発した安全性重視のAIアシスタント。長文処理と複雑な推論タスクに特化しています。',
      featuredImage: { node: { sourceUrl: MOCK_IMAGES.service2, altText: 'Claude Enterprise' } },
      aiServiceFields: {
        price: '月額1,800円/ユーザー',
        features: ['長文処理', '安全性重視', '複雑な推論', '高精度分析'],
        category: 'AI Assistant',
        vendor: 'Anthropic',
        rating: 4.7,
        summary: '安全性と精度を重視したエンタープライズAI'
      }
    }
  ];
}

// ケーススタディ用モックデータ
export function getMockCaseStudies() {
  return [
    {
      id: 'case-1',
      slug: 'case-1',
      title: '株式会社ABCの業務効率化事例',
      content: 'AIアシスタント導入による劇的な業務改善の事例をご紹介します。',
      featuredImage: { node: { sourceUrl: MOCK_IMAGES.case1, altText: '株式会社ABC事例' } },
      caseStudyFields: {
        company: '株式会社ABC',
        industry: '小売',
        challenge: 'カスタマーサポートの負荷が高く、対応時間と品質に課題があった',
        solution: 'AIアシスタントを導入し、よくある質問への自動応答を実現',
        results: ['対応時間50%削減', '顧客満足度15%向上', '24時間365日対応実現'],
        usedServices: ['ChatGPT API', 'AIチャットボット']
      }
    },
    {
      id: 'case-2',
      slug: 'case-2',
      title: 'XYZ製薬の研究開発効率化',
      content: 'AI分析ツール活用による新薬開発プロセスの効率化事例です。',
      featuredImage: { node: { sourceUrl: MOCK_IMAGES.case2, altText: 'XYZ製薬事例' } },
      caseStudyFields: {
        company: 'XYZ製薬',
        industry: '製薬',
        challenge: '膨大な実験データの解析に時間がかかり、研究効率が低下していた',
        solution: '機械学習を活用したデータ分析プラットフォームを導入',
        results: ['データ分析時間70%短縮', '研究効率3倍向上', '新薬候補発見率2倍'],
        usedServices: ['機械学習プラットフォーム', 'データ分析AI']
      }
    }
  ];
}

// 業界別ソリューション用モックデータ（サービス数付き）
export function getMockIndustrySolutions() {
  // 各業界のサービス数を計算
  const industryServiceCounts = mockIndustries.map(industry => {
    const serviceCount = mockServices.filter(service =>
      service.industries?.nodes.some(i => i.slug === industry.slug)
    ).length;
    
    return {
      id: industry.id,
      slug: industry.slug,
      name: industry.name,
      description: industry.description,
      serviceCount: serviceCount,
      image: MOCK_IMAGES[`industry${mockIndustries.indexOf(industry) + 1}`] || MOCK_IMAGES.industry1
    };
  });
  
  // サービスが1件以上ある業界のみを返す
  return industryServiceCounts.filter(industry => industry.serviceCount > 0);
}

// 単一ケーススタディ取得用モック
export function getMockCaseStudy(slug: string) {
  const caseStudies = getMockCaseStudies();
  const caseStudy = caseStudies.find(c => c.slug === slug);
  
  if (!caseStudy) {
    throw new Error(`Case study with slug "${slug}" not found`);
  }
  
  return JSON.parse(JSON.stringify(caseStudy));
}
