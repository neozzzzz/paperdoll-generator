import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">✂️🎨👗</div>
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
            <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl text-lg font-bold hover:shadow-xl hover:scale-105 transition-all">
              무료로 시작하기 →
            </Link>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-2xl text-lg font-medium border-2 border-pink-200 hover:border-pink-400 transition">
              어떻게 만드나요?
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">첫 1회 무료 체험 · 카드 등록 불필요</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">3단계로 완성!</h2>
          <p className="text-center text-gray-500 mb-12">복잡한 건 AI가 다 해요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '📸',
                title: '1. 사진 업로드',
                desc: '얼굴 사진이나 원하는 캐릭터 이미지를 올려주세요. 사진은 생성 후 즉시 삭제됩니다.',
              },
              {
                emoji: '🤖',
                title: '2. AI 도안 생성',
                desc: 'AI가 3가지 스타일의 캐릭터와 테마별 옷을 만들어요. 컬러/흑백 선택 가능!',
              },
              {
                emoji: '🖨️',
                title: '3. 프린트 & 놀기',
                desc: 'PDF로 다운받아 A4에 인쇄하세요. 오려서 올려놓으면 종이인형 완성!',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gradient-to-b from-pink-50 to-purple-50 rounded-3xl p-8 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">3가지 스타일</h2>
          <p className="text-gray-500 mb-12">취향에 맞는 스타일을 골라보세요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'SD 귀여운', desc: '2등신 · 큰 머리 · 아이들이 좋아하는 스타일', color: 'from-pink-400 to-rose-400' },
              { name: '심플 일러스트', desc: '5등신 · 깔끔한 라인 · 누구나 좋아하는 스타일', color: 'from-purple-400 to-indigo-400' },
              { name: '패션 일러스트', desc: '8등신 · 세밀한 디테일 · 어른도 즐기는 스타일', color: 'from-blue-400 to-cyan-400' },
            ].map((s) => (
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

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">요금제</h2>
          <p className="text-center text-gray-500 mb-12">부담 없이 시작하세요</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((plan) => (
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
                  href="/login"
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

      <Footer />
    </div>
  )
}
