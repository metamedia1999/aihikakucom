import { gql } from 'graphql-request'
import { fetchGraphQL } from './graphql-client'
import type { Service, Post, SearchResult, Industry } from '@/types'
import {
  getMockHomeData,
  getMockServiceData,
  getMockPostData,
  mockSearchContent,
  getMockIndustryData,
  getMockAiServices,
  getMockCaseStudies,
  getMockIndustrySolutions,
  getMockCaseStudy
} from './mocks'

// =============================
// Environment Configuration
// =============================
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || 
                      !process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT ||
                      process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT === 'https://example.com/graphql'

// =============================
// Query Imports
// =============================
import {
  GET_HOME_DATA,
  GET_SERVICE_DATA,
  GET_POST_DATA,
  SEARCH_QUERY,
  GET_INDUSTRY_DATA
} from './queries'

// =============================
// Helper Functions
// =============================

// WordPress から取得したデータを正規化する関数
function normalizeService(service: any): Service {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    excerpt: service.excerpt || '',
    content: service.content || '',
    featuredImage: service.featuredImage,
    serviceDetail: service.serviceDetail,
    // Legacy support
    serviceFields: service.serviceDetail ? {
      price: service.serviceDetail.price,
      summary: service.serviceDetail.serviceSummary,
      logo: service.serviceDetail.logo
    } : service.serviceFields,
    industries: service.industries
  }
}

// =============================
// Fetcher Functions with Fallback
// =============================

// ホームページデータ取得
export async function getHomeData() {
  console.log('getHomeData called, USE_MOCK_DATA:', USE_MOCK_DATA)
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for home page')
    return getMockHomeData()
  }

  try {
    console.log('Attempting to fetch from WordPress...')
    const data = await fetchGraphQL<{
      allService: { nodes: any[] }
      posts: { nodes: any[] }
      categories: { nodes: Industry[] }
    }>(GET_HOME_DATA)
    
    console.log('WordPress data fetched successfully')
    return {
      services: data.allService.nodes.map(normalizeService),
      posts: data.posts.nodes,
      industries: data.categories.nodes
    }
  } catch (error) {
    console.warn('WordPress fetch failed, falling back to mock data:', error)
    return getMockHomeData()
  }
}

// ホームページ用サービス一覧取得
export async function getHomeServices(): Promise<Service[]> {
  console.log('getHomeServices called')
  
  try {
    const homeData = await getHomeData()
    return homeData.services
  } catch (error) {
    console.error('Error fetching home services:', error)
    const mockData = getMockHomeData()
    return mockData.services
  }
}

// サービス詳細データ取得
export async function getServiceData(slug: string): Promise<Service> {
  console.log('getServiceData called for slug:', slug)
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for service:', slug)
    return getMockServiceData(slug)
  }

  try {
    console.log('Attempting to fetch service from WordPress...')
    const data = await fetchGraphQL<{ service: any }>(GET_SERVICE_DATA, { slug })
    
    if (!data.service) {
      throw new Error(`Service with slug "${slug}" not found`)
    }
    
    console.log('WordPress service data fetched successfully')
    return normalizeService(data.service)
  } catch (error) {
    console.warn('WordPress service fetch failed, falling back to mock data:', error)
    return getMockServiceData(slug)
  }
}

// ブログ記事データ取得
export async function getPostData(slug: string): Promise<Post> {
  console.log('getPostData called for slug:', slug)
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for post:', slug)
    return getMockPostData(slug)
  }

  try {
    console.log('Attempting to fetch post from WordPress...')
    const data = await fetchGraphQL<{ post: Post }>(GET_POST_DATA, { slug })
    
    if (!data.post) {
      throw new Error(`Post with slug "${slug}" not found`)
    }
    
    console.log('WordPress post data fetched successfully')
    return data.post
  } catch (error) {
    console.warn('WordPress post fetch failed, falling back to mock data:', error)
    return getMockPostData(slug)
  }
}

