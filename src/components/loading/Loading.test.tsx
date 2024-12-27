import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading component', () => {

  it('should have the correct class name', () => {
    render(<Loading />);

    const loadingContainer = screen.getByRole('img').parentElement;
    expect(loadingContainer?.classList.contains('c-loading')).toBe(true);
  });
});
