import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { describe, it, expect, vi, Mock, afterEach } from 'vitest';
import { useAuth } from './useAuth';
import { postApi } from '@/services';
import { authRoutes } from '@/services';
import { ILogin } from '../interfaces';

vi.mock('@/services', async () => {
  const actual = await vi.importActual('@/services');
  return {
    ...(typeof actual === 'object' ? actual : {}),
    postApi: vi.fn(),
  };
});

describe('useAuth hook', () => {
  afterEach(cleanup);

  it('should login a user and return the correct response', async () => {
    const mockResponse = { 
      data: { 
        token: 'token123', 
        user: { id: 1, name: 'John', lastName: 'Doe', email: 'john.doe@example.com' } 
      }, 
      message: 'Success', 
      status: 200 
    };

    (postApi as Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    const credentials: ILogin = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    act(() => {
      result.current.login(credentials);
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);

    expect(postApi).toHaveBeenCalledWith(authRoutes.login, credentials);
  });
});
