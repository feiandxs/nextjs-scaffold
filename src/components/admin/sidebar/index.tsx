/* eslint-disable react/no-array-index-key */

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, Menu, Home, Settings, Users, FileText, BarChart } from 'lucide-react';

// 模拟菜单数据 - 分组展示
const menuGroups = [
  {
    label: '主要功能',
    items: [
      { id: 1, name: '仪表盘', path: '/admin', icon: <Home className='w-4 h-4' /> },
      { id: 2, name: '数据统计', path: '/admin/stats', icon: <BarChart className='w-4 h-4' /> },
      { id: 3, name: '内容管理', path: '/admin/content', icon: <FileText className='w-4 h-4' /> },
    ]
  },
  {
    label: '系统设置',
    items: [
      { id: 4, name: '用户管理', path: '/admin/users', icon: <Users className='w-4 h-4' /> },
      { id: 5, name: '系统配置', path: '/admin/settings', icon: <Settings className='w-4 h-4' /> },
    ]
  }
];

// 其他菜单项 - 用于演示滚动
const extraItems = new Array(30)
  .fill(0)
  .map((_, index) => ({
    id: index + 6,
    name: `菜单项 ${index + 1}`,
    path: `/admin/menu-${index + 1}`,
    icon: <FileText className='w-4 h-4' />,
  }));

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 响应式处理
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', checkWidth);
    checkWidth();

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <>
      {/* 移动端遮罩 */}
      {!collapsed && isMobile && (
        <div
          className='fixed inset-0 bg-black/50 z-10'
          onClick={() => setCollapsed(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              setCollapsed(true);
            }
          }}
          role='button'
          tabIndex={0}
          aria-label='关闭侧边栏'
        />
      )}

      <aside
        className={`fixed md:static z-20 flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-0 md:w-16 overflow-hidden' : 'w-64'
          }`}
      >
        {/* 头部 Logo 区域 */}
        <div className='h-16 flex items-center justify-between px-4 border-b'>
          {!collapsed && <h1 className='font-semibold text-lg'>管理后台</h1>}
          <button
            type='button'
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-md hover:bg-gray-100 ${collapsed ? 'mx-auto' : ''}`}
          >
            {collapsed ? <Menu className='h-5 w-5' /> : <ChevronLeft className='h-5 w-5' />}
          </button>
        </div>

        {/* 中间菜单区域 - 可独立滚动 */}
        <div className='flex-1 overflow-y-auto py-2'>
          <nav className='space-y-2'>
            {/* 主菜单组 */}
            {menuGroups.map((group, groupIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={groupIndex}
                className='px-3 py-2'>
                {!collapsed && (
                  <h2 className='mb-2 px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    {group.label}
                  </h2>
                )}
                <ul className='space-y-1'>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'
                          } px-3 py-2 rounded-md ${pathname === item.path
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <span className='flex-shrink-0'>{item.icon}</span>
                        {!collapsed && <span className='ml-3'>{item.name}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 额外菜单项 - 演示滚动 */}
            {!collapsed && (
              <div className='px-3 py-2'>
                <h2 className='mb-2 px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  其他选项
                </h2>
                <ul className='space-y-1'>
                  {extraItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={`flex items-center px-3 py-2 rounded-md ${pathname === item.path
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <span className='flex-shrink-0'>{item.icon}</span>
                        <span className='ml-3'>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </div>

        {/* 底部用户信息 */}
        <div className='border-t p-4'>
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
            {collapsed ? (
              <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600'>
                用
              </div>
            ) : (
              <>
                <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600'>
                  用
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-700'>管理员用户</p>
                  <p className='text-xs text-gray-500'>admin@example.com</p>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
