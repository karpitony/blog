This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📎 외부 링크 프리뷰 (Link Preview)

마크다운 내 외부 URL을 카드 형태로 렌더링합니다. Open Graph 메타데이터를 서버에서 스크랩하여 제목, 설명, 이미지를 표시합니다.

### 사용법

**1. 베어 URL (자동 감지)**

URL만 단독으로 한 줄에 작성하면 자동으로 카드로 변환됩니다:

```md
참고 자료입니다:

https://nextjs.org/docs/app

위 내용을 참고하세요.
```

> `[텍스트](url)` 형태의 인라인 링크는 항상 일반 텍스트 링크로 유지됩니다.

**2. 링크 + 카드 렌더링: `<!-- og -->`**

```md
<!-- og -->
https://nextjs.org/docs/app
```

원래 링크를 유지하고, 아래에 OG 카드를 추가로 표시합니다.

**3. 카드만 렌더링: `<!-- og-only -->`**

```md
<!-- og-only -->
https://nextjs.org/docs/app
```

원래 링크를 숨기고 OG 카드만 표시합니다.

**4. 카드 렌더링 제외: `<!-- no-og -->`**

```md
<!-- no-og -->
https://example.com
```

베어 URL이어도 카드 렌더링을 하지 않고 일반 링크로 표시합니다.
