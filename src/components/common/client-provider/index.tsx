'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuthStore, useUserStore } from '@/store/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { UserInfo } from '@/types/user';

// 创建认证上下文
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

// 创建用户上下文
interface UserContextType {
  userInfo: UserInfo | null;
  isHydrated: boolean;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

// 创建使用认证上下文的Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在ClientProvider内部使用');
  }
  return context;
}

// 创建使用用户上下文的Hook
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser必须在ClientProvider内部使用');
  }
  return context;
}

// 客户端提供者组件
export function ClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const authStore = useAuthStore();
  const userStore = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!userStore.isHydrated) return;

    // 已登录用户访问登录/注册页面时重定向到 dashboard
    if (
      userStore.isAuthenticated &&
      (pathname === '/sign-in' || pathname === '/sign-up')
    ) {
      router.push('/dashboard');
      return;
    }

    // 未登录用户访问 dashboard 时重定向到登录页
    if (pathname?.startsWith('/dashboard') && !userStore.isAuthenticated) {
      userStore.clearAuth();
      userStore.clearUserInfo();

      const timer = setTimeout(() => {
        router.push('/sign-in');
      }, 3000);

      // eslint-disable-next-line consistent-return
      return () => clearTimeout(timer);
    }

    // 非管理员访问 admin 路由时重定向到首页
    if (pathname?.startsWith('/admin') && !userStore.userInfo?.isAdmin) {
      router.push('/sign-in');
    }
  }, [pathname, userStore, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authStore}>
        <UserContext.Provider value={userStore}>
          {children}
        </UserContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

// 高阶组件
export function withClientProvider<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithClientProvider(props: P) {
    return (
      <ClientProvider>
        <Component {...props} />
      </ClientProvider>
    );
  };
}

export default ClientProvider;
