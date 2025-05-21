import { Industry, Service, Post } from '@/types';
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
        mockIndustries[0],
        mockIndustries[2]
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
        mockIndustries[0],
        mockIndustries[1]
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
        mockIndustries[0],
        mockIndustries[1],
        mockIndustries[2]
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
        mockIndustries[2]
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
        mockIndustries[1]
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
        mockIndustries[0]
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
  {
    id: 'post-4',
    slug: 'ai-ethics-business',
    title: 'AIビジネス倫理：企業が考慮すべき5つの原則と実践方法',
    excerpt: 'AIを事業に活用する際に考慮すべき倫理的問題と、適切に対応するための原則を解説します。',
    content: `
      <h2>AIビジネス倫理の重要性</h2>
      <p>AI技術の普及に伴い、企業はAIの活用方法について倫理的な配慮を求められるようになっています。技術的な可能性だけでなく、社会的責任を考慮したAI活用が企業の長期的な成功につながります。</p>

      <h3>AIビジネス倫理の5原則</h3>
      <p>企業がAIを活用する際に考慮すべき5つの倫理原則は以下の通りです：</p>
      <ol>
        <li><strong>透明性</strong>：AIシステムの意思決定プロセスが理解可能であること</li>
        <li><strong>公平性</strong>：バイアスを排除し、特定のグループを差別しないこと</li>
        <li><strong>プライバシー</strong>：個人データの収集と利用に関する適切な取り扱い</li>
        <li><strong>説明責任</strong>：AIシステムの判断に対する責任の所在の明確化</li>
        <li><strong>人間中心</strong>：最終的な判断や決定権は人間が持つこと</li>
      </ol>

      <h3>原則を実践するための具体的ステップ</h3>
      <p>これらの原則を実践するために、企業が取るべき具体的なアクションを紹介します：</p>

      <h4>1. 透明性の確保</h4>
      <ul>
        <li>AIがどのようなデータを使用しているか明示する</li>
        <li>可能な限りアルゴリズムの概要を公開する</li>
        <li>AI判断の背後にある根拠を説明できるようにする</li>
      </ul>

      <h4>2. 公平性の担保</h4>
      <ul>
        <li>学習データにおけるバイアスを特定・軽減する</li>
        <li>定期的な公平性監査を実施する</li>
        <li>多様なバックグラウンドの視点を開発プロセスに含める</li>
      </ul>

      <h4>3. プライバシー保護</h4>
      <ul>
        <li>必要最小限のデータのみを収集する</li>
        <li>データ匿名化技術を活用する</li>
        <li>ユーザーにデータ利用の目的と範囲を明示する</li>
      </ul>

      <h4>4. 説明責任の明確化</h4>
      <ul>
        <li>AIシステムの限界を理解し、文書化する</li>
        <li>AIの判断に対する異議申し立てプロセスを確立する</li>
        <li>問題発生時の対応プランを事前に策定する</li>
      </ul>

      <h4>5. 人間中心の設計</h4>
      <ul>
        <li>重要な判断は最終的に人間が行う仕組みを構築する</li>
        <li>AIと人間の適切な役割分担を明確にする</li>
        <li>従業員のAIリテラシー向上を支援する</li>
      </ul>

      <h2>まとめ</h2>
      <p>AIの倫理的活用は、単なる規制対応ではなく、持続可能なビジネスモデル構築の基盤となります。倫理的な配慮が行き届いたAIの導入により、ユーザーからの信頼獲得と長期的なビジネス成功を両立させることが可能になります。</p>
    `,
    date: '2025-03-28T10:15:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post4
      }
    },
    categories: {
      nodes: [
        { id: 'cat-6', name: 'AI倫理', slug: 'ai-ethics' },
        { id: 'cat-7', name: '企業責任', slug: 'corporate-responsibility' }
      ]
    }
  },
  {
    id: 'post-5',
    slug: 'financial-ai-case-study',
    title: '金融業界におけるAI活用事例：リスク分析から顧客サービスまで',
    excerpt: '金融機関がAIを活用して業務効率化とリスク管理、顧客体験向上を実現した具体的な事例を紹介します。',
    content: `
      <h2>金融業界を変革するAI技術</h2>
      <p>金融業界ではAI技術の導入が進み、従来のビジネスモデルを大きく変革しています。本記事では、国内金融機関におけるAI活用の最新事例と、その成果について紹介します。</p>

      <h3>リスク分析・管理におけるAI活用</h3>
      <p>金融機関E銀行では、融資審査プロセスにAIを導入し、従来の信用スコアモデルでは捉えられなかった潜在的リスク要因の分析を実現しています。具体的には以下のような成果が報告されています：</p>
      <ul>
        <li>デフォルト予測精度が従来モデルと比較して25%向上</li>
        <li>審査時間が平均2日から数時間に短縮</li>
        <li>「薄いファイル問題」（信用履歴の少ない顧客）の改善</li>
      </ul>
      <p>また、F証券では、市場データと非構造化データ（ニュース、SNS）を組み合わせた異常検知AIにより、市場リスクの早期警告システムを構築。潜在的なリスクを平均1.5日早く検知できるようになりました。</p>

      <h3>顧客サービス向上のためのAI活用</h3>
      <p>地方銀行のG銀行では、AIチャットボットと対話型AIアシスタントを導入し、顧客サービスの質と効率を大幅に向上させています：</p>
      <ul>
        <li>24時間対応可能な金融アドバイスの提供</li>
        <li>問い合わせ対応時間の70%削減</li>
        <li>顧客満足度スコアの15%向上</li>
        <li>個人に合わせた金融商品のレコメンデーション精度向上</li>
      </ul>
      <p>保険会社のHライフでは、保険金請求プロセスにAI画像認識と自然言語処理を導入し、書類確認と査定のプロセスを自動化。査定時間を平均5日から1日に短縮し、顧客満足度を大幅に向上させています。</p>

      <h3>不正検知における革新的アプローチ</h3>
      <p>カード会社のIクレジットでは、リアルタイム不正検知AIを導入し、以下のような成果を上げています：</p>
      <ul>
        <li>不正検知率が従来システムと比較して35%向上</li>
        <li>誤検知（正常取引を不正と判断）が40%減少</li>
        <li>新たな不正パターンの自動学習による対応力向上</li>
      </ul>
      <p>この結果、年間数億円の不正被害防止と、顧客体験の向上を同時に実現しています。</p>

      <h3>導入における課題と解決策</h3>
      <p>金融機関がAIを導入する際には、以下のような課題があります：</p>
      <ul>
        <li>レガシーシステムとの統合</li>
        <li>規制遵守と説明可能性の確保</li>
        <li>高度なセキュリティ要件への対応</li>
        <li>従業員のスキルギャップ</li>
      </ul>
      <p>これらの課題に対して、段階的導入アプローチやAPI連携の活用、継続的なコンプライアンスチェック体制の構築などで対応している事例が見られます。</p>

      <h2>まとめ</h2>
      <p>金融業界におけるAI活用は、リスク管理の精度向上から顧客体験の改善まで、幅広い価値をもたらしています。今後は、レガシーシステムとの統合や規制対応といった課題を解決しながら、さらに高度な活用が進むと予想されます。</p>
    `,
    date: '2025-03-20T16:30:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post5
      }
    },
    categories: {
      nodes: [
        { id: 'cat-8', name: '金融', slug: 'finance' },
        { id: 'cat-9', name: '事例紹介', slug: 'case-study' }
      ]
    }
  },
  {
    id: 'post-6',
    slug: 'manufacturing-ai-automation',
    title: '製造業におけるAI自動化の最前線：生産性と品質の両立事例',
    excerpt: '製造業がAIを活用して生産性向上と品質管理を同時に実現した成功事例と導入ステップを解説します。',
    content: `
      <h2>製造業を革新するAI技術</h2>
      <p>製造業では、AIと自動化技術の組み合わせにより、生産性向上と品質向上の両立を実現する企業が増えています。本記事では、国内製造業のAI活用事例と、その導入プロセスについて紹介します。</p>

      <h3>予知保全によるダウンタイム削減</h3>
      <p>自動車部品メーカーのJ社では、工場内の設備にIoTセンサーを設置し、AIによる予知保全システムを導入しました。センサーデータから機械の異常を事前に検知することで、以下の成果を実現しています：</p>
      <ul>
        <li>計画外のダウンタイムを65%削減</li>
        <li>保全コストを年間約3,000万円削減</li>
        <li>部品の寿命予測精度向上による在庫最適化</li>
      </ul>
      <p>導入の際には、まず一部のクリティカルな設備に限定したパイロット導入から始め、効果が確認できた後に全工程へ展開するアプローチを取っています。</p>

      <h3>品質検査の自動化</h3>
      <p>電子部品メーカーのK社では、製造ラインの最終検査工程にAI画像認識システムを導入し、以下の効果を得ています：</p>
      <ul>
        <li>人間の目では検出困難な微細な欠陥の検出率80%向上</li>
        <li>検査工程のスループット35%向上</li>
        <li>品質検査員の業務が高度な判断業務にシフト</li>
        <li>品質データの蓄積による製造プロセス改善</li>
      </ul>
      <p>このシステム導入により、人件費削減だけでなく、製品不良の市場流出防止によるリコールリスク低減という副次効果も得ています。</p>

      <h3>生産計画の最適化</h3>
      <p>食品メーカーのL社では、需要予測AIと生産スケジューリングAIを組み合わせた生産計画最適化システムを導入し、以下の成果を上げています：</p>
      <ul>
        <li>生産ラインの稼働率を平均15%向上</li>
        <li>原材料廃棄ロスを23%削減</li>
        <li>納期遵守率の向上（92%→98%）</li>
        <li>急な受注変更への柔軟な対応が可能に</li>
      </ul>
      <p>これにより、コスト削減と顧客満足度向上を同時に実現しています。</p>

      <h3>現場作業者の支援</h3>
      <p>精密機器メーカーのM社では、作業指示とエラー防止のためのAIアシスタントを導入しました：</p>
      <ul>
        <li>拡張現実（AR）ゴーグルによる作業指示表示</li>
        <li>音声認識による両手作業中のシステム操作</li>
        <li>作業エラーのリアルタイム検知と警告</li>
        <li>新人作業者の習熟期間を40%短縮</li>
      </ul>
      <p>熟練工の暗黙知をAIに取り込むことで、技能伝承の課題解決にも貢献しています。</p>

      <h3>導入のステップとポイント</h3>
      <p>製造業でAIを効果的に導入するためのステップは以下の通りです：</p>
      <ol>
        <li>現状の課題と改善効果の定量化</li>
        <li>必要なデータの特定と収集体制の構築</li>
        <li>小規模な実証実験（PoC）の実施</li>
        <li>現場作業者を含めた評価と改善</li>
        <li>本格展開と継続的な改善サイクルの確立</li>
      </ol>
      <p>特に重要なのは、AIシステムの導入を単なるIT投資ではなく、現場改善活動の一環として位置づけることです。現場作業者の理解と協力を得るプロセスが成功の鍵となります。</p>

      <h2>まとめ</h2>
      <p>製造業におけるAI活用は、生産性向上、品質向上、コスト削減など多くのメリットをもたらします。課題を明確にし、段階的なアプローチで導入を進めることで、中小製造業でも大きな効果を得ることが可能です。</p>
    `,
    date: '2025-03-15T09:45:00Z',
    featuredImage: {
      node: {
        sourceUrl: MOCK_IMAGES.post6
      }
    },
    categories: {
      nodes: [
        { id: 'cat-10', name: '製造業', slug: 'manufacturing' },
        { id: 'cat-9', name: '事例紹介', slug: 'case-study' }
      ]
    }
  }
];

