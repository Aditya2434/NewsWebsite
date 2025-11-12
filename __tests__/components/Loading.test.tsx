import { render, screen } from '@testing-library/react';
import Loading from '@/components/Loading';

describe('Loading', () => {
  it('should render loading spinner', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'justify-center', 'items-center', 'py-12');
  });
});

