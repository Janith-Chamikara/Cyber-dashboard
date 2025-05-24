"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Featured news data
const featuredNews = [
  {
    id: "news-1",
    title: "REF Media Covers the 26th Batch Inauguration Ceremony",
    excerpt:
      "Our team captured the memorable moments as the Faculty of Engineering welcomed its newest members in a grand ceremony.",
    category: "Events",
    date: "April 02, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "ref-media-covers-inauguration-ceremony",
  },
  {
    id: "news-2",
    title: "New Equipment Upgrade: Enhancing Our Video Production Capabilities",
    excerpt:
      "REF Media has acquired state-of-the-art camera equipment and production tools to deliver even higher quality content.",
    category: "Announcements",
    date: "March 28, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "equipment-upgrade-video-production",
  },
  {
    id: "news-3",
    title: "Media Workshop Series Announced for Engineering Students",
    excerpt:
      "Join our upcoming workshops to learn photography, videography, and media production skills from industry professionals.",
    category: "Workshops",
    date: "March 15, 2025",
    readTime: "2 min read",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "media-workshop-series-announced",
  },
]

export default function NewsHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Purple curved line decoration */}
      <div className="absolute left-0 top-0 h-full w-[150px] opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
          <path d="M-300,0 Q-100,400 -300,800" stroke="#9747FF" strokeWidth="100" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Page title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Latest News
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Stay updated with the latest happenings, announcements, and achievements from REF Media
          </motion.p>
        </motion.div>

        {/* Featured news slider */}
        <div
          className="relative rounded-xl overflow-hidden shadow-xl bg-white"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative h-[300px] md:h-[500px] overflow-hidden">
            {featuredNews.map((news, index) => (
              <motion.div
                key={news.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  zIndex: currentSlide === index ? 10 : 0,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="relative h-[200px] md:h-full order-2 md:order-1">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute top-4 left-4 bg-[#9747FF] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {news.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center order-1 md:order-2">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{news.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{news.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{news.title}</h2>
                    <p className="text-gray-600 mb-6">{news.excerpt}</p>
                    <Link
                      href={`/news/${news.slug}`}
                      className="inline-flex items-center text-[#9747FF] font-medium hover:underline"
                    >
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Slider controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#9747FF] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
