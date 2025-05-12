import { NextRequest } from 'next/server';

const PUBLIC_PATH = /\.(.*)$/;

export function middleware(req: NextRequest) {//打印在终端，全局中间件
  // 1. 上报日志
  if (!PUBLIC_PATH.test(req?.nextUrl?.pathname)) {//不是路由信息我才上报
    console.log(1111122222);
    console.log(req.nextUrl);
    console.log(req.nextUrl.href);
    console.log(req.referrer);
    console.log(req.ua);
    console.log(req.geo);
    // 接口上报
  }

  // 2. 重定向，全局拦截，一定要想到中间件
  if (req?.nextUrl?.pathname === '/tag') {
    // return NextResponse?.redirect('/user/2');
  }
}
