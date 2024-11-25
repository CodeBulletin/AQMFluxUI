import React from "react";

const useDebounce = <T>(value: T, delay: number): [T, boolean, () => void] => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [startDebounce, setStartDebounce] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Clear the existing timeout if the effect is triggered again
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    !startDebounce && setStartDebounce(true);

    // Set a new timeout for the debounced value
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setStartDebounce(false);
    }, delay);

    // Cleanup function to clear the timeout on unmount or value change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  // Function to manually cancel the debounce
  const cancelDebounce = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return [debouncedValue, startDebounce, cancelDebounce];
};

export default useDebounce;
