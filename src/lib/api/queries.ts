import { gql } from 'graphql-request';

// トップページ用のクエリ
export const GET_HOME_DATA = gql`
  query GetHomeData {
    services(first: 6) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        serviceFields {
          price
          summary
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
    posts(first: 6) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    industries: categories(where: {slug: ["finance", "pharma", "manufacturing"]}) {
      nodes {
        id
        slug
        name
        description
      }
    }
  }
`;

// 業界ページ用のクエリ
export const GET_INDUSTRY_DATA = gql`
  query GetIndustryData($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      slug
      name
      description
      services: posts(where: {categoryName: $slug}) {
        nodes {
          id
          slug
          title
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          serviceFields {
            price
            summary
            logo {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

// サービス詳細ページ用のクエリ
export const GET_SERVICE_DATA = gql`
  query GetServiceData($slug: ID!) {
    service: post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      serviceFields {
        price
        summary
        logo {
          sourceUrl
        }
      }
      industries: categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`;

// ブログ記事ページ用のクエリ
export const GET_POST_DATA = gql`
  query GetPostData($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`;

// 検索用のクエリ
export const SEARCH_QUERY = gql`
  query SearchQuery($searchTerm: String!) {
    services: posts(where: {search: $searchTerm}) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        serviceFields {
          price
          summary
          logo {
            sourceUrl
          }
        }
      }
    }
    posts(where: {search: $searchTerm, categoryNotIn: ["finance", "pharma", "manufacturing"]}) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
