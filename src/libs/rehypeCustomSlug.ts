// libs/rehype/customSlug.ts
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element } from 'hast';

export const rehypeCustomSlug: Plugin<[], Element> = () => {
  return tree => {
    visit(tree, 'element', (node: Element) => {
      if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) return;

      const rawText = node.children
        .map(child => {
          if (child.type === 'text') return child.value;
          if (child.type === 'element' && child.tagName === 'code') {
            const codeChild = child.children[0];
            if (codeChild && codeChild.type === 'text') return codeChild.value;
          }
          return '';
        })
        .join('');

      const slug = rawText
        .replace(/`/g, '') // 백틱 제거
        .replace(/[^\w\s가-힣-]/g, '') // 영어/숫자/한글/하이픈/공백만 유지
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-'); // 공백 → 하이픈

      node.properties = {
        ...node.properties,
        id: slug,
      };
    });
  };
};
