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
    preview: html ? html.substring(0, 200) + '...' : 'null/undefined'
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
    preview: decoded.substring(0, 200) + '...'
  })
  
  return decoded;
}

// テキストを省略する関数
export function truncateText(text: string, maxLength: number): string {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
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
