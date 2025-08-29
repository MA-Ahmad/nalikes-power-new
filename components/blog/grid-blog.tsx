import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { excerptFromBody } from '@/sanity/lib/utils'

import { cn, formatDate } from '@/lib/utils'
import { ResolvedPost } from '@/sanity/lib/types'

const GridBlogPost = ({ post }: { post: ResolvedPost }) => (
  <Link
    href={`/blog/${post.slug?.current}`}
    className={cn(
      `rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden 
       transition-all duration-300 flex flex-col hover:-translate-y-1 
       shadow-lg shadow-slate/5`
    )}
  >
    <div>
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage!).width(600).height(300).url()!}
          alt={post.mainImage?.alt || ''}
          width={1000}
          height={1000}
          className="object-cover h-full min-h-[200px] w-full"
        />
      )}
    </div>
    <div className="p-5 relative flex flex-col flex-1">
      {/* Title fixed to 2 lines */}
      <h2 className="text-xl font-semibold mb-2 line-clamp-2 min-h-[3.5rem] leading-snug">
        {post.title}
      </h2>

      {/* Excerpt also 2 lines */}
      <p className="line-clamp-2 text-gray-400 text-sm sm:text-base min-h-[3.0rem]">
        {excerptFromBody(post.body)}
      </p>

      {/* Push footer to bottom */}
      <div className="flex items-center gap-2 mt-auto pt-6">
        <h3 className="text-sm">{post.author?.name}</h3>
        <p className="text-xs text-gray-400">{formatDate(post.publishedAt!)}</p>
      </div>
    </div>
  </Link>
)

export default GridBlogPost
