import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { type Poll } from '../../types'
import api from '../../utils/api'

export default function PollDetailPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    const fetchPoll = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await api.get(`/polls/${id}`)
        setPoll(response.data.poll)
      } catch (err: any) {
        console.error('Failed to fetch poll:', err)
        setError('載入投票失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchPoll()
  }, [id])

  const handleOptionToggle = (optionId: string) => {
    if (!poll || poll.hasVoted) return

    if (poll.pollType === 'SINGLE') {
      setSelectedOptions([optionId])
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId))
      } else {
        if (selectedOptions.length < poll.maxVotesPerUser) {
          setSelectedOptions([...selectedOptions, optionId])
        } else {
          alert(`最多只能選擇 ${poll.maxVotesPerUser} 個選項`)
        }
      }
    }
  }

  const handleVote = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!poll || selectedOptions.length === 0) {
      alert('請至少選擇一個選項')
      return
    }

    try {
      setVoting(true)
      const response = await api.post(`/polls/${poll.id}/vote`, {
        optionIds: selectedOptions,
      })
      setPoll(response.data.poll)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || '投票失敗，請重試'
      alert(errorMessage)
    } finally {
      setVoting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-500">載入中...</div>
        </div>
      </div>
    )
  }

  if (error || !poll) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || '投票不存在'}
          </h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首頁
          </Link>
        </div>
      </div>
    )
  }

  const totalVotes = poll.totalVotes || poll.options.reduce((sum, opt) => sum + opt.voteCount, 0)
  const showResults = poll.hasVoted || totalVotes > 0

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
      >
        ← 返回列表
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{poll.title}</h1>
          {poll.description && (
            <p className="text-gray-600">{poll.description}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>建立者: {poll.creator?.phone ? `用戶${poll.creator.phone.slice(-4)}` : '匿名'}</span>
            <span>•</span>
            <span>{totalVotes} 人參與</span>
            <span>•</span>
            <span>{poll.pollType === 'SINGLE' ? '單選' : '多選'}</span>
          </div>
        </div>

        {!showResults ? (
          <>
            <div className="space-y-3 mb-6">
              {poll.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedOptions.includes(option.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type={poll.pollType === 'SINGLE' ? 'radio' : 'checkbox'}
                    name="poll-option"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionToggle(option.id)}
                    className="mr-3"
                  />
                  <span className="flex-1">{option.text}</span>
                </label>
              ))}
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleVote}
                disabled={selectedOptions.length === 0 || voting}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {voting ? '提交中...' : '提交投票'}
              </button>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">請先登入才能參與投票</p>
                <Link
                  to="/login"
                  className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  立即登入
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">投票結果</h2>
            {poll.options.map((option) => {
              const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0
              return (
                <div key={option.id} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">{option.text}</span>
                    <span className="text-gray-600 text-sm">
                      {option.voteCount} 票 ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              總投票數: {totalVotes}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