// 業界ページデータ取得
export async function getIndustryData(slug: string) {
  console.log('getIndustryData called for slug:', slug)
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for industry:', slug)
    return getMockIndustryData(slug)
  }

  try {
    console.log('Attempting to fetch industry from WordPress...')
    const data = await fetchGraphQL<{
      category: {
        id: string
        slug: string
        name: string
        description: string
        posts: { nodes: any[] }
      }
    }>(GET_INDUSTRY_DATA, { slug })
    
    if (!data.category) {
      throw new Error(`Industry with slug "${slug}" not found`)
    }
    
    console.log('WordPress industry data fetched successfully')
    return {
      industry: {
        id: data.category.id,
        slug: data.category.slug,
        name: data.category.name,
        description: data.category.description
      },
      services: data.category.posts.nodes.map(normalizeService)
    }
  } catch (error) {
    console.warn('WordPress industry fetch failed, falling back to mock data:', error)
    return getMockIndustryData(slug)
  }
}

// 検索機能
export async function searchContent(searchTerm: string): Promise<SearchResult> {
  console.log('searchContent called with term:', searchTerm)
  
  if (!searchTerm || searchTerm.trim().length === 0) {
    return { services: [], posts: [] }
  }
  
  if (USE_MOCK_DATA) {
    console.log('Using mock search for term:', searchTerm)
    return mockSearchContent(searchTerm)
  }

  try {
    console.log('Attempting to search WordPress...')
    const data = await fetchGraphQL<{
      services: { nodes: any[] }
      posts: { nodes: Post[] }
    }>(SEARCH_QUERY, { searchTerm: searchTerm.trim() })
    
    console.log('WordPress search completed successfully')
    return {
      services: data.services.nodes.map(normalizeService),
      posts: data.posts.nodes
    }
  } catch (error) {
    console.warn('WordPress search failed, falling back to mock search:', error)
    return mockSearchContent(searchTerm)
  }
}

// サービス一覧取得（業界フィルタリング対応）
export async function getServices(industrySlug?: string): Promise<Service[]> {
  console.log('getServices called with industrySlug:', industrySlug)
  
  try {
    if (industrySlug) {
      const industryData = await getIndustryData(industrySlug)
      return industryData.services
    } else {
      return await getHomeServices()
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    const mockData = getMockHomeData()
    if (industrySlug) {
      // Filter by industry if specified
      return mockData.services.filter(service =>
        service.industries?.nodes.some(industry => industry.slug === industrySlug)
      )
    }
    return mockData.services
  }
}

// 記事一覧取得
export async function getPosts(): Promise<Post[]> {
  console.log('getPosts called')
  
  try {
    const homeData = await getHomeData()
    return homeData.posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    const mockData = getMockHomeData()
    return mockData.posts
  }
}

// 業界一覧取得
export async function getIndustries(): Promise<Industry[]> {
  console.log('getIndustries called')
  
  try {
    const homeData = await getHomeData()
    return homeData.industries
  } catch (error) {
    console.error('Error fetching industries:', error)
    const mockData = getMockHomeData()
    return mockData.industries
  }
}

// =============================
// WordPress カスタムポストタイプ: AI Services, Case Studies, Industry Solutions
// =============================

// AI サービス取得
// 処理フロー:
// 1. モックデータ使用フラグをチェック
// 2. WordPress API経由でaiServicesカスタムポストタイプからデータ取得  
// 3. サービス詳細（価格、機能、カテゴリ、ベンダー、評価等）を含む
// 4. API失敗時はモックデータにフォールバック
export async function getAiServices(): Promise<any[]> {
  console.log('getAiServices called')
  
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    console.log('Using mock data for AI services')
    return getMockAiServices()
  }

  try {
    console.log('Fetching AI services from WordPress...')
    // WordPress GraphQL APIからAIサービスデータを取得
    const data = await fetchGraphQL<{ aiServices: { nodes: any[] } }>(gql`
      query GetAiServices {
        aiServices {
          nodes {
            id
            slug
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            aiServiceFields {
              price
              features
              category
              vendor
              rating
              summary
            }
          }
        }
      }
    `)
    console.log('AI services fetched successfully')
    return data.aiServices.nodes
  } catch (error) {
    console.warn('WordPress AI services fetch failed, falling back to mock data:', error)
    return getMockAiServices()
  }
}

