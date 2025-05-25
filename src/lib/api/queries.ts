// import { gql } from 'graphql-request';

// // トップページ用のクエリ
// export const GET_HOME_DATA = gql`
//   query GetHomeData {
//     services(first: 6) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceFields {
//           price
//           summary
//           logo {
//             sourceUrl
//           }
//         }
//         industries {
//           nodes {
//             id
//             slug
//             name
//           }
//         }
//       }
//     }
//     posts(first: 6) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         date
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//       }
//     }
//     industries: categories(where: {slug: ["finance", "pharma", "manufacturing"]}) {
//       nodes {
//         id
//         slug
//         name
//         description
//       }
//     }
//   }
// `;

// // 業界ページ用のクエリ
// export const GET_INDUSTRY_DATA = gql`
//   query GetIndustryData($slug: ID!) {
//     category(id: $slug, idType: SLUG) {
//       id
//       slug
//       name
//       description
//       services: posts(where: {categoryName: $slug}) {
//         nodes {
//           id
//           slug
//           title
//           excerpt
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           serviceFields {
//             price
//             summary
//             logo {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// // サービス詳細ページ用のクエリ
// export const GET_SERVICE_DATA = gql`
//   query GetServiceData($slug: ID!) {
//     service: post(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       serviceFields {
//         price
//         summary
//         logo {
//           sourceUrl
//         }
//       }
//       industries: categories {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `;

// // ブログ記事ページ用のクエリ
// export const GET_POST_DATA = gql`
//   query GetPostData($slug: ID!) {
//     post(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       content
//       date
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       categories {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `;

// // 検索用のクエリ
// export const SEARCH_QUERY = gql`
//   query SearchQuery($searchTerm: String!) {
//     services: posts(where: {search: $searchTerm}) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceFields {
//           price
//           summary
//           logo {
//             sourceUrl
//           }
//         }
//       }
//     }
//     posts(where: {search: $searchTerm, categoryNotIn: ["finance", "pharma", "manufacturing"]}) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         date
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//       }
//     }
//   }
// `;
// import { gql } from 'graphql-request'

// // =============================
// // WordPress ↔︎ WPGraphQL の実際のスキーマ名に合わせる
// //   - CPT 名が `Service` → allService / service
// //   - ACF の Group 名が `serviceDetail`
// // =============================

// // 2-1 ▶ ホームページ（一覧）
// export const GET_HOME_DATA = gql`
//   query GetHomeData {
//     allService(first: 12) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceDetail {
//           price
//           serviceSummary
//           logo {
//             sourceUrl
//           }
//         }
//         industries {
//           nodes {
//             id
//             slug
//             name
//           }
//         }
//       }
//     }
//   }
// `

// // 2-2 ▶ サービス詳細ページ
// export const GET_SERVICE_DATA = gql`
//   query GetServiceData($slug: ID!) {
//     service(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       excerpt
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       serviceDetail {
//         price
//         serviceSummary
//         aiUtilization
//         effectiveness
//         supportLevel
//         industryCategory
//         transparencyScore
//         logo {
//           sourceUrl
//         }
//       }
//       industries {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `

// import { gql } from 'graphql-request'

// =============================
// WordPress ↔︎ WPGraphQL の実際のスキーマ名に合わせる
//   - CPT 名が `Service` → allService / service
//   - ACF の Group 名が `serviceDetail`
// =============================

// 2-1 ▶ ホームページ（一覧）
// export const GET_HOME_DATA = gql`
//   query GetHomeData {
//     allService(first: 12) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceDetail {
//           price
//           serviceSummary
//           logo {
//             sourceUrl
//           }
//         }
//         industries {
//           nodes {
//             id
//             slug
//             name
//           }
//         }
//       }
//     }
//   }
// `

// // 2-2 ▶ サービス詳細ページ
// export const GET_SERVICE_DATA = gql`
//   query GetServiceData($slug: ID!) {
//     service(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       excerpt
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       serviceDetail {
//         price
//         serviceSummary
//         aiUtilization
//         effectiveness
//         supportLevel
//         industryCategory
//         transparencyScore
//         logo {
//           sourceUrl
//         }
//       }
//       industries {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `

// import { gql } from 'graphql-request'

// // =============================
// // WordPress ↔︎ WPGraphQL の実際のスキーマ名に合わせる
// //   - CPT 名が `Service` → allService / service
// //   - ACF の Group 名が `serviceDetail`
// // =============================

// // 2-1 ▶ ホームページ（一覧）
// export const GET_HOME_DATA = gql`
//   query GetHomeData {
//     allService(first: 12) {
//       nodes {
//         id
//         slug
//         title
//         excerpt
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceDetail {
//           price
//           serviceSummary
//           logo {
//             sourceUrl
//           }
//         }
//         industries {
//           nodes {
//             id
//             slug
//             name
//           }
//         }
//       }
//     }
//   }
// `

// // 2-2 ▶ サービス詳細ページ
// export const GET_SERVICE_DATA = gql`
//   query GetServiceData($slug: ID!) {
//     service(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       excerpt
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       serviceDetail {
//         price
//         serviceSummary
//         aiUtilization
//         effectiveness
//         supportLevel
//         industryCategory
//         transparencyScore
//         logo {
//           sourceUrl
//         }
//       }
//       industries {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `

// import { gql } from 'graphql-request'

// // =============================
// // WordPress ↔︎ WPGraphQL のスキーマに合わせる
// //   - CPT 名が `Service` → allService / service
// //   - ACF の Group 名が `serviceDetail`
// // =============================

// // ホームページ用クエリ
// export const GET_HOME_DATA = gql`
//   query GetHomeData {
//     allService(first: 12) {
//       nodes {
//         id
//         slug
//         title
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         serviceDetail {
//           price
//           serviceSummary
//           logo {
//             sourceUrl
//           }
//         }
//         industries {
//           nodes {
//             id
//             slug
//             name
//           }
//         }
//       }
//     }
//   }
// `

// // サービス詳細ページ用クエリ
// export const GET_SERVICE_DATA = gql`
//   query GetServiceData($slug: ID!) {
//     service(id: $slug, idType: SLUG) {
//       id
//       slug
//       title
//       content
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       serviceDetail {
//         price
//         serviceSummary
//         aiUtilization
//         effectiveness
//         supportLevel
//         industryCategory
//         transparencyScore
//         logo {
//           sourceUrl
//         }
//       }
//       industries {
//         nodes {
//           id
//           slug
//           name
//         }
//       }
//     }
//   }
// `

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
//test