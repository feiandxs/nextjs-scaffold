import type React from 'react';
import Sidebar from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen w-full bg-gray-100'>
      {/* 侧边栏组件 */}
      <Sidebar />

      {/* 右侧内容区域 - 可独立滚动 */}
      <div className='flex-1 overflow-auto'>
        <div className='p-6 max-w-4xl mx-auto'>{children}</div>
      </div>
    </div>
  );
}
