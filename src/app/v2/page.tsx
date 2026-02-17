import Link from 'next/link'

import V2Footer from '@/app/v2/components/Footer'
import V2Icon from '@/app/v2/components/Icon'
import V2Nav from '@/app/v2/components/Nav'

const cards = [
  {
    title: '집에서 쉬운 준비',
    text: '사진 한 장면에서 시작해, 아이가 직접 보며 즐길 수 있는 도안으로 즉시 전환합니다.',
    icon: 'camera',
  },
  {
    title: '부모님도 안심',
    text: '개인정보 최소 수집, 공개 범위 제한, 사용 가이드 한 번에 확인할 수 있는 흐름으로 구성.',
    icon: 'shield',
  },
  {
    title: '출력 바로 사용',
    text: 'PDF를 내려받아 A4 기준 크기로 바로 출력하면 종이인형 놀이 준비 완료.',
    icon: 'print',
  },
]

const ageCues = [
  {
    title: '10대 친화',
    text: '말맛이 과하지 않고, 활동형 언어를 사용해 아이가 흥미를 잃지 않게 구성했습니다.',
    icon: 'scissors',
  },
  {
    title: '보호자 편의',
    text: '가정에서 바로 실행 가능한 사용 단계와 체크포인트를 위로부터 설명합니다.',
    icon: 'users',
  },
  {
    title: '공예 난이도 조절',
    text: '복잡한 기능은 숨기고, 버튼은 큰 라운드형으로 단순하게 구성했습니다.',
    icon: 'sparkle',
  },
]

const faqs = [
  {
    q: '아이 사진은 어디에 저장되나요?',
    a: '생성 과정에서만 활용되며, 보안 정책에 따라 사용 후 즉시 정리 정책이 적용될 수 있습니다.',
  },
  {
    q: '출력 결과가 맘에 안 들면?',
    a: '스타일을 바꿔 다시 생성할 수 있으며, 컬러/흑백 버전으로 비교가 가능합니다.',
  },
  {
    q: '가족 계정으로 같이 써도 되나요?',
    a: '네. 보호자 동반 사용 전제로 로그인된 계정에서 이력과 파일을 한 곳에서 관리합니다.',
  },
]

export default function HomeV2() {
  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#2d2925]">
      <V2Nav />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-10 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[32px] border border-[#ddd0bf] bg-gradient-to-br from-[#fff] via-[#fbf8f3] to-[#f6f2eb] p-8 md:p-12">
          <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#6d6052]">
            PAPER DOLL × FAMILIES v1.1
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            종이인형, 이제는
            <br />
            사진 한 장으로 10분이면 시작됩니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5f554d]">
            아이의 취향을 살리고, 부모님은 안전하게 관리할 수 있는 방식으로 구성한 새 인터페이스입니다.
            부담 없이 바로 만들어 보세요.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/v2/login"
              className="inline-flex items-center justify-center rounded-full bg-[#2f2620] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              무료로 시작하기
            </Link>
            <a
              href="#for-parent"
              className="inline-flex items-center justify-center rounded-full border border-[#c9b9a5] bg-white/80 px-7 py-3 text-sm font-semibold text-[#4d433a]"
            >
              부모님용 설명 보기
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {cards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e3d6c5] bg-white/75 p-5"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2f2620] text-white">
                  <V2Icon name={item.icon as 'camera' | 'shield' | 'print' | 'users' | 'sparkle' | 'scissors'} className="h-6 w-6" />
                </div>
                <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6b5f54]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="for-parent" className="grid gap-6 md:grid-cols-3">
          {ageCues.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#e1d4c2] bg-white p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0e5d4] text-[#5b4d3e]">
                <V2Icon name={item.icon as 'camera' | 'shield' | 'print' | 'users' | 'sparkle' | 'scissors'} className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#685e55]">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-[#e0d5c4] bg-white p-8">
            <h2 className="text-2xl font-semibold">서비스 흐름</h2>
            <ol className="mt-5 space-y-4 text-sm text-[#5d544c]">
              <li className="flex gap-3">
                <span className="mt-0.5 rounded-full bg-[#2f2620] px-2 py-1 text-xs text-white">01</span>
                보호자 계정으로 로그인 후 아이 정보를 등록
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 rounded-full bg-[#2f2620] px-2 py-1 text-xs text-white">02</span>
                사진 업로드 → 스타일 선택(기본/심플/패션)
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 rounded-full bg-[#2f2620] px-2 py-1 text-xs text-white">03</span>
                컬러/흑백 중 최종 도안 선택 후 바로 출력
              </li>
            </ol>
            <a
              href="#"
              className="mt-6 inline-flex rounded-2xl border border-[#ccbca9] px-4 py-2 text-sm font-semibold text-[#4c433a]"
            >
              사용 가이드 자세히 보기
            </a>
          </div>

          <div className="rounded-3xl border border-[#e0d5c4] bg-[#fff9f0] p-8">
            <h2 className="text-2xl font-semibold">요금 안내</h2>
            <ul className="mt-5 space-y-3 text-sm text-[#5f564d]">
              <li>체험: 1회 무료</li>
              <li>베이직: 월 5,900원</li>
              <li>프로: 월 9,900원</li>
            </ul>
            <p className="mt-5 text-xs text-[#8b7d6f]">
              원하면 사용량 기반으로도 전환 가능, 카드 등록은 시작 시점에만 필요
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e1d4c2] bg-white p-8">
          <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-[#e7dccd] bg-[#fbf8f3] p-4">
                <summary className="cursor-pointer text-sm font-medium text-[#4c433a]">{faq.q}</summary>
                <p className="mt-3 text-sm text-[#686056]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <V2Footer />
    </div>
  )
}
