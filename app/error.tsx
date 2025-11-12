'use client';

import ErrorMessage from '@/components/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <ErrorMessage
        message={error.message || 'Something went wrong!'}
        onRetry={reset}
      />
    </div>
  );
}

