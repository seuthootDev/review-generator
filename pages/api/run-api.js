import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReviews(hashtag, category) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.APIKEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `다음 해시태그와 카테고리에 맞는 리뷰를 3개 생성해주세요.
    해시태그: ${hashtag}
    카테고리: ${category}
    
    리뷰는 한국어로 작성하고, 실제 사용자가 작성한 것처럼 이모지와 함께 자연스럽게 작성해주세요.
    각 리뷰는 30~40자 사이로 작성하고, 번호는 생략해주세요 그리고 각 리뷰 사이에 ']'를 넣어서 구분자로 사용하게 해주세요
    리뷰 마지막에는 ${hashtag}를 포함한 해시태그를 3개 추가해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().split("]");
  } catch (error) {
    console.error("Error generating reviews:", error);
    throw error;
  }
} 