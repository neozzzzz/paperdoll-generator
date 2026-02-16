import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

function buildPrompt(features: string, style: string, isColoring: boolean) {
  const styleMap: Record<string, string> = {
    sd: '2-head-tall chibi/SD kawaii style, super cute big head, tiny body',
    simple: '4-head-tall simple cute illustration style, clean and adorable',
    fashion: '6-head-tall realistic fashion illustration style, elegant proportions',
  }

  const colorInstruction = isColoring
    ? 'COLORING BOOK VERSION: Black line art outlines ONLY. NO color fill. NO shading. NO gray. Pure black lines on pure white background. Clean crisp lines for kids to color in.'
    : 'FULL COLOR VERSION with vibrant beautiful colors. Rich coloring with soft shading.'

  return `Paper doll printable sheet on pure white background, A4 vertical layout.

CHARACTER: ${features}. Transform into ${styleMap[style]}.

LAYOUT:
TOP CENTER: The character in base outfit (simple white top and shorts), standing front-facing, arms slightly away from body. Dashed cutting line around. About 15cm tall on A4.

BOTTOM: 4 outfit sets in 2x2 grid, EXACT same pose and size as character. Cut out and place ON TOP of doll. No folding tabs. Dashed cutting lines.

1. 캐주얼 - cute casual outfit with sneakers
2. 공주님 - sparkly princess gown with tiara
3. 한복 - traditional Korean hanbok
4. 탐험가 - explorer/adventure outfit with hat and boots

${colorInstruction}
Korean labels under each outfit.`
}

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

  const body = await request.json()
  const { features, style = 'simple' } = body

  if (!features) return NextResponse.json({ error: '캐릭터 특징을 입력해주세요' }, { status: 400 })

  try {
    // 1. 흑백 도안 생성
    const coloringPrompt = buildPrompt(features, style, true)
    
    const coloringResult = await genai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: [{ text: coloringPrompt }] }],
      config: {
        responseModalities: ['image', 'text'],
        responseMimeType: 'image/png',
      },
    })

    const coloringPart = coloringResult.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )
    if (!coloringPart?.inlineData) {
      return NextResponse.json({ error: '도안 생성에 실패했습니다' }, { status: 500 })
    }

    const coloringBuffer = Buffer.from(coloringPart.inlineData.data!, 'base64')
    const timestamp = Date.now()
    const coloringPath = `${user.id}/${timestamp}-coloring.png`

    // Supabase Storage에 흑백 업로드
    const { error: uploadErr1 } = await supabase.storage
      .from('generations')
      .upload(coloringPath, coloringBuffer, { contentType: 'image/png' })

    if (uploadErr1) throw uploadErr1

    // 2. 컬러 버전 생성 (흑백을 참조)
    const colorPrompt = `Take this exact black and white line art paper doll sheet and add beautiful full color. Keep EVERYTHING exactly the same - same layout, same poses, same outlines, same proportions. Just add vibrant colors appropriate for each outfit. Keep white background. Keep all dashed cutting lines. Identical layout to the line art.`

    const colorResult = await genai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/png', data: coloringPart.inlineData.data! } },
          { text: colorPrompt },
        ],
      }],
      config: {
        responseModalities: ['image', 'text'],
        responseMimeType: 'image/png',
      },
    })

    const colorPart = colorResult.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )

    let colorUrl = null
    if (colorPart?.inlineData) {
      const colorBuffer = Buffer.from(colorPart.inlineData.data!, 'base64')
      const colorPath = `${user.id}/${timestamp}-color.png`
      
      const { error: uploadErr2 } = await supabase.storage
        .from('generations')
        .upload(colorPath, colorBuffer, { contentType: 'image/png' })

      if (!uploadErr2) {
        const { data: colorData } = supabase.storage.from('generations').getPublicUrl(colorPath)
        colorUrl = colorData.publicUrl
      }
    }

    const { data: coloringData } = supabase.storage.from('generations').getPublicUrl(coloringPath)

    return NextResponse.json({
      coloringUrl: coloringData.publicUrl,
      colorUrl,
      timestamp,
    })
  } catch (err: any) {
    console.error('Generation error:', err)
    return NextResponse.json({ error: err.message || '생성 중 오류가 발생했습니다' }, { status: 500 })
  }
}
