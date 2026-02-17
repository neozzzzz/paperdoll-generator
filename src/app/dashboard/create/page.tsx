'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { jsPDF } from 'jspdf'

type Features = {
  gender: string; age: string; hair_style: string; face_shape: string;
  eyes: string; glasses: string | null; body_type: string;
  accessories: string; distinctive: string; summary: string;
}

type StyleResult = {
  coloringUrl: string
  colorUrl: string | null
}

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [features, setFeatures] = useState<Features | null>(null)
  const [featureText, setFeatureText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [characterUrl, setCharacterUrl] = useState<string | null>(null)
  const [characterBase64, setCharacterBase64] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState(0)

  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState('')
  const [results, setResults] = useState<Record<string, StyleResult>>({})
  const [activeTab, setActiveTab] = useState('sd')
  const [viewMode, setViewMode] = useState<'coloring' | 'color'>('color')

  const [isDragging, setIsDragging] = useState(false)

  // 공통 파일 처리
  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append('photo', file)
      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.features) {
        setFeatures(data.features)
        setFeatureText(data.features.summary)
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      alert('사진 분석 실패: ' + (err.message || '다시 시도해주세요'))
    } finally {
      setAnalyzing(false)
    }
  }

  // 파일 선택
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  // 드래그 앤 드롭
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  // 붙여넣기 (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) processFile(file)
          break
        }
      }
    }
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  // Step 2+3+4: 전체 생성 파이프라인
  const handleGenerate = async () => {
    if (!featureText.trim() && !features) return alert('사진을 먼저 업로드해주세요!')
    setGenerating(true)
    setStep(2)
    const ts = Date.now()
    setTimestamp(ts)

    const featureData = features || { summary: featureText } as Features

    try {
      // Step 2: 기본 캐릭터 일러스트
      setProgress('🎨 캐릭터를 그리는 중... (1/7)')
      const charRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'character', features: featureData, timestamp: ts }),
      })
      const charData = await charRes.json()
      if (!charRes.ok) throw new Error(charData.error)
      setCharacterUrl(charData.characterUrl)
      setCharacterBase64(charData.characterBase64)

      // Step 3+4: 3가지 스타일 순차 생성
      const styles = ['sd', 'simple', 'fashion']
      const styleNames = ['SD 귀여운', '심플 일러스트', '패션 일러스트']
      const newResults: Record<string, StyleResult> = {}

      for (let i = 0; i < styles.length; i++) {
        const style = styles[i]

        // 흑백 도안
        setProgress(`✏️ ${styleNames[i]} 도안 생성 중... (${2 + i * 2}/7)`)
        const dollRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            step: 'paperdoll', style, characterBase64: charData.characterBase64,
            features: featureData, timestamp: ts,
          }),
        })
        const dollData = await dollRes.json()
        if (!dollRes.ok) throw new Error(dollData.error)

        // 컬러 버전
        setProgress(`🎨 ${styleNames[i]} 컬러링 중... (${3 + i * 2}/7)`)
        const colorRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            step: 'color', style, coloringBase64: dollData.coloringBase64,
            timestamp: ts,
          }),
        })
        const colorData = await colorRes.json()

        newResults[style] = {
          coloringUrl: dollData.coloringUrl,
          colorUrl: colorRes.ok ? colorData.colorUrl : null,
        }
        setResults({ ...newResults })
      }

      // 이력 저장
      fetch('/api/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          features: featureData.summary || featureText,
          style: 'all',
          coloringUrl: newResults.simple?.coloringUrl,
          colorUrl: newResults.simple?.colorUrl,
        }),
      }).catch(() => {})

      setStep(3)
    } catch (err: any) {
      alert('생성 실패: ' + (err.message || '다시 시도해주세요'))
      setStep(1)
    } finally {
      setGenerating(false)
      setProgress('')
    }
  }

  const downloadPDF = async (imageUrl: string, filename: string) => {
    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const imgData = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const img = new Image()
      img.src = imgData
      await new Promise((resolve) => { img.onload = resolve })
      const ratio = Math.min(190 / img.width, 277 / img.height)
      const w = img.width * ratio, h = img.height * ratio
      pdf.addImage(imgData, 'PNG', (210 - w) / 2, (297 - h) / 2, w, h)
      pdf.save(`${filename}.pdf`)
    } catch { alert('PDF 생성 실패') }
  }

  const STYLES = [
    { id: 'sd', name: '🧸 SD 귀여운', desc: '2등신' },
    { id: 'simple', name: '✏️ 심플', desc: '4등신' },
    { id: 'fashion', name: '👗 패션', desc: '6등신' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* 프로그레스 바 */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['사진 업로드', '생성 중', '완성!'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${
                  step > i ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>{i + 1}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
              {i < 2 && <div className={`w-8 h-1 rounded ${step > i + 1 ? 'bg-pink-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: 사진 업로드 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">📸 사진 업로드</h2>

            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer mb-6 ${
                isDragging ? 'border-pink-500 bg-pink-50 scale-[1.02]' : 'border-pink-200 hover:border-pink-400'
              }`}
              onClick={() => document.getElementById('photo-input')?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {photoPreview ? (
                <div>
                  <img src={photoPreview} alt="업로드됨" className="max-h-56 mx-auto rounded-lg" />
                  {analyzing && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-pink-500">
                      <div className="animate-spin text-lg">🔍</div>
                      <span className="text-sm font-medium">AI가 특징을 분석하는 중...</span>
                    </div>
                  )}
                  {!analyzing && features && (
                    <p className="mt-4 text-sm text-green-600 font-medium">✅ 특징 분석 완료!</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="text-5xl mb-3">{isDragging ? '📥' : '📷'}</div>
                  <p className="text-gray-600 font-medium text-lg">
                    {isDragging ? '여기에 놓으세요!' : '사진을 올려주세요'}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">클릭, 드래그 앤 드롭, 또는 Ctrl+V 붙여넣기</p>
                  <p className="text-xs text-gray-300 mt-1">정면 전신 사진이 가장 좋아요 · 사진은 서버에 저장되지 않습니다</p>
                </>
              )}
              <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>

            {features && (
              <div className="bg-pink-50 rounded-xl p-4 mb-6">
                <div className="text-sm font-medium text-pink-600 mb-2">🔍 AI 분석 결과</div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>👤 {features.gender}, {features.age}</div>
                  <div>💇 {features.hair_style}</div>
                  <div>😊 {features.face_shape}</div>
                  {features.glasses && <div>👓 {features.glasses}</div>}
                  {features.accessories && <div>💍 {features.accessories}</div>}
                </div>
                <textarea
                  value={featureText}
                  onChange={(e) => setFeatureText(e.target.value)}
                  className="w-full mt-3 p-3 border border-pink-200 rounded-lg text-sm resize-none h-20 focus:outline-none focus:border-pink-400"
                  placeholder="분석 결과를 수정할 수 있어요"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={analyzing || (!features && !featureText.trim())}
              className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                analyzing || (!features && !featureText.trim())
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg'
              }`}
            >
              {analyzing ? '분석 중...' : '✨ 3가지 스타일 도안 만들기!'}
            </button>
          </div>
        )}

        {/* Step 2: 생성 중 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="animate-pulse">
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="text-xl font-bold mb-2">도안을 만들고 있어요!</h2>
              <p className="text-gray-600 mb-6">{progress}</p>

              {/* 프로그레스 바 */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(Object.keys(results).length / 3) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">3가지 스타일 × (흑백 + 컬러) = 총 7단계</p>

              {/* 생성된 것부터 미리보기 */}
              {characterUrl && (
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">기본 캐릭터</p>
                  <img src={characterUrl} alt="캐릭터" className="max-h-40 mx-auto rounded-lg" />
                </div>
              )}

              {Object.keys(results).length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {STYLES.map((s) => (
                    <div key={s.id} className={`rounded-lg p-2 ${results[s.id] ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="text-xs font-medium mb-1">{s.name}</div>
                      {results[s.id] ? (
                        <img src={results[s.id].colorUrl || results[s.id].coloringUrl} alt={s.name} className="w-full rounded" />
                      ) : (
                        <div className="aspect-[3/4] bg-gray-100 rounded flex items-center justify-center text-gray-300">⏳</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: 결과 */}
        {step === 3 && Object.keys(results).length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">✂️ 도안 완성!</h2>

            {/* 스타일 탭 */}
            <div className="flex justify-center gap-2 mb-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === s.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* 컬러/흑백 토글 */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setViewMode('color')}
                className={`px-5 py-1.5 rounded-full text-sm transition ${
                  viewMode === 'color' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >🎨 컬러</button>
              <button
                onClick={() => setViewMode('coloring')}
                className={`px-5 py-1.5 rounded-full text-sm transition ${
                  viewMode === 'coloring' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >✏️ 컬러링북</button>
            </div>

            {/* 이미지 */}
            {results[activeTab] && (
              <>
                <div className="border rounded-xl overflow-hidden mb-6">
                  <img
                    src={viewMode === 'color' && results[activeTab].colorUrl
                      ? results[activeTab].colorUrl!
                      : results[activeTab].coloringUrl}
                    alt="도안"
                    className="w-full"
                  />
                </div>

                {/* 다운로드 */}
                <div className="grid grid-cols-2 gap-3">
                  <a href={results[activeTab].coloringUrl} download={`도안-${activeTab}-흑백.png`}
                    className="py-3 text-center border-2 border-gray-700 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition text-sm">
                    ✏️ 흑백 PNG
                  </a>
                  {results[activeTab].colorUrl && (
                    <a href={results[activeTab].colorUrl!} download={`도안-${activeTab}-컬러.png`}
                      className="py-3 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition text-sm">
                      🎨 컬러 PNG
                    </a>
                  )}
                  <button onClick={() => downloadPDF(results[activeTab].coloringUrl, `도안-${activeTab}-흑백`)}
                    className="py-3 text-center border-2 border-gray-500 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition text-sm">
                    📄 흑백 PDF
                  </button>
                  {results[activeTab].colorUrl && (
                    <button onClick={() => downloadPDF(results[activeTab].colorUrl!, `도안-${activeTab}-컬러`)}
                      className="py-3 text-center border-2 border-purple-500 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition text-sm">
                      📄 컬러 PDF
                    </button>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => { setStep(1); setResults({}); setFeatures(null); setFeatureText(''); setPhoto(null); setPhotoPreview(null); setCharacterUrl(null) }}
              className="w-full mt-4 py-3 text-gray-500 hover:text-pink-500 transition"
            >
              ← 새로 만들기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
