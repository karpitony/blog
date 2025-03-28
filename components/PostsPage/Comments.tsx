"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-20">
      <Giscus
        repo="karpitony/blog"
        repoId="R_kgDONDU0cA"
        category="comments"
        categoryId="DIC_kwDONDU0cM4CojKX"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark_dimmed"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}