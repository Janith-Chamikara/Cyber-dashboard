import NewsHero from "@/components/news/NewsHero"
import NewsGrid from "@/components/news/NewsGrid"
import NewsletterSignup from "@/components/news/NewsletterSignup"

export const metadata = {
  title: "Latest News | REF Media",
  description: "Stay updated with the latest news, events, and announcements from REF Media.",
}

export default function NewsPage() {
  return (
    <main>
      <NewsHero />
      <NewsGrid />
      <NewsletterSignup />
    </main>
  )
}
