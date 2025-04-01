"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6 mt-8">댓글</h2>
      <hr className="border-t-2 mb-6" />
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
        loading="eager"   //"lazy"
      />
    </div>
  );
}