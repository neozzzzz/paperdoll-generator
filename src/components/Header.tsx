"use client"

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

type HeaderProps = {
  basePath?: string
}

export default function Header({ basePath }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const supabase = createClient()

  const resolvedBasePath = useMemo(() => {
    if (basePath !== undefined) return basePath

    if (pathname?.startsWith('/v1-1')) return '/v1-1'
    if (pathname?.startsWith('/v2')) return '/v2'
    if (pathname?.startsWith('/v1')) return '/v1'
    return ''
  }, [basePath, pathname])

  const homeHref = resolvedBasePath || '/'
  const galleryHref = `${resolvedBasePath}/gallery`
  const dashboardHref = `${resolvedBasePath}/dashboard`
  const loginHref = `${resolvedBasePath}/login`

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = homeHref
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={homeHref} className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          ✂️ 도안공장
        </Link>
        <nav className="flex items-center gap-4">
          <Link href={galleryHref} className="text-gray-600 hover:text-pink-500 transition">
            갤러리
          </Link>
          {user ? (
            <>
              <Link href={dashboardHref} className="text-gray-600 hover:text-pink-500 transition">
                내 작업실
              </Link>
              <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-gray-600">
                로그아웃
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                {user.email?.[0]?.toUpperCase()}
              </div>
            </>
          ) : (
            <Link href={loginHref} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition">
              시작하기
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
