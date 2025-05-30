// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'img.ai-daiko.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//       },
//       {
//         protocol: 'https',
//         hostname: 'ai-daiko.com',
//       },
//     ],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   // 問題のあるルートを無効化
//   exportPathMap: async function () {
//     return {
//       '/': { page: '/' },
//       '/blog': { page: '/blog' },
//       // 他の静的ルートをここに追加
//       // 動的ルートは除外
//     };
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // パフォーマンス最適化（本番環境のみCSS最適化）
  experimental: {
    ...(process.env.NODE_ENV === 'production' && { optimizeCss: true }),
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  
  // Turbopack設定を簡素化（transformAlgorithm エラー修正）
  
  // 画像最適化設定
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1年間キャッシュ
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ai-daiko.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'ai-daiko.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.xn--ai-fk1eu00k.tokyo',
      },
    ],
  },
  
  // コンパイル最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Output設定（本番環境のみ）
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  
  // Webpack最適化を簡素化（transformAlgorithm エラー修正）
  webpack: (config) => {
    return config;
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // パフォーマンス向上のためのヘッダー設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self';"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/case-studies/case-1',
        destination: '/case-studies-case-1',
        permanent: true,
      },
      {
        source: '/blog/:slug*.jpg',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/blog/:slug*.png', 
        destination: '/404',
        permanent: false,
      },
      {
        source: '/blog/:slug*.gif',
        destination: '/404', 
        permanent: false,
      },
      {
        source: '/blog/:slug*.jpeg',
        destination: '/404', 
        permanent: false,
      },
    ]
  }
};

export default nextConfig;