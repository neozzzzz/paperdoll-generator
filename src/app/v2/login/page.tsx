'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import V2Footer from '@/app/v2/components/Footer'
import V2Nav from '@/app/v2/components/Nav'

export default function LoginPageV2() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.push('/v2/dashboard')
      }
    })
  }, [router, supabase.auth])

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Login error:', error)
    }
  }

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#2f2823]">
      <V2Nav />

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-12 sm:px-8">
        <section className="mx-auto w-full max-w-md rounded-3xl border border-[#d8c8b5] bg-white p-8 text-center">
          <p className="inline-flex rounded-full border border-[#d4c4b0] px-4 py-1 text-xs tracking-[0.15em] text-[#6c5f50]">
            V2 START
          </p>
          <h1 className="mt-5 text-2xl font-semibold">도안공장 V2에 오신 걸 환영합니다</h1>
          <p className="mt-2 text-sm text-[#6c5f53]">
            보호자 계정으로 로그인해 아이의 종이인형을 만들어보세요.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full rounded-2xl border border-[#d6c9ba] bg-white px-6 py-4 text-sm font-medium text-[#3f3a35]"
            >
              Google로 시작하기
            </button>
            <button
              onClick={handleKakaoLogin}
              className="w-full rounded-2xl bg-[#FEE500] px-6 py-4 text-sm font-medium text-[#191919]"
            >
              카카오로 시작하기
            </button>
          </div>

          <p className="mt-6 text-xs text-[#8e7f72] leading-relaxed">
            로그인 시 이용약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
          </p>
        </section>
      </main>

      <V2Footer />
    </div>
  )
}
