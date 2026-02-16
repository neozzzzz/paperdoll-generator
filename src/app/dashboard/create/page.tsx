'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { jsPDF } from 'jspdf'

const STYLES = [
  { id: 'sd', name: 'SD 귀여운', desc: '2등신 · 큰 머리 · 초귀여운', emoji: '🧸' },
  { id: 'simple', name: '심플 일러스트', desc: '4등신 · 깔끔 · 귀여운', emoji: '✏️' },
  { id: 'fashion', name: '패션 일러스트', desc: '6등신 · 세밀 · 우아한', emoji: '👗' },
]

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [style, setStyle] = useState('simple')
  const [features, setFeatures] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [result, setResult] = useState<{ coloringUrl: string; colorUrl: string | null } | null>(null)
  const [viewMode, setViewMode] = useState<'coloring' | 'color'>('color')
  const router = useRouter()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
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
      const a4Width = 210
      const a4Height = 297
      
      // 이미지를 A4에 맞게 배치 (여백 10mm)
      const margin = 10
      const maxW = a4Width - margin * 2
      const maxH = a4Height - margin * 2

      const img = new Image()
      img.src = imgData
      await new Promise((resolve) => { img.onload = resolve })

      const ratio = Math.min(maxW / img.width, maxH / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      const x = (a4Width - w) / 2
      const y = (a4Height - h) / 2

      pdf.addImage(imgData, 'PNG', x, y, w, h)
      pdf.save(`${filename}.pdf`)
    } catch {
      alert('PDF 생성에 실패했습니다.')
    }
  }

  const handleGenerate = async () => {
    if (!features.trim()) return alert('캐릭터 특징을 입력해주세요!')
    
    setLoading(true)
    setProgress('✏️ 흑백 도안을 그리는 중... (약 20~30초)')

    try {
      // Step 1: 흑백 도안
      const res1 = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: features.trim(), style, step: 'coloring' }),
      })
      const data1 = await res1.json()
      if (!res1.ok) throw new Error(data1.error)

      setProgress('🎨 컬러 버전을 입히는 중... (약 20~30초)')

      // Step 2: 컬러 버전
      const res2 = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          features: features.trim(), style, step: 'color',
          coloringUrl: data1.coloringUrl, timestamp: data1.timestamp,
        }),
      })
      const data2 = await res2.json()

      const finalResult = {
        coloringUrl: data1.coloringUrl,
        colorUrl: res2.ok ? data2.colorUrl : null,
      }
      setResult(finalResult)

      // 이력 저장
      fetch('/api/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          features: features.trim(), style,
          coloringUrl: finalResult.coloringUrl,
          colorUrl: finalResult.colorUrl,
        }),
      }).catch(() => {}) // 저장 실패해도 무시

      setStep(3)
    } catch (err: any) {
      alert(err.message || '생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
      setProgress('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* 스텝 표시 */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-pink-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: 사진 + 특징 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">📸 캐릭터 정보 입력</h2>
            
            {/* 사진 업로드 (선택) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">참고 사진 (선택)</label>
              <div className="border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center hover:border-pink-400 transition cursor-pointer"
                onClick={() => document.getElementById('photo-input')?.click()}>
                {photoPreview ? (
                  <img src={photoPreview} alt="업로드된 사진" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <>
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-gray-500">사진을 올려주세요 (선택사항)</p>
                    <p className="text-xs text-gray-400 mt-1">사진은 특징 분석 후 즉시 삭제됩니다</p>
                  </>
                )}
                <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>
            </div>

            {/* 캐릭터 특징 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">캐릭터 특징 설명 *</label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="예: 7살 여자아이, 긴 생머리, 동그란 안경, 갸름한 얼굴, 큰 눈, 목걸이"
                className="w-full h-28 p-4 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">머리 스타일, 안경, 체형 등 원하는 특징을 자유롭게 적어주세요</p>
            </div>

            <button
              onClick={() => features.trim() ? setStep(2) : alert('캐릭터 특징을 입력해주세요!')}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition"
            >
              다음 →
            </button>
          </div>
        )}

        {/* Step 2: 스타일 선택 + 생성 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">🎨 스타일 선택</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`p-6 rounded-xl border-2 text-center transition ${
                    style === s.id
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                </button>
              ))}
            </div>

            {/* 입력 내용 확인 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-500 mb-1">입력한 특징:</div>
              <div className="text-gray-700">{features}</div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">🎨</div>
                <p className="text-gray-600 font-medium">{progress}</p>
                <p className="text-sm text-gray-400 mt-2">AI가 열심히 그리는 중...</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 border-2 border-gray-200 rounded-xl font-medium hover:border-pink-300 transition">
                  ← 이전
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition"
                >
                  ✨ 도안 만들기!
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: 결과 */}
        {step === 3 && result && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">✂️ 도안 완성!</h2>

            {/* 컬러/흑백 토글 */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setViewMode('color')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  viewMode === 'color' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                🎨 컬러
              </button>
              <button
                onClick={() => setViewMode('coloring')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  viewMode === 'coloring' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                ✏️ 컬러링북
              </button>
            </div>

            {/* 이미지 */}
            <div className="border rounded-xl overflow-hidden mb-6">
              <img
                src={viewMode === 'color' && result.colorUrl ? result.colorUrl : result.coloringUrl}
                alt="종이인형 도안"
                className="w-full"
              />
            </div>

            {/* 다운로드 버튼 */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={result.coloringUrl}
                download="도안-컬러링북.png"
                className="py-4 text-center border-2 border-gray-800 text-gray-800 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                ✏️ 흑백 PNG
              </a>
              {result.colorUrl && (
                <a
                  href={result.colorUrl}
                  download="도안-컬러.png"
                  className="py-4 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  🎨 컬러 PNG
                </a>
              )}
              <button
                onClick={() => downloadPDF(result.coloringUrl, '도안-컬러링북')}
                className="py-4 text-center border-2 border-gray-600 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                📄 흑백 PDF
              </button>
              {result.colorUrl && (
                <button
                  onClick={() => downloadPDF(result.colorUrl!, '도안-컬러')}
                  className="py-4 text-center border-2 border-purple-500 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition"
                >
                  📄 컬러 PDF
                </button>
              )}
            </div>

            <button
              onClick={() => { setStep(1); setResult(null); setFeatures(''); setPhoto(null); setPhotoPreview(null); }}
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
