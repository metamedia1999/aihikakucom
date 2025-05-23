// 業界カテゴリ型定義
export interface Industry {
  id: string;
  slug: string;
  name: string;
  description?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

// サービス型定義
export interface Service {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  serviceFields?: {
    price?: string;
    summary?: string;
    logo?: {
      sourceUrl: string;
    };
  };
  industries?: {
    nodes: Industry[];
  };
}

// 記事（ブログ）型定義
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

// 検索結果型定義
export interface SearchResult {
  services: Service[];
  posts: Post[];
}
