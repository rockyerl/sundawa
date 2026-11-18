-- Create inquiries table for direct website lead capture
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    source_url TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anon public to submit inquiries
DROP POLICY IF EXISTS "Allow public anon insert inquiries" ON inquiries;
CREATE POLICY "Allow public anon insert inquiries"
    ON inquiries FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow authenticated admins to view inquiries
DROP POLICY IF EXISTS "Allow authenticated read inquiries" ON inquiries;
CREATE POLICY "Allow authenticated read inquiries"
    ON inquiries FOR SELECT
    TO authenticated
    USING (true);
