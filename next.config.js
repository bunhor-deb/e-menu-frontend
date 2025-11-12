// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   future: { webpack5: true },
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//   },
//   env: {
//     siteTitle: 'Doggy Stickers',
//     siteDescription: 'Get some Doggy Stickers!',
//     siteKeywords: 'dog, stickers, fun',
//     siteUrl: 'https://www.doggystickers.xyz',
//     siteImagePreviewUrl: '/images/main.jpg',
//     twitterHandle: '@deepwhitman'
//   },
//   images: {
//     domains: ['cdn.shopify.com'],
//   },
// })

module.exports = {
  env: {
    siteTitle: "E-MENU",
    siteDescription: "Get Clothes Here!",
    siteKeywords: "closes, fashion, trendy",
    siteUrl: "https://www.e-menu.xyz",
    siteImagePreviewUrl: "/images/main.jpg",
    twitterHandle: "",
  },
  images: {
    // Use remotePatterns to whitelist external image hosts (more secure)
    remotePatterns: [
      // Removed cdn.shopify.com as Shopify integration is no longer used.
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
