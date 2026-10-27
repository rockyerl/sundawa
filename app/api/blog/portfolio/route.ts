import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isPortfolioProject } from '@/lib/types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const per_page = Math.min(50, Math.max(1, parseInt(searchParams.get('per_page') || '10')))
    const from = (page - 1) * per_page
    const to = from + per_page - 1

    // Get total count first
    const { count } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact', head: true })

    const { data, error } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('[api] failed to fetch portfolio:', error)
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
    }

    const filtered = (data ?? []).filter(isPortfolioProject)

    return NextResponse.json({
        data: filtered,
        pagination: {
            page,
            per_page,
            total: count ?? 0,
            total_pages: Math.ceil((count ?? 0) / per_page),
        },
    })
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, slug, num, initials, type, desc, confidential, challenge, architecture, role, impact, main_image_url } = body

        if (!name || !slug || !type || !desc || !challenge || !architecture || !role || !impact) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        console.log('[api] creating portfolio:', { name, slug, num })

        const { data, error } = await supabase
            .from('portfolio')
            .insert({
                name,
                slug,
                num: num ?? '',
                initials: initials ?? name.slice(0, 2).toUpperCase(),
                type,
                desc,
                confidential: confidential ?? false,
                challenge,
                architecture,
                role,
                impact,
                main_image_url: main_image_url ?? null,
            })
            .select()
            .single()

        if (error) {
            console.error('[api] failed to create portfolio:', error)
            // Check for duplicate slug
            if (error.code === '23505') {
                return NextResponse.json({ error: 'Slug already exists, please use a different slug' }, { status: 409 })
            }
            return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 })
        }

        console.log('[api] portfolio created successfully:', data.id)
        return NextResponse.json(data)
    } catch (err) {
        console.error('[api] POST portfolio unexpected error:', err)
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        }

        const body = await request.json()
        const { name, slug, num, initials, type, desc, confidential, challenge, architecture, role, impact, main_image_url } = body

        // Check if record exists before updating
        const { data: existing, error: fetchError } = await supabase
            .from('portfolio')
            .select('id')
            .eq('id', id)
            .single()

        if (fetchError || !existing) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        const { data, error } = await supabase
            .from('portfolio')
            .update({
                name,
                slug,
                num,
                initials,
                type,
                desc,
                confidential,
                challenge,
                architecture,
                role,
                impact,
                main_image_url,
            })
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('[api] failed to update portfolio:', error)
            return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    console.log('[api] deleting portfolio:', id)

    const { data, error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id)
        .select()

    if (error) {
        console.error('[api] failed to delete portfolio:', error)
        return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 })
    }

    console.log('[api] portfolio deleted successfully:', id, 'deleted rows:', data?.length ?? 0)
    return NextResponse.json({ success: true })
}
