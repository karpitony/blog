import { PostMeta } from '@/libs/Post/PostMetadataParser';

export default function PostInfoHeader({ meta }: { meta: PostMeta }) {
  return (
    <div>
      { /* 게시글 정보 헤더 */ }
      <div className="flex-row mb-4">
        <p className="mb-2 text-blue-500 dark:text-blue-300 hover:underline">
          [{meta.series}] - ({meta.seriesIndex + 1})
        </p>
        <h1 className="text-3xl font-bold mt-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400">
          {meta.title}
        </h1>
        <p className="text-base text-gray-500 mt-2">{meta.date} · {meta.description}</p>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {meta.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
