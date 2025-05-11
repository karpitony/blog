---
title: 리액트에서 모달, 토스트를 '제대로' 구현하는 법
description: createPortal 사용해서 모달, 드롭다운, 토스트 만들기!
cover: ./toast-example.gif
tags: react, modals, dropdown, toast
date: 2025-05-11
series: 9univ-react-study
seriesIndex: 9
draft: true
---

## `제대로 구현한다`라는게 뭘까

리액트로 웹페이지를 개발하다 보면 누구나 한 번쯤 **모달, 토스트**를 만들게 됩니다. 

`useState`와 `z-index`만으로 간단하게 만들 수 있지만, 이 방식에는 몇 가지 **치명적인 문제점**이 있습니다.

- 모달이 열려도 배경 스크롤이 막히지 않음
- ESC 키나 외부 클릭으로 닫히지 않음
- 포커스가 뒤 페이지로 빠져나감 (접근성 문제)
- 토스트 알림이 겹치고, 중복됨

동작할 뿐만 아니라 **UX**, **접근성**, **이벤트 처리**, **전역 관리**까지 고려되어야 한다.



## createPortal로 그리기

모달이나 토스트처럼 계층상 상위에 떠야 하는 UI는 `ReactDOM.createPortal`로 별도 DOM 노드에 렌더링하면 좋습니다.

```tsx
return ReactDOM.createPortal(
  <div className="modal">내용</div>,
  document.getElementById("modal-root")
);
```

### 1. DOM 계층 구조를 벗어난 렌더링

```tsx
{isModalOpen && (
  <Modal 
    isOpen={isModalOpen} 
    onClose={() => setModalOpen(!prev)}  
    title={"모달 제목"} 
    content={"모달 본문"} 
  />
)}
```
일반적으로 React 컴포넌트는 부모 DOM 요소 내부에 렌더링됩니다. 위의 예제 코드처럼 **조건부 렌더링** + **z-index** 조합을 많이 사용합니다.

모달, 토스트는 오버레이 UI이고, 다른 컴포넌트에 비해 최상단에 위치해야 합니다.

일반 렌더링 방식은 모달이 부모 컴포넌트의 DOM 안에 갇히게 되어, 상위 요소들의 `z-index`, `position`, `overflow` 등의 영향을 그대로 받습니다.

- 부모가 `overflow: hidden`이면 모달이 잘려 보입니다.
- 부모가 `position: relative`이고 모달, 토스트의 `z-index`가 낮으면 다른 요소에 가려집니다.

`createPortal`을 사용하면 모달을 `document.body` 아래에 직접 렌더링할 수 있어, 이런 스타일 제약으로부터 독립적인 레이어를 만들 수 있습니다.


### 2. 웹 접근성 향상

모달은 사용자 인터페이스의 중요한 부분으로, 스크린 리더 사용자나 키보드 네비게이션 사용자에게도 적절하게 제공되어야 합니다. 

`createPortal`을 사용하면 모달을 DOM의 루트 수준에 렌더링하고, `role="dialog"`와 `aria-modal="true"` 같은 ARIA 속성을 적용해 스크린 리더에게 모달의 의미를 정확히 전달하는 일은 중요합니다.

MDN의 [ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) 문서에 따르면, `Dialog`는 페이지 콘텐츠의 최상단에 위치해야 하며, 다른 웹페이지 요소와 분리된 UI여야 한다고 합니다.

> "The `dialog` role is used to mark up an HTML based application dialog or window that separates content or UI from the rest of the web application or page. Dialogs are generally placed on **top of the rest of the page content** using an overlay."[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role)

또한, [aria-modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal) 속성에 대해서는, 스크린리더에게 모달이 활성화 되어있는 동안 모달 아래 요소들은 활성화 되어있지 않다고 말해줍니다.

> "`aria-modal='true'` tells assistive technologies that the windows underneath the current dialog are not part of the modal content."[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal)


