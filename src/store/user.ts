import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户状态接口
interface UserState {
  token: string | null
  email: string | null
  username: string | null

  // 方法
  setUser: (user: { token: string; email: string; username: string }) => void
  clearUser: () => void
}

// 创建持久化的用户存储
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // 初始状态
      token: null,
      email: null,
      username: null,
      
      // 设置用户信息
      setUser: (user) => set(user),
      
      // 清除用户信息
      clearUser: () => set({ token: null, email: null, username: null }),
    }),
    {
      name: 'user-storage', // localStorage 中的键名
    }
  )
)

export default useUserStore 
