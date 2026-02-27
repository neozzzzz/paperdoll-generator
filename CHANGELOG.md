# CHANGELOG — PAPERDOLLY

## [0.3.0] - 2026-02-21 16:45
### Changed
- 타이틀/서브타이틀 위계 조정

## [0.2.0] - 2026-02-18 15:00
### Changed
- 모노라인·네오누아르 스타일 삭제 (6종 유지)
- 스타일별 fixedProportion 고정 상수 도입

### Fixed
- 프리뷰 v4 — 도안 순수 흑백, 패션 5등신, 포즈 통일, 픽셀 강화
- 샘플 프리뷰 16장 등신 비율 재조정 (v2 포함)
- 케이퍼키치 컬러 비율 수정 + 픽셀키키 재생성

### Added
- 생성 히스토리 기능
- 안경 프롬프트 강화
- 스타일 선택 도안/컬러 탭 + 컬러 프리뷰 8종

## [0.1.0] - 2026-02-15 14:00
### Added
- 초기 프로젝트 세팅 (Next.js + Supabase + Google GenAI)
- 데모 페이지 + 8개 스타일 프리뷰 생성
- 대시보드 (`/dashboard`, `/dashboard/create`)
- 갤러리 (`/gallery`)
- 로그인 (`/login`) — Supabase Auth
- 드래그앤드롭/붙여넣기 이미지 업로드

### Fixed
- create page 순환참조 수정
- Turbopack 비활성화 (빌드 행 이슈)
