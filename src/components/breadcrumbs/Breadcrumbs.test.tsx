import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import BreadcrumbsComponent from './Breadcrumbs';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' ? actual : {}),
    useNavigate: vi.fn(),
    BrowserRouter: (actual as { BrowserRouter: typeof Router }).BrowserRouter,
  };
});

describe('BreadcrumbsComponent', () => {
  const links = [
    { href: '/home', name: 'Home' },
    { href: '/about', name: 'About' },
    { href: '/contact', name: 'Contact' },
  ];

  it('should render the breadcrumbs correctly', () => {
    render(
      <Router>
        <BreadcrumbsComponent breadcrumbsProps={{}} links={links} />
      </Router>
    );

    links.forEach(({ name }) => {
      expect(screen.queryByText(name)).not.toBeNull();
    });
  });

  it('should call navigate when a breadcrumb link is clicked', () => {
    const mockNavigate = vi.fn();
    (vi.mocked(useNavigate) as Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <BreadcrumbsComponent breadcrumbsProps={{}} links={links} />
      </Router>
    );

    fireEvent.click(screen.getByText('About'));

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  it('should not call navigate for the last breadcrumb', () => {
    const mockNavigate = vi.fn();
    (vi.mocked(useNavigate) as Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <BreadcrumbsComponent breadcrumbsProps={{}} links={links} />
      </Router>
    );

    fireEvent.click(screen.getByText('Contact'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
