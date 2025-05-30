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
  GET_INDUSTRY_DATA,
  GET_ALL_SERVICES,
  GET_INDUSTRIES_LIST
} from './queries'

// =============================
// Helper Functions
// =============================

// WordPress から取得したデータを正規化する関数
function normalizeService(service: any): Service {
  // serviceDetailフィールドを既存フィールドにフォールバック
  const extractPrice = () => {
    if (service.serviceDetail?.price) return service.serviceDetail.price
    if (service.excerpt) {
      // excerptから価格情報を抽出する簡単なロジック
      const priceMatch = service.excerpt.match(/￥[\d,]+|月額[\d,]+円|[$]?[\d,]+/)
      return priceMatch ? priceMatch[0] : 'お問い合わせ'
    }
    return 'お問い合わせ'
  }
  
  const extractSummary = () => {
    if (service.serviceDetail?.serviceSummary) return service.serviceDetail.serviceSummary
    if (service.excerpt) return service.excerpt
    if (service.content) {
      // contentから最初の100文字を抽出
      const cleanContent = service.content.replace(/<[^>]*>/g, '').trim()
      return cleanContent.substring(0, 100) + (cleanContent.length > 100 ? '...' : '')
    }
    return 'サービスの詳細情報'
  }
  
  const normalized = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    excerpt: service.excerpt || '',
    content: service.content || '',
    featuredImage: service.featuredImage,
    serviceDetail: service.serviceDetail,
    // 既存フィールドでサポートするサービスフィールド
    serviceFields: {
      price: extractPrice(),
      summary: extractSummary(),
      logo: service.serviceDetail?.logo || service.featuredImage
    },
    industries: service.industries
  }
  
  return normalized
}

// =============================
// Fetcher Functions with Fallback
// =============================

// ホームページデータ取得
export async function getHomeData() {
  if (USE_MOCK_DATA) {
    return getMockHomeData()
  }

  try {
    const data = await fetchGraphQL<{
      allService: { nodes: any[] }
      posts: { nodes: any[] }
      categories: { nodes: Industry[] }
    }>(GET_HOME_DATA)
    
    return {
      services: data.allService.nodes.map(normalizeService),
      posts: data.posts.nodes,
      industries: data.categories.nodes
    }
  } catch (error) {
    return getMockHomeData()
  }
}

// ホームページ用サービス一覧取得
export async function getHomeServices(): Promise<Service[]> {
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
  if (USE_MOCK_DATA) {
    return getMockServiceData(slug)
  }

  try {
    const data = await fetchGraphQL<{ service: any }>(GET_SERVICE_DATA, { slug })
    
    if (!data.service) {
      throw new Error(`Service with slug "${slug}" not found in WordPress`)
    }
    
    const normalizedService = normalizeService(data.service)
    
    return normalizedService
  } catch (error) {
    return getMockServiceData(slug)
  }
}

// ブログ記事データ取得
export async function getPostData(slug: string): Promise<Post> {
  if (USE_MOCK_DATA) {
    return getMockPostData(slug)
  }

  try {
    const data = await fetchGraphQL<{ post: Post }>(GET_POST_DATA, { slug })
    
    if (!data.post) {
      throw new Error(`Post with slug "${slug}" not found in WordPress`)
    }
    
    return data.post
  } catch (error) {
    return getMockPostData(slug)
  }
}

// 業界ページデータ取得
export async function getIndustryData(slug: string) {
  if (USE_MOCK_DATA) {
    return getMockIndustryData(slug)
  }

  try {
    // First, fetch the category information
    const categoryData = await fetchGraphQL<{ category: any }>(GET_INDUSTRY_DATA, { slug })
    
    if (!categoryData.category) {
      // Return fallback data instead of throwing error
      return createFallbackIndustryData(slug)
    }
    
    // Then, fetch all services and filter by category
    const servicesData = await fetchGraphQL<{ allService: { nodes: any[] } }>(GET_ALL_SERVICES)
    
    // Filter services that belong to this category
    const categoryServices = servicesData.allService?.nodes?.filter(service => 
      service.industries?.nodes?.some(industry => industry.slug === slug)
    ) || []
    
    return {
      industry: {
        id: categoryData.category.id,
        slug: categoryData.category.slug,
        name: categoryData.category.name,
        description: categoryData.category.description
      },
      services: categoryServices.map(normalizeService)
    }
  } catch (error) {
    return createFallbackIndustryData(slug)
  }
}

