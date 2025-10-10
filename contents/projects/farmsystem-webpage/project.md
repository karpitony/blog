---
index: 4
title: 팜시스템 웹페이지
thumbnail: ./sc01.webp
date: 2025.01 - Present
status: Active
tags: WEB, FRONT END, TypeScript, React, TanStack Query, TurboRepo
description: 동국대 SW동아리 팜시스템 소개 페이지 + 파밍로그(내부 SNS 페이지)
githubLink: https://github.com/DguFarmSystem/FarmSystem-FE
demoLink: https://www.farmsystem.kr/
videoLink:
---

## 프로젝트 소개

**팜시스템 웹페이지**는 동국대학교 SW 동아리 팜시스템의 공식 웹사이트입니다. 동아리 소개 페이지와 함께 동아리 내부 커뮤니티 플랫폼인 **파밍로그(FarmingLog)**를 포함하고 있습니다.

## 주요 기능

### 1. 동아리 소개 페이지

- 팜시스템 동아리 소개 및 활동 내역
- 멤버 소개 및 프로젝트 포트폴리오
- 동아리 지원 및 문의 기능

### 2. 파밍로그 (내부 SNS)

- 동아리 멤버 전용 소셜 네트워크 서비스
- 게시글 작성, 댓글, 좋아요 등 기본 SNS 기능
- 실시간 알림 기능
- 멤버 간 소통 및 정보 공유

## 기술 스택

- **React**: UI 컴포넌트 구성
- **TypeScript**: 타입 안정성 및 코드 품질 향상
- **TanStack Query**: 서버 상태 관리 및 캐싱
- **TurboRepo**: 모노레포 관리로 소개 페이지와 파밍로그를 하나의 레포에서 효율적으로 관리

## 개발 포인트

### TurboRepo를 활용한 모노레포 구조

소개 페이지와 파밍로그라는 두 개의 독립적인 애플리케이션을 하나의 레포지토리에서 관리하기 위해 TurboRepo를 도입했습니다. 이를 통해:

- 공통 컴포넌트와 유틸리티 함수를 공유하여 코드 중복 최소화
- 각 앱을 독립적으로 빌드하고 배포 가능
- 효율적인 빌드 캐싱으로 개발 속도 향상

### TanStack Query를 활용한 서버 상태 관리

파밍로그의 실시간 데이터 동기화를 위해 TanStack Query를 활용했습니다. 이를 통해 API 호출을 효율적으로 관리하고, 캐싱을 통해 불필요한 네트워크 요청을 줄였습니다.

## 프로젝트 성과

동아리 멤버들이 실제로 사용하는 플랫폼을 개발하며, 실사용자 피드백을 바탕으로 지속적인 개선을 진행하고 있습니다. 현재도 활발히 운영 중이며, 새로운 기능들을 추가하고 있습니다.
