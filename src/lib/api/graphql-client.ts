import { GraphQLClient } from 'graphql-request';
import { cache } from 'react';

// GraphQLエンドポイント
const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT!;

// キャッシュ可能なGraphQLクライアントを作成
export const getClient = cache(() => {
  return new GraphQLClient(API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

// 共通のクエリフェッチ関数
export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  try {
    const client = getClient();
    return await client.request<T>(query, variables);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
