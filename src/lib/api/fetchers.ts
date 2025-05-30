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
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 normalizeService called with:', {
      id: service.id,
      title: service.title,
      hasServiceDetail: !!service.serviceDetail,
      hasServiceFields: !!service.serviceFields,
      serviceDetailStructure: service.serviceDetail ? Object.keys(service.serviceDetail) : null,
      serviceFieldsStructure: service.serviceFields ? Object.keys(service.serviceFields) : null
    })
  }
  
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
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Service normalized:', {
      hasServiceDetail: !!normalized.serviceDetail,
      hasServiceFields: !!normalized.serviceFields,
      extractedPrice: normalized.serviceFields.price,
      extractedSummary: normalized.serviceFields.summary?.substring(0, 50) + '...',
      industriesCount: normalized.industries?.nodes?.length || 0
    })
  }
  
  return normalized
}

// =============================
// Fetcher Functions with Fallback
// =============================

// ホームページデータ取得
export async function getHomeData() {
  if (process.env.NODE_ENV === 'development') {
    console.log('🏠 getHomeData called, USE_MOCK_DATA:', USE_MOCK_DATA)
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock data for home page')
    }
    return getMockHomeData()
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Attempting to fetch from WordPress GraphQL...')
    }
    const data = await fetchGraphQL<{
      allService: { nodes: any[] }
      posts: { nodes: any[] }
      categories: { nodes: Industry[] }
    }>(GET_HOME_DATA)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 WordPress home data fetched successfully:', {
        servicesCount: data.allService?.nodes?.length || 0,
        postsCount: data.posts?.nodes?.length || 0,
        categoriesCount: data.categories?.nodes?.length || 0
      })
    }
    
    return {
      services: data.allService.nodes.map(normalizeService),
      posts: data.posts.nodes,
      industries: data.categories.nodes
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WordPress home data fetch failed, using fallback data')
    }
    return getMockHomeData()
  }
}

// ホームページ用サービス一覧取得
export async function getHomeServices(): Promise<Service[]> {
  if (process.env.NODE_ENV === 'development') {
    console.log('getHomeServices called')
  }
  
  try {
    const homeData = await getHomeData()
    return homeData.services
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching home services:', error)
    }
    const mockData = getMockHomeData()
    return mockData.services
  }
}

// サービス詳細データ取得
export async function getServiceData(slug: string): Promise<Service> {
  if (process.env.NODE_ENV === 'development') {
    console.log('📋 getServiceData called for slug:', slug)
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock data for service:', slug)
    }
    return getMockServiceData(slug)
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Attempting to fetch service from WordPress GraphQL...')
      console.log('🔍 Query variables:', { slug })
    }
    
    const data = await fetchGraphQL<{ service: any }>(GET_SERVICE_DATA, { slug })
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 GraphQL response received:', {
        hasService: !!data.service,
        serviceTitle: data.service?.title,
        hasServiceDetail: !!data.service?.serviceDetail,
        hasServiceFields: !!data.service?.serviceFields,
        serviceDetailKeys: data.service?.serviceDetail ? Object.keys(data.service.serviceDetail) : null,
        serviceFieldsKeys: data.service?.serviceFields ? Object.keys(data.service.serviceFields) : null
      })
    }
    
    if (!data.service) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Service not found in GraphQL response:', slug)
      }
      throw new Error(`Service with slug "${slug}" not found in WordPress`)
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ WordPress service data fetched successfully')
    }
    const normalizedService = normalizeService(data.service)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Service normalization complete:', {
        id: normalizedService.id,
        title: normalizedService.title,
        hasServiceDetail: !!normalizedService.serviceDetail,
        hasServiceFields: !!normalizedService.serviceFields
      })
    }
    
    return normalizedService
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WordPress service fetch failed, using fallback data for:', slug)
    }
    return getMockServiceData(slug)
  }
}

// ブログ記事データ取得
export async function getPostData(slug: string): Promise<Post> {
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 getPostData called for slug:', slug)
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock data for post:', slug)
    }
    return getMockPostData(slug)
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Attempting to fetch post from WordPress GraphQL...')
      console.log('🔍 Query variables:', { slug })
    }
    
    const data = await fetchGraphQL<{ post: Post }>(GET_POST_DATA, { slug })
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 GraphQL response received:', {
        hasPost: !!data.post,
        postTitle: data.post?.title,
        postExcerpt: data.post?.excerpt?.substring(0, 100) + '...',
        postContentLength: data.post?.content?.length || 0
      })
    }
    
    if (!data.post) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Post not found in GraphQL response:', slug)
      }
      throw new Error(`Post with slug "${slug}" not found in WordPress`)
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ WordPress post data fetched successfully')
    }
    return data.post
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WordPress post fetch failed, using fallback data for:', slug)
    }
    return getMockPostData(slug)
  }
}

