"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ReviewSectionProps {
  review: string
  index: number
}

export default function ReviewSection({ review, index }: ReviewSectionProps) {
  const { toast } = useToast()
  const [isCopying, setIsCopying] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(review)
      setIsCopying(true)

      toast({
        title: "복사 완료!",
        description: "리뷰가 클립보드에 복사되었습니다.",
        duration: 2000,
      })

      setTimeout(() => {
        setIsCopying(false)
      }, 2000)
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드에 복사하지 못했습니다. 다시 시도해주세요.",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  // Generate a different gradient for each card based on index
  const gradients = [
    "from-purple-100 to-blue-100 border-purple-200",
    "from-blue-100 to-cyan-100 border-blue-200",
    "from-pink-100 to-purple-100 border-pink-200",
  ]

  const gradient = gradients[index - 1] || gradients[0]

  return (
    <Card className={`review-card bg-gradient-to-r ${gradient} border-2`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg md:text-xl flex items-center">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2 text-sm">
            {index}
          </span>
          리뷰 {index}
        </CardTitle>
        <Button
          variant={isCopying ? "outline" : "secondary"}
          size="sm"
          onClick={copyToClipboard}
          disabled={isCopying}
          className="copy-button text-xs md:text-sm"
        >
          {isCopying ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4" />
              복사됨!
            </>
          ) : (
            <>
              <Copy className="mr-1 h-4 w-4" />
              복사하기
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="p-3 md:p-4 bg-white bg-opacity-70 rounded-md min-h-[100px] text-sm md:text-base shadow-inner">
          {review}
        </div>
      </CardContent>
    </Card>
  )
}

