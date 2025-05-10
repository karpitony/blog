import cn from '@yeahx4/cn';
// import Image from 'next/image';
import { FaFolderOpen, FaCalendarAlt } from "react-icons/fa";
import { PostMeta } from '@/types/post';

export default function PostInfoHeader({ meta }: { meta: PostMeta }) {
  return (
    <article className={cn(
      "bg-gray-900 bg-opacity-50 rounded-lg px-2 py-4 md:px-4 md:py-6 shadow-lg",
      "border border-none" // border-gray-700
    )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 space-y-1.5">

          {/* 날짜 및 시리즈 */}
          <div className="px-2 text-sm text-gray-500 flex items-center justify-between w-full">
            <div className='flex items-center'>
              <FaCalendarAlt className="inline mr-1" />
              <p>{meta.date}</p>
            </div>
            <div className="flex items-center hover:underline">
              <FaFolderOpen className="inline mr-1 md:mr-2" />
              <p>[{meta.series}] - ({meta.seriesIndex + 1})</p>
            </div>
          </div>
          
          {/* 제목 */}
          <h1
            className={cn(
              "px-2 text-lg md:text-xl font-semibold overflow-hidden line-clamp-2 mb-1"
            )}
          >
            {meta.title}
          </h1>

          {/* 설명 */}
          <div className="px-2 text-sm text-gray-300 flex">
            <p>{meta.description}</p>
          </div>

          {/* 태그 */}
          {meta.tags.length > 0 && (
            <div className="px-1 hidden md:flex flex-wrap gap-2 mt-3">
              {meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    "bg-gray-700 text-gray-300 px-1 md:px-2 py-1 rounded-full",
                    "text-xs overflow-hidden text-ellipsis whitespace-nowrap"
                    )}
                  >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 이미지 영역
        {meta.cover && (
          <div className="ml-4 shrink-0">
            <Image
              src={meta.cover}
              alt={meta.title}
              width={400} // 적절한 고정 크기 설정
              height={300}
              className="w-24 h-24 md:w-48 md:h-32 object-cover rounded-lg max-w-full max-h-full"
            />
          </div>
        )} */}
      </div>
    </article>
  );
}
