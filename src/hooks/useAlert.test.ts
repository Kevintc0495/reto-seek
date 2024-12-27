import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { describe, it, expect, afterEach } from 'vitest';
import { useAlert } from './useAlert';

describe('useAlert hook', () => {
  afterEach(cleanup);

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAlert());
    expect(result.current.messageAlert).toBe('');
    expect(result.current.openSnackbar).toBe(false);
    expect(result.current.generateAlert).toBeInstanceOf(Function);
    expect(result.current.handleClose).toBeInstanceOf(Function);
  });

  it('should show alert with provided message', () => {
    const { result } = renderHook(() => useAlert());
    act(() => {
      result.current.generateAlert({ status: 200, message: 'Test Alert' });
    });
    expect(result.current.messageAlert).toBe('Test Alert');
    expect(result.current.openSnackbar).toBe(true);
  });

  it('should close the snackbar when handleClose is called with no clickaway reason', () => {
    const { result } = renderHook(() => useAlert());
    act(() => {
      result.current.generateAlert({ status: 200, message: 'Test Alert' });
    });
    
    expect(result.current.openSnackbar).toBe(true);
    
    act(() => {
      result.current.handleClose(new Event('close'));
    });
    
    expect(result.current.openSnackbar).toBe(false);
  });
});
