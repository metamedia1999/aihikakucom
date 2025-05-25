// // import { fetchGraphQL } from './graphql-client';
// // import {
// //   GET_HOME_DATA,
// //   GET_INDUSTRY_DATA,
// //   GET_SERVICE_DATA,
// //   GET_POST_DATA,
// //   SEARCH_QUERY
// // } from './queries';
// // import type { Industry, Service, Post, SearchResult } from '@/types';
// // import {
// //   getMockHomeData,
// //   getMockIndustryData,
// //   getMockServiceData,
// //   getMockPostData,
// //   mockSearchContent
// // } from './mocks';

// // // モックデータを使用するかどうかのフラグ
// // const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// // // ホームページデータ取得関数
// // export async function getHomeData() {
// //   if (USE_MOCK_DATA) {
// //     return getMockHomeData();
// //   }

// //   type HomeData = {
// //     services: { nodes: Service[] };
// //     posts: { nodes: Post[] };
// //     industries: { nodes: Industry[] };
// //   };

// //   const response = await fetchGraphQL<HomeData>(GET_HOME_DATA);

// //   return {
// //     services: response.services.nodes,
// //     posts: response.posts.nodes,
// //     industries: response.industries.nodes,
// //   };
// // }

// // // 業界ページデータ取得関数
// // export async function getIndustryData(slug: string) {
// //   if (USE_MOCK_DATA) {
// //     return getMockIndustryData(slug);
// //   }

// //   type IndustryData = {
// //     category: {
// //       id: string;
// //       slug: string;
// //       name: string;
// //       description: string;
// //       services: { nodes: Service[] };
// //     };
// //   };

// //   const response = await fetchGraphQL<IndustryData>(GET_INDUSTRY_DATA, { slug });

// //   return {
// //     industry: {
// //       id: response.category.id,
// //       slug: response.category.slug,
// //       name: response.category.name,
// //       description: response.category.description,
// //     },
// //     services: response.category.services.nodes,
// //   };
// // }

// // // サービスページデータ取得関数
// // export async function getServiceData(slug: string) {
// //   if (USE_MOCK_DATA) {
// //     return getMockServiceData(slug);
// //   }

// //   type ServiceData = {
// //     service: Service;
// //   };

// //   const response = await fetchGraphQL<ServiceData>(GET_SERVICE_DATA, { slug });

// //   return response.service;
// // }

// // // ブログ記事データ取得関数
// // export async function getPostData(slug: string) {
// //   if (USE_MOCK_DATA) {
// //     return getMockPostData(slug);
// //   }

// //   type PostData = {
// //     post: Post;
// //   };

// //   const response = await fetchGraphQL<PostData>(GET_POST_DATA, { slug });

// //   return response.post;
// // }

// // // 検索機能
// // export async function searchContent(searchTerm: string): Promise<SearchResult> {
// //   if (USE_MOCK_DATA) {
// //     return mockSearchContent(searchTerm);
// //   }

// //   type SearchData = {
// //     services: { nodes: Service[] };
// //     posts: { nodes: Post[] };
// //   };

// //   const response = await fetchGraphQL<SearchData>(SEARCH_QUERY, { searchTerm });

// //   return {
// //     services: response.services.nodes,
// //     posts: response.posts.nodes,
// //   };
// // }
// // import { fetchGraphQL } from './graphql-client'
// // import { GET_HOME_DATA, GET_SERVICE_DATA } from './queries'
// // import type { Service } from '@/types'

// // // ホームページ：サービス一覧
// // export async function getHomeServices(): Promise<Service[]> {
// //   const data = await fetchGraphQL<{ allService: { nodes: Service[] } }>(GET_HOME_DATA)
// //   return data.allService.nodes
// // }

// // // サービス詳細
// // export async function getServiceData(slug: string): Promise<Service> {
// //   const data = await fetchGraphQL<{ service: Service }>(GET_SERVICE_DATA, { slug })
// //   return data.service
// // }

// // import { fetchGraphQL } from './graphql-client'
// // import { GET_HOME_DATA, GET_SERVICE_DATA } from './queries'
// // import type { Service } from '@/types'

// // // ホームページ：サービス一覧
// // export async function getHomeServices(): Promise<Service[]> {
// //   const data = await fetchGraphQL<{ allService: { nodes: Service[] } }>(GET_HOME_DATA)
// //   return data.allService.nodes
// // }

// // // サービス詳細
// // export async function getServiceData(slug: string): Promise<Service> {
// //   const data = await fetchGraphQL<{ service: Service }>(GET_SERVICE_DATA, { slug })
// //   return data.service
// // }

// import { fetchGraphQL } from './graphql-client'
// import { GET_HOME_DATA, GET_SERVICE_DATA } from './queries'
// import type { Service } from '@/types'

// // ホームページ：サービス一覧
// export async function getHomeServices(): Promise<Service[]> {
//   const data = await fetchGraphQL<{ allService: { nodes: Service[] } }>(GET_HOME_DATA)
//   return data.allService.nodes
// }

// // サービス詳細
// export async function getServiceData(slug: string): Promise<Service> {
//   const data = await fetchGraphQL<{ service: Service }>(GET_SERVICE_DATA, { slug })
//   return data.service
// }

// import { SEARCH_QUERY } from './queries'
// import type { Service, Post } from '@/types'

// // 検索クエリ実行関数
// export async function searchContent(searchTerm: string): Promise<{ services: Service[]; posts: Post[] }> {
//   const response = await fetchGraphQL<{
//     services: { nodes: Service[] }
//     posts: { nodes: Post[] }
//   }>(SEARCH_QUERY, { searchTerm })

//   return {
//     services: response.services.nodes,
//     posts: response.posts.nodes,
//   }
// }
import { gql } from 'graphql-request'

// =============================
// WordPress ↔︎ WPGraphQL のスキーマに合わせる
//   - CPT 名が `Service` → allService / service
//   - ACF の Group 名が `serviceDetail`
// =============================

// ホームページ用クエリ
export const GET_HOME_DATA = gql`
  query GetHomeData {
    allService(first: 12) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        serviceDetail {
          price
          serviceSummary
          logo {
            sourceUrl
          }
        }
        industries {
          nodes {
            id
            slug
            name
          }
        }
      }
    }
  }
`

// サービス詳細ページ用クエリ
export const GET_SERVICE_DATA = gql`
  query GetServiceData($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      serviceDetail {
        price
        serviceSummary
        aiUtilization
        effectiveness
        supportLevel
        industryCategory
        transparencyScore
        logo {
          sourceUrl
        }
      }
      industries {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`
// getHomeData 追加
export async function getHomeData() {
  const data = await fetchGraphQL<{ allService: { nodes: Service[] } }>(GET_HOME_DATA)
  return { services: data.allService.nodes }
}

// getPostData 追加
export async function getPostData(slug: string) {
  const query = gql`...` // ← GET_POST_DATA 定義が別途必要
  const data = await fetchGraphQL<{ post: Post }>(query, { slug })
  return data.post
}

// searchContent 追加
export async function searchContent(term: string) {
  const query = gql`...` // ← SEARCH_QUERY 定義が別途必要
  const data = await fetchGraphQL<{ services: { nodes: Service[] }; posts: { nodes: Post[] } }>(query, { searchTerm: term })
  return { services: data.services.nodes, posts: data.posts.nodes }
}
