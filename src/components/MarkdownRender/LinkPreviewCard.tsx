'use client';

import { useEffect, useState } from 'react';
import cn from '@yeahx4/cn';
import { TbExternalLink } from 'react-icons/tb';

interface OgData {
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
}

interface LinkPreviewCardProps {
  url: string;
}

export default function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const [data, setData] = useState<OgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOg = async () => {
      try {
        const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error('fetch failed');
        const json: OgData = await res.json();
        if (!json.title && !json.description) throw new Error('no data');
        setData(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOg();
  }, [url]);

  // Loading skeleton
  if (loading) {
    return (
      <div
        className={cn(
          'rounded-xl overflow-hidden my-4',
          'border border-gray-200 dark:border-gray-700/50',
          'bg-gray-50 dark:bg-gray-800/40',
          'animate-pulse',
        )}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[240px] h-[140px] md:h-auto bg-gray-200 dark:bg-gray-700/50 shrink-0" />
          <div className="flex-1 p-4 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700/50 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Error or no data — fallback to simple link
  if (error || !data) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 items-center"
      >
        {url}
        <TbExternalLink className="inline-block ml-1" aria-label="External link" />
      </a>
    );
  }

  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  })();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block rounded-xl overflow-hidden mt-2 mb-8 no-underline!',
        'border border-gray-200 dark:border-gray-700/50',
        'bg-white dark:bg-gray-800/40',
        'hover:border-blue-400/50 dark:hover:border-blue-400/30',
        'hover:shadow-lg hover:shadow-blue-500/5',
        'transition-all duration-300 ease-out',
      )}
    >
      <div className="flex flex-col md:flex-row">
        {/* OG Image */}
        {data.image && (
          <div
            className={cn(
              'shrink-0 overflow-hidden',
              'w-full md:w-[240px]',
              'h-[160px] md:h-auto',
              'bg-gray-100 dark:bg-gray-700/30',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title || 'Link preview'}
              className={cn(
                'w-full h-full object-cover m-0!',
                'group-hover:scale-105 transition-transform duration-300',
              )}
              loading="lazy"
              onError={e => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 p-4 min-w-0 flex flex-col justify-center">
          {/* Title */}
          <h4
            className={cn(
              'text-base! md:text-lg! font-semibold! leading-snug!',
              'text-gray-900 dark:text-gray-100',
              'group-hover:text-blue-500 dark:group-hover:text-blue-400',
              'transition-colors duration-200',
              'line-clamp-2 m-0! p-0!',
            )}
          >
            {data.title}
          </h4>

          {/* Description */}
          {data.description && (
            <p
              className={cn(
                'text-sm! leading-relaxed! mt-1.5! mb-0!',
                'text-gray-500 dark:text-gray-400',
                'line-clamp-2',
              )}
            >
              {data.description}
            </p>
          )}

          {/* Site info */}
          <div className="flex items-center gap-2 mt-2.5">
            {data.favicon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.favicon}
                alt=""
                className="w-4 h-4 rounded-sm m-0!"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <span className="text-xs! text-gray-400 dark:text-gray-500 truncate">{hostname}</span>
            <TbExternalLink
              className={cn(
                'w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0',
                'group-hover:text-blue-400 transition-colors duration-200',
              )}
            />
          </div>
        </div>
      </div>
    </a>
  );
}
