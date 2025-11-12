import { render, screen } from '@testing-library/react';
import CategoryFilter from '@/components/CategoryFilter';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('CategoryFilter', () => {
  it('should render all category buttons', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<CategoryFilter />);

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  it('should highlight active category', () => {
    (usePathname as jest.Mock).mockReturnValue('/category/technology');
    render(<CategoryFilter />);

    const techButton = screen.getByText('Technology');
    expect(techButton).toHaveClass('bg-primary', 'text-white');
  });

  it('should have correct links for categories', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<CategoryFilter />);

    const techLink = screen.getByText('Technology').closest('a');
    expect(techLink).toHaveAttribute('href', '/category/technology');
  });
});

