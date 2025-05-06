import { useCallback } from "react";

export const useStorage = () => {
  const setStorageData = useCallback(<T>(data: Record<string, T>) => {
    const keys = Object.keys(data);

    if (keys.length > 0) {
      keys.forEach((key) => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });
    }
  }, []);

  const getStorageData = useCallback(<T>(keys: Array<string>) => {
    let state: Record<string, T | {} | null> = {};

    keys.forEach((key) => {
      const data = localStorage.getItem(key);

      if (data) {
        return (state[key] = JSON.parse(data));
      }
      state[key] = null;
    });

    return state;
  }, []);

  const removeStorageData = useCallback((keys: Array<string>) => {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }, []);

  return {
    setStorageData,
    getStorageData,
    removeStorageData
  };
};
