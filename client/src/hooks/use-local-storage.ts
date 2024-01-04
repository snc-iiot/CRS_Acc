import { useCallback, useEffect, useState } from "react";

/**
 * The function retrieves a value from local storage, parsing it as JSON if it exists, and returning a
 * default value if it doesn't or if an error occurs.
 * @param {string} key - The `key` parameter is a string that represents the key used to retrieve the
 * value from the local storage.
 * @param {any} defaultValue - The `defaultValue` parameter is the value that will be returned if the
 * specified key does not exist in the local storage or if there is an error while retrieving the value
 * from the local storage.
 * @returns The function `getValueFromLocalStorage` returns the value stored in the local storage with
 * the given key. If there is no value stored or if there is an error while retrieving the value, it
 * returns the defaultValue provided as the second argument.
 */
const getValueFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    window.localStorage.removeItem(key);
    return defaultValue;
  }
};

/**
 * The `useLocalStorage` function is a custom React hook that allows you to store and retrieve values
 * from the browser's local storage.
 * @param {string} key - The `key` parameter is a string that represents the key under which the value
 * will be stored in the local storage. It is used to identify the specific value that is being stored
 * or retrieved from the local storage.
 * @param {T} initialValue - The `initialValue` parameter is the initial value that will be used if
 * there is no stored value in the local storage for the given key.
 * @returns The `useLocalStorage` function returns an object with three properties: `storedValue`,
 * `setValue`, and `clearValue`.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => getValueFromLocalStorage(key, initialValue));

  const setValue = useCallback(
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
      window.dispatchEvent(new Event(`local-storage:${key}`));
    },
    [key]
  );

  /* The `clearValue` function is a callback function that is used to remove the value associated with
the given key from the local storage. It performs the following actions: */
  const clearValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(null);
    window.dispatchEvent(new Event(`local-storage:${key}`));
  }, [key]);

  const reHydrate = useCallback(() => {
    const data = getValueFromLocalStorage(key, initialValue);
    setStoredValue(data);
  }, [key, initialValue]);

  useEffect(() => {
    window.addEventListener(`local-storage:${key}`, reHydrate);
    return () => {
      window.removeEventListener(`local-storage:${key}`, reHydrate);
    };
  }, [key, reHydrate]);

  return { storedValue, setValue, clearValue } as const;
};

export default useLocalStorage;
