---
title: Next.js 블로그 게시글 정적 페이지로 만들기
description: Next.js app 라우터에서 generateStaticParams()로 정적 페이지 생성
cover: /images/my-blog/ssg-on-post/static-build-output.png
tags: Next.js, SSG, SEO
date: 2025-03-28
series: make-blog
seriesIndex: 0
---

제 Next.js 15 블로그의 게시물 목록에 SSG 렌더링을 적용해 보았습니다.

제 블로그의 글 목록은 원래 GET 요청 시 서버 함수가 작동해서 요청 URL에 해당하는 마크다운 파일을 탐색하고, 그 게시물을 긁어서 보여주는 형태였습니다.

사실 큰 문제는 없지만, 정적 블로그 특성상 수정시마다 빌드가 다시 이루어지므로, 게시물이 서버에서 중간에 바뀌는 일이 없고, 추가되는 일도 없습니다.

그럼 게시물을 정적 HTML로 만들어 놓는 것이 성능상에도 좋고, 추가적인 리소스도 들어가지 않습니다.

다만, Next.js가 `pages`라우터에서 `app`라우터 구조로 바뀌며, SSG(Static Site Generator) 기능이 잘 작동하지 않는다고 착각하고 있었습니다.

그러던 중 `generateStaticParams()`라는 넥스트의 기능을 알게 되었습니다.

## `generateStaticParams()`는 무엇인가?

[`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) 함수는 Next.js에서 **동적 라우팅**을 사용하는 페이지를 **정적으로 생성**할 때 사용되는 함수입니다.

주로 **빌드 시점**에 특정 경로들을 미리 렌더링할 때 사용됩니다.

미리 렌더링 된 페이지들을 만듬으로써, 블로그 글 요청시 로딩 속도를 줄이고, 서버 부하도 감소시킵니다. 또한, SEO를 최적화와 성능 향상에 도움이 됩니다.

## 사용 예시

```tsx
// app/(blog)/posts/[...slugs]/page.tsx
/**
 *  예시 API 응답:
 *  [
 *   { "slug": "react-1" },
 *   { "slug": "make-server/post-2" }
 * ]
 */
export async function generateStaticParams() {
  const posts = await fetch('https://example.com/api/posts').then(res => res.json());

  return posts.map(post => ({
    // catch-all 라우트(...slugs)이므로 각 URL을 배열로 리턴
    slugs: post.slug.split(path.sep),
  }));
}

export const dynamic = 'force-static';

export default async function Page({ params }) {
  const { slugs } = await params;
  const postData = await fetch(`https://example.com/api/posts/${slugs}`).then(res => res.json());
  // postData를 사용해서 페이지 렌더링 하는 로직
}
```

예를 들어 위와 같은 구조로 서버로부터 블로그 글을 가져온다고 가정해보겠습니다.

`next build`시 `generateStaticParams()` 함수가 호출되며 api 서버로부터 글 목록을 받아오고, 동적 라우팅 자리에 들어갈 정적 URL을 만듭니다.
`(ex. posts/post-1, posts/post-2)`

그 후, 각 URL에 해당하는 정적 페이지를 만들기 위해 `Page()` 컴포넌트를 실행시키며 서버로부터 각 게시물을 받아오고 이걸 바탕으로 각 URL에 해당하는 정적 HTML을 제작합니다.

모든 페이지를 정적으로 생성하면 빌드 시간이 오래 걸릴수도 있기에, 일부 `slug`만 생성하는 것도 가능합니다.

만약 Next.js가 알아서 정적 사이트를 새로고침 하길 원하면, `export const dynamic = 'force-static'`을 삭제하거나 `dynamic = "auto"`로 바꿔놓을 수도 있습니다.

## SSG 적용기

```tsx
// app/(blog)/posts/[...slugs]/page.tsx
import { readFile } from 'fs/promises';

export const dynamic = 'force-static';
export async function generateStaticParams() {
  const posts = await getPostList(); // 파일 목록을 리턴하는 함수
  const slugs = posts.map(post => post.slug);
  return slugs.map(slug => ({
    slugs: slug.split(path.sep),
  }));
}

const getPostData = async (
  fileName: string,
): Promise<{
  meta: PostMeta;
  body: string[];
}> => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = await readFile(fullPath, 'utf8');
  const { meta, body } = parsePost(fileContents);

  return { meta, body };
};

export default async function PostPage({ params }: PostPageProps) {
  const { slugs } = await params;
  const { meta, body } = await getPostData(slugs.join('/') + '.md');

  return <>{/*마크다운 렌더링 로직 */}</>;
}
```

이 블로그는 `.md` 파일을 별도의 백엔드 서버에서 받아오는 것이 아닌, 깃허브 레포지토리에 저장하고, 레포지토리 전체를 빌드해서 배포하는 형식으로 작동합니다. 그렇기에 `fetch` 대신, `fs/promises`라는 비동기로 파일 탐색을 할 수 있는 Node API를 사용했습니다.

제 블로그는 빌드 시 `_posts`라는 게시물이 담긴 폴더 구조를 탐색하며 정적 URL을 만들고, 그 URL을 바탕으로 마크다운 파일을 불러와 정적 페이지를 생성합니다. 마크다운이 실행 도중 변경될 일이 없기에 `dynamic = 'force-static'`으로 불필요한 서버 리소스를 최소화 했습니다.

|                            기존 빌드 로그                             |                            SSG 적용 빌드 로그                            |
| :-------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![ssr-build-output](/images/my-blog/ssg-on-post/ssr-build-output.png) | ![ssg-build-output](/images/my-blog/ssg-on-post/static-build-output.png) |

기존에는 `ƒ (Dynamic) server-rendered on demand`로 요청 시마다 서버에서 렌더링을 하는 SSR 형태였습니다.

`generateStaticParams()` 사용 후의 빌드 로그에선 `● (SSG) prerendered as static HTML (uses generateStaticParams)`이 출력되는 것을 볼 수 있습니다.

미리 만들어진 정적 경로도 출력 결과에서 확인해 볼 수 있습니다.

라이트 하우스 비교 및 렌더링 시간 등은 추후에 적어보겠습니다.
