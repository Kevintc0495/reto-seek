import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { describe, it, expect, vi, Mock, afterEach } from 'vitest';
import { useTask } from './useTask';
import { getApi, postApi, putApi } from '@/services';
import { task } from '../data';

vi.mock('@/services', async () => {
  const actual = await vi.importActual('@/services');
  return {
    ...(typeof actual === 'object' ? actual : {}),
    getApi: vi.fn(),
    postApi: vi.fn(),
    putApi: vi.fn(),
  };
});

describe('useTask hook', () => {
  afterEach(cleanup);

  it('should fetch tasks', async () => {
    const mockResponse = { data: { data: [], count: 0 }, message: 'Success', status: 200 };
    (getApi as Mock).mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() => useTask());

    try {
      act(() => {
        result.current.tasks({});
      });

      await waitForNextUpdate();

      expect(result.current.isLoadingList).toBe(false);
      expect(getApi).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    } catch (error) {
      expect(error).toBeUndefined(); // No errors expected
    }
  });

  it('should fetch task by id', async () => {
    const mockResponse = { data: task, message: 'Success', status: 200 };
    (getApi as Mock).mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() => useTask());

    try {
      act(() => {
        result.current.taskById('1');
      });

      await waitForNextUpdate();

      expect(result.current.isLoadingUpdate).toBe(false);
      expect(getApi).toHaveBeenCalledWith(expect.any(String));
    } catch (error) {
      expect(error).toBeUndefined(); // No errors expected
    }
  });

  it('should create a task', async () => {
    const mockResponse = { data: task, message: 'Success', status: 200 };
    (postApi as Mock).mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() => useTask());

    try {
      act(() => {
        result.current.createTask(task);
      });

      await waitForNextUpdate();

      expect(result.current.isLoadingCreate).toBe(false);
      expect(postApi).toHaveBeenCalledWith(expect.any(String), task);
    } catch (error) {
      expect(error).toBeUndefined(); // No errors expected
    }
  });

  it('should update a task', async () => {
    const mockResponse = { data: task, message: 'Success', status: 200 };
    (putApi as Mock).mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() => useTask());

    try {
      act(() => {
        result.current.updateTask('1', task);
      });

      await waitForNextUpdate();

      expect(result.current.isLoadingCreate).toBe(false);
      expect(putApi).toHaveBeenCalledWith(expect.any(String), task);
    } catch (error) {
      expect(error).toBeUndefined(); // No errors expected
    }
  });
});
