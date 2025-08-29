'use client'

import Navbar from '@/components/home/navbar'
import { useEffect, useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import { Post as PostType } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import moment from 'moment'
import { PortableText } from 'next-sanity'

export default function PostPage({ post }: { post: PostType }) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex pt-16">
        <main
          className={`flex-1 px-4 py-8 transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <section className="container px-16 sm:px-32 mx-auto max-w-[88rem]">
            <div className="pt-10">
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage!).toString()}
                  alt={post.title + ''}
                  width={1920}
                  height={1080}
                  className="h-[30rem] object-cover rounded-lg sm:rounded-xl"
                />
              )}
              <h1 className="text-xl md:text-4xl font-bold mt-10">
                {post.title}
              </h1>
              <p className="text-gray-500 mt-2">
                Published on: {moment(post.publishedAt).format('MMM D, YYYY')}
              </p>
              <div className="mt-10 flex flex-col md:flex-row gap-10">
                <article className="prose prose-invert prose-custom  max-w-full []">
                  <PortableText
                    // @ts-expect-error - TODO: fix this
                    value={post.body}
                    components={{
                      types: {
                        normal: ({ value }) => (
                          <p className="text-slate-400">{value}</p>
                        ),
                        p: ({ value }) => (
                          <p className="text-slate-400">{value}</p>
                        ),
                        image: ({ value }) => (
                          <img
                            className="w-full"
                            src={urlFor(value).toString()}
                          />
                        ),
                      },
                    }}
                  />
                </article>
              </div>
            </div>
          </section>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}
