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
  console.log('🔧 stripHtml called with:', {
    input: html,
    type: typeof html,
    length: html?.length || 0,
    preview: html ? `${html.substring(0, 200)}...` : 'null/undefined'
  })
  
  if (!html || typeof html !== 'string') {
    console.log('⚠️ stripHtml: empty/invalid input, returning empty string')
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
  
  console.log('✅ stripHtml result:', {
    original_length: html.length,
    stripped_length: decoded.length,
    preview: `${decoded.substring(0, 200)}...`
  })
  
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
export function getServiceImage(service: {[key: string]: any}): string {
  // 優先順位: ACFフィールドの画像 > 既存の画像 > 業界別フォールバック > デフォルト
  if (service?.acfFields?.serviceImage?.sourceUrl) {
    return service.acfFields.serviceImage.sourceUrl;
  }
  if (service?.serviceFields?.logo?.sourceUrl) {
    return service.serviceFields.logo.sourceUrl;
  }
  if (service?.serviceFields?.logo?.node?.sourceUrl) {
    return service.serviceFields.logo.node.sourceUrl;
  }
  if (service?.featuredImage?.node?.sourceUrl) {
    return service.featuredImage.node.sourceUrl;
  }
  if (service?.image) {
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
  const industry = service?.industries?.nodes?.[0]?.name || 
                   service?.industries?.nodes?.[0]?.slug ||
                   service?.industry ||
                   service?.industryCategory ||
                   'デフォルト';

  return serviceFallbacks[industry] || serviceFallbacks['デフォルト'];
}

// 記事用の画像取得関数
export function getArticleImage(article: {[key: string]: any}): string {
  // 優先順位: featured image > 既存の画像 > カテゴリ別フォールバック > デフォルト
  if (article?.featuredImage?.node?.sourceUrl) {
    return article.featuredImage.node.sourceUrl;
  }
  if (article?.featuredImage?.sourceUrl) {
    return article.featuredImage.sourceUrl;
  }
  if (article?.image) {
    return article.image;
  }
  
  // カテゴリ別フォールバック画像
  const articleFallbacks: Record<string, string> = {
    'ニュース': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
    '導入事例': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    'ブログ': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    'AI技術': 'https://images.unsplash.com/photo-1677442135932-1709449b3e93?w=600&h=400&fit=crop',
    '業界動向': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    '活用事例': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    'news': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
    'case-study': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    'blog': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    'デフォルト': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop'
  };

  // カテゴリ名を取得（複数の形式に対応）
  const category = article?.categories?.nodes?.[0]?.name ||
                   article?.categories?.nodes?.[0]?.slug ||
                   article?.category ||
                   article?.type ||
                   'デフォルト';

  return articleFallbacks[category] || articleFallbacks['デフォルト'];
}

// 画像読み込みエラー時のフォールバック関数
export function getImageFallback(type: 'service' | 'article' | 'industry' = 'service'): string {
  if (type === 'service') {
    return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop';
  }
  if (type === 'industry') {
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop';
}
