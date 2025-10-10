---
index: 1
title: 개발 블로그
thumbnail: /og-image.webp
date: 2024.11 - Present
status: Active
tags: WEB, FRONT END, TypeScript, Next.js
description: 직접 만든 기술 블로그 겸 포트폴리오 사이트, SSG 렌더링 사용
githubLink: https://github.com/karpitony/blog
demoLink:
videoLink:
---

## 프로젝트 소개

직접 디자인하고 개발한 개인 기술 블로그 겸 포트폴리오 사이트입니다. **학습 내용 정리, SEO 최적화, Next.js 실전 연습**이라는 세 가지 목표를 가지고 제작했습니다.

## 주요 기능

### 1. 마크다운 기반 포스트 시스템

- 순수 마크다운을 활용한 포스트 작성 및 렌더링
- 시리즈별 포스트 관리 및 네비게이션
- 태그 기반 포스트 분류
- 목차(TOC) 자동 생성

### 2. 프로젝트 포트폴리오

- 프로젝트 목록 및 상세 페이지
- 모달 라우팅을 활용한 프로젝트 상세 보기 (searchParams 활용)
- 프로젝트별 썸네일, 기술 스택, 링크 관리

### 3. Next.js 라우팅 시스템 체득

- **정적 라우팅 최대한 활용**: 빌드 타임에 모든 페이지 사전 생성
- Dynamic Routes, Parallel Routes, Intercepting Routes 등 다양한 라우팅 패턴 적용
- App Router를 통한 파일 기반 라우팅 구조 설계

### 4. 이미지 최적화

- **저화질 blur 이미지 사전 생성**: 빌드 타임에 모든 이미지의 blur 버전 생성
- **Progressive Image Loading**: 저화질 이미지 먼저 표시 후 lazy loading으로 고화질 이미지 전송
- **Next.js Image 컴포넌트 활용**: placeholder="blur"와 lazy loading을 통한 성능 최적화
- 이미지 최적화 경험을 바탕으로 관련 블로그 글 작성

### 5. SEO 최적화

- **Sitemap.xml**: 검색 엔진 크롤링 최적화
- **RSS.xml**: 블로그 구독 기능 제공
- 메타데이터 자동 생성 및 Open Graph 이미지 설정
- Static Site Generation으로 빠른 초기 로딩 및 검색 노출 극대화

## 기술 스택

- **Next.js**: App Router, SSG, 다양한 라우팅 패턴 활용
- **TypeScript**: 타입 안정성
- **Markdown**: 순수 마크다운 파싱 및 렌더링
- **Tailwind CSS**: 스타일링

## 개발 포인트

이 블로그는 단순히 글을 올리는 것을 넘어, **개발 과정에서 배운 내용을 정리**하고, **SEO를 통해 더 많은 사람들에게 공유**하며, **Next.js의 다양한 기능을 실전에서 연습**하는 공간입니다.

특히 Next.js의 여러 라우팅 방식을 직접 적용해보며 각 라우팅의 특징과 장단점을 체감할 수 있었고, 정적 라우팅을 최대한 활용해 성능을 극대화했습니다.

또한 **Next.js의 Image 컴포넌트를 깊이 이해**하며 이미지 최적화를 구현했습니다. 저화질 blur 이미지를 먼저 표시하고 lazy loading으로 고화질 이미지를 불러오는 과정을 직접 구축하면서, 웹 성능 최적화의 중요성을 체감했고, 이 경험을 바탕으로 블로그 글까지 작성했습니다.
