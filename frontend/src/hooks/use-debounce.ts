import { useCallback, useEffect, useRef, useState } from "react";

export const useDebounceOfValue = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useDebounce = <T>(fn: Function, delay = 500) => {
  const debounceRef = useRef<{
    timeout?: NodeJS.Timeout
  }>({})

  useEffect(() => {
      const cur = debounceRef.current
      return () => {
        if (cur?.timeout) {
          clearTimeout(cur.timeout)
        }
      }
    },
    [debounceRef?.current?.timeout]
  )

  return useCallback((val: T) => {
    if (debounceRef.current.timeout) {
      clearTimeout(debounceRef.current.timeout)
    }

    debounceRef.current.timeout = setTimeout(() => {
      delete debounceRef.current.timeout;
      fn(val)
    }, delay);
  }, [delay, fn]);
};
