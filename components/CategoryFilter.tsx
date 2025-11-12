'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/lib/types';

const categories: { name: string; value: Category }[] = [
  { name: 'General', value: 'general' },
  { name: 'Business', value: 'business' },
  { name: 'Technology', value: 'technology' },
  { name: 'Entertainment', value: 'entertainment' },
  { name: 'Health', value: 'health' },
  { name: 'Science', value: 'science' },
  { name: 'Sports', value: 'sports' },
];

export default function CategoryFilter() {
  const pathname = usePathname();

  const isActive = (category: Category) => {
    return pathname === `/category/${category}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm mb-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-4 space-x-4">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/category/${cat.value}`}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                isActive(cat.value)
                  ? 'bg-primary dark:bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

