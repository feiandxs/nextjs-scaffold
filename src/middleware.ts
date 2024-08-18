import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { responseTimeMiddleware } from '@/middlewares/response-time';

export function middleware(request: NextRequest) {
  // 应用响应时间中间件
  const response = responseTimeMiddleware(request);

  // 如果有其他中间件，可以在这里继续应用
  // 例如：
  // response = anotherMiddleware(request, response)
  // response = yetAnotherMiddleware(request, response)

  return response;
}

// 配置中间件应用的路径
export const config = {
  matcher: '/:path*',
};
