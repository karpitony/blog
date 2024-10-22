---
title: [7주차] 리액트로 미니 블로그 만들기
description: 스터디 성과 발표를 위한 리액트 미니 블로그 제작기
cover: https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week01_01.png
tags: react, blog, 9oormthonuniv
date: 2024-10-22
series: react-study
seriesIndex: 6
---

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_07.png" />

## 기획 및 준비

`미니 블로그`를 제작할 당시는 10월 14일(월)이여서 그 주 10월 16일(수)에 `구름톤 유니브 동국대`의 스터디 발표가 있었습니다. 그동안 리액트 스터디에 참가해서 리액트를 공부했었는데 제 공부 기록을 모으고, 성과를 정리할 웹페이지를 하나 만들면 성과 발표에 적합할 것 같아 `리액트로 만든 블로그`를 만들기로 했습니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_01.png" width="800" />

다만 기간이 3일 정도로 짧았기에 일반 블로그가 아닌 게시물을 하드코딩해서 보여주는 `미니 블로그`로 기획을 축소했습니다. 기존 스터디를 진행할 때는 게시글을 마크다운으로 작성 후, `github.io`에 정적 웹페이지로 호스팅했었는데 이를 리액트로 보여주기로 기획했습니다.

**이를 위해 해야할 일을 리스트업 해봤고 다음과 같았습니다.**
1. 게시글 호스팅 서버 마련 혹은 불러오기
2. 마크다운 파싱 + 렌더링하기
3. 게시글 목록 페이지 만들기
4. ppt대용으로 쓸 발표 페이지 만들기

## 게시글 불러오기

리액트는 **클라이언트 쪽에서 실행**되기 때문에 `md` 파일을 모두 방문자에게 보내고 게시글을 표시하게 하는것보다, 서버를 두고 필요할 때마다 요청하면 마크다운 파일을 보내주는 것이 더 효율적일 것이라 생각했습니다.

서버를 사용할 경우 리액트만 알고있는 저는 서버를 하나도 몰라 백엔드의 도움을 받아야 할 것입니다. 하지만 시간이 없기에 다른 방법을 찾아야 했었습니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_02.png" width="800" />

다른 방법을 모색하던 중, `github raw`를 사용하면 해당 파일의 내용을 볼 수 있다는 사실을 떠올렸고, 이를 통해 `raw.githubusercontent.com`에 레포 이름 + 파일명을 넣으면 원하는 파일을 요청받을 수 있다는 것을 알게되었습니다.

```tsx
const [markdownText, setMarkdownText] = useState<string>('');
const { weekSlug } = useParams();

useEffect(() => {
  fetch(
    `https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/article/${weekSlug}.md`
  )
  .then((response) => response.text())
  .then((text) => {
    setMarkdownText(text)
  })
  .catch((error) => {console.error(error)})
}, [weekSlug])
```
url의 `slug`로 파일 명이 들어오면 `github raw`에 파일명을 넣어 요청을 보내는 식으로 코드를 작성했습니다. 이로서 마크다운 파일을 위한 서버 마련이나, 클라이언트에 같이 넘길 필요 없이 손쉽게 게시글을 불러올 수 있게 되었습니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_06.png" width="400" />

이 방식은 게시물 목로 클릭시 게시물 페이지로 이동하며 `github raw` 서버로 fetch 요청을 날립니다. 그후 `github raw` 서버에서 응답을 받아야 게시물을 표시하기 때문에 요청을 응답받는 동안 게시물이 안보여 사용자는 기다려야 합니다.

빈 화면 상태에서 갑자기 게시글을 보여주는 것은 **사용자 경험에 별로 좋지 않은 방법입니다.** 그러므로 로딩중이라는 표시 후 데이터가 준비되면 화면을 바꾸도록 설정했습니다.

```tsx
const [markdownText, setMarkdownText] = useState<string>('');
const [loading, setLoading] = useState(true);
const { weekSlug } = useParams();

useEffect(() => {
  fetch(
    `https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/article/${weekSlug}.md`
  )
  .then((response) => response.text())
  .then((text) => {
    setMarkdownText(text)
    setTimeout(() => setLoading(false), 200)
  })
  .catch((error) => {console.error(error)})
}, [weekSlug])

{/* 로딩 중일 때 React 아이콘을 보여줌 */}
{loading ? (
  <div className="flex justify-center items-center h-96">
    <img
      src={ReactLogo}
      alt="React Logo"
      className="w-40 h-40 animate-spin"
    />
  </div>
  ) : (
    // 게시글 보여주는 코드가 들어갈 예정
  )
}
```

위의 요청 `useEffect`에서 마크다운 텍스트에 값을 넣어준 뒤 약 0.2초 기다리고 `loading` 값도 바꿔주는 코드를 집어넣었습니다. 그후 tsx에서 html 부분에 삼항연산자를 사용하여 로딩시 보여줄 화면과, 로딩 후 보여줄 화면을 구분했습니다.

로딩 시간동안 리액트 로고를 화면 중앙에서 빙글빙글 돌리게 만들었습니다.


## 머리 박으며 마크다운 렌더 구현하기

마크다운 문법의 게시물을 불러오고 있으니 마크다운을 **파싱**해서 html로 만들거나 렌더링을 해주어야 합니다. 직접 마크다운 파서 및 렌더러를 만들면 좋은 경험이 되겠지만, 관련 지식도, 시간도 부족해서 `ReactMarkdown`이라는 오픈소스 패키지를 활용했습니다.

```tsx
<ReactMarkdown>
  {Text}
</ ReactMarkdown>
```

해당 라이브러리는 위와 같이 컴포넌트로 텍스트를 감싸주면 안에 있는 마크다운 텍스트를 화면에 렌더링해서 보여줍니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_03.png" width="700" />