// フォールバックデータ作成関数
function createFallbackIndustryData(slug: string) {
  // 業界名マッピング
  const industryNameMap: Record<string, string> = {
    'finance': '金融',
    'pharma': '製薬',
    'manufacturing': '製造業',
    'healthcare': '医療・ヘルスケア',
    'retail': '小売・流通',
    'logistics': '物流',
    'education': '教育',
    'agriculture': '農業',
    'construction': '建設・建築',
    'energy': 'エネルギー'
  }
  
  const industryName = industryNameMap[slug] || `${slug.charAt(0).toUpperCase() + slug.slice(1)}`
  
  // 基本的な業界情報を作成
  const industry = {
    id: `fallback-${slug}`,
    slug: slug,
    name: industryName,
    description: `${industryName}業界向けのAIソリューション一覧。業務効率化と生産性向上を実現する最新のAI技術をご紹介します。`
  }
  
  // モックデータから関連サービスを取得
  try {
    const mockData = getMockIndustryData(slug)
    return {
      industry,
      services: mockData.services
    }
  } catch (error) {
    // モックデータも取得できない場合は汎用サービスを提供
    return {
      industry,
      services: []
    }
  }
}

// 検索機能
export async function searchContent(searchTerm: string): Promise<SearchResult> {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return { services: [], posts: [] }
  }
  
  if (USE_MOCK_DATA) {
    return mockSearchContent(searchTerm)
  }

  try {
    const data = await fetchGraphQL<{
      services: { nodes: any[] }
      posts: { nodes: Post[] }
    }>(SEARCH_QUERY, { searchTerm: searchTerm.trim() })
    
    return {
      services: data.services.nodes.map(normalizeService),
      posts: data.posts.nodes
    }
  } catch (error) {
    return mockSearchContent(searchTerm)
  }
}

// サービス一覧取得（業界フィルタリング対応）
export async function getServices(industrySlug?: string): Promise<Service[]> {
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
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    return getMockAiServices()
  }

  try {
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
    return data.aiServices.nodes
  } catch (error) {
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
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    return getMockCaseStudies()
  }

  try {
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
    return data.caseStudies.nodes
  } catch (error) {
    return getMockCaseStudies()
  }
}

// 業界別ソリューション取得（サービス数付き）
export async function getIndustrySolutions(): Promise<any[]> {
  if (USE_MOCK_DATA) {
    return getMockIndustrySolutions()
  }

  try {
    const data = await fetchGraphQL<{ categories: { nodes: any[] } }>(GET_INDUSTRIES_LIST)
    
    if (!data.categories?.nodes || data.categories.nodes.length === 0) {
      return getMockIndustrySolutions()
    }
    
    // 各業界のサービス数を取得するための並列処理（エラーハンドリング改善）
    const industriesWithCounts = await Promise.all(
      data.categories.nodes.map(async (category) => {
        try {
          const industryData = await getIndustryData(category.slug)
          return {
            id: category.id,
            slug: category.slug,
            name: category.name,
            description: category.description || `${category.name}業界向けのAIソリューション`,
            serviceCount: industryData.services.length,
            image: '/placeholder.svg'
          }
        } catch (error) {
          // エラーが発生した場合でも基本情報は返す
          return {
            id: category.id,
            slug: category.slug,
            name: category.name,
            description: category.description || `${category.name}業界向けのAIソリューション`,
            serviceCount: 0,
            image: '/placeholder.svg'
          }
        }
      })
    )
    
    // サービスが1件以上ある業界のみを返す（フォールバックも含める）
    const industriesWithServices = industriesWithCounts.filter(industry => industry.serviceCount > 0)
    
    // もし何も見つからなければモックデータを返す
    if (industriesWithServices.length === 0) {
      return getMockIndustrySolutions()
    }
    
    return industriesWithServices
  } catch (error) {
    return getMockIndustrySolutions()
  }
}

// 単一ケーススタディ取得
export async function getCaseStudy(slug: string): Promise<any> {
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
    return getMockCaseStudy(slug)
  }
}