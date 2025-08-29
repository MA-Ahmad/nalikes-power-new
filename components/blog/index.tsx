'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { POSTS_PER_PAGE } from '@/data'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import moment from 'moment'

import GridBlogPost from './grid-blog'
import ListBlog from './list-blog'
import GridBlogPostSkeleton from './grid-blog-skeleton'
import ListBlogPostSkeleton from './list-blog-skeleton'
import { ResolvedPost } from '@/sanity/lib/types'
import Navbar from '../home/navbar'
import { ChatSidebar } from '../home/chat/chat-sidebar'

interface BlogPageProps {
  initialposts: ResolvedPost[]
  totalPosts: number
  currentPage: number
}

const BlogPage: React.FC<BlogPageProps> = ({
  initialposts,
  totalPosts,
  currentPage,
}) => {
  const [isGrid, setIsGrid] = useState<boolean>(true)
  const router = useRouter()
  const postsPerPage = POSTS_PER_PAGE
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const [posts, setPosts] = useState<ResolvedPost[]>(initialposts)
  const [loading, setLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()
  const loadMorePosts = async () => {
    const offset = posts.length
    setLoading(true)
    try {
      const posts = await fetch(`/api/blog?offset=${offset}`)
      const { posts: newPosts } = await posts.json()
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
          <div className="container mx-auto max-w-[88rem] px-4 sm:px-8">
            <div className="flex justify-center my-16">
              <h2 className="text-4xl font-bold">Blog</h2>
            </div>

            {/* <div className="flex justify-end items-center mb-8">
        <span className="mr-2 text-sm font-medium">
          {isGrid ? "Grid" : "List"} View
        </span>
        <CustomSwitch
          isChecked={isGrid}
          onChange={() => {
            setIsGrid(!isGrid)
          }}
        />
        <span className="ml-2">
          {isGrid ? <MdGridView size={24} /> : <MdViewList size={24} />}
        </span>
      </div> */}

            <div
              className={`grid gap-8 relative ${
                isGrid ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {posts.map((post, index) =>
                isGrid ? (
                  <motion.div
                    id={`blog-${index}`}
                    key={index}
                    className="blog-card"
                    initial={{
                      y: index % 2 === 0 ? -20 : 20,
                      opacity: 0,
                    }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <GridBlogPost post={post} />
                  </motion.div>
                ) : (
                  <motion.div
                    id={`blog-${index}`}
                    key={index}
                    className="blog-card"
                    initial={{
                      x: index % 2 === 0 ? -100 : 100,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <ListBlog post={post} />
                  </motion.div>
                )
              )}
              {loading
                ? Array.from({ length: postsPerPage }).map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isGrid ? (
                        <GridBlogPostSkeleton />
                      ) : (
                        <ListBlogPostSkeleton />
                      )}
                    </motion.div>
                  ))
                : null}

              {posts.length < totalPosts && (
                <div className="absolute h-96 w-full bottom-0 bg-gradient-to-t from-[#0a0a0a] rounded-b-lg flex items-end justify-center pb-10">
                  {/* <button
              onClick={loadMorePosts}
              aria-label="Go to previous page"
              disabled={loading}
              className="flex items-center gap-2 border border-neutral-800 rounded-md py-2 px-4 text-muted-foreground cursor-pointer hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:cursor-default"
            >
              {loading ? "Loading..." : "Load More"}
            </button> */}
                </div>
              )}
            </div>

            {/* <div className="flex w-full items-center justify-center sm:justify-between gap-4 sm:gap-8 border-t border-neutral-800 mt-8">
        <div className="pt-4">
          <button
            aria-label="Go to previous page"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 border border-neutral-800 rounded-md py-2 px-4 text-muted-foreground cursor-pointer hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:cursor-default"
          >
            <FaArrowLeft className="size-4" aria-hidden="true" />
            <span className="max-sm:hidden">Prev</span>
          </button>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === "..." ? (
                  <span className="px-2">...</span>
                ) : (
                  <div className={cn("pt-4", currentPage === pageNumber && "")}>
                    <button
                      onClick={() => handlePageChange(Number(pageNumber))}
                      disabled={currentPage === pageNumber}
                      className={cn(
                        "flex items-center gap-2 border border-neutral-800 rounded-md py-2 px-4  cursor-pointer hover:bg-neutral-800 transition-colors duration-300  disabled:opacity-100 ",
                        currentPage === pageNumber
                          ? "bg-neutral-800 text-white"
                          : "text-white/50"
                      )}
                    >
                      {pageNumber}
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <button
            aria-label="Go to next page"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 border border-neutral-800 rounded-md py-2 px-4 text-muted-foreground cursor-pointer hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:cursor-default"
          >
            <span className="max-sm:hidden">Next</span>
            <FaArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div> */}
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}

export default BlogPage
