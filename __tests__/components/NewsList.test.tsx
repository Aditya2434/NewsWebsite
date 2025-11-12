import { render, screen } from '@testing-library/react';
import NewsList from '@/components/NewsList';
import { Article } from '@/lib/types';

const mockArticles: Article[] = [
  {
    source: { id: '1', name: 'Source 1' },
    author: 'Author 1',
    title: 'Article 1',
    description: 'Description 1',
    url: 'https://test.com/1',
    urlToImage: 'https://test.com/image1.jpg',
    publishedAt: '2024-01-01T00:00:00Z',
    content: 'Content 1',
  },
  {
    source: { id: '2', name: 'Source 2' },
    author: 'Author 2',
    title: 'Article 2',
    description: 'Description 2',
    url: 'https://test.com/2',
    urlToImage: 'https://test.com/image2.jpg',
    publishedAt: '2024-01-02T00:00:00Z',
    content: 'Content 2',
  },
];

describe('NewsList', () => {
  it('should render all articles', () => {
    render(<NewsList articles={mockArticles} />);

    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
  });

  it('should display message when no articles', () => {
    render(<NewsList articles={[]} />);

    expect(screen.getByText('No articles found')).toBeInTheDocument();
  });

  it('should render correct number of article cards', () => {
    const { container } = render(<NewsList articles={mockArticles} />);
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);
  });
});

