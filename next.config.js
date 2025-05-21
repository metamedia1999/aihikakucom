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
  images: {
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
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // exportPathMap設定を削除
};

export default nextConfig;