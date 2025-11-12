'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchNewsByCategory } from '@/lib/api';
import { Article, Category } from '@/lib/types';
import CategoryFilter from '@/components/CategoryFilter';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as Category;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 12;

  const loadNews = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNewsByCategory(category, page, pageSize);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(`Failed to load ${category} news. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadNews(1);
  }, [category]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <CategoryFilter />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 capitalize">
          {category} News
        </h1>

        {loading && <Loading />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}
        
        {!loading && !error && (
          <>
            <NewsList articles={articles} />
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

