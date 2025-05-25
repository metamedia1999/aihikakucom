// import { GraphQLClient } from 'graphql-request';
// import { cache } from 'react';

// // GraphQLエンドポイント
// const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT!;

// // キャッシュ可能なGraphQLクライアントを作成
// export const getClient = cache(() => {
//   return new GraphQLClient(API_URL, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// });

// // 共通のクエリフェッチ関数
// export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
//   try {
//     const client = getClient();
//     return await client.request<T>(query, variables);
//   } catch (error) {
//     console.error('GraphQL request failed:', error);
//     throw error;
//   }
// }
// import { GraphQLClient } from 'graphql-request'
// import { cache } from 'react'

// // =============================
// // GraphQL エンドポイント
// // =============================
// const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT!

// if (!API_URL) {
//   throw new Error('環境変数 NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT が未設定です')
// }

// // --------------------------------------------------
// // ① 1 プロセス内でシングルトン化（`react` の cache 使用）
// // ② 必要なら headers に認証トークンなどを追加
// // --------------------------------------------------
// export const getClient = cache(() =>
//   new GraphQLClient(API_URL, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// )

// // 共通 fetcher
// export async function fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
//   try {
//     return await getClient().request<T>(query, variables)
//   } catch (err) {
//     console.error('[GraphQL] request failed →', err)
//     throw err
//   }
// }

// import { GraphQLClient } from 'graphql-request'
// import { cache } from 'react'

// // =============================
// // GraphQL エンドポイント
// // =============================
// const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT!

// if (!API_URL) {
//   throw new Error('環境変数 NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT が未設定です')
// }

// // --------------------------------------------------
// // ① 1 プロセス内でシングルトン化（`react` の cache 使用）
// // ② 必要なら headers に認証トークンなどを追加
// // --------------------------------------------------
// export const getClient = cache(() =>
//   new GraphQLClient(API_URL, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// )

// // 共通 fetcher
// export async function fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
//   try {
//     return await getClient().request<T>(query, variables)
//   } catch (err) {
//     console.error('[GraphQL] request failed →', err)
//     throw err
//   }
// }
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

console.log('WordPress API Configuration:')
console.log('- API_URL:', API_URL)
console.log('- isWordPressAvailable:', isWordPressAvailable)

if (!isWordPressAvailable) {
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
    console.log('[GraphQL] Attempting request to:', API_URL)
    const result = await getClient().request<T>(query, variables)
    console.log('[GraphQL] Request successful')
    return result
  } catch (err) {
    console.error('[GraphQL] Request failed:', err)
    console.error('[GraphQL] API URL:', API_URL)
    console.error('[GraphQL] Variables:', variables)
    throw err
  }
}