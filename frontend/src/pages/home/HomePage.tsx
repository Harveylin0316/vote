import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type Poll } from '../../types'
import api from '../../utils/api'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小時前`
  if (minutes > 0) return `${minutes}分鐘前`
  return '剛剛'
}

function PollCard({ poll }: { poll: Poll }) {
  const isExpired = poll.deadline && new Date(poll.deadline) < new Date()
  const topOption = poll.options.reduce((prev, current) => 
    prev.voteCount > current.voteCount ? prev : current
  )

  return (
    <Link
      to={`/polls/${poll.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-900 flex-1">{poll.title}</h2>
        {isExpired && (
          <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
            已結束
          </span>
        )}
        {!isExpired && (
          <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
            進行中
          </span>
        )}
      </div>
      
      {poll.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{poll.description}</p>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>目前領先: {topOption.text}</span>
          <span>{poll.totalVotes || 0} 人參與</span>
        </div>
        {poll.totalVotes > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${(topOption.voteCount / poll.totalVotes) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>建立者: {poll.creator?.phone ? `用戶${poll.creator.phone.slice(-4)}` : '匿名'}</span>
        <span>{formatDate(poll.createdAt)}</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true)
        const response = await api.get('/polls')
        setPolls(response.data.polls || [])
      } catch (err: any) {
        console.error('Failed to fetch polls:', err)
        setError('載入投票列表失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchPolls()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">載入中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">投票列表</h1>
        <div className="text-sm text-gray-500">
          共 {polls.length} 個投票
        </div>
      </div>
      
      {polls.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">暫無投票，請建立第一個投票吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  )
}
