import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* 인사 + 크레딧 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              안녕하세요, {user.user_metadata?.full_name || user.email?.split('@')[0]}님! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">오늘은 어떤 도안을 만들어볼까요?</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">남은 크레딧</div>
            <div className="text-2xl font-bold text-purple-600">1 <span className="text-sm font-normal text-gray-400">회</span></div>
          </div>
        </div>

        {/* 새 도안 만들기 */}
        <Link
          href="/dashboard/create"
          className="block bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-center text-white hover:shadow-xl hover:scale-[1.01] transition-all mb-8"
        >
          <div className="text-4xl mb-3">✨</div>
          <h2 className="text-2xl font-bold mb-2">새 도안 만들기</h2>
          <p className="text-pink-100">사진을 올리면 AI가 종이인형 도안을 만들어드려요</p>
        </Link>

        {/* 이전 생성 이력 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">📋 내 도안 기록</h2>
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🎨</div>
            <p className="text-gray-400">아직 만든 도안이 없어요</p>
            <p className="text-gray-300 text-sm mt-1">위의 버튼을 눌러 첫 도안을 만들어보세요!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
