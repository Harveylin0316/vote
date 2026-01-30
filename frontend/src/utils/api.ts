import axios from 'axios'

// 獲取 API URL，優先使用環境變量
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  
  if (envUrl) {
    // 確保 URL 以 /api 結尾
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`
  }
  
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api'
  }
  
  // 生產環境沒有設置 API URL
  console.error('❌ VITE_API_URL 環境變量未設置！')
  console.error('請在 Netlify Dashboard → Site settings → Environment variables 中設置：')
  console.error('Key: VITE_API_URL')
  console.error('Value: 你的後端 API 地址（例如：https://your-api.railway.app/api）')
  
  // 返回空字符串，但會在請求時檢查
  return ''
}

const API_URL = getApiUrl()

const api = axios.create({
  baseURL: API_URL || '/api', // 如果沒有設置，使用相對路徑（會失敗但不會崩潰）
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加 token 和檢查 API URL
api.interceptors.request.use(
  (config) => {
    // 檢查 API URL 是否設置
    if (!API_URL && !import.meta.env.DEV) {
      const error = new Error('VITE_API_URL 環境變量未設置。請在 Netlify 環境變量中設置 VITE_API_URL。')
      console.error(error.message)
      return Promise.reject(error)
    }
    
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
    // 如果是网络错误或 404
    if (!error.response) {
      if (!API_URL && !import.meta.env.DEV) {
        console.error('❌ 無法連接到後端 API：VITE_API_URL 環境變量未設置')
        console.error('請在 Netlify Dashboard 中設置環境變量 VITE_API_URL')
      } else {
        console.warn('無法連接到後端 API，請檢查後端是否運行')
      }
      return Promise.reject(error)
    }
    
    // 404 錯誤
    if (error.response?.status === 404) {
      console.error('API 端點不存在，請檢查 API URL 是否正確')
      console.error('當前 API URL:', API_URL)
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
