"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Review = {
  id: string
  rating: number
  comment: string
  name: string
  profession: string
}

const dummyTestimonials: Review[] = [
  {
    id: "1",
    rating: 5,
    comment:
      "I started as a beginner and within six months I made almost ₹1,00,000. The platform is user-friendly and the support and commission structure is a game changer compared to full-time jobs!",
    name: "Arjun Mehta",
    profession: "Blogger",
  },
  {
    id: "2",
    rating: 5,
    comment:
      "The categories available are so amazing and my audience loves the products. The merchant support is the best. Recommendations are always on time.",
    name: "Meera Nair",
    profession: "Streamer",
  },
  {
    id: "3",
    rating: 5,
    comment:
      "I started my affiliate journey and immediately loved it. The commission structure is great and the platform is user-friendly. Highly recommended by me to everyone!",
    name: "Vikram Patel",
    profession: "Content Creator",
  },
]

function TestimonialCard({ review }: { review: Review }) {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded ${
          i < review.rating ? "bg-red-500" : "bg-gray-300"
        }`}
      >
        <Star className="w-3 h-3 md:w-4 md:h-4 fill-white text-white" />
      </div>
    ))
  }

  return (
    <Card className="bg-gray-100 p-4 md:p-6 shadow rounded-lg h-full flex flex-col">
      <div className="flex gap-1 mb-4">{renderStars()}</div>
      <p className="text-sm md:text-base leading-relaxed font-normal text-gray-800 flex-grow mb-4">{review.comment}</p>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-gray-300 flex items-center justify-center">
          <AvatarFallback className="bg-gray-400 text-white text-sm font-semibold">
            {review.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm md:text-base font-medium text-gray-900">{review.name}</p>
          <p className="text-xs md:text-sm text-gray-600">{review.profession}</p>
        </div>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselInnerRef = useRef<HTMLDivElement>(null)
  const [cardAndGapWidth, setCardAndGapWidth] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const gap = 24

  useEffect(() => {
    const calculateResponsiveValues = () => {
      if (carouselInnerRef.current?.children.length) {
        const firstCard = carouselInnerRef.current.children[0] as HTMLElement
        const cardWidth = firstCard.offsetWidth

        const screenWidth = window.innerWidth
        let newCardsPerView = 1
        if (screenWidth >= 1024) newCardsPerView = 3
        else if (screenWidth >= 768) newCardsPerView = 2

        setCardsPerView(newCardsPerView)
        setCardAndGapWidth(cardWidth + gap)
      }
    }

    calculateResponsiveValues()
    window.addEventListener("resize", calculateResponsiveValues)
    return () => window.removeEventListener("resize", calculateResponsiveValues)
  }, [])

  const handleNext = () => {
    if (dummyTestimonials.length <= cardsPerView) return
    const maxIndex = Math.ceil(dummyTestimonials.length / cardsPerView) - 1
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const handlePrev = () => {
    if (dummyTestimonials.length <= cardsPerView) return
    const maxIndex = Math.ceil(dummyTestimonials.length / cardsPerView) - 1
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const translateXValue = -(currentIndex * cardAndGapWidth * cardsPerView)

  return (
    <section className="py-12 md:py-16 bg-[#F2F0EA]" id="success-stories">
      <div className=" mx-auto px-4 md:px-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-900">What Our Users Say</h2>

        <div className="relative overflow-hidden mb-8">
          <div
            ref={carouselInnerRef}
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {dummyTestimonials.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
              >
                <TestimonialCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {dummyTestimonials.length > cardsPerView && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={handlePrev}
              className="w-10 h-10 bg-[#F2F0EA] border border-gray-300 rounded hover:bg-gray-100"
              disabled={dummyTestimonials.length <= cardsPerView}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              onClick={handleNext}
              className="w-10 h-10 bg-[#F2F0EA] border border-gray-300 rounded hover:bg-gray-100"
              disabled={dummyTestimonials.length <= cardsPerView}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
