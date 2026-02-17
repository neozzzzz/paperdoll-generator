'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import V2Icon from '@/app/v2/components/Icon'

type LinkItem = {
  href: string
  label: string
  icon: 'users' | 'scissors' | 'sparkle' | 'shield'
}

const links: LinkItem[] = [
  { href: '/v2', label: '홈', icon: 'scissors' },
  { href: '/v2/gallery', label: '갤러리', icon: 'sparkle' },
  { href: '/v2/login', label: '시작하기', icon: 'shield' },
  { href: '/v2/dashboard', label: '작업실', icon: 'users' },
]

export default function V2Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[#e0d3bf] bg-[#f6f2eb]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link href="/v2" className="text-lg font-semibold text-[#3b322a]">
          ✂️ Paper Doll V2
        </Link>
        <div className="flex flex-wrap items-center gap-1 sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${
                pathname === link.href
                  ? 'bg-[#2f2620] text-white'
                  : 'text-[#5f554c] hover:text-[#2f2620]'
              }`}
            >
              <V2Icon name={link.icon} className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
