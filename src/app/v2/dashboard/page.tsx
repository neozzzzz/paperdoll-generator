import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import V2Footer from '@/app/v2/components/Footer'
import V2Nav from '@/app/v2/components/Nav'

type Generation = {
  id: string
  features: string | null
  style: string
  color_url: string | null
  coloring_url: string
  created_at: string
}

export default async function DashboardV2Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/v2/login')
  }

  const { data: rawGenerations } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const generations = (rawGenerations || []) as Generation[]

  const getStyleLabel = (style: string) => {
    if (style === 'sd') return '클래식 토이'
    if (style === 'simple') return '미니멀 라인'
    return '패션 에디션'
  }

  const getStyleClass = (style: string) => {
    if (style === 'sd') return 'bg-[#efe0ca] text-[#6c543f]'
    if (style === 'simple') return 'bg-[#e5dcf5] text-[#574f95]'
    return 'bg-[#f2dfcb] text-[#7a4e34]'
  }

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#2f2924]">
      <V2Nav />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 lg:px-10">
        <section className="rounded-3xl border border-[#dfd2c0] bg-white p-6">
          <p className="text-sm text-[#8f816f]">MY STUDIO</p>
          <h1 className="mt-1 text-2xl font-semibold">
            안녕하세요, {user.user_metadata?.full_name || user.email?.split('@')[0]}님
          </h1>
          <p className="mt-1 text-sm text-[#665c53]">아이의 도안 히스토리를 한눈에 관리하세요.</p>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#2f2620] to-[#473a32] p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-[#e5d8c8]">총 생성 횟수</p>
              <p className="mt-1 text-4xl font-semibold">{generations.length}건</p>
            </div>
            <Link
              href="/v2"
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium border border-white/20"
            >
              새 도안 만들기
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-[#dfd2c0] bg-white p-6">
          <h2 className="text-lg font-semibold">내 도안 기록</h2>

          {generations.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generations.map((gen) => (
                <article key={gen.id} className="overflow-hidden rounded-xl border border-[#eedfcf]">
                  <div className="aspect-[3/4] bg-[#f5efe6]">
                    <img
                      src={gen.color_url || gen.coloring_url}
                      alt="도안"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-[#5a5248]">{gen.features || '도안 미리보기'}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#7f7367]">
                      <span>{new Date(gen.created_at).toLocaleDateString('ko-KR')}</span>
                      <span className={`rounded-full px-2 py-0.5 ${getStyleClass(gen.style)}`}>
                        {getStyleLabel(gen.style)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {gen.coloring_url && (
                        <a href={gen.coloring_url} download className="text-xs text-[#5d544a] underline underline-offset-2">
                          흑백 파일
                        </a>
                      )}
                      {gen.color_url && (
                        <a href={gen.color_url} download className="text-xs text-[#5d544a] underline underline-offset-2">
                          컬러 파일
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#ecdcc8] bg-[#faf7f2] p-10 text-center text-[#7a6f63]">
              <p className="text-lg">아직 내 도안이 없습니다.</p>
              <p className="mt-2 text-sm">아래에서 첫 도안을 만들어보세요.</p>
              <Link href="/v2" className="mt-5 inline-flex rounded-full bg-[#2f2620] px-5 py-2 text-sm text-white">
                첫 도안 만들기
              </Link>
            </div>
          )}
        </section>
      </main>

      <V2Footer />
    </div>
  )
}
