import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const updateValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export function getFromLocalStorage(key: string): any {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function writeToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTotalUniqueItems(key: string) {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return 0;
  }

  const parsedValue = JSON.parse(storedValue);
  const uniqueItems = new Set(Object.values(parsedValue));
  return uniqueItems.size;
}

export function writeToLocalStorageWithoutStringify(key: string, value: any) {
  localStorage.setItem(key, value);
}

//delete cart from local storage
export function deleteFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
