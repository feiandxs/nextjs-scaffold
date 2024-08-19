/**
 * 请求配置类型
 */
type RequestConfig = RequestInit & {
  baseUrl?: string;
  params?: Record<string, string>;
  data?: any;
};

/**
 * 响应类型
 */
type ResponseType<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
};

/**
 * 默认配置
 */
const DEFAULT_CONFIG: RequestConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'force-cache', // 默认使用缓存
};

/**
 * 合并配置
 * @param defaultConfig 默认配置
 * @param config 用户配置
 */
const mergeConfig = (defaultConfig: RequestConfig, config?: RequestConfig): RequestConfig => ({
  ...defaultConfig,
  ...config,
  headers: {
    ...defaultConfig.headers,
    ...config?.headers,
  },
});

/**
 * 构建完整URL
 * @param baseUrl 基础URL
 * @param url 请求路径
 * @param params 查询参数
 */
const buildUrl = (baseUrl: string, url: string, params?: Record<string, string>): string => {
  const fullUrl = new URL(url, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value);
    });
  }
  return fullUrl.toString();
};

/**
 * 处理响应
 * @param response Fetch响应对象
 */
const handleResponse = async <T>(response: Response): Promise<ResponseType<T>> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  };
};

/**
 * 发送请求
 * @param url 请求路径
 * @param config 请求配置
 */
export const request = async <T>(url: string, config?: RequestConfig): Promise<ResponseType<T>> => {
  const mergedConfig = mergeConfig(DEFAULT_CONFIG, config);
  const { baseUrl, params, data, ...fetchConfig } = mergedConfig;

  const fullUrl = buildUrl(baseUrl!, url, params);

  if (data) {
    fetchConfig.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, fetchConfig);
    return handleResponse<T>(response);
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

/**
 * GET请求
 * @param url 请求路径
 * @param config 请求配置
 */
export const get = <T>(url: string, config?: RequestConfig): Promise<ResponseType<T>> => request<T>(url, { ...config, method: 'GET' });

/**
 * POST请求
 * @param url 请求路径
 * @param data 请求数据
 * @param config 请求配置
 */
export const post = <T>(url: string, data?: any, config?: RequestConfig): Promise<ResponseType<T>> => request<T>(url, { ...config, method: 'POST', data });

/**
 * PUT请求
 * @param url 请求路径
 * @param data 请求数据
 * @param config 请求配置
 */
export const put = <T>(url: string, data?: any, config?: RequestConfig): Promise<ResponseType<T>> => request<T>(url, { ...config, method: 'PUT', data });

/**
 * DELETE请求
 * @param url 请求路径
 * @param config 请求配置
 */
export const del = <T>(url: string, config?: RequestConfig): Promise<ResponseType<T>> => request<T>(url, { ...config, method: 'DELETE' });
