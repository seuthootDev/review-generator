'use client'

import ReviewSection from "@/components/review-section"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { generateReviews } from "../pages/api/run-api"
import { Suspense } from "react"

function ReviewContent() {
  const searchParams = useSearchParams()
  const [reviews, setReviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      if (!searchParams) {
        setReviews(["잘못된 접근입니다."])
        setIsLoading(false)
        return
      }

      const hashtag = searchParams.get("hashtag")
      const category = searchParams.get("category")
      
      if (!hashtag || !category) {
        setReviews([
          "QR 코드를 통해 접속해주세요.",
          "올바른 해시태그와 카테고리가 필요합니다.",
        ])
        setIsLoading(false)
        return
      }

      try {
        const generatedReviews = await generateReviews(hashtag, category)
        setReviews(generatedReviews)
      } catch (error) {
        console.error("Error generating reviews:", error)
        setReviews(["리뷰 생성 중 오류가 발생했습니다."])
      } finally {
        setIsLoading(false)
      }
    }

    fetchReview()
  }, [searchParams])

  return (
    <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI 리뷰 생성기
        </h1>
        <p className="mt-2 text-muted-foreground">AI가 리뷰를 생성해드립니다!</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {isLoading ? (
          <div className="text-center text-lg font-pretendard">리뷰를 생성하고 있습니다...</div>
        ) : (
          reviews.map((review, index) => (
            <ReviewSection key={index} review={review} index={index + 1} />
          ))
        )}
      </div>

      <div className="mt-8 md:mt-10 flex justify-center">
        <Button className="px-6 py-5 md:px-8 md:py-6 text-base md:text-lg rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md">
          리뷰 작성하러 가기!
        </Button>
      </div>

      <Toaster />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-pretendard tracking-tight">
            AI 리뷰 생성기
          </h1>
          <p className="mt-3 text-lg md:text-xl text-muted-foreground font-pretendard">
            로딩중...
          </p>
        </div>
      </main>
    }>
      <ReviewContent />
    </Suspense>
  )
}

