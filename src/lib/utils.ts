import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 日付のフォーマット関数
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// HTMLタグを削除する関数
export function stripHtml(html: string): string {
  
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  // HTMLタグを削除
  const stripped = html.replace(/<[^>]*>/g, '');
  
  // HTMLエンティティもデコード
  const decoded = stripped
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
  
  
  return decoded;
}

// テキストを省略する関数
export function truncateText(text: string, maxLength: number): string {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// HTMLを含むテキストを安全に省略する関数
export function truncateHtml(html: string, maxLength: number): string {
  const stripped = stripHtml(html);
  return truncateText(stripped, maxLength);
}

// 検索クエリをURLから取得する関数
export function getQueryParam(url: string, param: string): string | null {
  const searchParams = new URLSearchParams(url.split('?')[1]);
  return searchParams.get(param);
}

// サービス用の画像取得関数
export function getServiceImage(service: Record<string, unknown>): string {
  // 優先順位: ACFフィールドの画像 > 既存の画像 > 業界別フォールバック > デフォルト
  if ((service?.acfFields as any)?.serviceImage?.sourceUrl) {
    return (service.acfFields as any).serviceImage.sourceUrl;
  }
  if ((service?.serviceFields as any)?.logo?.sourceUrl) {
    return (service.serviceFields as any).logo.sourceUrl;
  }
  if ((service?.serviceFields as any)?.logo?.node?.sourceUrl) {
    return (service.serviceFields as any).logo.node.sourceUrl;
  }
  if ((service?.featuredImage as any)?.node?.sourceUrl) {
    return (service.featuredImage as any).node.sourceUrl;
  }
  if (typeof service?.image === 'string') {
    return service.image;
  }
  
  // 業界別フォールバック画像
  const serviceFallbacks: Record<string, string> = {
    '金融': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    '製造': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    '製薬': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    '小売': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    'IT': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    '医療': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    'finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    'manufacturing': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    'pharma': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    'retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    'デフォルト': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
  };

  // 業界名を取得（複数の形式に対応）
  const industry = (service?.industries as any)?.nodes?.[0]?.name || 
                   (service?.industries as any)?.nodes?.[0]?.slug ||
                   service?.industry ||
                   service?.industryCategory ||
                   'デフォルト';

  return serviceFallbacks[industry] || serviceFallbacks.デフォルト;
}

// 記事用の画像取得関数
export function getArticleImage(article: Record<string, unknown>): string {
  // 優先順位: featured image > 既存の画像 > カテゴリ別フォールバック > デフォルト
  if ((article?.featuredImage as any)?.node?.sourceUrl) {
    return (article.featuredImage as any).node.sourceUrl;
  }
  if ((article?.featuredImage as any)?.sourceUrl) {
    return (article.featuredImage as any).sourceUrl;
  }
  if (typeof article?.image === 'string') {
    return article.image;
  }
  
  // カテゴリ別フォールバック画像 - より魅力的な画像に更新
  const articleFallbacks: Record<string, string> = {
    'ニュース': 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=600&fit=crop&auto=format',
    '導入事例': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format',
    'ブログ': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format',
    'AI技術': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format',
    '業界動向': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format',
    '活用事例': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format',
    'news': 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=600&fit=crop&auto=format',
    'case-study': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format',
    'blog': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format',
    'ai': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format',
    'technology': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format',
    'business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format',
    'デフォルト': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format'
  };

  // カテゴリ名を取得（複数の形式に対応）
  const category = (article?.categories as any)?.nodes?.[0]?.name ||
                   (article?.categories as any)?.nodes?.[0]?.slug ||
                   article?.category ||
                   article?.type ||
                   'デフォルト';

  return articleFallbacks[category] || articleFallbacks.デフォルト;
}

// カラフルなグラデーション背景を生成する関数
export function getGradientFallback(seed?: string): string {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  ];

  if (seed) {
    // シードに基づいてインデックスを決定
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit整数に変換
    }
    return gradients[Math.abs(hash) % gradients.length];
  }

  return gradients[Math.floor(Math.random() * gradients.length)];
}

// 画像読み込みエラー時のフォールバック関数
export function getImageFallback(type: 'service' | 'article' | 'industry' = 'service'): string {
  if (type === 'service') {
    return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format';
  }
  if (type === 'industry') {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format';
  }
  // 記事用フォールバックは高品質なAI関連画像
  return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format';
}
