import { useEffect, useState } from 'react'

export default function ApiErrorBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // 檢查 API URL 是否設置
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl && !import.meta.env.DEV) {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>配置錯誤：</strong>後端 API 地址未設置。
            <br />
            請在 Netlify Dashboard → Site settings → Environment variables 中設置 <code className="bg-yellow-100 px-1 rounded">VITE_API_URL</code>
          </p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => setShow(false)}
            className="text-yellow-400 hover:text-yellow-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
