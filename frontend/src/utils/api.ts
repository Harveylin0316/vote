import axios from 'axios'

// 獲取 API URL，優先使用環境變量
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3001/api' : '')

// 如果生產環境沒有設置 API URL，顯示錯誤
if (!API_URL && !import.meta.env.DEV) {
  console.error('❌ VITE_API_URL 環境變量未設置！請在 Netlify 環境變量中設置 VITE_API_URL')
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 如果是网络错误（后端未运行），不显示错误
    if (!error.response) {
      console.warn('Backend API not available, using mock data')
      return Promise.reject(error)
    }
    
    if (error.response?.status === 401) {
      // Token 过期或无效，清除本地存储并跳转到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
