export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  body,
  publishedAt
}`

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`