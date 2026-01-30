import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

export default function CreatePollPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pollType: 'SINGLE',
    maxVotesPerUser: 1,
    deadline: '',
    options: ['', ''],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, ''],
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const handleRemoveOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index)
      setFormData({ ...formData, options: newOptions })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const validOptions = formData.options.filter(opt => opt.trim() !== '')
    if (validOptions.length < 2) {
      setError('至少需要2個選項')
      return
    }

    try {
      setLoading(true)
      await api.post('/polls', {
        title: formData.title,
        description: formData.description || undefined,
        pollType: formData.pollType,
        maxVotesPerUser: formData.maxVotesPerUser,
        deadline: formData.deadline || undefined,
        options: validOptions,
      })
      navigate('/')
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || '建立投票失敗，請重試'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">建立投票</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              投票標題 *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              投票描述
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pollType" className="block text-sm font-medium text-gray-700 mb-2">
              投票類型
            </label>
            <select
              id="pollType"
              value={formData.pollType}
              onChange={(e) => setFormData({ ...formData, pollType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SINGLE">單選</option>
              <option value="MULTIPLE">多選</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="maxVotesPerUser" className="block text-sm font-medium text-gray-700 mb-2">
              每人可投票數
            </label>
            <input
              type="number"
              id="maxVotesPerUser"
              min="1"
              value={formData.maxVotesPerUser}
              onChange={(e) => setFormData({ ...formData, maxVotesPerUser: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
              截止時間（可選）
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              投票選項 *
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`選項 ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    刪除
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md"
            >
              + 新增選項
            </button>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '建立中...' : '建立投票'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
