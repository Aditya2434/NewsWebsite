import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { formatDate, truncateText, getPlaceholderImage } from '@/lib/utils';

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const articleId = encodeURIComponent(article.url);

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`article_${articleId}`, JSON.stringify(article));
    }
  };

  return (
    <Link href={`/article/${articleId}`} className="block group" onClick={handleClick}>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          <Image
            src={article.urlToImage || getPlaceholderImage()}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getPlaceholderImage();
            }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">{article.source.name}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-blue-400 transition">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {truncateText(article.description, 150)}
            </p>
          )}
          
          {article.author && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              By {article.author}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

