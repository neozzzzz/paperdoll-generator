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

async function generateImage(prompt: string, referenceImageBase64?: string): Promise<Buffer | null> {
  try {
    const contents: any[] = []
    
    if (referenceImageBase64) {
      contents.push({
        inlineData: {
          mimeType: 'image/png',
          data: referenceImageBase64,
        }
      })
    }
    contents.push({ text: prompt })

    const response = await genai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: [{ role: 'user', parts: contents }],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      } as any,
    })

    const parts = response.candidates?.[0]?.content?.parts
    if (!parts) return null

    for (const part of parts) {
      if ((part as any).inlineData) {
        const data = (part as any).inlineData.data
        if (typeof data === 'string') {
          return Buffer.from(data, 'base64')
        }
        if (data instanceof Uint8Array || Buffer.isBuffer(data)) {
          return Buffer.from(data)
        }
      }
    }
    return null
  } catch (err) {
    console.error('Gemini error:', err)
    return null
  }
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
    const coloringBuffer = await generateImage(coloringPrompt)
    
    if (!coloringBuffer) {
      return NextResponse.json({ error: '도안 생성에 실패했습니다. 다시 시도해주세요.' }, { status: 500 })
    }

    const timestamp = Date.now()
    const coloringPath = `${user.id}/${timestamp}-coloring.png`

    const { error: uploadErr1 } = await supabase.storage
      .from('paperdoll')
      .upload(coloringPath, coloringBuffer, { contentType: 'image/png' })

    if (uploadErr1) throw uploadErr1

    // 2. 컬러 버전 생성 (흑백을 참조)
    const colorPrompt = `Take this exact black and white line art paper doll sheet and add beautiful full color. Keep EVERYTHING exactly the same - same layout, same poses, same outlines, same proportions. Just add vibrant colors appropriate for each outfit. Keep white background. Keep all dashed cutting lines.`
    
    const coloringBase64 = coloringBuffer.toString('base64')
    const colorBuffer = await generateImage(colorPrompt, coloringBase64)

    let colorUrl = null
    if (colorBuffer) {
      const colorPath = `${user.id}/${timestamp}-color.png`
      const { error: uploadErr2 } = await supabase.storage
        .from('paperdoll')
        .upload(colorPath, colorBuffer, { contentType: 'image/png' })

      if (!uploadErr2) {
        const { data: colorData } = supabase.storage.from('paperdoll').getPublicUrl(colorPath)
        colorUrl = colorData.publicUrl
      }
    }

    const { data: coloringData } = supabase.storage.from('paperdoll').getPublicUrl(coloringPath)

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

export const maxDuration = 60
