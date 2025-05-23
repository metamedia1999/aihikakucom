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
  return html.replace(/<[^>]*>/g, '');
}

// テキストを省略する関数
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// 検索クエリをURLから取得する関数
export function getQueryParam(url: string, param: string): string | null {
  const searchParams = new URLSearchParams(url.split('?')[1]);
  return searchParams.get(param);
}
