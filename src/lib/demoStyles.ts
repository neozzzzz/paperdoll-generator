export type StyleModule = {
  id: string
  name: string
  ratio: string
  ratioDisplay: string
  desc: string
  descKr: string            // 한글 설명 (UI용)
  tone: string
  toneKr: string            // 한글 톤 요약 (UI용)
  outfits: {
    id: string
    name: string
    description: string
    color: string
  }[]
  strictRules: string[]
  strictRulesKr: string[]   // 한글 규칙 (UI용)
  baseTemplate?: string
}

const SIMPLELINE_BASE = {
  ratio: '4-head-tall',
  shape: 'full body, centered, front-facing, arms slightly apart, shoulders and hips in balanced angle',
  size: 'fits within A4 character area about 15cm tall',
  clothingFrame: 'base outfit is a clean neutral top + shorts in solid lines',
  faceLine: 'clear jawline, clean eyes, small nose, neutral mouth, clear hairline',
}

const styleSharedRules = {
  lineQuality: [
    'Use clean, closed, uniform-weight contour lines optimized for print at 300dpi',
    'No overhanging sleeves or clipped limbs — every body part must be fully enclosed',
    'Leave ≥5mm white margin around full body on all sides',
  ],
  composition: [
    'Front-facing base doll with stable symmetric stance, weight evenly distributed',
    'Bottom outfits must be separate detachable overlay pieces with visible dashed cut lines',
    'Zero perspective distortion — strict orthographic front projection',
  ],
}

const styleSharedRulesKr = {
  lineQuality: [
    '300dpi 인쇄 최적화된 균일한 외곽선 사용',
    '잘리거나 넘치는 부분 없이 모든 신체 부위를 완전히 둘러쌈',
    '전신 주변 최소 5mm 여백 확보',
  ],
  composition: [
    '정면 대칭 자세, 무게 균등 배분',
    '하단 의상은 분리 가능한 오버레이 조각 + 절취선 표시',
    '원근 왜곡 없음 — 정면 직교 투영만 사용',
  ],
}

