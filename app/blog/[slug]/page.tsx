import { fetchPostBySlug } from '@/sanity/lib/utils'
import PostPage from '@/components/blog/post'
import { Post } from '@/sanity.types'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const post: Post = await fetchPostBySlug((await params).slug)
  return <PostPage post={post} />
}