해당 라이브러리만 사용하면 밋밋한 형태의 마크다운이 렌더링 됩니다. 이는 제가 사용하는 스타일 라이브러리인 `TailwindCSS`와의 충돌 때문입니다. `<br>`등 `Github Flavor` 문법도 적용이 안되고 있습니다. 코드블럭의 하이라이팅은 기대도 안했습니다. **여러 플러그인을 사용해서 꾸며주도록 하겠습니다.**

```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
  components={{
    h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 text-blue-400" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mb-3 mt-6 text-blue-300" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mb-2 mt-4 text-blue-200" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 transition-colors duration-200" {...props} />,
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
          style={nightOwl}
          showLineNumbers
          language={match[1]}
          PreTag="pre"
        >
          {String(children).trim()}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {markdownText}
</ReactMarkdown>
```

`remarkGfm`을 사용해 `Github Flavor Markdwon`문법을 지원하고, `rehypeRaw`로 마크다운 렌더링 시 html 태그도 같이 렌더링 할수 있게 만들었습니다. `rehypeSlug`와 `rehypeAutolinkHeadings` 플러그인들을 통해 목차 클릭시 해당 목차로 이동할 수 있는 기능을 구현했습니다.

`component` 옵션의 code의 경우 코드 블록의 첫줄을 읽고 해당 언어에 맞는 문법 하이라이팅을 적용 할 수 있게 해줍니다. 이 옵션들로도 충분히 예쁜 마크다운 게시글이 완성되지만, 좀더 깃허브스러운 느낌을 위해 `github-markdown-css` 패키지를 활용해서 스타일을 넣어줬습니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_04.png" />

## 게시글 목록 페이지 만들기

이제 쓴 게시글로 이동을 할 수 있는 페이지이자 맨 처음 사이트를 들어올 때 보이게 할 페이지를 만들어야 합니다. 게시글 목록의 경우 일반적인 블로그는 게시물 데이터를 센 뒤 게시물 데이터를 기반으로 표시합니다.

하지만, 그런 기능까지 구현하기엔 시간이 없고 방법을 떠올릴 기간도 부족하다고 생각해 게시물 데이터를 하드코딩해서 집어넣었습니다. 그 후 게시물 데이터 배열을 가지고 목록을 렌더링했습니다.

```tsx
const articleData = [
  { link: 'week01', week: '1주차', date: '9/02 ~ 9/08', title: '리액트 웹 예제 클론코딩' },
  { link: 'week02', week: '2주차', date: '9/09 ~ 9/15', title: '리액트 복습 + 미니 사이드 프로젝트' },
  { link: 'week03', week: '3주차', date: '9/16 ~ 9/22', title: 'TypeScript 기본 문법과 활용' },
  { link: 'week04', week: '4주차', date: '9/23 ~ 9/29', title: '🏆 구름톤 연합 해커톤 참가 및 대상 후기' },
  { link: 'week05', week: '5주차', date: '9/30 ~ 10/06', title: ' Axios API 통신 라이브러리 + OpenAPI 사용해보기' },
  { link: 'week06', week: '6주차', date: '10/07 ~ 10/13', title: '동국x숙명x경기 연합 CRUD 스터디 회고' },
]
```

```tsx
<div>
  {articleData.map((article, index) => (
    <Link
      key={index}
      to={`/${article.link}`}
    >
      <div>
        <span>{article.week}</span>
        <span>{article.date}</span>
      </div>
      <h3>
        {article.title}
      </h3>
      <div>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  ))}
</div>
```

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_05.png" />

위 코드에서 알 수 있듯 `articleData` 배열에서 값을 가져와 게시글 목록을 만들었고, `tailwindcss`로 스타일을 넣어주었습니다.

## 발표자료 만들기

이 `미니 블로그`를 만드는 목적은 그동안 배운 성과를 보여주는 것이기 때문에 ppt를 쓰지 않고 웹페이지로 발표를 하고 싶었습니다. 저는 평소 애플의 디자인 감각을 좋아합니다. 특히 자사의 제품을 발표 후 하나의 이미지로 정리해서 올리곤 합니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_08.png" width="700" />

각 내용 상자의 크기, 배치한 위치 등으로 정보의 중요성을 나타내고, 한눈에 정보를 볼 수 있게 만드는 매력을 느꼈습니다. 저도 위와 같은 느낌으로 발표 자료를 만들고 싶었습니다.

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_07.png" />

<img src="https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week07/week07_09.png" />

중요하다고 생각하는 배포와 협업 경험을 크게 배치하고, 이해도 증가, 앞으로의 계획 등은 조금 작게 배치했습니다. 또한 이 발표자료는 ppt 대용이므로, 각 상자를 클릭 시 세부 내용을 담은 모달창이 나오게 만들어 발표자료로서 잘 기능하게 만들었습니다.

### 마치며...

6주간의 리액트 스터디의 성과를 발표할 때 직접 만든 리액트 웹페이지로 하면 좋겠다며 시작된 이 `리액트 미니 블로그` 프로젝트는 3일간 많은 생각과 개발 원동력을 주었습니다. 이 웹페이지로 발표를 마친 후 구름톤 동국대 분들이 좋은 반응을 주셨고, 좀더 발전시켜서 포트폴리오를 정리하는 웹페이지도 만들어보라는 피드백까지 주셨습니다.

이대로 끝내는 것이 아닌 `Next.js`를 학습하며 이 코드를 발전시켜서 개발 블로그도 직접 만들어보고, 포트폴리오도 직접 만들어보고 싶습니다!

해당 웹페이지는 https://my-react-study.vercel.app 에서 직접 구경하실 수 있습니다. 이만 글을 마치겠습니다. 긴 글 읽어주셔서 감사합니다!
