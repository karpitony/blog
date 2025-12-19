import Image from 'next/image';
import imageInfo from '@/public/image-info.json';
import Logger from '@/libs/logger';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  type: 'post' | 'project';
  series?: string;
  postTitle?: string;
  projectSlug?: string;
}

export default function MarkdownImage({
  src,
  alt,
  type,
  series,
  postTitle,
  projectSlug,
}: MarkdownImageProps) {
  let resolvedSrc = src || '';
  let width = 1200;
  let height = 800;
  let blurDataURL: string | undefined = undefined;

  const blurImageFlag = resolvedSrc.startsWith('./') || resolvedSrc.startsWith('../');

  if (blurImageFlag) {
    if (type === 'post' && series && postTitle) {
      const relPath = `${series}/${postTitle}/${resolvedSrc.slice(2)}`;
      resolvedSrc = `/contents/posts/${relPath}`;
      const size = imageInfo.posts[relPath as keyof typeof imageInfo.posts];

      if (size) {
        width = size.width;
        height = size.height;
        blurDataURL = size.blurDataURL || undefined;
      } else {
        Logger.warn('[Image] image-info.json에 해당 이미지 정보 없음:', relPath);
      }
    } else if (type === 'project' && projectSlug) {
      const relPath = `${projectSlug}/${resolvedSrc.slice(2)}`;
      resolvedSrc = `/contents/projects/${relPath}`;
      const size = imageInfo.projects[relPath as keyof typeof imageInfo.projects];

      if (size) {
        width = size.width;
        height = size.height;
        blurDataURL = size.blurDataURL || undefined;
      } else {
        Logger.warn('[Image] image-info.json에 해당 이미지 정보 없음:', relPath);
      }
    } else {
      Logger.warn('[Image] series나 postTitle이 없어 이미지 경로를 만들 수 없습니다.');
    }
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt || 'image'}
      width={width}
      height={height}
      placeholder={blurImageFlag ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      loading="lazy"
      style={{
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        margin: '2rem auto',
        objectFit: 'contain',
      }}
    />
  );
}
