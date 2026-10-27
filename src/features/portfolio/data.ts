import { supabase } from '@/lib/supabase'
import { isPortfolioProject, type PortfolioProject } from '@/lib/types'

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('[portfolio] failed to fetch projects:', error)
        return []
    }

    return (data ?? []).filter(isPortfolioProject)
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error('[portfolio] failed to fetch project by slug:', error)
        return undefined
    }

    return isPortfolioProject(data) ? data : undefined
}
