---
title: 🏆 구름톤 연합 해커톤 참가 및 대상 후기
description: [3기 리액트 스터디 4주차] 해커톤 참가 및 수상 후기
cover: ./week04_03.webp
tags: react, 9oormthonuniv, hackerthon
date: 2024-10-01
series: 9univ-react-study
seriesIndex: 3
---

![뜬구름](./week04_03.webp)

리액트를 어느 정도 배웠고, 해커톤에 참가하여 협업하는 경험을 쌓기 위해 구름톤 유니브에 지원한 만큼 염원하던 해커톤에 참가하게 되었습니다.

첫 해커톤에 참여하며 수상까지 했던 기록을 남기며 4주차 스터디 회고를 ~~날먹~~ 작성하려고 합니다.

1. [아이디어 기획](#1-아이디어-기획)
2. [시작](#2-시작)
3. [해커톤 당일](#3-해커톤-당일)
4. [제출 후 평가](#4-제출-후-평가)
5. [수상 후기](#5-수상-후기)

## 1. 아이디어 기획

![피그잼](./week04_04.webp)

첫 해커톤이니 만큼 기대 반, 설렘 반으로 임했습니다. 일요일 오후에 팀원이 모여 아이디어 회의를 진행하고, 월요일 오후에도 한번 더 모여 아이디어 회의를 진행했습니다.

두 차례의 아이디어 회의를 통해, **함께 목표를 이루는 목표 관리 앱**을 만들자는 방향이 나오게 됐습니다. 

팀원 모두 하나의 목표를 이루면, 구름다리가 한칸 만들어지며, 그렇게 하루에 4개의 구름다리를 모두 건너는 것으로 매일 4개의 목표를 달성하는 앱이 기획되었습니다. 

앱의 방향성과 컨셉이 정해진 후, UI에 대한 내용이 담긴 와이어프레임과 세부 기획사항이 나오기전까지 달릴 준비를 했습니다.

## 2. 시작

수요일 밤, 와이어프레임과 세부 기획이 정해졌습니다. 이 이후 깃허브 레포지토리를 만든 후 본격적으로 코딩을 시작했습니다. 사용할 기술 스택은 **리액트, TypeScript, TailwindCSS, Zustand**로 정했습니다. 

리액트와 TailwindCSS의 경우 도시 이름 맞추기 프로젝트를 통해 한번 연습을 해본 적이 있었습니다. 하지만 TypeScript와 Zustand는 한번도 해본적이 없어서 걱정이 앞섰습니다.

<img src="./week04_05.webp" width=300/>

제일 먼저 필요한 페이지들을 라우팅하고, 헤더와 푸터를 만들었습니다. 
세부 페이지 내용은 와이어프레임이 점점 자세해질수록 변할 것 같아, 가장 안 변할 것 같은 부분부터 건드렸습니다.

헤더와 푸터를 제작한 후, 주요 기능 페이지인 **목표 점검**과 **마이 페이지**는 납둔 채 이용방법과 서비스 소개를 만들었습니다.

<img src="./week04_06.webp" width=500 />

모바일에서도 잘 보이게 하기 위해 브레이크포인트들을 만들어주며 제작했습니다. 

모바일, 데스크톱 전체화면에선 잘 보였지만, 애매한 크기의 창에선 레이어가 깨지는 등 몇몇 문제들이 생겨서 그부분에 대해 고민을 해보기도 했습니다.

## 3. 해커톤 당일

해커톤 당일, 저희 팀 모두 2시쯤 다 모여서 본격적인 작업을 시작했습니다. 

1주일의 준비기간동안 프론트 / 백엔드 모두 환경세팅과 기본적인 작업을 끝마쳤기에, 본격적으로 어려운 작업들을 시작할 수 있었습니다.

프론트와 백엔드를 연결하는 일과 핵심 기능인 목표 페이지를 표시하는 일을 했습니다.

기존에 웹개발을 처음 배울때는 프론트만 사용하는 정도로 배워서 백엔드와의 api를 통한 협업을 처음 경험하게 되었습니다. 

다행히 저희 프론트 팀이 api 요청 관련 유틸 함수를 만들어주어서 import를 이용해 쉽게 요청을 할 수 있었습니다.

<img src="./week04_07.webp" width=400>

저희 프로젝트의 알파이자 오메가인 목표 페이지를 만들며 많은 것을 배울 수 있었습니다. 해당 사진 위에 보이는 구름과 무지개를 배치하기 위해 CSS의 Grid를 적극 활용했고, 자연스러운 전환을 위해 CSS 애니메이션도 사용했습니다. 

아래쪽 팀원 카드 클릭시, 상단 구름다리 전환을 위해 어떻게 컴포넌트끼리 통신할지 고민하다 `Zustand`라는 전역상태관리 라이브러리도 사용해보게 되었습니다. 

전역상태관리가 복잡하다는 악명과 달리, 직접 사용해보니 매우 쉽고, 직관적이여서 다음에도 필요시 주저없이 사용하게 될 것 같습니다.

<img src="./week04_09.webp" width=400>

해커톤을 준비하며 밤을 샌다는 이야기는 많이 들었지만, 정말 밤을 샐줄은 몰랐습니다. 그래도 팀원들과 같이 코딩을 하며 밤을 새니 색다른 경험이 되었습니다.

새벽에 진행하는 **럭키 드로우**에 당첨되어 `무던한 개발자를 위한 모던한 자바스크립트`라는 책도 받을 수 있었습니다.

<img src="./week04_09.webp">

밤샘 코딩과 아침까지 발표자료를 팀원들과 만들며 어느덧 제출 마감시간이 다가왔습니다. 깃허브의 README를 조금 꾸미며 제출 준비를 했습니다. 

저희 팀원 모두 1주일 전부터 열심히 달려서 그런지 제출 직전까지 우다다 코딩하는 일은 없었습니다. 배포와 주요 기능들을 마지막으로 점검 후, 제출 메일을 보냈습니다... 

## 4. 제출 후 평가

제출 후 각 팀의 발표를 들어보며 생각보다 주제가 비슷하다는 생각을 하게 되었습니다. 8팀중 목표관리 앱이 저희포함 4팀정도 였던거 같습니다. 

게다가 `구질구질`이라는 익명 질문 앱과 구름 모양 아이디어앱, 지도에 여행기록 표시 앱등 여러 재미난 프로젝트를 구경할 수 있었습니다.

드디어 저희 팀의 발표 차례가 되었고, 기획자님이 발표를 진행하시는 동안, 프론트 한명과 백엔드 한명이 기술 전문가님께 이동해 기술적인 피드백을 받고, 시연도 조금 했습니다. 

전문가님께선 레이어가 특정 해상도에서 깨지거나, 로그인 정보를 `JWT`가 아닌 로컬 스토리지에 저장하는 부분을 지적해주셨습니다.

하지만 부정적인 피드백만 주신 것이 아닌, 구현도가 상당히 높아 다른팀에 비해 돋보인다는 긍정적인 피드백도 주셔서 제 마음을 들었다놨다 하셨습니다 ㅋㅋ.

기획자님이 발표를 마친 후 저희는 기다밴 설렘반으로 다른팀의 발표를 들으며 저희끼리 등수를 점쳐보았습니다.

## 5. 수상 후기

마침내, 기다리고 기다리던 수상 발표 시간이 되었습니다. 수상 순서는 대부분 그렇듯 3등부터 시작했습니다.

저희 팀 모두 3등을 할것이라 생각했기에 기대를 하고 있었습니다. 그런데 3등이 저희가 아니였습니다. 

이후 2등의 차례가 다가왔고, `구질구질`팀이 2등을 차지했습니다. 

구질구질 팀은 구현도도 좋았고 아이디어 좋았다 생각해 1등일 것이라 예상했는데 의외여서 저희 팀 모두 누가 1등일까 정말 궁금했습니다.

<br>

대망의 1등 발표 시간, 사회자님은 갑자기 `자기팀이 1등일 거라 생각하는 팀 있나요?`라는 질문을 던지셨습니다. 정적이 흐르며 다들 손들기를 주저했습니다. 

저마저도 긴장반 설렘반으로 발표를 기다렸습니다. 

슬라이드가 넘어가며, **대상, "구름다리"**라는 글자가 보이자 저도 모르게 자리에서 일어나며 소리를 지르고 말았습니다.

1주일간의 고생과 피로가 그자리에서 날아가버렸습니다.

<img src="./week04_01.JPG" width=400 />
<img src="./week04_02.JPG" width=400 />

마지막은 팀원분들과의 기념사진입니다. 

아쉽게도 저희 팀원 한명이 사정이 있어 먼저가셨습니다 ㅠㅠ. 그래도 카톡으로나마 우승 소식을 전달하고 모두 기쁨을 만긱했습니다. 

집으로 돌아온 후 밤을 샌 피로에 바로 잠들어버렸습니다 ㅋㅋㅋㅋㅋ.

이 우승을 기회삼아 다른 대회나 해커톤에도 참가하며 적극적으로 활동하고, 이때 마주친 문제들을 반면교사 삼아 더욱 성장해보겠습니다.

긴글 읽어주셔서 감사합니다.