export const DEMO_STYLE_LIBRARY: Record<string, StyleModule> = {
  sd: {
    id: 'sd',
    name: 'SD 귀여운',
    ratio: '3-head-tall',
    ratioDisplay: '약 3등신',
    desc: 'Chibi/SD paper-doll base derived from Simple Line frame',
    descKr: '심플라인 기반의 치비/SD 종이인형. 머리 비율만 확대, 몸체 실루엣은 유지.',
    tone: [
      'Super-deformed (SD) chibi kawaii illustration for paper doll.',
      '3-head-tall proportion: head = 40% of total height.',
      'Head is perfectly round with oversized cranium dome.',
      'Eyes are 30% of face area — large, round, with double-ring iris highlights and thick upper lash line.',
      'Cheeks have visible soft blush circles.',
      'Nose is a single tiny dot or absent; mouth is a small curve.',
      'Body is compact and stubby: short torso, short limbs, no visible joints.',
      'Hands are simplified mitten shapes with 3-4 finger bumps.',
      'Feet are small rounded stumps.',
      'Line weight: 2px main contour, 1px inner detail.',
      'All edges are rounded — no sharp corners anywhere on the character.',
      'Rendering: flat cel-shaded fills, no gradient, no texture.',
    ].join(' '),
    toneKr: '초대형 동그란 머리(전체 40%), 큰 반짝이 눈, 볼 터치, 짧은 팔다리, 뭉툭한 손발, 모든 모서리 둥글게, 플랫 셀셰이딩',
    outfits: [
      { id: 'spring', name: '봄나들이', description: 'floral print mini dress with 5+ distinct flower shapes, sun hat with wide brim and ribbon bow, mary-jane shoes with buckle, patterned ankle socks with lace trim', color: 'soft pastel pink dress with yellow/white florals, straw-colored hat with pink ribbon' },
      { id: 'ballet', name: '발레리나', description: 'multi-layered tutu with 4+ visible tulle layers, fitted bodice with cross-lace detail, satin ribbon sash at waist, pointe shoes with criss-cross ankle ribbons, crystal tiara', color: 'ballet pink and white with iridescent sparkle accents' },
      { id: 'hanbok', name: '한복', description: 'jeogori with goreum ribbon tie and floral embroidery on sleeve cuffs, full chima with 3 visible fabric fold layers, decorative norigae pendant hanging from goreum, traditional kkotsin shoes with upturned toe', color: 'crimson red jeogori with gold embroidery, deep indigo chima, multicolor norigae' },
      { id: 'pajama', name: '파자마', description: 'button-front pajama top with star and crescent moon repeat pattern, matching pants with elastic cuffs, bunny-face slippers with floppy ears, sleep mask with bear face pushed up on forehead', color: 'lavender top and mint pants with golden yellow stars, white bunny slippers with pink inner ear' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'Head circumference must be visibly larger than shoulder width',
      'No neck visible — head sits directly on torso',
      'Limb length must not exceed 1.2x torso length',
      'All corners and joints must be rounded (border-radius effect)',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '머리 둘레 > 어깨 너비 (필수)',
      '목 없음 — 머리가 몸통에 바로 연결',
      '팔다리 길이 ≤ 몸통 1.2배',
      '모든 꼭짓점/관절 라운드 처리',
    ],
    baseTemplate: `Use Simple Line composition (${SIMPLELINE_BASE.shape}, ${SIMPLELINE_BASE.size}) but apply SD head-to-body ratio of 1:2.`,
  },

  simple: {
    id: 'simple',
    name: '심플라인',
    ratio: SIMPLELINE_BASE.ratio,
    ratioDisplay: '4등신',
    desc: 'Simple Line — the base template all other styles derive from',
    descKr: '모든 스타일의 기준이 되는 베이스 템플릿. 안정적이고 정돈된 실루엣.',
    tone: [
      'Clean cute illustration for paper doll, serving as the master base template.',
      '4-head-tall proportion with balanced anatomy.',
      'Head is slightly large but natural, oval-shaped with clean jawline.',
      'Eyes are medium-large with clear iris detail, single highlight dot, visible eyelashes.',
      'Nose is a small soft triangle; mouth is a gentle smile line.',
      'Body has clear shoulder-waist-hip definition without exaggeration.',
      'Arms hang naturally with slight bend, hands have 5 defined fingers.',
      'Legs are straight and balanced, feet are simple flat shapes.',
      'Line weight: 2.5px main contour, 1.5px inner detail, 0.5px fabric texture hints.',
      'Style is between cartoon and illustration — readable but not overly simplified.',
      'Rendering: clean flat color with minimal single-direction shadow on one side.',
    ].join(' '),
    toneKr: '4등신 기본 비율, 자연스러운 타원 얼굴, 깨끗한 윤곽선, 어깨-허리-힙 비율 명확, 최소한의 단방향 그림자',
    outfits: [
      { id: 'casual', name: '캐주얼', description: 'denim overall dress with visible stitching and brass button detail, striped tee underneath (red/white 1cm stripes), canvas sneakers with rubber sole and star patch, mini backpack with zipper pull', color: 'classic blue denim overall, red/white striped tee, white sneakers with gold star' },
      { id: 'princess', name: '공주님', description: 'ball gown with off-shoulder puff sleeves, layered skirt with 3 visible tiers, sparkle detail scattered on fabric, jeweled tiara with center gem, star-tipped wand, glass-like transparent heels', color: 'magenta-to-pink gradient gown, silver tiara with blue center gem, gold wand' },
      { id: 'hanbok', name: '한복', description: 'jeogori with curved neckline and goreum bow, embroidered trim along sleeve edges, full chima with visible waistband sash, traditional binyeo hairpin with jade ornament, embroidered floral flat shoes', color: 'coral pink jeogori with gold trim, indigo chima, jade green binyeo accent' },
      { id: 'adventure', name: '탐험가', description: 'multi-pocket safari vest with cargo flaps, canvas cargo shorts with side pockets, lace-up hiking boots with thick sole, wide-brim adventure hat with cord, binoculars on neck strap as detachable accessory', color: 'olive khaki vest, tan shorts, brown leather boots, forest green hat' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'This is the canonical base — all extracted features (hair, face, glasses, accessories) must be rendered with maximum fidelity',
      'Proportions must be anatomically balanced: shoulder width = 1.5 head widths, arm length = 1.8 head heights',
      'Every outfit piece must have at least one distinguishing texture or pattern detail',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '기준 템플릿 — 추출된 모든 특징을 최대한 충실히 반영',
      '어깨 너비 = 머리 1.5배, 팔 길이 = 머리 높이 1.8배',
      '모든 의상에 최소 1개 이상의 텍스처/패턴 디테일 필수',
    ],
    baseTemplate: `Canonical base: ${SIMPLELINE_BASE.shape}, ${SIMPLELINE_BASE.size}, ${SIMPLELINE_BASE.clothingFrame}, ${SIMPLELINE_BASE.faceLine}.`,
  },

  fashion: {
    id: 'fashion',
    name: '패션 일러스트',
    ratio: '5.5-head-tall',
    ratioDisplay: '5.5등신',
    desc: 'Fashion illustration upgrade from Simple Line with refined proportions',
    descKr: '심플라인에서 비율을 한 단계 키우고 의상 디테일(주름/봉제선/드레이프)을 보강한 패션 일러스트.',
    tone: [
      'Elegant fashion illustration for paper doll, derived from Simple Line base.',
      '5.5-head-tall proportion: elongated legs (+30% vs base), slim torso, graceful neck visible.',
      'FACE IS CRITICAL: The face must look ATTRACTIVE and AGE-APPROPRIATE. Reproduce the extracted face features faithfully.',
      'Do NOT distort the face for fashion effect — keep it cute/pretty and matching the original age.',
      'Eyes have fashion-illustration styling: slightly almond shape, defined brow arch, clean lash detail, but still friendly and appealing.',
      'Body has clear S-curve posture hint while maintaining front-facing stance.',
      'Fabric rendering is key differentiator: visible seam lines, pleat shadows, drape fold physics.',
      'Each garment shows construction detail: buttons, zippers, stitching, lining peeks.',
      'Accessories have material distinction: leather vs metal vs fabric vs crystal.',
      'Line weight: 2px main contour, 1px garment construction lines, 0.5px fabric texture.',
      'Rendering: clean line art with selective thin-line cross-hatching for fabric weight areas.',
    ].join(' '),
    toneKr: '5.5등신 늘씬한 비율, 날카로운 턱선, 아몬드형 눈, S커브 자세, 봉제선/주름/드레이프 물리 표현, 소재별 질감 구분',
    outfits: [
      { id: 'casual', name: '캐주얼', description: 'cropped boucle cardigan with pearl button closure, knife-pleated midi skirt with visible waistband, platform sneakers with chunky sole detail, quilted crossbody bag with chain strap', color: 'cream boucle cardigan, dusty rose skirt, white/gold sneakers, tan bag with gold chain' },
      { id: 'princess', name: '공주님', description: 'A-line gown with French lace overlay on bodice, off-shoulder neckline with scalloped edge, multi-layer tulle skirt with horsehair hem, opera-length satin gloves, crystal-encrusted stiletto heels, filigree tiara', color: 'champagne gold gown, ivory lace overlay, silver crystal heels, pearl white gloves' },
      { id: 'hanbok', name: '한복', description: 'modernized short jeogori with structured shoulder line, slim goreum with contemporary knot, flowing chima with knife pleats and modern hem length, traditional gold-thread embroidery along edges, sleek traditional hairpin', color: 'sage green jeogori, dusty pink chima, gold thread embroidery, antique jade pin' },
      { id: 'explorer', name: '탐험가', description: 'tailored utility jacket with epaulettes and cargo pockets, slim-fit cargo pants with ankle zipper, lace-up cognac leather boots with heel, canvas bucket hat, vintage leather camera with strap', color: 'olive jacket, beige cargo pants, cognac brown leather boots, tan hat, brown camera' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'Leg length must be ≥55% of total body height',
      'Every garment must show at least 2 construction details (seams, buttons, pleats, zippers)',
      'Fabric weight must be visually distinguishable: heavy fabrics drape down, light fabrics float',
      'Character identity (face/hair) must remain clearly identical to base — only proportions change',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '다리 길이 ≥ 전체 신장의 55%',
      '모든 의상에 봉제 디테일 2개 이상 (솔기/단추/주름/지퍼)',
      '원단 무게감 시각 구분: 무거운 원단은 아래로, 가벼운 원단은 부풀어오르게',
      '얼굴/헤어는 베이스와 동일 — 비율만 변경',
    ],
    baseTemplate: `Derived from Simple Line: ${SIMPLELINE_BASE.shape}, ${SIMPLELINE_BASE.size}, ${SIMPLELINE_BASE.faceLine}. Upgrade: elongate legs, add garment construction detail, refine fabric rendering.`,
  },

  pastel: {
    id: 'pastel',
    name: '파스텔 드림',
    ratio: '3.5-head-tall',
    ratioDisplay: '3.5등신',
    desc: 'Dreamy pastel watercolor-feel illustration with soft-focus aesthetic',
    descKr: '수채화 느낌의 부드러운 파스텔톤. 선이 연하고 색 경계가 흐릿하며 몽환적인 분위기.',
    tone: [
      'CRITICAL STYLE DIRECTIVE: This must look distinctly different from all other styles.',
      'Dreamy soft pastel watercolor illustration style for paper doll.',
      '3.5-head-tall proportion with rounded, puffy body silhouette.',
      'ALL lines must be soft-edged and slightly blurred — NOT crisp black lines.',
      'Line color is NEVER black: use warm gray (#B0A8A0) or soft mauve (#C4A6B8) for all outlines.',
      'Line weight: 1.5px with soft anti-aliased edges that bleed slightly into surrounding color.',
      'Eyes are large with PASTEL-colored irises (lavender, mint, peach) and soft gradient fill.',
      'Cheeks have large circular watercolor-style blush patches that fade at edges.',
      'Hair is rendered in soft gradient blocks, not individual strands — like watercolor washes.',
      'ALL colors must be desaturated pastels: max saturation 40%, lightness 75-90%.',
      'Color palette restricted to: baby pink, lavender, mint, cream, peach, powder blue, soft coral.',
      'Background color hints: subtle pastel wash bleeding from character edges (NOT pure white).',
      'Texture: visible paper grain effect or watercolor bloom texture on all colored areas.',
      'Overall mood: like a page from a dreamy children\'s picture book, soft-focus camera effect.',
    ].join(' '),
    toneKr: '수채화 번짐 효과, 선 색상은 절대 검정 아님(회갈색/모브), 부드러운 안티앨리어싱, 파스텔 아이리스 눈, 수채 블러시, 채도 40% 이하, 종이 질감 표현',
    outfits: [
      { id: 'icecream', name: '아이스크림', description: 'mint pinafore dress with scalloped hem and ice-cream cone embroidery, candy-striped knee socks, pastel sneakers with heart laces, candy-shaped hair clip with wrapped ribbon', color: 'mint green dress with peach/cream stripes, strawberry pink socks, lavender sneakers' },
      { id: 'library', name: '도서관', description: 'oversized cable-knit cardigan with wooden toggle buttons, pleated school skirt with soft plaid, round glasses with thin frame, canvas tote bag with book peeking out, mary-jane shoes', color: 'cream cardigan, light blue plaid skirt, warm beige tote, powder pink shoes' },
      { id: 'kpop', name: '꽃소녀', description: 'pastel hanbok-inspired one-piece with shortened chima, wide ribbon sash with butterfly bow, traditional-modern fusion shoes, flower crown headband with soft trailing ribbons', color: 'baby pink dress with peach sash, cream shoes, lavender and pink flower crown' },
      { id: 'skate', name: '스케이트', description: 'soft velour tracksuit jacket with zipper, matching shorts with pastel piping, knee-high socks with star pattern, quad roller skates with pastel wheels, wrist guards with heart detail', color: 'powder blue jacket, salmon shorts, cream socks with pink stars, lilac skates' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'MANDATORY: Line color must be warm gray or mauve — NEVER use pure black (#000000)',
      'MANDATORY: All fills use pastel colors with max 40% saturation',
      'MANDATORY: Add visible watercolor bloom/bleed texture effect on at least 3 areas',
      'All corners must be extra-rounded (minimum 8px radius equivalent)',
      'Hair must be rendered as soft gradient color blocks, not individual strands',
      'Blush must be visible circular watercolor patches on both cheeks',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '필수: 선 색상은 웜그레이 또는 모브 — 순흑(#000) 절대 금지',
      '필수: 모든 채색은 채도 40% 이하 파스텔',
      '필수: 수채화 번짐(블룸) 효과 3곳 이상',
      '모든 모서리 초둥글게(8px 이상)',
      '머리카락은 그라데이션 블록으로 (개별 가닥 아님)',
      '양볼에 수채 블러시 패치 필수',
    ],
  },

  inkline: {
    id: 'inkline',
    name: '모노 라인',
    ratio: '4-head-tall',
    ratioDisplay: '4등신',
    desc: 'Monochrome ink illustration with line hierarchy and crosshatch shading',
    descKr: '잉크 펜 드로잉 느낌. 선 굵기에 위계가 있고, 크로스해칭으로 음영 표현. 색 최소화.',
    tone: [
      'Professional monochrome ink illustration style for paper doll.',
      '4-head-tall proportion with clean structural anatomy.',
      'THREE distinct line weights creating visual hierarchy:',
      '  - 3px bold contour for body silhouette and garment edges,',
      '  - 1.5px medium line for internal structure (collar, cuffs, pockets, seams),',
      '  - 0.5px fine line for texture detail (fabric weave, hair strands, pattern fills).',
      'Shading ONLY through crosshatch technique: parallel line groups at 45° angles.',
      'NO solid black fills larger than 5mm² — use hatching density to imply darkness.',
      'Eyes are rendered with fine detail: iris has radial lines, pupil is solid black circle.',
      'Hair uses flowing parallel stroke groups with varied spacing for volume.',
      'Fabric texture is style-critical: each material must have distinct hatching pattern.',
      'NO color, NO gray tone, NO gradient — pure black ink lines on white only.',
      'Aesthetic reference: European fashion plate engraving meets manga pen technique.',
    ].join(' '),
    toneKr: '3단계 선 굵기(3px/1.5px/0.5px) 위계, 크로스해칭 음영(45°), 5mm² 이상 검정 채우기 금지, 소재별 해칭 패턴 구분, 순수 흑백',
    outfits: [
      { id: 'office', name: '오피스', description: 'structured blazer with notched lapel and visible stitching, pencil skirt with kick pleat, penny loafers with tassel detail, structured leather handbag with clasp', color: 'charcoal gray blazer, black skirt, oxblood loafers, navy bag' },
      { id: 'nun', name: '수녀', description: 'modest high-collar dress with pin-tuck bodice, wide ribbon sash at waist, delicate cross pendant necklace, wrist-length gloves with button closure', color: 'navy dress, ivory sash, silver pendant, cream gloves' },
      { id: 'hanbok', name: '한복', description: 'traditional hanbok with geometric fold patterns on chima, structured jeogori with sharp collar lines, ornamental binyeo with fan-shaped head, traditional shoes with upturned toe', color: 'maroon jeogori, black chima with jade-colored geometric trim' },
      { id: 'urban', name: '트랜지션', description: 'oversized hoodie with kangaroo pocket and drawstring detail, cargo shorts with flap pockets and snap buttons, high-top sneakers with visible lacing pattern, fingerless utility gloves', color: 'charcoal hoodie, dark gray shorts, black sneakers with cyan sole accent' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'MANDATORY: Three distinct line weights must be clearly visible (3px / 1.5px / 0.5px)',
      'MANDATORY: Shading uses crosshatch lines only — no solid fills, no gradients',
      'Each fabric type must have a unique hatching pattern (tweed ≠ silk ≠ leather ≠ cotton)',
      'Hair must show parallel flowing strokes with deliberate spacing variation',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '필수: 선 굵기 3단계가 명확히 구분되어야 함',
      '필수: 음영은 크로스해칭만 — 채우기/그라데이션 금지',
      '각 소재별 고유 해칭 패턴 (트위드 ≠ 실크 ≠ 가죽 ≠ 면)',
      '머리카락은 간격 변화가 있는 흐르는 평행 스트로크',
    ],
  },

  pastelpixel: {
    id: 'pastelpixel',
    name: '픽셀 키키',
    ratio: '4-head-tall',
    ratioDisplay: '4등신',
    desc: 'Retro pixel-art inspired illustration with visible grid structure',
    descKr: '레트로 픽셀아트 감성. 눈에 보이는 픽셀 격자, 계단 현상(앨리어싱) 의도적 노출, 네온 악센트 컬러.',
    tone: [
      'CRITICAL STYLE DIRECTIVE: This must look like pixel art / retro game sprite, NOT normal illustration.',
      'Retro pixel-art inspired character for paper doll.',
      '4-head-tall proportion rendered AS IF on a 128×256 pixel grid.',
      'ALL edges must show visible pixel stepping (staircase aliasing) — this is the core visual identity.',
      'NO smooth curves — every curve must be approximated with pixel-grid stair steps.',
      'Eyes are 8×8 pixel blocks with 2×2 white highlight square in upper-left.',
      'Hair is rendered as chunky pixel blocks grouped by color — no individual strands.',
      'Body contour uses 2-pixel-wide black border with consistent pixel stepping.',
      'Internal details (face, clothes) use 1-pixel lines.',
      'When in COLOR mode: fills are perfectly flat, ZERO gradient, ZERO anti-aliasing. Palette limited to 16 colors max.',
      'When in LINE ART / COLORING BOOK mode: ALL pixels must be black or white ONLY. No color fills. Pixel grid structure and staircase edges remain visible. Areas meant for coloring are enclosed by black pixel OUTLINE borders with EMPTY WHITE interior.',
      'LINE ART CRITICAL: In coloring book mode, garment interiors must be WHITE/EMPTY — do NOT fill clothing areas with dense black pixels, checkerboard, or dither patterns. Only draw the OUTLINE edges of each garment piece. Keep interiors blank so they can be hand-colored.',
      'Accessories rendered as recognizable pixel icons (8×8 to 16×16 pixel resolution feel).',
      'Overall aesthetic: Game Boy Advance / SNES RPG character sprite enlarged to paper doll size.',
    ].join(' '),
    toneKr: '128×256 픽셀 격자 느낌, 모든 곡선은 계단 현상(스텝) 표현, 8×8 블록 눈, 16색 제한, 완전 플랫 채색, 체커보드/디더링 패턴, GBA/SNES 스프라이트 레퍼런스',
    outfits: [
      { id: 'game', name: '게임존', description: 'neon-trimmed bomber jacket with pixel-pattern patches, mini skirt with dithered gradient edge, platform sneakers with chunky pixel sole, joystick-shaped keyring accessory as detachable piece', color: 'electric violet jacket with cyan trim, hot pink skirt, white sneakers with neon green sole' },
      { id: 'space', name: '우주', description: 'retro space suit with segmented pixel armor panels, emblem patches on shoulders (8-bit star design), glossy boots with pixel reflection squares, helmet accessory (separate piece) with tinted visor', color: 'navy suit with silver pixel armor, lime green emblem patches, chrome boots' },
      { id: 'hanbok', name: '퓨전한복', description: 'modernized hanbok rendered in pixel blocks, geometric pixel-pattern ribbon bow, angular chima with pixel-dithered gradient edge, pixel-art traditional shoes, glitch-art inspired hair ornament', color: 'turquoise jeogori with magenta pixel border, gold dithered chima edge' },
      { id: 'street', name: '스트리트', description: 'oversized pixel-art hoodie with 8-bit face graphic on front, cargo shorts with pixel camo pattern, chunky sneakers with visible pixel grid on sole, pixel-art wristband accessories', color: 'black hoodie with white 8-bit graphic, white shorts with yellow pixel camo, electric yellow sneakers' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'MANDATORY: All curves must show visible pixel staircase stepping — zero anti-aliasing on character edges',
      'MANDATORY: Color fills must be perfectly flat with zero gradient — use dithering patterns for tone variation',
      'MANDATORY: Maximum 16 distinct colors in entire illustration',
      'Eyes must be rendered as pixel blocks (not smooth circles)',
      'At least 3 garment areas must show pixel-grid texture patterns (checkerboard, diagonal, stripe)',
      'Overall image must read as "enlarged pixel sprite" not "normal illustration"',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '필수: 모든 곡선에 계단 현상(픽셀 스텝) 표현 — 안티앨리어싱 0',
      '필수: 완전 플랫 채색, 그라데이션 대신 디더링 패턴 사용',
      '필수: 전체 이미지에 최대 16색',
      '눈은 픽셀 블록으로 (부드러운 원 아님)',
      '3곳 이상 픽셀 격자 텍스처 패턴 사용',
      '"확대된 픽셀 스프라이트"로 보여야 함',
    ],
  },

  noir: {
    id: 'noir',
    name: '네오 누아르',
    ratio: '5-head-tall',
    ratioDisplay: '5등신',
    desc: 'Neo-noir cinematic illustration with dramatic contrast and sharp silhouette',
    descKr: '영화적 누아르 무드. 강한 명암 대비, 날카로운 실루엣, 하드보일드 그림자 처리.',
    tone: [
      'CRITICAL STYLE DIRECTIVE: This must evoke film-noir / gothic fashion plate aesthetics.',
      'Neo-noir cinematic illustration for paper doll.',
      '5-head-tall proportion with elongated, angular silhouette.',
      'Body shape is lean and angular: sharp shoulder points, defined waist, tapered limbs.',
      'Face has dramatic features: strong jawline, high cheekbones, deep-set eyes with heavy shadow.',
      'Eyes have heavy upper lid shadow creating hooded mysterious look, small sharp highlight.',
      'Hair is rendered in large dramatic swooping shapes with high-contrast light/dark sections.',
      'DRAMATIC LIGHTING is the key differentiator:',
      '  - Strong single-source directional light from upper-left,',
      '  - Cast shadows are hard-edged and angular (not soft/diffused),',
      '  - Shadow areas use dense parallel hatching at 30° angle,',
      '  - Lit areas are clean white with minimal detail.',
      'Line weight has extreme contrast: 4px for shadow-side contour, 1px for light-side contour.',
      'Large areas of solid black allowed for dramatic effect (unlike other styles).',
      'Mood: mysterious, sophisticated, cinematic — like a movie poster in paper doll form.',
      'Color phase note: use deep jewel tones only — no pastels, no bright primaries.',
    ].join(' '),
    toneKr: '날카로운 각진 실루엣, 강한 단일 광원(좌상단), 하드엣지 캐스트 섀도우, 30° 해칭 음영, 선 굵기 극단 대비(4px/1px), 대면적 검정 허용, 주얼톤만 사용',
    outfits: [
      { id: 'midnight', name: '심야', description: 'floor-length trench coat with dramatic collar pop and belt cinch, ankle boots with pointed toe and stiletto heel, wide-brim fedora hat casting shadow over eyes, the coat interior lining visible at hem', color: 'jet black coat with deep charcoal lining, crimson red belt, black boots' },
      { id: 'ghost', name: '밤도깨비', description: 'flowing hooded cloak with jagged hem edge, layered asymmetric skirt with torn-edge detail, ornate lantern accessory on chain (detachable), ribbon tie closures with trailing ends', color: 'deep midnight purple cloak, black skirt, antique gold lantern, silver ribbons' },
      { id: 'hanbok', name: '한복', description: 'dark dramatic hanbok with extra-long flowing chima train, structured jeogori with sharp geometric collar, ornate silver filigree norigae, modern angular interpretation of traditional shoes', color: 'indigo-black chima, charcoal jeogori with silver thread, oxidized silver norigae' },
      { id: 'detective', name: '현대탐정', description: 'belted detective trench coat with epaulettes, leather gloves with visible stitching, deerstalker-inspired hat with modern edge, magnifying glass accessory (detachable), structured messenger bag', color: 'olive drab coat, black leather gloves, sepia brown hat, brass magnifier, dark brown bag' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'MANDATORY: Single directional light source from upper-left must be evident in all shadow placement',
      'MANDATORY: Shadow-side line weight must be 2x+ thicker than light-side line weight',
      'MANDATORY: At least 20% of character area should be solid black or dense hatching',
      'All shadows must have hard edges — no soft gradients or blurred shadows',
      'Silhouette must be angular and dramatic — avoid rounded cute aesthetics',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '필수: 좌상단 단일 광원이 모든 그림자 배치에 반영',
      '필수: 그림자 쪽 선 굵기 ≥ 밝은 쪽의 2배',
      '필수: 캐릭터 면적의 20% 이상이 검정 또는 밀집 해칭',
      '모든 그림자는 하드 엣지 — 소프트/블러 금지',
      '실루엣은 각지고 드라마틱하게 — 귀여운 둥근 느낌 배제',
    ],
  },

  kawaiiMax: {
    id: 'kawaiimax',
    name: '케이퍼 키치',
    ratio: '2.2-head-tall',
    ratioDisplay: '2.2등신',
    desc: 'Ultra-kawaii chibi with maximum decoration and sticker-like rendering',
    descKr: '초극단 카와이 치비. 머리가 몸의 2배, 데코 요소 최대치, 스티커처럼 두꺼운 테두리.',
    tone: [
      'CRITICAL STYLE DIRECTIVE: This is the most extreme cute style — push kawaii to maximum.',
      'Ultra-kawaii chibi sticker-art for paper doll.',
      '2.2-head-tall proportion: head is LARGER than entire body (head = 55% of total height).',
      'Head shape is a perfect circle — no chin point, no jaw angle.',
      'Eyes occupy 50%+ of face: enormous circular eyes with:',
      '  - 3+ concentric highlight rings (large white, medium sparkle, small star),',
      '  - Colored iris fills entire eye socket,',
      '  - Thick 3px upper lash line with individual lash spikes,',
      '  - Visible star/heart shaped catch-light reflections.',
      'Mouth is a tiny "w" or cat-mouth shape, always in smile.',
      'Blush is TWO large pink circles per cheek (stacked or overlapping).',
      'Hair is rendered as a massive voluminous shape: bigger than head, with decorative elements embedded (stars, hearts, bows).',
      'Body is a tiny bean shape below head: no visible neck, no waist, limbs are short stumps.',
      'Hands are ball shapes with no fingers. Feet are tiny round nubs.',
      'OUTLINE: 3.5px thick solid black outline around EVERYTHING — sticker die-cut effect.',
      'An additional 1px white gap between character and outer outline (kiss-cut sticker look).',
      'Decorative elements MANDATORY: floating hearts, stars, sparkles around character (at least 5).',
      'Colors: maximum saturation, candy-bright, with at least 2 glitter/sparkle effects.',
    ].join(' '),
    toneKr: '머리 = 전체 55%, 완벽한 원형, 눈이 얼굴 50% 차지, 3중 하이라이트+별/하트 캐치라이트, 고양이 입, 이중 볼터치, 머리카락에 장식 내장, 콩 모양 몸통, 3.5px 스티커 테두리, 떠다니는 하트/별 5개+, 캔디 색상',
    outfits: [
      { id: 'dessert', name: '디저트', description: 'waffle-textured jumper dress with syrup-drip hem, whipped-cream shaped beret, candy cane striped knee socks, heart-shaped buckle mary-janes, ice cream cone bag accessory', color: 'cherry pink dress with cream waffle texture, brown syrup drip, white beret, pink/white striped socks' },
      { id: 'star', name: '별이', description: 'oversized star-print hoodie with shooting-star zipper pull, tutu skirt made of layered star-shaped fabric, star-patterned tights, glitter platform sneakers, star wand accessory', color: 'cobalt blue hoodie with bright yellow stars, pink tutu, silver glitter shoes' },
      { id: 'hanbok', name: '한복', description: 'ultra-chibi hanbok with exaggerated puff sleeves, oversized goreum bow (bigger than torso), layered chima with heart-shaped hem cutouts, pom-pom ornament norigae, tiny traditional shoes with star buckle', color: 'ruby pink jeogori, peach chima with gold heart cutout edges, rainbow pom-pom norigae' },
      { id: 'rainbow', name: '레인보우', description: 'cropped rainbow-stripe bomber jacket with cloud-shaped buttons, rainbow-gradient skort, striped thigh-high socks with star tops, platform sneakers with rainbow soles, rainbow headband with unicorn horn', color: 'full rainbow gradient on all pieces, white cloud buttons, iridescent unicorn horn' },
    ],
    strictRules: [
      ...styleSharedRules.lineQuality,
      ...styleSharedRules.composition,
      'MANDATORY: Head must be ≥55% of total character height',
      'MANDATORY: Eyes must occupy ≥50% of face area with 3+ highlight layers',
      'MANDATORY: 3.5px thick sticker-style outline around entire character',
      'MANDATORY: At least 5 floating decorative elements (hearts, stars, sparkles) around character',
      'No visible neck, wrist, or ankle joints — all connections are smooth curves',
      'Every outfit piece must include at least one kawaii motif (heart, star, bow, paw, cloud)',
    ],
    strictRulesKr: [
      ...styleSharedRulesKr.lineQuality,
      ...styleSharedRulesKr.composition,
      '필수: 머리 ≥ 전체 높이의 55%',
      '필수: 눈 ≥ 얼굴 면적의 50%, 하이라이트 3겹 이상',
      '필수: 3.5px 두께 스티커식 외곽선',
      '필수: 떠다니는 장식(하트/별/반짝이) 5개 이상',
      '목/손목/발목 관절 없음 — 모든 연결부 부드러운 곡선',
      '모든 의상에 카와이 모티브(하트/별/리본/구름) 1개+',
    ],
  },
}

// ─── Face reference style guide (from approved reference image) ───
const FACE_REFERENCE_GUIDE = `FACE STYLE REFERENCE (MANDATORY for all styles):
- Eyes: Large round eyes occupying ~30% of face area. Double highlight dots (large white circle + small sparkle). Thick upper lash line with 3-4 individual lash spikes at outer corner. Clean lower lash line. Iris is large and dark with subtle gradient.
- Eyebrows: Thin, soft, natural arch — NOT thick or angular.
- Nose: Minimal — a tiny soft dot or very short vertical line. Never a full nose bridge.
- Mouth: Small gentle smile. Upper lip is a soft "m" shape, lower lip barely visible. Lip width ≤ distance between inner eye corners.
- Face shape: Soft V-line chin, rounded forehead, smooth cheeks. NOT angular, NOT square. The chin tapers gently, never pointed.
- Overall: The face must look CUTE and PRETTY — like a high-quality children's illustration doll. Friendly, approachable, appealing.
- Hair framing: Bangs frame the forehead softly. Side hair flows past shoulders in gentle waves.
- Expression: Default gentle smile, warm and inviting.
- GLASSES: Do NOT add glasses unless the character description EXPLICITLY mentions glasses. The reference image has NO glasses. If the extracted features say glasses = "null" or "없음" or do not mention glasses, the character must NOT wear glasses.
This face quality is the MINIMUM STANDARD. Every generated face must be at least this attractive.`

// ─── Prompt builders ───

function composeRules(style: StyleModule): string[] {
  return [
    ...(style.baseTemplate ? [`Base reference: ${style.baseTemplate}`] : []),
    'Apply the character template from extracted features (hair, face shape, glasses, accessories, skin/eye tone).',
    ...style.strictRules,
  ]
}

export type ThemeOutfitSet = {
  themeId: string
  outfits: { name: string; description: string; color: string }[]
}

// 테마별 4벌 아웃핏 정의 (스타일 무관하게 공통, 스타일 tone이 렌더링 차이를 만듦)
export const THEME_OUTFITS: Record<string, ThemeOutfitSet> = {
  casual: {
    themeId: 'casual',
    outfits: [
      { name: '데님 캐주얼', description: 'denim overall dress over striped tee, canvas sneakers, mini backpack', color: 'blue denim, red/white stripes, white sneakers' },
      { name: '후디 데일리', description: 'oversized hoodie with front pocket, jogger pants, chunky sneakers, cap', color: 'heather gray hoodie, black joggers, white sneakers, navy cap' },
      { name: '니트 데이트', description: 'cable-knit cardigan over floral blouse, pleated mini skirt, loafers, crossbody bag', color: 'cream cardigan, pink floral blouse, navy skirt, brown loafers' },
      { name: '스포츠 믹스', description: 'crop zip-up track jacket, tennis skirt, high-top sneakers, sporty headband', color: 'white jacket with pink stripes, pink skirt, white/pink sneakers' },
    ],
  },
  princess: {
    themeId: 'princess',
    outfits: [
      { name: '로즈 프린세스', description: 'layered ball gown with rose embroidery, puff sleeves, crystal tiara, glass heels', color: 'pink-to-magenta gown, silver tiara, crystal heels' },
      { name: '스노우 퀸', description: 'icy blue A-line gown with snowflake lace overlay, fur-trimmed cape, ice crystal crown', color: 'ice blue gown, white fur cape, silver crown' },
      { name: '스타 프린세스', description: 'midnight navy gown with star sequin scatter, moon-shaped clutch, star tiara, satin gloves', color: 'navy gown with gold stars, gold tiara, white gloves' },
      { name: '가든 프린세스', description: 'pastel green gown with daisy trim, flower crown, ribbon sash, embroidered flats', color: 'pastel green gown, white/yellow flower crown, cream sash' },
    ],
  },
  hanbok: {
    themeId: 'hanbok',
    outfits: [
      { name: '전통 한복', description: 'classic jeogori with goreum tie, full chima with waistband, binyeo hairpin, kkotsin shoes', color: 'coral jeogori, indigo chima, jade binyeo' },
      { name: '생활 한복', description: 'modernized short jeogori, contemporary chima with pockets, simple hair ribbon, flat shoes', color: 'sage green jeogori, dusty pink chima, white shoes' },
      { name: '명절 한복', description: 'embroidered ceremonial jeogori, layered silk chima, ornate norigae pendant, traditional headpiece', color: 'ruby red jeogori with gold embroidery, deep blue chima' },
      { name: '퓨전 한복', description: 'hanbok-inspired one-piece dress, wide modern belt, contemporary shoes, minimalist hairpin', color: 'lavender dress with white belt, cream shoes' },
    ],
  },
  adventurer: {
    themeId: 'adventurer',
    outfits: [
      { name: '정글 탐험', description: 'safari vest with pockets, cargo shorts, hiking boots, wide-brim hat, binoculars', color: 'olive vest, tan shorts, brown boots, khaki hat' },
      { name: '우주 탐험', description: 'space suit with patches, glossy boots, helmet accessory, mission badge', color: 'white suit with blue patches, silver boots' },
      { name: '바다 탐험', description: 'striped sailor top, shorts, rain boots, captain hat, telescope accessory', color: 'navy/white stripes, yellow rain boots, white captain hat' },
      { name: '산악 탐험', description: 'puffer vest, leggings, trail sneakers, beanie, hiking pole accessory', color: 'red puffer, black leggings, gray sneakers, blue beanie' },
    ],
  },
  ballet: {
    themeId: 'ballet',
    outfits: [
      { name: '클래식 발레', description: 'classical tutu with layered tulle, fitted bodice, pointe shoes with ribbons, tiara', color: 'ballet pink tutu, satin pink pointe shoes, silver tiara' },
      { name: '모던 발레', description: 'contemporary leotard with mesh panel, flowing wrap skirt, split-sole shoes, hair ribbon', color: 'dusty rose leotard, white wrap skirt, nude shoes' },
      { name: '백조의 호수', description: 'white feathered tutu, crystal bodice, white pointe shoes, swan crown headpiece', color: 'pure white tutu with silver crystals, white shoes, silver crown' },
      { name: '쿠키 발레', description: 'playful tutu with candy pattern, colorful bodice, decorated pointe shoes, star hairpin', color: 'pastel rainbow tutu, pink bodice, multicolor shoes' },
    ],
  },
  school: {
    themeId: 'school',
    outfits: [
      { name: '세일러 교복', description: 'sailor collar blouse, pleated skirt, knee socks, loafers, school bag', color: 'white blouse with navy collar, navy skirt, white socks' },
      { name: '블레이저 교복', description: 'school blazer with crest, white shirt, plaid skirt, mary-janes, tie', color: 'navy blazer, white shirt, red plaid skirt, black shoes' },
      { name: '체육복', description: 'school gym t-shirt, track shorts, sneakers, gym bag, headband', color: 'white tee with blue lines, navy shorts, white sneakers' },
      { name: '졸업식', description: 'formal dress shirt, bow tie, cardigan, dress shoes, diploma roll accessory', color: 'white shirt, navy cardigan, black bow tie, black shoes' },
    ],
  },
  summer: {
    themeId: 'summer',
    outfits: [
      { name: '비치룩', description: 'ruffled sundress, straw sun hat, sandals, beach bag, sunglasses accessory', color: 'yellow sundress, straw hat with blue ribbon, tan sandals' },
      { name: '아이스크림', description: 'pastel crop top, denim shorts, platform sandals, ice cream cone bag', color: 'mint top, light denim shorts, white sandals, pink bag' },
      { name: '하와이안', description: 'tropical print shirt-dress, flower lei, flip-flops, ukulele accessory', color: 'red/green tropical print, pink lei, white flip-flops' },
      { name: '수영복', description: 'one-piece swimsuit with star pattern, swim cap, goggles on head, pool float accessory', color: 'sky blue swimsuit with white stars, pink cap, yellow float' },
    ],
  },
  night: {
    themeId: 'night',
    outfits: [
      { name: '문라이트', description: 'velvet midi dress, sheer shawl, low heels, crescent moon clutch', color: 'deep navy dress, silver shawl, gold crescent clutch' },
      { name: '파자마 파티', description: 'star-print pajama set, fluffy slippers, sleep mask on head, pillow accessory', color: 'lavender pajamas with gold stars, white slippers' },
      { name: '할로윈', description: 'witch dress with layered hem, pointed hat, striped socks, broom accessory', color: 'purple/black dress, black hat with orange band, orange/black socks' },
      { name: '크리스마스', description: 'santa-inspired dress with fur trim, boots, santa hat, gift box accessory', color: 'red dress with white fur, black boots, red/white hat' },
    ],
  },
}

export function buildCharacterPrompt(
  featuresText: string,
  style: StyleModule,
  options: { ratioOverride?: string; extraDetail?: string; lineArtOnly?: boolean } = {}
) {
  const lineArtDirective = options.lineArtOnly
    ? `\nRENDERING MODE — COLORING BOOK (OVERRIDE ALL COLOR INSTRUCTIONS):
- Output must be BLACK LINES ON WHITE BACKGROUND ONLY.
- ZERO color fills, ZERO gray, ZERO shading, ZERO gradients.
- Every area must be an enclosed white region bounded by black lines, ready to be colored by hand.
- If the style mentions colors or saturated tones, IGNORE those for this render — convert everything to black outlines only.
- This is a printable coloring page.`
    : ''

  return `Create a single character reference illustration. This will be the BASE DOLL for a paper doll set.

CHARACTER IDENTITY (MUST MATCH EVERY DETAIL BELOW):
${featuresText}

${FACE_REFERENCE_GUIDE}

CRITICAL — PERSONAL FEATURES REPRODUCTION RULES:
- HAIR: Reproduce the EXACT hair length, style, color, and bangs described above. Short hair stays short. Long hair stays long. Curly stays curly. Do NOT default to generic long wavy hair.
- GLASSES (CRITICAL): If the description says glasses = "null", "없음", "unknown", or does NOT mention glasses → the character MUST NOT wear glasses. Do NOT invent glasses. Only add glasses if the description explicitly states a glasses style (e.g. "둥근 금테 안경").
- FACE: Age, face shape, eye style, skin tone must match the description. A 7-year-old looks 7, not 15.
- ACCESSORIES: Reproduce any mentioned accessories (earrings, hairpin, headband, etc.) faithfully.
- The face must be PRETTY/CUTE following the face reference guide, but personal features (hair, glasses, accessories) always take priority over style defaults.
- These features MUST be consistent across ALL style variations — the character must be recognizable as the same person.

STYLE: ${style.tone}
TARGET PROPORTION: ${options.ratioOverride || style.ratio}
${lineArtDirective}

RULES:
${composeRules(style).map((r) => `- ${r}`).join('\n')}
${options.extraDetail ? `\nEXTRA CONSTRAINTS: ${options.extraDetail}` : ''}

OUTPUT: Full-body character, front-facing, standing upright on pure white background, arms slightly away from body. Wearing simple white tank top and white shorts (base outfit for paper doll). Single character only.`
}

export function buildPaperDollPrompt(
  style: StyleModule,
  options: {
    lineArtOnly?: boolean
    ratioOverride?: string
    extraDetail?: string
    themeOutfits?: ThemeOutfitSet
  } = {}
) {
  // 테마가 지정되면 테마 아웃핏 사용, 아니면 스타일 기본 아웃핏
  const outfits = options.themeOutfits
    ? options.themeOutfits.outfits
    : style.outfits

  const lineArtDirective = options.lineArtOnly
    ? `RENDERING MODE — COLORING BOOK (OVERRIDE ALL COLOR INSTRUCTIONS):
- ALL elements must be BLACK LINES ON WHITE BACKGROUND ONLY.
- ZERO color fills, ZERO gray tone, ZERO shading, ZERO gradients anywhere on the sheet.
- Every area is an enclosed white region bounded by black lines, ready to be hand-colored.
- If the style mentions colors, saturated tones, or specific color palettes, IGNORE them — this is a pure black & white coloring page.
- Pixel styles: keep pixel grid structure but in black & white only.
- Pastel styles: keep soft line character but in black lines only.
- All styles: maintain the structural/shape identity of the style but remove ALL color.`
    : 'Use line art with clean silhouettes and print-safe detail.'

  return `Create a high-quality paper doll printable sheet in A4 format.

STYLE: ${style.tone}
PROPORTION: ${options.ratioOverride || style.ratio}

${FACE_REFERENCE_GUIDE}

LAYOUT — TWO SECTIONS ON ONE SHEET:

TOP CENTER — BASE CHARACTER (MANDATORY):
- The character in BASE OUTFIT (white tank top + white shorts), standing front-facing, arms slightly away.
- Dashed cutting line around the character.
- This base doll MUST be present — it is the foundation that outfits overlay onto.
- The base character's hair, glasses, face, and accessories must EXACTLY match the reference character image provided. Do NOT change hairstyle or remove/add glasses.

BOTTOM — 4 OUTFIT SETS in 2×2 grid:
- Each outfit is a separate overlay piece with dashed cut lines around it.
- Each outfit includes matching shoes/accessories as separate detachable pieces.
${outfits.map((o, idx) => `${idx + 1}) ${o.name} — ${o.description}`).join('\n')}

Korean label (한글) under each outfit name.

${lineArtDirective}

RULES:
${composeRules(style).map((r) => `- ${r}`).join('\n')}
${options.extraDetail ? `\nEXTRA CONSTRAINTS: ${options.extraDetail}` : ''}
`
}

export function buildColorPrompt(style: StyleModule, options: { colorPreset?: 'soft' | 'balanced' | 'bold'; extraDetail?: string } = {}) {
  const strength = {
    soft: 'Apply soft, smooth tones with subtle shadows. Keep saturation low and edges gentle.',
    balanced: 'Apply vibrant and balanced colors with mild shading. Clear color separation.',
    bold: 'Apply saturated colors with clear contrast and expressive highlights. Rich and punchy.',
  }[options.colorPreset || 'balanced']

  return `Take this exact black-and-white paper doll sheet and color it.

Style reminder: ${style.tone}

Rules:
- Keep character identity and all outlines exactly the same.
- Keep pose, outfit boundaries, dashed cut lines, and panel structure unchanged.
- Reuse the exact layout and spacing.
- Apply this color direction per outfit:
${style.outfits.map((o) => `  - ${o.name}: ${o.color}`).join('\n')}

${strength}
No new design changes.${options.extraDetail ? `\n${options.extraDetail}` : ''}`
}
