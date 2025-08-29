import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { excerptFromBody } from '@/sanity/lib/utils'
import moment from 'moment'

import { cn } from '@/lib/utils'
import { ResolvedPost } from '@/sanity/lib/types'

const ListBlog = ({ post }: { post: ResolvedPost }) => (
  <Link
    href={`/blog/${post.slug?.current}`}
    className={cn(
      `rounded-2xl bg-neutral-950 border border-neutral-800 shadow-md overflow-hidden transition-all duration-300 flex flex-col p-5 hover:-translate-y-1`
    )}
  >
    <div className="flex items-center gap-3">
      <div className="size-10 bg-gray-400 rounded-full">
        <Image
          src={
            post.author?.image
              ? urlFor(post.author.image).width(300).height(300).url()
              : '/user.png'
          }
          alt={post.author?.name || ''}
          width={40}
          height={40}
          className="object-cover rounded-full"
        />
      </div>
      <div>
        <h3 className="text-sm">{post.author?.name}</h3>
        <p className="text-xs text-gray-400 ">
          {moment(post.publishedAt!).fromNow()}
        </p>
      </div>
    </div>
    <div
      className={`flex items-center flex-col sm:flex-row gap-10 mt-4 sm:mt-1`}
    >
      <div>
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        <p className="line-clamp-2 text-gray-400 text-sm sm:text-base">
          {excerptFromBody(post.body)}
        </p>
      </div>
      <div>
        <Image
          src={urlFor(post.mainImage!).width(300).height(200).url()!}
          alt={post.mainImage?.alt || ''}
          width={300}
          height={150}
          className="object-cover h-full min-w-[200px] w-full rounded-xl"
        />
      </div>
    </div>
  </Link>
)

export default ListBlog
