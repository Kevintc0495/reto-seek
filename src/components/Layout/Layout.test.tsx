import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './index';

vi.mock('@/util', () => ({
  getStorage: vi.fn(() => JSON.stringify({ name: 'Test User', lastName: 'Mock', isAdmin: true })),
  pipe: (...fns: any[]) => (data: any) => fns.reduce((acc, fn) => fn(acc), data),
  removeStorage: vi.fn(),
}));

vi.mock('@/services/cookies/removeCookies', () => ({
  default: vi.fn(),
}));

vi.mock('@/routes', () => ({
  loginRoutes: { signIn: '/login' },
}));

vi.mock('@/data', () => ({
  links: [
    { text: 'Inicio', icon: <span>IconInicio</span>, path: '/', adminOnly: false },
    { text: 'Admin', icon: <span>IconAdmin</span>, path: '/admin', adminOnly: true },
  ],
}));

describe('Layout component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Layout>
          <div>Contenido de prueba</div>
        </Layout>
      </MemoryRouter>
    );

  it('should render without crashing', () => {
    renderComponent();
    expect(screen.getByText(/Contenido de prueba/i)).not.toBeNull();
  });
});
