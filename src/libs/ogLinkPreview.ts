import React from 'react';

/**
 * 마크다운 전처리: <!-- og --> / <!-- og-only --> / <!-- no-og --> 코멘트를 처리
 *
 * - `<!-- og -->URL` → 원래 링크 유지 + 아래에 카드 표시
 * - `<!-- og-only -->URL` → 카드만 표시 (원래 링크 숨김)
 * - `<!-- no-og -->` → 다음 베어 URL의 자동 카드 렌더링 억제
 */
export function preprocessMarkdownForOg(text: string): string {
  // <!-- og-only --> + URL → 카드만 표시 (og-only를 먼저 처리해야 og와 충돌 방지)
  text = text.replace(
    /<!--\s*og-only\s*-->\s*(https?:\/\/[^\s<)\]]+)/gi,
    '<span data-link-preview="$1"></span>',
  );

  // <!-- og --> + URL → 원래 링크 유지 + 카드 아래에 추가
  // no-og 마커로 베어 URL 자동감지 억제 + 별도 블록에 카드 삽입
  text = text.replace(
    /<!--\s*og\s*-->\s*(https?:\/\/[^\s<)\]]+)/gi,
    '<span data-og-control="no-og" style="display:none"></span>$1\n\n<span data-link-preview="$1"></span>',
  );

  // <!-- no-og --> → 자동 감지 억제 마커
  text = text.replace(
    /<!--\s*no-og\s*-->/gi,
    '<span data-og-control="no-og" style="display:none"></span>',
  );

  return text;
}

/**
 * p 태그의 children을 분석하여 베어 URL 자동 감지 여부를 판단
 * - p 태그에 단일 외부 링크만 있고 href === text인 경우 → 카드 렌더링
 * - data-og-control="no-og" 마커가 있으면 → 카드 렌더링 제외
 */
export function detectBareUrlInParagraph(
  children: React.ReactNode,
): { shouldRenderCard: boolean; href: string | null } {
  const childArray = React.Children.toArray(children);

  let hasNoOgMarker = false;
  let linkHref: string | null = null;
  let linkChildText: string | null = null;
  let hasOtherContent = false;

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      if (typeof child === 'string' && child.trim()) {
        hasOtherContent = true;
      }
      continue;
    }

    const el = child as React.ReactElement<Record<string, unknown>>;

    // no-og 마커 감지
    if (el.props?.['data-og-control'] === 'no-og') {
      hasNoOgMarker = true;
      continue;
    }

    // link-preview 마커는 무시 (span 컴포넌트에서 별도 처리)
    if (el.props?.['data-link-preview']) {
      continue;
    }

    // br 무시
    if (el.type === 'br') {
      continue;
    }

    // 링크 감지 (커스텀 components.a 사용 시 el.type이 함수이므로 props로 감지)
    if (el.props?.href && typeof el.props.href === 'string') {
      if (linkHref) {
        hasOtherContent = true;
        continue;
      }
      linkHref = el.props.href as string;
      const linkChildren = React.Children.toArray(el.props.children as React.ReactNode);
      const firstText = linkChildren.find((c): c is string => typeof c === 'string');
      if (firstText) {
        linkChildText = firstText;
      }
      continue;
    }

    hasOtherContent = true;
  }

  if (!linkHref || hasOtherContent || hasNoOgMarker) {
    return { shouldRenderCard: false, href: null };
  }

  // 베어 URL: href === link text
  const isBareUrl = linkChildText === linkHref && linkHref.startsWith('http');
  return { shouldRenderCard: isBareUrl, href: isBareUrl ? linkHref : null };
}
