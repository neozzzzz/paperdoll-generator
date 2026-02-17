import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

async function generateImage(prompt: string, referenceBase64?: string, refMime?: string): Promise<Buffer | null> {
  const parts: any[] = []
  if (referenceBase64) {
    parts.push({ inlineData: { mimeType: refMime || 'image/png', data: referenceBase64 } })
  }
  parts.push({ text: prompt })

  const response = await genai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ role: 'user', parts }],
    config: { responseModalities: ['TEXT', 'IMAGE'] } as any,
  })

  const resParts = response.candidates?.[0]?.content?.parts
  if (!resParts) return null
  for (const part of resParts) {
    if ((part as any).inlineData) {
      const data = (part as any).inlineData.data
      if (typeof data === 'string') return Buffer.from(data, 'base64')
      if (data instanceof Uint8Array || Buffer.isBuffer(data)) return Buffer.from(data)
    }
  }
  return null
}

// Step별 처리
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
  const { step, features, timestamp: ts } = body
  const timestamp = ts || Date.now()

  try {
    // ─── Step 2: 기본 캐릭터 일러스트 생성 (참조용) ───
    if (step === 'character') {
      const prompt = `Create a single character reference illustration based on this description. This will be used as a reference for paper doll creation.

Character: ${features.summary}

Draw the character standing front-facing, arms slightly away from body, in a simple white tank top and white shorts. Full body visible from head to toe.

Style: Clean cute illustration, simple colored, white background, no other elements. The character should look like a paper doll base - clear outlines, flat colors, friendly expression.

Important: Keep the character's distinctive features accurate - ${features.hair_style}, ${features.face_shape}, ${features.glasses || 'no glasses'}, ${features.accessories || 'no accessories'}.`

      const charBuffer = await generateImage(prompt)
      if (!charBuffer) return NextResponse.json({ error: '캐릭터 생성 실패' }, { status: 500 })

      const charPath = `${user.id}/${timestamp}-character.png`
      await supabase.storage.from('paperdoll').upload(charPath, charBuffer, { contentType: 'image/png' })
      const { data: charData } = supabase.storage.from('paperdoll').getPublicUrl(charPath)

      return NextResponse.json({
        step: 'character_done',
        characterUrl: charData.publicUrl,
        characterBase64: charBuffer.toString('base64'),
        timestamp,
      })
    }

    // ─── Step 3: 스타일별 도안 생성 (흑백) ───
    if (step === 'paperdoll') {
      const { style, characterBase64 } = body

      const styleMap: Record<string, { name: string; ratio: string; desc: string }> = {
        sd: { name: 'SD 귀여운', ratio: '2-head-tall', desc: 'super cute chibi/SD kawaii style, huge head, tiny round body, big sparkly eyes' },
        simple: { name: '심플 일러스트', ratio: '4-head-tall', desc: 'simple cute illustration style, clean lines, adorable proportions' },
        fashion: { name: '패션 일러스트', ratio: '6-head-tall', desc: 'realistic fashion illustration style, elegant proportions, detailed' },
      }

      const s = styleMap[style] || styleMap.simple

      const prompt = `Transform this character into a paper doll printable sheet.

STYLE: ${s.desc}, ${s.ratio} proportions.

Keep the character's face, hair, glasses, and distinctive features from the reference image but redraw in ${s.ratio} ${s.name} style.

LAYOUT on pure white background, A4 vertical:

TOP CENTER: The character in base outfit (white tank top + white shorts), standing front-facing, arms slightly out. Dashed cutting line around. About 15cm tall on A4.

BOTTOM: 4 outfit sets in 2x2 grid. EXACT same pose and size as character. To cut out and place ON TOP of doll. No folding tabs. Dashed cutting lines around each.

1. 캐주얼 - cute casual dress with sneakers
2. 공주님 - sparkly princess gown with tiara and wand
3. 한복 - traditional Korean hanbok (jeogori + chima)
4. 탐험가 - explorer outfit with vest, boots, adventure hat

COLORING BOOK VERSION: Black line art outlines ONLY. NO color. NO shading. NO gray fill. Pure black lines on pure white background. Clean crisp lines for coloring. Korean labels under each outfit.`

      const dollBuffer = await generateImage(prompt, characterBase64, 'image/png')
      if (!dollBuffer) return NextResponse.json({ error: '도안 생성 실패' }, { status: 500 })

      const dollPath = `${user.id}/${timestamp}-${style}-coloring.png`
      await supabase.storage.from('paperdoll').upload(dollPath, dollBuffer, { contentType: 'image/png' })
      const { data: dollData } = supabase.storage.from('paperdoll').getPublicUrl(dollPath)

      return NextResponse.json({
        step: 'paperdoll_done',
        coloringUrl: dollData.publicUrl,
        coloringBase64: dollBuffer.toString('base64'),
        style,
        timestamp,
      })
    }

    // ─── Step 4: 컬러 버전 생성 ───
    if (step === 'color') {
      const { coloringBase64, style: styleId } = body

      const prompt = `Take this exact black and white line art paper doll sheet and add beautiful full color. Keep EVERYTHING exactly the same - same layout, same poses, same outlines, same proportions, same positions. Just add vibrant beautiful colors appropriate for each outfit:

- Character: natural skin tone, accurate hair color from the original
- 캐주얼: bright cheerful colors
- 공주님: sparkly pink/magenta gown, silver tiara, gold wand
- 한복: traditional vibrant colors - pink/red jeogori, blue/indigo chima, gold embroidery
- 탐험가: khaki/olive vest, brown boots, green hat

Keep white background. Keep all dashed cutting lines. Identical layout.`

      const colorBuffer = await generateImage(prompt, coloringBase64, 'image/png')
      if (!colorBuffer) return NextResponse.json({ error: '컬러 생성 실패' }, { status: 500 })

      const colorPath = `${user.id}/${timestamp}-${styleId}-color.png`
      await supabase.storage.from('paperdoll').upload(colorPath, colorBuffer, { contentType: 'image/png' })
      const { data: colorData } = supabase.storage.from('paperdoll').getPublicUrl(colorPath)

      return NextResponse.json({
        step: 'color_done',
        colorUrl: colorData.publicUrl,
        style: styleId,
        timestamp,
      })
    }

    return NextResponse.json({ error: '잘못된 step' }, { status: 400 })
  } catch (err: any) {
    console.error('Generation error:', err)
    return NextResponse.json({ error: err.message || '생성 중 오류가 발생했습니다' }, { status: 500 })
  }
}

export const maxDuration = 60
