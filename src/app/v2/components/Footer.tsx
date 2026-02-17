export default function V2Footer() {
  return (
    <footer className="mt-12 border-t border-[#e4d9c7] bg-[#f6f2eb]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <section>
            <h3 className="text-lg font-semibold text-[#3b332d]">Paper Doll V2</h3>
            <p className="mt-3 text-sm text-[#675d53]">
              10대 자녀와 함께 만드는 종이인형 도안 서비스.
              <br />간단한 단계로 안전하게 완성하세요.
            </p>
          </section>
          <section>
            <h4 className="font-semibold text-[#3b332d]">바로가기</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#655b51]">
              <li><a href="/v2#" className="hover:text-[#2f2620]">서비스 소개</a></li>
              <li><a href="/v2/gallery" className="hover:text-[#2f2620]">갤러리</a></li>
              <li><a href="/v2/login" className="hover:text-[#2f2620]">로그인</a></li>
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-[#3b332d]">안내</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#655b51]">
              <li><a href="#" className="hover:text-[#2f2620]">이용안내</a></li>
              <li><a href="#" className="hover:text-[#2f2620]">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:text-[#2f2620]">문의</a></li>
            </ul>
          </section>
        </div>
        <p className="text-center text-xs text-[#8b7e72]">© 2026 Paper Doll V2</p>
      </div>
    </footer>
  )
}
