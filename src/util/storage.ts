export const setStorage = (id: string, value: string) => localStorage.setItem(id, JSON.stringify(value))

export const removeStorage = (id: string) => localStorage.removeItem(id);

export const getStorage = (id: string) => localStorage.getItem(id);

export const getStorageParse = <T extends Record<string, string | number | boolean>>(id: string, value?: T) => {
  const data =  getStorage(id);
  if (data) return JSON.parse(data);
  return value || null;
}