// ケーススタディ取得
// 処理フロー:
// 1. モックデータ使用フラグをチェック
// 2. WordPress API経由でcaseStudiesカスタムポストタイプからデータ取得
// 3. 各ケースの詳細（企業名、業界、課題、解決策、結果等）を含む
// 4. API失敗時はモックデータにフォールバック
export async function getCaseStudies(): Promise<any[]> {
  console.log('getCaseStudies called')
  
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    console.log('Using mock data for case studies')
    return getMockCaseStudies()
  }

  try {
    console.log('Fetching case studies from WordPress...')
    // WordPress GraphQL APIからケーススタディデータを取得
    const data = await fetchGraphQL<{ caseStudies: { nodes: any[] } }>(gql`
      query GetCaseStudies {
        caseStudies {
          nodes {
            id
            slug
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            caseStudyFields {
              company
              industry
              challenge
              solution
              results
              usedServices
            }
          }
        }
      }
    `)
    console.log('Case studies fetched successfully')
    return data.caseStudies.nodes
  } catch (error) {
    console.warn('WordPress case studies fetch failed, falling back to mock data:', error)
    return getMockCaseStudies()
  }
}

// 業界別ソリューション取得
// 処理フロー:
// 1. モックデータ使用フラグをチェック
// 2. WordPress API経由でindustrySolutionsカスタムポストタイプからデータ取得
// 3. 各ソリューションの詳細情報（対象業界、解決課題、推奨サービス等）を含む
// 4. API失敗時はモックデータにフォールバック
export async function getIndustrySolutions(): Promise<any[]> {
  console.log('getIndustrySolutions called')
  
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    console.log('Using mock data for industry solutions')
    return getMockIndustrySolutions()
  }

  try {
    console.log('Fetching industry solutions from WordPress...')
    // WordPress GraphQL APIから業界別ソリューションデータを取得
    const data = await fetchGraphQL<{ industrySolutions: { nodes: any[] } }>(gql`
      query GetIndustrySolutions {
        industrySolutions {
          nodes {
            id
            slug
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            industrySolutionFields {
              targetIndustry
              problemsToSolve
              recommendedServices
              expectedBenefits
              implementationTime
            }
          }
        }
      }
    `)
    console.log('Industry solutions fetched successfully')
    return data.industrySolutions.nodes
  } catch (error) {
    console.warn('WordPress industry solutions fetch failed, falling back to mock data:', error)
    return getMockIndustrySolutions()
  }
}

// 単一ケーススタディ取得
export async function getCaseStudy(slug: string): Promise<any> {
  console.log('getCaseStudy called for slug:', slug)
  
  if (USE_MOCK_DATA) {
    return getMockCaseStudy(slug)
  }

  try {
    const data = await fetchGraphQL<{ caseStudy: any }>(gql`
      query GetCaseStudy($slug: ID!) {
        caseStudy(id: $slug, idType: SLUG) {
          id
          slug
          title
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          caseStudyFields {
            company
            industry
            challenge
            solution
            results
            usedServices
          }
        }
      }
    `, { slug })
    
    if (!data.caseStudy) {
      throw new Error(`Case study with slug "${slug}" not found`)
    }
    
    return data.caseStudy
  } catch (error) {
    console.warn('WordPress case study fetch failed, falling back to mock data:', error)
    return getMockCaseStudy(slug)
  }
}