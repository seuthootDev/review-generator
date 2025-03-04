# 해시태그 리뷰 생성기 🎯

QR 코드를 통해 접속하여 해시태그와 카테고리에 맞는 리뷰를 자동으로 생성해주는 웹 애플리케이션입니다.

## 주요 기능 ✨

- QR 코드를 통한 간편한 접속
- 해시태그 기반 맞춤형 리뷰 생성
- 이모지가 포함된 자연스러운 리뷰 텍스트
- 모바일 친화적인 반응형 디자인

## 기술 스택 🛠

- **Frontend**: Next.js 14, React
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Fonts**: Pretendard, Noto Sans KR

## 시작하기 🚀

1. 저장소 클론
```bash
git clone [repository-url]
cd review-generator
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정

`next.config.mjs` 파일을 생성하고 다음 내용을 추가합니다:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APIKEY: process.env.APIKEY,
  },
}

export default nextConfig
```

그리고 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:
```
APIKEY=[your-gemini-api-key]
```

4. 개발 서버 실행
```bash
npm run dev
```

## 사용 방법 📱

1. QR 코드를 스캔하여 웹사이트에 접속합니다.
2. URL 파라미터에 해시태그와 카테고리가 자동으로 입력됩니다.
   예시: `http://your-domain.com?hashtag=맛집&category=식당`
3. AI가 자동으로 해당 해시태그와 카테고리에 맞는 리뷰를 생성합니다.

## 커스텀 스타일링 🎨

- Pretendard와 Noto Sans KR 폰트를 사용한 모던한 타이포그래피
- 그라데이션이 적용된 세련된 디자인
- 반응형 레이아웃으로 모든 디바이스에서 최적화된 경험

## 주의사항 ⚠️

- Gemini API 키가 필요합니다.
- 리뷰 생성에는 약간의 시간이 소요될 수 있습니다.
- 적절한 해시태그와 카테고리 입력이 필요합니다.