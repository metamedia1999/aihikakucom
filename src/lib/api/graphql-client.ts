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
const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT!

if (!API_URL) {
  throw new Error('環境変数 NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT が未設定です')
}

// --------------------------------------------------
// ① 1 プロセス内でシングルトン化（`react` の cache 使用）
// ② 必要なら headers に認証トークンなどを追加
// --------------------------------------------------
export const getClient = cache(() =>
  new GraphQLClient(API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
)

// 共通 fetcher
export async function fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  try {
    return await getClient().request<T>(query, variables)
  } catch (err) {
    console.error('[GraphQL] request failed →', err)
    throw err
  }
}