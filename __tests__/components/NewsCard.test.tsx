import { render, screen } from '@testing-library/react';
import NewsCard from '@/components/NewsCard';
import { Article } from '@/lib/types';

const mockArticle: Article = {
  source: { id: '1', name: 'Test Source' },
  author: 'Test Author',
  title: 'Test Article Title',
  description: 'Test article description',
  url: 'https://test.com/article',
  urlToImage: 'https://test.com/image.jpg',
  publishedAt: '2024-01-01T00:00:00Z',
  content: 'Test content',
};

describe('NewsCard', () => {
  it('should render article information correctly', () => {
    render(<NewsCard article={mockArticle} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('Test article description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
  });

  it('should render without description', () => {
    const articleWithoutDesc = { ...mockArticle, description: null };
    render(<NewsCard article={articleWithoutDesc} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.queryByText('Test article description')).not.toBeInTheDocument();
  });

  it('should render without author', () => {
    const articleWithoutAuthor = { ...mockArticle, author: null };
    render(<NewsCard article={articleWithoutAuthor} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.queryByText(/By/)).not.toBeInTheDocument();
  });

  it('should have correct link to article detail page', () => {
    render(<NewsCard article={mockArticle} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('/article/'));
  });
});

