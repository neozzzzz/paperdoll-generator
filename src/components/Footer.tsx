type FooterProps = {
  versionLabel?: string
  description?: string
}

const defaultDescription =
  '사진 한 장으로 나만의 종이인형을 만들어보세요.\n아이의 모습을 바탕으로 캐릭터를 만들고, 옷까지 입혀서 마음껏 놀 수 있습니다.'

export default function Footer({ versionLabel, description = defaultDescription }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-3">
              ✂️ 도안공장
            </h3>
            <p className="text-sm text-gray-500 whitespace-pre-line">
              {description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#features" className="hover:text-pink-500 transition">기능 소개</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-pink-500 transition">요금제</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition">자주 묻는 질문</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">법적 고지</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-pink-500 transition">이용약관</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition">개인정보처리방침</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition">환불 정책</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-xs text-gray-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span>© 2026 도안공장. All rights reserved.</span>
          {versionLabel ? <span className="text-pink-500 font-semibold">{versionLabel}</span> : null}
        </div>
      </div>
    </footer>
  )
}
