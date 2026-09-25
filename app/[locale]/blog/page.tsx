import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/Queries'
import type { Post } from '@/lib/types'

export default async function BlogPage() {
    const posts: Post[] = await client.fetch(postsQuery)
    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>{post.title}</div>
            ))}
        </div>
    )
}