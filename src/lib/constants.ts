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
export const DEFAULT_FEATURED_IMAGE = '/placeholder.svg';
export const DEFAULT_AVATAR = '/placeholder.svg';
export const DEFAULT_LOGO = '/placeholder.svg';

// サービス画像（モック用）
export const MOCK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1677442135132-141970ad6a2a?q=80&w=1632&auto=format&fit=crop',
  service1: '/placeholder.svg',
  service2: '/placeholder.svg',
  service3: '/placeholder.svg',
  service4: '/placeholder.svg',
  service5: '/placeholder.svg',
  service6: '/placeholder.svg',
  post1: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1632&auto=format&fit=crop',
  post2: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
  post3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
  post4: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1470&auto=format&fit=crop',
  post5: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=1374&auto=format&fit=crop',
  post6: 'https://images.unsplash.com/photo-1495592822108-9e6261896da8?q=80&w=1470&auto=format&fit=crop',
  case1: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1470&auto=format&fit=crop',
  case2: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470&auto=format&fit=crop',
  industry1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop',
  industry2: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop',
  industry3: 'https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=1470&auto=format&fit=crop',
  industry4: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=1473&auto=format&fit=crop',
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
