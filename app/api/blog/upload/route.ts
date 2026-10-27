import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop() || 'png'
    const fileName = `${randomUUID()}.${fileExt}`

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const { error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, uint8Array, {
            contentType: file.type,
            upsert: true,
        })

    if (error) {
        console.error('[upload] Storage error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl })
}
