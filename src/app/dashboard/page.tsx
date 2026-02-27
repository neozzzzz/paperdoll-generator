import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

type Generation = {
  id: string
  features: string
  style: string
  color_url: string | null
  coloring_url: string
  created_at: string
}

export default async function DashboardV1_1Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 이력 조회
  const { data: rawGenerations } = await supabase
    .from('paperdolly_generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const generations = (rawGenerations || []) as Generation[]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header basePath="" />
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
            <div className="text-sm text-gray-400">생성 횟수</div>
            <div className="text-2xl font-bold text-purple-600">{generations?.length || 0}</div>
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
          {generations && generations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generations.map((gen) => (
                <div key={gen.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
                  <div className="aspect-[3/4] relative bg-gray-50">
                    <img
                      src={gen.color_url || gen.coloring_url}
                      alt="도안"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-700 truncate">{gen.features}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(gen.created_at).toLocaleDateString('ko-KR')}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                        {gen.style === 'sd' ? 'SD' : gen.style === 'simple' ? '심플' : '패션'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {gen.coloring_url && (
                        <a href={gen.coloring_url} download className="text-xs text-gray-500 hover:text-gray-800">✏️ 흑백</a>
                      )}
                      {gen.color_url && (
                        <a href={gen.color_url} download className="text-xs text-purple-500 hover:text-purple-700">🎨 컬러</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🎨</div>
              <p className="text-gray-400">아직 만든 도안이 없어요</p>
              <p className="text-gray-300 text-sm mt-1">위의 버튼을 눌러 첫 도안을 만들어보세요!</p>
            </div>
          )}
        </div>
      </div>
      <Footer  />
    </div>
  )
}
