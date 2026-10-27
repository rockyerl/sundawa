import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - List all posts
export async function GET() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
}

// POST - Create a new post
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { title, slug, excerpt, body_html, main_image_url, published_at } = body

    const { data, error } = await supabase
        .from('posts')
        .insert({
            title,
            slug,
            excerpt: excerpt || null,
            body_html,
            main_image_url: main_image_url || null,
            published_at: published_at || null,
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// PUT - Update an existing post
export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const body = await request.json()
    const { title, slug, excerpt, body_html, main_image_url, published_at } = body

    const { data, error } = await supabase
        .from('posts')
        .update({
            title,
            slug,
            excerpt: excerpt || null,
            body_html,
            main_image_url: main_image_url || null,
            published_at: published_at || null,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// DELETE - Delete a post
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
