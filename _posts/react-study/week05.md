# [5주차] Axios API 통신 라이브러리 + OpenAPI 사용해보기
저번 `구름톤 유니브 3기 연합 해커톤`과 이번 `동국 x 숙명 x 경기 연합 CRUD 스터디`를 하며 백엔드와 API로 통신하거나, OpenApi를 사용하는 경험을 자주 하게 되었습니다. 보통 프로젝트는 프론트와 백엔드가 있고, 서로 통신해야하다보니 중요하다고 생각해 까먹지 않으려고 배운 내용들을 정리해봤습니다.

1. [Axios 사용해서 백엔드와 API 통신 해보기](#1-axios-사용해서-백엔드와-api-통신-해보기)
    1. [Axios의 장점](#1-axios의-장점)
    2. [Axios 기본 사용법](#2-axios-기본-사용법)
    3. [인터셉터 사용법](#3-인터셉터-사용법)
2. [Naver 도서 OpenAPI 사용해보기](#2-naver-도서-openapi-사용해보기)
    1. [토큰 발급과 헤더 설정](#1-토큰-발급과-헤더-설정)
    2. [API 요청과 리액트 커스텀 훅](#2-api-요청과-리액트-커스텀-훅)

## 1. Axios 사용해서 백엔드와 Api 통신 해보기

![Axios](https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week05_01.jpg)

`Axios`는 **JavaScript**에서 **HTTP 요청**을 쉽게 보낼 수 있게 도와주는 **HTTP 클라이언트**입니다. 주로 비동기로 서버와 데이터를 주고받을 때 사용됩니다. 브라우저뿐만 아니라 `Node.js` 환경에서도 사용할 수 있어서 프론트와 백엔드 모두 사용하는 매우 유용한 라이브러리입니다.

### 1. Axios의 장점

- **Promise 기반:** 비동기 코드에서 콜백함수 대신 `Promise`를 사용하므로, 가독성이 높고 에러 처리가 쉽습니다. 콜백 함수
- **간편한 사용법:** `.fetch().then()`처럼 설정하기 쉽고, 직관적인 코드로 **HTTP 요청**을 만들 수 있습니다.
- **자동으로 JSON 변환:** 요청과 응답에서 `JSON` 데이터 처리를 자동으로 해줘서 추가적인 변환이 필요 없습니다.
- **인터셉터 기능:** 요청이나 응답 전에 특정 로직을 실행할 수 있는 기능을 제공합니다. 모든 요청 헤더에 액세스 토큰을 한번 설정하면 기본으로 넣어줄 수 있어, 사용이 간편합니다.

### 2. Axios 기본 사용법

`Axios`는 주로 **GET**, **POST**, **PUT**, **DELETE** 같은 HTTP 메서드를 사용해 서버와 통신을 주고받습니다.

```tsx
import { apiClient } from '../ApiClient'

interface BookContent {
  id: number;
  title: string;
  author: string;
  description: string;
  file: FileResponse;
}

interface Pageable {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isEnd: boolean;
}

interface BookSearchResponse {
  contents: BookContent[];
  pageable: Pageable;
}

// 책 검색 API 요청 함수
export const searchBooks = async (params: BookSearchParams): Promise<BookSearchResponse> => {
  try {
    const response = await apiClient.get<BookSearchResponse>('/books/search', {
      params: {
        page: params.page,
        size: params.size,
        keyword: params.keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('책 검색 중 오류 발생:', error);
    throw error;
  }
};
```

위 코드는 `axios.get()`을 이용해 **GET** 요청을 보내고, 응답 데이터를 받아 처리합니다. 응답은 `Promise` 형태로 반환되기 때문에, `try-catch()`로 결과를 처리하게 짰습니다. 

또한 타입스크립트를 사용했으므로 올 수 있는 응답을 예상하여 `interface`를 만들어 타입을 명시했습니다.

해당 코드의 상단 `import`문과, `apiClient.~~`은 다음 항목인 인터셉터를 활용했습니다.

## 3. 인터셉터 사용법

인터셉터란, 모든 요청이 서버로 전송되기 전에 또는 응답이 반환되기 전에 특정 로직을 실행할 수 있게 해주는 기능입니다.

```jsx
import axios from 'axios'
import { useAuthStore } from '../stores/UseCurrentUserStore'

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.url &&
      !config.url.includes('/login') &&
      !config.url.includes('/register') &&
      !config.url.includes('/book')
    ) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log('헤더 설정 완료');
      } else {
        console.warn('Access Token이 존재하지 않습니다.');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

위 코드는 `apiClient`를 `Axios` 인스턴스로 생성한 후, `baseURL`을 **공통 설정으로 지정**했습니다. 이렇게 하면 매번 URL 전체를 쓰지 않아도 됩니다. 

인터셉터를 사용해 모든 요청이 서버로 전송되기 전에 `Access Token`이 있는지 확인하고, 있다면 **Authorization 헤더**에 토큰을 추가합니다. 로그인을 통해 만들어지는 `AccessToken`을 헤더에 자동으로 넣어줘서 서버에 요청을 보낼떄 별도의 `AccessToken` 헤더 설정이 필요없습니다!

#### 인터셉터를 사용하면서 얻을 수 있는 장점

- **재사용성:** apiClient라는 Axios 인스턴스를 만들어 여러 곳에서 동일한 API 클라이언트를 사용할 수 있어요. 이렇게 하면 매번 baseURL 설정을 반복하지 않아도 되고, 기본 설정을 쉽게 관리할 수 있습니다.
- **유연한 설정:** 특정 URL 패턴에 대한 요청에만 토큰을 추가하는 방식으로 보안을 강화할 수 있습니다. 또한, 로그인 또는 회원가입 같은 특정 요청에서는 토큰을 제외하고, 나머지 요청에만 토큰을 설정하는 등의 조건부 처리도 가능합니다.

## 2. Naver 도서 OpenAPI 사용해보기

저희 팀은 **책 기록 블로그**를 주제고 CRUD 프로젝트를 시작했습니다. 그래서 책 정보를 받아올 수 있는 `OpenAPI`가 필요했고, 네이버의 API를 사용하기로 결정했습니다.

### 1. 토큰 발급과 헤더 설정

`OpenAPI`를 사용하기 위해선 먼저 토큰을 발급받아야 합니다. 그 후, API 서버에 요청을 보낼때 토큰을 함께 보내주면 원하는 데이터를 응답으로 받을 수 있습니다.

이 토큰들역시 `Axios`를 사용하면 요청 시 헤더에 자동으로 포함되게 할 수 있습니다.

```jsx
export const NAVER_API_HEADERS = {
  'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
}

const BOOK_SEARCH_ENDPOINT = '/v1/search/book.json'

export const getBookSearchUrl = (query: string, display?: number) => {
  let url = `${BOOK_SEARCH_ENDPOINT}?query=${query}`;
  
  if (display !== undefined) {
    url += `&display=${display}`;
  }

  return url;
}
```

발급받은 **ID**와 **시크릿 토큰**을 `.env`에 넣어준 뒤 임포트 해주는 식으로 진행했습니다. 코드에 하드코딩 할 경우 github등에 올릴 때 전체공개되서 제 API가 OPENAPI가 될 수 있기에 `.env`에 적은 뒤, `.gitignore`에 `.env` 파일을 등록해야 합니다.

네이버 api의 경우 검색어, 표시할 책 갯수 등을 인자로 넘겨줘야 합니다. 그렇기에 `(query, display)`를 패러미터로 넘길 수 있게 해주었습니다.

### 2. API 요청과 리액트 커스텀 훅

| 검색 예시 1 | 검색 예시 2 |
|:---:|:---:|
| ![북로그 검색](https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week05_02.png) | ![북로그 검색2](https://raw.githubusercontent.com/karpitony/9oormthonUniv-React-Study/refs/heads/main/img/week05_03.png)

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NAVER_API_HEADERS, getBookSearchUrl } from '../config/BookClient'
import { BookData } from '../model/BookData'

const ERROR_MESSAGES = {
  NOT_FOUND: '책 데이터를 찾을 수 없습니다.',
  API_REQUEST_FAILED: '네이버 API 요청 실패',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
}

export const useSearchBookByName = (searchTerm: string) => {
  const [books, setBooks] = useState<BookData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (searchTerm) {
      const fetchBooks = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await axios.get(getBookSearchUrl(searchTerm, 100), {
            headers: NAVER_API_HEADERS,
          })

          const data = response.data
          if (data.items && data.items.length > 0) {
            setBooks(data.items)
          } else {
            setBooks([])
            throw new Error(ERROR_MESSAGES.NOT_FOUND)
          }
        } catch (err) {
          setError(
            axios.isAxiosError(err) && err.response
              ? err.response.data.message || ERROR_MESSAGES.API_REQUEST_FAILED
              : ERROR_MESSAGES.UNKNOWN_ERROR
          )
        } finally {
          setLoading(false)
        }
      }

      fetchBooks()
    } else {
      setBooks([])
    }
  }, [searchTerm])

  return { books, error, loading }
}
```

이 코드는 앞에 `Axios`를 설명할 때 사용한 것처럼 헤더를 미리 포함시켜 요청해주는 **인터셉터** 기능이 들어간 Api 요청 코드입니다. 다만, 이 코드만으로 요청을 하는 것은 아닙니다. 이 코드는 쉽게 API 요청을 할 수 있게 해주는 미리 만들어진 코드입니다.

바로 API를 호출하는 코드를 넣는것보다 **리액트 커스텀 훅**을 만들어 사용하면 재사용이 가능해져 더 좋습니다. 해당 훅은 `useSearchBookByName`이라는 이름의 훅으로, `searchTerm`이라는 검색어를 입력받으면 100개의 결과를 가져와서 리턴하는 역할을 합니다.

```jsx
import { useSearchBookByName } from '../../hooks/UseSearchBookbyName';

const { books, error, loading } = useSearchBookByName(searchTerm);
```
위 코드처럼 간단하게 책 검색을 여러 코드에서 사용이 가능하게 됩니다.

이번 연합 스터디와 지난 해커톤을 진행하며 실제 웹 페이지를 어떻게 만들지, 그리고 만들면서 부딪힌 문제와 해결한 법 등이 많은 것을 배웠습니다! 구름톤에 지원해서 적극적으로 참여해보길 잘한 것 같습니다. 

**긴 글 읽어주셔서 감사합니다!**