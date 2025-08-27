'use client';
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import PostsList from '@/components/PostsPage/PostsList';
import { PostData, SeriesSummary } from '@/types/post';
import cn from '@yeahx4/cn';

interface PostListLayoutProps {
  posts: PostData[];
  series: SeriesSummary[];
}

export default function PostListLayout({ posts, series }: PostListLayoutProps) {
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(posts);
  const [chosenSeries, setChosenSeries] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const seriesParam = searchParams.get('series');
    if (seriesParam) {
      setChosenSeries(seriesParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (chosenSeries) {
      const filtered = posts.filter(post => post.meta.series === chosenSeries);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [chosenSeries, posts]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSeriesClick = (seriesSlug: string) => {
    if (seriesSlug !== chosenSeries) {
      setChosenSeries(seriesSlug);
      router.push(pathname + '?' + createQueryString('series', seriesSlug));
    } else {
      setChosenSeries(null);
      router.push(pathname);
    }
  };

  return (
    <section className="text-black dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div>
        <div className="flex flex-wrap gap-4 mb-6">
          {series.map(s => (
            <button
              key={s.seriesSlug}
              onClick={() => handleSeriesClick(s.seriesSlug)}
              className={cn(
                'px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200',
                chosenSeries === s.seriesSlug
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 ',
              )}
            >
              {s.name} ({s.slugs.length})
            </button>
          ))}
        </div>
      </div>
      <div>
        <PostsList posts={filteredPosts} postPerPage={9} showPrevNext />
      </div>
    </section>
  );
}
