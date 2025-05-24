import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

// This would normally come from a CMS or API
const getArticleData = (slug: string) => {
  // Mock data for demonstration
  return {
    title: "REF Media Covers the 26th Batch Inauguration Ceremony",
    excerpt:
      "Our team captured the memorable moments as the Faculty of Engineering welcomed its newest members in a grand ceremony.",
    content: `
      <p>The Faculty of Engineering, University of Ruhuna, welcomed its 26th batch of students in a grand inauguration ceremony held on April 2, 2025. REF Media was there to capture every moment of this significant event.</p>
      
      <p>The ceremony began with the traditional lighting of the oil lamp by the Chief Guest, Prof. Samantha Perera, Dean of the Faculty of Engineering, followed by other distinguished faculty members. The new students, dressed in formal attire, were then officially welcomed to the engineering family.</p>
      
      <p>Our photography team, led by Dulsara Jayasooriya and Senuk Yuthmika, documented the entire event, capturing the emotions, excitement, and pride on the faces of the new students and their parents. The high-quality photographs will be available in our gallery section soon.</p>
      
      <p>The videography team, meanwhile, recorded the speeches, cultural performances, and the oath-taking ceremony. A highlight video of the event is currently in production and will be released next week.</p>
      
      <p>The 26th Batch Inauguration Ceremony marks the beginning of an exciting journey filled with learning, innovation, and new experiences for these freshers. REF Media wishes all the newest members of our engineering family the very best as they embark on this transformative chapter!</p>
    `,
    category: "Events",
    date: "April 02, 2025",
    readTime: "3 min read",
    author: {
      name: "Dulsara Jayasooriya",
      role: "Lead Photographer",
      image: "/placeholder.svg?height=100&width=100",
    },
    featuredImage: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Inauguration", "New Batch", "Faculty Events", "Photography"],
    relatedArticles: [
      {
        title: "Media Workshop Series Announced for Engineering Students",
        slug: "media-workshop-series-announced",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "New Equipment Upgrade: Enhancing Our Video Production Capabilities",
        slug: "equipment-upgrade-video-production",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug)

  return (
    <main className="bg-white">
      {/* Hero section */}
      <div className="relative h-[300px] md:h-[500px]">
        <Image
          src={article.featuredImage || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8 md:pb-16">
            <div className="max-w-4xl">
              <div className="bg-[#9747FF] text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                {article.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Back button */}
            <Link href="/news" className="inline-flex items-center text-[#9747FF] mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
            </Link>

            {/* Author info */}
            <div className="flex items-center mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={article.author.image || "/placeholder.svg"}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-800">{article.author.name}</div>
                <div className="text-sm text-gray-500">{article.author.role}</div>
              </div>
            </div>

            {/* Article excerpt */}
            <div className="text-xl text-gray-600 mb-8 font-light italic border-l-4 border-[#9747FF] pl-4">
              {article.excerpt}
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Image gallery */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Event Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {article.gallery.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share buttons */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4 font-medium">Share this article:</span>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Related articles */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
              <div className="space-y-4">
                {article.relatedArticles.map((related, index) => (
                  <div key={index} className="flex items-start">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <Link
                        href={`/news/${related.slug}`}
                        className="font-medium text-gray-800 hover:text-[#9747FF] line-clamp-2"
                      >
                        {related.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
              <div className="space-y-2">
                {["Events", "Announcements", "Workshops", "Achievements"].map((category, index) => (
                  <Link
                    key={index}
                    href={`/news?category=${category.toLowerCase()}`}
                    className="block py-2 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter signup mini-form */}
            <div className="bg-[#9747FF]/10 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-4">Get the latest news delivered to your inbox.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#9747FF] text-white rounded-lg hover:bg-[#8035E8] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
