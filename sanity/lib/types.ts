import { Category, Post, Author } from '@/sanity.types'

// Extended types that represent resolved reference data
export interface ResolvedAuthor {
  name: string
  image?: any // Sanity image object
  slug: {
    current: string
  }
  bio?: string
}

export interface ResolvedCategory {
  title: string
  slug: {
    current: string
  }
  description?: string
}

// Extended Post type with resolved references
export interface ResolvedPost
  extends Omit<Post, 'author' | 'category' | 'categories'> {
  author?: ResolvedAuthor
  category?: ResolvedCategory
  categories?: ResolvedCategory[]
}

// You can also create a utility type for partially resolved posts
export interface PartiallyResolvedPost
  extends Omit<Post, 'author' | 'categories'> {
  author?: ResolvedAuthor | Post['author'] // Can be either resolved or reference
  categories?: ResolvedCategory[] | Post['categories']
}

// Updated utils functions with proper typing
import { client } from './client'

interface FetchPostsOptions {
  filterCondition?: string
  orderCondition?: string
  limit?: number
  offset?: number
}

export const fetchTotalPostsCount = async (): Promise<number> => {
  return await client.fetch(`count(*[_type == "post"])`)
}

export const fetchPosts = async ({
  filterCondition = '',
  orderCondition = '',
  limit = 0,
  offset = 0,
}: FetchPostsOptions): Promise<ResolvedPost[]> => {
  let query = '*[_type == "post"'
  if (filterCondition) query += ` ${filterCondition}`
  query += ']'
  if (orderCondition) query += `|order(${orderCondition})`
  if (limit !== undefined && limit > 0)
    query += `[${offset}...${offset + limit}]`
  query += `{
    title, body, slug, mainImage, publishedAt, category->{title, slug, description}, author->{name, image, slug, bio}
  }`
  return await client.fetch(query)
}

export const fetchPostBySlug = async (slug: string): Promise<ResolvedPost> => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,title, body, slug, mainImage, publishedAt, category->{title, slug, description}, author->{name, image, slug, bio}
    }`,
    { slug }
  )
}

export const fetchCategories = async (): Promise<Category[]> => {
  return await client.fetch('*[_type == "category"]{title, slug, description}')
}

export const excerptFromBody = (body: ResolvedPost['body']): string => {
  if (!body) return ''
  const firstParagraph = body.find((block) => block._type === 'block')
  if (!firstParagraph || !firstParagraph.children) return ''
  return firstParagraph?.children[0].text || ''
}
