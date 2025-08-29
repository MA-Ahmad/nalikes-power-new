import { Metadata } from 'next'
import { fetchPosts, fetchTotalPostsCount } from '@/sanity/lib/utils'
import { generatePageMetadata } from '@/utils/metadata'
import Blog from '@/components/blog'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog',
  description: 'Explore Web3 related articles and tutorials.',
  path: '/blog',
})

const POSTS_PER_PAGE = 10

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const page = parseInt((await searchParams).page || '1') || 1
  const offset = (page - 1) * POSTS_PER_PAGE

  const totalPosts = await fetchTotalPostsCount()
  const latestPosts = await fetchPosts({
    orderCondition: 'publishedAt desc',
    limit: POSTS_PER_PAGE,
    offset,
  })

  return (
    <Blog
      initialposts={latestPosts}
      totalPosts={totalPosts}
      currentPage={page}
    />
  )
}
