/* eslint-disable react/no-array-index-key */
const AdminPage = () => (
  <div className='bg-white p-6 rounded-lg shadow-md'>
    <h2 className='text-2xl font-bold mb-4'>管理后台首页</h2>
    <p className='mb-4'>欢迎使用管理系统，这里是内容区域。</p>

    {/* 测试滚动 */}
    {Array(20).fill(0).map((_, index) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        className='mb-4 p-4 border rounded'>
        <h3 className='font-semibold'>内容块 {index + 1}</h3>
        <p>这里是一些测试内容，用于验证右侧滚动功能。当右侧内容滚动时，左侧菜单不会跟随滚动。</p>
      </div>
    ))}
  </div>
);

export default AdminPage;
