import { renderHook, act } from '@testing-library/react';
import useIsMobile from './index';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
  });

  it('returns false when innerWidth > breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(false);
  });

  it('returns true when innerWidth <= breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(true);
  });

  it('updates when resize event fires', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });
});
