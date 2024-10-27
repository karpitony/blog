import cn from '@yeahx4/cn';
import { FaFolderOpen, FaCalendarAlt } from "react-icons/fa";
import { PostMeta } from '@/libs/Post/PostMetadataParser';

export default function PostInfoHeader({ meta }: { meta: PostMeta }) {
  return (
    <div className={cn(
      "bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-6 shadow-lg",
      "border border-gray-700 md:border-none"
    )}
    >
      <div className="flex justify-between items-start">
        {/* 텍스트 영역 */}
        <div className="flex-1">
          <p className={cn(
            "mb-2 text-blue-500 dark:text-blue-300 hover:underline",
            "text-sm md:text-base"
          )}
          >
            <FaFolderOpen className='inline mr-2'/>
            [{meta.series}] - ({meta.seriesIndex + 1})
          </p>
          <h1
            className={cn(
              "text-lg md:text-2xl font-bold mt-2",
              // "tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400"
            )}
          >
            {meta.title}
          </h1>
          <div className="text-sm md:text-base text-gray-500 mt-2 flex items-center">
            <FaCalendarAlt className="inline mr-1 md:mr-2" />
            <p>{meta.date}</p>
          </div>
          {meta.tags.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-2 mt-2">
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
        {/* 이미지 영역 */}
        {meta.cover && (
          <div className="ml-4">
            <img
              src={meta.cover}
              alt={meta.title}
              className="hidden md:block w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
