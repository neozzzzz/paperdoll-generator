import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(c) { c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })

  const formData = await request.formData()
  const photo = formData.get('photo') as File
  if (!photo) return NextResponse.json({ error: '사진을 업로드해주세요' }, { status: 400 })

  try {
    const bytes = await photo.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mimeType = photo.type || 'image/jpeg'

    const response = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64,
            }
          },
          {
            text: `이 사진에 있는 인물의 외형적 특징을 종이인형 도안 제작용으로 상세하게 설명해줘. 한국어로 답변.

다음 항목을 반드시 포함해서 한 문단으로 자연스럽게 서술해줘:
- 성별과 추정 나이
- 머리 스타일 (길이, 색상, 앞머리 유무, 직모/곱슬 등)
- 얼굴형 (둥근/갸름한/각진 등)
- 눈 크기와 특징
- 안경 착용 여부 (있다면 형태와 색상)
- 체형 (마른/보통/통통 등)
- 기타 특징적인 액세서리 (목걸이, 헤어밴드, 귀걸이 등)

예시 형식:
"7살 정도의 한국 여자아이, 어깨 아래로 내려오는 긴 갈색 생머리, 앞머리 없이 자연스럽게 가르마를 탐, 갸름한 얼굴형, 큰 동그란 금색 와이어 안경, 마른 체형, 은색 작은 목걸이 착용"

사진 속 인물의 특징만 서술하고, 배경이나 옷은 무시해줘. 개인을 식별하는 이름이나 신원 정보는 절대 포함하지 마.`
          }
        ],
      }],
    })

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      return NextResponse.json({ error: '특징 분석에 실패했습니다' }, { status: 500 })
    }

    return NextResponse.json({ features: text.trim() })
  } catch (err: any) {
    console.error('Analyze error:', err)
    return NextResponse.json({ error: err.message || '분석 중 오류가 발생했습니다' }, { status: 500 })
  }
}

export const maxDuration = 30
