"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { submitParticipation, getParticipantCount } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

// Image URLs array with your Imgur images in sequential order
const imageUrls = [
  "https://i.imgur.com/sHN1wZq.jpg",
  "https://i.imgur.com/6uKmTMA.jpg",
  "https://i.imgur.com/poBfLfz.jpg",
  "https://i.imgur.com/Lwiyvx2.jpg",
  "https://i.imgur.com/1A64gTC.jpg",
  "https://i.imgur.com/8h27kwi.jpg",
  "https://i.imgur.com/zdySGi8.jpg",
  "https://i.imgur.com/Y9Q0aI9.jpg",
  "https://i.imgur.com/0nMO4or.jpg",
]

export default function ContestPage() {
  const [participantCount, setParticipantCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  // Sequential image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return (prevIndex + 1) % imageUrls.length
      })
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    loadParticipantCount()
    // Trigger image animation after component mounts
    setTimeout(() => setImageLoaded(true), 100)
  }, [])

  const loadParticipantCount = async () => {
    try {
      const count = await getParticipantCount()
      setParticipantCount(count)
    } catch (error) {
      console.error("Error loading participant count:", error)
    }
  }

  const animateProgress = () => {
    let progress = 0
    const duration = 3000 // 3 seconds
    const interval = 50
    const increment = 100 / (duration / interval)

    const progressInterval = setInterval(() => {
      progress += increment

      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
      }

      setLoadingProgress(Math.round(progress))
    }, interval)

    return progressInterval
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setMessage("")
    setLoadingProgress(0)
    setShowSuccess(false)

    // Start progress animation
    const progressInterval = animateProgress()

    try {
      const result = await submitParticipation(formData)

      // Wait for progress to complete
      setTimeout(() => {
        clearInterval(progressInterval)
        setLoadingProgress(100)

        setTimeout(() => {
          setIsSubmitting(false)

          if (result.success) {
            setShowSuccess(true)
            setMessage("Successfully registered for the contest!")
            // Reset form
            const form = document.getElementById("contest-form") as HTMLFormElement
            form?.reset()
            // Reload participant count
            loadParticipantCount()

            // Hide success message after 4 seconds
            setTimeout(() => {
              setShowSuccess(false)
            }, 4000)
          } else {
            setMessage(result.error || "An error occurred")
          }
        }, 800)
      }, 3000)
    } catch (error) {
      clearInterval(progressInterval)
      setIsSubmitting(false)
      setMessage("An error occurred while submitting")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-all duration-300">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="text-center transform transition-transform duration-500">
            {/* Spinner Animation */}
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
              ></div>
              <div
                className="absolute inset-4 border-4 border-transparent border-t-green-400 rounded-full animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-white drop-shadow-lg">
              Processing Registration
            </h2>
            <p className="text-gray-300 mb-8 text-sm sm:text-base">Please wait while we handle your submission</p>

            {/* Progress Bar */}
            <div className="w-72 sm:w-80 mx-auto mb-5">
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 rounded-full transition-all duration-300 shadow-lg"
                  style={{
                    width: `${loadingProgress}%`,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s ease-in-out infinite",
                  }}
                ></div>
              </div>
              <div className="mt-4 text-lg font-medium text-cyan-400">
                {loadingProgress}% Complete
                <span className="inline-block animate-pulse">...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 transition-all duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-2xl transform transition-all duration-600 animate-bounce-in mx-4">
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-semibold mb-2">Success!</h3>
              <p className="text-green-100">Your registration has been processed successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Animated Image Carousel - Mobile Optimized */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-1000 ease-out ${
            imageLoaded ? "-translate-y-0" : "translate-y-full"
          }`}
        >
          <Image
            src={imageUrls[currentImageIndex] || "/placeholder.svg"}
            alt="Contest Banner"
            fill
            className="object-cover object-top transition-opacity duration-500"
            priority
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Image indicator dots - Mobile Optimized */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
            {imageUrls.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Participant Counter - Moved under image, no box */}
      <div className="text-center py-4 px-4">
        <div className="flex items-center justify-center space-x-2">
          <Users className="h-4 w-4 text-blue-400" />
          <span className="text-sm sm:text-base font-normal text-white">
            Total Participants: <span className="text-blue-400 font-medium">{participantCount}</span>
          </span>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-md">
        <Card className="shadow-lg bg-gray-800 border-gray-700">
          <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl font-normal text-white">Contest Registration</CardTitle>
            <p className="text-sm sm:text-base text-gray-300 font-normal mt-2">
              Join the contest and be part of something amazing!
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <form
              id="contest-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(new FormData(e.target as HTMLFormElement))
              }}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <Label htmlFor="uid" className="text-sm font-normal text-gray-200">
                  UID <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="uid"
                  name="uid"
                  type="text"
                  required
                  placeholder="Enter your UID"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="account_name" className="text-sm font-normal text-gray-200">
                  Name of Account <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="account_name"
                  name="account_name"
                  type="text"
                  required
                  placeholder="Enter your account name"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-normal text-gray-200">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 sm:h-11 text-sm sm:text-base font-medium mt-4 sm:mt-6 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "🚀 Processing..." : "Submit"}
              </Button>
            </form>

            {message && !showSuccess && !isSubmitting && (
              <div
                className={`mt-3 sm:mt-4 p-3 rounded-md text-xs sm:text-sm font-normal ${
                  message.includes("Successfully")
                    ? "bg-green-900/50 text-green-300 border border-green-700"
                    : "bg-red-900/50 text-red-300 border border-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Social Media & Footer */}
      <div className="mt-8 sm:mt-12">
        {/* Social Media Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://www.tiktok.com/@firekid846?_t=ZM-8vTQwM6EpQz&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z" />
            </svg>
            <span className="text-sm font-medium">TikTok</span>
          </a>

          <a
            href="https://whatsapp.com/channel/0029VaT1YDxFsn0oKfK81n2R"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
        </div>

        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-gray-700 bg-gray-800/50">
          <div className="container mx-auto px-3 sm:px-4 text-center">
            <p className="text-xs sm:text-sm font-normal text-gray-400">© 2025 firekid. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) translateY(50px); opacity: 0; }
          50% { transform: scale(1.05) translateY(-10px); }
          70% { transform: scale(0.9) translateY(0px); }
          100% { transform: scale(1) translateY(0px); opacity: 1; }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
