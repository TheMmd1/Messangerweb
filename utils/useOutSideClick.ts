import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOutsideClickReturn {
  visibleIndex: number | null;
  refs: React.MutableRefObject<HTMLSpanElement | null>[];
  showComponent: (event: React.MouseEvent, index: number) => void;
}

function useOutsideClick(itemCount: number): UseOutsideClickReturn {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const refs = useRef<Array<React.MutableRefObject<HTMLSpanElement | null>>>(
    Array.from({ length: itemCount }, () => ({ current: null }) as React.MutableRefObject<HTMLSpanElement | null>)
  ).current;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isContentExist = refs.some((ref, index) => ref.current && ref.current.contains(event.target as Node) && visibleIndex === index);
      if (isContentExist) return;
      setVisibleIndex(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, visibleIndex]);

  const showComponent = useCallback((event: React.MouseEvent, index: number) => {
    console.log(event);
    event.preventDefault();
    setVisibleIndex(index);
  }, []);

  return { visibleIndex, refs, showComponent };
}

export default useOutsideClick;