// ホームページデータ生成関数
export function getMockHomeData() {
  return {
    services: mockServices,
    posts: mockPosts,
    industries: mockIndustries,
  };
}

// 業界ページデータ生成関数
export function getMockIndustryData(slug: string) {
  const industry = mockIndustries.find(i => i.slug === slug);
  if (!industry) throw new Error('Industry not found');

  const services = mockServices.filter(service =>
    service.industries?.nodes.some(i => i.slug === slug)
  );

  return {
    industry,
    services,
  };
}

// サービスデータ生成関数
export function getMockServiceData(slug: string) {
  const service = mockServices.find(s => s.slug === slug);
  if (!service) throw new Error('Service not found');

  return service;
}

// ブログ記事データ生成関数
export function getMockPostData(slug: string) {
  const post = mockPosts.find(p => p.slug === slug);
  if (!post) throw new Error('Post not found');

  return post;
}

// 検索機能
export function mockSearchContent(searchTerm: string) {
  // 簡易的な検索ロジック（実際には自然言語処理などでより高度な検索を行うことが多い）
  const term = searchTerm.toLowerCase();

  const services = mockServices.filter(service =>
    service.title.toLowerCase().includes(term) ||
    service.excerpt.toLowerCase().includes(term) ||
    service.content.toLowerCase().includes(term)
  );

  const posts = mockPosts.filter(post =>
    post.title.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term)
  );

  return {
    services,
    posts,
  };
}
