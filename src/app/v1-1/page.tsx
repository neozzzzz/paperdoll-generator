import Link from 'next/link'
import Image from 'next/image'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const plans = [
  {
    name: '체험',
    price: '무료',
    sub: '',
    features: ['캐릭터 1종', '옷 2벌', 'PDF 다운로드', '컬러 + 흑백'],
    cta: '무료 체험',
    highlight: false,
  },
  {
    name: '기본',
    price: '5,900원',
    sub: '1회',
    features: ['캐릭터 3종', '옷 각 5벌 (총 15벌)', 'PDF 다운로드', '컬러 + 흑백', '고해상도 출력'],
    cta: '시작하기',
    highlight: true,
  },
  {
    name: '월정액',
    price: '9,900원',
    sub: '/월',
    features: ['월 50회 생성', '캐릭터 3종', '옷 각 5벌', '우선 생성', '신규 테마 우선 제공'],
    cta: '구독하기',
    highlight: false,
  },
]

const steps = [
  {
    icon: '/icons/paperdoll-nano-b1-tr.png',
    title: '1. 사진 업로드',
    desc: '얼굴 사진이나 원하는 캐릭터 이미지를 올려주세요. 사진은 생성 후 즉시 삭제됩니다.',
  },
  {
    icon: '/icons/paperdoll-nano-b2-tr.png',
    title: '2. 캐릭터 선택',
    desc: 'AI가 3가지 스타일의 캐릭터와 테마별 옷을 만들어요. 컬러/흑백 선택 가능!',
  },
  {
    icon: '/icons/paperdoll-nano-b3-tr.png',
    title: '3. 프린트 & 놀기',
    desc: 'PDF로 다운받아 A4에 인쇄하세요. 오려서 올려놓으면 종이인형 완성!',
  },
]

const styles = [
  { name: 'SD 귀여운', desc: '2등신 · 큰 머리 · 아이들이 좋아하는 스타일', color: 'from-pink-400 to-rose-400' },
  { name: '심플 일러스트', desc: '5등신 · 깔끔한 라인 · 누구나 좋아하는 스타일', color: 'from-purple-400 to-indigo-400' },
  { name: '패션 일러스트', desc: '8등신 · 세밀한 디테일 · 어른도 즐기는 스타일', color: 'from-blue-400 to-cyan-400' },
]

const topIcons = [
  {
    label: 'photo',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="8.6" cy="6.4" r="2" stroke="#EC4899" strokeWidth="1.8" />
        <path d="M5 20h14l-2.4-9-4.2 2.8 1.1-5.7-8.6 4.2L5 20z" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="10.5" cy="10.2" r="0.9" fill="#111827" />
      </svg>
    ),
  },
  {
    label: 'palette',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M18 12.5c0 3.5-2.9 6.5-6.5 6.5H8.5C5.5 19 3 16.5 3 13.5c0-1 .3-2 .8-2.8.6 1.5 2.2 2.5 4 2.5h2.2l1.2-3 2 2.8 1.8-1.8 1.8 1.8 1.8-3 1.9 1.2c1.8.6 3.1 2.4 3.1 4.3Z" fill="#F9A8D4" stroke="#BE185D" strokeWidth="1.5" />
        <circle cx="9.2" cy="11" r="1.15" fill="#F472B6" />
        <circle cx="7.4" cy="14.6" r="0.95" fill="#7C3AED" />
        <circle cx="11.7" cy="15.2" r="0.95" fill="#0EA5E9" />
        <circle cx="14.5" cy="14.1" r="0.8" fill="#F97316" />
      </svg>
    ),
  },
  {
    label: 'dress',
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M6 4h12l-1.8 7.3L12 15l-4.2-3.7L6 4z" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7.7 10.9h8.6" stroke="#EC4899" strokeWidth="1.6" />
        <path d="M9.8 21h4.4" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function HomeV1_1() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header basePath="/v1-1" />

      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mx-auto mb-5 grid w-fit grid-cols-3 gap-4">
            {topIcons.map((item) => (
              <span
                key={item.label}
                className="h-14 w-14 rounded-xl bg-white/70 border border-pink-200/90 shadow-sm flex items-center justify-center"
              >
                {item.svg}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              사진 한 장으로
            </span>
            <br />
            나만의 종이인형 만들기
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            사진을 올리면 AI가 세상에 하나뿐인 종이인형 도안을 만들어드려요.
            <br />컬러 버전과 색칠놀이 버전, 원하는 대로 골라보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/v1-1/login"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl text-lg font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              무료로 시작하기 →
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-gray-700 rounded-2xl text-lg font-medium border-2 border-pink-200 hover:border-pink-400 transition"
            >
              어떻게 만드나요?
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">첫 1회 무료 체험 · 카드 등록 불필요</p>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">3단계로 완성!</h2>
          <p className="text-center text-gray-500 mb-12">복잡한 건 AI가 다 해요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.title} className="bg-gradient-to-b from-pink-50 to-purple-50 rounded-3xl p-8 text-center hover:shadow-lg transition">
                <div className="mb-4 flex justify-center">
                  <div className="h-20 w-20 rounded-2xl bg-transparent flex items-center justify-center p-0">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={76}
                      height={76}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed px-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">3가지 스타일</h2>
          <p className="text-gray-500 mb-12">취향에 맞는 스타일을 골라보세요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styles.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${s.color} mb-4 flex items-center justify-center text-white text-4xl`}>
                  👧
                </div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">요금제</h2>
          <p className="text-center text-gray-500 mb-12">부담 없이 시작하세요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-pink-500 to-purple-600 text-white shadow-xl scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <h3 className={`text-lg font-bold ${plan.highlight ? '' : 'text-gray-800'}`}>{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-pink-100' : 'text-gray-400'}`}>{plan.sub}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? 'text-pink-100' : 'text-gray-600'}`}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/v1-1/login"
                  className={`block text-center py-3 rounded-xl font-medium transition ${
                    plan.highlight
                      ? 'bg-white text-purple-600 hover:bg-pink-50'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer versionLabel="v1.1" />
    </div>
  )
}
