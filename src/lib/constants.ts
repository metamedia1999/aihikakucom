// サイト情報
export const SITE_NAME = 'AI比較.com';
export const SITE_DESCRIPTION = 'AIBPOサービスの検索・比較プラットフォーム。業種別・業務別のAIサービスを簡単に探せます。';
export const SITE_URL = 'https://ai-hikaku.com';

// ナビゲーション（シンプル化）
export const NAV_ITEMS = [
  { label: 'ホーム', path: '/' },
  { label: 'サービス一覧', path: '/services' },
  { label: 'お問い合わせ', path: '/contact' },
];

// フッターリンク（シンプル化）
export const FOOTER_LINKS = {
  会社情報: [
    { label: '運営会社', path: '/company' },
    { label: 'プライバシーポリシー', path: '/privacy' },
    { label: '利用規約', path: '/terms' },
  ],
  サービス: [
    { label: 'AI比較とは', path: '/about' },
    { label: 'サービス掲載について', path: '/listing' },
    { label: 'お問い合わせ', path: '/contact' },
  ],
  ソーシャル: [
    { label: 'X (Twitter)', path: 'https://twitter.com/aihikaku', external: true },
  ],
};

// デフォルト画像
export const DEFAULT_FEATURED_IMAGE = 'https://placehold.co/1200x630/e2e8f0/1e293b?text=AI比較.com';
export const DEFAULT_AVATAR = 'https://placehold.co/300x300/e2e8f0/1e293b?text=Avatar';
export const DEFAULT_LOGO = 'https://placehold.co/200x200/e2e8f0/1e293b?text=Logo';

// サービス画像（モック用）
export const MOCK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1677442135132-141970ad6a2a?q=80&w=1632&auto=format&fit=crop',
  service1: 'https://placehold.co/600x400/4f46e5/ffffff?text=AI+Assistant+Pro',
  service2: 'https://placehold.co/600x400/10b981/ffffff?text=Smart+Data+Analyzer',
  service3: 'https://placehold.co/600x400/ef4444/ffffff?text=AI+Document+Processor',
  service4: 'https://placehold.co/600x400/f59e0b/ffffff?text=AI+Quality+Inspector',
  service5: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Pharma+Research+AI',
  service6: 'https://placehold.co/600x400/3b82f6/ffffff?text=Finance+Predict+AI',
  post1: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1632&auto=format&fit=crop',
  post2: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
  post3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  post4: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1470&auto=format&fit=crop',
  post5: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=1374&auto=format&fit=crop',
  post6: 'https://images.unsplash.com/photo-1495592822108-9e6261896da8?q=80&w=1470&auto=format&fit=crop',
};

// 業務の悩みカテゴリ
export const BUSINESS_ISSUES = [
  {
    id: 'labor-shortage',
    title: '人手が足りない',
    description: '人材不足の課題を解決するAIソリューション',
    icon: '👥',
    searchTerm: '人材 人手 自動化'
  },
  {
    id: 'accounting-complex',
    title: '会計が複雑',
    description: '会計業務を効率化するAIソリューション',
    icon: '💹',
    searchTerm: '会計 経理 財務'
  },
  {
    id: 'document-creation',
    title: '資料作成の手間',
    description: '資料作成を自動化するAIソリューション',
    icon: '📝',
    searchTerm: '資料 ドキュメント 文書'
  },
  {
    id: 'research-time',
    title: 'リサーチの時間がない',
    description: 'リサーチ業務を効率化するAIソリューション',
    icon: '🔍',
    searchTerm: 'リサーチ 調査 分析'
  },
  {
    id: 'customer-service',
    title: '顧客対応に追われる',
    description: '顧客対応を自動化するAIソリューション',
    icon: '🗣️',
    searchTerm: '顧客 サポート チャット'
  },
  {
    id: 'data-analysis',
    title: 'データ分析が煩雑',
    description: 'データ分析を簡易化するAIソリューション',
    icon: '📊',
    searchTerm: 'データ 分析 予測'
  },
];

// 業界カテゴリ
export const INDUSTRIES = [
  {
    slug: 'finance',
    name: '金融',
    description: '金融業界向けAIBPOサービス、会計や融資、リスク分析などの業務を自動化・効率化します。',
    icon: '💹'
  },
  {
    slug: 'pharma',
    name: '製薬',
    description: '製薬業界向けAIBPOサービス、研究開発や製造、品質管理などの業務を支援します。',
    icon: '💊'
  },
  {
    slug: 'manufacturing',
    name: '製造',
    description: '製造業界向けAIBPOサービス、生産管理や在庫管理、品質管理などの業務を効率化します。',
    icon: '🏭'
  },
];
