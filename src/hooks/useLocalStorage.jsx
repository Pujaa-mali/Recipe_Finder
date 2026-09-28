import { useState, useEffect } from 'react';

// Works like useState, but the value is also saved in the browser's
// localStorage, so it is still there after the page is refreshed.
export function useLocalStorage(key, initialValue) {
  // Start with the saved value if there is one
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  // Save again every time the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
