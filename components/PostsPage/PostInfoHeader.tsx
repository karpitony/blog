import cn from '@yeahx4/cn';
import { FaCalendarAlt } from "react-icons/fa";
import { PostMeta } from '@/libs/Post/PostMetadataParser';

export default function PostInfoHeader({ meta }: { meta: PostMeta }) {
  return (
    <div className='flex justify-between'>
      { /* 게시글 정보 헤더 */ }
      <div className="flex-row">
        <p className="mb-2 text-blue-500 dark:text-blue-300 hover:underline">
          [{meta.series}] - ({meta.seriesIndex + 1})
        </p>
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold mt-2",
          "tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400"
          )}
        >
          {meta.title}
        </h1>
        <div className="text-sm md:text-base text-gray-500 mt-2 flex items-center">
          <FaCalendarAlt className='inline mr-1 md:mr-2'/>
          <p>{meta.date}</p>
        </div>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {meta.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* 게시글 썸네일 */}
      <div className="flex-1">
        <img
          src={meta.cover}
          alt={meta.title}
          className="hidden md:flex ml-4 p-3 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