// 業界ページデータ取得
export async function getIndustryData(slug: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('🏢 getIndustryData called for slug:', slug)
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock data for industry:', slug)
    }
    return getMockIndustryData(slug)
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Attempting to fetch industry from WordPress GraphQL...')
    }
    
    // First, fetch the category information
    const categoryData = await fetchGraphQL<{ category: any }>(GET_INDUSTRY_DATA, { slug })
    
    if (!categoryData.category) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Category not found in GraphQL, using fallback data for:', slug)
      }
      // Return fallback data instead of throwing error
      return createFallbackIndustryData(slug)
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Category fetched:', categoryData.category?.name)
    }
    
    // Then, fetch all services and filter by category
    const servicesData = await fetchGraphQL<{ allService: { nodes: any[] } }>(GET_ALL_SERVICES)
    
    // Filter services that belong to this category
    const categoryServices = servicesData.allService?.nodes?.filter(service => 
      service.industries?.nodes?.some(industry => industry.slug === slug)
    ) || []
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Services filtered:', categoryServices.length, 'found')
    }
    
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
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WordPress industry fetch failed, using fallback for:', slug)
    }
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
  if (process.env.NODE_ENV === 'development') {
    console.log('searchContent called with term:', searchTerm)
  }
  
  if (!searchTerm || searchTerm.trim().length === 0) {
    return { services: [], posts: [] }
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock search for term:', searchTerm)
    }
    return mockSearchContent(searchTerm)
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Attempting to search WordPress...')
    }
    const data = await fetchGraphQL<{
      services: { nodes: any[] }
      posts: { nodes: Post[] }
    }>(SEARCH_QUERY, { searchTerm: searchTerm.trim() })
    
    if (process.env.NODE_ENV === 'development') {
      console.log('WordPress search completed successfully')
    }
    return {
      services: data.services.nodes.map(normalizeService),
      posts: data.posts.nodes
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('WordPress search failed, falling back to mock search:', error)
    }
    return mockSearchContent(searchTerm)
  }
}

// サービス一覧取得（業界フィルタリング対応）
export async function getServices(industrySlug?: string): Promise<Service[]> {
  if (process.env.NODE_ENV === 'development') {
    console.log('getServices called with industrySlug:', industrySlug)
  }
  
  try {
    if (industrySlug) {
      const industryData = await getIndustryData(industrySlug)
      return industryData.services
    } else {
      return await getHomeServices()
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching services:', error)
    }
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
  if (process.env.NODE_ENV === 'development') {
    console.log('getPosts called')
  }
  
  try {
    const homeData = await getHomeData()
    
    // デバッグ用のログ出力
    console.log('=== getPosts Debug Info ===')
    console.log('Total posts fetched:', homeData.posts?.length || 0)
    console.log('First few posts:', homeData.posts?.slice(0, 3).map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug
    })))
    console.log('Last few posts:', homeData.posts?.slice(-3).map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug
    })))
    console.log('==========================')
    
    return homeData.posts
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching posts:', error)
    }
    const mockData = getMockHomeData()
    
    // モックデータのデバッグログ
    console.log('=== getPosts Mock Data Debug ===')
    console.log('Mock posts length:', mockData.posts?.length || 0)
    console.log('================================')
    
    return mockData.posts
  }
}

// 業界一覧取得
export async function getIndustries(): Promise<Industry[]> {
  if (process.env.NODE_ENV === 'development') {
    console.log('getIndustries called')
  }
  
  try {
    const homeData = await getHomeData()
    return homeData.industries
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching industries:', error)
    }
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
  if (process.env.NODE_ENV === 'development') {
    console.log('getAiServices called')
  }
  
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock data for AI services')
    }
    return getMockAiServices()
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching AI services from WordPress...')
    }
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
    if (process.env.NODE_ENV === 'development') {
      console.log('AI services fetched successfully')
    }
    return data.aiServices.nodes
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('WordPress AI services fetch failed, falling back to mock data:', error)
    }
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
  if (process.env.NODE_ENV === 'development') {
    console.log('getCaseStudies called')
  }
  
  // モックデータを使用する場合の早期リターン
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock data for case studies')
    }
    return getMockCaseStudies()
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching case studies from WordPress...')
    }
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
    if (process.env.NODE_ENV === 'development') {
      console.log('Case studies fetched successfully')
    }
    return data.caseStudies.nodes
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('WordPress case studies fetch failed, falling back to mock data:', error)
    }
    return getMockCaseStudies()
  }
}

// 業界別ソリューション取得（サービス数付き）
export async function getIndustrySolutions(): Promise<any[]> {
  if (process.env.NODE_ENV === 'development') {
    console.log('🏢 getIndustrySolutions called')
  }
  
  if (USE_MOCK_DATA) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock data for industry solutions')
    }
    return getMockIndustrySolutions()
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Attempting to fetch categories from WordPress GraphQL...')
    }
    
    const data = await fetchGraphQL<{ categories: { nodes: any[] } }>(GET_INDUSTRIES_LIST)
    
    if (!data.categories?.nodes || data.categories.nodes.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ No categories found in GraphQL, using fallback data')
      }
      return getMockIndustrySolutions()
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Categories fetched:', data.categories.nodes.length)
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
            image: '/placeholder.jpg'
          }
        } catch (error) {
          // エラーが発生した場合でも基本情報は返す
          if (process.env.NODE_ENV === 'development') {
            console.warn(`⚠️ Failed to fetch services for industry ${category.slug}, using 0 count`)
          }
          return {
            id: category.id,
            slug: category.slug,
            name: category.name,
            description: category.description || `${category.name}業界向けのAIソリューション`,
            serviceCount: 0,
            image: '/placeholder.jpg'
          }
        }
      })
    )
    
    // サービスが1件以上ある業界のみを返す（フォールバックも含める）
    const industriesWithServices = industriesWithCounts.filter(industry => industry.serviceCount > 0)
    
    // もし何も見つからなければモックデータを返す
    if (industriesWithServices.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ No industries with services found, using mock data')
      }
      return getMockIndustrySolutions()
    }
    
    return industriesWithServices
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WordPress categories fetch failed, using fallback data')
    }
    return getMockIndustrySolutions()
  }
}

// 単一ケーススタディ取得
export async function getCaseStudy(slug: string): Promise<any> {
  if (process.env.NODE_ENV === 'development') {
    console.log('getCaseStudy called for slug:', slug)
  }
  
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
    if (process.env.NODE_ENV === 'development') {
      console.warn('WordPress case study fetch failed, falling back to mock data:', error)
    }
    return getMockCaseStudy(slug)
  }
}
//