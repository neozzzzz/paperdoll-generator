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

      const styleMap: Record<string, { name: string; ratio: string; desc: string; outfits: string }> = {
        sd: {
          name: 'SD 귀여운',
          ratio: '2-head-tall',
          desc: 'super cute chibi/SD kawaii style, 2-head-tall proportions (head = 50% of total height), huge round head, tiny stubby body, big sparkly detailed eyes with highlights, rosy cheeks, detailed hair with individual strands visible',
          outfits: `1. 봄나들이 - floral print sundress with detailed flower patterns, matching sun hat with ribbon, cute mary-jane shoes with socks. Include hat as separate accessory piece.
2. 발레리나 - detailed layered tutu with ruffles, fitted leotard with ribbon detail, ballet pointe shoes with criss-cross ribbons up the legs, hair bow/tiara. Include headpiece as separate accessory.
3. 한복 - traditional Korean hanbok with detailed embroidery patterns on jeogori, flowing chima skirt with layered fabric folds, decorative norigae (hanging ornament), traditional shoes (kkotsin). Rich textile detail.
4. 파자마 - cute star/moon pattern pajama set (button-up top + pants), fluffy bunny slippers with cute faces, sleep mask as accessory piece.`
        },
        simple: {
          name: '심플 일러스트',
          ratio: '4-head-tall',
          desc: 'simple cute illustration style, 4-head-tall proportions, clean lines, adorable balanced proportions, expressive face',
          outfits: `1. 캐주얼 - denim overall dress over striped t-shirt, canvas sneakers with star detail, small backpack accessory
2. 공주님 - layered ball gown with sparkle details, puffy sleeves, tiara with gems, magic wand with star, glass slippers
3. 한복 - traditional Korean hanbok, jeogori with embroidered trim, full chima with sash, traditional hair ornament (binyeo), flower shoes
4. 탐험가 - safari vest with pockets, cargo shorts, hiking boots with laces, wide-brim adventure hat, binoculars accessory`
        },
        fashion: {
          name: '패션 일러스트',
          ratio: '6-head-tall',
          desc: 'elegant fashion illustration style, 6-head-tall proportions, graceful poses, detailed fabric textures and draping',
          outfits: `1. 캐주얼 - trendy cropped cardigan, pleated midi skirt, platform sneakers, crossbody bag accessory
2. 공주님 - elegant A-line gown with lace overlay, off-shoulder design, delicate tiara, satin gloves, crystal shoes
3. 한복 - modernized hanbok (생활한복), short jeogori with contemporary cut, flowing chima, traditional embroidery meets modern design, traditional hair pin
4. 탐험가 - chic utility jacket, fitted cargo pants, lace-up boots, bucket hat, vintage camera accessory`
        },
      }

      const s = styleMap[style] || styleMap.simple

      const prompt = `Create a high-quality paper doll printable sheet. This should look like a professionally designed children's activity page.

STYLE: ${s.desc}

Keep the character's face, hair, glasses, and distinctive features from the reference image but redraw in ${s.ratio} ${s.name} style.

LAYOUT on pure white background, A4 vertical format:

TOP CENTER: The character in base outfit (white tank top + white shorts), standing front-facing, arms slightly away from body. Dashed cutting line around the character. The character should be approximately 15cm tall on A4.

BOTTOM: 4 detailed outfit sets arranged in 2x2 grid. Each outfit is designed to be cut out and placed ON TOP of the doll (overlay style, no folding tabs). Dashed cutting lines around each piece. Each outfit should include matching shoes/accessories as separate pieces where noted.

OUTFITS (with detailed accessories):
${s.outfits}

Korean label (한글) under each outfit name.

COLORING BOOK VERSION: Black line art outlines ONLY. NO color, NO shading, NO gray fill, NO gradients. Pure crisp black lines on pure white background. Lines should be clean and detailed enough for coloring - include fabric pattern outlines, texture details, decorative elements all as line art. Professional coloring book quality.`

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

      const colorGuides: Record<string, string> = {
        sd: `- 봄나들이: pastel pink/yellow floral dress, straw hat with pink ribbon, white mary-jane shoes
- 발레리나: soft pink/white tutu with sparkle, satin pink pointe shoes, silver tiara
- 한복: vibrant cherry-red jeogori with gold embroidery, deep blue chima, colorful norigae, white kkotsin
- 파자마: soft lavender/mint pajamas with yellow stars, white fluffy bunny slippers with pink ears`,
        simple: `- 캐주얼: blue denim overall, red/white striped tee, white sneakers with gold star
- 공주님: sparkly pink/magenta ball gown, silver tiara with blue gems, gold wand with star
- 한복: coral pink jeogori with gold trim, indigo blue chima with sash, jade hair ornament
- 탐험가: khaki/olive vest, tan shorts, brown hiking boots, forest green hat`,
        fashion: `- 캐주얼: cream cardigan, dusty rose pleated skirt, white platform sneakers, tan crossbody bag
- 공주님: soft champagne gold gown with white lace overlay, silver tiara, pearl white gloves, crystal shoes
- 한복: modern sage green jeogori, dusty pink chima, gold embroidery accents, traditional jade pin
- 탐험가: olive utility jacket, tan cargo pants, cognac brown boots, beige bucket hat, vintage brown camera`,
      }

      const prompt = `Take this exact black and white line art paper doll sheet and add beautiful, rich full color. Keep EVERYTHING exactly the same - same layout, same poses, same outlines, same proportions, same positions, same dashed cutting lines. 

Color guide:
- Character: warm natural skin tone, accurate hair color from the original design
${colorGuides[styleId] || colorGuides.simple}

Apply colors with depth - use subtle shading and highlights to make each outfit look vibrant and appealing. Fabric patterns (flowers, stars, embroidery) should be colored in detail. Keep white background. Keep all dashed cutting lines visible. Identical layout to the line art.`

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
