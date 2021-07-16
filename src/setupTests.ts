import { localStorageMock } from "_mock/local-storage-mock";

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
