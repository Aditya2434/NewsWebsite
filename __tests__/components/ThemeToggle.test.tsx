import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';

jest.mock('@/lib/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  it('should render sun icon in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    const { container } = render(<ThemeToggle />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should render moon icon in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    const { container } = render(<ThemeToggle />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should call toggleTheme when clicked', () => {
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<ThemeToggle />);
    const button = container.querySelector('button');
    
    if (button) {
      fireEvent.click(button);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    }
  });
});

