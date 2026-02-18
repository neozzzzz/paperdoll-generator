'use client'

import React, { useState, useRef } from 'react'

type OpType = 'add' | 'sub' | 'mixed'

interface RangeConfig {
  min: number
  max: number
}

function generateProblems(
  op: OpType,
  addRange: RangeConfig,
  subRange: RangeConfig,
  count: number
): { a: number; b: number; op: '+' | '-'; answer: number }[] {
  const problems: { a: number; b: number; op: '+' | '-'; answer: number }[] = []
  const maxAttempts = count * 50

  for (let i = 0; i < maxAttempts && problems.length < count; i++) {
    const useAdd = op === 'add' ? true : op === 'sub' ? false : Math.random() > 0.5
    const range = useAdd ? addRange : subRange

    if (useAdd) {
      const answer = range.min + Math.floor(Math.random() * (range.max - range.min + 1))
      const a = Math.floor(Math.random() * (answer + 1))
      const b = answer - a
      if (a >= 0 && b >= 0) {
        problems.push({ a, b, op: '+', answer })
      }
    } else {
      const answer = range.min + Math.floor(Math.random() * (range.max - range.min + 1))
      // a - b = answer → a = answer + b, b >= 1
      const maxB = 99 - answer
      if (maxB < 1) continue
      const b = 1 + Math.floor(Math.random() * Math.min(maxB, 50))
      const a = answer + b
      if (a >= 0 && a <= 999 && b >= 0) {
        problems.push({ a, b, op: '-', answer })
      }
    }
  }

  return problems.slice(0, count)
}

export default function WorksheetPage() {
  const [op, setOp] = useState<OpType>('mixed')
  const [addRange, setAddRange] = useState<RangeConfig>({ min: 1, max: 20 })
  const [subRange, setSubRange] = useState<RangeConfig>({ min: 1, max: 10 })
  const [count, setCount] = useState(20)
  const [cols, setCols] = useState(2)
  const [problems, setProblems] = useState<ReturnType<typeof generateProblems>>([])
  const [showAnswers, setShowAnswers] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    const p = generateProblems(op, addRange, subRange, count)
    setProblems(p)
    setShowAnswers(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const opLabel = op === 'add' ? '더하기' : op === 'sub' ? '빼기' : '더하기/빼기 혼합'

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* 설정 패널 (인쇄 시 숨김) */}
      <div className="print:hidden max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">✏️ 더하기/빼기 결과값 범위</h1>
        <p className="text-center text-gray-400 text-xs mb-8">결과값 범위를 설정하고 학습지를 생성하세요</p>

        {/* 연산 타입 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">연산 유형</label>
          <div className="flex gap-2">
            {([['add', '더하기'], ['sub', '빼기'], ['mixed', '혼합']] as const).map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => setOp(v)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  op === v
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 더하기 결과값 범위 */}
        {(op === 'add' || op === 'mixed') && (
          <div className="mb-5 p-4 bg-white rounded-xl border border-orange-200">
            <h2 className="text-base font-bold text-orange-600 mb-3">➕ 더하기 결과값 범위</h2>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">최소</label>
                <input
                  type="number"
                  min={0}
                  max={999}
                  value={addRange.min}
                  onChange={(e) => setAddRange({ ...addRange, min: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg font-mono"
                />
              </div>
              <span className="text-gray-400 text-lg mt-5">~</span>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">최대</label>
                <input
                  type="number"
                  min={0}
                  max={999}
                  value={addRange.max}
                  onChange={(e) => setAddRange({ ...addRange, max: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg font-mono"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              예: 1~20이면 &quot;3+5=8&quot;, &quot;12+7=19&quot; 등 결과가 1~20 사이
            </p>
          </div>
        )}

        {/* 빼기 결과값 범위 */}
        {(op === 'sub' || op === 'mixed') && (
          <div className="mb-5 p-4 bg-white rounded-xl border border-blue-200">
            <h2 className="text-base font-bold text-blue-600 mb-3">➖ 빼기 결과값 범위</h2>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">최소</label>
                <input
                  type="number"
                  min={0}
                  max={999}
                  value={subRange.min}
                  onChange={(e) => setSubRange({ ...subRange, min: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg font-mono"
                />
              </div>
              <span className="text-gray-400 text-lg mt-5">~</span>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">최대</label>
                <input
                  type="number"
                  min={0}
                  max={999}
                  value={subRange.max}
                  onChange={(e) => setSubRange({ ...subRange, max: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg font-mono"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              예: 1~10이면 &quot;15-8=7&quot;, &quot;9-6=3&quot; 등 결과가 1~10 사이
            </p>
          </div>
        )}

        {/* 문제 수 & 열 */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">문제 수</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            >
              {[10, 15, 20, 30, 40, 50].map((n) => (
                <option key={n} value={n}>{n}문제</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">열 수</label>
            <select
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}열</option>
              ))}
            </select>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg transition shadow-lg"
          >
            📝 학습지 생성
          </button>
          {problems.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm transition"
              >
                {showAnswers ? '정답 숨기기' : '정답 보기'}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm transition"
              >
                🖨 인쇄
              </button>
            </>
          )}
        </div>
      </div>

      {/* 학습지 출력 영역 */}
      {problems.length > 0 && (
        <div ref={printRef} className="max-w-3xl mx-auto px-4 pb-12 print:px-8 print:py-4 print:max-w-none">
          {/* 학습지 헤더 */}
          <div className="text-center mb-6 print:mb-4">
            <h2 className="text-xl font-bold text-gray-800 print:text-2xl">
              {opLabel} 연습 ({addRange.min}~{addRange.max}{op !== 'add' ? ` / ${subRange.min}~${subRange.max}` : ''})
            </h2>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-400 print:text-gray-600">
              <span>이름: ________________</span>
              <span>날짜: ____년 ____월 ____일</span>
              <span>점수: ____/{problems.length}</span>
            </div>
          </div>

          {/* 문제 그리드 */}
          <div
            className="grid gap-y-4 gap-x-6 print:gap-y-3"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {problems.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1 border-b border-gray-100 print:border-gray-300">
                <span className="text-xs text-gray-400 w-6 text-right print:text-gray-500">{idx + 1}.</span>
                <span className="font-mono text-lg flex-1 text-gray-800">
                  {p.a} {p.op} {p.b} ={' '}
                  {showAnswers ? (
                    <span className="text-orange-500 font-bold">{p.answer}</span>
                  ) : (
                    <span className="inline-block w-10 border-b-2 border-gray-300 print:border-gray-400" />
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* 정답지 (인쇄용, 별도 페이지) */}
          <div className="hidden print:block print:break-before-page print:pt-8">
            <h3 className="text-lg font-bold text-center mb-4">📋 정답지</h3>
            <div
              className="grid gap-y-1 gap-x-6"
              style={{ gridTemplateColumns: `repeat(${Math.min(cols + 2, 5)}, 1fr)` }}
            >
              {problems.map((p, idx) => (
                <div key={idx} className="font-mono text-sm text-gray-700">
                  {idx + 1}. {p.a}{p.op}{p.b}=<span className="font-bold">{p.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
