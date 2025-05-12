This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
nodejs是14.17.3
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

"dependencies": {
"react": "^19.0.0",
"react-dom": "^19.0.0",
"next": "15.3.1"
},
"devDependencies": {
"typescript": "^5",
"@types/node": "^20",
"@types/react": "^19",
"@types/react-dom": "^19",
"eslint": "^9",
"eslint-config-next": "15.3.1",
"@eslint/eslintrc": "^3"
}

## 各种标点符号用法

https://blog.csdn.net/m0_56542349/article/details/127180648
https://blog.csdn.net/time_____/article/details/129345409
https://www.cnblogs.com/lxlx1798/articles/18544146
https://www.cnblogs.com/smileZAZ/p/17560907.html
https://juejin.cn/post/7382040898571976742

ssr   每一次刷新页面都会请求接口，然后重新渲染页面，返回静态页面给前端，适合nextjs，适合动态页面，适合app，适合移动端，适合seo，适合爬虫，适合搜索引擎--------服务端提前把你要的html包括数据都拿好了给你，直接给到前端

ssg   静态站点生成，每一次编译打包阶段页面已经生成好了时候，静态页面已经代理起来，例如1到10张图片的url已经全部加载完，然后当你命中其中一个url时候，直接展示静态页面，不需要经过服务端，不需要根据用户的数据变化而改变的静态页面，内容是一直不变的，缺点，动态元素比较多的时候，不适合，适合官网

csr   客户端渲染，服务端后端只返回html，然后通过js加载数据，然后渲染页面，缺点，加载速度慢，适合动态页面，适合app，这种方法通常涉及将HTML、CSS和JavaScript代码发送到用户的浏览器，然后由浏览器执行JavaScript代码来生成和渲染页面的剩余部分。服务端没有具体的数据返回，后面需要请求js资源的，再把数据渲染到页面来，tag页面就是,现在大部分web2.0的形式都是这个，对seo不友好，只能爬到一个空盒子，相比之下，服务器端渲染（SSR，Server-Side Rendering）是在服务器上完成HTML的生成和发送到客户端的过程。

## 课程视频链接
https://www.bilibili.com/video/BV1nYw8eSEfz?spm_id_from=333.788.player.switch&vd_source=465d99eec21ee0e0935f3e8494ea96b5&p=48

Largest ContentfulPaint (LcP):最大内容绘制，测量加载性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的2.5 秒内发生。
First Input Delay_(EID):首次输入延迟，测量交互性。为了提供良好的用户体验，页面的 FID 应为100 毫秒或更短。
Cumulative Layout Shift_(CLS):累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持在 0.1.或更少，
TTFB    首次接收到一个字节的时间
FCP      首次内容绘制时间




nextjs这个框架就是说可以代码能在服务端与客户端都跑起来，支持csr与ssr
