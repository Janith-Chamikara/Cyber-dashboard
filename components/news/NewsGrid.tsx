"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"

// News categories
const categories = [
  { id: "all", name: "All News" },
  { id: "events", name: "Events" },
  { id: "announcements", name: "Announcements" },
  { id: "workshops", name: "Workshops" },
  { id: "achievements", name: "Achievements" },
]

// News data
const newsItems = [
  {
    id: "news-4",
    title: "REF Media Wins Best University Media Team Award",
    excerpt:
      "Our team has been recognized for excellence in university media coverage at the National Media Awards 2025.",
    category: "Achievements",
    date: "March 10, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ref-media-wins-best-university-media-team-award",
  },
  {
    id: "news-5",
    title: "Collaboration with National Television for Engineering Day Coverage",
    excerpt:
      "REF Media partnered with National TV to broadcast the Engineering Day celebrations to a nationwide audience.",
    category: "Events",
    date: "February 28, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "collaboration-national-television-engineering-day",
  },
  {
    id: "news-6",
    title: "New Website Launch: Enhancing Digital Presence",
    excerpt:
      "We're excited to announce the launch of our new website with improved gallery features and user experience.",
    category: "Announcements",
    date: "February 15, 2025",
    readTime: "2 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "new-website-launch-digital-presence",
  },
  {
    id: "news-7",
    title: "Photography Workshop: Mastering Low Light Techniques",
    excerpt:
      "Join our upcoming workshop to learn professional techniques for capturing stunning photos in challenging lighting conditions.",
    category: "Workshops",
    date: "February 10, 2025",
    readTime: "2 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "photography-workshop-low-light-techniques",
  },
  {
    id: "news-8",
    title: "REF Media Covers International Research Symposium",
    excerpt:
      "Our team provided comprehensive coverage of the International Research Symposium hosted by the Faculty of Engineering.",
    category: "Events",
    date: "January 25, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ref-media-covers-research-symposium",
  },
  {
    id: "news-9",
    title: "Student Media Team Expansion: New Positions Available",
    excerpt:
      "REF Media is expanding its team and inviting applications from talented students interested in media production.",
    category: "Announcements",
    date: "January 15, 2025",
    readTime: "3 min read",
    image: "/placeholder.svg?height=400&width=600",
    slug: "student-media-team-expansion",
  },
]

export default function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: false, amount: 0.1 })

  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter news based on active category, search term, and date range
  const filteredNews = newsItems.filter((item) => {
    // Category filter
    if (activeCategory !== "all" && item.category.toLowerCase() !== activeCategory) {
      return false
    }

    // Search filter
    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Date range filter
    if (dateRange.from || dateRange.to) {
      const itemDate = new Date(item.date)
      if (dateRange.from && itemDate < dateRange.from) {
        return false
      }
      if (dateRange.to && itemDate > dateRange.to) {
        return false
      }
    }

    return true
  })

  const clearFilters = () => {
    setSearchTerm("")
    setDateRange({})
    setActiveFilters([])
  }

  // Update active filters when filters change
  useEffect(() => {
    const filters = []
    if (activeCategory !== "all") {
      filters.push(`Category: ${activeCategory}`)
    }
    if (dateRange.from) {
      filters.push(`From: ${dateRange.from.toLocaleDateString()}`)
    }
    if (dateRange.to) {
      filters.push(`To: ${dateRange.to.toLocaleDateString()}`)
    }
    setActiveFilters(filters)
  }, [activeCategory, dateRange])

  return (
    <section className="py-16 bg-white" ref={gridRef}>
      <div className="container mx-auto px-4">
        {/* Search and filter bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                <SlidersHorizontal className="h-4 w-4" />
                Advanced Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Filter by date</h3>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="from">From</Label>
                    <DatePicker
                      id="from"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                      placeholderText="Select start date"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="to">To</Label>
                    <DatePicker
                      id="to"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                      placeholderText="Select end date"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={clearFilters} className="text-sm">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" onClick={clearFilters} />
              </Badge>
            ))}
          </div>
        )}

        {/* Category filters */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#9747FF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsCard news={news} />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No news found</h3>
            <p className="text-gray-600">There are currently no news items in this category.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredNews.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-[#9747FF] text-white rounded-md hover:bg-[#8035E8]">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// News card component
function NewsCard({ news }: { news: any }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[#9747FF] text-white px-3 py-1 rounded-full text-sm font-medium">
          {news.category}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{news.date}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{news.readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{news.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{news.excerpt}</p>
        <Link
          href={`/news/${news.slug}`}
          className="inline-flex items-center text-[#9747FF] font-medium hover:underline mt-auto"
        >
          Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
