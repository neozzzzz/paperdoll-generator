'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import V2Footer from '@/app/v2/components/Footer'
import V2Nav from '@/app/v2/components/Nav'

type Generation = {
  id: string
  features: string
  style: string
  coloring_url: string
  color_url: string | null
  created_at: string
}

export default function GalleryPageV2() {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [viewImage, setViewImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch('/api/gallery')
      if (res.ok) {
        const data = await res.json()
        setGenerations(data)
      }
      setLoading(false)
    }

    fetchGallery()
  }, [])

  const filtered = filter === 'all' ? generations : generations.filter((item) => item.style === filter)

  const styleChip = (style: string) => {
    if (style === 'sd') return { label: '클래식 토이', className: 'bg-[#eee1d0] text-[#6f5a48]' }
    if (style === 'simple') return { label: '미니멀 라인', className: 'bg-[#e6e0f4] text-[#5a4f92]' }
    return { label: '패션 에디션', className: 'bg-[#f1e0ce] text-[#7a5338]' }
  }

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#312c27]">
      <V2Nav />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="inline-flex rounded-full border border-[#cdbba8] px-4 py-1 text-xs tracking-[0.2em] text-[#6e6153]">
            V2 GALLERY
          </p>
          <h1 className="mt-4 text-3xl font-semibold">도안 갤러리</h1>
          <p className="mt-2 text-sm text-[#6b6058]">아이디어가 필요한 날, 완성된 결과를 참고해보세요.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: '전체' },
            { id: 'sd', label: '클래식 토이' },
            { id: 'simple', label: '미니멀 라인' },
            { id: 'fashion', label: '패션 에디션' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === item.id
                  ? 'bg-[#2f2620] text-white'
                  : 'border border-[#cfbfad] bg-white text-[#5f554b] hover:border-[#ac987f]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-[#ded0bf] bg-white p-14 text-center text-[#786d61]">
            갤러리를 불러오는 중입니다.
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#ded0bf] bg-white p-14 text-center">
            <p className="text-2xl">🖼️</p>
            <p className="mt-3 text-[#6f6559]">공개된 도안이 아직 없습니다.</p>
            <Link href="/v2/login" className="mt-6 inline-flex rounded-full bg-[#2f2620] px-5 py-2 text-sm text-white">
              첫 도안 만들기
            </Link>
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((gen) => {
              const chip = styleChip(gen.style)
              return (
                <article key={gen.id} className="overflow-hidden rounded-xl border border-[#e0d2c1] bg-white">
                  <button
                    type="button"
                    onClick={() => setViewImage(gen.color_url || gen.coloring_url)}
                    className="flex aspect-[3/4] w-full items-center justify-center bg-[#f5efe6]"
                  >
                    <img
                      src={gen.color_url || gen.coloring_url}
                      alt="도안 썸네일"
                      className="h-full w-full object-contain"
                    />
                  </button>
                  <div className="p-3">
                    <p className="truncate text-sm text-[#5a5148]">{gen.features}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#6f6459]">
                      <span>{new Date(gen.created_at).toLocaleDateString('ko-KR')}</span>
                      <span className={`rounded-full px-2 py-0.5 ${chip.className}`}>{chip.label}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </main>

      {viewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setViewImage(null)}
        >
          <div className="max-w-2xl max-h-[90vh]" onClick={(event) => event.stopPropagation()}>
            <img src={viewImage} alt="도안 미리보기" className="max-h-[84vh] w-full rounded-lg object-contain" />
            <button
              onClick={() => setViewImage(null)}
              className="mt-2 w-full rounded-lg bg-white/95 py-2 text-sm text-[#3a332e]"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <V2Footer />
    </div>
  )
}
