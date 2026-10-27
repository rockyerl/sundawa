-- Portfolio table migration for Supabase
-- Run this in Supabase Studio → SQL Editor

CREATE TABLE IF NOT EXISTS portfolio (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    num text NOT NULL,
    name text NOT NULL,
    initials text NOT NULL,
    type text NOT NULL,
    desc text NOT NULL,
    confidential boolean DEFAULT false,
    challenge text NOT NULL,
    architecture text NOT NULL,
    role text NOT NULL,
    impact text NOT NULL,
    main_image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_portfolio_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_updated_at_column();

-- Disable RLS for admin panel access (same as posts)
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
