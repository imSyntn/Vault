export const useLocalStorage = () => ({
  get: (key: string): string | null => localStorage.getItem(key),
  set: (key: string, data: string): void => {
    localStorage.setItem(key, data);
  },
});
