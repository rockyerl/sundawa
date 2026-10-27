-- Rename body_mdx to body_html
ALTER TABLE posts RENAME COLUMN body_mdx TO body_html;

-- Update any indexes if they exist
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);

-- Disable RLS on posts table (for admin panel CRUD)
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- Create blog-images storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to blog-images bucket
CREATE POLICY "Allow public read access to blog-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'blog-images');

CREATE POLICY "Allow anon upload to blog-images"
    ON storage.objects FOR ALL
    TO anon
    USING (bucket_id = 'blog-images')
    WITH CHECK (bucket_id = 'blog-images');
