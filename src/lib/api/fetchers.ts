import { gql } from 'graphql-request'
import { fetchGraphQL } from './graphql-client'
import type { Service, Post, SearchResult, Industry } from '@/types'
import {
  getMockHomeData,
  getMockServiceData,
  getMockPostData,
  mockSearchContent,
  getMockIndustryData
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