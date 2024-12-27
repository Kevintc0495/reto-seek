import { cleanup, renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import { useProtectedRouter } from './useProtectedRouter';
import { homeRoutes } from '@/routes';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' ? actual : {}),
    useNavigate: vi.fn(),
    Navigate: vi.fn(),
  };
});

describe('useProtectedRouter hook', () => {
  afterEach(cleanup);

  it('should navigate to home route if user is not an admin', () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    renderHook(() => useProtectedRouter(false));

    expect(navigate).toHaveBeenCalledWith(homeRoutes.home);
  });

  it('should not navigate if user is an admin', () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    renderHook(() => useProtectedRouter(true));

    expect(navigate).not.toHaveBeenCalled();
  });
});