모달이 열리면 키보드 포커스는 모달 내부에만 머무르며, 사용자가 `Tab` 키로 모달 바깥의 버튼이나 링크로 빠져나가지 않도록 해야 합니다.

모달이 부모 컴포넌트 안에 있을 경우, 자식 요소들의 `tabindex`, `focusable element` 등을 예측하기 어렵고, 모달 외부 요소가 계속 렌더되고 있어 포커스를 유출하기 쉬워집니다.

`createPortal`로 DOM 루트에 렌더링하면, 포커스 관리가 단순해지고 키보드 내비게이션 사용자에게 훨씬 나은 경험을 제공할 수 있습니다.


이러한 ARIA 속성들이 제대로 동작하려면 모달이 DOM 트리의 루트 수준, 예컨대 `<body>` 바로 아래에 있어야 합니다. 

그렇지 않으면 부모 요소의 레이아웃이나 접근성 맥락에 의해 무시되거나 왜곡될 수 있습니다.


모달을 만들여 웹접근성에 대해 좀더 알아보고 싶으면 [WAI-ARIA Modal Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)을 참고해보면 좋습니다.

React의 [Portals](https://legacy.reactjs.org/docs/portals.html) 문서에서도 모달창에 대해서 

> "For modal dialogs, ensure that everyone can interact with them by following the WAI-ARIA Modal Authoring Practices."[React Legacy Docs](https://legacy.reactjs.org/docs/portals.html)

따라서, `createPortal`을 사용하여 모달을 DOM의 루트 수준에 렌더링함으로써, 이러한 ARIA 속성들이 효과적으로 적용되고, **스크린 리더 사용자에게 모달의 의미가 정확히 전달** 될 수 있습니다.


### 3. 포커스 트랩 구현에서 `createPortal`의 장점

MDN의 [aria-modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal) 문서에 따르면:[MDN Web Docs+5MDN Web Docs+5MDN Web Docs+5](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal)

> "When a modal element is displayed, focus should be placed in the modal. Focus needs to be 'trapped' inside the modal when it is visible, until it is dismissed."[MDN Web Docs+1MDN Web Docs+1](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal)

또한, [ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) 문서에서는:[MDN Web Docs+5MDN Web Docs+5MDN Web Docs+5](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role)

> "When the dialog appears on the screen, keyboard focus should be moved to the default focusable control inside the dialog... After the dialog is dismissed, keyboard focus should be moved back to where it was before it moved into the dialog."[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role)

하지만 모달이 부모 컴포넌트 안에 있을 경우, 자식 요소들의 `tabindex`, focusable element 등을 예측하기 어렵고, 모달 외부 요소가 계속 렌더되고 있어 포커스를 유출하기 쉬워집니다.

`createPortal`로 DOM 루트에 렌더링하면, 포커스 관리가 단순해지고 키보드 내비게이션 사용자에게 훨씬 나은 경험을 제공할 수 있습니다.


### 3. 이벤트 버블링 유지
createPortal로 렌더링된 컴포넌트는 DOM 구조상 부모로부터 분리되어 있지만, React의 이벤트 시스템에서는 여전히 부모 컴포넌트의 이벤트 핸들러가 작동합니다. 즉, 포털을 통해 렌더링된 자식 컴포넌트에서 발생한 이벤트는 React 트리 상에서 부모 컴포넌트로 버블링됩니다.


## 컴포넌트별 구현 전략

### 1. 모달 (Modal)

### 2. 토스트 (Toast)

---

## 라이브러리도 있다

직접 구현이 귀찮거나 접근성 등까지 고려하기 어렵다면 다음 라이브러리들도 있으니 사용해도 편할 것 같습니다.

- **Radix UI** – 접근성까지 고려된 저수준 컴포넌트
- **Headless UI** – 스타일 없는 UI 로직 컴포넌트
- **React Aria** – Adobe 제작, 완전 접근성 중심
