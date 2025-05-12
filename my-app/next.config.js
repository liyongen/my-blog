/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img1.mukewang.com'],//可以访问网络图片的域名白名单
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // staticPageGenerationTimeout: 60, // 设置静态页面生成超时时间为 60 秒

};

const withMDX = require('@next/mdx')({//能解释.mdx的后缀文件
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const removeImports = require('next-remove-imports')();

module.exports = removeImports(withMDX(nextConfig));//写文章的编译器
