-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS generations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  features text NOT NULL,
  style text NOT NULL DEFAULT 'simple',
  coloring_url text,
  color_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS 활성화
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- 본인 데이터만 읽기
CREATE POLICY "users can read own generations" ON generations
  FOR SELECT USING (auth.uid() = user_id);

-- 본인만 생성
CREATE POLICY "users can insert own generations" ON generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 인덱스
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_created_at ON generations(created_at DESC);
