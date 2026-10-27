import { redirect } from 'next/navigation'
import PortfolioForm from '../../PortfolioForm'

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/portfolio?id=eq.${id}`, {
        headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        redirect('/admin/portfolio')
    }

    const [project] = await res.json()
    if (!project) {
        redirect('/admin/portfolio')
    }

    return <PortfolioForm project={project} />
}
