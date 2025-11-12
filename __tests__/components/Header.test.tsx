import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  it('should render header with logo and search', () => {
    render(<Header />);

    expect(screen.getByText('NewsHub')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument();
  });

  it('should navigate to home when clicking logo', () => {
    render(<Header />);

    const logo = screen.getByText('NewsHub');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('should handle search submission', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search news...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/search?q=test%20query');
  });

  it('should not submit empty search', () => {
    render(<Header />);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should clear search input after submission', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search news...') as HTMLInputElement;
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(searchInput.value).toBe('');
  });
});

