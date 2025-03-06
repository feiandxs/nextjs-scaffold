/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserInfo } from '@/types/user';

/**
 * 认证状态接口定义
 * @interface AuthState
 * @property {string | null} token - JWT token
 * @property {boolean} isAuthenticated - 是否已认证
 * @property {function} setAuth - 设置认证信息的方法
 * @property {function} clearAuth - 清除认证信息的方法
 */
interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	setAuth: (token: string) => void;
	clearAuth: () => void;
}

interface UserState {
	token: string | null;
	isAuthenticated: boolean;
	userInfo: UserInfo | null;
	isHydrated: boolean;
	setAuth: (token: string) => void;
	clearAuth: () => void;
	setUserInfo: (info: UserInfo) => void;
	clearUserInfo: () => void;
	setHydrated: (state: boolean) => void;
}

// 创建认证状态存储
// 使用zustand的persist中间件实现状态持久化
export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			// 初始状态
			token: null as string | null,
			isAuthenticated: false,
			// 设置认证信息
			setAuth: (token: string) => {
				set({
					token,
					isAuthenticated: true,
				});
			},
			// 清除认证信息
			clearAuth: () => {
				set({
					token: null,
					isAuthenticated: false,
				});
			},
		}),
		{
			// 持久化配置
			name: 'auth-storage', // localStorage的key
			storage: createJSONStorage(() => localStorage), // 使用localStorage存储
			// 只持久化token和认证状态
			partialize: (state) => ({
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			token: null as string | null,
			isAuthenticated: false,
			userInfo: null as UserInfo | null,
			isHydrated: false,
			setAuth: (token: string) => {
				set({
					token,
					isAuthenticated: true,
				});
			},
			clearAuth: () => {
				set({
					token: null,
					isAuthenticated: false,
				});
			},
			setUserInfo: (info: UserInfo) => set({ userInfo: info }),
			clearUserInfo: () => set({ userInfo: null }),
			setHydrated: (state: boolean) => set({ isHydrated: state }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				userInfo: state.userInfo,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHydrated(true);
			},
		},
	),
);
