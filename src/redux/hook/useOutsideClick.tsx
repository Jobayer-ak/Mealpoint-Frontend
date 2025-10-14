import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Check for null safely
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}
