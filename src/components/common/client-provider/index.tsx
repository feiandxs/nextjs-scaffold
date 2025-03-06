'use client';

import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react';
import useUserStore from '@/store/user';

// 创建用户上下文
interface UserContextType {
  token: string | null;
  email: string | null;
  username: string | null;
  setUser: (user: { token: string; email: string; username: string }) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

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
  const userStore = useUserStore();

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
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
