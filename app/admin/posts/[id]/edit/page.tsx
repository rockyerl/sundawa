import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PostForm from '../../PostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        redirect('/admin')
    }

    return <PostForm post={data} />
}
