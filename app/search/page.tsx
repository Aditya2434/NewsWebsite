'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchNews } from '@/lib/api';
import { Article } from '@/lib/types';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 12;

  const loadNews = async (page: number) => {
    if (!query) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchNews(query, page, pageSize);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError('Failed to search news. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadNews(1);
  }, [query]);

  useEffect(() => {
    if (currentPage > 1) {
      loadNews(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    loadNews(currentPage);
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Search News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a search term in the header to find news articles
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Showing results for &quot;{query}&quot;
          {!loading && totalResults > 0 && ` (${totalResults} articles found)`}
        </p>

        {loading && <Loading />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}
        
        {!loading && !error && (
          <>
            <NewsList articles={articles} />
            {totalResults > 0 && (
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

