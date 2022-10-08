export const ls = {
  currency: "currency",
  currencyList: "currencyList",
  category: "category",
  categoryList: "categoryList",
  products: "products",
  cart: "cart",
  theme: "settings",
};

export const exp = {
  seconds: (n) => n * 1000,
  minutes: (n) => n * 60000, // 1000 * 60
  hours: (n) => n * 3600000, // 1000 * 60 * 60
  days: (n) => n * 86400000, // 1000 * 60 * 60 * 24
};

export const LocalStorage = {
  get(key, defaultVal) {
    try {
      const { data, expire } = JSON.parse(window.localStorage.getItem(key));
      const currentTime = new Date().getTime();
      if ((expire && expire < currentTime) || !data) {
        window.localStorage.removeItem(key);
        return defaultVal;
      }
      return data;
    } catch (e) {
      // console.error(e.message);
      return defaultVal;
    }
  },

  set(key, data, duration = null) {
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
