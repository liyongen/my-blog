import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {//打印在终端，tag中间件，先执行，后执行页面逻辑
  console.log(2222222222222222222);
  console.log(req);
}
