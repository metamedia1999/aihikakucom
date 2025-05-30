import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'

// =============================
// GraphQL エンドポイント
// =============================
const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT

// WordPress APIが利用可能かチェック
const isWordPressAvailable = API_URL && 
  API_URL !== 'https://example.com/graphql' && 
  !API_URL.includes('example.com')

if (!isWordPressAvailable && process.env.NODE_ENV === 'development') {
  console.warn('🚨 WARNING: WordPress API not configured or using placeholder URL')
  console.warn('🚨 Will use mock data instead of real WordPress content')
  console.warn('🚨 To fix: Set NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT environment variable')
}

// --------------------------------------------------
// ① 1 プロセス内でシングルトン化（`react` の cache 使用）
// ② 必要なら headers に認証トークンなどを追加
// --------------------------------------------------
export const getClient = cache(() => {
  if (!isWordPressAvailable) {
    throw new Error('WordPress API not available')
  }
  return new GraphQLClient(API_URL!, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

// 共通 fetcher
export async function fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  try {
    const result = await getClient().request<T>(query, variables)
    return result
  } catch (err: any) {
    // エラーハンドリングのログは残す
    console.error('GraphQL request failed:', {
      url: API_URL,
      error: err.message,
      status: err.response?.status
    })
    throw err
  }
}