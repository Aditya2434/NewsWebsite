'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatDate, getPlaceholderImage } from '@/lib/utils';
import Loading from '@/components/Loading';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleUrl = decodeURIComponent(params.id as string);
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedArticle = localStorage.getItem(`article_${encodeURIComponent(articleUrl)}`);
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      }
    }
    setLoading(false);
  }, [articleUrl]);

  if (loading) {
    return <Loading />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The article you&apos;re looking for could not be found.
            </p>
            <button
              onClick={() => router.back()}
              className="bg-primary dark:bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-6 text-primary dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 flex items-center transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
          {article.urlToImage && (
            <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
              <Image
                src={article.urlToImage || getPlaceholderImage()}
                alt={article.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getPlaceholderImage();
                }}
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{article.source.name}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {article.title}
            </h1>

            {article.author && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                By {article.author}
              </p>
            )}

            {article.description && (
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium">
                {article.description}
              </p>
            )}

            {article.content && (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <p>{article.content}</p>
              </div>
            )}

            <div className="border-t dark:border-gray-700 pt-6 mt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
              >
                Read Full Article
                <svg
                  className="inline-block w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

