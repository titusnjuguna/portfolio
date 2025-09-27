'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// ✅ Define the Blog type to match the fields you use
interface Blog {
  id: number
  title: string
  description: string
  cover_image: string | null
  url: string
  published_at: string
  body_markdown: string | null
  tag_list: string[]
}

export default function Blog2() {
  // ✅ Type the states
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDevToPosts()
  }, [])

  // ✅ Fetch posts
  const fetchDevToPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://dev.to/api/articles?per_page=3&top=7&username=titon',
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (!response.ok) throw new Error('Failed to fetch articles')

      const articles: Blog[] = await response.json()
      setBlogs(articles)
    } catch (err) {
      setError((err as Error).message)
      console.error('Error fetching dev.to posts:', err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  const getReadingTime = (bodyMarkdown: string | null) => {
    if (!bodyMarkdown) return '3 min read'
    const wordsPerMinute = 200
    const wordCount = bodyMarkdown.split(' ').length
    return `${Math.ceil(wordCount / wordsPerMinute)} min read`
  }

  const truncateText = (text: string | null, maxLength = 100) => {
    if (!text) return 'Stay ahead of the curve with these emerging trends in development.'
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const getCategoryTag = (tags: string[]) => {
    if (!tags || tags.length === 0) return 'Development'
    const primaryTags = ['javascript', 'react', 'nextjs', 'webdev', 'programming', 'tutorial', 'css', 'html']
    const foundTag = tags.find(tag => primaryTags.includes(tag.toLowerCase()))
    return foundTag
      ? foundTag.charAt(0).toUpperCase() + foundTag.slice(1)
      : tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
  }

  const fallbackImages = [
    'https://via.placeholder.com/400x200/6366f1/ffffff?text=Blog+Post',
    'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Dev+Article',
    'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Tech+Blog',
  ]

  return (
    <section id="blog" className="section-blog-2 position-relative pt-60 pb-60">
      <div className="container">
        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <svg
              className="text-primary-2 me-2"
              xmlns="http://www.w3.org/2000/svg"
              width={5}
              height={6}
              viewBox="0 0 5 6"
              fill="none"
            >
              <circle cx="2.5" cy={3} r="2.5" fill="#A8FF53" />
            </svg>
            <span className="text-linear-4 d-flex align-items-center">Latest Posts</span>
          </div>
          <h3>From Dev.to Blog</h3>
        </div>

        {error && (
          <div className="alert alert-danger text-center mt-4" role="alert">
            Unable to load blog posts. Please try again later.
          </div>
        )}

        <div className="row mt-8">
          {loading ? (
            // ✅ Loading Skeleton
            [1, 2, 3].map(i => (
              <div key={i} className="col-lg-4">
                <div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
                  <div className="blog-card__image position-relative">
                    <div className="zoom-img rounded-2 overflow-hidden">
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{ height: '200px' }}
                      >
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      <div className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2">
                        Loading...
                      </div>
                    </div>
                  </div>
                  <div className="blog-card__content position-relative text-center mt-4">
                    <span className="blog-card__date fs-7 placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </span>
                    <h6 className="blog-card__title mt-2 placeholder-glow">
                      <span className="placeholder col-8"></span>
                    </h6>
                    <p className="blog-card__description fs-7 placeholder-glow">
                      <span className="placeholder col-12"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : blogs.length > 0 ? (
            // ✅ Blog List
            blogs.map((blog, index) => (
              <div key={blog.id} className="col-lg-4">
                <div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
                  <div className="blog-card__image position-relative">
                    <div className="zoom-img rounded-2 overflow-hidden">
                      <img
                        className="w-100"
                        src={blog.cover_image || fallbackImages[index % fallbackImages.length]}
                        alt={blog.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={e => {
                          (e.target as HTMLImageElement).src = fallbackImages[index % fallbackImages.length]
                        }}
                      />
                      <Link
                        className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2"
                        href="#"
                      >
                        {getCategoryTag(blog.tag_list)}
                      </Link>
                      <Link
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape rounded-circle"
                      >
                        <i className="ri-arrow-right-up-line" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-card__content position-relative text-center mt-4">
                    <span className="blog-card__date fs-7">
                      {formatDate(blog.published_at)} • {getReadingTime(blog.body_markdown)}
                    </span>
                    <h6 className="blog-card__title mt-2">{truncateText(blog.title, 60)}</h6>
                    <p className="blog-card__description fs-7">{truncateText(blog.description, 80)}</p>
                    <Link
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-overlay position-absolute top-0 start-0 w-100 h-100"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // ✅ No Blogs
            <div className="col-12 text-center">
              <p>No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
