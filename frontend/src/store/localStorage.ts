export const ls = {
  currency: 'currency',
  currencyList: 'currencyList',
  category: 'category',
  categoryList: 'categoryList',
  products: 'products',
  cart: 'cart',
  theme: 'settings',
};

export const exp = {
  seconds: (n: number) => n * 1000,
  minutes: (n: number) => n * 60000, // 1000 * 60
  hours: (n: number) => n * 3600000, // 1000 * 60 * 60
  days: (n: number) => n * 86400000, // 1000 * 60 * 60 * 24
};

export const LocalStorage = {
  get<T>(key: string, defaultVal: T) {
    try {
      const { data, expire } = JSON.parse(window.localStorage.getItem(key) ?? '') as {
        data: T;
        expire: number;
      };

      const currentTime = new Date().getTime();
      if ((expire && expire < currentTime) || !data) {
        window.localStorage.removeItem(key);
        return defaultVal;
      }

      return data as T;
    } catch (e) {
      // console.error(e.message);
      return defaultVal;
    }
  },

  set(key: string, data: unknown, duration: number | null = null) {
    try {
      const currentTime = new Date().getTime();
      const expire = duration ? currentTime + duration : null;
      window.localStorage.setItem(key, JSON.stringify({ data, expire }));
    } catch (e) {
      // console.error(e.message);
      return;
    }
  },
};
