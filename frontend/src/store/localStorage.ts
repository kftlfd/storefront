export const exp = {
  seconds: (n: number) => n * 1000,
  minutes: (n: number) => n * 60000, // 1000 * 60
  hours: (n: number) => n * 3600000, // 1000 * 60 * 60
  days: (n: number) => n * 86400000, // 1000 * 60 * 60 * 24
};

const now = () => new Date().getTime();

interface LSValue<D> {
  data: D;
  expire?: number;
}

export class LocalStorageValue<D> {
  constructor(
    private readonly key: string,
    private readonly defaultVal: D,
    private readonly defaultDuration: number | null = null,
  ) {}

  get(defaultVal = this.defaultVal) {
    try {
      const { data, expire } = JSON.parse(
        window.localStorage.getItem(this.key) ?? '',
      ) as LSValue<D>;

      if (expire !== undefined && expire < now()) {
        window.localStorage.removeItem(this.key);
        return defaultVal;
      }

      return data;
    } catch (e) {
      return defaultVal;
    }
  }

  set(data: D, duration = this.defaultDuration) {
    try {
      const value: LSValue<D> = { data };
      if (duration !== null) {
        value.expire = now() + duration;
      }
      window.localStorage.setItem(this.key, JSON.stringify(value));
    } catch (e) {
      return;
    }
  }
}
