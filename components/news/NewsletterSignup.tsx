"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1500)
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">Stay Updated</h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter to receive the latest news and updates from REF Media directly to your
                  inbox.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#9747FF] text-white rounded-lg hover:bg-[#8035E8] transition-colors flex items-center justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Subscribe <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Thank you for subscribing! We'll keep you updated.</span>
                  </motion.div>
                )}
              </div>

              <div className="hidden md:block ml-8">
                <div className="w-32 h-32 bg-[#9747FF]/10 rounded-full flex items-center justify-center">
                  <Send className="w-12 h-12 text-[#9747FF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
